---
slug: blog/ai-for-solo-traders
type: post
title: AI for solo traders | What helps on site
description: What the YellowTradie assistant does from your own records and what it cannot do and why every figure comes from your phone not from a model.
h1: AI for solo traders
eyebrow: Blog
publish: false
faq: false
breadcrumb: [Home, Blog, AI for solo traders]
breadcrumb_visible: true
related: [features/ai-assistant, features/voice-quotes, features/reports, guides/quotes]
sources: ["VAT rates on gov.uk | https://www.gov.uk/vat-rates", "VAT registration threshold on gov.uk | https://www.gov.uk/vat-registration/when-to-register", "VAT invoices on gov.uk | https://www.gov.uk/vat-record-keeping/vat-invoices", "Self Assessment deadlines on gov.uk | https://www.gov.uk/self-assessment-tax-returns/deadlines"]
chrome: inner
footer_heading: The site
footer_legal: false
container: legal
canonical: https://yellowtradie.com/blog/ai-for-solo-traders.html
og_type: article
published: 2026-10-24
updated: 2026-10-24
priority: 0.6
changefreq: monthly
software: false
legacy: false
---

# AI for solo traders

> **Key facts**
>
> * UK VAT has three rates. 20 percent standard and 5 percent reduced and 0 percent zero rated. Read on gov.uk on 24 October 2026.
> * You must register when taxable turnover goes over £90,000 in a rolling 12 months since 1 April 2024. Read on gov.uk on 24 October 2026.
> * You must issue a VAT invoice within 30 days of supply where you are VAT registered. Read on gov.uk on 24 October 2026.
> * Paper return for 2025/26 is due 31 October 2026. Online return is due 31 January 2027. Read on gov.uk on 24 October 2026.

<p class="tertiary">By the YellowTradie team. Sources linked throughout.</p>

<p class="tertiary">24 October 2026 · 8 min read · The assistant</p>

This post says plainly what the assistant in YellowTradie does and what it cannot do and why it never invents a figure. It is not a trend piece about AI. It is not a claim about how many traders use it. If it is not in a source it is not in the post.

## What the assistant is for

The assistant is a way to ask a question about your own work and get an answer from your own records. One person and one phone. No team and no office and no desk.

You are on site and you want to know how much you were paid this month. Or what is overdue. Or who still owes you. Or what is on today. Or who paid you most this tax year. The assistant gives you that answer without opening four screens.

It also writes small tasks for you one at a time when you ask. Add a job or add a customer or record a chase. Each one is shown as a card that says what will be saved and where. You tap to allow it. Nothing is written without that tap.

The app keeps the same words you see on every other screen. Open invoices and pending quotes and balance and paid in full. The assistant uses those words so the answer on the chat and the list on the page cannot call the same bill by two different names.

## What it does

It answers questions about your own work.

How much you were paid this month and last month and this quarter and this tax year and in total when you name no period. How much you spent in the same windows. What you have made in plain words with money in and money out on the cash basis the tax page uses. What is overdue and who still owes you with the amount per bill and days past due. What jobs are on today and tomorrow and this week and this month with the customer name and the site address the app has for that job. A multi day job appears on each day it runs. What quotes you sent in a period with status and amount and who they were for. Who paid you most in this tax year with received totals per customer.

A customer name in a question narrows the answer to that customer. If the name matches a saved customer it is looked up by id not by text so a similar spelling does not pull the wrong person.

It also carries out short tasks. Add a job and add a customer and record a chase and similar small writes. Each is shown as a confirmation card that says what will be saved. You press to confirm. If you do not nothing is saved. You can leave it and nothing changes.

The numbers it shows are the same numbers the app shows on Reports and on Money. VAT is handled the same way. A registered trader sees net figures. An unregistered trader sees gross. The overdue rule it uses is the same rule the invoices page uses.

## What it cannot do

It will not invent a figure.

Every number in a card and a table and a chart is read from the phone's own database. If there are no records for that period the answer says nothing is there. It says nothing is booked or nothing is overdue rather than invent a row. If you never logged a cost it cannot guess it. If you have not taken a payment it cannot say you have.

It will not write without your tap. A task card shows what will be saved. Nothing is saved until you press it.

It will not give tax advice. It shows figures from your own payments and costs. It does not decide what you owe. For that see the tax page and your accountant. The tax screen carries the line an estimate from your records not advice.

It will not answer for someone else. One trader and one phone. There is no second user and no team to ask about.

It will not keep your words in the cloud. Your quotes and jobs and invoices and costs and payments stay on the phone in SQLite. The server holds the assistant key and no records.

It will not name a figure in a sentence. A figure appears in the money label and in the table cells and bars never in the model's own sentence alone. The sentence only says how much and for which period.

It will not answer from the web and it will not look up the law. It answers from your records. Where you need the law the site guides link to gov.uk and HMRC.

