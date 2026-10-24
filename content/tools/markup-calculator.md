---
slug: tools/markup-calculator
type: tool
title: Markup and margin calculator | The difference explained
description: Work out markup on cost and margin on price. See what each one means, how to convert between them, and why they are not the same thing.
h1: Markup and margin calculator
eyebrow: Tools
publish: false
faq: false
breadcrumb: [Home, Tools, Markup and margin calculator]
breadcrumb_visible: true
related: [tools/what-to-charge, tools/job-profit-calculator, tools]
sources: []
chrome: inner
footer_heading: The site
footer_legal: false
container: legal
canonical: https://yellowtradie.com/tools/markup-calculator.html
og_type: article
published: 2026-10-24
updated: 2026-10-24
priority: 0.7
changefreq: monthly
software: false
legacy: false
---

# Markup and margin calculator

They are not the same figure. Markup is profit over cost. Margin is profit over price. Put in cost and price, or one and a percent, and the calculator shows both, the profit in pounds, and how to move between them.

The page also explains the sums in words so it is useful without the calculator.

<div class="calc" id="markup-calc" data-markup-calc>
  <div class="calc-field">
    <label for="mk-mode">What you want to do</label>
    <select id="mk-mode" data-mk-mode>
      <option value="both">Cost and price - see both percents</option>
      <option value="markup">Cost plus markup - get the price</option>
      <option value="margin">Price and margin - get the cost</option>
    </select>
  </div>
  <div data-mk-both>
    <div class="calc-field">
      <label for="mk-cost">Cost (£)</label>
      <input type="number" id="mk-cost" inputmode="decimal" min="0" step="0.01" value="400" data-mk-cost>
    </div>
    <div class="calc-field">
      <label for="mk-price">Price charged (£)</label>
      <input type="number" id="mk-price" inputmode="decimal" min="0" step="0.01" value="500" data-mk-price>
    </div>
  </div>
  <div data-mk-markup hidden>
    <div class="calc-field">
      <label for="mk-cost2">Cost (£)</label>
      <input type="number" id="mk-cost2" inputmode="decimal" min="0" step="0.01" value="400" data-mk-cost2>
    </div>
    <div class="calc-field">
      <label for="mk-markup">Markup (%)</label>
      <input type="number" id="mk-markup" inputmode="decimal" min="0" step="0.1" value="25" data-mk-markup>
    </div>
  </div>
  <div data-mk-margin hidden>
    <div class="calc-field">
      <label for="mk-price2">Price charged (£)</label>
      <input type="number" id="mk-price2" inputmode="decimal" min="0" step="0.01" value="500" data-mk-price2>
    </div>
    <div class="calc-field">
      <label for="mk-margin">Margin (%)</label>
      <input type="number" id="mk-margin" inputmode="decimal" min="0" max="100" step="0.1" value="20" data-mk-margin>
    </div>
  </div>
  <p class="calc-result" role="status" aria-live="polite" data-mk-result></p>
  <p class="calc-note">Markup is on cost. Margin is on price. Same profit, different denominator.</p>
</div>

## What each one means

Markup is profit divided by cost, times 100. It answers: for every pound I spent, how many pence did I earn above it.

Margin is profit divided by price, times 100. It answers: for every pound the customer paid, how many pence stayed as profit.

In symbols:

Price equals cost plus profit.

Markup percent equals profit divided by cost times 100.

Margin percent equals profit divided by price times 100.

Example. Cost £400. Price £500. Profit is £100.

Markup is £100 divided by £400. That is 25 percent.

Margin is £100 divided by £500. That is 20 percent. Higher denominator, lower percent. Same pounds.

## The common mistake

To say 25 percent markup is 25 percent margin. It is not.

A job that cost £400 and is sold for £500 has a 25 percent markup. Its margin is 20 percent.

To get a 20 percent margin on £400 of cost, the price is about £500.

