# Workspace v2 moodulite valimine

Vali esmalt üks päris töövoog ja paigalda vähim vajalik paketikooslus. Moodul on töövaade, mitte automaatselt avalik veebirakendus.

## Vali eesmärgi järgi

| Vajadus | Moodul | Piir |
| --- | --- | --- |
| Kliendid ja järeltegevused | Customers CRM | Privaatne, koopia enda seis |
| Meeldetuletused ja tööetapid | Calendar, Kanban, Admin | Privaatsed töövahendid |
| Avalikud lehed ja teekonnad | Routes + Website | Vajab seotud Website-rakendust |
| Küsimustikud | Forms / Surveys + Website | Vastused vajavad seadistatud avalikku töövoogu |
| Teenuse- ja rendipäringud | Booking, Rent + Website | Päring, kinnitus ja makse on eri olekud |
| Tooted ja müük | Store + Stripe + Website | Võtmed ja kontrollitud maksesündmused jäävad serverisse |
| Sõnumid ja saajad | Email + Resend, Audience | Saatmine ja nõusolek on eraldi vastutus |

Loe paigaldatud manifesti: nõutud sõltuvused on paketipõhised. Paljud privaatsed töövahendid kasutavad Core’i püsivat koopiapõhist seisu; Supabase pole iga kirje jaoks kohustuslik.

## Avalik ja privaatne

Private Pages ja CRM-kirjed jäävad privaatseks. Avalik renderer tagastab vaid töövoole vajalikud väljad. Mooduli sidumine ei luba kõiki andmeid avaldada.

Website’i Routes paigutab deklareeritud impordid, näiteks `[import:booking]`, lehe sisusse. Teised moodulid annavad sisu, mitte ei halda iseseisvalt domeene.

## Kontrollnimekiri

Paigalda sõltuvused, ava moodul, loo ühekordne kirje, kontrolli säilimist pärast laadimist, eralda teise koopia andmed ja testi vajadusel avalikku vaadet väljalogituna.

Kinnitatud broneering ei tähenda tasumist ega tõenda automaatset kattuvuste kontrolli. Testi just paigaldatud versiooni töövoogu.

[Järgmine: integratsioonid](/et/docs/integrations-guide)
