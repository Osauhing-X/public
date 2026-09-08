# Workspace'i moodulid: mida kasutada ja miks?

![Extaas Workspace'i moodulid moodustavad ühe ühendatud töövoo](https://raw.githubusercontent.com/Osauhing-X/public/www/network/Our%20Domains/workspace.extaas.com/docs/modules-overview/cover.png)

Moodul on konkreetse töövoo tööriist. Integratsioon ühendab selle välise teenusega, mis annab moodulile andmebaasi, e-posti, makse või tehisintellekti võimekuse. Kõiki mooduleid ei pea korraga kasutusele võtma: parim lahendus algab ühest selgest klienditeekonnast ja kasvab tegeliku vajaduse järgi.

<div class="grid gap _3" style="grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); margin-block: 1.5rem;">
  <div class="css _radius _padding">
    <span class="css _color _dark">ALUSTA SIIT</span>
    <h3>Üks klienditeekond</h3>
    <p>Vali esmalt üks tulemus, mida klient peab portaalis saavutama.</p>
  </div>
  <div class="css _radius _padding">
    <span class="css _color _dark">EHITA KINDLALT</span>
    <h3>Õiged sõltuvused</h3>
    <p>Ühenda ainult mooduli jaoks vajalik andme-, e-posti- või makseteenus.</p>
  </div>
  <div class="css _radius _padding">
    <span class="css _color _dark">AVALDA</span>
    <h3>Testitud tervik</h3>
    <p>Avalik vaade, Workspace, teavitus ja logi peavad töötama algusest lõpuni.</p>
  </div>
</div>

## Kiirvalik vajaduse järgi

| Kui soovid… | Kasuta | Miks see kasulik on? | Vajalik alus |
| --- | --- | --- | --- |
| avaldada ettevõtte infot ja kampaanialehti | **Pages** | sisu saab muuta ilma kogu veebilehte ümber ehitamata | Supabase |
| jagada ainult meeskonnale mõeldud juhiseid | **Private Pages** | protsessid ja sisemised märkmed püsivad sisselogimise taga | Supabase |
| koguda üldisi päringuid | **Contact Form** | struktureeritud päring ei kao isiklikku postkasti | Supabase; teavituseks Resend |
| koostada ankeete või tagasisideküsitlusi | **Forms & Surveys** | iga kasutusjuhu jaoks saab küsida täpselt vajalikud väljad | Supabase |
| hoida kliendisuhted ühes kohas | **Customers / CRM** | kontakt, ajalugu ja järeltegevus on seotud ühe kliendikirjega | Supabase |
| koguda ajapõhiseid teenusepäringuid | **Booking** | teenus, asukoht, soovitud aeg ja kinnitus moodustavad ühe voo | Supabase; e-kirjadeks Resend |
| pakkuda esemeid või ressursse rendile | **Rent** | saadavus, periood, kogus, üleandmine ja kinnitus püsivad koos | Supabase; e-kirjadeks Resend |
| müüa Stripe'i kataloogi tooteid | **Store** | aktiivsed tooted ja hinnad tulevad Stripe'ist ning klient saab kasutada ostukorvi | Supabase + Stripe |
| hallata kontakte ja sihtrühmi | **Audience** | kontaktid, sildid ja loobumised on kampaaniatest eraldatud | Resend; püsivaks andmestikuks Supabase |
| saata kujundatud e-kirju | **Email** | mallid, komponendid, manused, eelvaade ja saatmislogika on ühes kohas | Supabase + Resend; AI jaoks OpenAI |
| näha tegevusi ajateljel | **Calendar** | bookingud, rendid ja meeldetuletused koonduvad ühte vaatesse | Supabase |
| korraldada meeskonna sisetööd | **Kanban** | tahvlid, kaardid, vastutajad ja tähtajad teevad töö seisu nähtavaks | Supabase |

## Avalik, privaatne või hübriidne?

- **Avalikud moodulid** annavad kliendile sisu või vormi tenant-domeenil: Pages, Contact Form, Forms & Surveys, Booking, Rent ja Store.
- **Privaatsed moodulid** on omaniku või meeskonna töövahendid: Private Pages, CRM, Calendar, Kanban ja logid.
- **Hübriidsed moodulid** algavad avalikult, kuid jätkuvad Workspace'is. Näiteks klient esitab booking-päringu avalikul lehel, meeskond vaatab selle Workspace'is üle ja klient saab piiratud staatuse või kinnituse e-kirjaga.

Avalik vorm ei tähenda avalikku andmebaasi. Brauser peab saama esitada ainult lubatud välju; kliendiloend, sisemised märkmed ja teiste klientide päringud jäävad privaatseks.

## Olulisemad moodulid lähemalt

### Pages ja Private Pages

Kasuta Pages moodulit siis, kui turundus- või teenusesisu peab muutuma sagedamini kui rakenduse kood. Avalda ainult valmis kirjeid, kasuta arusaadavaid URL-e ja kontrolli mobiilivaadet. Private Pages sobib tööjuhendite, protsesside, ligipääsuga ressursside ja sisemiste märkmete jaoks. Seda ei tohi kasutada saladuste hoidmiseks: API võtmed kuuluvad integratsiooniseadetesse, mitte HTML-lehele.

### Contact Form, Forms & Surveys ning CRM

Contact Form on hea üldise „võta ühendust” teekonna jaoks. Forms & Surveys sobib juhul, kui küsimused, kohustuslikkus või vastuse struktuur muutuvad kampaania või teenuse järgi. CRM annab nende vastuste järel meeskonnale püsiva kliendivaate.

Küsi ainult otsuse tegemiseks vajalikke andmeid. Igal vormil peaks olema eesmärk, vastutaja, vastamise tähtaeg, privaatsusteade ja rämpspostikaitse. Ära küsi tervise-, makse- või isikut tõendavaid andmeid tavalisel kontaktvormil.

### Booking

Booking sobib teenusele, mille juures on tähtis aeg, koht ja kinnitamine: konsultatsioon, hooldus, kohtumine või teenindusaeg. Defineeri teenused ja asukohad enne vormi avaldamist. Lisa ainult sobivuse hindamiseks vajalikud lisaväljad.

Päringu esitamine ei pea tähendama automaatset kinnitust. Turvaline voog on: klient esitab soovi → meeskond kontrollib saadavust → kinnitab või tühistab → klient saab järgmised juhised. See väldib topeltbroneeringuid ja lubab erandjuhtumeid käsitsi hinnata.

### Rent

Rent on mõeldud esemetele, seadmetele, ruumidele või muudele piiratud ressurssidele. Kuulutuse juures tasub kirjeldada kogust, perioodi, hinda, kättesaamise kohta, tagastamist ja seisukorda. Kuni 20 selget pilti aitab vähendada korduvaid küsimusi.

Kontakti võib hoida kuni kinnitamiseni peidetuna. Kinnituse privaatne lisainfo sobib makselingi, üleandmisjuhise või lepingumärkuse edastamiseks. Sisemised märkused ei tohi kliendikirja sattuda.

### Store

Store kuvab aktiivseid ühekordse maksega Stripe'i tooteid ja hindu. Kasuta seda siis, kui tootekataloogi ning makseallika üks tõde peab olema Stripe. Enne avaldamist lisa privaatsuspoliitika, kasutus- ja müügitingimuste lingid ning testi success/cancel teekond.

Store ei asenda lao-, tarne- ega tagastusprotsessi, kui need pole eraldi rakendatud. Kirjelda kliendile ausalt, mis juhtub pärast makset ja kes täidab tellimuse.

### Audience ja Email

Audience hoiab saatmise sihtrühma; Email koostab ja saadab sõnumi. Hoia nõusoleku allikas, liitumise aeg ja loobumise olek. Ära impordi nimekirju, mille turundusnõusolekut ei saa tõendada. Tehingukirjad (nt booking-kinnitus) ja turunduskampaaniad vajavad erinevat eesmärki ning sageli erinevat loobumisloogikat.

Emaili varad jagunevad mallideks, komponentideks ja manusteks. Mall annab tervikpaigutuse, komponent korduvkasutatava ploki ning manus faili. Enne pärissaatmist kasuta eelvaadet ja testkirja.

### Calendar ja Kanban

Calendar koondab ajaga seotud sündmused; Kanban koondab töö oleku. Kalender vastab küsimusele „millal?”, Kanban küsimusele „mis seisus ja kelle käes?”. Kasuta neid koos, kui ülesandel on nii tähtaeg kui ka mitmeetapiline töövoog.

## Soovituslik kasutuselevõtt

1. Kirjelda ühe lausega kliendi soovitud tulemus.
2. Vali üks põhimoodul, mis seda tulemust teenib.
3. Ühenda ainult selle mooduli nõutud integratsioonid.
4. Loo minimaalne avalik sisu, vorm või kataloog.
5. Määra omanik, haldajad ja vastamise aeg.
6. Testi anonüümse kliendi ja sisselogitud haldaja vaadet.
7. Kontrolli e-kirju, logisid, mobiilivaadet ja veateateid.
8. Lisa järgmine moodul alles siis, kui esimene voog töötab lõpuni.

## Levinud valed valikud

- **Booking vormi asemel Contact Form:** sobib vaid siis, kui aega, teenust ja staatust pole vaja struktureeritult hallata.
- **Rent Store'i asemel:** Rent kogub perioodipäringu ja vajab kinnitust; Store müüb fikseeritud Stripe'i toodet.
- **Pages Private Pages'i asemel:** avalik Pages ei sobi sisemiste protsesside ega kliendi privaatinfo jaoks.
- **Calendar Kanbani asemel:** kalender ei kirjelda hästi mitmeetapilist töövoogu; Kanban ei asenda täpset ajakava.
- **OpenAI Resendi asemel:** OpenAI kirjutab mustandi, Resend toimetab e-kirja kohale. Need lahendavad eri probleeme.

## Valmisoleku kontroll

- Mooduli eesmärk ja vastutaja on teada.
- Nõutud integratsioonid näitavad valmisolekut.
- Õigused on testitud omaniku, määratud kasutaja ja avaliku külastajana.
- Privaatsed väljad ei ilmu avalikku vastusesse, URL-i ega e-kirja.
- Kliendile on selge, kas tegu on päringu, kinnituse või lõpliku ostuga.
- Ebaõnnestumine jätab logi ja annab kasutajale järgmise sammu.
- Tasuline väärtussündmus ning võimalik krediidikulu on enne tegevust arusaadav.

## Seotud juhendid

- [Alustamine](/et/docs/getting-started)
- [Workspace'i portaal](/et/docs/workspace-portal)
- [Integratsioonide valimine](/et/docs/integrations-guide)
- [Klienditeekonnad](/et/docs/customer-workflows)
