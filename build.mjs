#!/usr/bin/env node
/* ============================================================================
 *  build.mjs — one template, one folder of text files, one site.
 *
 *  Read `content/`. Every page is a Markdown file with frontmatter. This
 *  renders all of them into `_build/` (so the checks can read the words a
 *  reader would see), and copies ONLY the pages with `publish: true` into the
 *  site root. Everything else in the repo is left alone.
 *
 *  Three rules are enforced here rather than promised in a document:
 *
 *  1. A link to a page that is not published is hidden, never drawn. An
 *     inline link keeps its words and loses its `<a>`; a navigation or footer
 *     entry is not rendered at all. After rendering, the page is scanned and
 *     the build fails if any anchor still points at an unpublished page.
 *  2. The footer link map is generated from the published set. The config
 *     names pages; a page that is not live cannot reach the footer.
 *  3. The sitemap is generated from the published set: an index plus one file
 *     per page type.
 *  4. A link to a page named in `content/_data/planned.json` is hidden the same
 *     way. Those are pages the library will hold but no session has written
 *     yet, so a hub can name its whole set from the first session and the
 *     links appear as each page lands. The register may not name a page that
 *     exists: that entry is stale and the build refuses it.
 *
 *  Usage: node build.mjs
 * ========================================================================== */

import {
  readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, statSync,
  unlinkSync, symlinkSync,
} from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const CONTENT = join(HERE, "content");
const LAYOUTS = join(CONTENT, "_layouts");
const DATA = join(CONTENT, "_data");
const BUILD = join(HERE, "_build");

/* ------------------------------------------------------------------ files */

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    if (name.startsWith("_") || name.startsWith(".")) continue;
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) out.push(...walk(full));
    else if (name.endsWith(".md")) out.push(full);
  }
  return out;
}

function readJson(file, fallback) {
  if (!existsSync(file)) {
    if (fallback !== undefined) return fallback;
    throw new Error(`Missing ${relative(HERE, file)}`);
  }
  return JSON.parse(readFileSync(file, "utf8"));
}

/* ------------------------------------------------------------ frontmatter */

function parseScalar(raw) {
  const v = raw.trim();
  if (v === "true") return true;
  if (v === "false") return false;
  if (v === "null" || v === "~" || v === "") return "";
  if (/^-?\d+(\.\d+)?$/.test(v)) return Number(v);

  if (v.startsWith("[") && v.endsWith("]")) {
    const inner = v.slice(1, -1).trim();
    if (!inner) return [];
    const items = [];
    let cur = "";
    let quote = null;
    for (const ch of inner) {
      if (quote) {
        if (ch === quote) quote = null;
        else cur += ch;
      } else if (ch === '"' || ch === "'") {
        quote = ch;
      } else if (ch === ",") {
        items.push(parseScalar(cur));
        cur = "";
      } else {
        cur += ch;
      }
    }
    items.push(parseScalar(cur));
    return items;
  }

  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
    return v.slice(1, -1);
  }
  return v;
}

export function parseFrontmatter(text, file) {
  if (!text.startsWith("---\n")) throw new Error(`${file}: no frontmatter`);
  const end = text.indexOf("\n---\n", 4);
  if (end < 0) throw new Error(`${file}: frontmatter does not close`);
  const head = text.slice(4, end);
  const body = text.slice(end + 5);

  const data = {};
  for (const line of head.split("\n")) {
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const at = line.indexOf(":");
    if (at < 0) throw new Error(`${file}: frontmatter line is not key: value -> ${line}`);
    const key = line.slice(0, at).trim();
    data[key] = parseScalar(line.slice(at + 1));
  }
  return { data, body };
}

