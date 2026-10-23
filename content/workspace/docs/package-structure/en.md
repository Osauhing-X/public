# Create packages for Workspace v2

Build one small package first. A package is discovered from a configured Storage source and copied into persistent Core data when installed. Do not edit Core's own routes to add your feature.

## Repository layout

Keep packages under `integrations/`, `modules/` and `applications/`. Each type has **required** files/directories and a separate **optional** set. “Own code” means the package's implementation, not a directory with a prescribed name.

### Integration

Required:

- Own code — service connection and integration actions.
- `manifest.json` — identity, version, configuration and declared capabilities.
- `CHANGELOG.md` — version history.
- `README.md` — purpose, installation and basic usage.
- `api/` — the integration interface and contract used by other modules and Applications. Describe allowed requests, responses and permissions; credentials stay on the integration server side.

Optional:

- `cron/` — scheduled tasks.
- `automation/` — Workspace builder blocks: triggers, conditions, actions and options.
- `docs/` — detailed user/developer guides, API examples and provider limits with verification dates.

### Module

Required:

- Own code — module UI and business logic.
- `manifest.json` — module description, dependencies and capabilities.
- `README.md` — purpose, setup and usage.

Optional:

- `CHANGELOG.md` — change history.
- `DOCS.md` — additional user/developer documentation.
- `cron/` — scheduled tasks.
- `automation/` — module automation blocks.
- `api/` — the module's own data interface through which **other modules can query data**. This is not merely its management UI endpoint and does not grant access to the entire data store.

### Application

Required:

- Own code — application implementation, or HTML and other public assets for a static website.
- `manifest.json` — application description and runtime.
- `README.md` — installation, configuration and usage.

Optional:

- `CHANGELOG.md` — change history.
- `DOCS.md` — additional documentation.
- `cron/` — scheduled tasks, subject to runtime support.
- `api/` — application interfaces supported by its runtime. Adding a directory does not give a static HTML application a server-side API.

These are package authoring requirements. Passing validation does not replace documentation or prove that a capability named by a directory is implemented. Additional directories are allowed when their purpose is clear; they do not change the required/optional distinction.

### Example layout

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
    docs/                # optional guides, examples and dated provider limits
    cron/                # optional
    automation/          # optional triggers/conditions/actions/options
  applications/example-site/
    manifest.json
    README.md
    public/index.html    # static runtime; no package.json required
    api/                 # optional, for server-capable applications
    cron/                # optional, subject to the manifest contract
```

README is required for all three package types. CHANGELOG.md and DOCS.md are optional for modules and Applications; an integration requires CHANGELOG.md and api/, while docs/ is optional. Node examples use a package.json containing `{"type":"module","private":true}`; add a committed lockfile when using npm dependencies. A plain static site needs no Node package.json, but still requires a manifest, README and its own public files.

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
