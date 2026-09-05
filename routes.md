# Avaliku staatilise andmeallika register

See repository avaldatakse GitHubi `www` harust ja sisaldab ainult veebirakenduste poolt väliselt loetavat sisu.

## Aktiivsed tarbijad

- `oux.ee/routes.json`: OUX avalike lehtede SEO, Markdown-sisu ja koondatud Read-vaade.
- `extaas.com/routes.json`: Extaasi avalike route’ide SEO. Store’i tooted ise tulevad Supabase’i Stripe Sync tabelitest.
- `extaas.com/read`: tühi ümbersuunamise register; Extaasi Read-link avab OUX-i koondvaate.
- `workspace.extaas.com/read`: OUX Read-vaates kuvatav Workspace’i dokumentatsioon, blogi ja õigusinfo.
- `workspace.extaas.com/gift.json`: Workspace’i krediidikingituste serveripoolne andmeallikas.
- `workspace.extaas.com/deals.json`: Workspace’i kampaaniate serveripoolne andmeallikas.
- `oux.ee/calendar_events.json`: OUX avalike kalendrisündmuste andmeallikas.

## Rakendustes paiknev sisu

Workspace’i UI tekstid ja tõlked asuvad rakenduses `src/lib/assets/i18n`. Moodulite, integratsioonide, dashboard’i ja krediidivaadete vanu staatilisi koopiaid enam runtime’is ei laadita.

## Reeglid

- Read-sisu route registreeritakse vastava domeeni `read/routes.json` failis.
- Tavaleht registreeritakse domeeni juure `routes.json` failis ja vajab vastavat `meta.json` faili.
- Saladusi, võtmeid ja keskkonnamuutujate väärtusi siia ei lisata.
- `layout` meta-välja ei kasutata; paigutuse määrab rakenduse SvelteKit route.
