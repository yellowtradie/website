---
slug: blog/taking-money-on-site
type: post
title: Taking money on site | Bank transfer and deposits
description: Bank transfer with the invoice number as reference and deposits and card on site when live and what to do when asked to pay later.
h1: Taking money on site
eyebrow: Blog
publish: false
faq: false
breadcrumb: [Home, Blog, Taking money on site]
breadcrumb_visible: true
related: [features/payments, features/chasing, guides/taking-money, tools/late-payment-interest-calculator]
sources: ["Late commercial payments on gov.uk | https://www.gov.uk/late-commercial-payments-interest-debt-recovery", "Bank of England Base Rate on bankofengland.co.uk | https://www.bankofengland.co.uk/monetary-policy/the-interest-rate-bank-rate", "VAT invoices on gov.uk | https://www.gov.uk/vat-record-keeping/vat-invoices", "VAT registration threshold on gov.uk | https://www.gov.uk/vat-registration/when-to-register"]
chrome: inner
footer_heading: The site
footer_legal: false
container: legal
canonical: https://yellowtradie.com/blog/taking-money-on-site.html
og_type: article
published: 2026-10-24
updated: 2026-10-24
priority: 0.6
changefreq: monthly
software: false
legacy: false
---

# Taking money on site

> **Key facts**
>
> * Statutory interest on a late business debt is 8 percent a year above the Bank of England base rate. Read on gov.uk on 24 October 2026.
> * You can claim a fixed sum for recovery costs. £40 on debts up to £999.99. £70 on debts of £1,000 to £9,999.99. £100 on debts of £10,000 or more. Read on gov.uk on 24 October 2026.
> * Bank Rate was 4.00 percent on 24 October 2026 on bankofengland.co.uk. Statutory rate on that date was 12.00 percent a year.
> * You must issue a VAT invoice within 30 days of supply where you are VAT registered. Read on gov.uk on 24 October 2026.

<p class="tertiary">By the YellowTradie team. Sources linked throughout.</p>

<p class="tertiary">24 October 2026 · 7 min read · Getting paid</p>

Getting paid is the last minute of the job. You have finished the work. The customer is standing there. This post is about that minute and what comes next. It covers the bank transfer with the bill's own reference and a deposit before the work and a card when it is live and what to do the moment a customer says they will pay later.

## Bank transfer with the bill's own reference

Most customers pay a solo trade by bank transfer. YellowTradie uses one rule for this. The invoice number is the payment reference.

You set your bank details once in Settings. Account name and bank name and six digit sort code and eight digit account number. The old free text box still prints if all four are empty so a bill never goes without a way to pay.

On the bill the four lines appear in the order a banking app asks for them. Account name sits first. Sort code and account number follow. Under the account number the reference line reads Reference and the invoice number. On the customer's link at link.yellowtradie.com the sort code and the account number and the reference each have a Copy control. A mistyped transfer is money you cannot place so the app lets the customer copy each field in one tap.

The reference is the invoice number and nothing added. That is the one thing the customer already holds on the paper and on the link. When the transfer lands you can match it without asking which invoice they meant. If a bill has no number no reference line is printed. The app does not invent one.

The customer's link shows the amount and what has been paid and the balance. While the bill is unpaid and unsigned the sign-off box sits below the bank block. The link is a code not an account and it needs no password. The due date is on the bill and the payment note you set in Settings sits under the total.

The payment note is the expectation you set before the job. It starts as Payment is due on completion by bank transfer before I leave site. Keep it or change it to your own words. When it is on it sits on quotes and on bills and on the customer's page for that bill. A customer who knows how to pay before you start is more likely to pay while you are there.

Where the customer pays part of the bill record the payment on the bill. Choose the amount and the date and the method. The bill shows money in and the balance and the word Open or Paid. The chase and the Home totals follow the balance not the original total. A refund is a negative row in the payments log so cash in is always the sum of the log.

