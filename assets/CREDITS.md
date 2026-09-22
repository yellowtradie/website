# Image credits

## Hero photograph

`hero.jpg` is the photograph Pete chose on 2026-09-22. It came from
`Business/Website/Assets/standing-next-van.png` (1344 by 768) and was converted to
JPEG at quality 85.

- Provenance: not recorded. Ask Pete before reusing it anywhere else.
- Licence: not stated, so the page makes no licence claim and the footer carries
  no credit line (Pete's call, 2026-09-22). The line it replaced credited a
  rawpixel CC0 photograph, which this file replaced. That old file is still in
  git history if it is ever wanted back.

Nobody has looked at this file with human eyes in this session (this model has no
image input), so it was checked by measurement instead. The frame is high key
(mean luminance 116 of 255) with its detail concentrated between 50 and 75
percent across, and the left third is bright and nearly empty. That is the right
shape for this hero: the left 42 percent is painted solid black and the
photograph only shows on the right, so the subject needs to sit right of centre.
If the subject ever looks too dark, `object-position` on `.hero-media img` in
`styles.css` is the one line to move it.

Swap instructions, in one line: put your file at
`yellowtradie-site/assets/hero.jpg`, keep the name, then bump the `?v=` number on
both references in `index.html` (the `<img src>` and the `og:image` meta) and
reload. The bump is not optional: the preview server sends no cache headers, so a
same-name swap is answered from the browser's own stored copy and the new
photograph never appears. That is exactly what happened on 2026-09-22, when the
first swap looked like it had failed while the server was already handing out the
new file. The current number is `?v=2`.

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
