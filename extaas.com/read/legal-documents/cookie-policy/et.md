# KÜPSISTE JA BRAUSERISALVESTUSE POLIITIKA

Viimati uuendatud: 03.08.2026

***

Käesolev dokument selgitab, kuidas Osaühing X kasutab Extaas.com veebilehel küpsiseid ja muid brauseri salvestusviise. See täiendab [privaatsuspoliitikat](/et/legal-documents/privacy-policy).

<div class="css _radius _padding grid gap _2" style="margin-block: 1.5rem;">
  <span class="css _color">LÜHIKOKKUVÕTE</span>
  <h3>Extaas.com ei kasuta reklaami- ega turundusküpsiseid.</h3>
  <p>Brauserisalvestust kasutatakse eelistuste, UI ajutise oleku, kokkuleppel seadme tunnuse ning sisselogitud kasutaja autentimise jaoks. Kui kasutus muutub, uuendatakse käesolevat dokumenti ja küsitakse nõusolekut seal, kus see on nõutav.</p>
</div>

## 1. Vastutava töötleja andmed

Teenusepakkuja ja vastutav töötleja: **Osaühing X**  
Registrikood: **17396663**  
E-post: **mail@extaas.com**  
Telefon: **+372 5107862**

## 2. Mis on küpsis ja brauserisalvestus?

Küpsis on väike teave, mille veebileht salvestab brauseri kaudu kasutaja seadmesse ja mille brauser võib sama veebilehe päringutega serverile tagasi saata.

`localStorage` ja `sessionStorage` on brauseri kohalikud salvestusalad. Neid ei saadeta iga HTTP päringuga automaatselt serverile. `localStorage` säilib üldjuhul kuni kasutaja või rakendus selle kustutab; `sessionStorage` kestab tavaliselt konkreetse brauserikaardi seansi lõpuni.

## 3. Praegu kasutatavad tehnoloogiad

Alljärgnev kirjeldab Extaas.com rakenduse praegust tehnilist kasutust. Konkreetne brauser võib näidata ka majutuse, turvateenuse või autentimisteenuse tehnilisi kirjeid. Kõige täpsema hetkevaate leiab brauseri arendajatööriistade jaotisest Application/Storage.

| Nimi või salvestus | Liik | Eesmärk | Tüüpiline kestus |
| --- | --- | --- | --- |
| `fingerprint` | esimese osapoole küpsis | kokkuleppel loodav seadme tehniline tunnus, mida kasutatakse turva-/robotikontrolli kontekstis | kuni 30 päeva |
| `customer` | esimese osapoole autentimisküpsis | sisselogitud kasutaja ligipääsutunnuse hoidmine ja serveripoolse kasutajakonteksti tuvastamine | kuni 3 päeva või väljalogimiseni |
| Supabase autentimise brauserikirjed | esimese/teenusepakkuja tehniline salvestus | OAuthi, Magic Linki ja kasutajaseansi tehniline toimimine | seansi või teenuse seadistuse järgi |
| `save:config` | `localStorage` | keele, heleda/tumeda teema, värvivaliku ja rainbow-eelistuse salvestamine seadmes | kuni kasutaja kustutab brauseriandmed või muudab seadet |
| infosõnumi sulgemise olek | `sessionStorage` | mäletab ühe brauserikaardi seansi jooksul, et kasutaja sulges infoakna | brauserikaardi seansi lõpuni |
| konsooli/UI kohalik olek | `localStorage` | piiratud hulga seadmespetsiifiliste UI teadete või eelistuste säilitamine | kuni rakendus või kasutaja kustutab |

Küpsise või võtme nimi võib tehnilise uuenduse käigus muutuda. Eesmärk ja kasutuspiir peavad jääma käesoleva poliitikaga kooskõlla.

## 4. Seadme tunnus (`fingerprint`)

Seadme tunnus luuakse pärast kasutajale kuvatud nõusolekusammu kinnitamist. Rakendus ühendab brauserist kättesaadavad tehnilised väärtused, näiteks ajavööndi, platvormi, protsessorituumade arvu ja seadme mäluklassi, ning salvestab nende põhjal loodud kodeeritud väärtuse `fingerprint` küpsisesse.

Tunnus ei ole sama mis nimi, e-post või ametlik isikukood. Siiski võib seadme tunnus koos muu teabega aidata kasutajat või seadet eristada ja seda käsitletakse seetõttu privaatsust mõjutava tehnilise identifikaatorina.

Tunnust ei kasutata käesoleva poliitika kohaselt reklaamiprofiili, saitideülese jälgimise ega turundusliku käitumisanalüüsi loomiseks.

## 5. Autentimisküpsised

Sisselogimisel võib rakendus salvestada ligipääsutunnuse küpsisesse, et server saaks piiratud Workspace'i või konto päringu juures kasutaja tuvastada. Autentimiseks kasutatakse Supabase'i ning võimalikud meetodid on Magic Link ja seadistatud OAuth teenusepakkujad.

