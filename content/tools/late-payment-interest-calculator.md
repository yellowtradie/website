---
slug: tools/late-payment-interest-calculator
type: tool
title: Late payment interest calculator | Statutory 8 percent
description: Work out late payment interest at 8 percent above base rate or at your own fixed rate. Includes the position for customers who are not a business.
h1: Late payment interest calculator
eyebrow: Tools
publish: true
faq: false
breadcrumb: [Home, Tools, Late payment interest calculator]
breadcrumb_visible: true
related: [tools/what-to-charge, tools/day-rate-calculator, tools]
sources: ["Late commercial payments on gov.uk | https://www.gov.uk/late-commercial-payments-interest-debt-recovery", "Bank of England base rate on bankofengland.co.uk | https://www.bankofengland.co.uk/monetary-policy/the-interest-rate-bank-rate", "Late Payment of Commercial Debts (Interest) Act 1998 on legislation.gov.uk | https://www.legislation.gov.uk/ukpga/1998/20"]
chrome: inner
footer_heading: The site
footer_legal: false
container: legal
canonical: https://yellowtradie.com/tools/late-payment-interest-calculator.html
og_type: article
published: 2026-10-24
updated: 2026-10-24
priority: 0.7
changefreq: monthly
software: false
legacy: false
---

# Late payment interest calculator

Work out what late payment interest is worth on an overdue invoice. Put in the amount that is overdue, how many days late it is, and either use the statutory rate or your own fixed rate.

Every step is shown in words below, so the page works without the calculator.

<div class="calc" id="lpi-calc" data-lpi-calc>
  <div class="calc-field">
    <label for="lpi-amount">Amount overdue (£)</label>
    <input type="number" id="lpi-amount" inputmode="decimal" min="0" step="0.01" value="1500" data-lpi-amount>
  </div>
  <div class="calc-field">
    <label for="lpi-days">Days overdue</label>
    <input type="number" id="lpi-days" inputmode="decimal" min="0" step="1" value="30" data-lpi-days>
  </div>
  <div class="calc-field">
    <label for="lpi-rate-mode">Rate to use</label>
    <select id="lpi-rate-mode" data-lpi-rate-mode>
      <option value="statutory">Statutory - 8 percent plus Bank of England base rate</option>
      <option value="fixed">My own contract rate</option>
    </select>
  </div>
  <div class="calc-field" data-lpi-base-wrap>
    <label for="lpi-base">Bank of England base rate (%)</label>
    <input type="number" id="lpi-base" inputmode="decimal" min="0" step="0.01" value="4.00" data-lpi-base>
    <p class="calc-note">Statutory rate is 8 percent plus this base rate. Read the Bank Rate on bankofengland.co.uk on the day you charge. The value above is read on 24 October 2026.</p>
  </div>
  <div class="calc-field" data-lpi-fixed-wrap hidden>
    <label for="lpi-fixed">Your contract rate (annual %)</label>
    <input type="number" id="lpi-fixed" inputmode="decimal" min="0" step="0.01" value="8.00" data-lpi-fixed>
    <p class="calc-note">Use this where your written terms name a fixed annual rate that the customer agreed.</p>
  </div>
  <p class="calc-result" role="status" aria-live="polite" data-lpi-result></p>
  <p class="calc-note">Interest starts after the agreed payment date. For a consumer customer, a contract rate must be in terms they agreed. Statutory interest is for business to business debts.</p>
</div>

## How statutory interest is worked

The law for business to business debts is the Late Payment of Commercial Debts (Interest) Act 1998. The statutory rate is 8 percent above the Bank of England base rate, per year.

Bank Rate was read on bankofengland.co.uk on 24 October 2026. It was 4.00 percent. Statutory interest on that date is therefore 12.00 percent a year.

That rate is not fixed by history. When the Bank changes its rate, the statutory rate for new periods of lateness moves with it.

Interest is simple, per day. Daily rate equals annual rate divided by 365. Interest due equals daily rate times the amount overdue times days overdue.

Example. Amount overdue £1,500. Days overdue 30. Annual statutory rate on 24 October 2026 is 12.00 percent.

Daily rate is 0.12 divided by 365. That is about 0.0329 percent a day.

Interest is 0.12 divided by 365 times £1,500 times 30. That is about £14.79.

If only part of the invoice is overdue, use the unpaid amount, not the invoice total.

## Your own fixed rate

You can set your own interest rate in your terms, rather than rely on the statutory rate. That contract rate applies where the customer agreed it. The sum is the same, with your figure in place of statutory.

Annual fixed rate 8 percent on £1,500 for 30 days is 0.08 divided by 365 times £1,500 times 30. That is about £9.86.

