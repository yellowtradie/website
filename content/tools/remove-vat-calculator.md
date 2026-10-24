---
slug: tools/remove-vat-calculator
type: tool
title: Remove VAT calculator | Take VAT off a price
description: Remove VAT from a VAT inclusive price at 20 percent, 5 percent and 0 percent. See the correct sum, the common mistake, and a table of checked amounts.
h1: Remove VAT calculator
eyebrow: Tools
publish: false
faq: false
breadcrumb: [Home, Tools, Remove VAT calculator]
breadcrumb_visible: true
related: [tools/vat-calculator, tools/cis-calculator, tools/job-profit-calculator, tools]
sources: ["VAT rates on gov.uk | https://www.gov.uk/vat-rates"]
chrome: inner
footer_heading: The site
footer_legal: false
container: legal
canonical: https://yellowtradie.com/tools/remove-vat-calculator.html
og_type: article
published: 2026-10-24
updated: 2026-10-24
priority: 0.7
changefreq: monthly
software: false
legacy: false
---

# Remove VAT calculator

Take VAT out of a price that already includes it. Put in the VAT inclusive figure, pick 20 percent, 5 percent or 0 percent, and the calculator shows the net and the VAT inside. The page also shows the sum in words.

Rates read on gov.uk on 24 October 2026. Standard rate 20 percent, reduced rate 5 percent, zero rate 0 percent.

<div class="calc" id="remove-vat-calc" data-remove-vat-calc>
  <div class="calc-field">
    <label for="rvc-amount">VAT inclusive price (£)</label>
    <input type="number" id="rvc-amount" inputmode="decimal" min="0" step="0.01" value="120" data-rvc-amount>
  </div>
  <div class="calc-field">
    <label for="rvc-rate">VAT rate charged</label>
    <select id="rvc-rate" data-rvc-rate>
      <option value="20">20% - standard rate</option>
      <option value="5">5% - reduced rate</option>
      <option value="0">0% - zero rated</option>
    </select>
  </div>
  <p class="calc-result" role="status" aria-live="polite" data-rvc-result></p>
  <p class="calc-note">At 20 percent divide by 1.20 to get the net. At 5 percent divide by 1.05. At 0 percent the VAT is nil.</p>
</div>

## How to work it out

Same maths as the VAT calculator, the other way round.

To remove VAT, divide the VAT inclusive price by 1 plus the rate.

* At 20 percent, net equals VAT inclusive divided by 1.20. VAT equals VAT inclusive minus net. Example: £120 divided by 1.20 is £100 net. The VAT inside is £20.
* At 5 percent, net equals VAT inclusive divided by 1.05. Example: £105 divided by 1.05 is £100 net. The VAT inside is £5.
* At 0 percent, the net is the price you typed. The VAT is nil.

The VAT inside a VAT inclusive price is not the rate times that price.

## The common mistake

The mistake is to take 20 percent off the VAT inclusive price.

£120 minus 20 percent is £96. That says the VAT inside £120 is £24, which is wrong. It is £20.

The right step is to divide by 1.20. That one word, divide, is the whole difference. It is the same at 5 percent. Divide by 1.05, not subtract 5 percent.

If you remember one line, remember this. To add VAT you multiply by 1.20. To remove VAT you divide by 1.20.

## Common amounts at 20 percent

| VAT inclusive | Net | VAT |
| --- | --- | --- |
| £60.00 | £50.00 | £10.00 |
| £120.00 | £100.00 | £20.00 |
| £180.00 | £150.00 | £30.00 |
| £240.00 | £200.00 | £40.00 |
| £300.00 | £250.00 | £50.00 |
| £600.00 | £500.00 | £100.00 |
| £1,200.00 | £1,000.00 | £200.00 |
| £6,000.00 | £5,000.00 | £1,000.00 |

## Common amounts at 5 percent

| VAT inclusive | Net | VAT |
| --- | --- | --- |
| £52.50 | £50.00 | £2.50 |
| £105.00 | £100.00 | £5.00 |
| £157.50 | £150.00 | £7.50 |
| £210.00 | £200.00 | £10.00 |
| £525.00 | £500.00 | £25.00 |
| £1,050.00 | £1,000.00 | £50.00 |

## What the rates are

The standard rate is 20 percent on most goods and services. The reduced rate is 5 percent on some goods and services, for example children’s car seats and home energy. The zero rate is 0 percent on zero rated goods. Some things are exempt.

All three rates above were read on gov.uk on 24 October 2026.

## Questions

### Why divide by 1.20?

Because the VAT inclusive price is the net plus 20 percent of the net. That is the net times 1.20. To get back to the net you undo that times by dividing.

### What if the price was zero rated?

At 0 percent the VAT is nil. The net is the figure you typed.

### Can I use this to quote net prices?

Yes. If a customer gives you a VAT inclusive budget and you need the net to work out margin divide as above. Quote the net.

### Does this file anything with HMRC?

No. It works out the split so you can write the invoice correctly. Filing is separate.

## Sources

Rates read on gov.uk on 24 October 2026.

<a class="btn btn--lg btn--solid" href="/#early-access">Join the list</a>

The app is not in the shops yet. Join the list and we will tell you the day it opens.