Autentimisküpsis on vajalik ainult sisselogimist vajava teenuse kasutamiseks. Avalikku sisu saab üldjuhul lugeda sisselogimata. Väljalogimine ja brauseriandmete kustutamine lõpetavad või eemaldavad kohaliku seansi, kuid serveripoolne sessioon võib lõppeda ka aegumise või turvatoimingu tõttu.

## 6. Eelistused `localStorage`'is

Keele- ja kujunduseelistus salvestatakse kasutaja seadmesse, et veebileht ei peaks iga avamise järel sama valikut uuesti küsima. Need seaded on seadme- ja brauseripõhised ning neid ei sünkroonita automaatselt teise seadmesse.

Eelistuste salvestus ei ole mõeldud kasutaja tegevuse analüüsimiseks. Kohaliku kirje sisu võib kasutaja brauseri arendajatööriistades vaadata ja kustutada.

## 7. `sessionStorage` ja ajutine UI olek

`sessionStorage` aitab ühe brauserikaardi jooksul mäletada ajutist kasutajaliidese valikut, näiteks infoakna sulgemist. See vähendab korduvat häirimist ega ole mõeldud püsiva profiili loomiseks.

Brauser eemaldab sellise teabe tavaliselt kaardi sulgemisel. Privaatse sirvimise ja brauseri eriseadete korral võib käitumine erineda.

## 8. Reklaam, analüütika ja kolmandate osapoolte sisu

Extaas.com ei kasuta käesoleva poliitika kuupäeva seisuga Google Analyticsit, reklaamivõrgustike küpsiseid ega saitideülest turundusjälgimist.

Välisele lehele viiva lingi avamisel kohaldub selle välise teenuse enda küpsiste ja privaatsuse kord. Kui Extaas lisab tulevikus nõusolekut vajava analüütika, reklaamipiksli või muu täiendava tehnoloogia, ei tohi seda laadida enne nõuetekohast valikut ning poliitikat tuleb enne või kasutuselevõtuga koos uuendada.

## 9. Õiguslik alus ja valik

Teenuse osutamiseks rangelt vajalikku salvestust võib kasutada kasutaja selgesõnaliselt soovitud funktsiooni, näiteks sisselogimise või keele-eelistuse võimaldamiseks. Täiendava, mittehädavajaliku salvestuse puhul küsitakse nõusolekut, kui kohaldatav õigus seda nõuab.

Nõusolek peab olema vabatahtlik, konkreetne, teadlik ja üheselt väljendatud. Nõusolekust keeldumine ei tohiks takistada avaliku põhisisu lugemist, kui salvestus pole selle sisu edastamiseks vajalik.

## 10. Kuidas salvestust hallata või kustutada?

Kasutaja saab küpsiseid ja saidiandmeid hallata brauseri seadetes. Tavaliselt saab:

- vaadata konkreetse domeeni küpsiseid ning kohalikku salvestust;
- kustutada kõik Extaas.com saidiandmed;
- blokeerida kõik või valitud küpsised;
- kasutada privaatset sirvimist;
- logida teenusest välja, et lõpetada autentimisseanss.

Kõigi saidiandmete kustutamisel võivad kaduda keel, kujundusvalik ja sisselogitud olek. Mõni piiratud funktsioon võib ilma vajaliku salvestuseta mitte töötada.

## 11. Turvalisus

Autentimistunnus annab selle kehtivuse ajal ligipääsu kasutaja kontekstile. Ära kopeeri küpsise väärtust, brauseri storage'i sisu ega autentimislinki teisele isikule. Ühiskasutatavas seadmes logi pärast kasutamist välja ning ära jäta brauserit avatuks.

Kui kahtlustad konto või seansi väärkasutust, võta viivitamata ühendust aadressil **mail@extaas.com**.

## 12. Muudatused

Poliitikat uuendatakse, kui muutub salvestustehnoloogia, eesmärk, teenusepakkuja või säilitamise põhimõte. Olulise muudatuse korral esitatakse teave sobival viisil ning vajadusel küsitakse uus nõusolek.

## 13. Lisateave ja allikad

Küsimused saab saata aadressile **mail@extaas.com**.

Üldised ametlikud juhised:

- [Andmekaitse Inspektsioon: küpsised](https://www.aki.ee/kupsised)
- [Andmekaitse Inspektsioon: e-poe küpsiste ja jälgimispikslite turvameetmed](https://www.aki.ee/2-konkreetsed-turvameetmed-e-poe-platvormile)
- [Euroopa Liidu e-privaatsuse direktiivi artikli 5 lõige 3](https://eur-lex.europa.eu/eli/dir/2002/58/art_5/par_3/oj/eng)
- [Privaatsuspoliitika](/et/legal-documents/privacy-policy)

