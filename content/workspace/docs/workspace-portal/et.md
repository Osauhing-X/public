# Workspace v2: üks Core, sinu valitud töövahendid

Workspace v2 on ise majutatav paketiplatvorm. Käivita Core Dockerit toetaval arvutil, NAS-il või serveril. Core haldab paigaldusi, seadistusi, rakenduste protsesse ja taustatööd; ärifunktsioonid tulevad paigaldatud pakettidest.

## Kolm ehitusplokki

| Osa | Otstarve | Näide |
| --- | --- | --- |
| Rakendus | Iseseisev hallatav Node-rakendus või staatiline HTML-veebileht | Website, kohandatud HTML-veeb |
| Moodul | Kindla töö jaoks mõeldud töövahend, vajadusel seotud rakendusega | Routes, Calendar, Customers CRM |
| Integratsioon | Serveripoolne ühendus deklareeritud toimingute ja võtmetega | GitHub, Resend, Stripe, Cloudflare |

Website-rakenduse Routes-moodul haldab avalikke teekondi. Ülejäänud sobivad moodulid annavad sisu deklareeritud importide kaudu. Moodul ei muutu automaatselt eraldi veebileheks.

## Millest alustada?

1. [Paigalda Core](/et/docs/getting-started).
2. Lisa pakettide allikas **Storage** vaates.
3. Seadista nõutud integratsioonid ja paigalda rakendus või moodul.
4. Kontrolli valmisolekut, tegelikku sisu ja vigade käsitlemist.
5. Avalda alles pärast autentimise, HTTPS-i ja varukoopiate kontrollimist.

Core’i haldus on privaatne. Avalik rakendus vastutab oma autentimise eest; domeeni lisamine ei loo kasutajakontosid.

## Paigaldus ja kliendikonto

**Integrations → Extaas Connect** sisaldab Workspace tokenit, litsentsi ja ametliku kataloogi haldust. Core’i Settings sisaldab kohaliku halduse ja paigalduse identiteeti. Extaasi kliendikonto ja arved asuvad [OUX Iseteeninduses](https://iseteenindus.oux.ee/et/account), mitte vana Workspace’i domeeni ühises tenant-portaalis.

Paigaldatud koopia säilib allika eemaldamisel. Uuendamiseks ühenda allikas uuesti. Paigalduse või püsivate andmete eemaldamine on eraldi toiming.

## Praeguse teostuse piirid

Node-rakendused töötavad Core’i konteineris hallatavate protsessidena. Staatilisi rakendusi teenindab Core’i failiserver ilma keskkonnasaladuste või Application-tokenita. Kumbki režiim ei loo igale rakendusele eraldi Docker-konteinerit. Paketitoimingud kasutavad piiratud alamprotsesse. Need kontrollid ei muuda tundmatut koodi automaatselt turvaliseks. Paigalda ainult usaldatud koodi.

Navigeerimine on jaotatud eesmärgi järgi:

- **Portal** (`/portal`): paigalduse ülevaade.
- **Library** (`/library/storage`, `/library/integrations`, `/library/modules`, `/library/applications`): allikad ja paketid.
- **Work** (`/work/cron`, `/work/automations`, `/work/jobs`): ajastused, töövoogude koostamine ning aktiivsed ja ebaõnnestunud tööd.
- **System** (`/system/settings`, `/system/environments`, `/system/logs`): haldus, keskkonnagrupid ja käivitussündmused.

Jobs näitab aktiivseid ja ootel töid ning säilitab vead; edukas töö kaob pärast lõpetamist. Automations käivitab praegu salvestatud töövooge kasutaja algatusel. Paketi päästikukirjeldus ei ühenda veel teenuse sündmusi automaatselt. Järelevalveta sündmuspõhisele töövoole ei tohi toetuda enne, kui sündmuse allikas ja edastustee on teostatud ning kontrollitud.

Sündmuste mustandeid toetavas Core’i versioonis ava töövoo algussamm ja vali **Start this workflow** alt käsitsi käivitus või paigaldatud paketi sündmus. Sündmuse valikud ja seadistusväljad tulevad paketist, mitte vabalt sisestatud koodist. Algussammu vahetamine säilitab selle külge ühendatud harud. Näiteks Resend 1.1.9 kirjeldab kirja avamise, ebaõnnestumise ja kontaktide muutumise sündmusi.

**Event draft · inactive** tähendab mitteaktiivset mustandit. Salvestamine ei loo webhook’i, ei anna ligipääsu võtmetele ega aktiveeri automaatkäivitust. Mustand säilitab valitud paketi versiooni; paketi keelamise või versioonimuutuse korral tuleb valik uuesti kontrollida. Käsitsi testimiseks vali **Manually — press Run**. Päris automaatkäivituseks on endiselt vaja eraldi kontrollitud sündmuse vastuvõttu ja kinnitatud seost töövooga.

Workspace on aktiivses arenduses. Kontrolli oma töövoog enne päris kasutust; paigaldamine üksi ei tõenda iga funktsiooni toimimist.

[Järgmine: Core’i paigaldamine](/et/docs/getting-started)
