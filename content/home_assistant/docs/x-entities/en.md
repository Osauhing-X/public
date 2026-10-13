# X Entities

X Entities is the Home Assistant integration bundled with X Platform for creating application-owned entities. It replaces the former standalone dynamic-entities solution and supports sensors, binary sensors, switches and buttons without requiring a separate custom component for every application.

X Platform discovers X Entities in the official repository and installs it during the initial sync unless the integration was previously removed manually. Home Assistant may need to be restarted and X Entities added from the Integrations view after installation.

## How data moves

A compatible application discovers Home Assistant over Zeroconf and sends a complete state snapshot to the X Entities API. Each application's `source_id` isolates its entities from other applications. The entities are grouped under the X Platform hub as an application-specific device.

Switch and button commands made in Home Assistant are sent directly to the corresponding application's `POST /update` endpoint using the original entity key. X Platform neither proxies nor stores current application entity state.

## Heartbeat and expiry

Applications should publish at least every 20 seconds; the recommended interval is 5 seconds. If publishing stops, source entities become unavailable after 20 seconds. After 90 seconds, X Entities removes the stale source entities and its empty application device.

For connectivity state, use a binary sensor named `heartbeat`, `alive` or `online`, or set `device_class: connectivity`. On interruption, the heartbeat becomes `false` and remains present until the application device is removed.

X Entities operates locally and uses Home Assistant's `http` and `zeroconf` dependencies. The application is responsible for publishing state and exposing `/update` for controllable entities.
