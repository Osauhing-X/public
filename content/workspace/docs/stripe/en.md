# Stripe and Store in Workspace v2

Workspace's Store module is a customer's installed commerce tool. It is separate from the Extaas product shop and OUX Self-service account billing.

## Setup

Install the matching Stripe integration and assign STRIPE_SECRET_KEY. Prefer a restricted key granting only the actions you need. Add write permissions only if product/price management is required. Use a separate sandbox before live transactions.

The package supports scoped catalogue, product/price management, hosted payment links, sales, refunds and subscription controls. Availability depends on the installed version, assigned permissions and compatible Store instance.

## Products and metadata

Store-owned products use workspace_store metadata for isolation. Do not edit reserved workspace_ keys manually. User-defined product metadata can supply public parameters where the consuming renderer supports it; never place private customer content in metadata.

Changing a displayed price is not the same as changing an existing Stripe Price. Create or archive prices using the appropriate action.

## Management views and public storefront design

Store 0.1.6 separates products, orders, invoices, subscriptions, refunds, disputes and storefront design into individual views. Counts represent this Store's synchronized records, not the entire Stripe account. Catalogue, sales and refund/dispute refreshes are separate read operations. An empty or stale local list is not proof that the provider has no records.

Store 0.1.7 lets you independently edit product-card, subscription-card and product-details popover text and layout. Use arrow buttons to reorder fields, hide optional description/price text and choose alignment and spacing. Titles remain visible. Colours and corner radius are shared. The preview uses sample data, creates no Checkout and does not automatically publish changes.

Supported values are `[data:title]`, `[data:description]` and `[data:price]`; `{{data:title}}`-style tokens also work. Values render as escaped text, never executable HTML or scripts. Customer, payment and order data are not design tokens. The saved design appears through `[import:store]` on the connected Website's Routes page only when the catalogue and corresponding products are published.

Availability depends on the **installed** version; refreshing the catalogue does not automatically update the module. Design edits do not change Stripe products, charged amounts or existing subscriptions. This is a validated component editor, not an arbitrary HTML/CSS or whole-page builder. Refund/dispute lists cover records linked to this Store's Checkout payments, not account-wide financial reporting. Partial refunds, dispute evidence submission, inventory and shipment fulfilment are not represented as completed capabilities by this guide.

## Payment verification

Configure STRIPE_WEBHOOK_SECRET for the Website endpoint `/@_store_webhooks/{store-instance-id}` before relying on automatic sales reconciliation. Verify signatures and process events idempotently. A success-page visit is not proof of payment; asynchronous payments may settle later.

Test an actual sandbox checkout, cancellation, a signed event, duplicate delivery and a refund before live use. Refund and subscription changes are consequential financial actions.

The integration form's optional webhook field is not permission to omit payment verification from a production workflow.

[Stripe keys](https://docs.stripe.com/keys), [webhooks](https://docs.stripe.com/webhooks) and [sandboxes](https://docs.stripe.com/sandboxes) provide current provider guidance.
