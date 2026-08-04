# E-post ja Audience: usaldusväärne kliendisuhtlus

Audience vastab küsimusele „kellele?” ja Email küsimusele „mida ning kuidas saata?”. Resend toimetab sõnumi kohale, Supabase võib hoida varasid ja kontaktandmeid ning OpenAI võib aidata mustandit luua. Ükski neist ei asenda nõusolekut, inimkontrolli ega selget suhtluseesmärki.

<div class="grid gap _3" style="grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); margin-block: 1.5rem;">
  <div class="css _radius _padding"><span class="css _color _dark">AUDIENCE</span><h3>Õige inimene</h3><p>Kontakt, nõusoleku allikas, sildid, segment ja loobumise olek.</p></div>
  <div class="css _radius _padding"><span class="css _color _dark">EMAIL</span><h3>Õige sõnum</h3><p>Saatja, subject, mall, sisu, manused, eelvaade ja krediidikulu.</p></div>
  <div class="css _radius _padding"><span class="css _color _dark">RESEND</span><h3>Kontrollitav tulemus</h3><p>Accepted, delivered, bounced või rejected ei tähenda sama asja.</p></div>
</div>

## Turundus- ja tehingukiri

| Kirja liik | Eesmärk | Näited | Oluline piir |
| --- | --- | --- | --- |
| Tehingukiri | täita kliendi alustatud või kokkulepitud tegevust | booking-kinnitus, rendi olek, maksekinnitus | sisu peab jääma tegevusega otseselt seotuks |
| Turunduskiri | pakkuda, meenutada või kasvatada huvi | uudiskiri, kampaania, tooteteade | vajab sobivat õiguslikku alust ja loobumisvõimalust |
| Operatiivne kiri | aidata Workspace'i omanikul teenust hallata | madal krediit, integratsiooni tõrge, uus päring | saada ainult rollile, kes peab reageerima |

Ära peida turundussisu tehingukirja sisse. Kui kliendil on vaja booking-kinnitust, ei tähenda see automaatselt nõusolekut tulevasteks kampaaniateks.

## Kontaktikirje minimaalne kvaliteet

Kasulik kontakt sisaldab vähemalt normaliseeritud e-posti, allikat, loomise aega, nõusoleku/eesmärgi infot ja aktiivset loobumise olekut. Nimi, keel, ettevõte, sildid ja eelistused on väärtuslikud ainult siis, kui neid päriselt kasutatakse.

E-posti võrdlemisel arvesta tühikuid ja tavaliselt tähetundetuseta vormi, kuid ära rakenda kõigile teenusepakkujatele ohtlikke „nutikaid” ümberkirjutusi. Säilita vajadusel kasutaja sisestatud kuju kuvamiseks ning eraldi normaliseeritud väärtus otsinguks.

## Kontaktide lisamine

Kontakt võib tulla vabatahtlikust liitumisvormist, kliendisuhtest, impordist või administraatori sisestusest. Iga allika juures dokumenteeri eesmärk. Impordil kontrolli:

- kust nimekiri pärineb;
- kas saatmisõigust saab tõendada;
- millal kontaktid viimati kinnitasid huvi;
- kas loobunud ja bounced aadressid on eemaldatud;
- kas veerud, keel ja sildid on õigesti kaardistatud;
- kas duplikaadid ühendatakse, mitte ei saa sama kirja mitu korda.

Ostetud, kraabitud või teadmata päritoluga nimekiri kahjustab usaldust ja saatjadomeeni mainet ning ei sobi kasutamiseks.

## Segmenteerimine

Segment peab tulenema sõnumi eesmärgist. Head kriteeriumid on keel, kliendi staatus, kasutatud teenus, geograafiline piirkond, tõendatud huvi või viimase tegevuse aeg. Halb segment on „kõik kontaktid”, kui sõnum puudutab vaid väikest osa neist.

Enne saatmist kuva segmendi suurus ja mõned kontrollnäited. Välista alati loobunud, suppression-listis olevad ja konkreetse eesmärgi jaoks sobimatud kontaktid.

## Saatja identiteet

Saatja nimi peab olema kliendile äratuntav. `From` aadress kasutab Resendis verifitseeritud domeeni; `reply-to` peab jõudma postkasti, mida keegi päriselt jälgib. Ära kasuta `no-reply`, kui kliendil võib olla õigustatud vajadus vastata.

SPF, DKIM ja vajadusel DMARC aitavad vastuvõtjal saatjat kontrollida. DNS-i edukas verifitseerimine ei garanteeri head mainet: nimekirja kvaliteet, kaebused, bounce'id ja sisu mõjutavad tulemust jätkuvalt.

## Mallid, komponendid ja manused

- **Mall** on terviklik e-kirja paigutus ja renderdusloogika.
- **Komponent** on korduv plokk, näiteks päis, nupp, jalus või juriidiline tekst.
- **Manus** on korduvkasutatav või ühekordne fail.
- **Saatmisandmed** annavad mallile kliendi, tegevuse ja lingi väärtused.

