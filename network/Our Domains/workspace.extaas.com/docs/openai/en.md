# OpenAI integration

The OpenAI integration helps create email copy, templates, reusable components and operational drafts. The API key must stay server-side and should never be exposed to the browser.

## Why and when should it be used?

OpenAI reduces blank-page time, helps maintain a repeatable tone and can create a first email or template version from structured instructions. It is useful when a person reviews the output and the content need recurs.

The integration is unnecessary for fixed system messages that already have a correct template. It must not make payment, access or approval decisions. Model output may be inaccurate, so facts, prices, dates, legal language and customer promises require human review.

## Where it is useful

The main use case is the Email module:

- campaign copy;
- transactional email bodies;
- HTML email templates;
- reusable content blocks;
- subject lines;
- short summaries of module events;
- first drafts for support replies.

It can also help staff prepare documentation snippets, FAQ answers and customer-facing setup notes.

## Security rules

Do not send:

- API keys;
- Supabase service role keys;
- Stripe secrets;
- full customer datasets;
- card/payment details;
- private invoice rows unless the user has access and the data is needed.

Send only the context required for the specific generation task.

## Good prompt template

```text
Language:
Tone:
Audience:
Goal:
Required details:
Forbidden details:
Length:
Call to action:
```

Example:

```text
Language: Estonian
Tone: friendly and professional
Audience: booking customer
Goal: confirm that the booking request was accepted
Required details: date, time, cancellation link
Forbidden details: internal workspace notes
Length: under 120 words
Call to action: "View booking status"
```

## Template output rules

When generating HTML email templates:

- keep layout responsive;
- use inline-safe structure;
- include clear CTA text;
- do not include secrets;
- keep fallback text readable;
- keep dynamic fields explicit.

## FAQ

### Can tenants use AI directly?

Yes, if the feature is scoped and rate-limited. Tenant prompts should operate on allowed tenant data only.

### Can AI send emails automatically?

No. It should draft or prepare content. Sending should remain an explicit module action with preview/logging.

### What if generated content is wrong?

Treat AI output as a draft. The user or staff should review it before it reaches customers.
