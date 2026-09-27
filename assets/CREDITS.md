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
- **Changed 2026-09-27: provenance is a record here, not a permission.** AI
  generated images are allowed on this site and may stand as the photograph of a
  tradesperson, on Pete's call. Write where a file came from, then carry on.

## The photograph in the "why" section (added 2026-09-27)

`sparky.webp` is the upright frame in the dark "Built for one person, not an
office" band, and `sparky-wide.webp` is the 4 to 3 crop a phone is served for the
same spot. Both come from one file in the vault,
`Business/Website/Assets/Candid_85mm_film_photo_Kodak_Portra_30yo_white_British_elect (1).jpg`
(832 by 1248), so the name reads like a generator's output and the provenance is
unrecorded. Per the note above, that is allowed and needs no answer from Pete.

Why the band and not the hero: the hero box is 55% of the screen wide and full
height and every hero frame on this page is landscape, so a 1 to 1.5 portrait in
that slot would fill the box at about 2.2 times and then lose two thirds of its
width, leaving a head and shoulders. The dark band is the one section with a hole
in it and the one painted `--black`, which is this frame's own colour once the
workshop is knocked back, so the two merge and the background disappears.

The treatment is the hero's own idea turned on its side: `brightness(.92)
contrast(1.05) saturate(.76)`, a long fade down the left edge into the copy and a
feather along the top and bottom, so there is no rectangle. On a phone the long
left fade is wrong (nothing sits beside a banner) so the sides take a short
feather and the top and bottom keep theirs. No grain: the page grain is
mean-neutral under the paper sections and reads as dirt over black.

Crop measurements, taken by rendering the real page rather than by eye: desktop
`object-position: 54% center` at the full height of the band (957px at 1280 and
1440, 990px at 1920, 1004px at 1024; it was a fixed 620px until Pete asked for the
section's own height on 2026-09-27), phone `50% 28%`. The phone crop came from a
4 to 3 window of the source taken from 110 to 810 of 1248.

The desktop width took two passes on 2026-09-27, and the second is the one to
read. Filling the band at the old 360px column showed only 57.7% of the frame's
width and Pete's note was "you can only see the man and not anything to the left
and right to him". From 1280 up the copy column is now a fixed 700px, the picture
takes the rest and runs out to the right-hand edge of the window, capped at 660px.
Measured under `object-fit: cover`, the window now shows 79% of the frame's width
at 1280, 91.5% at 1440 (source 5%..96%) and the whole frame at 1920. For
comparison, the hero's own photograph shows 54% of its frame. The two numbers that
do the work are `margin-right` (the exact distance from the page's content edge to
the viewport edge, so the picture lands on the screen edge rather than past it) and
the 660px cap (a wider frame would grow the band itself, because the picture's own
aspect sets the row height once it is the tallest thing in the column).

Re-shot and re-measured with `scripts/capture-section.mjs <url> "#why" <width>
<out.png>`, which clips one section at a real viewport width. The plain
`chrome --headless --screenshot --window-size` route does NOT give you the width
you ask for, and it also misses lazy images because they never enter the viewport.

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

`logo-mark.svg` is drawn for this project. A yellow square (#e9d228, Pete's
brand yellow from 2026-09-25) with the uppercase T in the page's black
(#1a181a). No third party rights.

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
