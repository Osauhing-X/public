# Booking ja Rent: päringust lõpetamiseni

Booking ja Rent muudavad vabatekstilise kliendikirja hallatavaks töövooks. Booking keskendub teenusele ja ajale; Rent ressursile, kogusele ning perioodile. Mõlemas voos on kliendi esmane tegevus tavaliselt päring, mitte automaatne lõplik kinnitus.

<div class="grid gap _3" style="grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); margin-block: 1.5rem;">
  <div class="css _radius _padding"><span class="css _color _dark">BOOKING</span><h3>Kes, mida ja millal?</h3><p>Teenus, asukoht, soovitud aeg, kliendi lisainfo ja meeskonna kinnitus.</p></div>
  <div class="css _radius _padding"><span class="css _color _dark">RENT</span><h3>Mida, kui palju ja kui kauaks?</h3><p>Ressurss, kogus, rendiperiood, üleandmine, tagastus ja saadavus.</p></div>
</div>

## Kumb moodul valida?

Kasuta Booking'ut, kui põhiküsimus on teenuse toimumise aeg: kohtumine, konsultatsioon, hooldus, külastus või töötaja ajaplokk. Kasuta Renti, kui sama piiratud ressurss antakse kliendile perioodiks kasutusse: ese, seade, sõiduk, ruum või digitaalne ressurss.

Kui klient ostab fikseeritud toote kohe ja perioodi pole vaja kinnitada, sobib paremini Store. Kui vaja on ainult üldist hinnapäringut, võib piisata Contact Formist.

## Booking'u seadistamine

### Teenus

Kirjelda kliendi tulemust, mitte ainult sisemist teenusekoodi. Lisa kestus või ajakulu ootus, ettevalmistus, hind või hinnastamise põhimõte ning piirangud. Kui hind sõltub ülevaatusest, ütle „hind kinnitatakse pärast päringu ülevaatamist”, mitte ebamäärane „alates”.

### Asukoht

Asukoht võib olla füüsiline, veebipõhine või hübriidne. Füüsilise asukoha juures anna aadress ja saabumisjuhis; veebiteenuse puhul ära avalda püsivat privaatset kohtumislinki enne kinnitamist.

### Kliendivorm

Süsteemiväljade kõrvale lisa ainult otsustamiseks vajalikud küsimused. Näiteks sõiduki hooldusel võib olla vaja registrinumbrit ja probleemi kirjeldust; üldise konsultatsiooni puhul teemat ja eesmärki. Ära küsi infot, mida teenuse osutaja ei kasuta.

### Teavitused

Määra üks või mitu aadressi, mis saavad uue päringu teavituse. Hoia teavituskiri lühike ja suuna haldaja Workspace'i, kus õigused ja täielik kontekst on kontrollitud. Kliendile saadetav vastuvõtukinnitus ei tohi jätta muljet, et aeg on juba garanteeritud.

## Rendi seadistamine

### Kuulutus

Hea kuulutus sisaldab pealkirja, seisukorda, kogust, hinda, hinnastamise perioodi, kasutuspiiranguid ning selgeid fotosid. Workspace toetab ühe rendieseme juures kuni 20 pilti. Esimene pilt peaks andma esemest arusaadava üldvaate.

### Saadav kogus

Kogus on reaalne piir, mitte turundusnumber. Kinnitamisel arvesta kattuvate perioodide, hoolduse, transpordi ja juba kinnitatud broneeringutega. Kui automaatset saadavusarvutust pole, peab haldaja enne kinnitamist kalendrit või registrit kontrollima.

### Kättesaamine ja tagastamine

Loo korduvkasutatavad asukohad: ladu, esindus, tarne, veebipõhine üleandmine või muu. Avalik info võib kirjeldada üldist piirkonda; täpse privaatse juhise saab lisada kinnituse lisainfosse. Märgi tagastamise tähtaeg, seisukorra kontroll ja hilinemise kontakt.

### Hind ja makse

