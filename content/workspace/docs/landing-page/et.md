# Website-rakenduse avaldamine

V2 avalik veeb kuulub rakendusele, mitte ühisele tenant-portaalile. Core jääb privaatseks pakettide halduriks. Workspace’i avalik tooteleht on [extaas.com/@/workspace](https://extaas.com/@/workspace); see pole sinu paigalduse haldusaadress.

## Loo leht

1. Paigalda Website ja seo Routes-moodul.
2. Loo soovitud keele, pealkirja ja sisuga teekond.
3. Seo sobivad sisumoodulid ning paiguta nende imporditokenid vajalikesse kohtadesse.
4. Kontrolli eelvaadet ühekordse testikirjega.
5. Avalda ainult lubatud väljad, mitte sisemärkmeid ega võtmeid.

Routes koordineerib lehti ja sisu. Booking, Rent, Store ja Forms võivad anda avaliku sisu, kui nende manifest ja seadistus seda toetavad.

## Määra domeen

Kasuta eraldi pordi režiimi, käivita rakendus ja kontrolli healthy olekut. Määra Domains all täpne hostinimi. Seadista proksi või Cloudflare suunama liiklus Core’i ning säilitama algse Host-päise.

Domeeniside ei loo automaatselt DNS-i, tulemüürireeglit ega rakenduse autentimist. [Cloudflare’i juhend](/et/docs/cloudflare) selgitab connectori paigutust.

## Vastuvõtukontroll

Kontrolli juur- ja keeleaadresse, staatilisi faile, brauseri navigeerimist, vealehti, vorme, HTTPS-i ja väljalogitud ligipääsu. Privaatseid õigusi testi eraldi. Klient peab mõistma, kas päring saadi kätte, kinnitati või tasuti.

Extaasi konto, ettevõtted ja arved asuvad OUX Iseteeninduses. See on kliendi enda Website-rakendusest eraldi.
