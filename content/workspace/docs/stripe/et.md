# Stripe ja Store Workspace v2-s

Workspace’i Store-moodul on kliendi paigaldatud müügitöövahend. See on Extaasi toodete poest ja OUX Iseteeninduse kontoarveldusest eraldi.

## Seadistus

Paigalda vastav Stripe-integratsioon ja määra STRIPE_SECRET_KEY. Eelista piiratud võtit ainult vajalike toimingutega. Kirjutamisõigus lisa siis, kui toodete või hindade haldus seda vajab. Enne pärismakseid kasuta eraldi sandbox’i.

Pakett toetab piiratud kataloogi, toodete ja hindade haldust, majutatud makselinke, müüke, tagastusi ja tellimuse juhtimist. Saadavus sõltub versioonist, võtme õigustest ja seotud Store-koopiast.

## Tooted ja metaandmed

Store’ile kuuluvad tooted kasutavad eraldamiseks workspace_store metaandmeid. Ära muuda reserveeritud workspace_ võtmeid käsitsi. Kasutaja tootemeta võib anda avalikke parameetreid, kui renderer seda toetab; privaatne kliendisisu ei kuulu metaandmetesse.

Kuvatava hinna muutmine pole sama mis olemasoleva Stripe Price’i muutmine. Loo või arhiveeri hind vastava toiminguga.

## Haldusvaated ja avaliku poe kujundus

Store 0.1.6 eraldab tooted, tellimused, arved, püsimaksed, tagastused, vaidlused ja avaliku poe kujunduse eri vaadetesse. Loendurid näitavad selle Store’i sünkroonitud kirjeid, mitte kogu Stripe’i konto mahtu. Kataloogi, müükide ning tagastuste/vaidluste värskendused on eraldi lugemistoimingud. Tühi või vana kohalik loend ei tõenda, et Stripe’is kirjeid pole.

Store 0.1.7 kujundusvaates saab tootekaardi, püsimaksekaardi ja toote üksikasjade popover’i teksti ning paigutust eraldi muuta. Väljad saab noolenuppudega ümber järjestada, kirjelduse või hinnateksti peita ning valida joonduse ja vahed. Pealkiri jääb nähtavaks. Värvid ja nurgaraadius on ühised. Eelvaade kasutab näidisandmeid, ei loo Checkouti ega avalda muudatusi automaatselt.

Lubatud väärtused on `[data:title]`, `[data:description]` ja `[data:price]`; sobivad ka `{{data:title}}` kujul märgendid. Väärtused kuvatakse tekstina, mitte käivitatava HTML-i või skriptina. Kliendi-, makse- ja tellimusandmed pole kujundusmärgendid. Salvestatud kujundus ilmub seotud Website’i Routes-lehel läbi `[import:store]` ainult siis, kui kataloog ja vastavad tooted on avaldatud.

Need võimalused sõltuvad **paigaldatud** versioonist; kataloogi värskendamine ei uuenda moodulit automaatselt. Kujundus ei muuda Stripe’i tooteid, makstavaid summasid ega olemasolevaid püsimakseid. Praegune redaktor on valideeritud komponentide kujundaja, mitte vaba HTML/CSS-i või kogu lehe ehitaja. Tagastuste ja vaidluste loend hõlmab selle Store’i Checkout-maksetega seostatavaid kirjeid; see pole kogu konto finantsaruanne. Osalised tagastused, vaidluse tõendite esitamine, laoseis ja tarne täitmine pole selle juhendi põhjal lubatud valmisvõimekused.

## Makse kontroll

Seadista STRIPE_WEBHOOK_SECRET Website’i endpoint’i `/@_store_webhooks/{store-instance-id}` jaoks enne automaatsele kooskõlastamisele toetumist. Kontrolli allkirju ja töötle sündmusi idempotentselt. Edulehele jõudmine ei tõenda tasumist; asünkroonne makse võib kinnituda hiljem.

Enne päris kasutust testi sandbox-makset, katkestamist, allkirjastatud sündmust, kordussaatmist ja tagastust. Tagastus ning tellimuse muutmine on sisulised finantstoimingud.

Webhook-välja valikulisus vormis ei luba tootmises maksetulemuse kontrolli ära jätta.

[Stripe’i võtmed](https://docs.stripe.com/keys), [webhook’id](https://docs.stripe.com/webhooks) ja [sandbox’id](https://docs.stripe.com/sandboxes) annavad praeguse teenusejuhendi.
