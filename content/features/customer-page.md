---
slug: features/customer-page
type: feature
title: The customer's own page | Their link to approve and pay
description: link.yellowtradie.com gives the customer their own page to approve a quote or sign off a bill and see what they owe.
h1: The customer's own page for your quote and your bill
eyebrow: Customer page
publish: true
faq: true
breadcrumb: [Home, Features, Customer page]
breadcrumb_visible: true
related: [features/quotes, features/invoices, features/payments, features]
sources: []
chrome: inner
footer_heading: The site
footer_legal: false
container: legal
canonical: https://yellowtradie.com/features/customer-page.html
og_type: article
published: 2026-10-24
updated: 2026-10-24
priority: 0.8
changefreq: monthly
software: true
legacy: false
---

# The customer's own page for your quote and your bill

The customer gets an address of their own. It is on link.yellowtradie.com. They open it on their phone and they see the quote or the bill you sent. They approve a quote or sign off a bill there. They see what they still owe.

The address is the whole link. There is no query string. The code after the slash is the only thing that lets them in. There is no password and no account to make.

## What the customer sees

On a quote the page opens as /q/code. At the top it shows your business name and theirs. It also shows the site address and the quote number. Then the line items one by one with quantity and rate and line total. Then the subtotal with VAT and total.

Below the total is what they can do. They can approve. They can ask for changes. They can decline. If the quote has expired the Approve button is not offered. Asking for a new quote is offered when it has expired. When they answer, the page thanks them. It keeps the quote on view. A signature is taken when they approve. It is stored with the answer.

On a bill the page opens as /done/code. The trader has finished the work and marked it done, and the bill has been shared. The page shows the bill number, the job title, the site address and the same line breakdown as the quote page. Under that it shows what has been paid and what is left to pay. That is read from the bill at the time the link was shared.

Below the bill is the sign-off box. The customer draws their signature there and writes their name. They tap to confirm the work is done. That sign-off is then stored and can be matched back to the job on your phone. The bill keeps a signed state once that arrives.

On both pages the customer can see your business phone and email and the VAT number where it applies. The PDF you sent and this link show the same figures, because the phone uploads the same snapshot to the link when you send.

## Who it is for

It is for the customer who is not on an app. One tap on a link in a message they already got. They do not need to install anything.

It is not a portal with a login. They have one address for one quote and one for one bill, and nothing else.

## How it works

1. You create the quote on your phone and send it. The app saves a snapshot and uploads it. The message you send carries the link. The link reads /q/code.
2. The customer opens the link. The page is served from link.yellowtradie.com with the snapshot for that code. No password is asked for, because the code is the access.
3. They choose Approve or Change request or Declined. If they approve, they sign and the answer is stored with the signature image. If they ask for changes, they write what was not right and choose whether you should ring them back.
4. Your phone checks for answers and pulls them in. An approved quote creates the job. A change request sits on the quote for you to read and decide.
5. When you finish the work and mark it done, the app can share the bill. That second link reads /done/code. It shows total, amount paid and balance, and the sign-off box.
6. The customer signs off on that second link. Your phone pulls that sign-off back and the bill shows who signed and when. The signature image is kept with the job.

Sending the same quote again updates the same link, so the address the customer already has shows the new paper. A second bill for the same job is a second link with a new code.

## What it does not do

- It does not keep a customer account. There is no login and no password reset. Each link is one document.
- It does not take payment. The bill shows your bank details with sort code and account number and reference on their own lines. Each has a copy button. No card is taken on the link.
- It does not let the customer edit the price. They can approve. They can ask for changes. They can decline. The figures are yours to set on the phone.
- It does not guess who answered. The answer has a name typed with it and the signature image where one was given, but the link has no login to check it against.
- It does not accept an answer after the quote is out of date. A revoked link answers out of date, and the server will not take an approve on an expired quote.
- It does not make a quote valid longer. The expiry you set on the quote is the expiry the link honours.

## Questions

### What is link.yellowtradie.com?

Your customer's address for your paperwork. You send a quote and the customer gets /q/code. You send a bill for finished work and they get /done/code. It opens the snapshot you uploaded when you sent.

### What do they actually see first?

Their name and yours, the address of the work, the quote or bill number, then every line item with quantity and price, then the totals. The buttons to answer are below that, so the price is seen before the choice.

### Can they pay on the page?

No. The bill on the page shows your bank details and the invoice number as the reference, with copy buttons for each. They pay by bank transfer in their own banking app, or by card on your phone when that is ready.

### Is there a password?

No. The code in the address is the only thing keeping one customer's quote from another's. Do not forward a link to anyone who should not see that quote or bill.

### What if the quote has expired?

The page will not offer Approve. The customer can still ask for a fresh quote. The server refuses an approve posted to an expired quote.

### What does the sign-off on /done/code do?

It records who signed for the finished work and when, with their signature image. It sits with the job and the bill. It does not mark the bill paid. Paid is still what you record in Payments.

### What if I change the quote after I sent it?

Send it again. The app uploads the new snapshot to the same code and the link the customer already has shows the new paper.

## Related

- [Quotes](/features/quotes.html): the priced document the customer approves.
- [Invoices](/features/invoices.html): the bill the customer signs off.
- [Getting paid](/features/payments.html): bank transfer details and card on your phone.
- [Every part of the app](/features.html): the other pages.

<a class="btn btn--lg btn--solid" href="/#early-access">Join the list</a>

The app is not in the shops yet. Join the list and we will tell you the day it opens.