Tühi või nullhind võib tähendada, et avalikku hinnasilti ei kuvata või teenus on tasuta. Kui hind on olemas, selgita ühik: kord, päev, nädal või kogu periood. Rent-päringu kinnitamine ei tõenda makset; makselink ja makse olek peavad kasutama eraldi kontrollitud maksevoogu.

## Ühine olekumudel

| Olek | Tähendus | Järgmine tegevus |
| --- | --- | --- |
| Uus / ootel | klient esitas päringu | kontrolli täielikkust ja saadavust |
| Vajab infot | otsustamiseks on midagi puudu | küsi konkreetne lisainfo |
| Kinnitatud | aeg või ressurss on reserveeritud | saada lõplik juhis ja vajadusel makseinfo |
| Aktiivne | teenus või rent on alanud | jälgi kokkulepet ja kõrvalekaldeid |
| Lõpetatud | teenus osutatud või ese tagastatud | salvesta tulemus ja vabasta ressurss |
| Tühistatud / tagasi lükatud | tegevust ei toimu | teavita klienti ning vabasta aeg või kogus |

Kõik olekud ei pea UI-s eraldi olemas olema, kuid tähendus peab olema üheselt mõistetav. Ära kasuta sama staatust nii „ootab meeskonda” kui „ootab klienti” jaoks.

## Kinnitamise kontroll

Enne kinnitamist kontrolli:

- õige tenant ja teenus/ese;
- kliendi nimi ning toimiv kontakt;
- kuupäevad, kellaaeg, ajavöönd ja kestus;
- asukoht või üleandmisviis;
- saadav töötaja, ruum, kogus või ese;
- hind, käibemaksu käsitlus ja makse järgmine samm;
- kinnituskirja muutujad ja privaatne lisainfo;
- krediidikulu ning topeltkliki kaitse.

## Muutmine ja tühistamine

Klienditegevuse link peab olema piiratud õige päringu ning lubatud toiminguga. Ära pane URL-i ennustatavat järjestikust ID-d ilma täiendava kaitseta. Aeguv või ühekordselt kasutatav token vähendab kuritarvituse riski.

Oluline muudatus – aeg, periood, hind, asukoht või ese – vajab uut kliendikinnitust või vähemalt selget teavitust. Tühistamine peab vabastama saadavuse ning jätma logisse tegija, aja ja põhjuse. Ära kustuta kirjet lihtsalt selleks, et see nimekirjast kaoks.

## Kliendikirjade sisu

**Vastuvõtukinnitus:** päringu viide, esitatud põhiinfo, eeldatav vastamise aeg ja kontakt.

**Kinnitus:** lõplik aeg/periood, koht/üleandmine, hind või maksejuhis, muutmise/tühistamise võimalus ning klienditoe kontakt.

**Tagasilükkamine või tühistamine:** selge olek, sobiv põhjus, tagasimakse või järgmine samm ja alternatiiv, kui seda saab ausalt pakkuda.

## Igapäevane tööjärjekord

1. Vaata vanimad ootel päringud esimesena üle.
2. Tuvasta tähtaja ületanud ja ilma vastutajata tegevused.
3. Kontrolli kattuvat saadavust enne kinnitamist.
4. Vaata e-kirja saatmistulemust, mitte ainult nupuvajutust.
5. Märgi alanud ja lõpetatud tegevused õigel ajal.
6. Uuenda rendieseme kogust või seisukorda pärast tagastust.
7. Lahenda failed/error logid enne uute avalike päringute reklaamimist.

## Edu mõõtmine

Kasulikud mõõdikud on päringute arv, kinnitamise osakaal, esimese vastuse aeg, tühistamiste põhjus, kasutusaste, no-show'd, hilinenud tagastused ning e-kirja bounce'id. Tõlgenda mõõdikuid kontekstis: madal kinnitamise määr võib tähendada valet sihtrühma, ebaselget saadavust või puudulikku vormi.

## Seotud juhendid

- [Moodulite valik](/et/docs/modules-overview)
- [Klienditeekonnad](/et/docs/customer-workflows)
- [Resend](/et/docs/resend)
- [Supabase](/et/docs/supabase)

