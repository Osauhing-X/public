# Tutorial: create a web application

See the [required and optional Application structure](/en/docs/package-structure). Own code, `manifest.json` and `README.md` are required; `CHANGELOG.md`, `DOCS.md`, `cron/` and `api/` are optional.

An application can be a managed Node process or a plain HTML website. Choose static serving when no server-side logic is needed; use Node for authentication, integration calls or dynamic endpoints.

## Plain HTML: no build or custom server

Create `applications/example-static/public/index.html` with your HTML and place only intentionally public CSS, browser JavaScript and images in `public/`. Add this manifest alongside `public/`:

```json
{"schema_version":2,"id":"example-static","kind":"application","version":"1.0.0","name":"Example Static","environment":[],"exposure":{"mode":"port"},"runtime":{"type":"static","port":4180,"document_root":"public","healthcheck":{"path":"/"}},"cron":[]}
```

No package.json, npm install, build command or custom Node server is required. The public directory must contain index.html. Core rejects directory listings, dot files, traversal, external symlinks and unsupported file formats. Static applications receive no environment secrets or Core Application token and cannot perform server-side integration calls. Use relative asset URLs for Core's path-prefixed view; root-absolute assets need a dedicated port or domain. Static serving does not implement user accounts or publish the site automatically.

## Node: server-side capabilities

The following minimal Node website serves a homepage and health endpoint without npm dependencies.

Create applications/example-site with package.json `{"type":"module","private":true}`.

## manifest.json

```json
{
  "schema_version": 2,
  "id": "example-site",
  "kind": "application",
  "version": "1.0.0",
  "name": "Example Site",
  "description": "A minimal dedicated-port Node website.",
  "exposure": {
    "mode": "port"
  },
  "environment": [],
  "runtime": {
    "type": "node",
    "command": [
      "node",
      "server/index.js"
    ],
    "port": 4180,
    "restart": "on-failure",
    "healthcheck": {
      "path": "/health"
    }
  },
  "cron": []
}
```

## server/index.js

```js
import { createServer } from 'node:http';
const port = Number(process.env.PORT);
if (!Number.isInteger(port)) throw new Error('Core must supply PORT.');
createServer((request, response) => {
  if (request.url === '/health') {
    response.writeHead(200, { 'Content-Type': 'text/plain' }); return response.end('ok');
  }
  if (request.method !== 'GET' || request.url !== '/') {
    response.writeHead(404); return response.end('Not found');
  }
  response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  response.end('<!doctype html><title>Example Site</title><h1>Hello from Workspace</h1>');
}).listen(port, process.env.HOST || '127.0.0.1');
```

## Runtime contract

Core supplies HOST and PORT. It also supplies APPLICATION_DATA_PATH for persistent instance data, APPLICATION_SETTINGS for declared settings, and Core gateway credentials for server-side integration calls. Never send CORE_APPLICATION_TOKEN to the browser.

Use the assigned PORT, not a hard-coded port. The manifest's port is the initial request; duplicates can receive another available port.

For a compiled framework add safe argument arrays under runtime.preparation.install and runtime.preparation.build. Use a lockfile. The entry in runtime.command must exist after build.

## Exposure

`port` mode permits dedicated-port access and public publishing. Map/allow ports deliberately; the manifest does not change a firewall. `internal` binds to loopback and uses Core's authenticated proxy; public publishing is disabled.

Applications share the Core container today. Do not claim per-application Docker isolation or hard memory quotas.

## Verify

Install, wait for healthy, open the assigned URL, check the homepage and /health, restart, and verify again. To publish, assign the exact domain and configure the reverse proxy. The example contains no account system: do not add private customer data until you implement and test one.
