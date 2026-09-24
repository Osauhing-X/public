# Workspace Core documentation

Workspace Core is a self-hosted workspace for packages and integrations. It runs on the owner's computer, NAS or server and keeps Core settings and installed packages in persistent `/data` storage. By default, Core is a local administration surface: it does not need a public domain, reverse proxy or open firewall port to start.

## What Core does today

- creates a local administrator account on first start;
- manages package sources, installations, versions, groups and module state;
- adds integration-approved environment values to Core settings;
- opens local work views for installed modules;
- optionally connects the Extaas official catalogue through an OUX-validated licence or active monthly subscription.

Core is not currently a tenant portal, invoice system, credit system or DNS-route manager. Installing a package also does not automatically execute arbitrary package server code.

## First start and local administration

1. Start the official `docker-compose.yml` on Docker Desktop, a NAS or your own server.
2. Open the local Core address, for example `http://localhost:3000`.
3. Create the local administrator account with an email and password.
4. Set an email under **Settings → Core**. It is used for local notifications and when creating the installation token for Extaas catalogue access.

The local administrator owns the Core. Visibility of integrations and settings can also be granted to specifically allowed Supabase users, but sensitive values must only be exposed to people who genuinely need access.

## Package sources

Core discovers manifest-based packages from these sources:

| Source | Suitable for |
| --- | --- |
| Storage | a local or NAS folder Core can inspect |
| GitHub | a selected repository and branch |
| ZIP | an uploaded package collection extracted into Core-managed storage |
| Official catalogue | the signed Extaas public catalogue after an OUX entitlement check |

Core validates each `manifest.json` before a package appears in the catalogue or can be installed. An installation is copied into Core's persistent storage so a source change cannot silently overwrite it.

## Official catalogue and licence

**Settings → Extaas** creates one persistent installation ID and Workspace token per Core. Add that token to the entitlement for this exact Core in the Extaas Store. Entitlement can come from an active monthly subscription or a separately issued licence key.

OUX validates entitlement server-side. Core contains neither the licence creation/decryption logic nor an OUX, Extaas or GitHub secret.

When entitlement expires, only modules and integrations from the official Extaas catalogue are locked. Packages from the owner's Storage, GitHub or ZIP source remain installed. When entitlement becomes active again, official packages can be used again and the catalogue can be refreshed.

## Modules and integrations

A module manifest can declare required integrations. Core prevents installation until each required integration is configured, enabled and ready.

The current Core has local work views for at least:

- **Email** – managing templates, components, snippets and attachments, and sending through Resend;
- **Pages** – managing local public-page settings;
- **Forms / Surveys** – saving form and workflow settings.

Not every installed package has a dedicated runtime view yet. In that case, Core shows installation status, version and a compatibility view instead of implying that the full package functionality is already available.

## Configuring integrations

An integration card shows whether a connection is unconfigured, needs attention or is ready to use. Set required keys through the integration's own settings, then verify its status. For example, sending email requires an enabled and configured Resend integration.

Core stores values in its persistent settings store. Do not share administrator access or export integration keys. Before exposing any part of Core outside a trusted network, configure HTTPS, authentication and appropriate network restrictions.

## Updates and limits

Update the Core Docker image through the usual Docker Compose update process. Refreshing a package source shows whether a newer package version is available; installed packages are not replaced automatically.

Features that are planned or still under development – such as an isolated package runtime, automatic cron execution, Cloudflare tunnel management and general public-route hosting – are not promises of this documentation. Validate your own deployment, authentication and network security before a production exposure.

## Related guides

- [Module overview](/en/docs/modules-overview)
- [Integration guide](/en/docs/integrations-guide)
- [Email and audience](/en/docs/email-and-audience)
- [Settings](/en/docs/settings)