A contract rate must be fair where the customer is a business. It must not create a penalty in an English law contract, and it must not be an unfair term where the customer is a consumer. If you name a high fixed rate to deter late payment, the customer can still challenge it.

## Debt recovery costs

The Act lets you claim a fixed sum for chasing a business debt, on top of interest. The fixed sum is set by gov.uk and turns on the debt. It was read on gov.uk on 24 October 2026:

* Up to £999.99 debt, £40
* £1,000 to £9,999.99 debt, £70
* £10,000 and over debt, £100

You can claim only one fixed sum per debt. You claim it once the payment is late, and again for each further late payment on the same invoice only if you have reasonable costs. The calculator does not add this. Work it by the debt.

You can also claim reasonable costs of recovery beyond these fixed sums, but you must show them.

## What is different when the customer is not a business

This page draws a line between two kinds of customer.

A business customer is another business. A consumer is a person acting outside their trade, for personal use. A couple who hire you for their own home are consumers. A landlord or a shop hiring you is a business for this purpose.

For a business customer, statutory interest and the fixed sums above are available where the Act applies. The right to statutory interest can be in addition to what your own terms say, and you can rely on whichever gives the better result, subject to any terms that lawfully contract out.

For a consumer, the Act does not give you statutory interest and fixed sums in the same way. Interest on a late payment from a consumer depends on your contract terms and on what is fair under consumer law. A term that charges interest to a consumer must meet the fairness test in the Consumer Rights Act 2015. It must be prominent, it must be balanced, and it must not punish. A court will look at whether the rate was brought to the customer’s attention before the work, whether the customer had a real choice, and whether the rate out of proportion to your loss.

That means, in practice:

* With a consumer in their own home, name a clear due date, name the annual rate, and keep the rate modest if you want it to be enforceable.
* Do not add the business fixed sums of £40, £70 or £100 to a consumer invoice and present them as law. They are not.
* Do not start interest the day after you sent the invoice if your own terms give longer. Interest runs from when payment is due under the terms, and a consumer must have had those terms.

This page can give you figures for any rate you type. It cannot turn a business remedy into a consumer one. Take advice if the sums or the relationship are in dispute.

## Common amounts at the statutory rate on 24 October 2026

Statutory 12.00 percent a year where the base rate was 4.00 percent.

| Amount overdue | 14 days | 30 days | 60 days |
| --- | --- | --- | --- |
| £500.00 | £2.30 | £4.93 | £9.86 |
| £1,000.00 | £4.60 | £9.86 | £19.73 |
| £1,500.00 | £6.90 | £14.79 | £29.59 |
| £2,500.00 | £11.51 | £24.66 | £49.32 |
| £5,000.00 | £23.01 | £49.32 | £98.63 |
| £10,000.00 | £46.03 | £98.63 | £197.26 |

At your own fixed 8 percent, each figure above is two thirds of the statutory figure shown.

## Writing it on the invoice

Say when payment is due, in a date rather than a count of days. Name the annual rate you intend to use. For a business customer you can name the statutory formula. For a consumer, name a contract rate they agreed.

Example wording for a business customer:

Payment due by 14 November 2026. Late payment interest runs under the Late Payment of Commercial Debts (Interest) Act 1998 at 8 percent above the Bank of England base rate, per year, plus fixed sums where they apply.

Example wording for a consumer in their own home:

Payment due by 14 November 2026. Interest on amounts not paid by that date is charged at 8 percent a year on the amount owed, per day, shown as a separate entry where it is charged.

Do not charge interest on top of interest, and do not include the interest figure inside a new invoice total until it is a charge the customer has been told about and has had time to meet.

## Questions

### Can I charge interest back to the day I finished the work?

No, unless your terms say when payment is due and that date is the one interest runs from. Interest is from when payment became late, not from when the work was done, unless the work date and the due date are the same.

### Do I need to register the rate on the invoice?

No, but you must bring it to the customer’s attention before or at the time the invoice is issued. A term buried only on a website the customer did not see is harder to enforce than a term on the invoice itself.

### What if the customer pays part of the debt?

Interest runs on the amount still owed, not the original total. In the calculator, put the balance that is late, not the headline invoice figure.

### What if the base rate moves mid debt?

Apply the base rate that was in force for each period. For the calculator, type the rate that applied to the period you are pricing. If the Bank changed the rate twice during one long debt, split the debt by the dates of each change and work each period on its own rate.

## Sources

Statutory rate and fixed sums read on gov.uk on 24 October 2026. Bank of England base rate read on bankofengland.co.uk on 24 October 2026.

<a class="btn btn--lg btn--solid" href="/#early-access">Join the list</a>

The app is not in the shops yet. Join the list and we will tell you the day it opens.