/* --------------------------------------------------------------- markdown */

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function inline(text) {
  let out = text;
  out = out.replace(/`([^`]+)`/g, "<code>$1</code>");
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>");
  out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>');
  return out;
}

/** A deliberately small Markdown reader: headings, paragraphs, lists,
 *  quotes, rules and inline links. The new pages use only these, so a page
 *  cannot depend on a Markdown feature the system does not guarantee. */
export function renderMarkdown(md, slug = "") {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const out = [];
  const ids = new Set();
  let i = 0;

  const uniqueId = (text) => {
    const base = slugify(text) || "section";
    let id = base;
    let n = 2;
    while (ids.has(id)) id = `${base}-${n++}`;
    ids.add(id);
    return id;
  };

  while (i < lines.length) {
    const line = lines[i];

    if (!line.trim()) { i++; continue; }

    if (/^---+$/.test(line.trim())) { out.push("<hr>"); i++; continue; }

    const h = line.match(/^(#{1,4})\s+(.*)$/);
    if (h) {
      const level = h[1].length;
      const text = inline(h[2].trim());
      const id = uniqueId(h[2]);
      const cls = level === 1 ? ' class="display"' : ' class="display display--xs"';
      out.push(`<h${level}${cls} id="${id}">${text}</h${level}>`);
      i++;
      continue;
    }

    if (/^>\s?/.test(line)) {
      const buf = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        buf.push(lines[i].replace(/^>\s?/, ""));
        i++;
      }
      out.push(`<blockquote><p>${inline(buf.join(" ").trim())}</p></blockquote>`);
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      const buf = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) {
        buf.push(`<li>${inline(lines[i].replace(/^[-*]\s+/, "").trim())}</li>`);
        i++;
      }
      out.push(`<ul>${buf.join("")}</ul>`);
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const buf = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
        buf.push(`<li>${inline(lines[i].replace(/^\d+\.\s+/, "").trim())}</li>`);
        i++;
      }
      out.push(`<ol>${buf.join("")}</ol>`);
      continue;
    }

    if (line.trim().startsWith("<")) {
      out.push(line);
      i++;
      continue;
    }

    const buf = [];
    while (i < lines.length && lines[i].trim() && !/^(#{1,4})\s|^[-*]\s|^\d+\.\s|^>|^---+$/.test(lines[i]) && !lines[i].trim().startsWith("<")) {
      buf.push(lines[i].trim());
      i++;
    }
    out.push(`<p>${inline(buf.join(" "))}</p>`);
  }

  return out.join("\n");
}

/* --------------------------------------------------------------- template */

function lookup(stack, path) {
  for (let s = stack.length - 1; s >= 0; s--) {
    let cur = stack[s];
    let found = true;
    for (const part of path.split(".")) {
      if (cur == null || typeof cur !== "object" || !(part in cur)) { found = false; break; }
      cur = cur[part];
    }
    if (found) return cur;
  }
  return undefined;
}

function blockEnd(tpl, from, kind) {
  const re = /\{\{\s*(#[a-z]+\b[^}]*|\/[a-z]+|else)\s*\}\}/g;
  re.lastIndex = from;
  let depth = 1;
  let elseAt = -1;
  for (let m = re.exec(tpl); m; m = re.exec(tpl)) {
    const tok = m[1];
    if (tok.startsWith(`#${kind}`)) depth++;
    else if (tok === `/${kind}`) {
      depth--;
      if (depth === 0) return { start: m.index, else: elseAt, end: re.lastIndex };
    } else if (tok === "else" && depth === 1 && elseAt < 0) {
      elseAt = m.index;
    }
  }
  throw new Error(`Template: {{#${kind}}} has no {{/${kind}}}`);
}

export function renderTemplate(tpl, stack) {
  let out = "";
  let i = 0;
  while (i < tpl.length) {
    const open = tpl.indexOf("{{", i);
    if (open < 0) { out += tpl.slice(i); break; }
    out += tpl.slice(i, open);
    const close = tpl.indexOf("}}", open);
    if (close < 0) { out += tpl.slice(open); break; }
    const token = tpl.slice(open + 2, close).trim();
    i = close + 2;

    if (token.startsWith("#if ")) {
      const key = token.slice(4).trim();
      const end = blockEnd(tpl, i, "if");
      const truePart = tpl.slice(i, end.else >= 0 ? end.else : end.start);
      const falsePart = end.else >= 0 ? tpl.slice(end.else + "{{else}}".length, end.start) : "";
      out += renderTemplate(lookup(stack, key) ? truePart : falsePart, stack);
      i = end.end;
    } else if (token.startsWith("#each ")) {
      const key = token.slice(6).trim();
      const end = blockEnd(tpl, i, "each");
      const list = lookup(stack, key);
      if (Array.isArray(list)) {
        for (const item of list) out += renderTemplate(tpl.slice(i, end.start), [...stack, item]);
      }
      i = end.end;
    } else if (token.startsWith("/")) {
      /* handled by blockEnd */
    } else {
      const value = lookup(stack, token);
      if (value !== undefined && value !== null) out += String(value);
    }
  }
  return out;
}

