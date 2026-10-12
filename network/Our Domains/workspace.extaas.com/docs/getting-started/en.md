# Install Workspace v2

You need Docker and Docker Compose. Start on a trusted local network; a public domain is not required.

## 1. Prepare persistent storage

Download [docker-compose.yml](https://extaas.com/downloads/workspace/docker-compose.yml) into an empty folder. Review it before running. It uses the image `ghcr.io/osauhing-x/workspace-core:latest` and the persistent `core-data:/data` volume.

## 2. Start Core

Run these commands in that folder:

```sh
docker compose pull
docker compose up -d
```

Open `http://localhost:3000`. From another device use the Docker server's LAN IP and the externally mapped port. Create the local administrator account.

Do not publish Core administration while experimenting. Use a strong password and retain the persistent volume.

## 3. Add your tools

1. Open **Storage** and add a GitHub repository, ZIP collection or mounted folder. The official catalogue is managed through Extaas Connect.
2. Configure any required integration and check its readiness.
3. Install a module or application. An application may need installation and build commands before its health check passes.
4. Open it and verify actual content. Inspect **Runtime logs** or **System → Queued** if it fails.

A missing optional integration should not be confused with a required one. Read the package manifest and its setup guidance.

## 4. Publish deliberately

Choose a dedicated-port application, assign its exact domain in **Domains**, then configure your reverse proxy or [Cloudflare Tunnel](/en/docs/cloudflare). The connector's internal Core port is normally 3000; it is not necessarily the mapped LAN port.

Check logged-out access, account permissions, HTTPS, assets, forms and error states before inviting customers.

## Backup and update

Back up the persistent volume and deployment configuration. Pull and recreate with the same commands above. Keep the previous image digest for rollback and check health after restart.

**Do not run `docker compose down -v` to update: it removes named volumes.**

[Next: choose modules](/en/docs/modules-overview)
