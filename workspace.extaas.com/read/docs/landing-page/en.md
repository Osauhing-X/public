# Tenant landing page

The tenant landing page is the customer's public surface. It is not an account window and must not expose private workspace data. Its job is to show the customer's brand, public information and enabled modules.

## Public content

The tenant landing page may show:

- business name and public description;
- brand colors and public media;
- public Pages content;
- Booking services;
- Rent items;
- Store products;
- public contact actions;
- links to legal or support pages.

Private invoices, project notes, workspace settings, integration keys and customer lists must stay in Workspace.

## Workspace relationship

All private management belongs in `workspace.extaas.com`. If the customer needs invoices, projects, account data or private module settings, send them to Workspace.

<div class="css _radius _padding" style="margin-block: 1.5rem;">
  <h3>Useful rule</h3>
  <p>The tenant domain shows what the customer's customer may see. Workspace shows what the portal owner and allowed users may manage.</p>
</div>

## Module visibility

A public module should be visible only when:

1. the module is enabled;
2. required settings are complete;
3. required integrations are connected;
4. public data exists;
5. the tenant DNS route resolves correctly.

If a module is not ready, hide it from the public surface or show a polished unavailable state that does not expose private setup details.

## Suggested page sections

Use sections only for real page blocks, not tiny layout wrappers.

```text
Hero
Services or modules
Public pages/content
Booking/Rent/Store section
Contact or support
Footer/legal links
```

## Content template

```text
Business name:
Short public description:
Primary action:
Secondary action:
Enabled modules:
Support email/phone:
Legal links:
Public media:
```

## FAQ

### Can a tenant landing page show account settings?

No. Account and workspace settings belong in Workspace.

### Can tenant customers ask for help?

Yes. A tenant portal can expose a support/chat entry point. The support thread should be created in the configured forum/channel and linked to the tenant/customer context.

### Can public colors differ from Extaas?

Yes for tenant portals. The main Extaas and Workspace surfaces should keep a unified corporate visual identity; tenant portals can use the customer's brand.
