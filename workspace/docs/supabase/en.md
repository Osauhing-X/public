# Supabase in Workspace v2

Supabase is an external data, authentication and storage connection for packages that need it. It is not universally required for every Core module: many private v2 tools persist instance state in Core data.

## Configure the matching integration

The public Supabase package declares SUPABASE_URL, SUPABASE_ANON_KEY and optional SUPABASE_SERVICE_ROLE_KEY. The private OUX integration uses different provider-specific fields. Do not interchange the two.

Assign only the values requested by your installed manifest. Secret and service-role credentials remain server-side. A connection test is not proof that every table, policy or bucket is configured.

## Data access

Use explicit grants and row-level policies for exposed data. Authentication alone does not authorise access to every customer's rows. Prefer private schemas for internal helper functions and never create a general public SQL execution endpoint to make a module work.

The v1 tenant SQL helper is not a v2 installation step. Schema changes belong to reviewed migrations owned by the application/package, with a backup and a restore test.

[Official Data API security guide](https://supabase.com/docs/guides/api/securing-your-api) explains grants and RLS. Test with the intended public/signed-in role, not only an administrative key.
