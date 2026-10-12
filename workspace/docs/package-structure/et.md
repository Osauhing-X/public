# Workspace v2 pakettide loomine

Alusta ühest väikesest paketist. Core avastab selle Storage’i allikast ja kopeerib paigaldamisel püsivatesse andmetesse. Oma funktsiooni lisamiseks pole vaja Core’i teekondi muuta.

## Hoidla struktuur

```text
my-workspace-packages/
  modules/example-counter/
    manifest.json
    package.json
    ui/index.html
    server/data.js
  integrations/example-service/
    manifest.json
    package.json
    server/actions.js
  applications/example-site/
    manifest.json
    package.json
    server/index.js
```

Igal paketil on manifest. Allolevate JavaScripti näidete package.json sisaldab `{"type":"module","private":true}`. npm-sõltuvuste kasutamisel lisa versioonitud lockfile.

## Manifesti põhilised väljad

- `id`: püsiv väiketähtedes slug, 2–63 märki; ära muuda seda kergekäeliselt pärast avaldamist.
- `kind`: juhendites module, integration või application.
- `version`: versioonistring; avaldatud muudatusel suurenda versiooni.
- `environment`: kohustuslik massiiv, ka tühjana. Iga kirje määrab key, required ja description; võtmed märgi salajaseks.
- `icon`: valikuline turvaline `ui/name.svg` teekond.
- `integrations`: sõltuvused kasutavad püsivaid namespaced integratsiooni-ID-sid.
- `applications` ja `application_imports`: ühilduvus rakendustega ning avaliku sisu panused.
- `runtime`: sõltub paketi liigist; rakendused vajavad hallatavat Node-käivitust.
- `cron`: deklareeritud taustatööd; alusta tühja massiiviga.

Praegune validaator on Core’i `runtime/manifest.js`. Permissions- või migrations-meta ei tõenda OS-taseme isolatsiooni ega automaatset andmebaasimigratsiooni.

## Usaldus ja testimine

Paigalda ainult usaldatud pakette. Korrektne manifest kontrollib kuju, mitte äriloogika turvalisust. Testi ühekordsete andmetega, keela lubamatu ligipääs, säilita veal mustand ning hoia võtmed koodist ja logidest väljas.

Jätka [mooduli](/et/docs/create-module), [integratsiooni](/et/docs/create-integration) või [rakenduse](/et/docs/create-application) loomisega.
