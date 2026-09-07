# Avaliku staatilise andmeallika register

See repository avaldatakse GitHubi `www` harust ja sisaldab veebirakenduste poolt väliselt loetavat sisu.

## Aktiivsed tarbijad

- `oux.ee/routes.json`: OUX avalike tavalehtede register.
- `network/meta.json`: OUX-i koondatud Read-vaate kirjeldus.
- `network/routes.json`: kõigi domeenide Read-sisu keskne register, kus iga kirje määrab lähtekausta, avaliku URL-i ja domeeni.
- `network/Our Domains/<domain>/...`: domeenile kuuluv blogi-, dokumentatsiooni- ja õigusinfo.
- `extaas.com/routes.json`: Extaasi avalike route'ide SEO; `/read` kasutab Networkis asuvat ümbersuunamise metat.
- `workspace.extaas.com/gift.json` ja `deals.json`: Workspace'i serveripoolsed andmeallikad.
- `oux.ee/calendar_events.json`: OUX avalike kalendrisündmuste andmeallikas.

## Reeglid

- Uus Read-sisu lisatakse `network` alla, mitte domeeni `read` kausta.
- Read-kirje registreeritakse `network/routes.json` failis väljadega `source`, `path` ja `domain`.
- `source` on kaust Networki juure suhtes; `path` on avalik `/blog`, `/docs` või `/legal-documents` URL.
- Tavaleht registreeritakse endiselt vastava domeeni juure `routes.json` failis.
- Saladusi ega keskkonnamuutujate väärtusi siia ei lisata.