/* ------------------------------------------------------------------ links */

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

function pageHref(slug) {
  return slug === "index" ? "/" : `/${slug}.html`;
}

function attrValue(attrs, name) {
  const m = attrs.match(new RegExp(`\\b${name}="([^"]*)"`, "i"));
  return m ? m[1] : "";
}

/** Rule 1, applied to words written inside a page. */
function filterBodyLinks(html, page, pages, published, planned) {
  const isHidden = (href) => {
    const slug = targetSlug(href, page.data.slug);
    if (!slug) return false;
    if (planned.has(slug)) return true;
    return pages.has(slug) && !published.has(slug);
  };

  // A list item that exists only to carry an unpublished link is not drawn.
  html = html.replace(/<li>\s*<a\b([^>]*)>([\s\S]*?)<\/a>\s*<\/li>/gi, (whole, attrs) => {
    return isHidden(attrValue(attrs, "href")) ? "" : whole;
  });

  // Inline links keep their words and lose the link.
  html = html.replace(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi, (whole, attrs) => {
    return isHidden(attrValue(attrs, "href")) ? whole.replace(/<a\b[^>]*>([\s\S]*?)<\/a>/i, "$1") : whole;
  });

  return html;
}

/* ----------------------------------------------------------------- schema */

function breadcrumbNode(page, pages, published) {
  const names = Array.isArray(page.data.breadcrumb) ? page.data.breadcrumb : [];
  if (names.length < 2) return null;
  const slugs = Array.isArray(page.data.breadcrumb_slugs) ? page.data.breadcrumb_slugs : [];
  const items = [];
  for (let n = 0; n < names.length; n++) {
    const last = n === names.length - 1;
    let url;
    if (n === 0) url = page.data.url.replace(/\/[^/]*$/, "/") || "https://yellowtradie.com/";
    else if (last) url = page.data.url;
    else {
      const slug = slugs[n];
      if (slug && pages.has(slug) && published.has(slug)) url = `${page.data.site_base}${pageHref(slug)}`;
    }
    const item = { "@type": "ListItem", position: n + 1, name: names[n] };
    if (url) item.item = url;
    items.push(item);
  }
  return {
    "@type": "BreadcrumbList",
    "@id": `${page.data.url}#breadcrumb`,
    itemListElement: items,
  };
}

function faqNode(page) {
  if (!page.data.faq) return null;
  if (!page.faqItems || page.faqItems.length < 2) {
    throw new Error(`${page.data.slug}: faq: true but fewer than two "## question" sections in the body`);
  }
  return {
    "@type": "FAQPage",
    "@id": `${page.data.url}#faq`,
    mainEntity: page.faqItems.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  };
}

function schemaFor(page, site, pages, published) {
  const url = page.data.url;
  const graph = [
    {
      "@type": "Organization",
      "@id": `${site.base_url}/#organization`,
      name: site.name,
      url: `${site.base_url}/`,
      logo: `${site.base_url}/${site.logo}`,
      email: site.email,
      description: site.organization_description,
      areaServed: { "@type": "Country", name: "United Kingdom" },
    },
    {
      "@type": "WebSite",
      "@id": `${site.base_url}/#website`,
      url: `${site.base_url}/`,
      name: site.name,
      inLanguage: "en-GB",
      publisher: { "@id": `${site.base_url}/#organization` },
    },
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: page.data.title,
      description: page.data.description,
      isPartOf: { "@id": `${site.base_url}/#website` },
      datePublished: page.data.published,
      dateModified: page.data.updated,
      inLanguage: "en-GB",
      publisher: { "@id": `${site.base_url}/#organization` },
    },
  ];

  const crumb = breadcrumbNode(page, pages, published);
  if (crumb) graph.push(crumb);
  if (page.data.software) graph.push(site.software);
  const faq = faqNode(page);
  if (faq) graph.push(faq);

  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }, null, 2);
}

