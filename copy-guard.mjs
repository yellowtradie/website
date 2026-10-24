#!/usr/bin/env node
/* ============================================================================
 *  copy-guard.mjs — prove that no sentence of ours is a sentence of theirs.
 *
 *  The rule it enforces, from the content plan §5.4:
 *  "Rewrite it, do not copy it" is a promise until a machine holds it. This
 *  fetches the competitor's public pages ONCE, splits them into sentences,
 *  stores a hash of each, and fails any page of ours that shares one.
 *
 *  Why hashes and not their words: the cache has to live in this repo, and
 *  there is no reason to keep a copy of their copy in it. A SHA-256 of the
 *  normalised sentence answers the only question we ask ("is this sentence
 *  theirs?") without storing the sentence.
 *
 *  Politeness, because this is somebody else's server:
 *    - robots.txt is read and obeyed, including Crawl-delay
 *    - one request at a time, 600ms apart
 *    - an honest user agent with a page that explains it
 *    - the result is cached for seven days and the cache is committed, so a
 *      normal build makes NO request at all
 *    - `--refresh` is the only way to fetch early, and a person must type it
 *
 *  Usage:
 *    node copy-guard.mjs            use the cache (fetch once if there is none)
 *    node copy-guard.mjs --refresh  fetch now, then check
 *
 *  The pages it checks are the rendered ones in `_build/`, written by
 *  `node build.mjs`, so it sees the words a reader would see rather than the
 *  Markdown they were typed in.
 * ========================================================================== */

import { createHash } from "node:crypto";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const CACHE = join(HERE, "content", "_guard", "gettraddie-sentences.json");
const MANIFEST = join(HERE, "_build", "manifest.json");

const SOURCE = "https://www.gettraddie.com/";
const SITEMAP = "https://www.gettraddie.com/sitemap.xml";
const USER_AGENT =
  "YellowTradieCopyCheck/1.0 (+https://yellowtradie.com/copy-check; checks our pages for copied sentences; one pass, then cached)";
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const MAX_PAGES = 250;
const DELAY_MS = 600;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* ------------------------------------------------------------------ text */

const ENTITIES = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ",
  pound: "\u00a3", euro: "\u20ac", copy: "\u00a9", reg: "\u00ae",
  rsquo: "'", lsquo: "'", rdquo: '"', ldquo: '"', hellip: "\u2026",
  ndash: "-", mdash: "-", middot: "\u00b7", times: "x", rarr: "->",
};

function decodeEntities(s) {
  return s.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (whole, body) => {
    if (body[0] === "#") {
      const code = body[1].toLowerCase() === "x"
        ? parseInt(body.slice(2), 16)
        : parseInt(body.slice(1), 10);
      return Number.isFinite(code) && code >= 0 && code <= 0x10ffff
        ? String.fromCodePoint(code)
        : whole;
    }
    const key = body.toLowerCase();
    return Object.prototype.hasOwnProperty.call(ENTITIES, key) ? ENTITIES[key] : whole;
  });
}

/** Visible text, with block boundaries kept as full stops so sentences do not
 *  run together across a heading and its paragraph. */
