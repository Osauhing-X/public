# Customer workflows and daily operations

A good portal is not merely a feature list. At every step the customer should understand what happened, whether the action is final and what to do next. The team should see ownership, state, required follow-up and the technical log.

<div class="css _radius _padding grid gap" style="margin-block: 1.5rem;">
  <div class="flex _wrap _space gap _2"><span class="css _color _dark">GOOD CUSTOMER EXPERIENCE</span><strong>Clarity before speed</strong></div>
  <p>The customer must always see whether they submitted a request, received confirmation or completed payment. Technical success and user-visible success must mean the same thing.</p>
</div>

## Universal customer journey

1. **Discovery:** the customer finds a service, item, product or form on the tenant domain.
2. **Decision:** price, availability, terms, privacy and next step are clear.
3. **Input:** the form requests minimal data and validates errors beside fields.
4. **Confirmation:** the UI clearly says “request received”, “booking confirmed” or “payment succeeded”.
5. **Processing:** Workspace attaches the action to the correct tenant, customer and module.
6. **Notification:** Resend sends the appropriate transactional email when configured.
7. **Follow-up:** the team approves, cancels, fulfils or contacts the customer.
8. **History:** state changes and failures enter logs; the customer sees only permitted information.

## Booking flow

Before publishing, create services, locations, duration/expectation, customer fields, notification recipients and confirmation copy. Tell the public visitor whether they select an available slot or merely request a time.

Typical states are new/pending, approved, completed and cancelled. On approval, verify time, location, owner and contact details. Give a cancellation reason only when suitable for the customer; keep internal notes separate.

Prevent duplicate approval and duplicate credit use from repeated clicks. Repeated action must be idempotent or the UI must remain locked until the first request completes.

## Rental flow

A listing should explain the resource, available quantity, period, price, pickup and return. The customer submits a period request; this is not yet a contract or guaranteed availability.

The team checks period, quantity and condition, approves or declines, then sends private handover or payment information. After return, complete the activity and update public availability.

## Store flow

Store uses active one-time Stripe products. The customer adds products to a cart, starts Checkout and pays at Stripe. The browser success URL is a user experience, not proof of payment: only a verified webhook changes the order or credit state.

Explain delivery, fulfilment time, returns, taxes and support before sale. After payment the team must know who fulfils the order. If a webhook is delayed, show “verifying payment”, not automatically “paid”.

## Form and CRM flow

Every form needs a named owner. After submission, check duplicates, create or link the CRM contact, assign follow-up and follow the retention period. Marketing consent must be optional, distinct and provable; a service enquiry does not automatically grant newsletter consent.

## Email flow

1. Select the correct Audience or transactional recipient.
2. Select a template and inspect dynamic values.
3. Review `to`, `from`, `reply-to`, `cc`, `bcc`, subject and attachments.
4. Check mobile preview, links, plain-text readability and unsubscribe.
5. Send a test to an internal address.
6. Review estimated credit cost.
7. Send and inspect delivered, bounced and rejected results.

OpenAI output is a draft. Verify names, dates, prices, promises and links before delivery.

## Roles and accountability

| Role | Primary responsibility |
| --- | --- |
| Workspace owner | integrations, billing, users, final risk and key lifecycle |
| Module operator | content, requests, states, customer communication and daily quality |
| Staff/admin | platform support, technical investigation and permitted exceptions |
| Public customer | actions only for their own request, payment or limited status |

Do not grant owner access for convenience. An assigned operator should access only the workflows and records needed for their work.

## Daily and weekly checks

**Every workday:** inspect new and overdue requests, failed delivery, pending payments and low credits. Ensure every open action has an owner.

**Every week:** test one primary public flow, review bounce/unsubscribe trends, remove stale content and inspect integration warnings. Review users whose role or employment changed.

**Before a campaign or major sale:** estimate load and volume, verify provider limits, sending domain, Stripe webhook, credits, support capacity and a pause/rollback route.

## Failure principles

- Do not show success before the responsible system confirms it.
- Do not ask the customer to repeat blindly if that can create duplicate payment or approval.
- Preserve correlation ID, time, tenant, module, action type and a safe error code.
- Never log API keys, full payment data or unnecessary personal data.
- Give the user a practical next step and staff the technical detail.
- After repair, replay queued events in a controlled way and notify affected customers.

## Final publication check

- Mobile, keyboard, dark/light theme and slow connection were tested.
- Buttons prevent double clicks and show loading state.
- Customer copy distinguishes request, confirmation and payment.
- An unauthorised user cannot see another customer by changing a URL.
- Email links open on the correct tenant domain.
- Deletion, cancellation and refund rules are documented.
- One test can be traced from beginning to end in logs.

## Related guides

- [Module selection](/en/docs/modules-overview)
- [Integration selection](/en/docs/integrations-guide)
- [Tenant landing page](/en/docs/landing-page)
- [Resend](/en/docs/resend)
- [Stripe](/en/docs/stripe)
