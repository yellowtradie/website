---
slug: tools/what-to-charge
type: tool
title: What to charge calculator | Build a price for the job
description: Build a job price from labour days, materials, paperwork and contingency. A calculator and a guide on one page, with the sums in words and a worked example.
h1: What to charge
eyebrow: Tools
publish: true
faq: false
breadcrumb: [Home, Tools, What to charge]
breadcrumb_visible: true
related: [tools/day-rate-calculator, tools/job-profit-calculator, tools/markup-calculator, tools]
sources: ["National Minimum Wage and National Living Wage rates on gov.uk | https://www.gov.uk/national-minimum-wage-rates", "Mileage allowance on gov.uk | https://www.gov.uk/expenses-and-benefits-business-travel-mileage/rules-for-tax"]
chrome: inner
footer_heading: The site
footer_legal: false
container: legal
canonical: https://yellowtradie.com/tools/what-to-charge.html
og_type: article
published: 2026-10-24
updated: 2026-10-24
priority: 0.7
changefreq: monthly
software: false
legacy: false
---

# What to charge

Build the price before you write the quote. Put in days, materials, paperwork and a contingency. The calculator shows the total, the split, and the price per day.

Every step is also shown in words further down the page, so the guide works without the calculator.

<div class="calc" id="wtc-calc" data-wtc-calc>
  <div class="calc-field">
    <label for="wtc-days">Days on site</label>
    <input type="number" id="wtc-days" inputmode="decimal" min="0" step="0.5" value="3" data-wtc-days>
  </div>
  <div class="calc-field">
    <label for="wtc-dayrate">Day rate you need (£)</label>
    <input type="number" id="wtc-dayrate" inputmode="decimal" min="0" step="1" value="280" data-wtc-dayrate>
  </div>
  <div class="calc-field">
    <label for="wtc-materials">Materials at cost (£)</label>
    <input type="number" id="wtc-materials" inputmode="decimal" min="0" step="0.01" value="450" data-wtc-materials>
  </div>
  <div class="calc-field">
    <label for="wtc-markup">Markup on materials (%)</label>
    <input type="number" id="wtc-markup" inputmode="decimal" min="0" step="1" value="10" data-wtc-markup>
  </div>
  <div class="calc-field">
    <label for="wtc-paperwork">Paperwork and travel (£)</label>
    <input type="number" id="wtc-paperwork" inputmode="decimal" min="0" step="0.01" value="60" data-wtc-paperwork>
  </div>
  <div class="calc-field">
    <label for="wtc-contingency">Contingency (%)</label>
    <input type="number" id="wtc-contingency" inputmode="decimal" min="0" step="1" value="5" data-wtc-contingency>
  </div>
  <p class="calc-result" role="status" aria-live="polite" data-wtc-result></p>
  <p class="calc-note">Labour plus materials with markup, plus paperwork, plus contingency. VAT is not in this sum. Add it if and when you charge it.</p>
</div>

## How to build the price

Start with labour. Pick the day rate you need to cover pay, tax, insurance and profit. That rate comes from the [day rate calculator](/tools/day-rate-calculator.html). Multiply it by days on site.

Then add materials. Use what they cost you at the till. If you add a markup for sourcing, storing and warranting them, apply it to materials before you total up.

Then add paperwork and travel. This is the time to survey, draw, order, collect, write the quote, and drive to and from site. If you skip it, you work for free on the days around the job.

Then add a contingency for what you cannot price to the pound. Price is not a guess at cost plus a hope. It is cost plus a margin for the unknown.

In symbols: price equals days times day rate, plus materials times one plus markup, plus paperwork, then times one plus contingency.

## A worked example

Days 3. Day rate £280. Materials at cost £450. Markup 10 percent. Paperwork £60. Contingency 5 percent.

Labour is 3 times £280. That is £840.

Materials with markup is £450 times 1.10. That is £495.

Subtotal before contingency is £840 plus £495 plus £60. That is £1,395.

Contingency at 5 percent is £1,395 times 0.05. That is £69.75.

Price is £1,395 plus £69.75. That is £1,464.75. Quote it as a round figure if you like, for example £1,465.

## Common amounts at £280 a day

| Days | Labour | Materials | Materials with 10% markup | Paperwork | Subtotal | With 5% contingency |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | £280.00 | £100.00 | £110.00 | £40.00 | £430.00 | £451.50 |
| 2 | £560.00 | £200.00 | £220.00 | £60.00 | £840.00 | £882.00 |
| 3 | £840.00 | £450.00 | £495.00 | £60.00 | £1,395.00 | £1,464.75 |
| 5 | £1,400.00 | £600.00 | £660.00 | £80.00 | £2,140.00 | £2,247.00 |

Change the day rate to yours. The shape stays the same.

## What makes up each part

Labour is your day rate from the [day rate calculator](/tools/day-rate-calculator.html). That rate should already hold your costs and the profit you want. Do not halve it to win the job. You will make it up later at your own expense.

Materials is what the merchant charges you, at cost, on the day. Include fixings and sealant. The small items add up. Leave waste and returns out of what to charge. Price what you use.

Markup on materials is not profit on labour. It covers your time to source and collect, storage, carrying cost, and the call back if the part fails. Some trades add none for customer supplied goods. Some add more for specialist parts. Say the figure on the quote so it can be checked.

Paperwork and travel is a flat sum for the job, not a percent. Survey, drawings, ordering, calls, form filling and driving. If the job is far away, add more. If it is next door, add less. The point is to write it down rather than forget it.

Contingency is a percent on the subtotal. Three to five percent is common on domestic work. More on old buildings, on roofs, or where ground conditions are unknown. It is not a slush fund. It is the price of reality.

## VAT and CIS

This calculator prices work net of VAT. If you are VAT registered, apply the [VAT rules](/tools/vat-calculator.html) to the invoiced figure, not to this sum in isolation. VAT is not profit and it is not part of what to charge. It is collected and passed on.

If CIS applies, the deduction is on labour only and is taken by the contractor from your pay. It is not set by you here. See the [CIS calculator](/tools/cis-calculator.html) for how that works. CIS is an advance on tax, not a cost, and it does not reduce the price you should charge.

## Check before you send

Does the price cover every day, including the half day to finish and clear up. Are all materials in the list, including sundries. Is travel for collections counted. Is contingency there at a sensible rate. Is the VAT treatment right for what you charge.

If a figure is lower than last year for the same job, something is missing. Work is not cheaper now.

## Questions

### What is the difference between this and the job profit calculator?

This page builds a price before the job. The [job profit calculator](/tools/job-profit-calculator.html) checks what a job made after. One looks forward, one looks back.

### How do I pick the day rate?

Use the [day rate calculator](/tools/day-rate-calculator.html). Put in the income you need for the year, the costs you must meet, and the days you will actually bill. The result is the rate your year needs.

### What if the customer supplies materials?

Take materials out of your price and keep the markup line out or at nil. Charge labour, paperwork and contingency on what you do supply. Say on the quote that customer supplied items are outside your warranty for supply.

### Should I show the breakdown on the quote?

Yes where the customer expects it. A total price with named lines for labour, materials and other costs tends to be accepted more often. Keep the contingency inside the figure, not as a line.

## Sources

Rates and rules read on gov.uk on 24 October 2026. This page names gov.uk for general rates and thresholds. It invents no figure of its own.

<a class="btn btn--lg btn--solid" href="/#early-access">Join the list</a>

The app is not in the shops yet. Join the list and we will tell you the day it opens.
