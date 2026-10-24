#!/usr/bin/env node
/* ============================================================================
 *  check.mjs — the quality gate from content plan §5.4.
 *
 *  It reads the RENDERED pages in `_build/`, not the Markdown, so it judges
 *  what a reader would get. It checks:
 *
 *    - one H1, and the H1 is the one the frontmatter promised
 *    - title under 60 characters, description under 160, for pages written
 *      under this system. The four pages that were live before the gate
 *      existed are named and exempt: their words are frozen because their
 *      look is frozen. The exemption is a list, not a shrug.
 *    - every internal link resolves to a PUBLISHED page, and a link to a page
 *      that is planned but not yet written is hidden (content/_data/planned.json)
 *    - every external link answers (cached for a week)
 *    - the schema the page type needs is present
 *    - the banned words are absent
 *    - the claim rules hold (no invented proof, no feature called live that
 *      is not, the price never appears without the trial facts)
 *    - the word count is in range for the page type
 *    - no personal name in text, alt text, metadata or schema
 *    - the sitemap and the footer contain published pages only
 *
 *  The plagiarism guard is its own command: `node copy-guard.mjs`.
 *
 *  Usage: node build.mjs && node check.mjs
 * ========================================================================== */

import { readFileSync, existsSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const BUILD = join(HERE, "_build");
const CACHE = join(HERE, ".cache", "links.json");
const CONFIG = JSON.parse(readFileSync(join(HERE, "content", "_data", "gate.json"), "utf8"));
const MANIFEST = JSON.parse(readFileSync(join(BUILD, "manifest.json"), "utf8"));
const PLANNED = new Set(
  existsSync(join(HERE, "content", "_data", "planned.json"))
    ? JSON.parse(readFileSync(join(HERE, "content", "_data", "planned.json"), "utf8"))
    : [],
);

const failures = [];
const passes = [];
function ok(name) { passes.push(name); }
function fail(where, message) { failures.push(`${where}: ${message}`); }

/* ------------------------------------------------------------------- text */

function visibleText(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<(script|style|noscript|svg|template)\b[\s\S]*?<\/\1>/gi, " ")
    .replace(/<\/(p|div|li|h[1-6]|section|article|header|footer|td|th|blockquote)>/gi, ". ")
    .replace(/<br\s*\/?>/gi, ". ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function sentences(text) {
  return text.split(/(?<=[.!?])\s+/).map((s) => s.trim()).filter(Boolean);
}

function words(text) {
  return text.split(/\s+/).filter((w) => /[a-z0-9\u00a3]/i.test(w));
}

function targetSlug(href, currentSlug) {
  if (!href) return null;
  const h = href.trim();
  if (h.startsWith("#") || h.startsWith("mailto:") || h.startsWith("tel:") || /^https?:/i.test(h)) return null;
  const pathPart = h.split("#")[0].split("?")[0];
  if (!pathPart) return currentSlug;
  let p = pathPart.replace(/^\.\//, "").replace(/^\//, "");
  if (p.endsWith("/")) p = p.slice(0, -1);
  if (p.endsWith(".html")) p = p.slice(0, -5);
  if (p === "" || p === ".") return "index";
  return p;
}

/* ---------------------------------------------------------------- schema */

function graphOf(html) {
  const nodes = [];
  for (const m of html.matchAll(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/gi)) {
    try {
      const parsed = JSON.parse(m[1]);
      if (Array.isArray(parsed["@graph"])) nodes.push(...parsed["@graph"]);
      else nodes.push(parsed);
    } catch (err) {
      throw new Error(`JSON-LD does not parse: ${err.message}`);
    }
  }
  return nodes;
}

/* ------------------------------------------------------------------ links */

async function externalAnswers(url, cache) {
  const hit = cache[url];
  const week = 7 * 24 * 60 * 60 * 1000;
  if (hit && Date.now() - Date.parse(hit.checked_at) < week) return hit;

  let answer = { url, checked_at: new Date().toISOString(), status: 0, ok: false };
  for (const method of ["HEAD", "GET"]) {
    try {
      const res = await fetch(url, {
        method,
        redirect: "follow",
        signal: AbortSignal.timeout(20000),
        headers: {
          "user-agent": "YellowTradieLinkCheck/1.0 (+https://yellowtradie.com; checks our own sources)",
          "accept": "text/html,application/xhtml+xml,*/*;q=0.8",
        },
      });
      answer.status = res.status;
      answer.ok = res.status >= 200 && res.status < 400;
      answer.final_url = res.url;
      if (answer.ok || method === "GET") break;
    } catch (err) {
      answer.error = String(err.message || err);
    }
  }
  cache[url] = answer;
  return answer;
}

/* -------------------------------------------------------------------- run */

const pages = new Map(MANIFEST.pages.map((p) => [p.slug, p]));
const published = new Set(MANIFEST.published);
const unpublished = new Set(MANIFEST.unpublished);
const linkCache = existsSync(CACHE) ? JSON.parse(readFileSync(CACHE, "utf8")) : {};
const external = new Set();

const BANNED_ALWAYS = [
  [/\u2014/, "em dash"],
  [/[\u2190-\u2199\u21d0-\u21d9]/, "arrow"],
  [/\u27f5|\u27f6|\u27a1|\u2b05-\u2b07/, "arrow"],
  [/\u{1F300}-\u{1FAFF}|\u{1F000}-\u{1F2FF}|\u{2600}-\u{26FF}|\u{2700}-\u{27BF}/u, "emoji"],
];

const BANNED_VOICE = [
  [/not just\b[^.]{0,80}\bbut\b/i, '"not just X but Y"'],
  [/here'?s the thing/i, '"Here\'s the thing"'],
  [/\bgame[ -]?changer\b/i, "hype: game changer"],
  [/\brevolutionar(y|ise|ize)\b/i, "hype: revolutionary"],
  [/\bseamless(ly)?\b/i, "hype: seamless"],
  [/\beffortless(ly)?\b/i, "hype: effortless"],
  [/\bsupercharge\b/i, "hype: supercharge"],
  [/\bworld[ -]class\b/i, "hype: world class"],
  [/\bcutting[ -]edge\b/i, "hype: cutting edge"],
  [/\bbest[ -]in[ -]class\b/i, "hype: best in class"],
  [/\b10x\b/i, "hype: 10x"],
  [/\bunlock\b/i, "hype: unlock"],
  [/\bskyrocket\b/i, "hype: skyrocket"],
  [/\belevate your\b/i, "hype: elevate"],
  [/\btransform your\b/i, "hype: transform"],
  [/\bempower\b/i, "hype: empower"],
  [/\bguaranteed\b/i, "hype: guaranteed"],
  [/\brisk[ -]free\b/i, "hype: risk free"],
];

const SOCIAL_PROOF = [
  [/\btrusted by\b/i, "invented social proof: trusted by"],
  [/\bthousands of\b/i, "invented social proof: thousands of"],
  [/\b\d[\d,]*\+?\s+(customers|traders|users|businesses)\b/i, "invented customer count"],
  [/\b(5|five)[ -]star\b/i, "invented review claim"],
  [/\brated\s+\d/i, "invented review claim"],
  [/\bour (customers|users|traders)\b/i, "claim about customers we do not have"],
  [/\bjoin\s+\d[\d,]*\b/i, "invented sign-up count"],
];

const FEATURE_CLAIMS = [
  [/\banswers? (your|the) (phone|call)\b/i, "claims the app answers the phone"],
  [/\bfiles? (your|a|the) (tax|vat|cis) return\b/i, "claims the app files with HMRC"],
  [/\bconnects? to (xero|quickbooks|freeagent|sage)\b/i, "claims an accounting connection that is not live"],
  [/\bcard payments? (are|is) (live|ready|on)\b/i, "claims card payments are live"],
];

const NEGATION = /\b(not|never|no|cannot|can't|doesn't|does not|isn't|is not|without)\b/i;

for (const page of MANIFEST.pages) {
  const label = page.slug;
  const html = readFileSync(join(HERE, page.preview), "utf8");
  const text = visibleText(html);
  const legacyMeta = CONFIG.legacy_meta_exempt.includes(label);
  const legacyVoice = CONFIG.legacy_voice_exempt.includes(label);

  /* one H1, matching the frontmatter */
  const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => visibleText(m[1]).trim());
  if (h1s.length !== 1) fail(label, `has ${h1s.length} H1 elements, expected exactly 1`);
  else {
    if (page.h1) {
      const got = h1s[0].replace(/\s+/g, " ").trim();
      const want = page.h1.replace(/\s+/g, " ").trim();
      if (got !== want) fail(label, `H1 reads "${got}", frontmatter says "${want}"`);
      else ok(`${label}: one H1`);
    } else {
      fail(label, "frontmatter has no h1 to compare the rendered H1 with");
    }
  }

  /* title and description */
  if (!page.title) fail(label, "no title");
  else if (!legacyMeta && page.title.length >= 60) fail(label, `title is ${page.title.length} characters, under 60 required`);
  if (!page.description) fail(label, "no description");
  else if (!legacyMeta && page.description.length >= 160) fail(label, `description is ${page.description.length} characters, under 160 required`);

  if (!page.publish && !/<meta name="robots" content="noindex, nofollow">/i.test(html)) {
    fail(label, "is not published but does not carry noindex, nofollow");
  }

  const canonical = (html.match(/<link rel="canonical" href="([^"]+)">/i) || [])[1];
  if (!canonical) fail(label, "no canonical link");
  else if (canonical !== page.url) fail(label, `canonical is ${canonical}, expected ${page.url}`);

  /* word count */
  const [minWords, maxWords] = CONFIG.word_counts[page.type] || [0, 100000];
  if (page.words < minWords || page.words > maxWords) {
    fail(label, `${page.words} words is outside ${minWords} to ${maxWords} for type "${page.type}"`);
  }

  /* banned words */
  for (const [re, name] of BANNED_ALWAYS) {
    if (re.test(html) || re.test(text)) fail(label, `banned: ${name}`);
  }
  if (!legacyVoice) {
    for (const [re, name] of BANNED_VOICE) {
      if (re.test(text)) fail(label, `banned: ${name}`);
    }
    /* Rule of three, in its rhetorical shape: three short items, the last
       joined by "and" or "or", inside one sentence. A plain list of three
       facts is not the rhythm; a list is allowed. This looks for the rhythm
       in a sentence with no other comma and no bullet. */
    for (const sentence of sentences(text)) {
      if (/,/.test(sentence) && /, [^,]{1,30} (and|or) [^,]{1,30}[.!?]?$/.test(sentence)) {
        const commas = (sentence.match(/,/g) || []).length;
        if (commas === 1) fail(label, `possible rule of three: "${sentence.slice(0, 110)}"`);
      }
    }
  }

  /* claims */
  for (const sentence of sentences(text)) {
    for (const [re, name] of [...SOCIAL_PROOF, ...FEATURE_CLAIMS]) {
      if (re.test(sentence) && !NEGATION.test(sentence)) fail(label, `${name}: "${sentence.slice(0, 110)}"`);
    }
  }

  /* the price never appears without the trial facts */
  if (/£19\.99/.test(text)) {
    if (!/\b14 days\b/i.test(text)) fail(label, "mentions £19.99 without the 14-day trial");
    if (!/\bcard\b/i.test(text)) fail(label, "mentions £19.99 without saying a card is needed");
  }
  if (!legacyVoice && /\btrial\b/i.test(text) && !/not in the shops yet|not in the stores yet/i.test(text)) {
    fail(label, "mentions a trial without saying the app is not in the shops yet");
  }
  if (!legacyVoice && /start free trial/i.test(text)) {
    fail(label, 'offers "Start free trial" while the app is not in the shops');
  }
  if (label === "faq" && !text.includes("The app is not in the shops yet.")) {
    fail(label, "the FAQ must carry the plain line: The app is not in the shops yet.");
  }

  /* no personal name in anything a reader or a crawler sees */
  const seen = [
    text,
    ...[...html.matchAll(/\balt="([^"]*)"/gi)].map((m) => m[1]),
    page.title,
    page.description,
    ...graphOf(html).map((n) => JSON.stringify(n)),
  ].join("\n");
  for (const name of CONFIG.names) {
    if (new RegExp(`\\b${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i").test(seen)) {
      fail(label, `personal name "${name}" appears in page text, alt text, metadata or schema`);
    }
  }

  /* internal links resolve to published pages */
  for (const m of html.matchAll(/<a\b[^>]*href="([^"]+)"/gi)) {
    const href = m[1];
    const slug = targetSlug(href, label);
    if (slug === null) {
      if (/^https?:/i.test(href)) external.add(href);
      continue;
    }
    if (unpublished.has(slug)) {
      fail(label, `links to unpublished page "${slug}" (${href})`);
      continue;
    }
    if (PLANNED.has(slug)) {
      fail(label, `draws a link to a page that has not been written yet: "${slug}" (${href})`);
      continue;
    }
    if (pages.has(slug)) {
      if (!published.has(slug)) fail(label, `links to unpublished page "${slug}"`);
    } else {
      const local = join(HERE, href.split("#")[0].replace(/^\//, ""));
      if (!existsSync(local)) fail(label, `internal link does not resolve: ${href}`);
    }
  }

  /* the schema the type needs */
  const nodes = graphOf(html);
  const types = new Set(nodes.map((n) => n["@type"]));
  const need = ["WebPage", "Organization", "WebSite"];
  if (label !== "index") need.push("BreadcrumbList");
  if (page.type === "hub") need.push("SoftwareApplication");
  if (page.type === "faq") need.push("FAQPage");
  for (const type of need) {
    if (!types.has(type)) fail(label, `schema is missing ${type}`);
  }
  if (page.type === "faq") {
    const faq = nodes.find((n) => n["@type"] === "FAQPage");
    const count = faq && Array.isArray(faq.mainEntity) ? faq.mainEntity.length : 0;
    if (count !== 12) fail(label, `FAQPage schema has ${count} questions, expected 12`);
    if (label === "faq" && count !== 12) fail(label, "the FAQ must carry twelve questions");
  }
}

/* One price, stated in the pricing page and in the machine files the site and
   the answer engines read. A price that drifts between them is the one piece of
   copy a trader can hold us to. */
const siteData = JSON.parse(readFileSync(join(HERE, "content", "_data", "site.json"), "utf8"));
const offerPrice = siteData.software && siteData.software.offers && siteData.software.offers.price;
const llmsPath = join(HERE, "llms.txt");
const llmsText = existsSync(llmsPath) ? readFileSync(llmsPath, "utf8") : "";
if (!offerPrice) {
  fail("site.json", "has no price for the app");
} else {
  if (!llmsText.includes(`£${offerPrice}`)) {
    fail("llms.txt", `does not carry the price £${offerPrice} that site.json states`);
  }
  if (pages.has("pricing")) {
    const pricingHtml = readFileSync(join(HERE, pages.get("pricing").preview), "utf8");
    if (!visibleText(pricingHtml).includes(`£${offerPrice}`)) {
      fail("pricing", `does not carry £${offerPrice}, the price in site.json`);
    }
    const software = graphOf(pricingHtml).find((n) => n["@type"] === "SoftwareApplication");
    const schemaPrice = software && software.offers && software.offers.price;
    if (schemaPrice !== offerPrice) {
      fail("pricing", `schema price is ${schemaPrice}, site.json says ${offerPrice}`);
    }
  }
}

/* external links answer */
for (const url of [...external].sort()) {
  const answer = await externalAnswers(url, linkCache);
  if (!answer.ok) fail("links", `${url} answered ${answer.status || answer.error || "nothing"}`);
}

/* Rule 1, proved rather than assumed: a link written in a page's source to a
   draft, or to a page planned but not yet written, is not drawn in the rendered
   page. Three links to drafts exist today (about to the FAQ, the FAQ to about,
   the policy to the FAQ) and the features hub names all seventeen of its pages,
   so this counter has to be above zero. */
let hiddenLinks = 0;
for (const page of MANIFEST.pages) {
  const src = join(HERE, "content", `${page.slug}.md`);
  if (!existsSync(src)) continue;
  const markdown = readFileSync(src, "utf8");
  const html = readFileSync(join(HERE, page.preview), "utf8");
  for (const m of markdown.matchAll(/\]\(\/([a-z0-9/-]+?)\.html\)/gi)) {
    const slug = m[1];
    if (!unpublished.has(slug) && !PLANNED.has(slug)) continue;
    hiddenLinks += 1;
    if (new RegExp(`<a\\b[^>]*href="/${slug}\\.html"`, "i").test(html)) {
      fail(page.slug, `drew a link to unpublished page "${slug}"`);
    }
  }
}

/* The planned register is the list of pages not written yet. An entry that has
   a file is stale, and a planned page must never be in the manifest. */
for (const slug of PLANNED) {
  if (existsSync(join(HERE, "content", `${slug}.md`))) {
    fail("planned.json", `names "${slug}" but content/${slug}.md exists: remove the stale entry`);
  }
  if (pages.has(slug)) fail("planned.json", `names "${slug}" but the page is in the manifest`);
}

/* The features hub says every one of its seventeen pages is linked. The links
   are hidden until each page lands, so the proof is in the source. */
const featuresSrc = join(HERE, "content", "features.md");
if (existsSync(featuresSrc)) {
  const markdown = readFileSync(featuresSrc, "utf8");
  const featurePlanned = [...PLANNED].filter((slug) => slug.startsWith("features/"));
  for (const slug of featurePlanned) {
    if (!markdown.includes(`(/${slug}.html)`)) {
      fail("features", `does not link "${slug}"`);
    }
  }
  const linked = (markdown.match(/\]\(\/features\/[a-z0-9-]+\.html\)/g) || []).length;
  if (linked !== featurePlanned.length) {
    fail("features", `links ${linked} feature pages, planned.json holds ${featurePlanned.length}`);
  }
}

/* every unpublished page is absent from the site root */
for (const slug of unpublished) {
  const page = pages.get(slug);
  if (page && existsSync(join(HERE, page.out))) {
    fail(slug, `is marked not published but ${page.out} exists in the site root`);
  }
}

/* sitemap from the published set only */
const sitemapIndex = readFileSync(join(HERE, "sitemap.xml"), "utf8");
const layers = [...sitemapIndex.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (!layers.length) fail("sitemap", "the index names no sitemap files");
const sitemapUrls = [];
for (const layer of layers) {
  const name = layer.split("/").pop();
  const file = join(HERE, name);
  if (!existsSync(file)) { fail("sitemap", `${layer} does not exist`); continue; }
  const xml = readFileSync(file, "utf8");
  for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) sitemapUrls.push(m[1]);
}
for (const page of MANIFEST.pages) {
  const count = sitemapUrls.filter((u) => u === page.url).length;
  if (page.publish && count !== 1) fail("sitemap", `${page.url} appears ${count} times, expected once`);
  if (!page.publish && count !== 0) fail("sitemap", `${page.url} is unpublished but is in the sitemap`);
}

/* the footer is generated from the published set */
for (const page of MANIFEST.pages) {
  const html = readFileSync(join(HERE, page.preview), "utf8");
  const footer = (html.match(/<footer class="site-footer">[\s\S]*?<\/footer>/i) || [""])[0];
  for (const m of footer.matchAll(/<a\b[^>]*href="([^"]+)"/gi)) {
    const slug = targetSlug(m[1], page.slug);
    if (slug && !published.has(slug)) fail(page.slug, `footer links to unpublished page "${slug}"`);
  }
  if (!footer.includes('href="/privacy.html"')) fail(page.slug, "footer does not carry the privacy link");
  if (!footer.includes('href="/terms.html"')) fail(page.slug, "footer does not carry the terms link");
}

/* persist the link answers */
mkdirSync(dirname(CACHE), { recursive: true });
writeFileSync(CACHE, JSON.stringify(linkCache, null, 2) + "\n");

console.log("");
if (failures.length) {
  console.log(`QUALITY GATE FAILED: ${failures.length} problem(s), ${passes.length} check(s) passed.`);
  for (const f of failures) console.log(`  x ${f}`);
  process.exit(1);
}
console.log(
  `QUALITY GATE GREEN: ${MANIFEST.pages.length} pages, ` +
  `${published.size} live and ${unpublished.size} draft, ${external.size} external links checked, ` +
  `${layers.length} sitemap layer(s), ${hiddenLinks} link(s) to drafts hidden.`,
);
