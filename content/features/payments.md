---
slug: features/payments
type: feature
title: Payments | Bank transfer and card on your phone
description: Bank transfer with the invoice number as the reference, a deposit and a balance on one job, and card payments when they are live.
h1: Paid by bank transfer, and by card when it is live
eyebrow: Payments
publish: true
faq: true
breadcrumb: [Home, Features, Payments]
breadcrumb_visible: true
related: [features/invoices, features/jobs, features/chasing, features]
sources: []
chrome: inner
footer_heading: The site
footer_legal: false
container: legal
canonical: https://yellowtradie.com/features/payments.html
og_type: article
published: 2026-10-24
updated: 2026-10-24
priority: 0.8
changefreq: monthly
software: true
legacy: false
---

# Paid by bank transfer, and by card when it is live

Most customers pay by bank transfer. YellowTradie puts your bank details and the payment reference on the bill and on the customer's link, so the transfer can be placed without asking for details again. A deposit and a balance can be billed on one job, and the balance is what is chased and reported.

Card payments on your own phone are next. They are not live today and this page says so.

## What it does

On every bill you send, the invoice carries the bank details you set in Settings: account name, bank name, sort code and account number, each on its own line. Under the account number the reference line reads Reference and the invoice number, because that is the order a banking app asks for them. On the customer's link the sort code, the account number and the reference each have a Copy control, because a mistyped transfer is money you cannot place.

A deposit and a balance on one job are two bills for the same job. You raise the deposit bill from the accepted quote, and when the work is done you raise the balance. Part payments on one bill are also kept: you record what was paid, when, and how, and the balance falls. The amount that is still owed is the figure the Home screen and the chase use.

The Money tab has a payments log. Every payment is a row with the date, the amount, the method and the bill it settled. A refund is a negative row, so the cash in figure is always the sum of the log.

## Who it is for

It is for the trader who wants to be paid before he leaves site, or within days rather than weeks. One person and one phone, handling their own money.

## How it works

1. Set your bank details once in Settings. Account name, bank name, six digit sort code and eight digit account number. The old free text box still prints if all four are empty, so a bill never goes without a way to pay.
2. Set your invoice number prefix in Settings. The invoice number is the reference the customer types.
3. Send the bill. The PDF and the customer's link both carry the bank details and the reference. The due date is on the bill.
4. The customer pays by bank transfer. They use the sort code and the account number and the reference from the bill. No card number is taken anywhere in the app for this step.
5. Record the payment on the bill. Choose the amount and the date and the method. Part payments are kept and the balance and the status word and the Home totals move.
6. Chase what is left. The chase asks for the balance, not the original total, and it carries the same bank details, reference and link.

A deposit job works the same way with two passes. The quote holds the deposit figure. Approval creates the job. Invoice the deposit raises the first bill. When the work is finished, invoice the balance raises the second.

## Bank transfer

The invoice PDF, the share message and the customer's link all show the same details, from one place. The four fields win when any of them is filled. The reference is the invoice number and nothing added, because that is the one thing the customer is already holding.

The customer's link shows the amount, what has been paid, the balance, your bank details and the sign-off box while the bill is unpaid and unsigned. The link is a code, not an account, and it needs no password.

## Card payments on your phone

Card payments are parked behind Mollie Tap on Android. They are designed and not live, so the page says so rather than selling what is not there.

When they are live, the customer taps their card or phone wallet on the back of your own phone. The money goes to your own Mollie account, not through the app's account. The app takes no funds and never holds a card number. A payment is only recorded when Mollie Tap hands back a signed paid answer with a payment id, and only for the exact balance the bill showed when the tap started.

Until then, the bill's card row is not drawn and Settings says the feature is not in this build.

## What it does not do

- It does not take a card today. The card row on the bill and in Settings says so, and the app does not draw a card form anywhere.
- It does not hold customer card numbers. Bank transfer is your own account details on the bill. Card, when live, is read by Mollie Tap on your phone.
- It does not mark a bill paid because a customer said so. A payment is recorded when you tap it, or when Mollie confirms it for the card path. Opening the customer's link does not change the balance.
- It does not claim money is in your bank. Paid means the provider confirmed it on the card path, and that you recorded it on the bank transfer path.
- It does not invent a reference. The reference is the invoice number from Settings. If a bill has no number, no reference line is printed.
- It does not treat a part payment as a full one. The paid figure and the balance both stay on the bill and in the log.

## Questions

### What is the payment reference?

The invoice number. It is printed under the account number on the bill and on the share message and on the customer's link. A bank transfer with that number can be placed to the right bill without asking the customer which invoice they meant.

### Can I take a deposit?

Yes. Set the deposit on the quote. When the customer approves, the job is created with the deposit and the balance shown. Raise the deposit bill from Home or from the quote, then raise the balance when the work is done. Each has its own reference.

### What if a customer pays part of the bill?

Record the amount they paid. The bill shows the money in and the balance and the word Open or Paid. The chase and the Home totals follow the balance.

### Does the customer's link take a card?

No, not today. The link shows the bill, your bank details and the reference, and the sign-off box. When card on your phone is live, the card is taken on your phone with the customer in front of you, not on the link.

### How do bank details appear to the customer?

As four lines on the PDF and on the link, in the order a banking app asks for them. Sort code and account number and reference each have a Copy button on the link.

### When will card payments be live?

When Mollie Tap on your phone is tested with a real card on this app. Until then Settings says the feature is not in this build and the bill hides the card row. We will update this page when it opens.

## Related

- [Invoices](/features/invoices.html): the bill that carries the bank details and the reference.
- [Jobs](/features/jobs.html): the job that can be billed in two parts.
- [Chasing](/features/chasing.html): chasing the balance that is still owed.
- [Every part of the app](/features.html): the other pages.

<a class="btn btn--lg btn--solid" href="/#early-access">Join the list</a>

The app is not in the shops yet. Join the list and we will tell you the day it opens.
