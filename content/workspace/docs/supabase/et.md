# Supabase Workspace v2-s

Supabase ühendab välise andme-, konto- ja failikihi pakettidele, mis seda vajavad. See pole iga Core’i mooduli üldine nõue: paljud privaatsed v2 töövahendid salvestavad koopiapõhise seisu Core’i andmetesse.

## Seadista õige integratsioon

Kasuta **Official Catalogue → Supabase** paketti, mille püsiv integratsiooni-ID on `io.extaas.supabase`. Eemaldatud OUX PRIVATE koopia ei ole eraldi seadistusnõue. Vali soovitud paigaldatud ühendus selgesõnaliselt; sarnane paketinimi ei anna õigust selle võtmetele.

Praegune pakett deklareerib SUPABASE_URL, SUPABASE_ANON_KEY, valikulise SUPABASE_SERVICE_ROLE_KEY ning valikulise SUPABASE_ALLOWED_SCHEMAS. Viimane on komadega eraldatud skeemide lubatud loend selgesõnaliselt seotud serveritoimingutele ja vaikimisi on lubatud public. Lisa privaatsed äriskeemid ainult usaldatud ning lubatud rakendustele; ära laienda loendit õiguste vea eiramiseks.

Määra ainult paigaldatud manifesti küsitud väärtused. Salavõti ja service-role jäävad serverisse. Ühenduse test ei tõenda kõigi tabelite, õiguste ega bucket’ite seadistust.

## Ligipääs andmetele

Avaliku andmekihi puhul kasuta selgeid grants-õigusi ja reataseme poliitikaid. Autentimine üksi ei anna ligipääsu kõigi klientide ridadele. Sisemised abifunktsioonid hoia privaatses skeemis; mooduli töölesaamiseks ei tohi luua üldist avalikku SQL-käivitamise endpoint’i.

V1 tenant SQL helper pole v2 paigaldussamm. Vana allalaaditav `tenant-exec-sql.txt` sisaldab nüüd ainult aegumisteadet, mitte käivitatavat seadistus-SQL-i. Ära loo üldotstarbelist `SECURITY DEFINER` SQL-käivitajat. Kui vanas paigalduses selline funktsioon juba leidub, kontrolli selle õigusi ja sõltuvusi enne eraldi kinnitatud eemaldamist; allalaaditava faili asendamine ei eemalda andmebaasifunktsiooni. Skeemimuudatused kuuluvad rakenduse/paketi ülevaadatud migratsioonidesse koos varukoopia ja taastamistestiga.

## Mahuaruanded

Versioonis 0.1.5 saab Core’i kohalik omanik integratsiooni mahuaruande eraldi laadida. Toetatud Cloud-ühendusel kasutatakse teenuse serveripoolset mõõdikute endpoint’i ja määratud administraatorivõtit. Aruanne võib kuvada mõõdetud andmebaasimahtu ja failisüsteemi vaba ruumi, kui vastavad mõõdikud on olemas. Selle koostamiseks ei loeta klientide andmeridu.

Pilve organisatsioonipõhised arvelduslimiidid ja kuu allesjäänud kasutus on failisüsteemi mahust eraldi. Puuduv mõõdik jääb kättesaamatuks, mitte nulliks. Avaliku hinnakirja järgi ei tohi oletada ühendatud projekti paketti ega allesjäänud limiiti. Aruanne säilib 60 sekundit vahemälus; värskendamine ei vaheta ühendust ega migreeri andmeid.

## Kohaliku Supabase’i ettevalmistamine

Supabase Local application on eraldi valikuline pakett. Seadistuste ettevalmistamine ei käivita teenuseid, kopeeri Cloud-andmeid ega muuda põhiühendust. Enne päris üleviimist taga piisavad ressursid, käivita ja kontrolli kohalik teenusekomplekt, kavanda varundatud andmemigratsioon, kontrolli autentimist ja failisalvestust ning testi iga tarbivat paketti. Töötav Cloud-integratsioon ei tõenda kohaliku asenduse valmisolekut. Ära kirjuta Cloud-seadistusi üle pelgalt kohaliku paketi paigaldamise tõttu.

Paketi leping kontrollitud 23.10.2026 ametliku Supabase-paketi versiooni 0.1.5 järgi.

[Ametlik Data API turvajuhend](https://supabase.com/docs/guides/api/securing-your-api) selgitab grants-õigusi ja RLS-i. Testi ettenähtud avaliku või sisselogitud rolliga, mitte ainult administraatorivõtmega.
