# Supabase andmeruum

Supabase hoiab Workspace'i ja tenant moodulite privaatseid andmeid: bookingud, rendipäringud, Pages meedia, audience kontaktid, logid, kasutajate ligipääsud ja mooduli seaded. See on portaali privaatse tööseisu operatiivne andmebaas.

## Serveripoolne piir

Service role võti ei tohi kunagi jõuda brauserisse. Avalikud lehed kasutavad ainult serveri poolt valitud turvalist sisu. Tenant DNS render peab kõigepealt lahendama õige tenanti ja alles siis andma välja selle tenanti avalikud väljad.

Brauseriklienti kasuta ainult voogudes, mis on anon/authenticated võtmetega turvalised. Privilegeeritud tegevused käivad server route'ide kaudu.

## Tüüpilised andmegrupid

| Andmegrupp | Näited | Avalik nähtavus |
| --- | --- | --- |
| Workspace ligipääs | kasutajad, rollid, kutsed | Mitte kunagi avalik |
| Tenant seaded | DNS route, lubatud moodulid, theme, public flags | Ainult turvalised avalikud väljad |
| Pages | avaldatud lehed, meedia, redirectid | Ainult avaldatud sisu |
| Booking | teenused, päringud, staatus, klienditegevused | Avalik vorm ja piiratud staatus |
| Rent | objektid, päringud, kinnitused | Avalik listing ja piiratud staatus |
| Audience | kontaktid, tagid, unsubscribe | Kontaktlist ei ole avalik |
| Logs | mooduli tegevused, vead, krediidisündmused | Ainult Workspace/staff |

## Vajalikud kontrollid

Enne tenant portaali avaldamist:

1. Workspace kirje on olemas.
2. DNS host osutab õigele tenantile.
3. RLS/serveri piirid takistavad teise tenanti andmete lugemist.
4. Avalikud route'id ei tagasta privaatseid tabeleid.
5. Integratsiooni vead kirjutatakse logidesse.
6. Klienditegevuste lingid on piiratud ega saa muuta teise tenanti andmeid.

## Moodulite storage

Booking, Rent, Pages, Audience, Store ja Calendar vajavad struktureeritud andmeruumi. Kui moodul pole seadistatud, peab UI selgitama, mida omanik peab tegema, mitte kuvama poolikut viga.

Soovituslik mooduli setup olek:

```text
status: "not_configured" | "ready" | "error"
missing: ["supabase", "resend", "stripe"]
message: "Ühenda Resend enne booking kinnituste saatmist."
```

## Logid

Workspace logid aitavad jälgida mooduli tegevusi, klienditegevusi ja integratsiooni vigu. Logid ei asenda formaalset auditipoliitikat, aga annavad operatiivse nähtavuse.

Logi kasulikke sündmusi:

- DNS route lahendamise viga.
- E-kirja saatmise viga.
- Stripe webhook mismatch.
- Krediidi reserveerimine/kasutamine/tagastus.
- Kliendi tühistamise tegevus.
- Mooduli seadistuse muutus.

Ära logi service role võtmeid, API võtmeid, täielikke kaardiandmeid ega tundlikke payload'e.

## `tenant-exec-sql.txt`

`tenant-exec-sql.txt` helper loob kontrollitud SQL execution funktsiooni ainult service role hooldustoimingute jaoks. See ei tohi olla public, anon ega authenticated brauserikasutajatele kättesaadav.

```sql
create or replace function public.exec_sql(query text)
returns void
language plpgsql
security definer
as $$
begin
  execute query;
end;
$$;

revoke all on function public.exec_sql(text) from public;
revoke all on function public.exec_sql(text) from anon;
revoke all on function public.exec_sql(text) from authenticated;

grant execute on function public.exec_sql(text) to service_role;
```

Kasuta seda ainult usaldatud serveripoolsest hoolduskoodist. Tavaliste skeemimuudatuste jaoks eelista selgeid migratsioone. Kui see helper on olemas, dokumenteeri, kes tohib seda kutsuda ja miks.

## KKK

### Kas avalikud lehed võivad Supabase'ist otse lugeda?

Ainult selgelt avaliku andme ja turvaliste võtmetega. Enamik tenant renderdust peaks käima serveri kaudu, et host lahendada ja andmed filtreerida.

### Mis juhtub, kui Supabase pole seadistatud?

Privaatset seisu vajavad moodulid peavad Workspace'is näitama setup teadet. Tenant avalik leht peaks vastava mooduli peitma või välja lülitama.

### Kus hoitakse meediafaile?

Pages meedia võib olla Supabase storage'is või muus kinnitatud storage kihis, aga avalik render peab kasutama turvalisi avalikke URL-e või vajadusel serveri loodud ligipääsu.
