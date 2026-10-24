---
slug: tools/vat-calculator
type: tool
title: VAT calculator | Add or remove VAT at 20 5 and 0 percent
description: Add or remove VAT at 20 percent, 5 percent and 0 percent. See the reverse sum, try the calculator, and check common amounts in the table.
h1: VAT calculator
eyebrow: Tools
publish: true
faq: false
breadcrumb: [Home, Tools, VAT calculator]
breadcrumb_visible: true
related: [tools/remove-vat-calculator, tools/cis-calculator, tools/job-profit-calculator, tools]
sources: ["VAT rates on gov.uk | https://www.gov.uk/vat-rates", "VAT registration threshold on gov.uk | https://www.gov.uk/vat-registration/vat-threshold"]
chrome: inner
footer_heading: The site
footer_legal: false
container: legal
canonical: https://yellowtradie.com/tools/vat-calculator.html
og_type: article
published: 2026-10-24
updated: 2026-10-24
priority: 0.7
changefreq: monthly
software: false
legacy: false
---

# VAT calculator

Work out VAT at the three UK rates. Put in a price, pick 20 percent, 5 percent or 0 percent, and choose whether you want to add VAT or take it off. The page shows the sum in words as well so you can do it without the calculator.

Rates read on gov.uk on 24 October 2026. Standard rate 20 percent, reduced rate 5 percent, zero rate 0 percent.

<div class="calc" id="vat-calc" data-vat-calc>
  <div class="calc-field">
    <label for="vat-amount">Amount (£)</label>
    <input type="number" id="vat-amount" inputmode="decimal" min="0" step="0.01" value="100" data-vat-amount>
  </div>
  <div class="calc-field">
    <label for="vat-rate">VAT rate</label>
    <select id="vat-rate" data-vat-rate>
      <option value="20">20% - standard rate</option>
      <option value="5">5% - reduced rate</option>
      <option value="0">0% - zero rated</option>
    </select>
  </div>
  <div class="calc-field">
    <label for="vat-mode">What to do</label>
    <select id="vat-mode" data-vat-mode>
      <option value="add">Add VAT</option>
      <option value="remove">Remove VAT</option>
    </select>
  </div>
  <p class="calc-result" role="status" aria-live="polite" data-vat-result></p>
  <p class="calc-note" data-vat-note>Standard rate is 20 percent on most goods and services. Reduced rate is 5 percent on some goods and services such as home energy. Zero rate is 0 percent on zero rated goods such as most food and children’s clothes.</p>
</div>

## How to work it out

To add VAT, multiply the net price by 1 plus the rate.

* At 20 percent, multiply by 1.20. A net price of £100 becomes £120. The VAT is £20.
* At 5 percent, multiply by 1.05. A net price of £100 becomes £105. The VAT is £5.
* At 0 percent, the price does not change.

To remove VAT, divide the VAT inclusive price by 1 plus the rate, then subtract to find the VAT.

* At 20 percent, divide by 1.20. A VAT inclusive price of £120 holds £20 of VAT and £100 net. The VAT is not £24, and the net is not £96.
* At 5 percent, divide by 1.05. A VAT inclusive price of £105 holds £5 of VAT and £100 net.
* At 0 percent, the price stays as shown.

That reverse step is the one people get wrong. Taking 20 percent off a VAT inclusive price leaves you short. You must divide by 1.20.

## Common amounts

The table uses the two rates that change the price. Zero rated amounts stay as typed and are not listed.

| Net | 20% VAT | VAT inclusive | 5% VAT | VAT inclusive |
| --- | --- | --- | --- | --- |
| £50.00 | £10.00 | £60.00 | £2.50 | £52.50 |
| £100.00 | £20.00 | £120.00 | £5.00 | £105.00 |
| £150.00 | £30.00 | £180.00 | £7.50 | £157.50 |
| £200.00 | £40.00 | £240.00 | £10.00 | £210.00 |
| £250.00 | £50.00 | £300.00 | £12.50 | £262.50 |
| £500.00 | £100.00 | £600.00 | £25.00 | £525.00 |
| £1,000.00 | £200.00 | £1,200.00 | £50.00 | £1,050.00 |
| £2,500.00 | £500.00 | £3,000.00 | £125.00 | £2,625.00 |

## VAT inclusive to net and VAT at 20 percent

| VAT inclusive | Net | VAT |
| --- | --- | --- |
| £60.00 | £50.00 | £10.00 |
| £120.00 | £100.00 | £20.00 |
| £180.00 | £150.00 | £30.00 |
| £240.00 | £200.00 | £40.00 |
| £600.00 | £500.00 | £100.00 |
| £1,200.00 | £1,000.00 | £200.00 |

## What the rates are

The standard rate is 20 percent on most goods and services. The reduced rate is 5 percent on some goods and services. For example children’s car seats and home energy are at the reduced rate. The zero rate is 0 percent on zero rated goods and services. For example most food and children’s clothes are zero rated. Some things are exempt. Postage stamps and financial transactions are examples.

All three rates above were read on gov.uk on 24 October 2026.

## Questions

### Is a price with VAT added the same as a VAT inclusive price divided by 1.20?

Yes, in reverse. A net price of £100 at 20 percent becomes £120. Put £120 back through the remove step, £120 divided by 1.20, and you get £100.

### Why not take 20 percent off?

Because 20 percent of £120 is £24, not £20. The right VAT inside £120 is £20. That is why you divide by 1.20 and not multiply by 0.80.

### Does the calculator handle 0 percent?

Yes. At 0 percent VAT is nil. The net is the figure you typed and the total is the same. The table leaves zero rated rows out because no sum is needed.

### Do I need to charge VAT?

Only if you are VAT registered. Most trades register when taxable turnover goes over the threshold or when it suits the work. Check the current threshold on gov.uk.

## Sources

Rates and descriptions read on gov.uk on 24 October 2026.

<a class="btn btn--lg btn--solid" href="/#early-access">Join the list</a>

The app is not in the shops yet. Join the list and we will tell you the day it opens.