It will not file with HMRC. It does not file a tax return or a VAT return. It shows the figures that would go into one where you have kept them.

## Why it never invents a figure

The design is split in two so a model typed number can never become the answer.

You open Ask AI from the dock. You type a question or use Talk or pick one of the sample questions shown before any chat.

Jev decides which report or task you meant. It returns an id for the report and the time window and the customer name where you named one. It never returns a figure.

The phone resolves the window on your own clock and reads your records and builds the answer. A money answer goes through the one money function the app uses for every money screen. The answer is drawn as a card or a table or a chart. A single figure is a card with the label and the amount and a note that says how many payments that covers. A list of bills is a table with invoice and customer and owed and days late. Money over months is a six month chart ending in the month you asked about.

If the request is a task a confirmation card is shown with the exact thing to be saved. You tap to confirm. The phone then writes to its own database.

You can open a record from a report. A row can link to the real job or quote or invoice. That opens the same page you would get to from Home or Money.

This split is why the key facts at the top of this post are not about AI. A claim about how many traders use AI or how much time it saves would need a source and we do not have one from gov.uk or HMRC or from our own app's records. The law of the source for this site is gov.uk or HMRC or our own app's records. Never the competitor's page. That rule is why this post does not carry a figure about AI adoption.

The numbers a trader needs are different and they do have sources. UK VAT has three rates. 20 percent standard and 5 percent reduced and 0 percent zero rated. Read those rates on gov.uk on 24 October 2026. You must register when taxable turnover goes over £90,000 in a rolling 12 months since 1 April 2024. Read that on gov.uk on 24 October 2026. You must issue a VAT invoice within 30 days of supply where you are VAT registered. Read that on gov.uk on 24 October 2026. Paper return for 2025/26 is due 31 October 2026 and online return is due 31 January 2027. Read those dates on gov.uk on 24 October 2026.

## How to use it on a normal day

Speak where speaking fits and type where typing fits.

Say the job and let the quote fill itself. That is the Talk flow on the quote page. Each finished sentence is read on its own and the line files itself into Materials or Labour or Travel time or Additional charges. The call-out keeps its own place. A line the reader could not place stays in your own words until you file it or delete it. The app works out the total from the lines as they arrive. You check the form and press Make quote. That press never sends it.

Ask the assistant when you need an answer from your records. How much was I paid last month. Who still owes me. What is on tomorrow. The answer comes back as a card and a table and a chart you can check. The money label and the table cells and bars hold the figures.

Keep your bank details and the payment reference on the bill. The invoice number is the reference. The customer's link sits at link.yellowtradie.com as /q with the quote code and /done with the invoice code. The customer can approve a quote or sign off a bill there and the payment block is on that page.

Record what was paid on the bill when it lands. Part payments lower the balance and a refund is a negative row. The chase asks for the balance not the original total. The tax estimate is a view from those records in bands with Class 4 National Insurance and CIS already deducted.

## The two voices

The assistant has two voice modes and the words make clear which costs.

Free voice is the phone's own voice. It spends nothing and it works with no signal. It sounds robotic.

Live voice is a real conversation that sounds human and every minute of it uses AI minutes. Paid.

Off means answers stay on the screen and nothing is spent on speaking.

The Ask screen and Settings use the same lines from one file so the two can never say different things.

## What it is not

It is not an adviser. It is not an accountant. It is not a search engine. It is not a team member. It is not a filing agent for HMRC. It is not a promise about the future of AI.

It is a way to speak and to ask and to get an answer that is already in your phone.

## Sources

Rates and dates were read on gov.uk on 24 October 2026.

- VAT rates on gov.uk. https://www.gov.uk/vat-rates. UK VAT has three rates. 20 percent standard and 5 percent reduced and 0 percent zero rated.
- VAT registration threshold on gov.uk. https://www.gov.uk/vat-registration/when-to-register. You must register when taxable turnover goes over £90,000 in a rolling 12 months since 1 April 2024.
- VAT invoices on gov.uk. https://www.gov.uk/vat-record-keeping/vat-invoices. What a VAT invoice must show and issue within 30 days where you are VAT registered.
- Self Assessment deadlines on gov.uk. https://www.gov.uk/self-assessment-tax-returns/deadlines. Paper return for 2025/26 due 31 October 2026. Online return due 31 January 2027. You can send from 6 April onwards.

## Related guides

- [The assistant](/features/ai-assistant.html): what it does and what it will not do and why every number comes from the phone.
- [Quote by talking](/features/voice-quotes.html): speak the job and the quote fills itself line by line in your words.
- [Reports](/features/reports.html): the year and what you are owed and what the tax is on the same records.
- [Quoting guides](/guides/quotes.html): how to build the price and what to put on the quote.

<a class="btn btn--lg btn--solid" href="/#early-access">Join the list</a>

The app is not in the shops yet. Join the list and we will tell you the day it opens.
