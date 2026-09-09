# Dynamic Home Assistant entities: now X Entities

The former standalone dynamic-entities integration has been consolidated into **X Entities**. It discovers compatible Node.js applications over Zeroconf, receives state snapshots and creates Home Assistant entities from them.

## How data moves

An application sends its current state to the X Entities API. Switch and button commands from Home Assistant return to the app's /update endpoint. A heartbeat separates healthy sources from interrupted connections: a missing source first becomes unavailable and stale records are later removed.

This is useful when a custom service or device must communicate with Home Assistant without maintaining a separate custom component for every data type.

Read the current guide: [X Entities](/docs/x-entities).
