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

**Integrations → Extaas Connect** haldab ametliku kataloogi ühendust. Senise litsentsimudeliga paigalduses asuvad seal veel Workspace’i token ja litsents. Uue kontoga sidumise lähtekood asendab nende käsitsi sisestamise Iseteeninduses kinnitatava ühendusega; seda ei ole veel tootmises aktiveeritud. Core’i Settings sisaldab kohaliku halduse ja paigalduse identiteeti. Extaasi kliendikonto ja arved asuvad [OUX Iseteeninduses](https://iseteenindus.oux.ee/et/account).

Kontoga sidumine ja tasuline kasutusõigus on eraldi kontrollid. Kontoga ühendamine üksi ei anna tasulist ligipääsu. Uue maksearvestuse lähtekoodi on 27.10.2026 kontrollitud Stripe’i testrežiimis: tasutud arve, osaline ja täielik tagastus, tellimuse esimene kuu, järgmise kuu arve ning lõpetamine. Avalik ostuvoog, tootmise kasutusõiguste väljastamine ja RTSP to ONVIF-i uus klient ei ole veel valmis. Ära käsitle testitud serverikomponente juba kasutatava müügiteenusena; senised tasutud perioodid peavad üleminekul säilima.

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

## Automaatikaplokkide seis — kontrollitud 26.10.2026

Ploki kirjeldus, teostatud käsitleja ja live-paigaldus on eri asjad. Kataloogi uus versioon ei uuenda paigaldatud koopiat automaatselt. See ülevaade kirjeldab testitud lähtekoodi, mitte iga kliendi paigalduse valmisolekut.

- Booking 0.1.6: päringute loendamine, ootel päringute tingimus, vastuvõtu avamine/peatamine ning uue või tühistatud päringu päästikukirjeldus.
- Rent 0.1.6: päringute loendamine staatuse järgi, ootel päringute lävend, vastuvõtu avamine/peatamine ning uue, tagasi lükatud, lõpetatud või tühistatud päringu sündmusevalikud.
- Resend 1.1.10: päevase/kuise allesjäänud mahu lugemine ja vähese mahu tingimus. Mõõtmine hõlmab kogu konto saatmist ja vastuvõttu. Puuduva või piiramata mõõtmise korral samm peatub; tasuta paketi limiiti ei oletata.

Tingimused ja toimingud on testitud käsitsi käivitatava töövoo jaoks. Booking/Rent sündmuste eraldajad on testitud, kuid Core’i automaatne olekumuutuste edastus pole ühendatud. Päästikukirjeldus ei ole aktiivne automaatika. Resendi webhook’i kontrolli ettevalmistus ei registreeri teenuses webhook’i.

Uuemas Core’i lähtekoodis on pausil sündmustellimuse ettevalmistamine. See ei käivita töövoogu ega registreeri webhook’i; live-kasutajaliidese kontroll ja sündmuste vastuvõtu ühendamine on pooleli. Nendele osadele ei saa veel rajada järelevalveta klienditeenust.

[Järgmine: Core’i paigaldamine](/et/docs/getting-started)
