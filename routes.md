# Avaliku staatilise andmeallika register

See repository avaldatakse GitHubi `www` harust ja sisaldab veebirakenduste poolt väliselt loetavat sisu.

## Aktiivsed tarbijad

- `content/oux.ee/pages/routes.json`: OUX avalike tavalehtede register.
- `content/oux.ee/pages/read/meta.json`: OUX-i koondatud lugemisvaate kirjeldus.
- `routes.json`: kõigi teemade sisuregister. `source` on kaust repository juure suhtes; `path` säilitab avaliku URL-i; `network` on teema ID, mitte juurutamise hostname.
- `content/extaas.com/pages/routes.json`: Extaasi tavalehtede metaandmete register. Rakenduse kohalikud lehed töötavad ka siis, kui GitHub pole kättesaadav.
- `content/workspace/data/gift.json`, `content/workspace/data/deals.json` ja `content/workspace/i18n/`: säilitatud vanad andmed ja tõlked. Need ei muuda Workspace Core v2 kohalikku andmemudelit.
- `content/oux.ee/calendar_events.json`: OUX avalike kalendrisündmuste andmeallikas.

## Reeglid

- Teemade juured: `content/extaas.com`, `content/oux.ee`, `content/home_assistant` ja `content/workspace`. Igal teemal on `pages`, `blog`, `docs`, `legal-documents`, `campaigns` ja `changelog`.
- Tavalehe kaust on `content/<domeen>/pages/<slug>/`. Säilita `meta.json`, keelefailid ja lehe enda pildid samas kaustas. Registreeri see `pages/routes.json` failis.
- Artikkel asub `content/<teema>/<liik>/<slug>/`; aastapõhine sisu `content/<teema>/<liik>/<aasta>/<slug>/`. Lisa `en.md`, `et.md`, `meta.json` ning kirje juure `routes.json` registrisse.
- Teemade ID-d on `oux.ee`, `extaas.com`, `workspace` ja `home-assistant`. Vana `workspace.extaas.com` filtri URL toimib jätkuvalt OUX-i ühilduvusaliasena.
- Jagatud pildid on `assets/images/`, ikoonid `assets/icons/`, allalaaditavad failid `assets/files/`. Workspace'i pitchdeck asub `assets/images/workspace/pitchdeck/`.
- Vanad failid eemaldatakse alles pärast tarbijate üleviimist. Markdowni ja metaandmete raw GitHubi pildiviited peavad osutama uutele failiteedele; avalike dokumentide URL-id ei muutu.
- Varem avaldatud `osauhing-x.js` embed-aadress jääb tagasiühilduvuse tõttu juure alles.
- Saladusi ega keskkonnamuutujate väärtusi siia ei lisata.

## Kontroll

Sisu üleviimisel kontrolliti registrit, kakskeelseid artikleid, avalikke lehti, failiviiteid ning Workspace v2 näiteid. Testide kaust ei kuulu enam avalikku sisuhoidlasse. Sama nimega varasem Extaasi artikkel säilib `content/extaas.com/blog/2026/extaas-ecosystem-archive/`; OUX-i praegune artikkel on `content/oux.ee/blog/2026/extaas-ecosystem/`.
