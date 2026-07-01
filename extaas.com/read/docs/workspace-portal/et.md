# Workspace portaali dokumentatsioon

Keskne dokumentatsioon workspace.extaas.com klientidele ja staff vaatele. Workspace portaal koondab avalikud lehed, audience, email, booking, rent, store, calendar ja credits moodulid samasse kohta, samal ajal kui tenant DNS lehed jaavad kliendile avalikuks pinnaks.

<h2 id="overview">Ulevaade</h2>

Extaas Workspace on arikeskkond tenant moodulite, integratsioonide ja operatiivse too jaoks. Klient peab kontoandmeid, projekti sisu, arveid ja privaatseid mooduli seadeid vaatama workspace.extaas.com kaudu.

<h2 id="dns">DNS ja domeenid</h2>

Kliendi domeen voi alamdomeen peab suunama tenant rakendusele. Sama host peab olema platform workspace kirjes, et rakendus leiaks oige tenant workspace'i.

<h2 id="supabase">Supabase</h2>

Supabase hoiab moodulite seadeid, privaatseid bookinguid, rendiparinguid, avalike lehtede meediat, kalendri meeldetuletusi ja logisid. Service role votmed jaavad ainult serverisse.

<h2 id="resend">Resend</h2>

Resend saadab kampaaniaid, kliendi staatuse kirju ja moodulite teavitusi. Enne booking voi rent email flow kasutamist seadista API key, saatja nimi ja saatja email.

<h2 id="stripe">Stripe</h2>

Stripe haldab tasulisi checkout flow'sid ja makse staatus peab workspace poolel sunkroonis pusima. Avalik extaas.com makselink peab naitama ainult tasumisele kuuluvat summat ja suunama kasutaja sisse logima, kui ta tahab sisu naha.

<h2 id="modules">Moodulid</h2>

Pages haldab avalikku identiteeti ja sisu. Audience haldab kontakte. Email saadab kirju. Booking haldab sessioone. Rent haldab rendi objekte. Store haldab checkouti. Calendar naitab aktiivseid tegevusi.

<h2 id="customer-actions">Kliendi tegevused</h2>

Kinnituse ja staatuse emailid sisaldavad kliendi iseteeninduse linke, kus klient saab bookingut tühistada, rendiparingut tühistada voi audience listist lahkuda.

<h2 id="security">Turvalisus</h2>

Supabase service role votmed, Stripe secretid ja Resend API key'd peavad jaama serverisse. Avalikud lehed tohivad naidata ainult kliendile lubatud seadeid ja meediat.

<h2 id="credit-usage">Krediitide kasutus</h2>

Krediite kasutatakse ainult sisuliste vaartus-sundmuste jaoks. Seadistamine ja sisu muutmine on tasuta.

<h3 id="credit-usage-email">Email</h3>

Emaili saatmine kasutab 1 krediidi iga kohale toimetatud saaja kohta. Template'ide, komponentide, manuste, payload andmete ja audience liikmete muutmine on tasuta.

<h3 id="credit-usage-booking">Booking</h3>

Booking reserveerib krediidid, kui paring vastu voetakse. Edukalt lopetatud booking kasutab krediite umardatud tundide jargi, kui algus ja lopp on teada. Kui lopp puudub, kasutatakse 1 krediit. Tühistatud booking vabastab reserveeritud krediidid.

<h3 id="credit-usage-rent">Rent</h3>

Rent reserveerib krediidid, kui paring kinnitatakse. Kogus soltub rendiperioodist. Edukas lopetamine kasutab reserveeritud krediidid. Tühistatud voi tagasi lükatud paring krediite ei kasuta.

<h3 id="credit-usage-store">Store</h3>

Store kasutab 1 krediidi iga ostetud ostukorvi rea kohta peale edukat Stripe makset. Toodete vaatamine, Stripe seadete muutmine ja tootekardi kujunduse muutmine krediite ei kasuta.

<h3 id="credit-usage-pages">Avalikud lehed</h3>

Avalikud lehed kasutavad iga aktiivse avaliku lehe kohta paevaseid krediite, sest need hoiavad kliendile nahtavat sisu uleval. Lehtede ja redirectide loomine, muutmine ja valja lulitamine on tasuta.

<h3 id="credit-usage-workspace">Workspace ligipaas</h3>

Iga aktiivne workspace kasutab 1 krediidi paevas. Kui krediidid saavad otsa, pausitakse tasulised avalikud tegevused kuni krediite lisatakse.

<h2 id="compliance">Compliance valmisolek</h2>

Portaal on ehitatud GDPR teadliku andmeminimeerimise, serveripoolsete saladuste, auditit toetavate logide, WCAG kontrasti kontrollide ja least-privilege ligipaasu peale. ISO 27001, SOC 2 Type II ja HIPAA eeldavad lisaks organisatsiooni poliitikaid, lepinguid, riskiregistreid ja valiseid auditeid.
