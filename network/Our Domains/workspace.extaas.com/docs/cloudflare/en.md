# Cloudflare Tunnel: one connector, routed applications

Workspace's token connector does not need an account ID or a manually entered origin to start. Paste the full tunnel token into the Cloudflare integration's private setup field. Treat it as a secret.

The token starts the connector; published hostnames and DNS still need a route in Cloudflare.

## Origin topology

| Where cloudflared runs | HTTP service URL |
| --- | --- |
| Inside the Core container | localhost:3000 |
| Separate container on the same network | Core service name and its internal port, e.g. core:3000 |
| Another machine | Core's reachable internal address and mapped port |

localhost always means the machine/container running the connector, not your browser.

## One route for subdomains

For subdomains in one zone, configure *.example.com with service Type HTTP and the correct origin above. Leave Path and HTTP Host Header overrides empty. Confirm a proxied wildcard DNS CNAME points to the tunnel. The apex example.com and different zones need separate entries.

In Workspace, assign an exact hostname to each dedicated-port Application. Core resolves the preserved Host header to that application. Unknown hosts and administration routes must not become a public fallback.

## Check a 502

Confirm the connector is connected, the origin is reachable from its own container, Core is listening on the internal port, and the application is healthy. An external LAN port is not necessarily the Core container port.

Then test the public root, locale routes, assets and authentication. Do not override Host to the Core hostname or use the public hostname as origin.

A tunnel routes traffic; it does not implement your application's account permissions or cross-domain SSO.
