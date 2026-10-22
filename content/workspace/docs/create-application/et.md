# Õpetus: loo veebirakendus

Rakendus võib olla hallatav Node-protsess või tavaline HTML-veebileht. Vali staatiline teenindamine, kui serveriloogikat pole vaja; autentimise, integratsioonikutsete ja dünaamiliste endpoint’ide jaoks kasuta Node’i.

## Tavaline HTML: ilma build’i ja oma serverita

Loo HTML-fail `applications/example-static/public/index.html`. Lisa `public/` alla ainult teadlikult avalikud CSS-i, brauseri JavaScripti ja pildifailid. Selle kõrvale lisa manifest:

```json
{"schema_version":2,"id":"example-static","kind":"application","version":"1.0.0","name":"Example Static","environment":[],"exposure":{"mode":"port"},"runtime":{"type":"static","port":4180,"document_root":"public","healthcheck":{"path":"/"}},"cron":[]}
```

package.json faili, npm install’i, build-käsku ega oma Node-serverit pole vaja. Avalikus kaustas peab olema index.html. Core ei kuva kaustaloendit, punktiga algavaid faile, väljapoole viivaid sümbollinke ega toetamata failivorminguid ning tõkestab teekonnaga kaustast väljumise. Staatiline rakendus ei saa keskkonnasaladusi ega Core’i Application-tokenit ja ei saa teha serveripoolseid integratsioonikutseid. Core’i teekonna kaudu avamisel kasuta suhtelisi failiviiteid; juurest algavad failiaadressid vajavad eraldi porti või domeeni. Staatiline teenindamine ei loo kasutajakontosid ega avalda saiti automaatselt.

## Node: serveripoolsed võimalused

Järgnev minimaalne Node-veeb kuvab avalehe ja tervisekontrolli ilma npm-sõltuvusteta.

Loo applications/example-site ja package.json sisuga `{"type":"module","private":true}`.

## manifest.json

```json
{
  "schema_version": 2,
  "id": "example-site",
  "kind": "application",
  "version": "1.0.0",
  "name": "Example Site",
  "description": "A minimal dedicated-port Node website.",
  "exposure": {
    "mode": "port"
  },
  "environment": [],
  "runtime": {
    "type": "node",
    "command": [
      "node",
      "server/index.js"
    ],
    "port": 4180,
    "restart": "on-failure",
    "healthcheck": {
      "path": "/health"
    }
  },
  "cron": []
}
```

## server/index.js

```js
import { createServer } from 'node:http';
const port = Number(process.env.PORT);
if (!Number.isInteger(port)) throw new Error('Core must supply PORT.');
createServer((request, response) => {
  if (request.url === '/health') {
    response.writeHead(200, { 'Content-Type': 'text/plain' }); return response.end('ok');
  }
  if (request.method !== 'GET' || request.url !== '/') {
    response.writeHead(404); return response.end('Not found');
  }
  response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  response.end('<!doctype html><title>Example Site</title><h1>Hello from Workspace</h1>');
}).listen(port, process.env.HOST || '127.0.0.1');
```

## Käivituse leping

Core määrab HOST ja PORT. Samuti annab APPLICATION_DATA_PATH püsivatele andmetele, APPLICATION_SETTINGS deklareeritud seadistustele ning Core’i gateway võtme serveripoolsetele integratsioonikutsetele. CORE_APPLICATION_TOKEN ei tohi jõuda brauserisse.

Kasuta määratud PORT väärtust, mitte koodis fikseeritud porti. Manifesti port on algne soov; duplikaat võib saada teise vaba pordi.

Kompileeritava raamistiku jaoks lisa turvalised käsuargumentide massiivid runtime.preparation.install ja runtime.preparation.build alla. Kasuta lockfile’i. Runtime.command fail peab pärast build’i olemas olema.

## Ligipääs

`port` režiim lubab eraldi pordilt avamist ja avaldamist. Suuna pordid teadlikult; manifest ei muuda tulemüüri. `internal` kuulab loopback’il ja kasutab Core’i autentitud proksit; avaldamine on keelatud.

Praegu jagavad rakendused Core’i konteinerit. Ära luba rakendusepõhist Docker-isolatsiooni või jäiku mälukvoote.

## Kontrollimine

Paigalda, oota healthy olekut, ava määratud aadress, kontrolli avalehte ja /health teekonda, taaskäivita ning kontrolli uuesti. Avaldamiseks määra täpne domeen ja proksi. Näites pole kontosüsteemi: privaatseid kliendiandmeid ei tohi lisada enne autentimise loomist ja kontrollimist.
