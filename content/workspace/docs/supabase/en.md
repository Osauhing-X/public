# Supabase in Workspace v2

Supabase is an external data, authentication and storage connection for packages that need it. It is not universally required for every Core module: many private v2 tools persist instance state in Core data.

## Configure the matching integration

Use **Official Catalogue → Supabase**, whose stable integration ID is `io.extaas.supabase`. The retired OUX PRIVATE copy is not a separate setup requirement. Select the intended installed connection instance explicitly; a similar package name does not authorise access to its credentials.

The current package declares SUPABASE_URL, SUPABASE_ANON_KEY, optional SUPABASE_SERVICE_ROLE_KEY and optional SUPABASE_ALLOWED_SCHEMAS. The last field is a comma-separated schema allow-list for explicitly bound server actions and defaults to public. Add private business schemas only for trusted, authorised applications; do not widen it to bypass a permission failure.

Assign only the values requested by your installed manifest. Secret and service-role credentials remain server-side. A connection test is not proof that every table, policy or bucket is configured.

## Data access

Use explicit grants and row-level policies for exposed data. Authentication alone does not authorise access to every customer's rows. Prefer private schemas for internal helper functions and never create a general public SQL execution endpoint to make a module work.

The v1 tenant SQL helper is not a v2 installation step. The old `tenant-exec-sql.txt` download now contains only a deprecation notice, not executable setup SQL. Do not create a general-purpose `SECURITY DEFINER` SQL executor. If an older installation already has one, review its grants and dependencies before a separately approved removal; replacing a downloaded file does not remove a database function. Schema changes belong to reviewed migrations owned by the application/package, with a backup and a restore test.

## Capacity reports

In version 0.1.5, the local Core owner can explicitly load the integration's capacity report. For a supported Cloud connection it uses the provider's server-side metrics endpoint with the assigned administrative credential. It can show measured database size and available filesystem space when those metrics exist. It does not read customer rows to build the report.

Cloud organisation billing allowances and monthly remaining usage are separate from filesystem capacity. Missing metrics remain unavailable, not zero. Do not infer the connected project's plan or remaining allowance from a public pricing page. Report results are cached for 60 seconds; a report refresh does not switch the connection or migrate data.

## Local Supabase preparation

The Supabase Local application is a separate optional package. Preparing its settings does not start the stack, copy Cloud data or change the primary connection. Before a real switch, provision sufficient resources, start and verify the local stack, plan a backed-up data migration, verify authentication and storage, and test every consuming package. A working Cloud integration is not evidence that a local replacement is ready. Never overwrite Cloud values merely because a local package has been installed.

Package contract checked on 2026-10-23 against official Supabase package 0.1.5.

[Official Data API security guide](https://supabase.com/docs/guides/api/securing-your-api) explains grants and RLS. Test with the intended public/signed-in role, not only an administrative key.
