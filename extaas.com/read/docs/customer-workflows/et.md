# Klienditeekonnad ja igapäevane haldus

Hea portaal ei ole pelgalt funktsioonide nimekiri. Klient peab igal sammul mõistma, mis juhtus, kas tegevus on lõplik ja mida edasi teha. Meeskond peab samal ajal nägema vastutajat, olekut, vajalikku järeltegevust ja tehnilist logi.

<div class="css _radius _padding grid gap _2" style="margin-block: 1.5rem;">
  <div class="flex _wrap _space gap _2"><span class="css _color">HEA KLIENDIKOGEMUS</span><strong>Selgus enne kiirust</strong></div>
  <p>Kliendile peab alati olema nähtav, kas ta saatis päringu, sai kinnituse või lõpetas makse. Tehniline edu ja kasutajale näidatav edu peavad tähendama sama asja.</p>
</div>

## Universaalne klienditeekond

1. **Avastamine:** klient leiab tenant-domeenilt teenuse, eseme, toote või vormi.
2. **Otsustamine:** hind, saadavus, tingimused, privaatsus ja järgmine samm on arusaadavad.
3. **Sisestamine:** vorm küsib minimaalselt vajalikke andmeid ja valideerib vead väljade juures.
4. **Kinnitamine:** UI ütleb selgelt „päring vastu võetud”, „broneering kinnitatud” või „makse õnnestus”.
5. **Töötlemine:** Workspace seob tegevuse õige tenanti, kliendi ja mooduliga.
6. **Teavitus:** Resend saadab sobiva tehingukirja, kui integratsioon on olemas.
7. **Järeltegevus:** meeskond kinnitab, tühistab, täidab või võtab ühendust.
8. **Ajalugu:** olekumuutus ja viga jäävad logisse; klient näeb ainult talle lubatud infot.

## Booking'u voog

Enne avaldamist loo teenus, asukoht, kestus/ootus, kliendivormi väljad, teavituse saajad ning kinnituse tekst. Sõnasta avalikul lehel, kas klient valib vaba aja või esitab ainult ajasoovi.

Tüüpilised olekud on uus/ootel, kinnitatud, lõpetatud ja tühistatud. Kinnitamisel kontrolli aega, asukohta, vastutajat ja kliendi kontakti. Tühistamisel lisa põhjus ainult siis, kui see on kliendile sobiv; sisemine märkus hoia eraldi.

Ära luba topeltkinnitust ega krediidi kahekordset kulu korduva klikiga. Sama tegevuse kordus peab olema idempotentne või UI-s lukustatud kuni esimese päringu lõpuni.

## Rendi voog

Rendi kuulutus peab ütlema, mida renditakse, kui palju on saadaval, mis perioodiks, mis hinnaga ning kuidas toimub kättesaamine ja tagastus. Klient esitab perioodipäringu; see ei ole veel leping ega garanteeritud saadavus.

Meeskond kontrollib perioodi, kogust ja eseme seisukorda, kinnitab või lükkab tagasi ning saadab alles seejärel privaatse üleandmis- või makseinfo. Pärast tagastust märgi tegevus lõpetatuks ja uuenda avalikku saadavust.

## Store'i voog

Store kasutab Stripe'i aktiivseid ühekordse hinnaga tooteid. Klient lisab tooted ostukorvi, alustab Checkouti ja maksab Stripe'is. Brauseri success URL on kasutajakogemus, mitte maksetõend: tellimuse või krediidi olekut muudab kontrollitud webhook.

Enne müüki kirjelda tarne, täitmise aeg, tagastus, maksud ja klienditugi. Pärast makset peab meeskonnal olema selge, kes tellimuse täidab. Kui webhook hilineb, näita „makse kontrollimisel”, mitte automaatselt „tasutud”.

## Vormi ja CRM-i voog

