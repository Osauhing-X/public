# Supabase data space

Supabase stores private Workspace and tenant module data: bookings, rental requests, Pages media, audience contacts, logs, user access and module settings. Treat it as the operational database for private portal state.

## Why is Supabase needed?

Without persistent storage, module state would disappear on application restart and there would be no shared source of truth across users, tenants and devices. Supabase provides PostgreSQL, authentication, file storage and server-side access controls in one project. Workspace uses it whenever content, a request, role, log or setting must persist and belong to the correct tenant.

Supabase is not required merely to show static public copy with no management or persistence need. It does not replace Resend email delivery or Stripe payment evidence. Connect it before enabling the first data-driven module, not after collecting real customer data.

## Server-side boundary

The service role key must never reach the browser. Public pages use only safe content selected by the server. Tenant DNS rendering must resolve the tenant first and then expose only public fields for that tenant.

Use the browser client only for flows that are safe with anon/authenticated keys. Use server routes for privileged operations.

## Typical data groups

| Data group | Examples | Public exposure |
| --- | --- | --- |
| Workspace access | users, roles, invites | Never public |
| Tenant settings | DNS route, enabled modules, theme, public flags | Only safe public fields |
| Pages | published pages, media, redirects | Published content only |
| Booking | services, requests, status, customer actions | Public form and limited status |
| Rent | items, requests, approvals | Public listing and limited status |
| Audience | contacts, tags, unsubscribed state | Never expose contact list |
| Logs | module actions, errors, credit events | Workspace/staff only |

## Required checks

Before a tenant portal goes live:

1. Confirm the tenant workspace record exists.
2. Confirm the DNS host maps to the correct tenant.
3. Confirm RLS/server boundaries prevent cross-tenant reads.
4. Confirm public routes do not return private tables.
5. Confirm logs are written for integration failures.
6. Confirm customer action links are scoped and cannot update another tenant.

## Module storage

Booking, Rent, Pages, Audience, Store and Calendar need structured storage. If a module is not configured, the UI should explain what the owner needs to do instead of showing a partial failure.

Recommended module setup state:

```text
status: "not_configured" | "ready" | "error"
missing: ["supabase", "resend", "stripe"]
message: "Connect Resend before sending booking confirmations."
```

## Logs

Workspace logs help track module actions, customer actions and integration errors. Logs do not replace a formal audit policy, but they provide operational visibility.

Log useful events:

- DNS route resolution failure.
- Email send failure.
- Stripe webhook mismatch.
- Credit reserve/capture/refund.
- Customer cancellation action.
- Module setup changed.

Do not log service role keys, API keys, full card data or sensitive payloads.

## `tenant-exec-sql.txt`

The `tenant-exec-sql.txt` helper creates a controlled SQL execution function for service-role-only maintenance operations. It must not be available to public, anon or authenticated browser users.

<object data="https://raw.githubusercontent.com/Osauhing-X/public/www/extaas.com/read/docs/supabase/tenant-exec-sql.txt" type="text/plain" style="width: 100%; min-height: 360px; border: 1px solid color-mix(in oklab, var(--x_heading_color) 14%, transparent); border-radius: 8px; background: var(--x_outer_background);">
  <a href="https://raw.githubusercontent.com/Osauhing-X/public/www/extaas.com/read/docs/supabase/tenant-exec-sql.txt">Open tenant-exec-sql.txt</a>
</object>

```sql
create or replace function public.exec_sql(query text)
returns void
language plpgsql
security definer
as $$
begin
  execute query;
end;
$$;

revoke all on function public.exec_sql(text) from public;
revoke all on function public.exec_sql(text) from anon;
revoke all on function public.exec_sql(text) from authenticated;

grant execute on function public.exec_sql(text) to service_role;
```

Use it only from trusted server-side maintenance code. Prefer explicit migrations for normal schema changes. If this helper exists, document who may call it and why.

## FAQ

### Can public pages query Supabase directly?

Only for explicitly public data with safe keys and strict policies. Most tenant rendering should go through server code so the host can be resolved and data can be filtered.

### What happens when Supabase is not configured?

Modules that require private state should show a setup message in Workspace. Tenant public pages should hide or disable the affected module.

### Where are media files stored?

Pages media can live in Supabase storage or another approved storage layer, but public rendering should use safe public URLs or signed server-generated access where needed.
