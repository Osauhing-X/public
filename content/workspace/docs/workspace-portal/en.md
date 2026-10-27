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

**Integrations → Extaas Connect** manages the official catalogue connection. Installations using the existing licence model still show the Workspace token and licence there. New account-linking source code replaces manual entry with a connection confirmed in Self-service; it is not yet activated in production. Core Settings contains local administration and installation identity. Your Extaas customer account and invoices live in [OUX Self-service](https://iseteenindus.oux.ee/en/account).

Account linking and paid access are separate checks. Linking alone does not grant paid access. New billing was verified in Stripe test mode on 27 October 2026: a paid ecosystem subscription through the browser, partial/full refunds, renewal and cancellation. Reactivating the same subscription before its period ends was also verified without a new joining fee. The production purchase flow, production access issuance and the new RTSP to ONVIF client are not finished. Tested components are not an available production sales service; existing paid periods must survive the migration.

An installed copy survives source removal. Reconnect its source before requesting updates. Removing the installation or its persistent data is a separate action.

## Current execution boundary

Node applications run as managed processes in the Core container; static applications use Core's managed file server without receiving environment secrets or an Application token. Neither mode creates a separate Docker container per application. Package actions use constrained child processes. These controls are not a guarantee that untrusted code is safe. Only install code you trust.

The navigation is grouped by purpose:

- **Portal** (`/portal`): installation overview.
- **Library** (`/library/storage`, `/library/integrations`, `/library/modules`, `/library/applications`): sources and packages.
- **Work** (`/work/cron`, `/work/automations`, `/work/jobs`): schedules, workflow editing and active or failed work.
- **System** (`/system/settings`, `/system/environments`, `/system/logs`): administration, environment groups and runtime events.

Jobs shows running and waiting work and retains errors; successful work disappears after completion. Automations currently runs saved workflows explicitly. Installed package trigger definitions do not yet connect provider events automatically. Do not rely on an unattended event workflow until its source and delivery path are implemented and tested.

In a Core version with event-draft support, open the workflow start step and use **Start this workflow** to choose a manual start or an installed package event. Event choices and configuration fields come from the package, not arbitrary user-written code. Changing the start preserves its connected branches. For example, Resend 1.1.9 declares email-open, failure and contact-change events.

**Event draft · inactive** means an inactive draft. Saving does not register a webhook, grant credentials or activate automatic execution. The draft pins the selected package version; recheck the selection after disabling or updating that package. Select **Manually — press Run** for explicit testing. Production automatic execution still requires a separately verified event ingress and a confirmed workflow subscription.

Workspace is actively developed. Validate your own workflow before production use; package installation is not evidence that every feature has been tested.

## Automation block status — checked 26 October 2026

A definition, an implemented handler and a live installation are separate things. A catalogue update does not update installed copies automatically. This describes tested source code, not readiness on every customer's installation.

- Booking 0.1.6: request counts, a pending-request condition, open/pause intake and a new/cancelled request trigger definition.
- Rent 0.1.6: counts by status, a pending-request threshold, open/pause intake and new/declined/completed/cancelled request event choices.
- Resend 1.1.10: daily/monthly remaining allowance and a low-allowance condition. Measurements include account sending and receiving. Missing or uncapped measurements stop the step; no free-plan quota is guessed.

Conditions and actions are tested for explicitly started workflows. Booking/Rent event projectors are tested, but Core automatic state-change delivery is not connected. A trigger definition is not active automation. Resend webhook-verification preparation does not register a provider webhook.

Newer Core source includes paused event-subscription preparation. It does not run workflows or register webhooks; live UI acceptance and event-ingress wiring are unfinished. Do not build an unattended customer service on these unfinished parts.

[Next: install Core](/en/docs/getting-started)
