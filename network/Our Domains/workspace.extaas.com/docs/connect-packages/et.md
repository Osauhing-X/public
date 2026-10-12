# Moodulite, integratsioonide ja rakenduste ühendamine

On kaks eri seost: moodul küsib lubatud integratsioonitoimingut või annab rakendusele avalikku sisu. Kumbki seos ei anna brauserile võtmeid.

## Moodul → integratsioon

Paigalda Example Service ja Example Counter samast kontrollitud allikagrupist. Täienda loenduri manifesti:

```json
{
  "schema_version": 2,
  "id": "example-counter",
  "kind": "module",
  "version": "1.1.0",
  "name": "Example Counter",
  "description": "Private counter with a scoped provider status action.",
  "environment": [],
  "integrations": [
    {
      "id": "com.example.service",
      "required": true,
      "actions": [
        "connection-status"
      ]
    }
  ],
  "ui": {
    "document": "ui/index.html",
    "data": {
      "entry": "server/data.js",
      "export": "manage"
    },
    "provider_actions": [
      {
        "id": "check-connection",
        "integration_id": "com.example.service",
        "action": "connection-status"
      }
    ]
  },
  "runtime": {
    "type": "none"
  },
  "cron": []
}
```

Lisa manage funktsiooni enne olemasolevaid lugemise/kirjutamise harusid:

```js
if (payload.operation === "integration-result") {
  if (payload.body?.action !== "check-connection") throw new Error("Unknown provider result");
  return { result: { configured: payload.body.result?.configured === true } };
}
```

UI saab sama workspace:request POST-silla kaudu saata keha:

```json
{"action":"provider","operation":"check-connection","payload":{}}
```

Core kontrollib sidet, sõltuvust ja toiminguõigust, kutsub integratsiooni ning annab tulemuse mooduli integration-result toimingule. Ebaõnnestunud teenusekutse ei tohi salvestada eduolekut.

## Rakendus → integratsioon

Rakenduse serverikood võib saata POST-päringu:

```text
CORE_URL/@_integrations/com.example.service/connection-status
Authorization: Bearer CORE_APPLICATION_TOKEN
Content-Type: application/json
```

Rakenduse manifest peab deklareerima sama sõltuvuse ja õiguse. Kasuta ainult Core’i antud URL-i ja koopiavõtit; ära pane neid avalikku HTML-i ega frontend-keskkonnamuutujatesse.

## Moodul → Website

Deklareeri applications ühilduvus ja application_imports kirje. Koodi booking kanooniline token on [import:booking]. Renderer on paketisisene JavaScripti export. ui.data.public_export annab ainult avalikud väljad; public_submit kontrollib avalikku sisendit.

Seo paigaldatud moodul Website’iga ja paiguta import Routes’i kaudu lehele. Avalik renderer peab kasutaja teksti kodeerima; kogu privaatset seisu ei avaldata.

## Kontrolli piire

Testi lubatud toimingut, deklareerimata toimingut, teist allikagruppi, puuduvat seadistust ja teist koopiat. Väljalogitud avalikku sisu testi privaatse CRUD-i kõrval eraldi. Moodul, integratsioon ja rakendus on sõltumatult versioonitud paketid.
