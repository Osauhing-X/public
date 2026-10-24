# Core’i seadistused, hooldus ja uuendused

**System → Settings** haldab kohalikku administraatorit, paigalduse identiteeti, Getting Started nähtavust ja Core’i väljalaskeinfot. Ametliku kataloogi haldus asub **Integrations → Extaas Connect** all.

## Keskkond

Deklareeritud võtmed määratakse pakettide tarbijatele. Salvestatud saladused on vaikimisi peidetud. **System → Environments** lehel avab võtme **Reveal** ainult selle võtme pärast kohaliku omaniku parooli kinnitamist. See ei ava teisi võtmeid ega gruppe. Rakenduse kaudu delegeeritud kasutajatel ligipääsu ei ole.

Üksik väärtus peidetakse 60 sekundi pärast või akna fookuse kaotamisel; vastuseid ei puhverdata. Iga grupi `<summary>` päises on **Developer view** nupp. Sama parooliküsimise avab hiire hoidmine päisel 5 sekundit või päise vajutamine sõrmega 5 sekundit. Varem lahkumine, sõrme vabastamine või kerimiseks liigutamine katkestab taimeri. Hoidmine ise väärtusi ei ava.

Paroolikinnituse järel asendub ainult selle grupi tabel kohapeal `.env` tekstialaga, kust saab sisu kopeerida ja kuhu saab mitu võtit kleepida. Luba on serveris seotud täpselt selle grupi, sisselogimissessiooni ja avamiskorraga; see ei asenda teiste gruppide ega üksikute võtmete paroolikinnitust. **Table view · lock**, grupi sulgemine, lehelt lahkumine või akna fookuse kaotus lõpetab loa. Brauseri püsisalvestust ei kasutata ning serveri kaitsev ülempiir on 30 minutit.

Vorming on `KEY=value`; jutumärkides väärtused toetavad JSON-i paojadasid, näiteks `\n`. Muutujaid ega shellikäske ei käivitata. Vigane või korduv võti katkestab kogu hulgsalvestuse. Väljajäetud võtmed säilivad; tühi väärtus tühjendab selle võtme. Rakenduspõhised override-väärtused ei kuulu grupi ekspordi hulka. Salvestamine ei taaskäivita töötavaid rakendusi automaatselt. Environmenti vaade loeb ja muudab ainult Core’i salvestatud keskkonnaväärtusi; see ei loe ega kirjuta GitHubi.

Grupi tekst ja salvestamata muudatused peidetakse ning puhastatakse akna fookuse kaotamisel. Ava väärtusi ainult usaldatud seadmes ja peida need enne ekraani jagamist. Teise masinasse kopeeritud `.env` sisu sisaldab saladusi: kasuta turvalist edastusviisi, ära lisa seda Giti ega vestlustesse. Paigaldatud tarbijata grupid märgitakse kasutamata; eemaldamine on eraldi toiming. Ära asenda krüptovõtit kergekäeliselt: olemasolevad krüptitud andmed võivad muutuda loetamatuks.

Ametlik kataloog ja selle kontrollitud avalik GitHubi tarneallikas võivad olla allikate loendis ühel real. See ei liida nende võtmegruppe ega anna pakettidele ligipääsu teise allika saladustele. Ühenduse taaskasutamine nõuab teenusepakkuja selgesõnalist määramist; eri Supabase’i projektid peavad jääma lahku.

Rakenduse seadistused asuvad selle **Configuration** ja **Environment** vaates. Domeenid ja käivituslogid kuuluvad samuti rakendusele.

## Taustatöö

**Cron** näitab ajastusi ja viimaseid tulemusi. Kinnitatud käsitsi käivitamine ei muuda ajastust. Core peab lubama taustatööd, pakett peab olema valmis ja sama töö ei käivitu korraga kaks korda.

Need vaated kuuluvad **Work** gruppi: `/work/cron`, `/work/automations` ja `/work/jobs`. **Jobs** eristab aktiivseid, ootel ja ebaõnnestunud töid. Edukas töö kaob lõpetamisel; vead säilivad uurimiseks. Lehe avamine ei korda töid ega kustuta vigu. **System → Logs** (`/system/logs`) kuvab käivitussündmusi. Säilita diagnostikainfo enne eraldi kinnitatud puhastamist.

Automations käivitab praegu salvestatud töövooge kasutaja algatusel. Paketi päästikukirjeldus ei tõenda ühendatud teenusesündmuste tellimust. Enne automaatsele käivitusele toetumist kontrolli sündmuse tegelikku allikat, õigusi ja edastusteed.

## Ressursid ja uuendused

Overview ja Storage eristavad failisüsteemi mahtu Core’i loogilisest failimahust. Rakenduse RAM näitab mõõdetud hallatavat protsessi, mitte väljamõeldud kõigi alamprotsesside kogumahtu. CPU ulatus ja puuduolevad mõõdikud on tähistatud.

Core kontrollib väljalaskeid perioodiliselt. Docker-kujutist uuenda juurutushalduri kaudu pärast varundamist; Core ei ühenda Docker socket’it enda asendamiseks. Anna plaaniliseks lõpetamiseks vähemalt 45 sekundit: Core ootab jälgitavaid töid kuni 30 ja HTTP-ühendusi viis sekundit. Ajapiiri ületamine või serveri järsk seiskumine võib töö katkestada; kontrolli tulemust enne kordamist. Allika värskendamine ja paketi paigaldamine on eri toimingud.
