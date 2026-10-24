---
slug: integrations
type: hub
title: Integrations | Xero QuickBooks FreeAgent and Sage
description: Xero, QuickBooks, FreeAgent and Sage. What works today, what is on the way, and why the app never implies a sync that does not exist.
h1: Xero, QuickBooks, FreeAgent and Sage
eyebrow: Integrations
publish: true
faq: true
breadcrumb: [Home, Integrations]
breadcrumb_visible: true
related: [features/invoices, features/expenses, features/tax, features]
sources: []
chrome: inner
footer_heading: The site
footer_legal: false
container: legal
canonical: https://yellowtradie.com/integrations.html
og_type: article
published: 2026-10-24
updated: 2026-10-24
priority: 0.8
changefreq: monthly
software: true
legacy: false
---

# Xero, QuickBooks, FreeAgent and Sage

YellowTradie will send your bills, payments and costs to the books you already use. The four on the roadmap are Xero, QuickBooks Online, FreeAgent and Sage Business Cloud Accounting.

None of those syncs is live today. This page says which works today, which is on the way, and what the app does instead.

## What works today

Files. The app already builds a quarterly spreadsheet that your accountant can open.

It is one file per period. It holds payments received and costs paid in that period, on cash basis, with VAT shown where you are VAT registered, and costs broken into HMRC's own thirteen categories. Your accountant can lift the totals straight into their own software.

All four packages import invoices and bills from a spreadsheet, so the file is a real import path for Xero, QuickBooks, FreeAgent and Sage Accounting. It is also the only path for Sage 50, which is desktop software with no public API. The app says that plainly rather than pretending Sage 50 syncs.

Access the pack from Reports. Pick the period and tap share. There is no login and nothing to connect.

What is on the way, and what it is not, is under the headings below. The app never implies a connection that does not exist.

## What is on the way

Four live connections, built as adapters behind one flow:

- **Xero** : REST API with OAuth 2.0. Sending data in is free. The first five connected traders are within Xero's free tier. Approval is needed for production keys.
- **QuickBooks Online** : REST API with OAuth 2.0. Writes are free and reads are free to half a million a month. Approval is needed with an assessment questionnaire and a security review before production keys, so the wait is the long pole.
- **FreeAgent** : REST API with OAuth 2.0. Free and open, registered in their developer dashboard. It has native CIS fields on an invoice, so the app's CIS snapshot fits without glue.
- **Sage Business Cloud Accounting** : REST API v3.1 with OAuth 2.0. Free to use. Only the cloud product syncs.

All four were read against their own developer pages on 2026-10-21. Those pages are the source for the rows above.

What costs money at small size is none of them. Xero's fees begin after five connections. Intuit's begin at high read volumes. The cost in all four is time and two review queues. It is not the calls.

## The honest order

Files first. They ship in days and need no keys. Then one live connection, Xero, behind a switch, because it has the widest UK small business reach and can push a bill as draft so your accountant still authorises it. Then QuickBooks whose app registration and assessment can run while Xero is built. Then FreeAgent and Sage when a trader asks for them. Two to three days each on the same shape.

You will know when one is live because this page will say it is live, with the organisation name the app got back from the provider, not a placeholder.

## What a connection will do, and what it will not

A connection will send documents, not totals. A bill is a contact, lines, VAT, number, issue date and due date. A payment is money received applied to that bill. A cost is a spend, not a sales invoice. They are the records the books need to stay checkable.

One VAT code per line. The app has one rate in Settings and a VAT number switch. Each package has its own tax type ids. That is a one time mapping per package, not a guess per push.

A duplicate guard. Every pushed document records where it landed. A second send is an update, never a second bill. A push that fails halfway can be retried without duplicating.

A connection will not:

- File anything with HMRC. It writes to your books. HMRC filing is done through HMRC, not from this app.
- Let the assistant read or write your books. Figures in chat stay from the phone's own records. That rule does not bend for a connection.
- Put a provider key or token on the phone or on the customer's page. The sign in keys live on our server behind your device key, never on the phone and never on link.yellowtradie.com, which is public by design.
- Say connected until a real organisation name comes back from the provider.
- Push a document as authorised when you have not seen what it will look like as a draft in your books.
- Delete or void something in your books without telling you, and not silently leave a deleted app bill live in your books either.

## Sage Pay is not Sage the accountant

A trader asked about Sage Pay. Sage Pay was sold to Elavon in 2020 and is now Opayo, a card gateway. It has nothing to do with sending bills to a set of books. Cards are taken on your phone through Mollie, when that part is live. The books package is Sage Business Cloud Accounting, or Sage 50 desktop with the file route only.

## What it does not do

- It does not say connected for any of the four today. None is live today. The spreadsheet pack is what is live, and the page says so.
- It does not create a second bill for one document, ever. That is the duplicate guard's job, written on success only.
- It does not read your books back in the first version. A first version pushes only. Reading payments and status back doubles the work and makes two claims about the same money, which the app's money rules forbid. You mark money received in the app, as you do today.
- It does not keep working cleanly after a reinstall without a reconnect. There are no accounts in the app yet. A connection is keyed to a device key on the phone and a reinstall loses it, so you would connect again. When accounts land that line will change. The app will say that plainly on the connection screen.
- It does not imply Sage 50 syncs. Sage 50 has no public API. The file is the only route, and this page says so.

## Questions

### Is Xero connected today?

No. None of the four is. The spreadsheet pack is what works today. Xero is first on the live list because it is free for small use and its drafts let your accountant authorise the bill. When it is live this page will name your organisation back from Xero, not a placeholder.

### What about QuickBooks?

Read and planned, not live. Its writes are free. The build waits on Intuit's approval queue, which can take weeks. The app registration and assessment run while the first connection is built. The wait and the work overlap.

### Does FreeAgent handle CIS?

Yes, natively. FreeAgent's invoice has CIS fields, so the deduction the app already snaps can travel without glue. It is still on the way. When it is live it will behave like the other three: contacts first, one VAT code per line, payment as its own document, duplicate guard.

### What about Sage?

Sage Business Cloud Accounting is on the way as a free open REST API. Sage 50 desktop has no public API. A trader on Sage 50 uses the file, not a live connection, and the page says so rather than pretending.

### Why not just send a lump sum per quarter?

Because an accountant will refuse it. A quarter's one line loses the detail and the VAT cannot be checked. The file and the live push both keep bills and costs as documents with lines and VAT and dates.

### Does the assistant use my books once connected?

No. Chat answers stay from the phone's own records. The bills and costs are yours before they are pushed and ours never argues with them. That is the book of record rule: the app records the work and the money, the package is the books once the push lands.

### What does connected mean when it is real?

That a real organisation name came back from the provider, that a draft bill appeared in your books with the right contact and lines, that sending it again made one bill not two, and that no key or token sits in the app on the phone.

## Related

- [Invoices](/features/invoices.html): the bills that will be pushed to your books.
- [Costs and receipts](/features/expenses.html): the spend that will be pushed as a purchase.
- [Reports](/features/reports.html): the period your pack and your future push cover.
- [Every part of the app](/features.html): the other pages.

<a class="btn btn--lg btn--solid" href="/#early-access">Join the list</a>

The app is not in the shops yet. Join the list and we will tell you the day it opens.