/* ------------------------------------------------------------------- page */

function loadPages() {
  const pages = new Map();
  for (const file of walk(CONTENT)) {
    const raw = readFileSync(file, "utf8");
    const { data, body } = parseFrontmatter(raw, relative(HERE, file));
    for (const key of ["slug", "type", "title", "description", "publish"]) {
      if (data[key] === undefined) throw new Error(`${relative(HERE, file)}: frontmatter is missing "${key}"`);
    }
    if (typeof data.publish !== "boolean") throw new Error(`${relative(HERE, file)}: publish must be true or false`);
    if (pages.has(data.slug)) throw new Error(`${relative(HERE, file)}: duplicate slug "${data.slug}"`);

    const out = data.slug === "index" ? "index.html" : `${data.slug}.html`;
    /* One text file per page. The page's own body comes first; anything after
       this marker is drawn after </main> and before the schema (the home page's
       sign-up modal and sticky bar live there). */
    const marker = "<!-- body-end -->";
    const cut = body.indexOf(marker);
    const page = {
      file: relative(HERE, file),
      data: {
        ...data,
        out,
        preview: join("_build", out),
        url: data.slug === "index" ? "https://yellowtradie.com/" : `https://yellowtradie.com/${out}`,
        og_title: data.og_title || data.title,
        og_description: data.og_description || data.description,
        og_type: data.og_type || "article",
      },
      body: cut >= 0 ? body.slice(0, cut) : body,
      end: cut >= 0 ? body.slice(cut + marker.length) : "",
    };

    if (data.faq) {
      page.faqItems = [];
      const answerFrom = (lines) => lines
        .join(" ")
        .replace(/^###.*$/gm, " ")
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .replace(/[*`>#-]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

      /* A page whose H2s are the questions (the FAQ and the pricing page) keeps
         that shape. A page with sections of prose marks its FAQ as H3s under a
         "Questions" H2, and only those H3s become schema questions. */
      for (const section of body.split(/\n## /).slice(1)) {
        const [headingLine, ...rest] = section.split("\n");
        const question = headingLine.trim();
        if (!question.endsWith("?")) continue;
        const answer = answerFrom(rest);
        if (answer) page.faqItems.push({ question, answer });
      }
      const faqSection = body.match(/\n## (?:Questions|Frequently asked questions)\n([\s\S]*?)(?=\n## |$)/i);
      if (faqSection) {
        for (const sub of faqSection[1].split(/\n### /).slice(1)) {
          const [headingLine, ...rest] = sub.split("\n");
          const question = headingLine.trim();
          const answer = answerFrom(rest);
          if (question && answer) page.faqItems.push({ question, answer });
        }
      }
    }

    pages.set(data.slug, page);
  }
  return pages;
}

function navFor(page, pages, published, navConfig) {
  const variant = page.data.chrome === "home" ? "home" : "inner";
  const entries = navConfig[variant] || [];
  const out = [];
  for (const entry of entries) {
    if (!pages.has(entry.page)) throw new Error(`nav.json names a page that does not exist: ${entry.page}`);
    if (!published.has(entry.page)) continue;
    out.push({
      label: entry.label,
      href: `${pageHref(entry.page)}${entry.hash ? `#${entry.hash}` : ""}`,
      current: entry.mark_current && page.data.slug === entry.page ? "1" : "",
    });
  }
  return out;
}

function footerFor(page, pages, published, footerConfig) {
  const full = page.data.chrome !== "home";
  const columns = [];
  if (full) {
    const config = footerConfig.inner || [];
    for (const col of config) {
      const heading = col.first && page.data.footer_heading ? page.data.footer_heading : col.heading;
      const links = [];
      for (const link of col.links) {
        if (link.page) {
          if (!pages.has(link.page)) throw new Error(`footer.json names a page that does not exist: ${link.page}`);
          if (!published.has(link.page)) continue;
          links.push({ label: link.label, href: `${pageHref(link.page)}${link.hash ? `#${link.hash}` : ""}` });
        } else if (link.href) {
          links.push({ label: link.label, href: link.href });
        }
      }
      if (links.length) columns.push({ heading, links });
    }
  }

  const legal = [];
  const legalPages = [...pages.values()]
    .filter((p) => p.data.footer_legal && published.has(p.data.slug))
    .sort((a, b) => (a.data.footer_order || 100) - (b.data.footer_order || 100));
  for (const p of legalPages) {
    legal.push({ label: p.data.footer_label || p.data.title, href: pageHref(p.data.slug) });
  }

  return { full, columns, legal };
}

function sourcesFor(page) {
  const sources = Array.isArray(page.data.sources) ? page.data.sources : [];
  if (!sources.length) return "";
  const items = sources.map((entry) => {
    const [label, url] = String(entry).split("|").map((s) => s.trim());
    const href = url || label;
    const text = url ? label : label.replace(/^https?:\/\//, "").replace(/\/$/, "");
    return `        <li><a href="${href}" rel="noopener">${text}</a></li>`;
  });
  return [
    '      <div class="sources">',
    '        <h2 class="display display--xs">Sources</h2>',
    "        <ul>",
    ...items,
    "        </ul>",
    "      </div>",
  ].join("\n");
}

function breadcrumbLine(page) {
  if (!page.data.breadcrumb_visible) return "";
  const names = Array.isArray(page.data.breadcrumb) ? page.data.breadcrumb : [];
  if (names.length < 2) return "";
  const bits = [];
  for (let n = 0; n < names.length; n++) {
    if (n === 0) bits.push('<a href="/">Home</a>');
    else bits.push(names[n]);
  }
  return `<p class="eyebrow tertiary">${bits.join(" / ")}</p>`;
}

function countWords(html) {
  const text = html
    .replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text ? text.split(/\s+/).filter((w) => /[a-z0-9\u00a3]/i.test(w)).length : 0;
}

/* ------------------------------------------------------------------- main */

function main() {
  const site = readJson(join(DATA, "site.json"));
  const navConfig = readJson(join(LAYOUTS, "nav.json"));
  const footerConfig = readJson(join(LAYOUTS, "footer.json"));
  const layout = readFileSync(join(LAYOUTS, "page.html"), "utf8");
  const planned = new Set(readJson(join(DATA, "planned.json"), []));
  const pages = loadPages();

  for (const slug of planned) {
    if (pages.has(slug)) {
      throw new Error(
        `planned.json names "${slug}" but content/${slug}.md exists. ` +
        "The page has been written, so its link no longer needs hiding. Remove it from planned.json.",
      );
    }
  }

  if (!pages.has("index")) throw new Error("content/index.md is missing: the home page is not optional");
  if (!pages.get("index").data.publish) throw new Error("content/index.md must stay published: it is the home page");

  const published = new Set([...pages.values()].filter((p) => p.data.publish).map((p) => p.data.slug));
  const unpublished = new Set([...pages.keys()].filter((s) => !published.has(s)));

  mkdirSync(BUILD, { recursive: true });
  for (const name of ["styles.css", "app.js", "assets"]) {
    const link = join(BUILD, name);
    if (!existsSync(link)) {
      try { symlinkSync(join("..", name), link); } catch { /* a host that forbids symlinks only loses the preview's paint */ }
    }
  }

  const manifest = {
    generated_at: new Date().toISOString(),
    pages: [],
    published: [...published],
    unpublished: [...unpublished],
    planned: [...planned],
  };

  for (const page of pages.values()) {
    page.data.site_base = site.base_url;
    const bodyHtml = page.data.body_format === "html"
      ? page.body
      : renderMarkdown(page.body, page.data.slug);

    const content = filterBodyLinks(bodyHtml, page, pages, published, planned);
    const schema = schemaFor(page, site, pages, published);
    const nav = navFor(page, pages, published, navConfig);
    const footer = footerFor(page, pages, published, footerConfig);

    let html;
    try {
      html = renderTemplate(layout, [{
        ...page.data,
        content,
        schema,
        nav,
        footer,
        body_end: filterBodyLinks(page.end, page, pages, published, planned),
        sources_html: sourcesFor(page),
        breadcrumb_line: breadcrumbLine(page),
        header_button: page.data.chrome !== "home" ? "1" : "",
        robots: page.data.publish ? (page.data.robots || "") : "noindex, nofollow",
        site,
        favicon_version: site.favicon_version,
        styles_version: site.styles_version,
        ga_id: site.ga_id,
        logo: site.logo,
        ga_jsonld: schema,
      }]);
    } catch (err) {
      throw new Error(`${page.file}: ${err.message}`);
    }

    // Rule 1's safety net: no anchor to an unpublished page may survive.
    for (const m of html.matchAll(/<a\b[^>]*href="([^"]+)"/gi)) {
      const slug = targetSlug(m[1], page.data.slug);
      if (slug && (unpublished.has(slug) || planned.has(slug))) {
        throw new Error(`${page.data.slug}: rendered an anchor to unpublished page "${slug}" (${m[1]})`);
      }
    }

    const previewPath = join(BUILD, page.data.out);
    mkdirSync(dirname(previewPath), { recursive: true });
    writeFileSync(previewPath, html);

    const words = countWords(content);
    manifest.pages.push({
      slug: page.data.slug,
      type: page.data.type,
      title: page.data.title,
      description: page.data.description,
      h1: page.data.h1 || "",
      publish: page.data.publish,
      preview: page.data.preview,
      out: page.data.out,
      url: page.data.url,
      words,
      sources: page.data.sources || [],
    });

    if (page.data.publish) {
      const dest = join(HERE, page.data.out);
      mkdirSync(dirname(dest), { recursive: true });
      writeFileSync(dest, html);
    } else if (existsSync(join(HERE, page.data.out))) {
      throw new Error(
        `${page.data.slug} is not published but ${page.data.out} exists in the site root. ` +
        "Nothing in this build deletes a page, so an old copy would stay live. Remove it by hand, then build again.",
      );
    }

    console.log(
      `  ${page.data.publish ? "LIVE " : "draft"}  ${page.data.slug.padEnd(22)} ` +
      `${String(words).padStart(5)} words  ${page.data.publish ? page.data.out : `_build/${page.data.out}`}`,
    );
  }

  // ---- sitemap: an index plus one file per layer, published pages only.
  const layers = new Map();
  for (const p of pages.values()) {
    if (!p.data.publish) continue;
    if (!layers.has(p.data.type)) layers.set(p.data.type, []);
    layers.get(p.data.type).push(p);
  }
  const layerFiles = [];
  for (const [type, list] of layers) {
    const name = `sitemap-${type}.xml`;
    const urls = list
      .sort((a, b) => a.data.url.localeCompare(b.data.url))
      .map((p) => {
        const freq = p.data.changefreq || (p.data.type === "legal" ? "yearly" : "weekly");
        const prio = p.data.priority !== undefined ? p.data.priority : (p.data.type === "legal" ? "0.3" : "0.6");
        return [
          "  <url>",
          `    <loc>${p.data.url}</loc>`,
          `    <lastmod>${p.data.updated}</lastmod>`,
          `    <changefreq>${freq}</changefreq>`,
          `    <priority>${Number(prio).toFixed(1)}</priority>`,
          "  </url>",
        ].join("\n");
      });
    writeFileSync(join(HERE, name), [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      ...urls,
      "</urlset>",
      "",
    ].join("\n"));
    layerFiles.push({ name, type, count: list.length, lastmod: list.map((p) => p.data.updated).sort().pop() });
  }

  const generatedLayers = new Set(layerFiles.map((l) => l.name));
  for (const name of readdirSync(HERE)) {
    if (/^sitemap-.+\.xml$/.test(name) && !generatedLayers.has(name)) unlinkSync(join(HERE, name));
  }

  writeFileSync(join(HERE, "sitemap.xml"), [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...layerFiles.map((l) => `  <sitemap><loc>${site.base_url}/${l.name}</loc><lastmod>${l.lastmod}</lastmod></sitemap>`),
    "</sitemapindex>",
    "",
  ].join("\n"));

  writeFileSync(join(BUILD, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");

  console.log("");
  console.log(`Built ${pages.size} pages: ${published.size} live, ${unpublished.size} draft.`);
  console.log(`Sitemap index: ${layerFiles.map((l) => `${l.name} (${l.count})`).join(", ")}.`);
  console.log("Footer: generated from the published set.");
  if (unpublished.size) {
    console.log(`Hidden because not published: ${[...unpublished].join(", ")}.`);
  }
}

main();
