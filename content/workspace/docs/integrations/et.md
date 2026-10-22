# Integratsioonide viide

Integratsioon ühendab teenuse deklareeritud serveritoimingute ja selgelt määratud keskkonnaväärtuste kaudu. See pole ainult võtme sisestamise vorm.

Loe [seadistusjuhendit](/et/docs/integrations-guide), [integratsiooni loomise õpetust](/et/docs/create-integration) ja [pakettide ühendamist](/et/docs/connect-packages).

Tarbija kasutab püsivat integration_id-d ja deklareeritud toiminguõigusi. Allikagrupi piir ei lase kõrvalisel paketil ühendust pärida. Võtmed jäävad serverisse; tagasta ainult vajalikud tulemused.

## Paketi juhend ja ühenduse seadistused

Paigaldatud integratsiooni README ja docs/ kirjeldavad tegelikke toimingunimesid, päringuid, vastuseid, õigusi ja piiranguid. Välisteenuse võimalus ei tähenda automaatselt teostatud Workspace’i toimingut. Paketilimiidil peab olema kontrollimise kuupäev ja ametlik allikas; kasutus vajab tegelikku mõõtmist.

Environment-tabelis saab omanik võtmeid filtreerida, rea avada ja väärtust muuta. Värskelt sisestatud mustandit saab muutmise ajal vaadata; salvestatud saladust brauserisse tagasi ei anta. Säilitamiseks jäta see muutmata või sisesta asendus. Maskeeritud salvestatud väärtus ei tähenda tühja võtit.

Olemasolev ühendusprofiil on täpsem valik juba salvestatud seadistuste taaskasutamiseks ilma võtmeid kopeerimata. See ei ole teine andmebaas, tellimus ega uus teenusekonto. Teise allika profiil vajab endiselt selgesõnaliselt lubatud teenuseühendusi; sarnane nimi ei anna ligipääsu.

## Valikulised kohandatud aruanded

Integratsioon võib pakkuda andmepõhist dashboard-vaadet. Kohalik administraator laadib või värskendab seda eraldi; integratsioonilehe avamine ei käivita teenusekoodi. Core kuvab piiratud tekstiga kaarte, mahuribasid, märkusi ja tabelit, mitte suvalist HTML-i või skripte. Tulemust hoitakse 60 sekundit vahemälus ning tõrge ei tohi avaldada teenuse toorvastust ega saladusi.

Arendaja lisab manifesti viite olemasolevale käsitlejale:

```json
{"dashboard":{"entry":"server/dashboard.js","export":"dashboard","title":"Service capacity","description":"Measured usage for this connection."}}
```

```js
export function dashboard() {
  return {
    metrics: [{label: 'Capacity', value: 'Unavailable', detail: 'No measurement connected'}],
    notes: ['Unavailable is not a zero measurement.']
  };
}
```

Näide ei tee teenusepäringut. Päris käsitleja saab ainult talle määratud deklareeritud keskkonnaseadistused ning peab kasutama kindlat dokumenteeritud lugemis-API-t, piiratud vastusemahtu ja ajapiiri. Paigaldatud serverikood on endiselt usaldatud kood, mitte võrgu-liivakast. Aruande värskendamine ei luba kirjade saatmist, makseid, andmete puhastamist ega muid muutvaid toiminguid.
