# Stripe ja Store Workspace v2-s

Workspace’i Store-moodul on kliendi paigaldatud müügitöövahend. See on Extaasi toodete poest ja OUX Iseteeninduse kontoarveldusest eraldi.

## Seadistus

Paigalda vastav Stripe-integratsioon ja määra STRIPE_SECRET_KEY. Eelista piiratud võtit ainult vajalike toimingutega. Kirjutamisõigus lisa siis, kui toodete või hindade haldus seda vajab. Enne pärismakseid kasuta eraldi sandbox’i.

Pakett toetab piiratud kataloogi, toodete ja hindade haldust, majutatud makselinke, müüke, tagastusi ja tellimuse juhtimist. Saadavus sõltub versioonist, võtme õigustest ja seotud Store-koopiast.

## Tooted ja metaandmed

Store’ile kuuluvad tooted kasutavad eraldamiseks workspace_store metaandmeid. Ära muuda reserveeritud workspace_ võtmeid käsitsi. Kasutaja tootemeta võib anda avalikke parameetreid, kui renderer seda toetab; privaatne kliendisisu ei kuulu metaandmetesse.

Kuvatava hinna muutmine pole sama mis olemasoleva Stripe Price’i muutmine. Loo või arhiveeri hind vastava toiminguga.

## Makse kontroll

Seadista STRIPE_WEBHOOK_SECRET Website’i endpoint’i `/@_store_webhooks/{store-instance-id}` jaoks enne automaatsele kooskõlastamisele toetumist. Kontrolli allkirju ja töötle sündmusi idempotentselt. Edulehele jõudmine ei tõenda tasumist; asünkroonne makse võib kinnituda hiljem.

Enne päris kasutust testi sandbox-makset, katkestamist, allkirjastatud sündmust, kordussaatmist ja tagastust. Tagastus ning tellimuse muutmine on sisulised finantstoimingud.

Webhook-välja valikulisus vormis ei luba tootmises maksetulemuse kontrolli ära jätta.

[Stripe’i võtmed](https://docs.stripe.com/keys), [webhook’id](https://docs.stripe.com/webhooks) ja [sandbox’id](https://docs.stripe.com/sandboxes) annavad praeguse teenusejuhendi.
