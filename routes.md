# Avaliku staatilise andmeallika register

See repository avaldatakse GitHubi `www` harust ja sisaldab veebirakenduste poolt väliselt loetavat sisu.

## Aktiivsed tarbijad

- `oux.ee/pages/routes.json`: OUX avalike tavalehtede register.
- `oux.ee/pages/read/meta.json`: OUX-i koondatud lugemisvaate kirjeldus.
- `routes.json`: kõigi teemade sisuregister. `source` on kaust repository juure suhtes; `path` säilitab avaliku URL-i; `network` on teema ID, mitte juurutamise hostname.
- `extaas.com/pages/routes.json`: Extaasi tavalehtede metaandmete register. Rakenduse kohalikud lehed töötavad ka siis, kui GitHub pole kättesaadav.
- `workspace/data/gift.json`, `workspace/data/deals.json` ja `workspace/i18n/`: säilitatud vanad andmed ja tõlked. Need ei muuda Workspace Core v2 kohalikku andmemudelit.
- `oux.ee/calendar_events.json`: OUX avalike kalendrisündmuste andmeallikas.

## Reeglid

- Teemade juured: `extaas.com`, `oux.ee`, `home_assistant` ja `workspace`. Igal teemal on `pages`, `blog`, `docs`, `legal-documents`, `campaigns` ja `changelog`.
- Tavalehe kaust on `<domeen>/pages/<slug>/`. Säilita `meta.json`, keelefailid ja lehe enda pildid samas kaustas. Registreeri see `pages/routes.json` failis.
- Artikkel asub `<teema>/<liik>/<slug>/`; aastapõhine sisu `<teema>/<liik>/<aasta>/<slug>/`. Lisa `en.md`, `et.md`, `meta.json` ning kirje juure `routes.json` registrisse.
- Teemade ID-d on `oux.ee`, `extaas.com`, `workspace` ja `home-assistant`. Vana `workspace.extaas.com` filtri URL toimib jätkuvalt OUX-i ühilduvusaliasena.
- Jagatud pildid on `assets/images/`, ikoonid `assets/icons/`, allalaaditavad failid `assets/files/`. Workspace'i pitchdeck asub `assets/images/workspace/pitchdeck/`.
- Vanad failid eemaldatakse alles pärast tarbijate üleviimist. Markdowni ja metaandmete raw GitHubi pildiviited peavad osutama uutele failiteedele; avalike dokumentide URL-id ei muutu.
- Varem avaldatud `osauhing-x.js` embed-aadress jääb tagasiühilduvuse tõttu juure alles.
- Saladusi ega keskkonnamuutujate väärtusi siia ei lisata.

## Kontroll

`node --test tests/*.test.mjs` kontrollib registrit, kõiki kakskeelseid artikleid, avalikke lehti, failiviiteid ning Workspace v2 näiteid. Sama nimega varasem Extaasi artikkel säilib `extaas.com/blog/2026/extaas-ecosystem-archive/`; OUX-i praegune artikkel on `oux.ee/blog/2026/extaas-ecosystem/`.
