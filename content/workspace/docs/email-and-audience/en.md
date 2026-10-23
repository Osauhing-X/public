# Email and Communication in v2

## Package-owned API from version 0.1.8

Communication's `api/contacts.js` owns the contact-group, normalized-email and merged All-view contract. A consuming module declares `modules: [{"id":"audience","actions":["contacts"]}]` and the owner selects an exact installed instance. The directory does not grant public access or access to the entire data store.

This version requires Core's generic module API and `provider_reads` support. Update Core first, then Resend 1.1.6 and Email 0.1.8, followed by Communication 0.1.8. Stripe/Supabase contact reading requires integration version 0.1.6 or later. Explicitly select read providers under Service connections; reading this guide does not update an old installation. Provider credentials never enter the module API. An existing exact Email contact-source read grant is retained only for the same target and contexts.

Email composes messages; Communication combines contact views from configured sources. Resend performs delivery. These are different responsibilities. The previous name and stable package ID are Audience (`audience`); existing data and `[import:audience]` do not need renaming.

## Communication sources

The capability added on 23 October 2026 requires updated Core, Communication 0.1.7 and the relevant integration updates: Stripe 0.1.6, Supabase 0.1.6 and Resend 1.1.5. Older installations may not expose these options. A catalogue update does not update installed packages automatically.

Select the provider in the module's **Service connections** panel. Only configured, ready sources appear: Resend contacts, Stripe customers and Supabase Auth users. Private Stripe/Auth lists require an explicit connection and the exact read scope; a module is not granted the general Supabase administrative request action.

**All** combines matching normalized email addresses while retaining source membership and known Resend opt-outs. It does not copy contacts to another provider or infer marketing permission. Stripe/Auth views are read-only here. Failed sources are unavailable, not successful empty lists. Stripe/Auth reads are bounded to 1,000 provider records; over-limit or partial reads are not accepted as successful lists.

## Individually addressed batches

In Email's **Communication recipients** view, select an enabled Communication module, then its group and individual recipients. Compatible modules in the same source and Application context are discovered automatically. On a Core version supporting **Communication contact source**, the local administrator can also select a same-source Communication module used by another Application in Email's footer and explicitly authorize contact reading. Changing either module's Application or source requires reviewing the connection again; contacts are not copied or published. One confirmed batch supports 1–100 recipients. Each email has one To address; shared To/CC/BCC lists are not used. Resend's batch API does not support attachments in this flow, and the payload size is bounded. Ordinary single-message sending remains separate.

The server rechecks group membership and opt-outs before sending. Recipients and permission to contact them require separate confirmation. A changed/foreign selection or an unavailable configured source blocks the send.

For an uncertain result, retain the same content, recipients and request ID. Resend's duplicate-protection window is 24 hours; Core allows uncertain retries only within 23 hours and does not resend an already accepted request. After that, inspect provider logs. There is no automatic replay after a restart. The private local receipt stores a digest, request ID, count and status, not message content or recipient addresses.

## Prepare and verify

Configure Resend, verify the sending identity in the provider, select the correct recipients and review subject, message, links and attachments. Send a test only to an address you control before an approved real send.

Email supports reusable assets and instance-owned state. Check the installed version's attachment limits instead of applying v1's 20-file/25-MB claim; Core's local attachment storage has its own smaller per-file limit.

## Consent and status

A contact enquiry does not automatically grant marketing permission. Retain the purpose and unsubscribe state in the workflow that sends marketing.

An accepted provider response is not proof of inbox delivery. Inspect provider delivery/bounce status when available. Do not invent v1 credit deductions or automatic AI drafting that the installed v2 package does not implement.

Keep secrets, internal notes and unnecessary private data out of messages. Never send an unreviewed generated draft as if it were verified content.
