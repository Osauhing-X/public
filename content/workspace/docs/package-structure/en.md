# Create packages for Workspace v2

Build one small package first. A package is discovered from a configured Storage source and copied into persistent Core data when installed. Do not edit Core's own routes to add your feature.

## Repository layout

```text
my-workspace-packages/
  modules/example-counter/
    manifest.json
    README.md
    package.json
    ui/index.html
    server/data.js
    api/                 # optional declared handlers
    cron/                # optional scheduled tasks
    automation/          # optional builder definitions
      triggers/
      conditions/
      actions/
      options/
  integrations/example-service/
    manifest.json
    README.md
    CHANGELOG.md
    package.json
    server/actions.js
    api/                 # declared provider handlers and API contract
    docs/                # setup, payloads, examples and dated provider limits
    cron/                # optional
    automation/          # optional triggers/conditions/actions/options
  applications/example-site/
    manifest.json
    README.md
    public/index.html    # static runtime; no package.json required
    api/                 # optional, for server-capable applications
    cron/                # optional, subject to the manifest contract
```

Every package needs a manifest and should include a README explaining setup and limitations. Modules and applications may also include CHANGELOG.md and DOCS.md or docs/. Node examples use a package.json containing `{"type":"module","private":true}`; add a committed lockfile when using npm dependencies. A plain static site needs only its manifest and public files.

Folders are an authoring convention, not permission grants. Declare callable handlers and schedules in the manifest; adding api/, cron/ or automation/ alone does not enable endpoints, execution or access to another package. Empty optional folders can be retained with a .gitkeep file. Keep existing handler paths stable when extending an installed package.

## Manifest essentials

- `id`: lowercase stable slug, 2–63 characters; never rename it casually after release.
- `kind`: module, integration or application for these tutorials.
- `version`: version string; bump it for a published change.
- `environment`: explicit array, even when empty. Each entry declares key, required and description; mark credentials secret.
- `icon`: optional safe `ui/name.svg` path.
- `integrations`: dependencies use permanent namespaced integration IDs.
- `applications` and `application_imports`: module/application compatibility and public-content contributions.
- `runtime`: depends on package kind; applications support managed `node` or `static` runtimes.
- `cron`: optional declared jobs; an empty array is a safe start.

The shipped Core's `runtime/manifest.js` is the current validator. Metadata such as permissions or migrations is not proof of an OS sandbox or automatic database migration.

## Developer documentation

Describe the installed package's actual API, not every endpoint offered by its upstream provider. Document each declared action, payload, result, error, caller scope, explicit connection and side effect. Include safe examples for both modules and applications without copying credentials into them.

For provider limits, include the plan, unit, billing/reset window, date checked and official source. Distinguish a published allowance from measured usage and remaining capacity. Missing measurements are unknown, not zero; local disk capacity is not a cloud billing quota.

Integrations can also declare a data-only `dashboard` for owner-requested metrics, progress bars, notes and a table. It does not inject package HTML or scripts into Core. See [integration reference](/en/docs/integrations).

Automation definitions belong to the installed package. Executable action/condition blocks need valid implementations; automatic provider-event dispatch is not yet connected. A folder or trigger label alone must not be presented as a working automation.

## Trust and testing

Only install trusted packages. A valid manifest checks shape, not the safety of its business logic. Test with disposable data, deny unauthorised access, preserve drafts on failure and keep secrets out of source control and logs.

Continue with [a module](/en/docs/create-module), [an integration](/en/docs/create-integration), or [an application](/en/docs/create-application).
