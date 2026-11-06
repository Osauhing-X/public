# Choose modules for Workspace v2

Choose one real workflow first, then install the smallest set of packages that supports it. Install modules through **Library → Packages → Discovery** and open them under **Library → Modules**.

## Choose by purpose

| Need | Module | Boundary |
| --- | --- | --- |
| Customer records and follow-up | Customers CRM | Private instance-owned state |
| Reminders and work stages | Calendar, Kanban, Admin | Private operational tools |
| Public page routes and content | Routes + Website, where already deployed | Requires a compatible Website instance and configured routes |
| Questionnaires | Forms / Surveys + Website | Public responses require the configured public flow |
| Service requests and rentals | Booking, Rent + Website | Request, approval and payment are different states |
| Product catalogue and sales | Store + Stripe + Website | Provider keys and signed payment events stay server-side |
| Messages and recipients | Email + Resend, Communication (previously Audience) | Sending and consent are separate responsibilities; availability depends on the installed version |

Read each installed manifest: required dependencies are package-specific. Many private tools use Core's persistent instance state; Supabase is not universally required for every record.

## Public and private

Private Pages and CRM records must remain private. Public renderers should expose only the fields needed for the public workflow. Review each public renderer’s output before enabling public access.

Existing Website installations can use Routes to place declared imports such as `[import:booking]` on public pages. These examples describe compatible installed packages. Check Discovery for packages available from your current sources.

## Rollout checklist

Install required dependencies, open the module, create one disposable record, reload to confirm persistence, check another instance cannot read it, and test the public surface logged out where applicable.

Do not claim a successful booking is paid or that all availability is automatically collision-free. Test the exact workflow of the installed version.

[Next: integration setup](/en/docs/integrations-guide)
