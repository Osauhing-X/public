# Core settings, maintenance and updates

**System → Settings** manages the local administrator, installation identity, Getting Started visibility and Core release information. Official catalogue controls belong to **Integrations → Extaas Connect**.

## Environment

Declared keys are assigned to package consumers. Secret values are not returned to the browser. Groups without installed consumers are marked unused; removal is explicit. Never replace an encryption key casually: existing encrypted data may become unreadable.

Application-specific configuration is in its **Configuration** and **Environment** sections. Domain settings and runtime logs belong to the application.

## Background work

**Cron** lists schedules and their last results. A confirmed manual run does not change the schedule. Core must allow background execution, the package must be ready, and the same job cannot run twice concurrently.

**Queued** keeps bounded finished history; pending/running jobs are not discarded as history. **Logs** shows runtime events. Clearing either is a separate destructive action: export what you need first.

## Resources and updates

Overview and Storage distinguish filesystem capacity from logical Core file sizes. Application RAM is the measured directly managed process, not a fabricated total for all child processes. CPU scope and unavailable values are shown explicitly.

Core checks releases periodically. Apply Docker image updates through your deployment manager after a backup; Core does not mount the Docker socket to replace itself. Package source refresh and package installation are different actions.
