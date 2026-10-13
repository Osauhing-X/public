# Email and Audience in v2

Email composes messages; Audience manages delivery recipients through its configured connection. Resend performs the delivery. These are different responsibilities.

## Prepare and verify

Configure Resend, verify the sending identity in the provider, select the correct recipients and review subject, message, links and attachments. Send a test only to an address you control before an approved real send.

Email supports reusable assets and instance-owned state. Check the installed version's attachment limits instead of applying v1's 20-file/25-MB claim; Core's local attachment storage has its own smaller per-file limit.

## Consent and status

A contact enquiry does not automatically grant marketing permission. Retain the purpose and unsubscribe state in the workflow that sends marketing.

An accepted provider response is not proof of inbox delivery. Inspect provider delivery/bounce status when available. Do not invent v1 credit deductions or automatic AI drafting that the installed v2 package does not implement.

Keep secrets, internal notes and unnecessary private data out of messages. Never send an unreviewed generated draft as if it were verified content.
