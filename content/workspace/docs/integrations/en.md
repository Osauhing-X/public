# Integration reference

An integration connects a service through declared server-side actions and explicitly assigned environment values. It is not just a key-entry form.

Read [integration setup](/en/docs/integrations-guide), [create an integration](/en/docs/create-integration) and [connect packages](/en/docs/connect-packages).

A consumer uses the stable integration_id and declared action scopes. Source-group boundaries prevent an unrelated package from inheriting the connection. Keep credentials server-side and return only necessary action results.

## Package documentation and connection settings

Read the installed integration's README and docs/ for its actual action names, payloads, return values, required scopes and limitations. An upstream provider feature is not automatically an implemented Workspace action. Plan limits need a checked date and official source; usage requires a real measurement.

The Environment table lets the owner filter keys, expand a row and edit a value. A newly entered draft can be inspected while editing; a saved secret is not returned to the browser. Leave it unchanged to retain it or enter a replacement. Do not confuse a masked saved value with an empty credential.

An existing connection profile is an advanced way to reuse already saved settings without copying credentials. It is not a second database, subscription or new provider account. A profile from another source still requires explicit authorised service connections; matching names never grant access.

## Optional custom reports

An integration can supply a data-only dashboard. The local administrator explicitly loads or refreshes it; opening the integration page does not run provider code. Core renders bounded text cards, progress bars, notes and a table, not arbitrary HTML or scripts. Results are cached for 60 seconds and report failures must not expose provider response bodies or secrets.

For authors, add a manifest declaration pointing to an existing handler:

```json
{"dashboard":{"entry":"server/dashboard.js","export":"dashboard","title":"Service capacity","description":"Measured usage for this connection."}}
```

```js
export function dashboard() {
  return {
    metrics: [{label: 'Capacity', value: 'Unavailable', detail: 'No measurement connected'}],
    notes: ['Unavailable is not a zero measurement.']
  };
}
```

This example makes no provider request. A real handler receives only its assigned declared environment settings and must use a fixed, documented read-only API with bounded reads and timeouts. Installed server code remains trusted code, not a network sandbox. Refreshing a report does not authorise messages, charges, data cleanup or other mutations.
