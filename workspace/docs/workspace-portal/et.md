# Workspace v2: üks Core, sinu valitud töövahendid

Workspace v2 on ise majutatav paketiplatvorm. Käivita Core Dockerit toetaval arvutil, NAS-il või serveril. Core haldab paigaldusi, seadistusi, rakenduste protsesse ja taustatööd; ärifunktsioonid tulevad paigaldatud pakettidest.

## Kolm ehitusplokki

| Osa | Otstarve | Näide |
| --- | --- | --- |
| Rakendus | Iseseisev Node-veebirakendus oma pordi ja seadistusega | Website |
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

Rakendused töötavad Core’i konteineris hallatavate Node-protsessidena, mitte igaüks eraldi Docker-konteineris. Paketitoimingud kasutavad piiratud alamprotsesse. Need kontrollid ei muuda tundmatut koodi automaatselt turvaliseks. Paigalda ainult usaldatud koodi.

**System** sisaldab Logs, Queued, Cron, Environment ja Settings vaateid. **Overview** ja **Storage** näitavad ressursimõõdikuid koos nende ulatuse ja piirangutega.

Workspace on aktiivses arenduses. Kontrolli oma töövoog enne päris kasutust; paigaldamine üksi ei tõenda iga funktsiooni toimimist.

[Järgmine: Core’i paigaldamine](/et/docs/getting-started)
