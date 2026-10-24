---
slug: features/scheduling
type: feature
title: Your diary | Busy days and jobs that start themselves
description: The diary with busy days, jobs that run over more than one day, and the job that moves itself to In Progress on its start date.
h1: Your diary knows which days are busy and which job starts today
eyebrow: Your diary
publish: false
faq: true
breadcrumb: [Home, Features, Your diary]
breadcrumb_visible: true
related: [features/jobs, features/timesheets, features/customer-page, features]
sources: []
chrome: inner
footer_heading: The site
footer_legal: false
container: legal
canonical: https://yellowtradie.com/features/scheduling.html
og_type: article
published: 2026-10-24
updated: 2026-10-24
priority: 0.8
changefreq: monthly
software: true
legacy: false
---

# Your diary knows which days are busy and which job starts today

The diary is the calendar and the list that sits under it. It shows which days are full and which job runs on each. A job can be one day or several. A job with a start date moves itself to In Progress when that day comes. Only you mark it Completed.

## What it does

The diary shows your work booked by day. The month view marks busy days with a dot, and the week view shows the jobs in that window. A multi day booking colours the span it covers in the same pass.

A job's status follows the diary in one direction only. A job booked for today or earlier reads In Progress. That is the date saying work has started. A job never completes on its own. You press Finish job on the job page, or you tap Did you finish on Today the morning after its last booked day.

Busy days are drawn from the same rule as the Jobs list. A job that is real work and has a start date books its day. A quote that has not been approved is not real work, so it books nothing.

## Who it is for

It is for the solo trader who books work day by day and needs to know which days are taken before saying yes to the next call. One person and one phone, with no crew to send.

## The diary

The calendar has a month and a week view. Each is a window with a start and an end, taken from midnight to midnight. A job with no start date is in no window, because the app never invents a day for a job.

A job with a single booked day occupies that day. A job with a first and a last day occupies the whole run, from the midnight of the first to the midnight of the last. The list under the calendar and the coloured span on the calendar show the same run.

The figure beside the list is the value of the jobs in that window, using the same rule as the job card: the job's invoices where there are any, else its live quote, else its logged hours. The calendar and the figure cannot light up a different number of cards.

## Busy days

A day is busy when real work is booked on it. Real work means the job is not archived and where it has a quote the customer's answer was yes. The quote answers that count are Approved and Invoiced and Paid. A draft or a Sent or a Declined quote is not work. It does not draw a busy mark.

A job with no quote at all is direct work with no paperwork, booked by the trader, so it counts as busy from the moment it exists.

The same rule draws the picker inside the job form. Days taken show a bar under them before you pick, so you do not have to open a second screen to know.

## Jobs that run over more than one day

A job can be a run of days. The first booked day and the last booked day are set on the calendar in the job form: Morning, Afternoon or Full day is chosen before you tap, and the time fills that block. A run whose days were set on the calendar keeps its last day, and a run drawn only as a time still has a span.

A run is asked about only after its last day has passed. Today puts up Did you finish the morning after the last booked day, never its first. A one day job is asked about the next morning too.

A run that slips stays with you until you close it. A job whose last booked day has gone stays In Progress rather than looking done, until you press Finish job. That is the app not guessing that the work is finished because the week is over.

## A job that moves itself on its start date

A booked job moves itself from Not Started to In Progress on its own start date.

That move happens on the first load on that day. There is no alarm that has to be kept alive. The app checks which jobs are now due to start and writes In Progress for them. A job with no start date is left alone, because no day says it should have begun.

A direct job with no date is different. It is made with the button that reads Start job, so it is born In Progress. A job booked for a future day is born Not Started and waits.

This rule never writes Completed. Only your tap does that. Use the job page. You can also use the card on Today. A job rained off therefore stays open rather than looking done.

## What it does not do

- It does not mark a job complete from the diary. The date can say work has begun. Only your press on Finish job says it is done. The same is true for Did you finish on Today.
- It does not book a day for a quote that has not been approved. A pending or declined quote is paperwork, not work, so it does not draw a busy dot.
- It does not invent a day for a job with no date. That job is in no window, has no dot and is not moved by the start rule.
- It does not colour a job as done because its invoice is paid. Paid is a billing fact. Completed is your word about the work.
- It does not send a customer a reminder from the diary. The diary shows when the work is. The share sheet sends the message you write.

## Questions

### How do I set a day for a job?

Open the job and edit it. Pick the date on the calendar. The time of day is set first. You choose Morning or Afternoon or Full day. For a job over several days pick the first and the last. The address is the customer's by default. A job override is there if the work is elsewhere.

### What does the yellow dot mean?

It means real work is booked on that day. A future approved job, an invoiced job or a direct job with no quote all count. A draft or sent quote alone does not.

### My job runs Monday to Wednesday. When will it look done?

When you say so. It reads In Progress from Monday. It stays there after Wednesday until you press Finish job on its page, or tap Did you finish on Today the next morning. The diary does ask that question only after Wednesday.

### Why does a job I just booked already read In Progress?

Because its start date is today or earlier. A job booked for today or for a day that has already gone is already under way, so it reads as such. A job for next week reads Not Started until that week.

### What if a job has no date yet?

It is still a job, but it books no day. It has no dot, it is in no week or month total, and it will not be asked about by the finish card. Put a date on it when you have one.

### Can I see which jobs are in this week?

Yes. The Jobs page has a calendar card that shows the week or month it is on, the busy marks, and the list of jobs whose span falls in that window. The spend, paid and profit strip above it uses the same window.

## Related

- [Jobs](/features/jobs.html): the work that the diary shows.
- [Timesheets](/features/timesheets.html): hours worked on a job where the work is by the hour.
- [The customer's own page](/features/customer-page.html): the link the customer opens with their approval and sign-off.
- [Every part of the app](/features.html): the other pages.

<a class="btn btn--lg btn--solid" href="/#early-access">Join the list</a>

The app is not in the shops yet. Join the list and we will tell you the day it opens.
