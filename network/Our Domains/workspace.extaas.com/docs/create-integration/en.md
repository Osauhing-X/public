# Tutorial: create an integration

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

Declare `com.example.service` in the consumer's integrations array and explicitly list `connection-status` in its actions scope. The consumer and integration must belong to the same verified environment/source group for normal package-to-package calls.

Install both, enable them, configure required settings, then verify a permitted action and a refused undeclared action. See [connecting packages](/en/docs/connect-packages).
