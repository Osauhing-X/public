# OpenAI integratsioon

OpenAI integratsioon aitab luua e-kirjade tekste, malle, korduvkasutatavaid komponente ja operatiivseid mustandeid. API key peab jääma serverisse ja ei tohi kunagi brauserisse jõuda.

## Kus sellest kasu on?

Peamine kasutuskoht on Email moodul:

- kampaania tekst;
- tehingukirja sisu;
- HTML e-kirja mall;
- korduvkasutatavad sisublokid;
- subject line'id;
- moodulisündmuste lühikokkuvõtted;
- support vastuse esimesed mustandid.

Lisaks võib see aidata staffil koostada dokumentatsiooni lõike, KKK vastuseid ja kliendile mõeldud seadistusjuhiseid.

## Turvareeglid

Ära saada:

- API võtmeid;
- Supabase service role võtmeid;
- Stripe secret'eid;
- täielikke kliendiandmestikke;
- kaardi/makse detaile;
- privaatseid arveridu, kui kasutajal puudub ligipääs või neid pole ülesandeks vaja.

Saada ainult see kontekst, mis on konkreetse teksti koostamiseks vajalik.

## Hea prompti mall

```text
Keel:
Toon:
Saaja:
Eesmärk:
Vajalikud detailid:
Keelatud detailid:
Pikkus:
Tegevuskutse:
```

Näide:

```text
Keel: eesti
Toon: sõbralik ja professionaalne
Saaja: booking klient
Eesmärk: kinnitada, et booking päring võeti vastu
Vajalikud detailid: kuupäev, kellaaeg, tühistamise link
Keelatud detailid: sisemised workspace märkmed
Pikkus: alla 120 sõna
Tegevuskutse: "Vaata bookingu staatust"
```

## Malli väljundi reeglid

HTML e-kirjade loomisel:

- hoia layout responsive;
- kasuta e-kirjale sobivat lihtsat struktuuri;
- lisa selge CTA tekst;
- ära lisa saladusi;
- hoia fallback tekst loetav;
- tee dünaamilised väljad selgelt nähtavaks.

## KKK

### Kas tenant saab AI-d otse kasutada?

Jah, kui funktsioon on piiratud ja rate-limititud. Tenant prompt peab töötama ainult lubatud tenanti andmetega.

### Kas AI võib e-kirju automaatselt saata?

Ei. AI võib teha mustandi või ettevalmistuse. Saatmine peab jääma selgeks mooduli tegevuseks koos eelvaate ja logimisega.

### Mis siis, kui genereeritud sisu on vale?

Käsitle AI väljundit mustandina. Kasutaja või staff peab selle enne kliendini jõudmist üle vaatama.
