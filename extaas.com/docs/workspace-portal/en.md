# Workspace Portal Documentation

Operational documentation for workspace.extaas.com customers and staff. The workspace portal keeps public pages, audience, email, booking, rent, store, calendar and credits in one place while tenant DNS pages remain customer-facing.

<h2 id="overview">Overview</h2>

Extaas Workspace is the business portal for tenant modules, integrations and operational work. Customers should use workspace.extaas.com for account data, project content, invoices and private module settings.

<h2 id="dns">DNS and Domains</h2>

Point the customer domain or subdomain to the deployed tenant application. The same host must exist in the platform workspace record so the app can resolve the correct tenant workspace.

<h2 id="supabase">Supabase</h2>

Supabase stores module settings, private bookings, rental requests, public pages media, calendar reminders and logs. Service role credentials stay server-side.

<h2 id="resend">Resend</h2>

Resend powers campaigns, customer status emails and module notifications. Configure API key, sender name and sender email before using booking or rent email flows.

<h2 id="stripe">Stripe</h2>

Stripe handles paid checkout flows and must stay synchronized with payment status. Workspace staff can reconcile payment state from the workspace side; public extaas.com payment links should only show the amount due and sign-in guidance.

<h2 id="modules">Modules</h2>

Pages controls public identity and content. Audience manages contacts. Email sends messages. Booking handles sessions. Rent handles listings. Store handles checkout. Calendar shows active operations.

<h2 id="customer-actions">Customer Actions</h2>

Confirmation and status emails include self-service links where customers can cancel bookings, cancel rent requests or unsubscribe from audience emails.

<h2 id="security">Security Notes</h2>

Keep Supabase service role keys, Stripe secrets and Resend API keys server-side. Public pages must only expose enabled customer-facing settings and media.

<h2 id="credit-usage">Credit Usage</h2>

Credits are charged only for meaningful value events. Setup and content editing stay free.

<h3 id="credit-usage-email">Email</h3>

Email sending uses 1 credit per delivered recipient. Editing templates, components, attachments, payload data and audience membership is free.

<h3 id="credit-usage-booking">Booking</h3>

Booking reserves credits when a request is accepted. Completed bookings capture credits by rounded booking hours when start and end are known. If the end time is missing, 1 credit is captured. Canceled bookings release reserved credits.

<h3 id="credit-usage-rent">Rent</h3>

Rent reserves credits when a request is approved. The amount follows the requested rental period. Successful completion captures the reserved credits. Canceled or declined requests do not capture credits.

<h3 id="credit-usage-store">Store</h3>

Store captures 1 credit per purchased cart item after a successful Stripe payment. Browsing products, editing Stripe settings and changing product card design does not use credits.

<h3 id="credit-usage-pages">Public pages</h3>

Public pages use daily credits for each enabled public page because they keep customer-facing content available on the landing site. Creating, editing, disabling pages and redirects is free.

<h3 id="credit-usage-workspace">Workspace access</h3>

Each active workspace uses 1 credit per day. If credits reach zero, paid public actions pause until credits are added again.

<h2 id="compliance">Compliance Readiness</h2>

The portal is built with GDPR-aware data minimisation, server-side secret handling, audit-friendly logs, WCAG-oriented contrast checks and least-privilege access flows. ISO 27001, SOC 2 Type II and HIPAA require organisational policies, vendor contracts, risk registers and external audits before they can be claimed.