export function visibleText(html) {
  return decodeEntities(
    html
      .replace(/<!--[\s\S]*?-->/g, " ")
      .replace(/<(script|style|noscript|svg|template)\b[\s\S]*?<\/\1>/gi, " ")
      .replace(/<\/(p|div|li|h[1-6]|section|article|header|footer|td|th|blockquote|figcaption|tr)>/gi, ". ")
      .replace(/<br\s*\/?>/gi, ". ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();
}

/** Split on sentence ends. A sentence shorter than six words is not stored:
 *  "All rights reserved" is boilerplate, not copying. */
export function sentences(text) {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => {
      const words = s.split(/\s+/).filter(Boolean).length;
      return words >= 6 && words <= 90;
    });
}

/** The comparison form: case, punctuation, quotes and spacing gone. Two
 *  sentences that differ only in a comma are the same sentence. */
export function normalise(sentence) {
  return sentence
    .toLowerCase()
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/[\u2013\u2014]/g, " ")
    .replace(/[^a-z0-9\u00a3]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function hashSentence(sentence) {
  return createHash("sha256").update(normalise(sentence)).digest("hex");
}

/* ------------------------------------------------------------------ fetch */

async function fetchText(url, tries = 2) {
  let last;
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(url, {
        redirect: "follow",
        signal: AbortSignal.timeout(30000),
        headers: {
          "user-agent": USER_AGENT,
          "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.text();
    } catch (err) {
      last = err;
      await sleep(1500 * (i + 1));
    }
  }
  throw last;
}

function parseRobots(text) {
  const disallow = [];
  let crawlDelay = 0;
  let applies = false;
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.replace(/#.*$/, "").trim();
    if (!line) continue;
    const [key, ...rest] = line.split(":");
    const value = rest.join(":").trim();
    const k = key.trim().toLowerCase();
    if (k === "user-agent") applies = value === "*" || /yellowtradie/i.test(value);
    else if (applies && k === "disallow" && value) disallow.push(value);
    else if (applies && k === "crawl-delay") crawlDelay = Number(value) || 0;
  }
  return { disallow, crawlDelay };
}

async function discover(robots) {
  const seen = new Set();
  const add = (u) => {
    try {
      const url = new URL(u);
      if (url.hostname !== "www.gettraddie.com" && url.hostname !== "gettraddie.com") return;
      const path = url.pathname;
      if (robots.disallow.some((d) => path.startsWith(d))) return;
      if (/\.(jpg|jpeg|png|webp|svg|gif|pdf|zip|xml|txt|css|js|ico)$/i.test(path)) return;
      url.hash = "";
      url.search = "";
      seen.add(url.toString());
    } catch { /* a malformed loc is not a page */ }
  };

  add(SOURCE);
  const xml = await fetchText(SITEMAP);
  const locs = [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)].map((m) => m[1]);
  if (/<sitemapindex\b/i.test(xml)) {
    for (const layer of locs) {
      const layerXml = await fetchText(layer);
      for (const m of layerXml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)) add(m[1]);
      await sleep(DELAY_MS);
    }
  } else {
    for (const loc of locs) add(loc);
  }
  return [...seen].slice(0, MAX_PAGES);
}

async function crawl() {
  console.error("Copy guard: no cache yet, so this is the one polite read of the competitor's site.");
  const robots = parseRobots(await fetchText(`${SOURCE}robots.txt`).catch(() => ""));
  const urls = await discover(robots);
  const delay = Math.max(DELAY_MS, (robots.crawlDelay || 0) * 1000);
  console.error(`Copy guard: ${urls.length} pages, one at a time, ${delay}ms apart.`);

  const hashes = new Set();
  const failed = [];
  let pages = 0;

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    try {
      const html = await fetchText(url);
      const found = sentences(visibleText(html));
      for (const s of found) hashes.add(hashSentence(s));
      pages += 1;
      if ((i + 1) % 20 === 0) console.error(`  ${i + 1}/${urls.length}, ${hashes.size} sentences`);
    } catch (err) {
      failed.push({ url, error: String(err.message || err) });
    }
    await sleep(delay);
  }

  if (pages < 20) {
    throw new Error(
      `Only ${pages} pages came back. That is not enough to call the guard a guard; refusing to store a weak set.`,
    );
  }

  const cache = {
    version: 1,
    source: SOURCE,
    fetched_at: new Date().toISOString(),
    user_agent: USER_AGENT,
    pages: pages,
    sentences: hashes.size,
    failed: failed.slice(0, 25),
    hashes: [...hashes].sort(),
  };
  mkdirSync(dirname(CACHE), { recursive: true });
  writeFileSync(CACHE, JSON.stringify(cache) + "\n");
  console.error(`Copy guard: stored ${cache.sentences} sentences from ${pages} pages.`);
  return cache;
}

function loadCache() {
  if (!existsSync(CACHE)) return null;
  try {
    return JSON.parse(readFileSync(CACHE, "utf8"));
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------- main */

async function main() {
  const refresh = process.argv.includes("--refresh");
  let cache = loadCache();
  const age = cache ? Date.now() - Date.parse(cache.fetched_at) : Infinity;

  if (refresh || !cache || !(age < WEEK_MS)) {
    if (cache && !refresh) {
      console.error("Copy guard: the stored read is over a week old, so it is reading their site again.");
    }
    cache = await crawl();
  } else {
    const days = Math.floor(age / (24 * 60 * 60 * 1000));
    console.error(
      `Copy guard: using the stored read from ${cache.fetched_at.slice(0, 10)} ` +
      `(${days} day${days === 1 ? "" : "s"} old, ${cache.pages} pages, ${cache.sentences} sentences).`,
    );
  }

  const known = new Set(cache.hashes);
  if (!existsSync(MANIFEST)) {
    console.error("Copy guard: no _build/manifest.json. Run `node build.mjs` first.");
    process.exit(2);
  }
  const manifest = JSON.parse(readFileSync(MANIFEST, "utf8"));
  const pages = manifest.pages;
  if (!Array.isArray(pages) || pages.length === 0) {
    console.error("Copy guard: the build manifest names no pages.");
    process.exit(2);
  }

  const failures = [];
  let checked = 0;

  for (const page of pages) {
    const file = join(HERE, page.preview);
    if (!existsSync(file)) {
      failures.push(`${page.slug}: rendered file missing (${page.preview})`);
      continue;
    }
    const text = visibleText(readFileSync(file, "utf8"));
    for (const sentence of sentences(text)) {
      checked += 1;
      if (known.has(hashSentence(sentence))) {
        failures.push(`${page.slug}: shares a sentence with ${SOURCE}\n    "${sentence}"`);
      }
    }
  }

  console.error("");
  if (failures.length) {
    console.error(`COPY GUARD FAILED: ${failures.length} shared sentence(s) across ${pages.length} pages.`);
    for (const f of failures) console.error(`  x ${f}`);
    process.exit(1);
  }

  console.log(
    `COPY GUARD GREEN: ${pages.length} pages, ${checked} sentences checked against ` +
    `${cache.sentences} sentences from ${cache.pages} competitor pages. No shared sentence.`,
  );
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main().catch((err) => {
    console.error(`COPY GUARD FAILED: ${err.message || err}`);
    process.exit(2);
  });
}