## A deposit before the work

A deposit protects you on a long job. You take money when the quote is accepted and the balance when the work is done.

Set the deposit on the quote. The quote holds the deposit figure as a separate line. When the customer approves the quote the job is created with the deposit and the balance shown.

Raise the deposit bill from the accepted quote. The app creates the first invoice for the deposit amount. It carries its own invoice number and its own due date. That number is the reference for that transfer.

When the work is finished raise the balance. The app creates the second invoice for what is left. The two invoices carry different numbers and different references. Part payments on one bill are also kept. You record what was paid and when and how and the balance falls.

Example. Quote for a kitchen refit at £2,400.00. Deposit agreed at £800.00. First invoice INV-2043 for £800.00 due on acceptance. Second invoice INV-2044 for £1,600.00 due on completion. If the customer paid £500.00 against INV-2044 the balance on that bill is £1,100.00. The Home screen and the chase show £1,100.00 not £1,600.00.

The money that arrived is the record not the invoice marked paid. The payments log is the source for reports and for the tax section. A customer who paid by cash on a small domestic job is recorded the same way. Take the cash and tap Record payment on the bill. Record the amount and the method so your reports and your tax reflect what arrived not what was invoiced.

Where you are VAT registered the VAT block prints on each invoice where VAT applies. UK VAT has three rates. 20 percent standard and 5 percent reduced and 0 percent zero rated. Read those rates on gov.uk on 24 October 2026. You must register when taxable turnover goes over £90,000 in a rolling 12 months since 1 April 2024. Read that on gov.uk on 24 October 2026. You must issue a VAT invoice within 30 days of supply where you are VAT registered. Read that on gov.uk on 24 October 2026.

## A card when it is live

Card payments on your own phone are next. They are not live today and this page says so rather than selling what is not there. Until then the bill's card row is not drawn and Settings says the feature is not in this build.

When they are live the customer taps their card or phone wallet on the back of your own phone. The money goes to your own Mollie account not through the app's account. The app takes no funds and never holds a card number. A payment is only recorded when Mollie Tap hands back a signed paid answer with a payment id and only for the exact balance the bill showed when the tap started.

The plan for this is settled. The build uses Mollie Tap on Android. A tap that is cancelled or that fails does not write a payment. A tap that returns paid writes a payment row with the date and the amount and the method and the payment id so you can reconcile it in Mollie.

Until that build is tested with a real card on this app the bill shows bank transfer and the customer's link shows bank transfer. You can take a card in a separate app today and tap Record payment on the bill. That keeps the log right and your reports right while the in app card path is still being built. The footer and the features page for payments say the same and this post will be updated when the switch is thrown.

The reason the card path matters is that it keeps you on site. A customer with a card and no banking app can pay in front of you. The reference is not needed on a card path because the payment id is the reference and the bill is marked paid from the provider's answer not from the customer's word.

## What to do the moment a customer says they will pay later

Do not leave it open. Name the date and name the method before you leave.

Say the due date out loud. Put it on the invoice before you send it. The invoice date and the due date both print. The share message carries the link and the amount and the reference. The customer's page carries the same so the customer can pay from their phone without asking for details again.

If your terms say 14 days the 15th day is the first late day. If no credit period was agreed in a business to business contract the Act gives a default of 30 days to pay. Read that on gov.uk on 24 October 2026.

If the customer is a business the law lets you chase on a clear ladder. A reminder on the due date and a nudge at about seven days overdue and a firmer letter with interest where you are due it and a letter before action that gives a final date. The app keeps the same ladder. The invoice number is the payment reference on every chase. The amount shown is the amount still owed. The bank details and the reference are filled in for you.

You can add statutory interest at 8 percent above the Bank of England base rate a year where no fixed rate was agreed for business to business debts under the Late Payment of Commercial Debts Act. Read that on gov.uk on 24 October 2026. Bank Rate was 4.00 percent on 24 October 2026 on bankofengland.co.uk. Statutory rate on that date was 12.00 percent a year. Daily rate is annual rate divided by 365. Interest due is daily rate times amount still owed times days overdue. Use the balance that is late not the original invoice total.

