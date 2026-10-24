---
slug: features/ai-assistant
type: feature
title: The assistant | It answers from your own records
description: The assistant answers from the trader's own records on the phone and never invents a figure. Every answer comes as a card, a table or a chart.
h1: The assistant that answers from your own records
eyebrow: Ask AI
publish: true
faq: true
breadcrumb: [Home, Features, Ask AI]
breadcrumb_visible: true
related: [features/jobs, features/invoices, features/expenses, features]
sources: []
chrome: inner
footer_heading: The site
footer_legal: false
container: legal
canonical: https://yellowtradie.com/features/ai-assistant.html
og_type: article
published: 2026-10-24
updated: 2026-10-24
priority: 0.8
changefreq: monthly
software: true
legacy: false
---

# The assistant that answers from your own records

The assistant answers what you ask from the records on your phone. Every number is read from those records, not written by a model. An answer comes back as a card, a table or a chart, not as a sentence with a figure the model typed.

It can also do small tasks for you, one at a time, with a card that says what it will do. You tap to allow it. Nothing is written without that tap.

## What it does

It answers questions about your own work. How much you were paid this month. How much you spent. What you have made. What is overdue. Who still owes you. What jobs are on today. What quotes you sent. Who paid you most.

It also carries out short tasks: add a job, add a customer, record a chase, and similar small writes. Each is shown as a confirmation card that says what will be saved and where. You press to confirm. If you do not, nothing is saved.

The numbers it shows are the same numbers the app shows on Reports and on Money. VAT is handled the same way. A registered trader sees net figures. An unregistered trader sees gross. The overdue rule it uses is the same rule the invoices page uses, so the table on the answer and the list on the page cannot call the same bill by two different names.

## Who it is for

It is for the solo trader who wants a quick answer without opening four screens. One person and one phone. It suits the moment after a job when you want to know where the money is.

It is not a tax adviser. It answers from what you have kept in the app. It does not invent what is not there.

## How it works

1. You open Ask AI from the dock. Type a question or use Talk, or pick one of the sample questions shown before any chat.
2. Jev decides which report or task you meant. It returns an id for the report, the time window and the customer name where you named one. It never returns a figure.
3. The phone resolves the window on your own clock, reads your records, and builds the answer. A money answer goes through the one money function the app uses for every money screen.
4. The answer is drawn. A single figure is a card with the label, the amount and a note that says how many payments that covers. A list of bills is a table with invoice, customer, owed and days late. Money over months is a six month chart ending in the month you asked about.
5. If the request is a task, a confirmation card is shown with the exact thing to be saved. You tap to confirm. The phone then writes to its own database.
6. You can open a record from a report. A row can link to the real job or quote or invoice. That opens the same page you would get to from Home or Money.

## What it can be asked

- How much was I paid this month, last month, this quarter, this tax year, or in total when you name no period.
- How much did I spend in the same windows.
- What have I made, in plain words, with money in and money out on the cash basis the tax page uses.
- What is overdue, or who still owes me, with the amount per bill and days past due.
- What jobs are on today, tomorrow, this week or this month, with the customer's name and the site address the app has for that job. A multi day job appears on each day it runs.
- What quotes I sent in a period, with status, amount and who they were for.
- Who paid me most in this tax year, with received totals per customer.

A customer name in a question narrows the answer to that customer. If the name matches a saved customer it is looked up by id, not by text.

## What it will not do

- It will not invent a figure. Every number in a card, a table or a chart is read from the phone's own database. If there are no records for that period the answer says nothing is there.
- It will not write without your tap. A task card shows what will be saved. Nothing is saved until you press it. You can leave it and nothing changes.
- It will not give tax advice. It shows figures from your own payments and costs. It does not decide what you owe. For that see the tax page and your accountant.
- It will not answer for someone else. One trader and one phone. There is no second user and no team to ask about.
- It will not keep your words in the cloud. Your quotes, jobs, invoices, costs and payments stay on the phone. The server holds the assistant key and no records.
- It will not name a figure in a sentence. A figure appears in the money label and in the table cells and bars, never in the model's own sentence alone.

## Questions

### Where does a number come from?

From the phone's own database. Payments, costs, invoices and jobs live in SQLite on your phone. The assistant reads them with the same query the reports use. It then draws the card or table. No number is taken from the model's reply.

### Why is the answer a card, a table or a chart, not a sentence?

So a figure can be checked. A money answer has the figure in its label and a note that says how many payments it covers, plus a six month chart to that month. A list of bills is a table with invoice, customer, amount owed and days late. The sentence only says how much and for which period.

### Can it add a job or a customer for me?

Yes, as a task. Ask to add a job or a customer and the app shows a confirmation card with the name, the job title, the date and the address. You tap to confirm and it is saved to the phone. If you cancel, nothing is saved.

### What can it not answer?

Anything not in your records. If you never logged a cost, it cannot guess it. If you have not taken a payment, it cannot say you have. It will say nothing is booked or nothing is overdue rather than invent a row.

### Does it cost anything?

The answer's number does not. Speaking in live voice and long chats use AI minutes. Those minutes live on the server and are shown on the Ask screen. The text answer and the typed report cost nothing to read.

### Can I open the job or invoice it lists?

Yes. A report row carries the invoice number or quote number and the app turns it into a button that opens the real document or job page.

### Does it remember past chats?

No. Each question is answered from the records you have now. Your business stays on your phone, not in a chat history on a server.

## Related

- [Jobs](/features/jobs.html): the work that appears in the today and this week reports.
- [Invoices](/features/invoices.html): the bills that appear in the overdue and still owed answers.
- [Costs and receipts](/features/expenses.html): the spend that makes the money out and profit answers.
- [Every part of the app](/features.html): the other pages.

<a class="btn btn--lg btn--solid" href="/#early-access">Join the list</a>

The app is not in the shops yet. Join the list and we will tell you the day it opens.