To get a 25 percent margin on £400 of cost, the price is about £533.33, because margin 25 percent means price times 0.25 is profit, so cost is price times 0.75, so price equals cost divided by 0.75.

## How to move between them

From markup to margin: margin equals markup divided by one plus markup.

Example. Markup 25 percent. That is 0.25. One plus markup is 1.25. 0.25 divided by 1.25 is 0.20. That is 20 percent margin. Matches the example above.

From margin to markup: markup equals margin divided by one minus margin.

Example. Margin 20 percent. That is 0.20. One minus margin is 0.80. 0.20 divided by 0.80 is 0.25. That is 25 percent markup. Back at the start.

From cost and one percent to price:

Price from markup is cost times one plus markup. Cost £400 at 25 percent markup is £400 times 1.25. That is £500.

Cost from price and margin is price times one minus margin. Price £500 at 20 percent margin is £500 times 0.80. That is £400. Price £500 at 25 percent margin is £500 times 0.75. That is £375.

From price and profit target: if you want a margin, multiply price by one minus margin to get cost, or divide cost by one minus margin to get price.

Check: cost divided by one minus margin is the price that leaves that margin. Price times margin is the profit in pounds.

## A ready table

Cost | 10% markup | 25% markup | 10% margin | 25% margin
| --- | --- | --- | --- | --- |
| £100.00 | £110.00 | £125.00 | £111.11 | £133.33 |
| £200.00 | £220.00 | £250.00 | £222.22 | £266.67 |
| £400.00 | £440.00 | £500.00 | £444.44 | £533.33 |
| £500.00 | £550.00 | £625.00 | £555.56 | £666.67 |
| £1,000.00 | £1,100.00 | £1,250.00 | £1,111.11 | £1,333.33 |

Read across: a cost of £400 with 25 percent markup becomes £500, which is a 20 percent margin on the price.

## Which one should you use

Use markup when you price from cost.

I bought materials at £400, I add 25 percent, the price is £500 before VAT.

Use margin when you check whether the price covers the business.

The job was £500, of which £100 was profit, margin is 20 percent. If your target margin is higher, the price must move. If not, the cost must come down.

Both matter. Markup sets the quote, margin judges it. See the [job profit calculator](/tools/job-profit-calculator.html) for margin on a real job, and [what to charge](/tools/what-to-charge.html) for building a price from days and materials.

## Costs that are not markup

Markup is not VAT. VAT is collected and passed on. Run a [VAT sum](/tools/vat-calculator.html) outside.

Markup is not CIS. CIS is tax held by the contractor on labour, not a charge you set. See the [CIS calculator](/tools/cis-calculator.html).

## Questions

### I bought at £300 and sold at £450. What is the markup and the margin?

Profit is £150. Markup is £150 on £300, that is 50 percent. Margin is £150 on £450, that is 33.3 percent. If you wanted a 50 percent margin rather than 50 percent markup, the price would be £600 at the same cost.

### How much must I add to £80 to get a 20 percent margin?

Cost £80. Margin 20 percent means price equals cost divided by 0.80. That is £100. Profit £20, margin £20 on £100. If you added 20 percent as markup, the price would be £96, margin 16.7 percent, and the profit £16.

### Can margin be 100 percent?

No. Margin under 100 percent means price above zero and above cost. Margin 50 percent means profit is half the price, cost the other half. To reach 50 percent margin on cost £400, price is £800. A margin of 100 percent would mean zero cost, which is not what a margin on a real job is.

### How does this fit on a quote?

Show the total price, not the percents. Keep markup on materials as one line where the customer supplied nothing, for example "Materials £400 plus sourcing £40". The customer sees a price for materials supplied and collected, not a percent.

## Sources

No HMRC rate is needed for these sums. Where VAT applies, the VAT rate is read on the [VAT calculator](/tools/vat-calculator.html).

<a class="btn btn--lg btn--solid" href="/#early-access">Join the list</a>

The app is not in the shops yet. Join the list and we will tell you the day it opens.
