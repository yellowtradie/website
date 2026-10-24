---
slug: tools/cis-calculator
type: tool
title: CIS calculator | 20 30 and 0 percent on labour
description: Work out CIS deductions at 20 percent, 30 percent and 0 percent. Labour only, materials outside, with the small job note and a worked table.
h1: CIS calculator
eyebrow: Tools
publish: true
faq: false
breadcrumb: [Home, Tools, CIS calculator]
breadcrumb_visible: true
related: [tools/vat-calculator, tools/job-profit-calculator, pricing, tools]
sources: ["CIS deduction rates on gov.uk | https://www.gov.uk/what-you-must-do-as-a-cis-contractor/make-deductions-and-pay-subcontractors", "What the CIS is on gov.uk | https://www.gov.uk/what-is-the-construction-industry-scheme", "CIS guide for contractors and subcontractors | https://www.gov.uk/government/publications/construction-industry-scheme-cis-340/construction-industry-scheme-a-guide-for-contractors-and-subcontractors-cis-340"]
chrome: inner
footer_heading: The site
footer_legal: false
container: legal
canonical: https://yellowtradie.com/tools/cis-calculator.html
og_type: article
published: 2026-10-24
updated: 2026-10-24
priority: 0.7
changefreq: monthly
software: false
legacy: false
---

# CIS calculator

Work out the Construction Industry Scheme deduction from a subcontractor’s pay. The scheme has three rates. Put in the amounts and pick the rate HMRC gave the contractor.

Rates read on gov.uk on 24 October 2026. Registered subcontractors 20 percent. Unregistered subcontractors 30 percent. Gross payment status 0 percent.

<div class="calc" id="cis-calc" data-cis-calc>
  <div class="calc-field">
    <label for="cis-gross">Invoice total before CIS (£)</label>
    <input type="number" id="cis-gross" inputmode="decimal" min="0" step="0.01" value="1000" data-cis-gross>
  </div>
  <div class="calc-field">
    <label for="cis-materials">Materials supplied by the subcontractor (£)</label>
    <input type="number" id="cis-materials" inputmode="decimal" min="0" step="0.01" value="200" data-cis-materials>
  </div>
  <div class="calc-field">
    <label for="cis-vat">VAT on the invoice (£)</label>
    <input type="number" id="cis-vat" inputmode="decimal" min="0" step="0.01" value="0" data-cis-vat>
  </div>
  <div class="calc-field">
    <label for="cis-rate">CIS rate</label>
    <select id="cis-rate" data-cis-rate>
      <option value="20">20% - registered</option>
      <option value="30">30% - unregistered</option>
      <option value="0">0% - gross payment status</option>
    </select>
  </div>
  <p class="calc-result" role="status" aria-live="polite" data-cis-result></p>
  <p class="calc-note">Deduction is on labour only. Materials and VAT sit outside. Fuel for travel, plant hire and similar costs are also outside where the subcontractor paid them directly.</p>
</div>

## How to work it out

CIS is on labour, not on the whole invoice. Start with the gross amount the contractor will pay for the work. Take off VAT and the direct cost of materials the subcontractor paid for. What is left is the amount liable to the deduction. Then apply the rate HMRC gave for that subcontractor.

Labour for CIS equals gross less materials less VAT less other allowable costs. Such costs include fuel used other than travel and plant hire and consumable stores. Deduction equals labour for CIS times the rate. Net paid equals gross less deduction.

Example. Gross £1,000. Materials £200. VAT nil. Labour for CIS is £800. At 20 percent the deduction is £160. The subcontractor is paid £840. HMRC holds the £160 as an advance towards the subcontractor’s tax and National Insurance.

Same job at 30 percent. Labour £800. Deduction £240. Paid £760.

Same job at 0 percent. No deduction. Paid the full gross.

## The materials rule

HMRC says the contractor takes off the amount the subcontractor paid for materials only if the subcontractor paid for them directly and can show it. If the subcontractor paid VAT on those materials, the VAT exclusive or inclusive treatment depends on whether the subcontractor is VAT registered. The contractor also takes off VAT charged on the invoice, fuel used other than travel, plant hire, and manufacturing or prefabricating costs.

You cannot take off a guess for materials where none were supplied. A labour only job at £1,000 with no materials has £1,000 liable to the deduction.

## The £1,000 question and the private householder

There is no £1,000 CIS registration threshold. The line for whether a business is a contractor is not £1,000. A business is a contractor if it pays subcontractors for construction work, or if it does not do construction work but has spent more than £3 million on construction in the last 12 months.

Private householders are not contractors. The job you do for a homeowner in their own home is outside CIS. That is why a small domestic job often has no CIS on it. It is not a threshold, it is a status.

If you are a contractor and you do construction work for a private householder, the payments your contractor makes to you can still be inside CIS. Read the gov.uk pages linked in Sources.

## Common amounts

The table shows labour for CIS from £100 to £2,000 at the two deduction rates. Gross and materials are not shown separately here, only the liable amount.

| Labour for CIS | 20% deduction | Paid at 20% | 30% deduction | Paid at 30% |
| --- | --- | --- | --- | --- |
| £100.00 | £20.00 | £80.00 | £30.00 | £70.00 |
| £200.00 | £40.00 | £160.00 | £60.00 | £140.00 |
| £500.00 | £100.00 | £400.00 | £150.00 | £350.00 |
| £800.00 | £160.00 | £640.00 | £240.00 | £560.00 |
| £1,000.00 | £200.00 | £800.00 | £300.00 | £700.00 |
| £1,500.00 | £300.00 | £1,200.00 | £450.00 | £1,050.00 |
| £2,000.00 | £400.00 | £1,600.00 | £600.00 | £1,400.00 |

## What the rates are

The rates were read on gov.uk on 24 October 2026.

* 20 percent for registered subcontractors
* 30 percent for unregistered subcontractors
* 0 percent if the subcontractor has gross payment status

HMRC tells the contractor which one to use when the contractor verifies the subcontractor. The deduction is an advance towards the subcontractor’s tax and National Insurance. The contractor must pay it to HMRC and must give the subcontractor a payment and deduction statement within 14 days of the end of each tax month.

## Questions

### Is CIS on materials?

No. It is on labour. Materials the subcontractor paid for directly sit outside, as does VAT.

### What if the invoice includes VAT?

Take the VAT off before you work out the liable amount. CIS is not charged on VAT.

### What if the subcontractor has gross payment status?

The rate is 0 percent. No deduction. The contractor still records the payment.

### Does private domestic work count?

If you are paid by a private householder for work on their own home, that householder is not a contractor for CIS. Your pay from them is outside CIS. Your payments to your own subcontractors on that job can still be inside CIS where you are a contractor.

## Sources

Rates and rules read on gov.uk on 24 October 2026.

<a class="btn btn--lg btn--solid" href="/#early-access">Join the list</a>

The app is not in the shops yet. Join the list and we will tell you the day it opens.
