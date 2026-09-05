# Vormid, küsitlused ja CRM

![Teekond vormist korrastatud kliendisuhteni](https://raw.githubusercontent.com/Osauhing-X/public/www/workspace.extaas.com/read/docs/forms-and-crm/cover.png)

Vorm kogub kliendilt struktureeritud sisendi. CRM muudab selle sisendi hallatavaks kliendisuhteks. Neid tasub kasutada koos siis, kui vastus vajab omanikku, järeltegevust, ajalugu või hilisemat analüüsi.

<div class="grid gap _3" style="grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); margin-block: 1.5rem;">
  <div class="css _radius _padding"><span class="css _color _dark">KOGU</span><h3>Õige küsimus</h3><p>Küsi ainult seda, mida on otsuse või teenuse jaoks päriselt vaja.</p></div>
  <div class="css _radius _padding"><span class="css _color _dark">SUUNA</span><h3>Selge vastutaja</h3><p>Igal vastusel peab olema omanik, prioriteet ja vastamise tähtaeg.</p></div>
  <div class="css _radius _padding"><span class="css _color _dark">JÄLGI</span><h3>Üks kliendiajalugu</h3><p>Seo korduvad pöördumised sama CRM-kontaktiga ja väldi duplikaate.</p></div>
</div>

## Millist tööriista kasutada?

| Vajadus | Sobiv moodul | Näide |
| --- | --- | --- |
| Üldine ühenduse võtmine | Contact Form | hinnapäring, tugiküsimus, koostööpakkumine |
| Kohandatud andmekogumine | Forms & Surveys | tagasiside, registreerimine, vajaduste kaardistus |
| Püsiv kliendivaade | Customers / CRM | kontakt, staatus, märkmed ja järeltegevus |
| Ajaga seotud teenusepäring | Booking | teenus, asukoht ja soovitud aeg |
| Perioodiga ressursipäring | Rent | ese, kogus, algus ja lõpp |

Ära ehita üldvormi sisse tervet Booking'u või Rendi protsessi. Spetsiaalne moodul annab parema staatuse, halduse ja kliendikogemuse.

## Hea vormi ülesehitus

1. Ütle pealkirjas, mille jaoks vorm on.
2. Selgita, mis juhtub pärast saatmist ja millal vastatakse.
3. Küsi kontaktandmetest ainult vajalikud väljad.
4. Rühmita seotud küsimused arusaadavateks osadeks.
5. Märgi kohustuslikkus enne saatmist, mitte alles veateates.
6. Lisa privaatsusteade ja vajadusel eraldi turundusnõusolek.
7. Näita pärast saatmist kinnitust ning alternatiivset kontaktikanalit.

Pikk vorm suurendab loobumist. Kui infot on vaja alles pärast esmase sobivuse kinnitamist, küsi see järeltegevuses.

## Väljatüübi valimine

| Andmed | Soovituslik väli | Kontroll |
| --- | --- | --- |
| Nimi | lühike tekst | mõistlik pikkus, ära eelda ainult kahte nimeosa |
| E-post | e-post | vorming, normaliseerimine, kirjavigade märguanne |
| Telefon | telefon/tekst | riigikood, ära eemalda `+` märki |
| Kuupäev | kuupäev | ajavöönd ja mineviku/tuleviku reegel |
| Kogus | number | minimaalne, maksimaalne ja täisarvu vajadus |
| Pikem kirjeldus | pikk tekst | pikkuse piir ja turvaline renderdamine |
| Valik | radio/select | väldi kattuvaid vastuseid; vajadusel „muu” |
| Nõusolek | märkeruut | vaikimisi valimata ja selge eesmärgiga |

## Nõusolek ja andmekaitse

Teenuse osutamiseks vajalik kontakt ning turundusnõusolek on erinevad eesmärgid. Ära tee uudiskirjaga nõustumist kontaktivormi saatmise tingimuseks. Salvesta nõusoleku tekst või versioon, aeg, allikas ja loobumise olek, et nõusolekut saaks hiljem tõendada.

Väldi tundlike isikuandmete kogumist, kui töövoog pole selle jaoks spetsiaalselt turvatud ja õiguslikult hinnatud. Ka vaba teksti väli võib sisaldada ootamatult tundlikku infot; piira ligipääsu ning ära kopeeri vastuseid tarbetult e-kirjadesse või logidesse.

## CRM-i töövoog

Soovituslikud sammud pärast vormivastust:

1. Otsi olemasolevat kontakti normaliseeritud e-posti või telefoni järgi.
2. Loo uus kontakt ainult siis, kui sobivat kirjet pole.
3. Seo pöördumine kontakti, tenanti ja vormi allikaga.
4. Määra vastutaja, staatus ja järgmise tegevuse kuupäev.
5. Hoia faktid struktureeritud väljades ning arvamus/märkus eraldi.
6. Logi oluline olekumuutus, kuid ära dubleeri kogu kliendiandmestikku.
7. Sulge tegevus tulemuse ja vajadusel järelkontakti kuupäevaga.

## Soovituslikud staatused

- **Uus:** keegi pole vastust veel läbi vaadanud.
- **Kvalifitseerimisel:** kontrollitakse vajadust, sobivust või täielikkust.
- **Vajab vastust:** järgmine tegevus on meeskonnal.
- **Ootab klienti:** vajalik info või otsus peab tulema kliendilt.
- **Lahendatud:** eesmärk saavutati või küsimus vastati.
- **Suletud:** tegevust ei jätkata; põhjus peab olema arusaadav.

Staatus ei asenda järgmist tegevust. „Ootab klienti” kirje juurde lisa, mida oodatakse ja millal uuesti kontrollida.

## Automaatika võimalused

Resend võib saata kliendile vastuvõtukinnituse ja vastutajale teavituse. Supabase hoiab vormivastust ja CRM-seost. Calendar võib kuvada järeltegevuse tähtaja. Kanban sobib keerukama müügi- või täitmisprotsessi etappideks.

Automaatvastus peab ütlema, et sõnum võeti vastu, mitte lubama tulemust, mida inimene pole kinnitanud. Väldi kliendi kogu vastuse peegeldamist e-kirja, kui see võib sisaldada privaatset infot.

## Kvaliteedi ja rämpsposti kontroll

- Kasuta serveripoolset valideerimist ka siis, kui brauser juba kontrollib välju.
- Piira päringute sagedust IP, vormi ja tenanti kontekstis.
- Kasuta honeypot'i või muud rämpspostikaitset, mis ei takista abitehnoloogiaid.
- Normaliseeri e-post ja telefon enne duplikaadikontrolli.
- Ära usalda faili nime, MIME tüüpi ega HTML-i; faililaadimine vajab eraldi turvareegleid.
- Logi ohutu veakood, mitte kogu vormi sisu.

## Mõõdikud, mis päriselt aitavad

Jälgi vormi alustamist ja lõpetamist, veaga välju, esimese vastuse aega, lahendamise aega, duplikaatide hulka ning tulemust. Ära kogu analüütikat lihtsalt kogumise pärast: igal mõõdikul peab olema otsus, mida selle põhjal teha.

## Avaldamise kontrollnimekiri

- Vorm töötab klaviatuuri ja mobiiliga.
- Label'id ja veateated on seotud õigete väljadega.
- Kohustuslikud väljad on minimaalsed.
- Kinnitustekst eristab vastuvõtmist ja lõplikku heakskiitu.
- Vastutaja saab teavituse või näeb uut kirjet tööjärjekorras.
- CRM ei loo sama testkontakti korduvalt.
- Privaatsus- ja nõusolekutekstid on õigel keelel.
- Säilitamise ja kustutamise vastutaja on teada.

## Seotud juhendid

- [Moodulite valik](/et/docs/modules-overview)
- [Klienditeekonnad](/et/docs/customer-workflows)
- [Supabase](/et/docs/supabase)
- [Resend](/et/docs/resend)