Fixed sums are separate from interest. £40 on debts up to £999.99 and £70 on debts of £1,000 to £9,999.99 and £100 on debts of £10,000 or more. Read those bands on gov.uk on 24 October 2026. Only one fixed sum per debt on first lateness.

If the customer is a consumer in their own home the Act does not give you statutory interest and fixed sums in the same way. Interest then depends on your contract terms and on what is fair under consumer law. A term that charges interest to a consumer must meet the fairness test in the Consumer Rights Act 2015. It must be prominent and balanced. Do not add the business fixed sums of £40 and £70 and £100 to a consumer bill and present them as law. Where the 1998 Act does not apply a court can award interest of 8 percent under section 69 of the County Courts Act 1984. Read make a court claim for money on gov.uk on 24 October 2026.

The late payment interest calculator on the site shows the sum for both paths. The four letters in the letter pack show the words for each step.

Practical steps while you are still on site:

1. Agree the due date and say it back. Add it to the invoice before you send.
2. Send the bill straight away. The customer's link sits at link.yellowtradie.com as /done with the invoice code. It shows the bill and a box to confirm the work was done.
3. Check the reference on the paper and on the link. It should be the invoice number. Ask the customer to use it.
4. Record any cash taken there and then. Record the amount and the method on that invoice.
5. If nothing is paid set a note to chase on the due date. The app's chase ladder starts there.

Keep proof of what you sent and when. Keep replies. If a customer disputes the work deal with the dispute before you add more charges.

## How the app keeps the money right

The invoice carries the bank details and the reference. The customer's link carries the same. The payments log carries the money that arrived with date and amount and method and bill. A part payment lowers the balance. A refund is a negative row. The Home totals and the reports read the log not the invoice total. A chase asks for the balance not the original total. An estimate from your records not advice sits on the tax screen.

This is the moment the job is paid. The reference ties the transfer to the bill. The deposit splits a long job into two clear payments. The card path will keep a card customer on site when it is live. The plan for later payment is written before you leave.

## Sources

Rates and rules were read on gov.uk and legislation.gov.uk and bankofengland.co.uk on 24 October 2026.

- Late commercial payments on gov.uk. https://www.gov.uk/late-commercial-payments-interest-debt-recovery. Statutory interest at 8 percent above base rate. Fixed sums £40 and £70 and £100 by debt band. Daily simple interest. The 30 day default where no credit period was agreed.
- Bank of England Base Rate on bankofengland.co.uk. https://www.bankofengland.co.uk/monetary-policy/the-interest-rate-bank-rate. Base Rate 4.00 percent on 24 October 2026. Statutory rate on that date is 12.00 percent a year.
- VAT invoices on gov.uk. https://www.gov.uk/vat-record-keeping/vat-invoices. What a VAT invoice must show and issue within 30 days where you are VAT registered.
- VAT registration threshold on gov.uk. https://www.gov.uk/vat-registration/when-to-register. You must register when taxable turnover goes over £90,000 in a rolling 12 months since 1 April 2024.

## Related guides

- [Getting paid](/features/payments.html): bank transfer with the invoice number as reference and a deposit and a balance on one job.
- [Chasing what you are owed](/features/chasing.html): the four step ladder with the bank details and the reference already filled in.
- [Getting paid guides](/guides/taking-money.html): bank transfer and deposits and part payments and chasing what is still owed.
- [Late payment interest calculator](/tools/late-payment-interest-calculator.html): work out statutory interest at 8 percent above base rate and your own fixed rate.

<a class="btn btn--lg btn--solid" href="/#early-access">Join the list</a>

The app is not in the shops yet. Join the list and we will tell you the day it opens.
