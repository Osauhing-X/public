# Integratsioonid: mida need teevad ja miks neid vaja on?

Integratsioon ei ole lihtsalt seadete vorm. See annab Workspace'i moodulile võimekuse, mida Extaas ei pea ise nullist dubleerima. Nii saab iga teenus teha seda, milles ta on tugev: Supabase hoiab andmeid ja ligipääsu, Resend toimetab e-kirju, Stripe töötleb makseid ning OpenAI aitab sisu koostada.

## Ühe lausega otsustusabi

- Kui moodul peab midagi **püsivalt mäletama**, on vaja Supabase'i.
- Kui süsteem peab midagi **e-postiga kohale toimetama**, on vaja Resendi.
- Kui klient peab **kaardiga maksma või ostukorvi kasutama**, on vaja Stripe'i.
- Kui kasutaja soovib **teksti või malli mustandit genereerida**, on vaja OpenAI-d.

Need teenused ei asenda üksteist. Booking võib töötada Supabase'iga ilma Resendita, kuid automaatne kinnitus ei jõua e-postile. Email vajab saatmiseks Resendi ja varade hoidmiseks Supabase'i. Store vajab nii andmebaasi konteksti kui Stripe'i makseallikat.

<div class="grid gap _2" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); margin-block: 1.5rem;">
  <div class="css _radius _padding"><span class="css _color">SUPABASE</span><h3>Mäletab</h3><p>Andmed, failid, kasutajad ja tenantide piirid.</p></div>
  <div class="css _radius _padding"><span class="css _color">RESEND</span><h3>Toimetab</h3><p>E-kirjad, saatjadomeen ja saatmise tulemus.</p></div>
  <div class="css _radius _padding"><span class="css _color">STRIPE</span><h3>Kinnitab makse</h3><p>Tooted, Checkout ja allkirjastatud sündmused.</p></div>
  <div class="css _radius _padding"><span class="css _color">OPENAI</span><h3>Koostab mustandi</h3><p>Tekst ja mall inimese lõpliku kontrolli jaoks.</p></div>
</div>

## Integratsioonide vastutusmaatriks

| Integratsioon | Põhiroll | Moodulid, mis sellest kasu saavad | Mida see ei tee |
| --- | --- | --- | --- |
| **Supabase** | andmebaas, auth, storage ja tenantide eraldus | Pages, vormid, CRM, Booking, Rent, Email assets, Calendar, Kanban, Private Pages, logid | ei saada ise kliendikirju ega töötle kaardimakset |
| **Resend** | saatjadomeen, e-kirja kohaletoimetamine ja tulemused | Email, Audience, Booking, Rent, vormiteavitused | ei ole CRM ega püsiv põhiandmebaas |
| **Stripe** | tootekataloog, Checkout, maksetulemus ja webhookid | Store, krediidiostud ja muud tasulised vood | ei kinnita makset ainult brauseri success-lehe põhjal |
| **OpenAI** | teksti ja e-kirjamalli mustand | Email ja staffi sisuloome | ei saada kirja, kinnita fakti ega otsusta ligipääsu |

## Miks just need teenused?

Workspace kasutab väliseid teenuseid selgete vastutuspiiridega. See vähendab oma autentimise, e-posti infrastruktuuri, kaardiandmete töötlemise ja mudelite majutamise keerukust. Valiku väärtus ei ole ainult funktsioonide arv, vaid kontrollitav serveripoolne API, sündmuste logimine ja võimalus hoida saladused brauserist eemal.

See ei tähenda, et teenus oleks riskivaba või alati saadaval. Omanik vastutab konto, limiitide, domeeni verifitseerimise, andmetöötlustingimuste ja võtmete elutsükli eest. Extaas peab rikke korral näitama arusaadavat setup/error olekut ega tohi teeselda õnnestumist.

## Soovituslikud kombinatsioonid

| Kasutusjuht | Minimaalne kombinatsioon | Täielikum kombinatsioon |
| --- | --- | --- |
| Avalikud sisulehed | Supabase | Supabase + Resend kontaktivormi jaoks |
| Booking või Rent | Supabase | Supabase + Resend kinnitusteks |
| Uudiskiri | Resend + nõusolekuga kontaktallikas | Supabase + Resend + OpenAI mustanditeks |
| E-posti koostaja | Supabase + Resend | Supabase + Resend + OpenAI |
| Veebipood | Supabase + Stripe | Supabase + Stripe + Resend tellimuskirjaks |
| Sisemine Kanban | Supabase | Supabase; väliseid saatmis- või makseteenuseid pole vaja |

## Saladuste ja õiguste piir

API võtmed sisestatakse omaniku integratsioonivaatesse ning neid kasutatakse serveris. Neid ei tohi panna Pages/Private Pages HTML-i, kliendipoolsesse JavaScripti, URL-i, prompti, logisõnumisse ega tugipäringu ekraanipilti.

Kasuta eraldi test- ja tootmisvõtmeid, kui teenus seda võimaldab. Anna võtmele minimaalne vajalik õigus, vaheta võti lekke või töötaja lahkumise korral ning eemalda vana võti alles pärast uue ühenduse kontrollimist. OpenAI võti ei tohi anda ligipääsu Supabase'ile; Stripe webhook secret ei ole Stripe API key; Supabase anon key ei ole service role key.

## Seadistamise järjekord

1. Vali kasutusjuht ja vaata mooduli nõutud sõltuvusi.
2. Loo välise teenuse konto ja projekt õige ettevõtte omandisse.
3. Seadista domeen, saatja, webhook või andmeruum teenuse enda keskkonnas.
4. Lisa võti Workspace'is ainult vastava integratsiooni väljale.
5. Salvesta ja kasuta integratsiooni testfunktsiooni.
6. Loo mooduli andmeruum, kui UI seda pakub.
7. Tee üks ohutu testtegevus ning kontrolli mõlema süsteemi logi.
8. Alles seejärel avalda kliendile nähtav voog.

## Kuidas aru saada, kus viga on?

| Sümptom | Tõenäoline kontrollkoht |
| --- | --- |
| Moodul küsib seadistamist | vajalik võti või Supabase'i andmeruum puudub |
| Andmed ei salvestu | Supabase'i ühendus, skeem, õigused või tenant-kontekst |
| Kiri ei jõua kohale | Resendi saatjadomeen, saaja, suppression/bounce ja saatmislogi |
| Checkout avaneb, kuid olek ei muutu | Stripe webhook, secret, metadata ja sündmuse logi |
| AI kast puudub | OpenAI integratsioon pole lubatud või Email moodul pole valmis |
| AI vastus on halb | prompt, kontekst, mudel ja inimülevaatus; mitte saatmisintegratsioon |

## Integratsiooni väljalülitamine

Enne võtme eemaldamist selgita välja sõltuvad moodulid. Peida või peata avalikud tegevused, mis muidu lubaksid kliendil pooleliolevasse voogu siseneda. Ekspordi vajalikud logid, lõpeta pooleliolevad maksed või saadetised, eemalda võti Workspace'ist ja tühista see teenuse enda juhtpaneelis. Andmete kustutamine on eraldi otsus ning peab järgima säilitus- ja lepingukohustusi.

## Seotud juhendid

- [Supabase](/et/docs/supabase)
- [Resend](/et/docs/resend)
- [Stripe](/et/docs/stripe)
- [OpenAI](/et/docs/openai)
- [Moodulite valik](/et/docs/modules-overview)
