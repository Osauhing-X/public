# Booking and Rent: from request to completion

Booking and Rent turn a free-text customer message into a manageable workflow. Booking focuses on a service and time; Rent on a resource, quantity and period. In both flows, the first customer action is normally a request, not automatic final confirmation.

<div class="grid gap _3" style="grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); margin-block: 1.5rem;">
  <div class="css _radius _padding"><span class="css _color">BOOKING</span><h3>Who, what and when?</h3><p>Service, location, requested time, customer details and team approval.</p></div>
  <div class="css _radius _padding"><span class="css _color">RENT</span><h3>What, how many and for how long?</h3><p>Resource, quantity, rental period, handover, return and availability.</p></div>
</div>

## Which module should you choose?

Use Booking when the primary question is service time: a meeting, consultation, maintenance visit or staff time slot. Use Rent when the same limited resource is handed to a customer for a period: an item, device, vehicle, room or digital resource.

If the customer buys a fixed product immediately and no period approval is required, Store is a better fit. If only a general quote request is needed, Contact Form may be sufficient.

## Configuring Booking

### Service

Describe the customer outcome, not just an internal service code. Add duration or effort expectation, preparation, price or pricing principle and limitations. If price depends on review, say “price is confirmed after request review” instead of an ambiguous “from”.

### Location

A location can be physical, online or hybrid. Provide address and arrival instructions for physical locations; for online service, do not publish a permanent private meeting link before approval.

### Customer form

Alongside system fields, add only questions required for a decision. Vehicle maintenance may require registration number and issue description; a consultation may require topic and goal. Do not request information the provider will not use.

### Notifications

Assign one or more addresses for new-request notifications. Keep notification email short and route the operator to Workspace where access and full context are controlled. The customer acknowledgement must not imply the time is already guaranteed.

## Configuring Rent

### Listing

A good listing includes title, condition, quantity, price, pricing period, usage limitations and clear images. Workspace supports up to 20 images per rental item. The first image should provide a clear overall view.

### Available quantity

Quantity is a real constraint, not a marketing number. Approval must consider overlapping periods, maintenance, transport and existing confirmed reservations. Without automatic availability calculation, the operator must check a calendar or register before approval.

### Pickup and return

Create reusable locations: warehouse, office, delivery, online handover or other. Public information may describe the general area; exact private instructions can go in confirmation details. State the return deadline, condition check and late-return contact.

### Price and payment

An empty or zero price may mean no public price badge or a free service. When a price exists, explain the unit: occurrence, day, week or full period. Approving a rental request is not proof of payment; a payment link and payment state require a separately verified flow.

## Shared state model

| State | Meaning | Next action |
| --- | --- | --- |
| New / pending | customer submitted a request | check completeness and availability |
| Needs information | something is missing for a decision | request specific information |
| Approved | time or resource is reserved | send final instructions and payment step if needed |
| Active | service or rental has started | monitor agreement and exceptions |
| Completed | service delivered or item returned | record outcome and release resource |
| Cancelled / declined | activity will not happen | notify customer and release time or quantity |

Not every state needs a separate UI value, but meaning must be unambiguous. Do not use the same state for both “waiting for team” and “waiting for customer”.

## Approval check

Before approval, verify:

- correct tenant and service/item;
- customer name and working contact;
- dates, time, timezone and duration;
- location or handover method;
- available staff, room, quantity or item;
- price, tax handling and next payment step;
- confirmation variables and private extra information;
- credit cost and duplicate-click protection.

## Changes and cancellation

A customer-action link must be scoped to the correct request and allowed operation. Do not expose a predictable sequential ID without additional protection. An expiring or single-use token reduces abuse risk.

A material change—time, period, price, location or item—requires renewed customer approval or at least explicit notification. Cancellation must release availability and log actor, time and reason. Do not delete the record merely to remove it from a list.

## Customer email content

**Acknowledgement:** request reference, submitted core details, expected response time and contact.

**Confirmation:** final time/period, location/handover, price or payment instructions, change/cancellation route and support contact.

**Decline or cancellation:** clear state, appropriate reason, refund or next step and an alternative when it can be offered honestly.

## Daily queue

1. Review the oldest pending requests first.
2. Identify overdue and unassigned activities.
3. Check overlapping availability before approval.
4. Inspect email delivery result, not only the button click.
5. Mark started and completed activities at the correct time.
6. Update rental quantity or condition after return.
7. Resolve failed/error logs before promoting new public requests.

## Measuring success

Useful measures include request volume, approval rate, first-response time, cancellation reasons, utilisation, no-shows, late returns and email bounces. Interpret metrics in context: a low approval rate may indicate the wrong audience, unclear availability or an incomplete form.

## Related guides

- [Module selection](/en/docs/modules-overview)
- [Customer workflows](/en/docs/customer-workflows)
- [Resend](/en/docs/resend)
- [Supabase](/en/docs/supabase)

