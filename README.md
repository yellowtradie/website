# yellowtradie-site

The YellowTradie early access landing page. Plain HTML, CSS and JavaScript.
No build step, no framework, no dependencies. Drop the folder on any host.

## Files

| File | What it is |
|---|---|
| `index.html` | The page. All the copy lives here in plain text, on nine screens, with the detail folded into `<details>` elements |
| `changelog.html` | What's new: ten dated entries on the site and early access. The second page the AEO audit needs for internal links |
| `styles.css` | All styling. The exact colours, fonts, sizes and weights sit in the `:root` block at the top |
| `app.js` | The signup modal, the screen carousel, the missed call calculator and the sticky phone bar. One setting to change: `FORM_ENDPOINT` |
| `robots.txt` | Allows the AI crawlers and points at the sitemap |
| `sitemap.xml` | Both pages |
| `llms.txt` | The fact sheet for answer engines, at the root where they read it. Keep it in step with `.well-known/llms.txt` |
| `feed.xml` | RSS 2.0 for the changelog. Both pages point at it with `<link rel="alternate">` |
| `.well-known/llms.txt` | The same fact sheet at the conventional path |
| `assets/logo-mark.svg` | The logo mark: yellow square, black uppercase T |
| `assets/tiktok.mp4` | The slot is built and waiting. Pete's short vertical clip goes here. Not there yet |
| `assets/` | Hero and section images. `assets/CREDITS.md` lists every one |

**Two things not to undo.** In-page links are root-relative (`/#how`, not `#how`)
because the AEO audit counts an `<a>` whose href does not start with `#`, so bare
fragments never count. And `feed.xml` and `llms.txt` are deliberately not linked
as `<a>` tags anywhere: the crawler follows those and audits the XML as HTML
pages, which fails them and drags the site score down. A feed is discovered by
the `rel="alternate"` link tag; llms.txt by its path.


## The page, top to bottom (rebuilt 2026-09-22)

Nine screens, one idea each, and everything long folded behind a tap. The words
are all still on the page, which is what the search engines and the AI
assistants read; only the scroll was cut. Measured: **40%** of the words are on
screen before anything is opened.

| Screen | Section id | What it is |
|---|---|---|
| 1 | `hero` | Headline, one line under it, one button, and the promise: free while we build, no card |
| 2 | `pains` | Three cards. The missed call, the guess at 8pm, the Friday chasing. They swipe on a phone |
| 3 | `screens` | Five real app screens in a carousel that plays itself until it is touched, then one tap for the walkthrough |
| 4 | `how` | The job, as six numbered stops, one line each, every stop opening to its detail |
| 5 | `why` | The old way against the app, six rows of cross and tick |
| 6 | `trust` | Four badges: the quarterly figures, the accountant, VAT, and your data |
| 7 | `calculator` | Two sliders and the year a missed call adds up to. The numbers are the reader's own |
| 8 | `early-access` | Three reasons and one button. The form is in the modal, with its four fields |
| 9 | `faq` | Twelve questions as an accordion, every answer still on the page in full |

Two more things that are not screens: the **sticky bar**, which is phones only
and appears once the hero is behind you, and the **modal**, which every "Get
early access" control opens.

### The rules the page is checked against

`scripts/verify-site-modal.mjs` drives the real page in headless Chrome over the
devtools protocol and runs **90 assertions**: the nine screens in order, the
accordions opening, the carousel paging, the calculator's arithmetic, the sticky
bar appearing and going away, the tick and cross marks, the four form fields,
the intercepted Formspree post, no horizontal overflow at 1440 and 390, and the
copy rules. Run it against the preview or the live domain:

```bash
node scripts/verify-site-modal.mjs                                  # local preview
node scripts/verify-site-modal.mjs https://www.yellowtradie.com/    # live
```

The copy rules it enforces, all of them Pete's calls: no em dash and no arrow
anywhere, nothing that says the app answers the call, no invented job values
outside the calculator, no HMRC approval badge, the four form fields, and the
schema's FAQ answers matching the visible ones word for word.

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

The page posts a small JSON body: `{fullName, businessName, email, phone, source,
signed_up_at}`. Any endpoint that accepts a JSON POST works. Two free options:

**Formspree.** Sign up at formspree.io, make a form, and paste its endpoint
(like `https://formspree.io/f/abcdwxyz`) into `FORM_ENDPOINT`. Free tier is 50
submissions a month, which is plenty for early access. Every signup lands in
your inbox and in their dashboard, and you can export a CSV.

**Netlify Forms.** If you host on Netlify, add `netlify` and a form name to the
form tag and Netlify stores the submissions for you with no third party. Free
tier is 100 submissions a month. This needs a small edit to `index.html` rather
than `app.js`, so ask before switching.

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

If the folder ever moves to another host, any static host works because there is
no build step.

- **Netlify:** drag the folder onto app.netlify.com/drop.
- **Cloudflare Pages:** connect the repo, leave the build command empty, set the
  output directory to `yellowtradie-site`.
- **GitHub Pages:** push the folder and turn Pages on for the branch.

Then point the domain: add `yellowtradie.com` and `www.yellowtradie.com` in the
host's domain settings and follow its DNS instructions at the registrar. HTTPS is
automatic on all three.

## Images

The hero photograph is Pete's own, converted from
`Business/Website/Assets/standing-next-van.png`, and its provenance is not
recorded anywhere, so no licence is claimed for it. The app screens are crops of
screenshots from the test phone, running sample data. `assets/CREDITS.md` lists
every image and what is known about it. Keep that file current, because a
photograph with no recorded provenance is the one thing on this page that cannot
be replaced by measurement.

## The clip in the early access band

The band carries a slot for a short vertical clip, above the button. The slot is
hidden until the file actually loads, so the page is unchanged while the clip is
missing. To put it live, drop the file at `assets/tiktok.mp4`:

- 9:16 vertical, mp4, under 20 seconds
- Muted and looping, so no sound and no music are needed
- Burn the captions into the picture, because most people watch with the sound off
- Your own footage only. Do not use a music track you do not own

It is wired up in `app.js` by `[data-video-slot]`. If the file is replaced later,
bump the `?v=` on its `src` in `index.html`, because the browser will otherwise
keep serving the old copy.

## What this page is not

It is not the app, and it does not talk to the app. Nothing on it collects
customer data, job data or anything beyond an email address.
