# Workspace integrations

Integrations connect a tenant portal with Supabase, Stripe, Resend, OpenAI, Discord and domain services. A connection is enabled only when the required module, plan and environment configuration exist. Missing integrations must produce a clear unavailable or configuration-required state instead of continuing with a failing request.

The Discord connection uses each tenant's own Discord bot token instead of a shared Extaas bot. Workspace verifies the servers and channels visible to that bot and the required channel permissions, then keeps the token server-side; the browser receives only configuration status.
