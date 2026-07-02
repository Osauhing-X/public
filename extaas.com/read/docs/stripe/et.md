# Stripe arveldus

Stripe haldab workspace krediidioste, tasulisi checkout flow'sid ja tulevikus staff terminali makseid. Makse olek peab jääma Workspace'iga sünkroonis, et arved, krediidid ja ligipääs vastaksid päris maksetulemusele.

## Makse piir

Avalik `extaas.com` võib kuvada makse algvaadet, aga mitte ostetud sisu detaile. Kui arve on maksmata, saab makset alustada. Kui arve on tasutud, ei tohi sama arve enam põhidomeenilt kättesaadav olla.

Workspace näitab privaatseid detaile:

- arve read;
- projekti seosed;
- ostetud sisu;
- kliendi/ettevõtte seos;
- kviitungid ja sisemised maksemärkmed.

## Vajalikud Stripe seaded

- Secret key serveris.
- Webhook secret serveris.
- Vajadusel price/product viited.
- Success ja cancel URL-id.
- Metadata, mis seob Stripe sündmuse workspace arve, krediidi või tenant tegevusega.

Metadata peab aitama sisemisi kirjeid tuvastada, aga ei tohiks avalikul lehel privaatset sisu paljastada.

## Checkout flow

Soovituslik flow:

1. Workspace või avalik makse algvaade loob checkout sessioni.
2. Stripe suunab kliendi maksele.
3. Webhook kinnitab maksetulemuse.
4. Workspace uuendab arve/krediidi oleku.
5. Avalik makselink muutub peale tasumist kättesaamatuks.
6. Klient näeb privaatseid detaile ainult Workspace'is.

## Maksekeskus ja tasuta makse reegel

Kui voog saab alata ilma Stripe'ita, peab Workspace siiski nägema sünkroonitud makse olekut. Tasuta või Maksekeskuse kaudu lõppenud tegevus peab uuendama sama arve/makse mudelit, et staff ja klient näeksid ühte tõde.

## Terminal tulevikus

Staff workspace'is võib arve juures olla `Terminal` nupp. See kuulub sisemisse workspace/admin flow'sse. Nupp alustab valitud arve Stripe Terminal makse ja uuendab arvet pärast terminali tulemuse kinnitamist.

## Krediidireeglid

Stripe võib pärast edukat makset lisada krediite. Moodulite kasutus tarbib krediite hiljem.

```text
Stripe checkout paid
-> lisa workspace krediidid
-> kirjuta makselog
-> märgi arve tasutuks
-> peida avalik makse algvaade
```

## KKK

### Kas avalik makseleht peaks näitama arve ridu?

Ei. Näita summat, staatust ja sisselogimise infot. Detailid kuuluvad Workspace'i.

### Mis siis, kui webhook ebaõnnestub?

Hoia maksesündmus logides ja paku staffile reconciliation võimalust. Ära anna tasulisele sisule ligipääsu enne, kui Workspace olek on kinnitatud.

### Kas tenant portaal võib projekte näidata?

Võib, kui projekt on selle tenanti/ettevõttega seotud. Privaatseid detaile peab siiski kontrollima Workspace ligipääsuloogika.
