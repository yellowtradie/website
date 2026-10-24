# yellowtradie-site

The YellowTradie site. Every page is one Markdown file in `content/`, rendered
by `build.mjs` into the HTML at the root. Plain CSS and JavaScript, no framework,
no dependencies. The generated HTML is committed, so any static host serves the
folder as it is.

## Files

| File | What it is |
|---|---|
| `content/` | The library: one Markdown file per page, with the frontmatter in `content-build-plan-2026-10-21.md` §5.2. The words live here, not in the HTML |
| `content/_layouts/page.html` | The one frame: header, nav, breadcrumb, footer and the page's schema block |
| `content/_layouts/nav.json` | The top menu, by page slug. An entry whose page is not published is not drawn |
| `content/_layouts/footer.json` | The footer link map, by page slug. It grows as pages publish and cannot point at a missing page |
| `build.mjs` | Renders every page into `_build/`, copies the published ones to the root and writes the sitemap |
| `check.mjs` | The quality gate: one H1, metadata, links, schema, banned words, claims, word counts, no name, sitemap and footer from the published set |
| `copy-guard.mjs` | Fetches the competitor's public pages once a week, stores a hash of every sentence and fails any page of ours that shares one |
| `index.html` | Generated from `content/index.md`. The page, on eight screens |
| `changelog.html` | Generated from `content/changelog.md`. What's new: dated entries on the site and early access |
| `privacy.html` | Generated from `content/privacy.md`. Privacy and cookies. Carries the switch that turns the Google tag off. Footer link text is just "Privacy": the owner's call, 2026-09-23, the long version read as jargon |
| `terms.html` | Generated from `content/terms.md`. Terms of use. Reading the site, the calculator, joining the early access list, the limit of liability and which law applies |
| `changelog.html` | What's new: dated entries on the site and early access. The second page the AEO audit needs for internal links |
| `privacy.html` | Privacy and cookies. The only page with prose rather than cards. Carries the switch that turns the Google tag off. Footer link text is just "Privacy": the owner's call, 2026-09-23, the long version read as jargon |
| `terms.html` | Terms of use. Reading the site, the calculator, joining the early access list, the limit of liability and which law applies. The suite checks the page and that every footer link on all four pages resolves |
| `styles.css` | All styling. The exact colours, fonts, sizes and weights sit in the `:root` block at the top |
| `assets/noise-page.png` | The grain on the page background. A 128px tiling PNG, dyed to `#FBFAED`, shifted to an exact zero mean so the paper keeps its colour. There was a second tile for the yellow band until 2026-10-22; the band came off the page and the tile went with it. Do not swap this for a CSS `feTurbulence` filter: that one is not mean-neutral and darkens the paper (see the token comment in `styles.css`) |
| `app.js` | The signup modal, the missed call calculator and the sticky phone bar. One setting to change: `FORM_ENDPOINT` |
| `robots.txt` | Allows the AI crawlers and points at the sitemap |
| `sitemap.xml` | Generated. An index that points at one file per page type, published pages only |
| `sitemap-*.xml` | Generated layers: `sitemap-hub.xml`, `sitemap-post.xml`, `sitemap-legal.xml` and so on |
| `llms.txt` | The fact sheet for answer engines, at the root where they read it. Keep it in step with `.well-known/llms.txt` |
| `feed.xml` | RSS 2.0 for the changelog. Both pages point at it with `<link rel="alternate">` |
| `.well-known/llms.txt` | The same fact sheet at the conventional path |
| `assets/logo-mark.svg` | The logo mark, Pete's one from 2026-10-22: a near-black `#0B0B0D` tile with a golden-yellow `#F9C613` shield-and-Y glyph on it, traced from the PNG he supplied (`Business/brand/assets/YT Logo Mark/YT-Matk.png`) by `scripts/build-brand-mark.py`. It is one file for the header, the footer of all four pages and the favicon, and it keeps the artwork's own two colours rather than the page's `--y` and `--black` |
| `assets/` | Hero and section images. `assets/CREDITS.md` lists every one |

**Two things not to undo.** In-page links are root-relative (`/#how`, not `#how`)
because the AEO audit counts an `<a>` whose href does not start with `#`, so bare
fragments never count. And `feed.xml` and `llms.txt` are deliberately not linked
as `<a>` tags anywhere: the crawler follows those and audits the XML as HTML
pages, which fails them and drags the site score down. A feed is discovered by
the `rel="alternate"` link tag; llms.txt by its path.

