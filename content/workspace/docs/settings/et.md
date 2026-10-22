# Core’i seadistused, hooldus ja uuendused

**System → Settings** haldab kohalikku administraatorit, paigalduse identiteeti, Getting Started nähtavust ja Core’i väljalaskeinfot. Ametliku kataloogi haldus asub **Integrations → Extaas Connect** all.

## Keskkond

Deklareeritud võtmed määratakse pakettide tarbijatele. Salajased väärtused ei tagastu brauserisse. Paigaldatud tarbijata grupid märgitakse kasutamata; eemaldamine on eraldi toiming. Ära asenda krüptovõtit kergekäeliselt: olemasolevad krüptitud andmed võivad muutuda loetamatuks.

Rakenduse seadistused asuvad selle **Configuration** ja **Environment** vaates. Domeenid ja käivituslogid kuuluvad samuti rakendusele.

## Taustatöö

**Cron** näitab ajastusi ja viimaseid tulemusi. Kinnitatud käsitsi käivitamine ei muuda ajastust. Core peab lubama taustatööd, pakett peab olema valmis ja sama töö ei käivitu korraga kaks korda.

Need vaated kuuluvad **Work** gruppi: `/work/cron`, `/work/automations` ja `/work/jobs`. **Jobs** eristab aktiivseid, ootel ja ebaõnnestunud töid. Edukas töö kaob lõpetamisel; vead säilivad uurimiseks. Lehe avamine ei korda töid ega kustuta vigu. **System → Logs** (`/system/logs`) kuvab käivitussündmusi. Säilita diagnostikainfo enne eraldi kinnitatud puhastamist.

Automations käivitab praegu salvestatud töövooge kasutaja algatusel. Paketi päästikukirjeldus ei tõenda ühendatud teenusesündmuste tellimust. Enne automaatsele käivitusele toetumist kontrolli sündmuse tegelikku allikat, õigusi ja edastusteed.

## Ressursid ja uuendused

Overview ja Storage eristavad failisüsteemi mahtu Core’i loogilisest failimahust. Rakenduse RAM näitab mõõdetud hallatavat protsessi, mitte väljamõeldud kõigi alamprotsesside kogumahtu. CPU ulatus ja puuduolevad mõõdikud on tähistatud.

Core kontrollib väljalaskeid perioodiliselt. Docker-kujutist uuenda juurutushalduri kaudu pärast varundamist; Core ei ühenda Docker socket’it enda asendamiseks. Anna plaaniliseks lõpetamiseks vähemalt 45 sekundit: Core ootab jälgitavaid töid kuni 30 ja HTTP-ühendusi viis sekundit. Ajapiiri ületamine või serveri järsk seiskumine võib töö katkestada; kontrolli tulemust enne kordamist. Allika värskendamine ja paketi paigaldamine on eri toimingud.
