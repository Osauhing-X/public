# Workspace modules: what to use and why

![Extaas Workspace modules form one connected workflow](cover.png)

A module is a tool for a specific workflow. An integration connects it to an external service that provides database, email, payment or AI capabilities. You do not need every module at once: the best setup starts with one clear customer journey and grows with real demand.

<div class="grid gap _3" style="grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); margin-block: 1.5rem;">
  <div class="css _radius _padding">
    <span class="css _color">START HERE</span>
    <h3>One customer journey</h3>
    <p>Choose one outcome the customer must be able to achieve in the portal.</p>
  </div>
  <div class="css _radius _padding">
    <span class="css _color">BUILD SAFELY</span>
    <h3>Correct dependencies</h3>
    <p>Connect only the data, email or payment service required by the module.</p>
  </div>
  <div class="css _radius _padding">
    <span class="css _color">PUBLISH</span>
    <h3>Tested end to end</h3>
    <p>The public view, Workspace, notification and log must work as one flow.</p>
  </div>
</div>

## Quick selection by need

| If you want to… | Use | Why it helps | Required foundation |
| --- | --- | --- | --- |
| publish company information and campaign pages | **Pages** | content can change without rebuilding the application | Supabase |
| share instructions only with the team | **Private Pages** | processes and internal notes stay behind authentication | Supabase |
| collect general enquiries | **Contact Form** | structured requests do not disappear into a personal inbox | Supabase; Resend for notifications |
| build questionnaires or feedback surveys | **Forms & Surveys** | each use case can request exactly the fields it needs | Supabase |
| keep customer relationships in one place | **Customers / CRM** | contact details, history and follow-up stay attached to one record | Supabase |
| collect time-based service requests | **Booking** | service, location, requested time and confirmation form one flow | Supabase; Resend for email |
| offer items or resources for rent | **Rent** | availability, period, quantity, handover and approval stay together | Supabase; Resend for email |
| sell products from a Stripe catalogue | **Store** | active products and prices come from Stripe and customers use a cart | Supabase + Stripe |
| manage contacts and segments | **Audience** | contacts, tags and unsubscribes are separated from campaigns | Resend; Supabase for persistent data |
| send designed email | **Email** | templates, components, attachments, preview and delivery live together | Supabase + Resend; OpenAI for AI |
| see activities on a timeline | **Calendar** | bookings, rentals and reminders share one view | Supabase |
| organise internal team work | **Kanban** | boards, cards, assignees and dates make progress visible | Supabase |

## Public, private or hybrid?

- **Public modules** provide content or a form on the tenant domain: Pages, Contact Form, Forms & Surveys, Booking, Rent and Store.
- **Private modules** are owner or team tools: Private Pages, CRM, Calendar, Kanban and logs.
- **Hybrid modules** begin publicly and continue in Workspace. A customer may submit a booking request publicly, the team reviews it in Workspace, and the customer receives a limited status or confirmation by email.

A public form does not mean a public database. The browser may submit only allowed fields; customer lists, internal notes and other customers' requests remain private.

## Key modules in more detail

### Pages and Private Pages

Use Pages when marketing or service content changes more often than application code. Publish only finished records, use clear URLs and test mobile layouts. Private Pages is for procedures, internal instructions and restricted resources. It is not a secret store: API keys belong in integration settings, never in an HTML page.

### Contact Form, Forms & Surveys and CRM

Contact Form fits a general enquiry journey. Forms & Surveys fits cases where questions, validation or response structure vary by campaign or service. CRM gives the team a persistent customer view after submission.

Request only data needed for a decision. Every form should have a purpose, owner, response target, privacy notice and spam protection. Do not collect health, payment or identity-document data through a normal contact form.

### Booking

Booking fits services where time, location and approval matter: consultations, maintenance, meetings or appointments. Define services and locations before publishing. Add only custom fields that help assess suitability.

Submission need not equal automatic confirmation. A safer flow is: customer requests → team checks availability → approves or cancels → customer receives next steps. This prevents double-booking and lets the team review exceptions.

### Rent

Rent is for items, equipment, rooms or other limited resources. Describe quantity, period, price, pickup, return and condition. Up to 20 clear images can reduce repetitive questions.

Contact details may stay hidden until approval. Private confirmation information can carry a payment link, handover instructions or a contract note. Internal notes must never leak into customer email.

### Store

Store displays active one-time Stripe products and prices. Use it when Stripe should be the source of truth for the catalogue and payment. Add privacy, sales and terms-of-use links and test success/cancel paths before publishing.

Store does not replace fulfilment, inventory or returns unless those processes are separately implemented. Tell the customer clearly what happens after payment and who fulfils the order.

### Audience and Email

Audience holds delivery targets; Email composes and sends the message. Keep consent source, signup time and unsubscribe state. Do not import lists without provable marketing consent. Transactional email and marketing campaigns have different purposes and often different unsubscribe rules.

Email assets are templates, components and attachments. A template supplies the complete layout, a component a reusable block and an attachment a file. Always use preview and a test message before real delivery.

### Calendar and Kanban

Calendar groups time-based events; Kanban groups work state. Calendar answers “when?”, Kanban answers “what stage and who owns it?”. Use both when work has a deadline and multiple stages.

## Recommended rollout

1. Describe the customer outcome in one sentence.
2. Select one primary module that delivers it.
3. Connect only the integrations required by that module.
4. Create the minimum public content, form or catalogue.
5. Assign an owner, editors and a response target.
6. Test as an anonymous customer and an authenticated operator.
7. Check email, logs, mobile layout and failure messages.
8. Add another module only after the first flow works end to end.

## Common mismatches

- **Contact Form instead of Booking:** appropriate only when time, service and status do not need structured management.
- **Rent instead of Store:** Rent collects period requests and requires approval; Store sells a fixed Stripe product.
- **Pages instead of Private Pages:** public Pages is not suitable for internal processes or private customer data.
- **Calendar instead of Kanban:** a calendar poorly represents multi-stage work; Kanban does not replace an exact schedule.
- **OpenAI instead of Resend:** OpenAI drafts content, Resend delivers email. They solve different problems.

## Readiness checklist

- The module purpose and owner are known.
- Required integrations report a ready state.
- Permissions are tested as owner, assigned user and public visitor.
- Private fields do not appear in public responses, URLs or email.
- The customer knows whether this is a request, confirmation or completed purchase.
- Failure creates a log and gives the user a next step.
- The paid value event and possible credit cost are clear before action.

## Related guides

- [Getting started](/en/docs/getting-started)
- [Workspace portal](/en/docs/workspace-portal)
- [Choosing integrations](/en/docs/integrations-guide)
- [Customer workflows](/en/docs/customer-workflows)
