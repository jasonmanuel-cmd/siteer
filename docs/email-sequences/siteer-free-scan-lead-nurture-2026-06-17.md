# SiteER Free Scan Lead Nurture Sequence

Goal: convert free-scan leads into either the `$20` Quick ER Audit or the implementation quote path.

Audience: owners who ran a free scan, unlocked the report by email, and have not yet purchased the Quick ER Audit or submitted an implementation quote.

Primary conversion events:
- Purchased the Quick ER Audit
- Submitted the implementation quote form

Exit conditions:
- Exit the sequence immediately if the lead buys the Quick ER Audit
- Exit the sequence immediately if the lead submits the implementation quote
- Suppress if the lead replies manually and is already in a direct sales conversation

## Sequence Overview

| # | Timing | Purpose | Primary CTA |
|---|---|---|---|
| 1 | Immediately after report unlock | Deliver the report and frame the next best step | Reopen your report |
| 2 | 1 day later | Translate the score into business urgency | Unlock the Quick ER Audit |
| 3 | 3 days later | Build trust with proof and repair logic | See implementation options |
| 4 | 6 days later | Create a decisive fork: audit or implementation | Pick your next move |

## Email 1

Subject options:
- Your SiteER report is ready
- Your website ER chart is inside
- You unlocked the report. Here is the next move.

Preview text:
Your grade, money leak, and next path are ready to review.

Purpose:
Deliver the report and tell the lead how to use it.

Body:

Hi {{first_name | default: "there"}},

Your SiteER report is ready.

You can reopen it here:
{{report_url}}

Inside the report you will see three things right away:
- your overall website grade
- the estimated monthly money leak
- the top symptoms hurting speed, mobile, SEO, or trust

Start with one question: is this a cosmetic issue, or is the site quietly costing you real business every month?

If the numbers look mild, hand the report to your developer and use it as a ranked fix list.

If the numbers look ugly, you have two clean next steps:
- unlock the **$20 Quick ER Audit** if you want a human to rank the fastest moves
- request the **ER Fix Pack** if you want the work handled for you

Primary CTA:
Reopen your report

Secondary CTA:
See pricing

## Email 2

Subject options:
- What your website grade actually means
- A bad grade is not the problem. The leak is.
- If the report made you nervous, read this

Preview text:
The score only matters if it points to lost calls, forms, and trust.

Purpose:
Tie the report to lost revenue and position the Quick ER Audit.

Body:

Hi {{first_name | default: "there"}},

Most owners do not need another website opinion. They need to know whether the site is hurting revenue enough to justify action.

That is why SiteER shows the grade **and** the money leak estimate.

The grade creates urgency.
The leak estimate creates clarity.

If your report shows real damage and you want a human to tell you what gets fixed first, the fastest paid step is the **$20 Quick ER Audit**.

That gives you:
- a ranked action order
- plain-English next steps
- trust, copy, and local SEO notes
- a report you can forward without translating technical jargon

If you are not ready to hand off the whole job yet, this is the best next move.

Primary CTA:
Unlock the Quick ER Audit

## Email 3

Subject options:
- What happens after a bad SiteER score
- From diagnosis to repair
- How owners use SiteER to get the site fixed

Preview text:
The right next step depends on whether you want advice or execution.

Purpose:
Build trust and explain the implementation path.

Body:

Hi {{first_name | default: "there"}},

When a SiteER report comes back ugly, most owners choose one of two paths.

**Path 1: Quick ER Audit**
Best if you want a human to rank the next three moves before spending more.

**Path 2: ER Fix Pack**
Best if you already know you do not want to manage the cleanup yourself.

The implementation path is built for owners who want:
- the highest-impact fixes done for them
- a clean handoff into scope and scheduling
- a follow-up re-scan to prove the improvement

This is not a vague “we can help” offer. It is a direct path from diagnosis to measured repair.

If you already know the site needs work, skip the debate and go straight to the quote page.

Primary CTA:
See implementation options

## Email 4

Subject options:
- Two clean next moves from here
- If you are still deciding, do this
- Audit or implementation? Here is the simple answer.

Preview text:
Choose the lower-risk clarity step or reserve the repair path.

Purpose:
Force a simple decision and close the sequence.

Body:

Hi {{first_name | default: "there"}},

If you are still sitting on the SiteER report, keep the decision simple.

Choose the **$20 Quick ER Audit** if:
- you want human next steps
- you need a ranked list before paying for implementation
- you want a lower-risk decision first

Choose the **ER Fix Pack** if:
- the report already made the case
- you want the work handled for you
- you care more about getting it fixed than managing the process

Either way, the report already did its job: it showed whether the website is a mild annoyance or a real business leak.

If you want to talk to a real person before deciding, reply to this email and Jason will point you in the right direction.

Primary CTA:
Pick your next move

Secondary CTA:
Reply for help

## Flow Notes

```text
[Free scan + report unlock]
    -> Email 1 immediately
    -> Email 2 after 1 day if no purchase and no quote
    -> Email 3 after 3 more days if no purchase and no quote
    -> Email 4 after 3 more days if no purchase and no quote
    -> exit on Quick ER Audit purchase
    -> exit on implementation quote submission
```

## Suggested A/B Tests

1. Email 2 subject line
- Variant A: `What your website grade actually means`
- Variant B: `A bad grade is not the problem. The leak is.`

2. Email 3 CTA framing
- Variant A: `See implementation options`
- Variant B: `Get the site fixed for you`

3. Email 4 decision framing
- Variant A: `Pick your next move`
- Variant B: `Choose audit or implementation`

## Benchmark Targets

- Email 1 open rate: `45%+`
- Email 2 open rate: `30%+`
- Email 3 CTR: `4%+`
- Sequence conversion to paid audit: `3% to 8%`
- Sequence conversion to quote: `1% to 3%`

## Setup Checklist

1. Trigger the sequence when a lead unlocks the report by email.
2. Pass the report URL and score fields into the email template if available.
3. Exit the lead immediately on Quick ER Audit purchase.
4. Exit the lead immediately on implementation quote submission.
5. Suppress manual leads already in conversation with Jason.
6. Review conversion weekly for the first month.
