# Forms, surveys and CRM

![The journey from a form to an organised customer relationship](cover.png)

A form collects structured customer input. CRM turns that input into a manageable customer relationship. Use them together when a response needs ownership, follow-up, history or later analysis.

<div class="grid gap _3" style="grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); margin-block: 1.5rem;">
  <div class="css _radius _padding"><span class="css _color">COLLECT</span><h3>The right question</h3><p>Ask only for information genuinely needed for a decision or service.</p></div>
  <div class="css _radius _padding"><span class="css _color">ROUTE</span><h3>Clear ownership</h3><p>Every response needs an owner, priority and response target.</p></div>
  <div class="css _radius _padding"><span class="css _color">TRACK</span><h3>One customer history</h3><p>Attach repeat enquiries to the same CRM contact and avoid duplicates.</p></div>
</div>

## Which tool should you use?

| Need | Suitable module | Example |
| --- | --- | --- |
| General contact | Contact Form | quote request, support question, partnership proposal |
| Custom data collection | Forms & Surveys | feedback, registration, needs assessment |
| Persistent customer view | Customers / CRM | contact, status, notes and follow-up |
| Time-based service request | Booking | service, location and requested time |
| Period-based resource request | Rent | item, quantity, start and end |

Do not rebuild an entire Booking or Rent process inside a generic form. A specialised module provides better states, management and customer experience.

## Structure of a good form

1. State the form purpose in its heading.
2. Explain what happens after submission and when to expect a response.
3. Request only necessary contact fields.
4. Group related questions into understandable sections.
5. Indicate required fields before submission, not only in an error.
6. Add a privacy notice and separate marketing consent where needed.
7. Show confirmation and an alternative contact route after submission.

Long forms increase abandonment. If information is needed only after initial qualification, request it during follow-up.

## Selecting field types

| Data | Recommended field | Validation |
| --- | --- | --- |
| Name | short text | reasonable length; do not assume exactly two name parts |
| Email | email | syntax, normalisation and typo warning |
| Phone | phone/text | country code; preserve `+` |
| Date | date | timezone and past/future rule |
| Quantity | number | minimum, maximum and integer requirement |
| Description | long text | length limit and safe rendering |
| Choice | radio/select | avoid overlapping answers; provide “other” where useful |
| Consent | checkbox | unchecked by default and tied to a clear purpose |

## Consent and data protection

Contact required to deliver a service and marketing consent are separate purposes. Do not make newsletter consent a condition of submitting a contact form. Store the consent wording/version, time, source and unsubscribe state so consent remains provable.

Avoid sensitive personal data unless the workflow is specifically secured and legally assessed. Free text may unexpectedly contain sensitive information; restrict access and do not copy full answers unnecessarily into email or logs.

## CRM workflow

Recommended steps after form submission:

1. Search for an existing contact by normalised email or phone.
2. Create a contact only if no suitable record exists.
3. Attach the enquiry to the contact, tenant and form source.
4. Assign an owner, state and next-action date.
5. Keep facts in structured fields and opinion/notes separately.
6. Log important state changes without duplicating all customer data.
7. Close with an outcome and, if useful, a future contact date.

## Suggested states

- **New:** nobody has reviewed the response.
- **Qualifying:** need, suitability or completeness is being checked.
- **Needs response:** the next action belongs to the team.
- **Waiting for customer:** information or a decision is required from the customer.
- **Resolved:** the goal was achieved or question answered.
- **Closed:** no further action; the reason should be clear.

A state does not replace a next action. For “waiting for customer”, record what is expected and when to check again.

## Automation opportunities

Resend can send an acknowledgement to the customer and notify the owner. Supabase stores the response and CRM relationship. Calendar can show the follow-up deadline. Kanban fits a more complex sales or fulfilment process.

An automatic reply should confirm receipt, not promise an outcome nobody approved. Avoid reflecting the full customer response into email when it may contain private information.

## Quality and spam controls

- Validate server-side even when the browser validates fields.
- Rate-limit by IP, form and tenant context.
- Use a honeypot or other spam control that does not obstruct assistive technology.
- Normalise email and phone before duplicate checks.
- Never trust file names, MIME types or HTML; uploads require separate controls.
- Log a safe error code, not the entire submission.

## Metrics that help

Track form starts and completions, fields with errors, first-response time, resolution time, duplicate rate and outcome. Do not collect analytics without purpose: each metric should inform a decision.

## Publication checklist

- The form works by keyboard and on mobile.
- Labels and error messages belong to the correct fields.
- Required fields are minimal.
- Confirmation copy distinguishes receipt from final approval.
- The owner receives a notification or sees the record in a work queue.
- CRM does not create the same test contact repeatedly.
- Privacy and consent copy uses the correct language.
- Retention and deletion ownership is known.

## Related guides

- [Module selection](/en/docs/modules-overview)
- [Customer workflows](/en/docs/customer-workflows)
- [Supabase](/en/docs/supabase)
- [Resend](/en/docs/resend)
