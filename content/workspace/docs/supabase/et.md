# Supabase Workspace v2-s

Supabase ühendab välise andme-, konto- ja failikihi pakettidele, mis seda vajavad. See pole iga Core’i mooduli üldine nõue: paljud privaatsed v2 töövahendid salvestavad koopiapõhise seisu Core’i andmetesse.

## Seadista õige integratsioon

Avalik Supabase-pakett deklareerib SUPABASE_URL, SUPABASE_ANON_KEY ja valikulise SUPABASE_SERVICE_ROLE_KEY. Privaatne OUX integratsioon kasutab teisi teenusepõhiseid välju. Ära vaheta neid omavahel.

Määra ainult paigaldatud manifesti küsitud väärtused. Salavõti ja service-role jäävad serverisse. Ühenduse test ei tõenda kõigi tabelite, õiguste ega bucket’ite seadistust.

## Ligipääs andmetele

Avaliku andmekihi puhul kasuta selgeid grants-õigusi ja reataseme poliitikaid. Autentimine üksi ei anna ligipääsu kõigi klientide ridadele. Sisemised abifunktsioonid hoia privaatses skeemis; mooduli töölesaamiseks ei tohi luua üldist avalikku SQL-käivitamise endpoint’i.

V1 tenant SQL helper pole v2 paigaldussamm. Skeemimuudatused kuuluvad rakenduse/paketi ülevaadatud migratsioonidesse koos varukoopia ja taastamistestiga.

[Ametlik Data API turvajuhend](https://supabase.com/docs/guides/api/securing-your-api) selgitab grants-õigusi ja RLS-i. Testi ettenähtud avaliku või sisselogitud rolliga, mitte ainult administraatorivõtmega.
