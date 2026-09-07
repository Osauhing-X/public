# Email and Audience: reliable customer communication

Audience answers “to whom?” and Email answers “what and how should we send?”. Resend delivers the message, Supabase can store assets and contacts, and OpenAI can help draft. None of these replaces consent, human review or a clear communication purpose.

<div class="grid gap _3" style="grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); margin-block: 1.5rem;">
  <div class="css _radius _padding"><span class="css _color _dark">AUDIENCE</span><h3>The right person</h3><p>Contact, consent source, tags, segment and unsubscribe state.</p></div>
  <div class="css _radius _padding"><span class="css _color _dark">EMAIL</span><h3>The right message</h3><p>Sender, subject, template, content, attachments, preview and credit cost.</p></div>
  <div class="css _radius _padding"><span class="css _color _dark">RESEND</span><h3>A verifiable result</h3><p>Accepted, delivered, bounced and rejected do not mean the same thing.</p></div>
</div>

## Marketing and transactional email

| Email type | Purpose | Examples | Important boundary |
| --- | --- | --- | --- |
| Transactional | complete a customer-initiated or agreed activity | booking confirmation, rental state, payment confirmation | content must remain directly related to the activity |
| Marketing | promote, remind or develop interest | newsletter, campaign, product announcement | requires a suitable legal basis and unsubscribe route |
| Operational | help the Workspace owner run the service | low credits, integration failure, new request | send only to a role expected to react |

Do not hide marketing content inside transactional email. A booking confirmation does not automatically grant permission for future campaigns.

## Minimum contact quality

A useful contact contains at least a normalised email, source, creation time, consent/purpose information and current unsubscribe state. Name, language, company, tags and preferences add value only when actually used.

When comparing email addresses, handle surrounding whitespace and normally case-insensitive form, but avoid risky provider-specific “smart” rewrites. Preserve the user's entered value for display where useful and keep a separate normalised value for lookup.

## Adding contacts

A contact may come from voluntary signup, a customer relationship, import or administrator entry. Document the purpose for every source. For imports, verify:

- where the list came from;
- whether sending rights can be demonstrated;
- when contacts last confirmed interest;
- whether unsubscribed and bounced addresses were removed;
- whether columns, language and tags map correctly;
- whether duplicates merge instead of receiving the same message twice.

A purchased, scraped or unknown-origin list damages trust and sender-domain reputation and is not suitable.

## Segmentation

A segment should follow message purpose. Good criteria include language, customer state, service used, region, demonstrated interest or last activity. “All contacts” is a poor segment when the message concerns only a small subset.

Before sending, show segment size and sample records. Always exclude unsubscribed, suppressed and purpose-ineligible contacts.

## Sender identity

The sender name must be recognisable. `From` uses a Resend-verified domain; `reply-to` should reach a mailbox somebody monitors. Avoid `no-reply` when customers may legitimately need to respond.

SPF, DKIM and where appropriate DMARC help recipients authenticate the sender. Successful DNS verification does not guarantee reputation: list quality, complaints, bounces and content still affect results.

## Templates, components and attachments

- A **template** is a complete email layout and rendering function.
- A **component** is a reusable block such as header, button, footer or legal copy.
- An **attachment** is a reusable or one-time file.
- **Payload data** supplies customer, activity and link values to a template.

A JavaScript template must export a rendering function and operate only on provided data. Do not let a tenant user execute unreviewed server code. Escape dynamic values for HTML unless their source is fully trusted.

Attachments increase message size and may reduce deliverability. Prefer a secure expiring download link for large or private files. A public image URL must use HTTPS and remain available to recipients.

## Premium email that stays readable

A good email uses one clear primary goal, a short introduction, scannable paragraphs, strong contrast and one primary CTA. Important information must be real text, not only an image. The CTA link should remain understandable without button styling.

Use brand colour for emphasis, not the entire text background. Email clients support CSS unevenly, so prefer simple layout, inline styles in email rendering and a working fallback. Website CVI classes cannot be assumed in the recipient mailbox—they fit Workspace and docs HTML, not an external email dependency.

## Subject and preheader

Subject should state why the email arrived. Avoid misleading urgency, excessive capitalisation and promises the content does not fulfil. The preheader supplements rather than repeats the subject.

Examples:

- `Your booking request was received – we will respond within one business day`
- `Rental request #R-1042 has been approved`
- `August product updates and one required action`

## Using OpenAI

AI can draft subject variants, shorten copy, adjust tone, translate a draft or create a first HTML template. Provide purpose, recipient, tone, language, required facts, forbidden details and length.

Do not send the entire Audience list, API keys, payment data or irrelevant customer history to the model. Review output like a new employee's draft: facts, links, dates, prices, names and legal language.

## Pre-send checklist

1. Purpose and email type are clear.
2. Segment and expected recipient count were reviewed.
3. `from`, `reply-to`, subject and preheader are correct.
4. Variables render with missing optional data.
5. Links use the correct tenant domain and HTTPS.
6. Unsubscribe is visible and works for marketing.
7. Mobile and dark mode were checked.
8. Attachments open and have reasonable size.
9. A test reached at least one real mailbox.
10. Credit estimate and available balance are clear.

## Credits

Composing, previewing and managing templates/components need not consume credits. Cost occurs at the value event: real delivery. Show an estimate based on recipient count before sending and the actual result afterward according to platform rules.

Repeated clicks must not resend a campaign or consume credits twice. A campaign should have a unique send ID and state such as `draft → queued → sending → completed/failed`.

## Delivery result meanings

- **Queued:** waiting for processing.
- **Accepted/Sent:** provider accepted the message; this is not proof of inbox delivery.
- **Delivered:** receiving server confirmed delivery.
- **Bounced:** address or receiving server rejected the message.
- **Rejected:** provider refused the send due to configuration or policy.
- **Complained:** recipient reported spam; suppress the contact.
- **Unsubscribed:** recipient opted out of marketing for that purpose.

## After sending

Review bounces, complaints, unsubscribes and technical link behaviour. Do not judge success only by opens: privacy protection can make open tracking inaccurate. Business outcome—reply, booking, sale or completed activity—is often more useful.

Remove hard bounces from future delivery. For a temporary bounce, use limited retry rather than endless delivery. A rise in complaints or unsubscribes means audience, frequency or content needs adjustment.

## Related guides

- [Resend](/en/docs/resend)
- [OpenAI](/en/docs/openai)
- [Forms and CRM](/en/docs/forms-and-crm)
- [Choosing integrations](/en/docs/integrations-guide)

