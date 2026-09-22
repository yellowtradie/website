# Image credits

## Hero photograph

`hero.jpg` is the photograph on the front page. It was replaced on 2026-09-22
16:10: it came from `Business/Website/Assets/man3.png` (1216 by 832) and was
converted to JPEG at quality 85, which is 211 KB against the 219 KB of the file
it replaced. It replaced `Business/Website/Assets/standing-next-van.png`, which
is still in the vault and still in git history.

- Provenance: not recorded. Ask Pete before reusing it anywhere else.
- Licence: not stated, so the page makes no licence claim and the footer carries
  no credit line (Pete's call, 2026-09-22). The line that was there before
  credited a rawpixel CC0 photograph, which neither of these files uses.

Nobody has looked at this file with human eyes in this session (this model has no
image input), so it was checked by measurement instead. What the measurements
say: the frame is a wide one, 1.46 to 1, with the bright end on the right (the
right quarter averages 176 to 201 of 255 and carries almost no detail) and the
busy, warm part in the left half. 27% of the frame is near black.

**The crop is the one thing to re-check by eye.** The hero box is 55% of the
screen wide and full height, so `object-fit: cover` shows only 60% of this frame
at 1440 and 50% at 1024. `object-position` on `.hero-media img` in `styles.css`
is the single number that moves it, and it is set to `30% center`. That was chosen
by measurement, not by eye: it keeps the busy left half of the frame inside the
mask's clear zone and keeps the headline on the dark part of the picture. The
strip the longest headline line reaches into reads a median luminance of 45 at
30%, against 27 on the photograph it replaced and 78 at 20%. Lower numbers put
this frame's bright left side behind the words. Higher numbers fade the subject.

Swap instructions, in one line: put your file at
`yellowtradie-site/assets/hero.jpg`, keep the name, then bump the `?v=` number on
every reference in `index.html` and `changelog.html` (the `<img src>` and two
`og:image` metas) and reload. The bump is not optional: the preview server sends
no cache headers, so a same-name swap is answered from the browser's own stored
copy and the new photograph never appears. That is exactly what happened on
2026-09-22, when the first swap looked like it had failed while the server was
already handing out the new file. The current number is `?v=3`.

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
