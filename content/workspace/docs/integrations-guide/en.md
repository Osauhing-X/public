# Configure integrations in Workspace v2

An integration owns the connection and declared server actions. Modules and applications request authorised actions; they should not receive another integration's raw secrets.

## Setup order

1. Read the consuming package's manifest dependencies.
2. Install the matching integration from a trusted source.
3. Enter required values in its setup panel or assigned Environment group.
4. Enable the integration and check its readiness.
5. Test a safe action and inspect the result and logs.
6. Only then enable a public workflow.

## Connections

| Integration | Purpose |
| --- | --- |
| GitHub | Package sources and scoped repository operations |
| Cloudflare | Tunnel connector attached to Core; public hostnames are configured in Cloudflare |
| Reverse Proxy | Approved routes through the configured proxy |
| Supabase | Optional or required external data/auth/storage, depending on the package |
| Resend | Explicit email delivery and contact operations |
| Stripe | Scoped catalogue, payment links and payment reconciliation |
| Discord / Trello | The actions declared by their installed package |

OpenAI is not a shipped integration in the current public package set. Old v1 AI-composer instructions are not a v2 setup path.

## Environment and source groups

Values are grouped by verified source ownership. A key is supplied only when declared and assigned. Normal package-to-integration calls require the same source group and declared action scopes. A similarly named integration from another source is not automatically interchangeable.

Removing a source preserves installed copies. Environment values with no remaining consumer are marked unused and retained until explicitly removed.

Never put service-role keys, tokens or webhook secrets into a public page, URL or screenshot. Provider connection tests and actual delivery/payment checks are different.

[Next: public applications](/en/docs/landing-page)
