# Resend integratsioon

Resend saadab kliendikirjad, audience kampaaniad, bookingu kinnitused, rendi uuendused, arve meeldetuletused ja madala krediidi teavitused. See on workspace integratsioon ja API key peab jääma serverisse.

## Vajalikud seaded

- API key, mida kasutatakse ainult serveris.
- Saatja nimi.
- Saatja e-post/domeen.
- Vajadusel reply-to aadress.
- Mooduli e-kirjade sisud: booking notify, booking confirm, rent notify, rent confirm ja staatuse uuendused.
- Vajadusel korduvkasutatavad varad: mallid, komponendid, manused ja meedia.

## Email moodul

Email moodul peaks toetama:

- kampaania koostamist;
- audience saajate valimist;
- renderdatud e-kirja eelvaadet;
- mallide ja komponentide taaskasutust;
- hallatud manuseid;
- testkirja saatmist;
- saatmistulemuste logimist.

Mall võib olla tavaline HTML või JavaScripti fail, mis tagastab saatmisandmete põhjal HTML-i.

```js
export default function template({ customer, actionUrl }) {
  return `
    <h1>Tere ${customer.name}</h1>
    <p>Sinu booking on kinnitatud.</p>
    <a href="${actionUrl}">Vaata staatust</a>
  `;
}
```

## Mooduli e-kirjade näited

| Flow | Soovituslik kiri |
| --- | --- |
| Booking päring saabus | Teavita omanikku, lisa kliendi andmed ja soovitud aeg. |
| Booking kinnitatud | Anna kliendile aeg, koht ja tühistamise link. |
| Rent päring kinnitatud | Anna kliendile rendiperiood ja järgmine samm. |
| Rent tühistatud | Kinnita tühistamine ja lisa support kontakt. |
| Madalad krediidid | Teavita workspace omanikku enne tasuliste tegevuste pausimist. |
| Audience unsubscribe | Kinnita, et kontakt eemaldati turunduskirjadest. |

## Krediidiloogika

Kirja koostamine, mallide muutmine, komponentide lisamine ja manuste haldamine on tasuta. Krediiti kasutatakse siis, kui e-kiri päriselt saadetakse kohale toimetatavale saajale.

Soovituslik reegel:

```text
credits_used = delivered_recipient_count
```

Bounced või rejected tulemused tuleb logida. Krediidi tagastus sõltub konkreetse mooduli operatiivsest reeglist.

## Testimise kontroll

1. Kinnita saatja domeen Resendis.
2. Saada testkiri Workspace'ist.
3. Kontrolli, et HTML eelvaade vastab lõplikule kirjale.
4. Kontrolli unsubscribe ja klienditegevuste linke.
5. Kontrolli pärast saatmist logisid.
6. Veendu, et API key ei ole brauseri devtoolsis nähtav.

## KKK

### Kas tenant võib e-kirja teksti muuta?

Jah, kui moodul annab turvalised malliväljad. Ära lase usaldamata kasutajal serveripoolset JavaScripti ilma ülevaatuseta muuta.

### Kas OpenAI võib aidata e-kirju kirjutada?

Jah. Kasuta OpenAI-d mustandite, subject line'ide ja komponentide loomiseks, aga ära saada mudelile saladusi ega täielikke privaatseid kliendiandmeid.

### Mis juhtub, kui Resend puudub?

Moodul peab Workspace'is näitama setup olekut ja avalikud klienditegevused, mis vajavad e-kirja, tuleb peita või selgelt märkida mitteaktiivseks.
