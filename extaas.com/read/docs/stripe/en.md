# Stripe billing

Stripe manages workspace credit purchases, paid checkout flows and future staff terminal payments. Payment state must stay synchronized with Workspace so invoices, credits and customer access match the real payment result.

## Payment boundary

Public `extaas.com` may show a payment entry screen, but not the details of what was purchased. If an invoice is unpaid, payment can be started. Once it is paid, the same invoice must no longer be accessible from the main domain.

Workspace shows the private details:

- invoice rows;
- project links;
- purchased content;
- customer/company relationship;
- receipts and internal payment notes.

## Required Stripe settings

- Secret key on the server.
- Webhook secret on the server.
- Price/product references when needed.
- Success and cancel URLs.
- Metadata that links Stripe events back to workspace invoices, credits or tenant actions.

Use metadata carefully. It should identify internal records, but not expose private content to the public page.

## Checkout flow

Recommended flow:

1. Workspace or public payment entry creates a checkout session.
2. Stripe redirects the customer to payment.
3. Webhook confirms the payment result.
4. Workspace updates invoice/credit state.
5. Public payment link becomes unavailable after payment.
6. Customer sees private details only in Workspace.

## Maksekeskus/free payment rule

If a flow can be started without Stripe, Workspace still needs a synchronized payment state. A free or Maksekeskus-based completion should update the same invoice/payment model so staff and customers see one truth.

## Terminal future

The staff workspace may include a `Terminal` button on an invoice. That button belongs to the internal workspace/admin flow. It should start a Stripe Terminal payment for the selected invoice and update the invoice after the terminal result is confirmed.

## Credit rules

Stripe can add credits after successful payment. Module usage consumes credits later.

Example:

```text
Stripe checkout paid
-> add workspace credits
-> write payment log
-> mark invoice paid
-> hide public payment entry
```

## FAQ

### Should public payment pages show invoice rows?

No. Show amount, status and a sign-in message. Details belong in Workspace.

### What if webhook processing fails?

Keep the payment event in logs and provide a staff reconciliation path. Avoid giving access to paid content until Workspace state is confirmed.

### Can tenant portals show projects?

They may show projects connected to that tenant/company, but private details should still come from Workspace access rules.