JavaScripti mall peab eksportima renderdusfunktsiooni ja töötama ainult etteantud andmetega. Ära anna tenant-kasutajale kontrollimata serverikoodi käivitamise õigust. Dünaamiline väärtus tuleb HTML-i jaoks põgendada, kui selle allikas ei ole täielikult usaldatud.

Manus suurendab sõnumi mahtu ja võib halvendada kohaletoimetamist. Eelista turvalist aeguvat allalaadimislinki, kui fail on suur või sisaldab privaatset infot. Avalik pildilink peab kasutama HTTPS-i ja olema saajale kättesaadav.

## Premium-kirja sisu, mis jääb loetavaks

Hea e-kiri kasutab ühte selget põhieesmärki, lühikest sissejuhatust, skannitavaid lõike, tugevat kontrasti ja ühte peamist CTA-d. Oluline info peab olema päris tekst, mitte ainult pildil. CTA link peab olema arusaadav ka ilma nupukujunduseta.

Kasuta brändivärvi rõhuks, mitte kogu teksti taustaks. E-kirjakliendid toetavad CSS-i ebaühtlaselt, mistõttu eelista lihtsat paigutust, inline-stiile e-kirja renderduses ning toimivat fallback'i. Veebisaidi CVI CSS klasse ei saa eeldada saaja postkastis – need sobivad Workspace'i ja docs'i HTML-ile, mitte välise e-kirja sõltuvuseks.

## Subject ja preheader

Subject ütleb konkreetselt, miks kiri saabus. Väldi eksitavat kiireloomulisust, liigseid suurtähti ja lubadust, mida sisu ei täida. Preheader täiendab subject'i ega korda seda sõna-sõnalt.

Näited:

- `Sinu booking-päring on vastu võetud – vastame 1 tööpäeva jooksul`
- `Rendipäring #R-1042 on kinnitatud`
- `Augusti tooteuuendused ja üks vajalik tegevus`

## OpenAI kasutamine

AI võib koostada subject'i variante, lühendada teksti, kohandada tooni, tõlkida mustandit või luua esimese HTML-malli. Anna mudelile eesmärk, saaja, toon, keel, kohustuslikud faktid, keelatud detailid ja pikkus.

Ära saada mudelile tervet Audience nimekirja, API võtmeid, makseandmeid ega ülesandeks mittevajalikku kliendi ajalugu. Kontrolli tulemust nagu uue töötaja mustandit: faktid, lingid, kuupäevad, hinnad, nimed ja õiguslik tekst.

## Saatmiseelne kontroll

1. Eesmärk ja kirja liik on selged.
2. Segment ning eeldatav saajate arv on kontrollitud.
3. `from`, `reply-to`, subject ja preheader on õiged.
4. Kõik muutujad renderduvad ka puuduvate valikuliste andmetega.
5. Lingid kasutavad õiget tenant-domeeni ja HTTPS-i.
6. Loobumine on turunduskirjas nähtav ning töötab.
7. Mobiilne ja tume režiim on kontrollitud.
8. Manused avanevad ning nende maht on mõistlik.
9. Testkiri jõudis vähemalt ühte päris postkasti.
10. Krediidikulu ja saadaolev jääk on arusaadavad.

## Krediidid

Koostamine, eelvaade, mallide ja komponentide haldamine ei pea krediiti kulutama. Kulu tekib väärtussündmusel ehk päris saatmisel. Enne saatmist näita hinnangut saajate arvu põhjal ja pärast saatmist tegelikku tulemust vastavalt platvormi reeglile.

Korduv klikk ei tohi sama kampaaniat topelt saata ega topelt krediiti kasutada. Kampaanial võiks olla unikaalne saatmis-ID ja olek `draft → queued → sending → completed/failed`.

## Saatmistulemuste tähendus

- **Queued:** sõnum ootab töötlemist.
- **Accepted/Sent:** teenus võttis sõnumi vastu; see ei tõenda postkasti jõudmist.
- **Delivered:** vastuvõttev server kinnitas kohaletoimetamise.
- **Bounced:** aadress või vastuvõttev server lükkas kirja tagasi.
- **Rejected:** teenus ei võtnud saatmist vastu, näiteks seadistuse või poliitika tõttu.
- **Complained:** saaja märkis kirja rämpspostiks; kontakt vajab suppression'it.
- **Unsubscribed:** saaja loobus vastava eesmärgi turunduskirjadest.

## Pärast saatmist

Vaata bounce'i, kaebuste, loobumiste ja linkide tehnilist toimimist. Ära hinda edu ainult avamismäära järgi: privaatsuskaitse võib avamisi ebatäpselt mõõta. Äriline tulemus – vastus, booking, ost või lõpetatud tegevus – on sageli väärtuslikum.

Kõva bounce tuleb edasistest saatmistest eemaldada. Ajutise bounce'i puhul rakenda piiratud korduskatset, mitte lõputut saatmist. Suur kaebuste või loobumiste kasv tähendab, et sihtrühm, sagedus või sisu vajab muutmist.

## Seotud juhendid

- [Resend](/et/docs/resend)
- [OpenAI](/et/docs/openai)
- [Vormid ja CRM](/et/docs/forms-and-crm)
- [Integratsioonide valik](/et/docs/integrations-guide)

