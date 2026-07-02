# Resend integration

Resend sends customer emails, audience campaigns, booking confirmations, rental updates, invoice reminders and low-credit notifications. It is a workspace integration and the API key must stay server-side.

## Required settings

- API key used only on the server.
- Sender name.
- Sender email/domain.
- Reply-to address when needed.
- Module email bodies: booking notify, booking confirm, rent notify, rent confirm and status updates.
- Optional reusable assets: templates, components, attachments and media.

## Email module

The Email module should support:

- composing a campaign;
- selecting audience recipients;
- previewing the rendered email;
- reusing templates and components;
- attaching managed assets;
- sending test emails;
- logging send results.

Templates can be plain HTML or a JavaScript file that returns HTML from the sending payload.

```js
export default function template({ customer, actionUrl }) {
  return `
    <h1>Hello ${customer.name}</h1>
    <p>Your booking has been confirmed.</p>
    <a href="${actionUrl}">View status</a>
  `;
}
```

## Module email examples

| Flow | Suggested email |
| --- | --- |
| Booking request received | Notify owner, include customer details and requested time. |
| Booking confirmed | Tell customer the time, location and cancellation link. |
| Rent request approved | Tell customer the rental period and next step. |
| Rent canceled | Confirm the cancellation and support contact. |
| Low credits | Notify workspace owner before paid actions pause. |
| Audience unsubscribe | Confirm that the contact was removed from marketing emails. |

## Credit logic

Writing copy, editing templates, adding components and managing attachments is free. Credits are used when an email is actually sent to a deliverable recipient.

Recommended rule:

```text
credits_used = delivered_recipient_count
```

Bounced or rejected delivery should be logged. Whether credits are refunded depends on the operational policy for that module.

## Testing checklist

1. Verify the sender domain in Resend.
2. Send a test email from Workspace.
3. Confirm the HTML preview matches the final email.
4. Check unsubscribe/customer action links.
5. Check logs after sending.
6. Confirm no API key is visible in browser devtools.

## FAQ

### Can tenants edit email copy?

Yes, if the module gives them safe template fields. Avoid letting untrusted users edit server-side JavaScript without review.

### Can OpenAI help write email content?

Yes. Use OpenAI for drafts, subject lines and reusable components, but do not send secrets or full private customer datasets to the model.

### What should happen if Resend is missing?

The module should show a setup state in Workspace and public customer actions that require email should either be hidden or clearly explain that the action is unavailable.
