# Õpetus: loo integratsioon

Vaata [integratsiooni kohustuslikku ja valikulist struktuuri](/et/docs/package-structure). Enda kood, `manifest.json`, `CHANGELOG.md`, `README.md` ja `api/` on kohustuslikud; `cron/`, `automation/` ning `docs/` on valikulised. `api/` kirjeldab moodulitele ja Applicationidele pakutavat liidest.

Integratsioonil on püsiv namespaced integration_id ja selgelt deklareeritud toimingud. Tarbija saab toimingu tulemuse, mitte integratsiooni salavõtmed.

Loo integrations/example-service ja package.json sisuga `{"type":"module","private":true}`.

## manifest.json

```json
{
  "schema_version": 2,
  "id": "example-service",
  "integration_id": "com.example.service",
  "kind": "integration",
  "version": "1.0.0",
  "name": "Example Service",
  "description": "A minimal declared server action.",
  "environment": [
    {
      "key": "EXAMPLE_SERVICE_KEY",
      "required": false,
      "secret": true,
      "description": "Optional example credential; never returned to the browser."
    }
  ],
  "actions": [
    {
      "id": "connection-status",
      "entry": "server/actions.js",
      "export": "connectionStatus"
    }
  ],
  "runtime": {
    "type": "none"
  },
  "cron": []
}
```

## server/actions.js

```js
export function connectionStatus({ environment }) {
  return { configured: Boolean(environment.EXAMPLE_SERVICE_KEY) };
}
```

See on kohalik õppenäide, mitte päris välisteenuse ühenduse kontroll. See kontrollib ainult valikulise seadistuse olemasolu. Ära tagasta environment’i ega võtmeid.

## Päris teenuse toimingud

Valideeri payload, kasuta kindlat HTTPS teenusepäritolu, lisa timeout, kontrolli vastuse olekut ja tagasta vaid vajalikud väljad. Ära võta brauserist suvalist URL-i. Kustutavad või tasulised toimingud vajavad selget kinnitust ja duplikaatide kaitset.

Võtmed jäävad keskkonnaväljadesse, mitte brauseri bundle’isse. Toimingud töötavad piiratud alamprotsessides; see ei muuda tundmatut koodi usaldusväärseks.

## Ühenda tarbija

Deklareeri tarbija integrations massiivis `com.example.service` ja loetle actions õigustes `connection-status`. Tavalise pakettidevahelise kutse puhul peavad tarbija ja integratsioon kuuluma samasse kontrollitud keskkonna/allikagruppi.

Paigalda mõlemad, luba need, täida nõutud seadistused ning kontrolli lubatud ja deklareerimata toimingut. Jätka [pakettide ühendamisega](/et/docs/connect-packages).
