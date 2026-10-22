# Publish a Website application

In v2 the public site belongs to an Application, not to a shared tenant portal. Core remains the private package administrator. The public Workspace product page is [extaas.com/@/workspace](https://extaas.com/@/workspace); it is not your installation's administration address.

## Build the page

1. Install Website and attach its Routes module.
2. Create a route with the desired locale, title and content.
3. Attach compatible content modules and place their declared import tokens where needed.
4. Preview with a dedicated test record.
5. Publish only permitted fields, never internal notes or credentials.

Routes is the page/content coordinator. Booking, Rent, Store and Forms can contribute their own public content when their manifest and configuration support it.

## Assign a domain

Use dedicated-port exposure, start the application and confirm healthy. Set its exact hostname in Domains. Configure a reverse proxy or Cloudflare to send traffic to Core while preserving the original Host header.

A domain binding does not create DNS, map a firewall port or implement application authentication automatically. [Cloudflare setup](/en/docs/cloudflare) explains the connector topology.

## Acceptance checks

Verify the root and locale routes, static assets, browser navigation, error pages, forms, HTTPS and logged-out access. Test private access separately. The customer must know whether a request was received, approved or paid.

Extaas account, company and invoice management lives in OUX Self-service. It is separate from a customer's own Website application.
