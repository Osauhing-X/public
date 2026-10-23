# Workspace v2 pakettide loomine

Alusta ühest väikesest paketist. Core avastab selle Storage’i allikast ja kopeerib paigaldamisel püsivatesse andmetesse. Oma funktsiooni lisamiseks pole vaja Core’i teekondi muuta.

## Hoidla struktuur

Hoia paketid hoidlas `integrations/`, `modules/` ja `applications/` all. Allpool on iga paketiliigi **kohustuslik** struktuur ning sellest eraldi **valikulised** failid ja kaustad. „Enda kood” tähendab paketi tegelikku lähtekoodi, mitte nõutud nimega kausta.

### Integratsioon

Kohustuslik:

- Enda kood — teenusega ühendamine ja integratsiooni toimingud.
- `manifest.json` — identiteet, versioon, seadistused ja deklareeritud võimekus.
- `CHANGELOG.md` — versioonide muudatused.
- `README.md` — eesmärk, paigaldamine ja kasutamise põhitõed.
- `api/` — integratsiooni liides ja leping, mille kaudu teised moodulid ning Applicationid temaga suhtlevad. Kirjelda lubatud päringuid, vastuseid ja õigusi; võtmed jäävad integratsiooni serveripoolele.

Valikuline:

- `cron/` — ajastatud ülesanded.
- `automation/` — Workspace’i automaatika ehitusplokid: päästikud, tingimused, toimingud ja valikud.
- `docs/` — põhjalikum juhend kasutajale ja arendajale, API näited ning kuupäevaga kontrollitud teenusepiirid.

### Moodul

Kohustuslik:

- Enda kood — mooduli kasutajaliides ja äriloogika.
- `manifest.json` — mooduli kirjeldus ja deklareeritud sõltuvused ning võimekus.
- `README.md` — eesmärk, seadistus ja kasutamine.

Valikuline:

- `CHANGELOG.md` — muudatuste ajalugu.
- `DOCS.md` — täiendav kasutaja- või arendajajuhend.
- `cron/` — ajastatud ülesanded.
- `automation/` — mooduli automaatika ehitusplokid.
- `api/` — mooduli enda andmeliides, mille kaudu **teised moodulid saavad andmeid pärida**. See ei ole üksnes mooduli enda haldusliidese API ega luba teistel kogu andmehoidlat lugeda.

### Application

Kohustuslik:

- Enda kood — rakenduse lähtekood või staatilise veebilehe HTML ja muud avalikud failid.
- `manifest.json` — rakenduse kirjeldus ja käivitusviis.
- `README.md` — paigaldamine, seadistamine ja kasutamine.

Valikuline:

- `CHANGELOG.md` — muudatuste ajalugu.
- `DOCS.md` — täiendav dokumentatsioon.
- `cron/` — ajastatud ülesanded vastavalt käivituskeskkonna toele.
- `api/` — rakenduse liidesed, kui rakenduse käivituskeskkond neid toetab. Staatiline HTML-rakendus ei saa kausta lisamisega serveripoolset API-t.

Need on pakettide autorlusnõuded. Validaatori läbimine ei asenda dokumentatsiooni ega tõenda, et iga kaustas nimetatud võimalus on teostatud. Lisakaustu võib kasutada, kui nende ülesanne on selge; need ei muuda kohustuslikku ja valikulist struktuuri.

### Näidispaigutus

```text
my-workspace-packages/
  modules/example-counter/
    manifest.json
    README.md
    package.json
    ui/index.html
    server/data.js
    api/                 # valikulised deklareeritud käsitlejad
    cron/                # valikulised ajastatud tööd
    automation/          # valikulised ehitusplokid
      triggers/
      conditions/
      actions/
      options/
  integrations/example-service/
    manifest.json
    README.md
    CHANGELOG.md
    package.json
    server/actions.js
    api/                 # deklareeritud käsitlejad ja API leping
    docs/                # valikuline: juhendid, näited ja kuupäevaga teenusepiirid
    cron/                # valikuline
    automation/          # valikulised triggers/conditions/actions/options
  applications/example-site/
    manifest.json
    README.md
    public/index.html    # static-käivitus ei vaja package.json faili
    api/                 # valikuline, serverivõimekusega rakendusele
    cron/                # valikuline, vastavalt manifesti lepingule
```

