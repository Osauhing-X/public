# Workspace v2: one Core, your choice of tools

Workspace v2 is a self-hosted package platform. Run Core on a Docker-capable computer, NAS or server. Core manages installations, settings, application processes and background work; business features belong to installed packages.

## The three building blocks

| Component | Purpose | Example |
| --- | --- | --- |
| Application | An independent managed Node application or static HTML website | Website, a custom HTML site |
| Module | A focused business tool, optionally attached to a compatible application | Routes, Calendar, Customers CRM |
| Integration | A server-side connection with declared actions and credentials | GitHub, Resend, Stripe, Cloudflare |

The Website application's Routes module manages public routes. Other compatible modules supply content using declared imports. A module is not automatically a separate website.

## Where to start

1. [Install Core](/en/docs/getting-started).
2. Add your package source in **Storage**.
3. Configure required integrations, then install the application or module.
4. Verify its readiness, actual content and error handling.
5. Publish only after checking authentication, HTTPS and backups.

Core administration is private. A public application has its own authentication responsibilities; adding a domain does not implement user accounts.

## Your installation and account

**Integrations → Extaas Connect** contains the Workspace token, licence and official catalogue controls. Core Settings contains local administration and installation identity. Your Extaas customer account and invoices live in [OUX Self-service](https://iseteenindus.oux.ee/en/account), not in a shared tenant portal at the old Workspace domain.

An installed copy survives source removal. Reconnect its source before requesting updates. Removing the installation or its persistent data is a separate action.

## Current execution boundary

Node applications run as managed processes in the Core container; static applications use Core's managed file server without receiving environment secrets or an Application token. Neither mode creates a separate Docker container per application. Package actions use constrained child processes. These controls are not a guarantee that untrusted code is safe. Only install code you trust.

The navigation is grouped by purpose:

- **Portal** (`/portal`): installation overview.
- **Library** (`/library/storage`, `/library/integrations`, `/library/modules`, `/library/applications`): sources and packages.
- **Work** (`/work/cron`, `/work/automations`, `/work/jobs`): schedules, workflow editing and active or failed work.
- **System** (`/system/settings`, `/system/environments`, `/system/logs`): administration, environment groups and runtime events.

Jobs shows running and waiting work and retains errors; successful work disappears after completion. Automations currently runs saved workflows explicitly. Installed package trigger definitions do not yet connect provider events automatically. Do not rely on an unattended event workflow until its source and delivery path are implemented and tested.

Workspace is actively developed. Validate your own workflow before production use; package installation is not evidence that every feature has been tested.

[Next: install Core](/en/docs/getting-started)
