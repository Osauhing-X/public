# Email ja Communication v2-s

## Mooduli enda API alates versioonist 0.1.8

Communicationi `api/contacts.js` määrab kontaktigruppide, normaliseeritud e-posti aadresside ja ühendatud All-vaate andmelepingu. Teine moodul deklareerib sõltuvuse `modules: [{"id":"audience","actions":["contacts"]}]` ning omanik valib konkreetse paigaldatud mooduli ühenduse. Kaust ei anna avalikku ega kogu andmehoidla lugemisõigust.

See versioon vajab Core’i üldise mooduli API ja `provider_reads` tuge. Uuenda esmalt Core, seejärel Resend 1.1.6 ja Email 0.1.8 ning alles siis Communication 0.1.8. Stripe’i ja Supabase’i kontaktide lugemine vajab vähemalt integratsiooni 0.1.6. Vali Service connections all lugemisteenused selgesõnaliselt; vana paigaldus ei saa uut võimekust ainult juhendi lugemisega. Teenusevõtmed ei jõua mooduli API-sse. Olemasolev täpne Emaili kontaktiallika lugemisluba säilib ainult sama sihtmooduli ja konteksti jaoks.

Email koostab kirju; Communication koondab seadistatud allikate kontaktivaate. Resend tegeleb saatmisega. Need on eri vastutusvaldkonnad. Mooduli varasem nimi ja püsiv paketi ID on Audience (`audience`); olemasolevad andmed ning `[import:audience]` ei vaja ümbernimetamist.

## Communicationi allikad

23.10.2026 lisatud võimekus nõuab uuendatud Core’i, Communication 0.1.7 ning vastavate integratsioonide uuendusi: Stripe 0.1.6, Supabase 0.1.6 ja Resend 1.1.5. Vanemas paigalduses ei pruugi neid valikuid olla; kataloogiuuendus ei uuenda paigaldatud pakette automaatselt.

Vali mooduli **Service connections** osas kasutatav ühendus. Kuvatakse ainult seadistatud ja valmis allikad: Resendi kontaktid, Stripe’i kliendid ning Supabase Authi kasutajad. Stripe’i ja Supabase’i privaatsed loendid nõuavad eraldi valitud ühendust ja täpset lugemisõigust; üldist Supabase’i halduspäringut moodulile ei anta.

**All** ühendab sama normaliseeritud e-posti üheks reaks, säilitades allikate info ja teadaoleva Resendi loobumise. Kontakte ei kopeerita teise teenusesse ega märgita automaatselt nõusolekuga isikuteks. Stripe’i ja Authi vaated on siin ainult lugemiseks. Ebaõnnestunud allikas kuvatakse kättesaamatuna, mitte eduka tühja loendina. Stripe’i/Authi päringud on piiratud 1000 teenusekirjega; liiga suurt või poolikut loendit eduka tulemusena ei kasutata.

## Eraldi adresseeritud hulksaatmine

Emaili **Communication recipients** vaates vali Communicationi moodul, selle grupp ning konkreetsed saajad. Samas allika- ja rakenduskontekstis olevad sobivad moodulid leitakse automaatselt. Kui Core toetab **Communication contact source** ühendust, saab kohalik administraator Emaili lehe allosas valida ka sama allika teise Applicationi Communicationi mooduli ja kontaktide lugemise eraldi kinnitada. Moodulite rakenduse või allika muutumisel tuleb ühendus uuesti üle vaadata; kontakte ei kopeerita ega avaldata. Üks kinnitatud saatmine toetab 1–100 saajat. Iga kiri sisaldab ühte To-aadressi; ühiseid To/CC/BCC loendeid ei kasutata. Resendi batch-API ei toeta selles voos manuseid ning päringu suurus on piiratud. Tavaline üksikkirja saatmine jääb eraldi võimaluseks.

Enne saatmist kontrollib server grupikuuluvust ja loobumisi uuesti. Saajad ning õigus nendega ühendust võtta tuleb eraldi kinnitada. Muutunud või grupivälise valiku ning kättesaamatu seadistatud allika korral saatmine blokeeritakse.

Ebaselge tulemuse puhul säilita sama sisu, saajad ja päringu ID. Resendi duplikaadikaitse kestab 24 tundi; Core lubab ebakindlat korduspäringut kuni 23 tundi ning juba kinnitatud päringut uuesti ei saada. Pärast seda tuleb kontrollida teenuse logisid. Automaatset taaskäivitusejärgset edasisaatmist pole. Kohalik saatmiskviitung sisaldab räsi, päringu ID-d, arvu ja olekut, mitte kirja sisu ega saajate aadresse.

## Valmista ette ja kontrolli

Seadista Resend, kontrolli teenuses saatja identiteeti, vali õiged saajad ning vaata üle teema, sisu, lingid ja manused. Enne kinnitatud pärissaatmist testi ainult enda kontrollitava aadressiga.

Email kasutab korduvkasutatavaid varasid ja koopiapõhist seisu. Kontrolli paigaldatud versiooni manusepiire, mitte v1 lubadust 20 faili / 25 MB kohta; Core’i kohalikul manusehoidlal on väiksem failipõhine piir.

## Nõusolek ja olek

Kontaktipäring ei anna automaatselt turundusõigust. Turundust saatvas töövoos säilita eesmärk ja loobumise olek.

Teenuse vastuvõetud päring ei tõenda postkasti jõudmist. Võimalusel kontrolli teenuse kohaletoimetamise või tagasilükkamise olekut. Ära lisa v1 krediidikulu ega automaatset AI-koostamist, mida paigaldatud v2 pakett ei teosta.

Võtmed, sisemärkmed ja tarbetud privaatsed andmed ei kuulu kirja. Läbivaatamata genereeritud mustandit ei tohi esitada kontrollitud sisuna.