Igal vormil peab olema konkreetne omanik. Pärast vastust kontrolli duplikaate, loo või seo CRM-kontakt, määra järeltegevus ning järgi lubatud säilitusaega. Turundusnõusolek peab olema vabatahtlik, eristatav ja tõendatav; teenusepäring ei anna automaatselt luba uudiskirjaks.

## E-posti voog

1. Vali õige Audience või tehingu saaja.
2. Vali mall ja kontrolli dünaamilised väärtused.
3. Vaata läbi `to`, `from`, `reply-to`, `cc`, `bcc`, subject ja manused.
4. Kontrolli mobiilset eelvaadet, linke, plain-text loetavust ja loobumist.
5. Saada testkiri sisemisele aadressile.
6. Kontrolli hinnangulist krediidikulu.
7. Saada ning vaata delivered, bounced ja rejected tulemusi.

OpenAI loodud tekst on mustand. Kontrolli nimesid, kuupäevi, hindu, lubadusi ja linke enne saatmist.

## Rollid ja vastutus

| Roll | Peamine vastutus |
| --- | --- |
| Workspace'i omanik | integratsioonid, arveldus, kasutajad, lõplik risk ja võtmete elutsükkel |
| Mooduli haldaja | sisu, päringud, olekud, kliendisuhtlus ja igapäevane kvaliteet |
| Staff/admin | platvormi tugi, tehniline uurimine ja lubatud erandtoimingud |
| Avalik klient | ainult enda päringu, makse või piiratud staatuse tegevused |

Ära anna omanikutaseme õigust pelgalt mugavuse pärast. Määratud haldaja peaks pääsema ainult nende töövoogude ja kirjete juurde, mida ta vajab.

## Päevane ja nädalane kontroll

**Iga tööpäev:** vaata uued ja tähtaja ületanud päringud, ebaõnnestunud saatmised, pooleliolevad maksed ning madal krediidijääk. Kontrolli, et iga avatud tegevuse juures oleks vastutaja.

**Iga nädal:** testi üks avalik põhivoog, vaata bounce/unsubscribe trendi, korrasta aegunud sisu ja kontrolli integratsioonide hoiatusi. Vaata üle kasutajad, kelle roll või töösuhe on muutunud.

**Enne kampaaniat või suuremat müüki:** tee koormus- ja mahuhinnang, kontrolli teenuse limiite, saatjadomeeni, Stripe webhooki, krediite, klienditoe valmisolekut ning rollback/peatamise võimalust.

## Tõrkeolukorra põhimõtted

- Ära näita edu enne, kui vastutav süsteem on edu kinnitanud.
- Ära palu kliendil pimesi tegevust korrata, kui see võib tekitada topeltmakse või topeltkinnituse.
- Säilita korrelatsiooni-ID, aeg, tenant, moodul, tegevuse liik ja ohutu veakood.
- Ära kirjuta logisse API võtit, täielikku makseinfot ega tarbetut isikuandmestikku.
- Anna kasutajale praktiline järgmine samm ja staffile tehniline detail.
- Pärast parandust töötle järjekorda jäänud sündmused kontrollitult ning teavita mõjutatud kliente.

## Avaldamise lõppkontroll

- Testitud on mobiil, klaviatuur, tume/hele teema ja aeglane ühendus.
- Nupud väldivad topeltklikki ning laadimisolek on nähtav.
- Klienditekst eristab päringut, kinnitust ja makset.
- Õiguseta kasutaja ei näe URL-i muutmisega teise kliendi andmeid.
- E-kirja lingid avanevad õigel tenant-domeenil.
- Kustutamise, tühistamise ja tagastamise reegel on dokumenteeritud.
- Logidest saab ühe testi algusest lõpuni jälitada.

## Seotud juhendid

- [Moodulite valik](/et/docs/modules-overview)
- [Integratsioonide valik](/et/docs/integrations-guide)
- [Tenant avaleht](/et/docs/landing-page)
- [Resend](/et/docs/resend)
- [Stripe](/et/docs/stripe)