Kõigi kolme paketiliigi juures on README kohustuslik. Mooduli ja Applicationi CHANGELOG.md ning DOCS.md on valikulised; integratsiooni CHANGELOG.md ja api/ on kohustuslikud, docs/ valikuline. Node-näidete package.json sisaldab `{"type":"module","private":true}`; npm-sõltuvuste kasutamisel lisa versioonitud lockfile. Staatiline veeb ei vaja Node’i package.json faili, kuid vajab endiselt manifesti, README-d ja enda avalikke faile.

Kaustad on autorlusreegel, mitte ligipääsuõigus. Kutsutavad käsitlejad ja ajastused tuleb manifestis deklareerida; api/, cron/ või automation/ lisamine üksi ei ava endpoint’i, käivita tööd ega anna ligipääsu teise paketi andmetele. Tühja valikulise kausta saab Gitis säilitada .gitkeep failiga. Hoia olemasoleva paketi käsitlejate teekonnad laiendamisel stabiilsena.

## Manifesti põhilised väljad

- `id`: püsiv väiketähtedes slug, 2–63 märki; ära muuda seda kergekäeliselt pärast avaldamist.
- `kind`: juhendites module, integration või application.
- `version`: versioonistring; avaldatud muudatusel suurenda versiooni.
- `environment`: kohustuslik massiiv, ka tühjana. Iga kirje määrab key, required ja description; võtmed märgi salajaseks.
- `icon`: valikuline turvaline `ui/name.svg` teekond.
- `integrations`: sõltuvused kasutavad püsivaid namespaced integratsiooni-ID-sid.
- `applications` ja `application_imports`: ühilduvus rakendustega ning avaliku sisu panused.
- `runtime`: sõltub paketi liigist; rakendused toetavad hallatavat `node`- või `static`-käivitust.
- `cron`: deklareeritud taustatööd; alusta tühja massiiviga.

Praegune validaator on Core’i `runtime/manifest.js`. Permissions- või migrations-meta ei tõenda OS-taseme isolatsiooni ega automaatset andmebaasimigratsiooni.

## Arendaja juhend

Kirjelda paigaldatud paketi tegelikku API-t, mitte välisteenuse kõiki võimalikke endpoint’e. Lisa iga deklareeritud toimingu päring, vastus, viga, kutsuja õigused, selgesõnaline ühendus ja kõrvalmõju. Too ohutud näited nii mooduli kui rakenduse jaoks ilma võtmeid neisse kopeerimata.

Teenuse limiidi juurde märgi pakett, mõõtühik, arvestus- või nullimisperiood, kontrollimise kuupäev ja ametlik allikas. Erista avaldatud limiiti, mõõdetud kasutust ning allesjäänud mahtu. Puuduv mõõdik tähendab teadmata väärtust, mitte nulli; kohaliku ketta maht ei ole pilveteenuse arvelduskvoot.

Integratsioon võib deklareerida ka andmepõhise `dashboard`-vaate, millest omanik laadib mõõdikuid, mahuribasid, märkusi ja tabeli. See ei sisesta Core’i paketi HTML-i ega skripte. Vaata [integratsioonide viidet](/et/docs/integrations).

Automaatika kirjeldused kuuluvad paigaldatud paketile. Käivitatav toimingu- või tingimusplokk vajab korrektset teostust; automaatne teenusesündmuste edastamine pole veel ühendatud. Kausta või päästiku nime olemasolu ei tohi esitada töötava automaatikana.

## Usaldus ja testimine

Paigalda ainult usaldatud pakette. Korrektne manifest kontrollib kuju, mitte äriloogika turvalisust. Testi ühekordsete andmetega, keela lubamatu ligipääs, säilita veal mustand ning hoia võtmed koodist ja logidest väljas.

Jätka [mooduli](/et/docs/create-module), [integratsiooni](/et/docs/create-integration) või [rakenduse](/et/docs/create-application) loomisega.
