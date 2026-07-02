# Getting started with Workspace

Extaas has three surfaces that work together:

- `extaas.com` is the public main domain for company information, documentation, blog, legal documents and payment entry screens.
- `workspace.extaas.com` is the private workspace for accounts, projects, invoices, tenant portals, modules and integrations.
- A tenant domain is the customer's public portal. It can show a landing page, Pages content, Booking, Rent, Store or other enabled modules.

<div class="grid gap _3" style="grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); margin-block: 1.5rem;">
  <div class="css _radius _padding">
    <h3>1. Create access</h3>
    <p>Sign in through workspace.extaas.com. This is where account data, projects, invoices and tenant settings live.</p>
  </div>
  <div class="css _radius _padding">
    <h3>2. Connect the domain</h3>
    <p>The tenant host must point to the portal app and the same host must exist in the workspace DNS route record.</p>
  </div>
  <div class="css _radius _padding">
    <h3>3. Enable modules</h3>
    <p>Turn on only the tools the business actually needs: Pages, Audience, Email, Booking, Rent, Store or Calendar.</p>
  </div>
</div>

## Portal ownership

Keep ownership boundaries simple:

- Public visitors use `extaas.com` and tenant domains.
- Portal owners use `workspace.extaas.com`.
- Staff uses the internal workspace/admin surface.
- Account, invoice rows, project content and private customer data must not be rendered on the public main domain.

This separation keeps prerendered SEO pages clean, keeps sensitive account data out of public routes and makes the tenant portal easier to reason about.

## First setup checklist

Before publishing a tenant portal, check:

1. The workspace owner can sign in.
2. The correct tenant domain exists in the workspace DNS route data.
3. The required modules are enabled.
4. Required integrations are configured server-side.
5. Public pages do not expose private workspace data.
6. Customer action emails use links that match the tenant domain.
7. Credits or payment rules are understood before enabling paid actions.

## Important keys and settings

Most settings belong in Workspace, not on the public site.

| Area | Where it belongs | Notes |
| --- | --- | --- |
| Supabase URL and service role | Server/workspace integration | Never expose service role keys to the browser. |
| Resend API key | Server/workspace integration | Used for campaigns and module notifications. |
| Stripe secret/webhook keys | Server/workspace integration | Public pages may start payment, but details stay in Workspace. |
| Tenant DNS host | Workspace DNS route | Must match the host used by the customer domain. |
| Module enable flags | Tenant workspace settings | Public UI should hide disabled modules. |
| Public page media | Pages module storage | Public media can be shown; private records cannot. |

## Recommended launch flow

1. Create or confirm the workspace record.
2. Add the owner user and confirm their access.
3. Add the tenant DNS route.
4. Configure Supabase if the portal uses private module data.
5. Configure Resend if any module sends email.
6. Configure Stripe if credits, invoices or checkout flows are used.
7. Enable modules one by one.
8. Open the tenant domain in a logged-out browser session and check the public view.
9. Open Workspace and check project, invoice and module management views.

## Templates and examples

Use these as starting points for customer-facing setup notes.

```text
Portal owner checklist
- Workspace access email:
- Tenant domain:
- Enabled modules:
- Required sender email:
- Stripe payment mode:
- Public pages ready:
- Test booking/rent/store action completed:
```

```text
DNS note for customer
Point the selected domain or subdomain to the tenant portal deployment.
After DNS is live, send us the final host so we can connect it to the workspace.
```

## Common questions

### Can a customer pay from extaas.com?

Yes, if the invoice is unpaid. The public page may show the amount and payment action, but not the purchased content or invoice rows. After payment, the same invoice should no longer be accessible from `extaas.com`.

### Where does the customer see project details?

Project details belong in `workspace.extaas.com`. If a project is connected to a company or tenant, the tenant workspace can also show the relevant project view.

### Why does the tenant domain not show a module?

Usually one of three things is missing: the module is disabled, required integration settings are incomplete, or the tenant DNS route does not resolve to the correct workspace.

### What should be free?

Setup, editing and configuration should stay free where possible. Credits or payment should be used when a real value event happens: an email is delivered, a booking is completed, a rental is confirmed or a store checkout succeeds.
