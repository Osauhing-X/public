# Workspace Core dokumentatsioon

Workspace Core on isemajutatav pakettide ja integratsioonide töölaud. See käivitub omaniku arvutis, NAS-is või serveris ning hoiab Core'i seadistusi ja paigaldatud pakette püsivas `/data` andmehoidlas. Vaikimisi on Core kohalik haldusliides – avalikku domeeni, reverse proxy't ega tulemüürireeglit ei ole selle käivitamiseks vaja.

## Mida Core praegu teeb

- loob esimese käivituse ajal kohaliku administraatori konto;
- haldab pakettide allikaid, paigaldusi, versioone, gruppe ja mooduli olekut;
- lisab integratsioonide lubatud keskkonnaväärtused Core'i seadistustesse;
- avab paigaldatud moodulite kohalikke töövaateid;
- ühendab soovi korral Extaasi ametliku kataloogi OUX-i kontrollitud litsentsi või aktiivse kuutellimuse kaudu.

Core ei ole praegu tenant-portaal, arvete, krediitide ega DNS-route'ide haldussüsteem. Samuti ei tähenda paketi paigaldamine automaatselt selle suvalise serverikoodi käivitamist.

## Esmakäivitus ja kohalik haldus

1. Käivita ametlik `docker-compose.yml` Docker Desktopis, NAS-is või enda serveris.
2. Ava Core'i kohalik aadress, näiteks `http://localhost:3000`.
3. Loo kohaliku administraatori konto e-posti ja parooliga.
4. Sea **Settings → Core** all e-post. Seda kasutatakse kohalike teavituste jaoks ning Extaasi kataloogiligipääsu installatsioonitokeni loomisel.

Kohalik administraator on Core'i omanik. Integratsioonide ja seadistuste nägemine võib olla piiratud ka eraldi lubatud Supabase'i kasutajatele, kuid tundlikke väärtusi tuleb anda ainult inimestele, kellel on selleks päriselt vajadus.

## Paketiallikad

Core leiab manifestiga paketid järgmistest allikatest:

| Allikas | Milleks see sobib |
| --- | --- |
| Storage | kohalik või NAS-i kaust, mille Core saab läbi vaadata |
| GitHub | valitud repository ja branch |
| ZIP | üles laaditud paketikogum, mille Core pakib enda hallatavasse hoidlasse |
| Official catalogue | Extaasi allkirjastatud avalik kataloog pärast OUX-i õiguse kontrolli |

Core valideerib iga `manifest.json` faili enne, kui paketti kataloogis näidatakse või paigaldatakse. Paigaldus kopeeritakse Core'i püsivasse hoidlasse, et lähtesüsteemi muutus ei kirjutaks kasutaja paigaldust vaikselt üle.

## Ametlik kataloog ja litsents

**Settings → Extaas** loob iga Core'i jaoks püsiva installation ID ja Workspace tokeni. Lisa token Extaasi poes sellele konkreetsele Core'ile mõeldud õiguse juurde. Õigus võib tulla aktiivsest kuutellimusest või eraldi litsentsivõtmest.

OUX kontrollib õigust serveripoolselt. Core ei sisalda litsentsi loomise ega dešifreerimise loogikat ega OUX-i, Extaasi või GitHubi saladusi.

Kui õigus aegub, lukustuvad ainult ametlikust Extaasi kataloogist tulnud moodulid ja integratsioonid. Omaniku Storage'ist, GitHubist või ZIP-ist tulnud paketid jäävad alles. Kui õigus muutub taas aktiivseks, saab ametlikke pakette uuesti kasutada ja kataloogi värskendada.

## Moodulid ja integratsioonid

Mooduli manifest võib kirjeldada nõutud integratsioone. Core ei lase sellist moodulit paigaldada enne, kui vajalik integratsioon on seadistatud, lubatud ja valmis.

Praegusel Core'il on kohalikud töövaated vähemalt järgmistele moodulitele:

- **Email** – mallide, komponentide, snippetite ja manuste haldus ning Resendi kaudu saatmine;
- **Pages** – kohalike avaliku lehe seadete haldus;
- **Forms / Surveys** – vormide ja töövooseadete salvestamine.

Iga paigaldatud pakett ei pruugi veel oma eraldi käitusvaadet pakkuda. Sellisel juhul näitab Core paigalduse olekut, versiooni ja ühilduvusvaadet, mitte ei teeskle, et paketi täisfunktsionaalsus juba töötab.

## Integratsioonide seadistamine

Integratsioonikaart näitab, kas ühendus on seadistamata, vajab tähelepanu või on kasutusvalmis. Seadista vajalikud võtmed integratsiooni enda seadete kaudu ning kontrolli seejärel selle olekut. Näiteks e-posti saatmine nõuab aktiivset ja seadistatud Resendi integratsiooni.

Core hoiab väärtused oma püsivas seadistushoidlas. Ära jaga administraatori ligipääsu ega eksporti integratsioonivõtmeid. Avalikku lehte või tundmatut võrguaadressi kasutades pane enne kasutusele HTTPS, autentimine ja vajalikud võrgu piirangud.

## Uuendused ja piirid

Core'i Docker-kujutise uuendamine toimub tavapärase Docker Compose'i uuendusega. Paketiallikate värskendamine näitab, kas paketi uuem versioon on saadaval; paigaldatud paketti ei asendata automaatselt.

Planeerimata või veel arenduses olevad võimalused – näiteks pakettide isoleeritud runtime, automaatne cron-käitus, Cloudflare'i tunnelite haldus ja üldine avalike route'ide hosting – ei ole selle dokumendi lubadus. Enne productioni avalikustamist kontrolli alati enda deploy, autentimine ja võrgu turve eraldi üle.

## Seotud juhendid

- [Moodulite ülevaade](/et/docs/modules-overview)
- [Integratsioonide juhend](/et/docs/integrations-guide)
- [E-post ja Audience](/et/docs/email-and-audience)
- [Settings](/et/docs/settings)
