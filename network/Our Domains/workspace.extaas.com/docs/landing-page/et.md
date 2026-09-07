# Tenant avaleht

Tenant avaleht on kliendi avalik pind. See ei ole kontoaken ja ei tohi kuvada privaatset workspace sisu. Selle ülesanne on näidata kliendi brändi, avalikku infot ja lubatud mooduleid.

## Avalik sisu

Tenant avalehel võib kuvada:

- ettevõtte nime ja avalikku kirjeldust;
- brändivärve ja avalikku meediat;
- avalikku Pages sisu;
- Booking teenuseid;
- Rent objekte;
- Store tooteid;
- avalikke kontakttegevusi;
- legal või support linke.

Privaatsed arved, projektimärkmed, workspace seaded, integratsiooni võtmed ja kontaktlistid jäävad Workspace'i.

## Workspace seos

Kõik privaatne haldus toimub `workspace.extaas.com` poolel. Kui klient vajab arveid, projekte, kontoandmeid või mooduli privaatseid seadeid, tuleb ta suunata Workspace'i.

<div class="css _radius _padding" style="margin-block: 1.5rem;">
  <h3>Hea reegel</h3>
  <p>Tenant domeen näitab seda, mida kliendi klient tohib näha. Workspace näitab seda, mida portaali omanik ja lubatud kasutajad tohivad hallata.</p>
</div>

## Mooduli nähtavus

Avalik moodul peaks nähtav olema ainult siis, kui:

1. moodul on sisse lülitatud;
2. vajalikud seaded on täidetud;
3. vajalikud integratsioonid on ühendatud;
4. avalik andmestik on olemas;
5. tenant DNS route lahendub õigesti.

Kui moodul pole valmis, peida see avalikult pinnalt või näita viisakat mitteaktiivset olekut, mis ei paljasta privaatseid setup detaile.

## Soovituslikud lehe blokid

Kasuta `<section>` elementi ainult päris leheplokkide jaoks, mitte väikeste layout-wrapperite jaoks.

```text
Hero
Teenused või moodulid
Avalikud lehed/sisu
Booking/Rent/Store blokk
Kontakt või support
Footer/legal lingid
```

## Sisu mall

```text
Ettevõtte nimi:
Lühike avalik kirjeldus:
Peamine tegevus:
Teisene tegevus:
Lubatud moodulid:
Support e-post/telefon:
Legal lingid:
Avalik meedia:
```

## KKK

### Kas tenant avaleht võib konto seadeid näidata?

Ei. Konto ja workspace seaded kuuluvad Workspace'i.

### Kas tenant kliendid saavad abi küsida?

Jah. Tenant portaal võib kuvada support/chat alguspunkti. Support thread tuleks luua seadistatud forum/channel alla ja siduda tenanti/kliendi kontekstiga.

### Kas avalikud värvid võivad Extaasist erineda?

Jah tenant portaalides. Põhi Extaas ja Workspace pinnad peaksid hoidma ühtset corporate visual identity stiili; tenant portaal võib kasutada kliendi brändi.
