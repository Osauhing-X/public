# Workspace v2 moodulite valimine

Vali esmalt üks päris töövoog ja paigalda vähim vajalik paketikooslus. Paigalda moodul vaates **Library → Packages → Discovery** ja ava see **Library → Modules** alt.

## Vali eesmärgi järgi

| Vajadus | Moodul | Piir |
| --- | --- | --- |
| Kliendid ja järeltegevused | Customers CRM | Privaatne, koopia enda seis |
| Meeldetuletused ja tööetapid | Calendar, Kanban, Admin | Privaatsed töövahendid |
| Avalikud lehed ja teekonnad | Routes + Website olemasolevas paigalduses | Vajab ühilduvat Website’i paigaldust ja seadistatud teekondi |
| Küsimustikud | Forms / Surveys + Website | Vastused vajavad seadistatud avalikku töövoogu |
| Teenuse- ja rendipäringud | Booking, Rent + Website | Päring, kinnitus ja makse on eri olekud |
| Tooted ja müük | Store + Stripe + Website | Võtmed ja kontrollitud maksesündmused jäävad serverisse |
| Sõnumid ja saajad | Email + Resend, Communication (varasem Audience) | Saatmine ja nõusolek on eraldi vastutus; saadavus sõltub paigaldatud versioonist |

Loe paigaldatud manifesti: nõutud sõltuvused on paketipõhised. Paljud privaatsed töövahendid kasutavad Core’i püsivat koopiapõhist seisu; Supabase pole iga kirje jaoks kohustuslik.

## Avalik ja privaatne

Private Pages ja CRM-kirjed jäävad privaatseks. Avalik renderer tagastab vaid töövoole vajalikud väljad. Kontrolli enne avaldamist, millised väljad avalik vaade tegelikult kuvab.

Olemasolevates Website’i paigaldustes saab Routes lisada avalikele lehtedele deklareeritud impordid, näiteks `[import:booking]`. Need näited kirjeldavad ühilduvaid paigaldatud pakette. Oma allikates saadaval olevaid pakette näed Discovery vaates.

## Kontrollnimekiri

Paigalda sõltuvused, ava moodul, loo ühekordne kirje, kontrolli säilimist pärast laadimist, eralda teise koopia andmed ja testi vajadusel avalikku vaadet väljalogituna.

Kinnitatud broneering ei tähenda tasumist ega tõenda automaatset kattuvuste kontrolli. Testi just paigaldatud versiooni töövoogu.

[Järgmine: integratsioonid](/et/docs/integrations-guide)
