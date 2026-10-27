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

0.8.4 lähtekoodi build ja 13 sünteetilist testi läbivad, sealhulgas päris curl-kliendi HTTP Digest päring. Brauseris kontrolliti laadimisviga, taastumist ning kaamera- ja seadistusdialooge arvutis ja telefonis. Dialoogide kontrollitud seisundites ei leidnud Axe WCAG A/AA vigu.

See ei tõenda päris kaamera või NVR-i ühilduvust ega uuenda automaatselt paigaldatud koopiat. Eraldi Home Assistanti lisamoodul, Extaas Connectiga kontosidumine, voo ja haldussilla täielik autoriseerimine ning riistvarakontroll on veel tegemata. Täpne teostus ja ülejäänud nõuded on [lähtekoodi turvaülevaates](https://github.com/Osauhing-X/home-assistant/blob/3fd10683d5615f07b461d8c474ecfd952df91c53/applications/rtsp_to_onvif/SECURITY-REVIEW.md).
