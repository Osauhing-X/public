# Workspace v2 pakettide loomine

Alusta ühest väikesest paketist. Core avastab selle Storage’i allikast ja kopeerib paigaldamisel püsivatesse andmetesse. Oma funktsiooni lisamiseks pole vaja Core’i teekondi muuta.

## Hoidla struktuur

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
    docs/                # seadistus, päringud, näited ja kuupäevaga teenusepiirid
    cron/                # valikuline
    automation/          # valikulised triggers/conditions/actions/options
  applications/example-site/
    manifest.json
    README.md
    public/index.html    # static-käivitus ei vaja package.json faili
    api/                 # valikuline, serverivõimekusega rakendusele
    cron/                # valikuline, vastavalt manifesti lepingule
```

Igal paketil on manifest ja selle juures peaks olema seadistust ning piiranguid selgitav README. Moodul ja rakendus võivad lisada CHANGELOG.md ning DOCS.md või docs/ kausta. Node-näidete package.json sisaldab `{"type":"module","private":true}`; npm-sõltuvuste kasutamisel lisa versioonitud lockfile. Staatiline veeb vajab ainult manifesti ja avalikke faile.

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
