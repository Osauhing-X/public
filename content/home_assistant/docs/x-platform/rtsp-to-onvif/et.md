# RTSP to ONVIF

Rakendus vahendab RTSP voo MediaMTX-i kaudu ilma videot transkodeerimata ning avaldab ONVIF Device ja Media teenused. See sobib RTSP-only kaamera ühendamiseks NVR-i, Home Assistanti või muu ONVIF-avastust kasutava süsteemiga. Kaamerate konfiguratsioon säilib `/data/application-data/rtsp-to-onvif` all.

## Seadistamine

1. Määra X rakenduse keskkonnas haldusliidese `PASSWORD`.
2. Lisa kaamera nimi ning HQ RTSP aadress. LQ aadress on valikuline.
3. Määra kaamerale eraldi, mittetühi ONVIF kasutajanimi ja parool. Need on salvesti ühendusandmed, mitte haldusliidese parool.
4. Kontrolli, et salvesti jõuab rakenduse serverini ning server lähtekaamerani.
5. Katseta salvestis avastamist, pilti ja ühenduse taastumist enne püsikasutust.

| Vaikimisi port | Protokoll | Otstarve |
| --- | --- | --- |
| 3702 | UDP | WS-Discovery |
| 8091 | HTTP | ONVIF Device ja Media teenused |
| 8554 | RTSP/TCP | MediaMTX-i vahendatud voog |

Salvestile tagastatav vooaadress kasutab vahendusserverit: `rtsp://<server>:8554/<kaamera-id>`. H.264 lähtevoog annab paljude salvestitega parema ühilduvuse. Rakendus ei teisenda salvesti voogu teiseks koodekiks. Brauseri MP4 eelvaade on eraldi FFmpegi töötlus ja võib videot ümber kodeerida; selle seaded ei muuda NVR-i voogu.

## Kaadripilt ja konfiguratsiooni säilimine

Versiooni 0.8.4 lähtekoodis nõuab JPEG kaadripilt kaamera ONVIF andmetega HTTP Digest autentimist või haldusliidese kehtivat sessiooni. Pildiaadress jääb samaks; anonüümne päring saab vastuse 401. Kontrolli, et salvesti edastab ka pildipäringuga seadistatud ONVIF kasutajaandmed.

Vigast või loetamatut seadistusfaili ei asendata tühja kaameraloendiga. Haldusliides näitab viga ja blokeerib uue kaamera lisamise, kuni andmed on taas loetavad. Samaaegsed kaamera-, DHCP- ja avastusseadete muudatused salvestatakse järjestatult. Konfiguratsioon sisaldab endiselt lähteühenduste saladusi; hoia andmekataloog ja varukoopiad privaatsena.

## Kontrollitud ulatus — 27.10.2026

0.8.4 lähtekoodi build ja 27 testi läbivad, sealhulgas päris curl-kliendi HTTP Digest päring ning MediaMTX 1.19.3 lokaalne ligipääsukontroll. Anonüümne, vale parooliga ja teise kaamera kontoga voopäring saab 401 vastuse. Haldusliidese allkirjastatud sessioon aegub serveris seitsme päeva pärast; parooli muutmine tühistab varasemad sessioonid. Multicast-võrguliidese puudumine ei lõpeta enam haldusprotsessi; avastamine märgitakse sel juhul kättesaamatuks.

Extaas Connecti kontosidumise klient ja eraldi kontovaade on lähtekoodis olemas ning vaikimisi välja lülitatud. `RTSP_CONNECT_ENABLED=true` lubab voo: alusta ühendamist, võrdle koodi ja kinnita see Iseteeninduses. Päris väljastaja ehitatud rakendusega läbis sünteetiline test kinnitamise, kontovaate ja ühenduse tühistamise; tootmiskontosid ega Stripe’i ei kasutatud. Ühendusandmed krüpteeritakse kohalikus privaatses andmekataloogis. Konto sidumine üksi ei kinnita tasulist kasutusõigust. Täpsemalt [kontosidumise juhendis](https://github.com/Osauhing-X/home-assistant/blob/44aaee8a0ebffe10593310c40c09e1acbacae0eb/applications/rtsp_to_onvif/CONNECT.md).

Eraldi lisamooduli arenduspakett läbis amd64 ja emuleeritud ARM64 konteineritestid: tavaline käivitus ja korrektne peatamine, sisselogimine, kaitstud API, kontovaade ning puuduva seadistuse ja pooleli jäänud üleviimise tagasilükkamine. Testides puudus väline võrguühendus ja päris kaameraid ei kasutatud. Paketti ei ole veel Home Assistanti lisamoodulina avaldatud. Võrguühenduseta andmete kopeerimise tööriist säilitab lähtefailid ja olemasoleva kontoühenduse ning keeldub olemasolevat sihtkataloogi asendamast; selle seitse testi läbivad. Home Assistanti eri lisamoodulite `/data` kataloogid on eraldi: sama failitee üksi vana seadistust üle ei too. Vt [pakenduse ja üleviimise täpset ulatust](https://github.com/Osauhing-X/home-assistant/blob/56e9cfbb71fad2692bf8faa5b82f69ed03935234/packaging/rtsp_to_onvif/README.md).

Brauseris kontrolliti laadimisviga, taastumist, kaamera- ja seadistusdialooge ning uue kontovaate ühendamata, kinnitamist ootavat ja ühendatud olekut arvutis ja telefonis. Kontrollitud seisundites ei leidnud Axe WCAG A/AA vigu. See ei tõenda kogu rakenduse ligipääsetavust ega päris kaamera või NVR-i ühilduvust ning ei uuenda automaatselt paigaldatud koopiat. Lisamooduli avaldamine ja päris Home Assistanti paigaldus, tasulise ligipääsu jõustamine, tootmiskeskkonna kontosidumine, haldussilla autoriseerimine ja riistvarakontroll on veel tegemata. Täpne teostus ja ülejäänud nõuded on [lähtekoodi turvaülevaates](https://github.com/Osauhing-X/home-assistant/blob/537371058a482559fb13ebe537532075b9432a39/applications/rtsp_to_onvif/SECURITY-REVIEW.md).
