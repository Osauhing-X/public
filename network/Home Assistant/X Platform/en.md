# X Platform

X Platform is a Home Assistant add-on that brings application and integration installation, runtime management and maintenance into one console. The former standalone Node.js Server add-on is no longer a separate product; X Platform is its more universal successor.

## What does X Platform do?

- discovers public and private GitHub repositories;
- finds multiple applications and Home Assistant integrations in one repository;
- installs Node.js dependencies, runs builds and manages application processes;
- manages ports, environment variables, updates, status and logs;
- exposes applications through Home Assistant ingress and the local network;
- installs compatible integrations into Home Assistant's `custom_components` directory.

The official X Platform repository also contains the **X Entities** integration. During the initial repository sync, X Platform discovers and installs it automatically unless the user previously removed it manually. Home Assistant may need to be restarted and an X Entities config entry added before the integration can be used.

## Application requirements

Application identity, version, build command and start command are read from `package.json`. X Platform uses `npm ci` when a `package-lock.json` exists and `npm install` otherwise. Applications must listen on `process.env.PORT`; X Platform also sets `HOST=0.0.0.0`.

X-specific metadata for one or more applications in a repository belongs in `x_config.json`. It can describe the application path, description, icon, background, port, documentation, environment fields and Home Assistant support.

## Home Assistant and X Entities

Managed applications can use Home Assistant's internal API. X Platform passes the runtime `SUPERVISOR_TOKEN` and provides `X_APPLICATION_ID`, `X_ENTITIES_HUB_HOST` and `X_ENTITIES_HUB_PORT` for X Entities. X Platform does not own application entity state; each application publishes its state directly to X Entities.

Settings, repositories, integration archives and logs persist under the add-on's `/data` directory. An installed integration version is archived before it is copied into `custom_components`.

## Security

Install only source code you trust and have reviewed. Applications managed by X Platform inherit the Home Assistant runtime token and may access the Home Assistant API. Treat repositories, environment secrets and exposed LAN ports with the same care as any other production service.
