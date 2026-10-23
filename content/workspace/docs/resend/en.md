# Resend setup for Workspace v2

The Resend integration declares send-email and contact actions. Email requires send-email; other packages must declare their own scopes.

## Actual account usage and limits

Resend 1.1.5 with Core integration-report support can load the account Usage API report in Overview. It shows provider-reported daily/monthly usage, limits, reset dates and calculated remaining allowance. Checked on 23 October 2026 against the [Resend Usage API guide](https://resend.com/docs/api-reference/usage/retrieve-usage).

Usage includes sending and receiving across the Resend account, not only messages from this Workspace. Missing or denied usage data is not replaced with zero or an assumed Free plan. A provider-reported uncapped period is distinguished from an unknown limit. An older installed package needs updating; a new catalogue version is not applied automatically.

## Configure

Install the integration and assign RESEND_API_KEY in its source group. The provider account belongs to the operator. Configure a verified sender in Resend, then check the integration status and the consuming module's readiness.

Do not copy the key into a template or browser JavaScript. The integration receives its assigned secret server-side.

## Safe acceptance

Send a reviewed test to your own address, confirm the request result and inspect the provider's delivery status. Verify reply-to and links. A provider acceptance ID does not guarantee inbox placement.

Use the sending options and limits exposed by the installed version. V1 weekly credits, unlimited plans and automatic booking emails are not general v2 guarantees.

[Resend documentation](https://resend.com/docs) covers current provider settings. [Email and Communication](/en/docs/email-and-audience) explains the Workspace boundary.
