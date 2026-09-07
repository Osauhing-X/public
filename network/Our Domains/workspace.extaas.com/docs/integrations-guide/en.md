# Integrations: what do they do and why are they needed?

An integration is more than a settings form. It gives a Workspace module a capability Extaas does not need to rebuild from scratch. Each service does what it specialises in: Supabase stores data and controls access, Resend delivers email, Stripe processes payments and OpenAI helps draft content.

## One-line decision guide

- If a module must **remember something persistently**, it needs Supabase.
- If the system must **deliver something by email**, it needs Resend.
- If a customer must **pay by card or use a cart**, it needs Stripe.
- If a user wants to **generate a text or template draft**, it needs OpenAI.

These services do not replace one another. Booking can operate with Supabase and no Resend, but automatic confirmation cannot be delivered by email. Email needs Resend for delivery and Supabase for assets. Store needs both database context and Stripe as the payment source.

<div class="grid gap _2" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); margin-block: 1.5rem;">
  <div class="css _radius _padding"><span class="css _color _dark">SUPABASE</span><h3>Remembers</h3><p>Data, files, users and tenant boundaries.</p></div>
  <div class="css _radius _padding"><span class="css _color _dark">RESEND</span><h3>Delivers</h3><p>Email, sending domain and delivery result.</p></div>
  <div class="css _radius _padding"><span class="css _color _dark">STRIPE</span><h3>Confirms payment</h3><p>Products, Checkout and signed events.</p></div>
  <div class="css _radius _padding"><span class="css _color _dark">OPENAI</span><h3>Drafts</h3><p>Copy and templates for final human review.</p></div>
</div>

## Responsibility matrix

| Integration | Primary role | Modules that benefit | What it does not do |
| --- | --- | --- | --- |
| **Supabase** | database, auth, storage and tenant isolation | Pages, forms, CRM, Booking, Rent, Email assets, Calendar, Kanban, Private Pages, logs | does not itself deliver customer email or process card payments |
| **Resend** | sending domain, email delivery and results | Email, Audience, Booking, Rent, form notifications | is not a CRM or primary persistent database |
| **Stripe** | product catalogue, Checkout, payment result and webhooks | Store, credit purchases and paid flows | cannot confirm payment from a browser success page alone |
| **OpenAI** | text and email-template drafts | Email and staff content creation | does not send email, verify facts or decide access |

## Why these services?

Workspace uses external services with clear responsibility boundaries. This reduces the need to build authentication, email infrastructure, card-data processing and model hosting. Their value is not only feature count, but server-side APIs, event logging and the ability to keep secrets away from the browser.

No service is risk-free or permanently available. The owner remains responsible for the account, limits, domain verification, processing terms and key lifecycle. Extaas should show a clear setup/error state on failure and must not pretend an action succeeded.

## Recommended combinations

| Use case | Minimum combination | Fuller combination |
| --- | --- | --- |
| Public content pages | Supabase | Supabase + Resend for contact forms |
| Booking or Rent | Supabase | Supabase + Resend for confirmations |
| Newsletter | Resend + consented contact source | Supabase + Resend + OpenAI for drafts |
| Email composer | Supabase + Resend | Supabase + Resend + OpenAI |
| Online store | Supabase + Stripe | Supabase + Stripe + Resend for order email |
| Internal Kanban | Supabase | Supabase; no sending or payment service needed |

## Secret and permission boundary

API keys are entered in the owner integration view and used on the server. Never put them in Pages/Private Pages HTML, client JavaScript, URLs, prompts, log messages or support screenshots.

Use separate test and production keys where available. Give each key minimal permissions, rotate it after exposure or staff departure, and remove the old key only after testing the replacement. An OpenAI key must not grant Supabase access; a Stripe webhook secret is not a Stripe API key; a Supabase anon key is not a service-role key.

## Setup order

1. Choose the use case and inspect module dependencies.
2. Create the external account and project under the correct company ownership.
3. Configure the domain, sender, webhook or data space in that service.
4. Add the key only to the matching Workspace integration field.
5. Save and run the integration test.
6. Create the module data space if the UI offers it.
7. Perform one safe test action and inspect logs in both systems.
8. Only then publish the customer-facing flow.

## Finding the failing layer

| Symptom | Likely place to check |
| --- | --- |
| Module asks for setup | required key or Supabase data space is missing |
| Data is not saved | Supabase connection, schema, permissions or tenant context |
| Email does not arrive | Resend sending domain, recipient, suppression/bounce and delivery log |
| Checkout opens but status does not update | Stripe webhook, secret, metadata and event log |
| AI panel is absent | OpenAI is disabled or Email is not ready |
| AI output is poor | prompt, context, model and human review; not the delivery integration |

## Disabling an integration

Identify dependent modules before removing a key. Hide or pause public actions that would otherwise enter an incomplete flow. Export required logs, finish outstanding payments or deliveries, remove the key from Workspace and revoke it in the provider dashboard. Data deletion is a separate decision governed by retention and contractual obligations.

## Related guides

- [Supabase](/en/docs/supabase)
- [Resend](/en/docs/resend)
- [Stripe](/en/docs/stripe)
- [OpenAI](/en/docs/openai)
- [Module selection](/en/docs/modules-overview)
