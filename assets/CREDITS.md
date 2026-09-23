# Image credits

## Hero photograph

`hero.webp` is the photograph on the front page. It was replaced on 2026-09-23
08:03: it came from `Business/website/assets/YellowTradie-Plumber.webp` (1216 by
832, webp, 107 KB) and is served as the same file, no re-encode, so the page
loads 100 KB faster than the JPEG it replaced. The previous `hero.jpg` (JPEG
quality 85, 199 KB) came from `Business/Website/Assets/YellowTradie.png` on
2026-09-22 18:01. Both earlier frames are still in git history, as is
`man3.png` and `standing-next-van.png` before them.

- Provenance: not recorded. Ask Pete before reusing it anywhere else.
- Licence: not stated, so the page makes no licence claim and the footer carries
  no credit line (Pete's call, 2026-09-22). The line that was there before
  credited a rawpixel CC0 photograph, which none of these files uses.

Nobody has looked at this file with human eyes (this model has no image input), so
it was checked by measurement instead, and the swap was made like for like. What
The measurements say: the frame is a wide one, 1.462 to 1, exactly the size and
shape of the file it replaced, and its tonality is near identical. Overall mean
luminance 110 against 112 for `hero.jpg`; 21% of the frame near black against
23.8%; 28.4% bright against 31.8%. The bright end is the right quarter, which
carries almost no detail, and the busy part is left of centre. The frame is a
genuinely different picture (25% of pixels differ by more than 32 luminance),
so the crop was checked rather than assumed.

**The crop did not need to move, and that is a measurement, not an assumption.**
The hero box is 55% of the screen wide and full height, so `object-fit: cover`
shows only 60% of this frame at 1440 and 50% at 1024. `object-position` on
`.hero-media img` in `styles.css` stays at `30% center`, because at that setting
the strip the longest headline line reaches into reads a median luminance of 51,
against 62 for the photograph it replaced. So the headline sits on pixels slightly
darker than the ones already approved, the visible window is the same 12% to 72%
of the frame, and the featureless bright right quarter stays cropped out exactly
as before. The rendered hero confirms it: mean luminance 73 either side of the
swap, and the copy strip 72 against 74. Lower `object-position` numbers put this
frame's bright left side behind the words; higher numbers fade the subject.

The measurement tool is `scripts/hero-image-profile.mjs`: it renders the real page
at 1440, reads the hero box and the copy column, decodes each candidate file, and
reports the luminance under the headline for every candidate crop. It also prints
the pixel difference between two files, which is how this swap was shown to be
like for like before a single page file was touched.

Swap instructions, in one line: put your webp at
`yellowtradie-site/assets/hero.webp`, keep the name, then bump the `?v=` number on
every reference in `index.html` and `changelog.html` (the `<img src>` and two
`og:image` metas) and reload. The bump is not optional: the preview server sends
no cache headers, so a same-name swap is answered from the browser's own stored
copy and the new photograph never appears. That is exactly what happened on
2026-09-22, when the first swap looked like it had failed while the server was
already handing out the new file. The current number is `?v=5`.

`scripts/verify-site-modal.mjs` now guards all three of these: that the file is
versioned and actually loaded, that it is masked so it has no hard edge, and that
the copy column ends before the photograph reaches full strength. Removing the
mask makes two of the three fail, which is how they were proved to be real checks
rather than decoration.

## App screens

The app screens on the page are tight crops of full resolution screenshots taken
from the Pixel 8 on 22 September 2026, with the fictional sample data set
loaded. No real customer details appear in any of them. The originals are 1080 by
2400 pixels, so every crop stays sharp when it is scaled down for the page.

| File | What it shows |
|---|---|
| `app-chase.png` | The chase list: a late invoice with the customer, the invoice number, the amount and the Chase button |
| `app-voice.png` | The quote review screen: materials spoken on site turned into line items with quantities and prices |
| `app-tax.png` | The quarterly tax report: money in, money out, taxable profit, the tax pot and the days left |
| `app-invoice.png` | An overdue invoice: the dates, the VAT breakdown, the payment history and the balance |
| `app-quote.png` | A quote document: the line items, the subtotal, the VAT and the total (in the folder for future use) |
| `app-customer.png` | The quote page the customer opens on their own phone, captured in Chrome at three times scale |

The business name and the customer names in the screenshots are fictional test
data.

## Logo

`logo-mark.svg` is drawn for this project. A yellow square (#fff400, Pete's
brand yellow from 2026-09-22) with the uppercase T in the page's black
(#161616). No third party rights.

## The five app screens, re-shot 2026-09-22 17:30

`app-quote.png`, `app-chase.png`, `app-invoice.png`, `app-tax.png` and
`app-customer.png` are **full phone screens, 1080 by 2400**, all the same size.
They were tight crops of parts of the app before, and Pete asked for the whole
screen: "the screenshot of the app need to be full screenshots, not fucking
close-ups".

**Four are off the handset**, taken with `adb exec-out screencap -p` from the
Pixel 8 running the app in Expo Go: the quote document, the invoices list, the
overdue invoice, and the reports screen. The fifth is the customer's quote page,
rendered from `trade-light-portal/preview/server.mjs` at `localhost:8787` in
headless Chrome at a 360 by 800 phone viewport, three times scale, so it comes
out at the same 1080 by 2400 as the rest.

Every screen is running the app's fictional demo set, which is what the footer
disclaimer refers to. One size also means the carousel cannot change height as
you swipe, which is the bug Pete caught: "the numbers are jumping around all over
the place". If they are ever replaced, **match 1080 by 2400** or the row will
move again.
