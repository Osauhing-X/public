# Workspace portaali dokumentatsioon

Operatiivne dokumentatsioon `workspace.extaas.com` klientidele ja staff vaatele. Workspace on privaatne portaal tenant moodulite, integratsioonide, projektide, arvete, krediitide ja kliendi tegevuste jaoks, samal ajal kui tenant DNS lehed jäävad avalikuks kliendipinnaks.

<figure>
  <img src="https://raw.githubusercontent.com/Osauhing-X/public/www/workspace.extaas.com/read/docs/workspace-portal/workspace-flow.svg" alt="Extaas workspace ja tenant skeem">
  <figcaption>Extaas eraldab avaliku põhidomeeni, privaatse workspace'i ja tenant DNS pinna.</figcaption>
</figure>

## Ülevaade

Workspace peab vastama neljale küsimusele:

1. Kellele portaal kuulub?
2. Millised tenant domeenid selle alla kuuluvad?
3. Millised moodulid on lubatud?
4. Millised integratsioonid ja krediidid on nende moodulite tööks vajalikud?

Avalik `extaas.com` ei tohiks muutuda konto dashboardiks. Seal võivad olla dokumentatsioon, avalik info, juriidilised dokumendid ja makse algvaated. Privaatne andmestik kuulub Workspace'i.

## Workspace alad

| Ala | Eesmärk | Avalik? |
| --- | --- | --- |
| Account | kasutaja identiteet, login ja ligipääs | Ei |
| Projects | kliendi tööd, märkmed ja seotud teenused | Ei |
| Invoices | arve detailid, read, makse staatus ja kviitungid | Ei |
| Tenant portals | DNS route'id, moodulid ja avaliku tenant pinna seaded | Osaliselt |
| Integrations | Supabase, Resend, Stripe, OpenAI ja moodulite võtmed | Ei |
| Credits | saldo, kasutuslogid, juurdeost ja tagastused | Ei |
| Public Pages | kliendile nähtav sisu ja meedia | Jah, ainult lubatud kujul |

## DNS ja tenant routing

Iga tenant domeen peab olema Workspace'is kirjeldatud. Lahendus saab hosti, leiab selle põhjal õige workspace/tenant kirje ja renderdab ainult selle tenantiga seotud avaliku sisu.

Kontroll:

- DNS kirje osutab tenant rakendusele.
- Sama host on workspace DNS route andmetes olemas.
- Route'il on selge mode: tenant, public/self või sisemine workspace.
- Tundmatu domeen ei leki teise tenanti sisu.
- Localhost arenduses võib info screeni sulgeda ainult arenduse mugavuse jaoks.

## Moodulid

Moodulid peaksid olema võimalusel taaskasutatavad nii tenant workspace'is kui sisemises admin vaates. Jagatud mooduliloogika väldib sama tööriista topeltehitamist.

| Moodul | Mida haldab | Peamine integratsioon |
| --- | --- | --- |
| Pages | avalik sisu, meedia, redirectid ja nähtavus | Supabase/meedia |
| Audience | kontaktid, unsubscribe ja segmendid | Supabase/Resend |
| Email | kampaaniad, mallid, komponendid ja manused | Resend/OpenAI |
| Booking | teenused, päringud, staatuse e-kirjad ja kalender | Supabase/Resend |
| Rent | rendiobjektid, päringud, kinnitused ja klienditegevused | Supabase/Resend |
| Store | tooted, ostukorv ja checkout tulemus | Stripe |
| Calendar | operatiivne ajakava ja meeldetuletused | Supabase/Resend |

## Integratsioonide reeglid

Saladused jäävad serverisse. Mooduli vaade võib näidata, kas integratsioon on seadistatud, aga ei tohi kunagi paljastada salajasi väärtusi.

- Supabase service role võti jääb serverisse.
- Resend API key jääb serverisse.
- Stripe secret key ja webhook secret jäävad serverisse.
- OpenAI API key jääb serverisse.
- Avalik tenant leht saab ainult renderdamiseks vajalikke turvalisi välju.

## Krediidid ja maksed

Krediite kasutatakse ainult sisuliste väärtussündmuste jaoks:

- Email: 1 krediit iga kohale jõudnud saaja kohta.
- Booking: reserveeri kinnitamisel, kasuta lõpetamisel.
- Rent: reserveeri heakskiidul, kasuta lõpetamisel.
- Store: kasuta pärast edukat Stripe makset.
- Pages: päevased krediidid aktiivsete avalike lehtede eest.
- Workspace: päevased krediidid aktiivse workspace ligipääsu eest.

Mallide muutmine, sisu muutmine, moodulite seadistamine ja eelvaated ei peaks krediite kasutama.

## Klienditegevused

E-kirjad võivad sisaldada klienditegevuste linke. Need lingid peavad olema piiratud ja turvalised:

- booking tühistamine;
- rendipäringu tühistamine;
- audience listist lahkumine;
- staatuse vaade, mis ei kuva privaatset workspace sisu.

## Operatiivne KKK

### Miks moodul näitab setup olekut?

Moodul on lubatud, aga üks või mitu vajalikku seadet on puudu. UI peab selgitama, mis samm on puudu, mitte vaikides katki minema.

### Miks tasuline tegevus pausile läks?

Krediidid võivad olla otsas, makse staatus võib olla sünkroonimata või Stripe webhook võib olla ebaõnnestunud. Kontrolli Workspace krediite, arve staatust ja logisid.

### Kas staff saab kasutada samu mooduleid kui tenant?

Jah. Jagatud moodulid tuleks kohandada props/data piiride kaudu, mitte dubleerida. Tenant UI peab jääma oma senise UX-iga, admin/workspace vaade võib kasutada tugevamat sama mooduli loogikat.

### Mis kuulub logidesse?

Integratsiooni vead, krediidi reserveerimine/kasutamine/tagastus, klienditegevused, e-kirjade saatmine, booking/rent staatuse muutused ja ootamatud serveri vead. Saladusi ei logita.

## Compliance valmisolek

Portaal on ehitatud andmeminimeerimise, serveripoolsete saladuste, auditit toetavate logide, WCAG-kontrasti kontrollide ja least-privilege ligipääsu ümber. ISO 27001, SOC 2 Type II või HIPAA väited nõuavad lisaks organisatsiooni poliitikaid, lepinguid, riskiregistreid ja väliseid auditeid.
