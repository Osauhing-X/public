# Tutorial: create an integration

See the [required and optional integration structure](/en/docs/package-structure). Own code, `manifest.json`, `CHANGELOG.md`, `README.md` and `api/` are required; `cron/`, `automation/` and `docs/` are optional. `api/` describes the interface offered to modules and Applications.

An integration owns a permanent namespaced integration_id and explicit actions. Consumers receive an action result, not the integration's secret keys.

Create integrations/example-service with package.json `{"type":"module","private":true}`.

## manifest.json

```json
{
  "schema_version": 2,
  "id": "example-service",
  "integration_id": "com.example.service",
  "kind": "integration",
  "version": "1.0.0",
  "name": "Example Service",
  "description": "A minimal declared server action.",
  "environment": [
    {
      "key": "EXAMPLE_SERVICE_KEY",
      "required": false,
      "secret": true,
      "description": "Optional example credential; never returned to the browser."
    }
  ],
  "actions": [
    {
      "id": "connection-status",
      "entry": "server/actions.js",
      "export": "connectionStatus"
    }
  ],
  "runtime": {
    "type": "none"
  },
  "cron": []
}
```

## server/actions.js

```js
export function connectionStatus({ environment }) {
  return { configured: Boolean(environment.EXAMPLE_SERVICE_KEY) };
}
```

This is a local teaching example, not a real external-provider connection test. It checks only whether its optional setting exists. Never return environment or credentials.

## Real provider actions

Validate payload, enforce a fixed HTTPS provider origin, add a timeout, check response status and return only necessary fields. Avoid accepting an arbitrary URL from the browser. Destructive or billable operations need explicit confirmation and duplicate-event protection.

Keep integration credentials in environment fields, never client bundles. Actions run in bounded child processes and are not a licence to execute untrusted code.

## Connect a consumer

Declare the integration address in the consumer's integrations array and explicitly list `connection-status` in its actions scope. The legacy `com.example.service` contract remains supported. Publisher-qualified routing was checked on 2026-10-25: a GitHub integration uses an address such as `github:osauhing-x/supabase`, derived from Core's installed source rather than the manifest's `author` text. The Official catalogue and the same GitHub publisher share a namespace, while installed connections remain individually selectable.

For example: `{"integrations":[{"id":"github:osauhing-x/supabase","required":true,"actions":["public-config"]}]}`. Applications also declare `integration_gateway: 1`; modules declare `module_service_gateway: 1`. The owner must select the specific installation under Service connections. An address never grants access to credentials or another package's connection. After the Core update, the integration's **API endpoints** view displays its actual address and examples. Until that address appears there, use the existing contract.

An optional integration `api_id`, such as `my_private`, changes the final address segment without renaming the existing package `id` or installation URL. ZIP/network packages instead require a manifest `domain` and HTTPS domain proof. Claiming somebody else's domain in a manifest is not ownership verification. The API view supplies the installed-source fingerprint for the public `/.well-known/workspace-packages.json` document. Never publish credentials or customer data there. Updating or copying the package requires verification again.

The new server interface uses `POST /@_integrations/call`, headers `Authorization: Bearer <CORE_APPLICATION_TOKEN>` and `Content-Type: application/json`, and a body such as `{"provider":"github:osauhing-x/supabase","action":"public-config","payload":{}}`. Alternatively use `X-Workspace-Provider` or body `github`/`domain` plus `id`. Conflicting selectors are rejected. Use the injected Application `CORE_URL`; the token and request belong in server code, never browser JavaScript.

Install both, enable them, configure required settings, then verify a permitted action and a refused undeclared action. See [connecting packages](/en/docs/connect-packages).
