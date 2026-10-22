# Core settings, maintenance and updates

**System → Settings** manages the local administrator, installation identity, Getting Started visibility and Core release information. Official catalogue controls belong to **Integrations → Extaas Connect**.

## Environment

Declared keys are assigned to package consumers. Secret values are not returned to the browser. Groups without installed consumers are marked unused; removal is explicit. Never replace an encryption key casually: existing encrypted data may become unreadable.

Application-specific configuration is in its **Configuration** and **Environment** sections. Domain settings and runtime logs belong to the application.

## Background work

**Cron** lists schedules and their last results. A confirmed manual run does not change the schedule. Core must allow background execution, the package must be ready, and the same job cannot run twice concurrently.

These views belong to **Work**: `/work/cron`, `/work/automations` and `/work/jobs`. **Jobs** separates running, waiting and failed work. Successful jobs disappear when completed; failures remain available for investigation. They are not automatically retried or erased by opening the page. **System → Logs** (`/system/logs`) shows runtime events. Preserve diagnostic information before any explicit cleanup.

Automations currently runs saved workflows explicitly. A trigger description supplied by a package is not evidence of a connected provider-event subscription. Confirm the actual source, permission and delivery path before relying on automatic execution.

## Resources and updates

Overview and Storage distinguish filesystem capacity from logical Core file sizes. Application RAM is the measured directly managed process, not a fabricated total for all child processes. CPU scope and unavailable values are shown explicitly.

Core checks releases periodically. Apply Docker image updates through your deployment manager after a backup; Core does not mount the Docker socket to replace itself. Allow at least 45 seconds for planned shutdown: Core waits up to 30 seconds for tracked jobs and five seconds for HTTP connections. A timeout or abrupt host failure can still interrupt work; investigate before retrying. Package source refresh and package installation are different actions.
