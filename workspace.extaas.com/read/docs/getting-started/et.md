# Alustamine Workspace portaaliga

Extaas jaguneb kolmeks pinnaks, mis töötavad koos:

- `extaas.com` on avalik põhidomeen ettevõtte info, dokumentatsiooni, blogi, juriidiliste dokumentide ja makse algvaadete jaoks.
- `workspace.extaas.com` on privaatne tööala kontode, projektide, arvete, tenant portaalide, moodulite ja integratsioonide jaoks.
- Tenant domeen on kliendi avalik portaal. Seal võib olla avaleht, Pages sisu, Booking, Rent, Store või muu lubatud moodul.

<div class="grid gap _3" style="grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); margin-block: 1.5rem;">
  <div class="css _radius _padding">
    <h3>1. Loo ligipääs</h3>
    <p>Logi sisse workspace.extaas.com kaudu. Kontoandmed, projektid, arved ja tenant seaded elavad seal.</p>
  </div>
  <div class="css _radius _padding">
    <h3>2. Ühenda domeen</h3>
    <p>Tenant host peab osutama portaali rakendusele ja sama host peab olema workspace DNS route kirjes.</p>
  </div>
  <div class="css _radius _padding">
    <h3>3. Luba moodulid</h3>
    <p>Lülita sisse ainult tööriistad, mida ettevõte päriselt kasutab: Pages, Audience, Email, Booking, Rent, Store või Calendar.</p>
  </div>
</div>

## Portaali rollid

Hoia piirid lihtsad:

- avalik külastaja kasutab `extaas.com` ja tenant domeene;
- portaali omanik kasutab `workspace.extaas.com`;
- staff kasutab sisemist workspace/admin pinda;
- konto, arve read, projektide sisu ja privaatne kliendiinfo ei kuulu avalikule põhidomeenile.

Nii jäävad SEO/prerender lehed puhtaks, tundlik kontoandmestik ei satu avalikesse route'idesse ja tenant portaali on lihtsam hallata.

## Esmane seadistuse kontroll

Enne tenant portaali avaldamist kontrolli:

1. Workspace omanik saab sisse logida.
2. Õige tenant domeen on workspace DNS route andmetes olemas.
3. Vajalikud moodulid on sisse lülitatud.
4. Vajalikud integratsioonid on seadistatud serveri poolel.
5. Avalikud lehed ei kuva privaatseid workspace andmeid.
6. Klienditegevuste e-kirjad kasutavad õiget tenant domeeni.
7. Krediitide ja maksete reeglid on enne tasuliste tegevuste lubamist selged.

## Olulised võtmed ja seaded

Enamik seadeid kuulub Workspace'i, mitte avalikule saidile.

| Valdkond | Kus see kuulub | Märkus |
| --- | --- | --- |
| Supabase URL ja service role | Server/workspace integratsioon | Service role võtit ei tohi brauserisse anda. |
| Resend API key | Server/workspace integratsioon | Kasutatakse kampaaniate ja mooduli teavituste jaoks. |
| Stripe secret/webhook key | Server/workspace integratsioon | Avalik leht võib makset alustada, detailid jäävad Workspace'i. |
| Tenant DNS host | Workspace DNS route | Peab kattuma kliendi domeeniga. |
| Mooduli enable seaded | Tenant workspace seaded | Avalik UI peab välja lülitatud moodulid peitma. |
| Avaliku lehe meedia | Pages mooduli storage | Avalik meedia võib nähtav olla, privaatne kirje mitte. |

## Soovituslik avaldamise flow

1. Loo või kinnita workspace kirje.
2. Lisa omanik ja kontrolli ligipääs.
3. Lisa tenant DNS route.
4. Seadista Supabase, kui portaal kasutab privaatseid mooduliandmeid.
5. Seadista Resend, kui mõni moodul saadab e-kirju.
6. Seadista Stripe, kui kasutatakse krediite, arveid või checkouti.
7. Luba moodulid ükshaaval.
8. Ava tenant domeen väljalogitud brauseris ja kontrolli avalikku vaadet.
9. Ava Workspace ja kontrolli projekte, arveid ning moodulite haldust.

## Mallid ja näited

```text
Portaali omaniku kontroll
- Workspace konto e-post:
- Tenant domeen:
- Lubatud moodulid:
- Saatja e-post:
- Stripe makseviis:
- Avalikud lehed valmis:
- Test booking/rent/store tegevus tehtud:
```

```text
DNS märkus kliendile
Suuna valitud domeen või alamdomeen tenant portaali rakendusele.
Kui DNS on aktiivne, saada lõplik host, et saaksime selle workspace'iga siduda.
```

## Korduvad küsimused

### Kas klient saab extaas.com pealt maksta?

Jah, kui arve on maksmata. Avalik leht võib näidata summat ja makse alustamist, aga mitte ostetud sisu ega arve ridu. Peale tasumist ei tohi sama arve enam `extaas.com` kaudu kättesaadav olla.

### Kus klient näeb projekti detaile?

Projekti detailid kuuluvad `workspace.extaas.com` alla. Kui projekt on seotud ettevõtte või tenantiga, võib tenant workspace kuvada ka asjakohast projektivaadet.

### Miks tenant domeen moodulit ei näita?

Tavaliselt on puudu üks kolmest asjast: moodul pole lubatud, integratsiooni seaded on poolikud või tenant DNS route ei leia õiget workspace'i.

### Mis peaks tasuta olema?

Seadistamine, muutmine ja ettevalmistus peaks võimalusel tasuta jääma. Krediiti või makset kasutatakse siis, kui toimub päris väärtussündmus: e-kiri jõuab saajani, booking lõpetatakse, rent kinnitatakse või store checkout õnnestub.
