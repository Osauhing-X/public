# Create packages for Workspace v2

Build one small package first. A package is discovered from a configured Storage source and copied into persistent Core data when installed. Do not edit Core's own routes to add your feature.

## Repository layout

```text
my-workspace-packages/
  modules/example-counter/
    manifest.json
    package.json
    ui/index.html
    server/data.js
  integrations/example-service/
    manifest.json
    package.json
    server/actions.js
  applications/example-site/
    manifest.json
    package.json
    server/index.js
```

Every package needs a manifest. JavaScript examples below use a package.json containing `{"type":"module","private":true}`. Add a committed lockfile when using npm dependencies.

## Manifest essentials

- `id`: lowercase stable slug, 2–63 characters; never rename it casually after release.
- `kind`: module, integration or application for these tutorials.
- `version`: version string; bump it for a published change.
- `environment`: explicit array, even when empty. Each entry declares key, required and description; mark credentials secret.
- `icon`: optional safe `ui/name.svg` path.
- `integrations`: dependencies use permanent namespaced integration IDs.
- `applications` and `application_imports`: module/application compatibility and public-content contributions.
- `runtime`: depends on package kind; applications require the managed Node runtime.
- `cron`: optional declared jobs; an empty array is a safe start.

The shipped Core's `runtime/manifest.js` is the current validator. Metadata such as permissions or migrations is not proof of an OS sandbox or automatic database migration.

## Trust and testing

Only install trusted packages. A valid manifest checks shape, not the safety of its business logic. Test with disposable data, deny unauthorised access, preserve drafts on failure and keep secrets out of source control and logs.

Continue with [a module](/en/docs/create-module), [an integration](/en/docs/create-integration), or [an application](/en/docs/create-application).
