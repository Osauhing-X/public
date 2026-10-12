# Cloudflare Tunnel: üks connector, suunatud rakendused

Workspace’i token-connector ei vaja käivitumiseks account ID-d ega käsitsi origin-välja. Lisa täielik tunnel-token Cloudflare’i integratsiooni privaatsesse seadistusvälja. See on salajane võti.

Token käivitab connectori; avalikud hostinimed ja DNS vajavad Cloudflare’is endiselt teekonda.

## Origin sõltub paigutusest

| Kus cloudflared töötab? | HTTP teenuse URL |
| --- | --- |
| Core’i konteineris | localhost:3000 |
| Eraldi konteineris samas võrgus | Core’i teenusenimi ja sisemine port, nt core:3000 |
| Teises masinas | Core’i kättesaadav sisemine aadress ja suunatud port |

localhost tähendab alati connectori masinat/konteinerit, mitte brauseri arvutit.

## Üks kirje alamdomeenidele

Ühe tsooni alamdomeenide jaoks määra *.example.com, teenuse tüübiks HTTP ja ülal olev õige origin. Path ja HTTP Host Header üle kirjutamine jäta tühjaks. Kontrolli, et proxied wildcard DNS CNAME viitab tunnelile. Juurdomeen example.com ja teised tsoonid vajavad eraldi kirjeid.

Workspace’is määra igale eraldi pordi rakendusele täpne hostinimi. Core valib säilitatud Host-päise järgi rakenduse. Tundmatu host ega haldusteekond ei tohi muutuda avalikuks varuvaateks.

## 502 kontrollimine

Veendu, et connector on ühendatud, origin on tema enda konteinerist kättesaadav, Core kuulab sisemisel pordil ja rakendus on healthy. Väline LAN-i port ei pruugi olla Core’i konteineri port.

Seejärel testi avalikku juuraadressi, keeleteekondi, faile ja autentimist. Ära kirjuta Host-päist Core’i nimeks ega kasuta origin’ina avalikku domeeni.

Tunnel suunab liiklust; see ei loo rakenduse kontoõigusi ega domeenidevahelist SSO-d.
