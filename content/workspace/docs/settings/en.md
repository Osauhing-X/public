# Core settings, maintenance and updates

**System → Settings** manages the local administrator, installation identity, Getting Started visibility and Core release information. Official catalogue controls belong to **Integrations → Extaas Connect**.

## Environment

Declared keys are assigned to package consumers. Saved secrets are masked by default. On **System → Environments**, a key’s **Reveal** control shows only that key after local-owner password confirmation. It does not unlock other keys or groups. Delegated application users cannot use this feature.

Individual values hide after 60 seconds or when the window loses focus; responses are not cached. Each group’s `<summary>` header has a **Developer view** button. Hovering over the header for five seconds, or pressing and holding it with a finger for five seconds, opens the same password prompt. Leaving early, releasing the finger, or moving to scroll cancels the timer. Holding alone never reveals values.

After password confirmation, only that group’s table is replaced inline by a `.env` text editor for copying or pasting multiple settings. The server grant is restricted to that exact group, authenticated session and opening. It cannot replace password confirmation for another group or an individual key. **Table view · lock**, collapsing the group, navigating away, or losing window focus ends permission. Browser persistent storage is not used; the protective server-side maximum is 30 minutes.

Use `KEY=value`; double-quoted values support JSON escapes such as `\n`. Variables and shell commands are never evaluated. Invalid or duplicate keys reject the entire bulk save. Omitted keys remain unchanged; an empty value explicitly clears that setting. Application-specific overrides are not included in a group export. Saving does not automatically restart running Applications. The Environment view only reads and changes values saved inside Core; it does not read from or write to GitHub.

Group text and unsaved edits are hidden and cleared when the window loses focus. Reveal values only on a trusted device and hide them before screen sharing. Copied `.env` text contains secrets: transfer it securely, never commit it to Git or paste it into conversations. Groups without installed consumers are marked unused; removal is explicit. Never replace an encryption key casually: existing encrypted data may become unreadable.

The official catalogue and its verified public GitHub delivery source may appear as one inventory row. This does not merge their credential groups or grant packages access to another source's secrets. Reusing a connection requires an explicit provider assignment; unrelated Supabase projects must remain separate.

Application-specific configuration is in its **Configuration** and **Environment** sections. Domain settings and runtime logs belong to the application.

## Background work

**Cron** lists schedules and their last results. A confirmed manual run does not change the schedule. Core must allow background execution, the package must be ready, and the same job cannot run twice concurrently.

These views belong to **Work**: `/work/cron`, `/work/automations` and `/work/jobs`. **Jobs** separates running, waiting and failed work. Successful jobs disappear when completed; failures remain available for investigation. They are not automatically retried or erased by opening the page. **System → Logs** (`/system/logs`) shows runtime events. Preserve diagnostic information before any explicit cleanup.

Automations currently runs saved workflows explicitly. A trigger description supplied by a package is not evidence of a connected provider-event subscription. Confirm the actual source, permission and delivery path before relying on automatic execution.

## Resources and updates

Overview and Storage distinguish filesystem capacity from logical Core file sizes. Application RAM is the measured directly managed process, not a fabricated total for all child processes. CPU scope and unavailable values are shown explicitly.

Core checks releases periodically. Apply Docker image updates through your deployment manager after a backup; Core does not mount the Docker socket to replace itself. Allow at least 45 seconds for planned shutdown: Core waits up to 30 seconds for tracked jobs and five seconds for HTTP connections. A timeout or abrupt host failure can still interrupt work; investigate before retrying. Package source refresh and package installation are different actions.
