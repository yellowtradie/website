---
slug: features/timesheets
type: feature
title: Timesheets | Hours on a job that become the bill
description: Hours on a job become a labour line on the invoice. A direct job with no quote still keeps its hours.
h1: Hours on the job, and the labour line they become
eyebrow: Timesheets
publish: false
faq: true
breadcrumb: [Home, Features, Timesheets]
breadcrumb_visible: true
related: [features/jobs, features/invoices, features/expenses, features]
sources: []
chrome: inner
footer_heading: The site
footer_legal: false
container: legal
canonical: https://yellowtradie.com/features/timesheets.html
og_type: article
published: 2026-10-24
updated: 2026-10-24
priority: 0.8
changefreq: monthly
software: true
legacy: false
---

# Hours on the job, and the labour line they become

Hours are for the job that never had a quote. You did the work by the hour and the bill has to show that time. In YellowTradie a direct job keeps its own timesheet and that timesheet becomes a labour line on the invoice.

A job with a priced quote never needs a timesheet. The price is already on the quote.

## What it does

A timesheet holds the hours worked on one direct job. Each entry is a date with a start time and an end time and the hourly rate that applied that day. The app works out the hours and the line amount and freezes it, so a later change to the rate does not rewrite yesterday.

The timesheet is the price where there is no quote. The job list, the job card and the bill all read the same rule: the job's invoices where there are any, else its live quote where its total is above zero, else the labour written on its timesheet. A job with no quote and no hours shows No price yet rather than £0.00.

When you invoice a direct job with hours logged, the labour fills the bill as one labour line. You check it and send it. The bill and the timesheet then show the same amount.

## Who it is for

It is for the trader who prices some jobs by the hour and some by the job. One person and one phone, on site, with no office to type it up later.

It suits the call out with no price agreed, the hourly repair, and the extra half day tacked onto a day rate. It is not for a job that already has a priced quote. That price is the price.

## How it works

1. Add a direct job or open a finished job that has no priced quote. The job card knows there is no quote to read.
2. Open the timesheet for that job. The rate box shows the last rate used or empty on first use.
3. Add an entry. Pick the date on the app's calendar, set the start and the end, check the hours and the amount, and save. The entry appears in the list and in Activity.
4. Add more entries as you work. Each entry keeps its own rate and amount. The running total is shown on the timesheet.
5. When the work is done finish the job and press Invoice the balance. The app builds the bill with the timesheet hours as one labour line. You check the bill and send it.

The timesheet is tied to the job. Its hours are shown on the job's History, and the bill built from it is linked back to the same job.

## The direct job

A direct job is a job with no quote. It is added from the plus button with a customer, a title, a day and an address. It is born In Progress when started today, or Not Started when booked for later.

A direct job with no price still books its day in the diary, because it is real work with no paperwork to wait for. A quote that has not been approved books nothing, so pending paperwork never looks like a booked day.

A direct job keeps its hours until there is a bill. If you add a priced quote to that job later the quote becomes the price and the timesheet steps back. The hours are not deleted and you can still see them.

## How the hours become the bill

The app uses one rule for the price of a job, in that order:

1. The job's invoices where there are any.
2. Its live quote where its total is above zero.
3. The labour on its timesheet where neither of the first two exists.

The labour line on the invoice is the sum of the timesheet entries for that job. The line shows hours and rate and total in the same way a quote line shows quantity and unit price.

If a job already has a quote with lines and a total, that total is the bill and the timesheet is not used for it.

## What it does not do

- It does not add hours to a job that already has a priced quote. A quoted job has no timesheet row and no entry form.
- It does not rewrite a saved entry when you change the rate. The rate on an entry is the rate you left it with when you saved.
- It does not turn hours into a bill on its own. You finish the job and raise the bill. The timesheet then fills the labour line for you to check.
- It does not keep the hours in the cloud. The timesheet is in the phone's database with the job. It stays there until you delete the customer and its jobs.
- It does not invent a rate for you. You type the rate on the timesheet. A job with hours and no rate cannot be invoiced.
- It does not double count. A job with a bill already shows the bill's total, not the bill plus the hours that made it.

## Questions

### Can I log hours on a job that already has a quote?

No. A timesheet is for a direct job with no priced quote. Where a quote already prices the work, the quote is what the bill is built from. Log hours on the jobs that were taken on by word of mouth.

### What is on one timesheet entry?

A date, a start time, an end time, the hours worked, the rate that day, and the amount for those hours. The amount is hours times rate, rounded to pennies, and kept with the entry.

### Does changing the rate change old entries?

No. Each entry keeps the rate it was saved with. A new entry uses the rate now in the rate box. The total is the sum of the kept amounts.

### How does a direct job with no quote become a bill?

Finish the job. The job card then offers Invoice the balance. That bill opens with the timesheet total as one labour line. You check it and send it. The bill's total is the same figure the job card and the Jobs list showed.

### What does the Jobs list show for a job with hours but no quote?

The timesheet total. The list uses the same rule as the job card: invoices, else quoted total above zero, else timesheet labour. A job with nothing priced shows No price yet, not £0.00.

### Where do the hours appear on the job?

On the timesheet, as a list of entries with date and hours and amount, and on the job's History as the entries are added. The bill built from them is linked back to the same job.

### Can I delete an entry?

Yes. Each entry has a delete. The timesheet total updates and Activity records it. Deleting the last entry leaves the job with no hours, so it reads No price yet again until new hours are added.

## Related

- [Jobs](/features/jobs.html): the work that holds the timesheet and the bill it becomes.
- [Invoices](/features/invoices.html): the bill built from the job, with the labour line the customer sees.
- [Your diary](/features/scheduling.html): the diary that books the day for a direct job with no quote.
- [Every part of the app](/features.html): the other pages.

<a class="btn btn--lg btn--solid" href="/#early-access">Join the list</a>

The app is not in the shops yet. Join the list and we will tell you the day it opens.
