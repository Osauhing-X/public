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

Deklareeri tarbija integrations massiivis integratsiooni aadress ja loetle actions õigustes `connection-status`. Vana `com.example.service` leping jääb toetatuks. Väljaandjapõhine leping on kontrollitud 25.10.2026: GitHubi paketi aadress on näiteks `github:osauhing-x/supabase`, kus autor tuleb Core'i kontrollitud paigaldusallikast, mitte manifesti `author` tekstist. Official catalogue ja sama GitHubi autori pakett kasutavad sama nimeruumi, kuid iga paigaldatud ühendus jääb eraldi valitavaks.

Uue lepinguga deklaratsioon on näiteks `{"integrations":[{"id":"github:osauhing-x/supabase","required":true,"actions":["public-config"]}]}`. Lisaks deklareerib Application `integration_gateway: 1` või moodul `module_service_gateway: 1`. Kasutaja peab Service connections all valima konkreetse paigalduse; aadress üksi ei anna võtmetele ega teise paketi ühendusele ligipääsu. Uue Core'i paigalduse järel näitab integratsiooni **API endpoints** vaade selle tegelikku aadressi ja toimingute näiteid. Kuni seda aadressi seal ei kuvata, kasuta senist lepingut.

Valikuline integratsiooni `api_id` määrab aadressi viimase osa, näiteks `my_private`, paketi senist `id` või paigalduse URL-i muutmata. ZIP- ja võrguketta paketi manifestis on selle asemel vaja `domain` välja ning domeeni HTTPS-kinnitust. Pelgalt võõra domeeni manifesti kirjutamine ei tõenda selle omamist. API-vaade annab avaliku `/.well-known/workspace-packages.json` kinnituse jaoks paigaldatud lähtekoodi sõrmejälje; võtmeid ega kliendiandmeid sellesse faili ei panda. Paketi uuendamine või kopeerimine nõuab uut kinnitust.

Uue serveriliidese päring läheb `POST /@_integrations/call` aadressile. Päised on `Authorization: Bearer <CORE_APPLICATION_TOKEN>` ja `Content-Type: application/json`; keha on näiteks `{"provider":"github:osauhing-x/supabase","action":"public-config","payload":{}}`. Alternatiiv on päis `X-Workspace-Provider` või keha `github`/`domain` koos `id` väljaga. Vasturääkivad valikud lükatakse tagasi. Kasuta Applicationile antud `CORE_URL` väärtust; token ja päring jäävad serverisse, mitte brauseri JavaScripti.

Paigalda mõlemad, luba need, täida nõutud seadistused ning kontrolli lubatud ja deklareerimata toimingut. Jätka [pakettide ühendamisega](/et/docs/connect-packages).
