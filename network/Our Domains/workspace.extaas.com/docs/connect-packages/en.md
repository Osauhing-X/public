# Connect modules, integrations and applications

There are two distinct connections: a module requests an authorised integration action, or it contributes public content to an application. Neither connection should hand credentials to a browser.

## Module → integration

Install Example Service and Example Counter from the same verified source group. Extend the counter's manifest:

```json
{
  "schema_version": 2,
  "id": "example-counter",
  "kind": "module",
  "version": "1.1.0",
  "name": "Example Counter",
  "description": "Private counter with a scoped provider status action.",
  "environment": [],
  "integrations": [
    {
      "id": "com.example.service",
      "required": true,
      "actions": [
        "connection-status"
      ]
    }
  ],
  "ui": {
    "document": "ui/index.html",
    "data": {
      "entry": "server/data.js",
      "export": "manage"
    },
    "provider_actions": [
      {
        "id": "check-connection",
        "integration_id": "com.example.service",
        "action": "connection-status"
      }
    ]
  },
  "runtime": {
    "type": "none"
  },
  "cron": []
}
```

Add this branch to manage before the existing read/write branches:

```js
if (payload.operation === "integration-result") {
  if (payload.body?.action !== "check-connection") throw new Error("Unknown provider result");
  return { result: { configured: payload.body.result?.configured === true } };
}
```

The UI can send the same workspace:request POST bridge with body:

```json
{"action":"provider","operation":"check-connection","payload":{}}
```

Core checks the binding, dependency and action scope, invokes the integration, then delivers the result to the module's integration-result operation. A failed provider request must not save a success state.

## Application → integration

Server-side application code can POST to:

```text
CORE_URL/@_integrations/com.example.service/connection-status
Authorization: Bearer CORE_APPLICATION_TOKEN
Content-Type: application/json
```

The application manifest must declare the same dependency and action scope. Use only the injected Core URL and instance credential; never put them into public HTML or frontend environment variables.

## Module → Website

Declare applications compatibility and an application_imports entry. A token such as [import:booking] is canonical for code booking. Its renderer is a package-relative JavaScript export. ui.data.public_export supplies only explicitly public fields; public_submit validates public input.

Attach the installed module to Website, then place its import in a route through Routes. Public rendering must escape user-provided text and never expose the private state wholesale.

## Verify boundaries

Test the permitted action, an undeclared action, a different source group, missing settings and another installed instance. Verify logged-out public data separately from private CRUD. The module, integration and application are independently versioned packages.