**No name on the site, and no small print in the footer.** The owner's call,
2026-09-23: his name never appears on any page. The privacy and terms pages both
say "the trading name of a sole trader based in Wales", which carries the legal
meaning without naming anybody, and the suite fails if the name comes back. The
two footer paragraphs ("YellowTradie is in early access..." and "Screens on this
site show the app running with sample data") came off the same day: a visitor
reading the bottom of the page wants the two links and nothing else. The
sample-data point is not lost, because it sits in the privacy page and in the
FAQ, which is where somebody looking for it would go.

**The Google tag.** Both pages carry Google's gtag.js in the `<head>`, property
`G-DZZT654SCD`, added 2026-09-23 (Pete's own Measurement ID). It is the only
third-party script on the site. The suite checks the served page rather than the
file: the ID in the script `src`, the ID in the inline config, a check that no
other property ID appears anywhere in a `<script>`, and the changelog's copy.
Only the two pages carry it, because `feed.xml` and `llms.txt` are not pages.

**Why there is no consent banner.** Since 5 February 2026 the Data (Use and
Access) Act 2025 removed the consent requirement for first-party analytics
cookies whose sole purpose is measuring how a site is used, provided the visitor
is told clearly what they do and is given a simple, free means of objecting
(PECR Schedule A1 paragraph 5; the ICO finalised its storage and access guidance
on 29 April 2026). The privacy page does the telling; the switch on
`privacy.html` does the objecting, and it sets `ga-disable-G-DZZT654SCD` from the
top of `app.js` before gtag loads. If the tag is ever changed to serve adverts,
share data onward, or profile visitors, the exception stops applying and a
consent banner becomes necessary. `scripts/verify-site-modal.mjs` holds the
switch, the cookie names and the tag's placement.


## The content system

Every page is one Markdown file in `content/`. Its frontmatter carries the fields
the content plan names: `slug`, `type`, `title`, `description`, `h1`, `eyebrow`,
`publish`, `faq`, `breadcrumb`, `related` and `sources`. The shared frame lives
once, in `content/_layouts/page.html`.

```
node build.mjs        # render every page, copy the live ones to the root, write the sitemap
node check.mjs        # the quality gate
node copy-guard.mjs   # the plagiarism guard
```

- **`publish: false` is the resting state.** A page with that flag is rendered to
  `_build/` for the checks, and never to the site root.
- **A link to an unpublished page is hidden, not drawn.** An inline link keeps its
  words and loses its `<a>`. A nav or footer entry is not rendered at all. The
  build scans its own output and fails if an anchor to a draft survives.
- **The footer and the sitemap are generated from the published set**, so neither
  can point at a page that is not there.
- **`_build/` is the preview and the input to both checks.** It is not deployed.
- **The sitemap is an index plus one file per page type** (`sitemap.xml` and
  `sitemap-<type>.xml`).
- **The copy guard reads the competitor's public pages once and stores a hash of
  every sentence for a week.** A normal build makes no request. `--refresh` is
  the only way to read early, and it is polite: robots.txt obeyed, one request
  at a time, 600ms apart.
- **`content/` is excluded from the deploy** by `.vercelignore`. The drafts are in
  the repo, not on the web.

The four pages that were hand-written before this system (`index`, `changelog`,
`privacy`, `terms`) are converted. Their body markup was moved across byte for
byte, so their words and their look did not change. Their metadata is named in
`content/_data/gate.json` as exempt from the new length rule, because their
words are frozen this session.

## The page, top to bottom (rebuilt 2026-09-22, rewritten 2026-10-03)

Seven sections. **The page carries Pete's copy and nothing else now**, on his
instruction of 2026-10-03: nothing long is folded away any more, because the copy
that was folded away came off the page.

Three sections came off the page earlier, on 2026-09-22, on Pete's call: the app
screens carousel (`screens`), the "Everything else" pair at the end of the job
stops, and the four trust badges (`trust`).

**2026-10-03, second pass: the old words came off.** The thirteen questions and
the `FAQPage` schema behind them, the paragraphs hidden behind each of the five
stops, the dark band's heading and its paragraph, the "if you run a team" line,
the promise under the hero button, the band's three reasons, the footer's page
links and email address, and the button in the top corner are all gone. The
buttons are rounded pills and every one says "Start free trial" and opens the
sign-up form. **Five things were kept on request:** the missed call calculator,
the sign-up form, the logo, and the privacy and terms links. The whole of the
page as it stood before this pass is kept in
`Business/Website/content/yellowtradie-homepage-2026-10-03-1859.md` and `.html`,
and the copy from the pass before that in `...-1118.md`.

| Screen | Section id | What it is |
|---|---|---|
| 1 | `hero` | "The No-Bullshit app for UK Tradesmen.", one line under it, one button |
| 2 | `pains` | The old way against the YellowTradie way, five rows of cross and tick, scrolling sideways on a phone |
| 3 | `how` | The job as five numbered rows (Lead, Quote, Job, Invoice, Tax), one line each and nothing behind them |
| 4 | `why` | The dark band: four feature cards beside the photograph, with no heading |
| 5 | `calculator` | Two sliders and the year a missed call adds up to. The numbers are the reader's own, and the Start free trial button at the end is the sign-up route now |
| 6 | `final` | The closing words: the 10pm laptop line, and no button |

The yellow `early-access` band was the seventh screen until 2026-10-22. Its words
came off on 2026-10-03, its button came off at Pete's asking on 2026-10-22, and a
band with nothing in it is not worth a stripe, so the whole band went the same
day. The `#early-access` anchor moved to the calculator card, where the remaining
button sits, so old links still land on a sign-up route. The clip slot went with
the band.

Two more things that are not screens: the **sticky bar**, which is phones only
and appears once the hero is behind you, and the **modal**, which every "Start
free trial" control opens.

### The rules the page is checked against

`scripts/verify-site-modal.mjs` drives the real page in headless Chrome over the
devtools protocol and runs **119 assertions**: the seven sections in order, the
calculator's arithmetic, the sticky bar appearing and going away, the tick and
cross marks, the three form fields, the intercepted Formspree post, no horizontal
overflow at 1440 and 390, the palette, the logo mark, and the copy rules. Four
of them guard the three sections that came off in September, so a paste cannot
quietly put a dead section back. **Nineteen were retired and six more retargeted
on 2026-10-03**, because they described copy that had come off the page: the
questions, the folded detail, the word count, the late-job paragraph, the price
anchor and the accountant line among them. Each carries the reason it went or
changed beside it. **Two were added on 2026-10-04, and both are about the shape of
the hero headline rather than its words.** The first fails if any word of it sits
on two painted lines — the word "No-Bullshit" was split at its own hyphen on a
laptop, because a hyphen is a break opportunity and 68px outgrew the copy column.
The second pins the break Pete asked for: "The No-Bullshit" / "app for UK" /
"Tradesmen" on a desktop, which is why the hero's headline runs at 62/64 from
1280 up while every other page keeps the locked display scale. **Both read the
painted lines back one character at a time**, and that detail is the point: a
Range over a word that breaks across two lines returns a single union box, so a
word-level measurement reported the broken headline as intact. It did, on the day
it happened, which is how the fault reached the live page. The one late-job rule
that stayed is the negative one, that nothing may claim the app moves the diary by
itself. **Every guard that was retargeted was proved to bite** by planting the fault into a throwaway copy on a
second port and watching that check go red
(`output/site-fault-proof-pass2.txt`; the 2026-10-04 ones are
`output/site-fault-proof-2026-10-04.txt`). Run it against the preview or the live
domain:

```bash
node scripts/verify-site-modal.mjs                                  # local preview
node scripts/verify-site-modal.mjs https://www.yellowtradie.com/    # live
```

The copy rules it enforces, all of them Pete's calls: no em dash and no arrow
anywhere, nothing that says the app answers the call, **nothing that says the app
moves the diary or texts a customer by itself**, nothing that sells the knock-on
as the whole calendar, no invented job values outside the calculator, nothing
claiming HMRC approval or filing, the four form fields, and the schema's FAQ
answers matching the visible ones word for word.

**The palette, locked 2026-09-25 and moved twice since:** brand yellow `#F9C613`
(Pete's call 2026-10-22: the page matches the yellow in the logo mark. It was
`#FFEF4D` from 2026-09-27, `#E9D228` from 2026-09-25 and `#FFF400` before that),
black `#1A181A`,
page background `#FBFAED` carrying grain, and the banded sections on the same page
colour. Seven checks read these back off the rendered page rather than out of the
stylesheet, and one of them counts stray copies of the retired `#FFF400`,
`#E9D228`, `#FFEF4D` and `#161616` in the markup, so none of them can creep back
into a corner of a page. Four more read the logo mark: the header's fill colours, that
the footer draws the identical shape, that the favicon link is versioned, and the
favicon file itself, fetched over the wire.

The design rules it enforces, all of them read back as computed style rather than
inspected by eye: **the hero text carries no rule above or below it** (Pete asked
for the two yellow bars to come off it on 2026-09-22 16:11) while **the closing
call to action keeps its two yellow bars**, the stage headings under "From the
first ring to the tax done" carry no rule at all, and the last grey rule on a
light background, the bar on the signup pop-up, is still grey rather than yellow.

## Preview it on this machine

From the vault root:

```bash
python3 -m http.server 4173 --directory yellowtradie-site
```

Then open http://127.0.0.1:4173

## Before it goes live

1. **Set the form endpoint.** Open `app.js` and replace `REPLACE_ME` with your
   form URL. Until you do, the page shows a banner that says signups are not
   being sent, and every signup is stored in the browser only.
2. **Register yellowtradie.com.** The page is worthless if the name is taken.
3. **Swap the images** if you want your own photos rather than the stock ones.
4. **Check the email address** in the form fallback and the footer.

## Collecting the signups

The page posts a small JSON body: `{fullName, businessName, email, source,
signed_up_at}`. Any endpoint that accepts a JSON POST works. Two free options:

**Formspree.** Sign up at formspree.io, make a form, and paste its endpoint
(like `https://formspree.io/f/abcdwxyz`) into `FORM_ENDPOINT`. Free tier is 50
submissions a month, which is plenty for early access. Every signup lands in
your inbox and in their dashboard, and you can export a CSV.

**Netlify Forms.** If you host on Netlify, add `netlify` and a form name to the
form tag and Netlify stores the submissions for you with no third party. Free
tier is 100 submissions a month. This needs a small edit to the form in `content/index.md`
rather than `app.js`, so ask before switching.

**The cheapest honest option.** A Google Form behind a button. It looks worse
and leaks Google's styling, but it costs nothing and needs no code.

## Publishing

This folder is its own git repo wired to `github.com/yellowtradie/website`, and
**Vercel deploys every push to `main`**. Nothing else is needed, and anything
pushed here is public for good.

**Push with the helper, not with a plain `git push`** (learned the hard way,
2026-09-22):

```
scripts/push-to-github.sh yellowtradie-site
```

A plain `git push` is refused here. Git has its own saved GitHub login on this
machine and it is a different account (`tishkaai`) with no write access to this
repo, so it answers "Permission denied to tishkaai". The helper pushes as the
`yellowtradie` account from `.release/ghconfig`. The full explanation is in
`AGENTS.md`, Repositories. Vercel has the change live within about a minute;
check the public page rather than the local preview, because `127.0.0.1:4173`
always shows your edits whether they are deployed or not.

Run `node build.mjs` before you push. The generated HTML is committed, so the
host needs no build step of its own, but it does not run the build for you.

- **Netlify:** drag the folder onto app.netlify.com/drop.
- **Cloudflare Pages:** connect the repo, leave the build command empty, set the
  output directory to `yellowtradie-site`.
- **GitHub Pages:** push the folder and turn Pages on for the branch.

Then point the domain: add `yellowtradie.com` and `www.yellowtradie.com` in the
host's domain settings and follow its DNS instructions at the registrar. HTTPS is
automatic on all three.

## Images

The hero photograph is Pete's own, served as `assets/hero.webp` from
`Business/website/assets/YellowTradie-Plumber.webp` on 2026-09-23, and its provenance
is not recorded anywhere, so no licence is claimed for it. It replaced
`hero.jpg` (YellowTradie.png, 2026-09-22 18:01), which replaced `man3.png`,
still in the vault. The five app screens are full
phone captures from the test phone, running sample data, and they came off the
page on 2026-09-22; the files are kept so the section can come back. `assets/CREDITS.md` lists
every image and what is known about it. Keep that file current, because a
photograph with no recorded provenance is the one thing on this page that cannot
be replaced by measurement.

**Two numbers on the hero photograph come from measurement, not taste**, and both
live in the `.hero-media img` block of `styles.css`: the `?v=` version on the URL,
which is what stops a swap being answered out of the browser's cache, and
`object-position: 30% center`, which decides what the cover crop shows. The crop
was re-checked when the photograph changed at 18:01 and did not move, because the
new frame is the same size and shape and reads slightly darker under the headline
than the one it replaced. The box is
55% of the screen wide and full height, so only 60% of a wide photograph survives
the crop at 1440 and 50% at 1024. `CREDITS.md` carries the reasoning and the one
line to change if the framing is wrong, and `scripts/hero-image-profile.mjs`
measures it.

## What this page is not

It is not the app, and it does not talk to the app. Nothing on it collects
customer data, job data or anything beyond an email address.
