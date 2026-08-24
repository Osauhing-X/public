# Local-first automaatika: miks hoida juhtimiskiht kodus?

![Kohalik Home Assistanti juhtimiskiht ühendab kodu seadmed](https://raw.githubusercontent.com/Osauhing-X/public/www/oux.ee/read/blog/2026/local-first-home-automation/cover.png)

Local-first ei tähenda interneti keelamist. See tähendab, et kodu põhifunktsioonide otsus ja tööseis asuvad võimalikult lähedal seadmetele ning pilveteenus on lisavõimekus, mitte ainus tee lülitini.

<div class="css _radius _padding grid gap" style="margin-block: 1.5rem;">
  <span class="css _color _dark">LOCAL-FIRST</span>
  <h3>Kui internet kaob, ei tohiks kodu kaotada oma põhiloogikat.</h3>
  <p>Valgustus, mõõtmine ja kohalikud automaatikad võivad jätkata, kuid kaugteenused ning välised API-d võivad olla ajutiselt piiratud.</p>
</div>

## Latentsus on ainult üks osa

Kohalik käsk on sageli kiirem, sest see ei pea läbima välise teenuse andmekeskust. Olulisem on aga vea ulatus. Kui pilveteenus, internetiühendus või tootja konto ei tööta, võib lokaalne protokoll ja Home Assistant jätkata.

See ei tee süsteemi automaatselt töökindlaks. Kui kõik kohalikud teenused jooksevad ühes seadmes ja selle ketas või toide ebaõnnestub, on endiselt üks rikkeallikas. Local-first annab arhitektuurilise võimaluse, kuid vajab varukoopiat, jälgimist ja taastamisplaani.

## Home Assistant kui koordineeriv kiht

Home Assistant koondab seadmete olekud, sündmused, automaatikad ja UI. Selle suur eelis on ühine mudel: sensor, lüliti ja nupp käituvad automaatikas sarnasel viisil sõltumata sellest, kes seadme valmistas.

Oma Node.js teenused saavad täita lünki, kus valmis integratsiooni pole või andmeid tuleb enne Home Assistanti jõudmist töödelda. Näiteks võib Node teenus lugeda kohalikku API-t, arvutada koondnäidu ja pakkuda seda dünaamilise sensorina.

## Miks dünaamilised entity'd?

Klassikaline custom integration kirjeldab toetatud entity'd koodis. See on suurepärane stabiilse toote jaoks, kuid muutuv prototüüp või oma kontroller võib vajada paindlikumat mudelit.

Extaasi dünaamiline integratsioon lubab Node'il kirjeldada oma sensorid, lülitid ja nupud andmestruktuurina. Home Assistant avastab teenuse Zeroconfi kaudu, loob entity'd ning saadab kasutaja käsud Node'i `/update` endpointi.

See vähendab glue-code'i, kuid toob kaasa lepingu vastutuse. Entity võti peab olema stabiilne, väärtuse tüüp korrektne ning `device_class`, ühik ja `state_class` omavahel sobima. Dünaamilisus ei vabasta versioonimisest.

## Node.js add-on või eraldi seade?

Home Assistanti add-on on mugav, kui teenus peab elama samas varundus- ja halduskeskkonnas. Node Server saab kloonida privaatse repo ning käitada taustarakendust; UI variant kuvab rakenduse Ingressi kaudu külgribal.

Eraldi seade on parem, kui teenus juhib füüsilist riistvara, vajab teistsugust võrguasukohta, tarbib palju ressurssi või peab töötama ka Home Assistanti hosti rikke ajal. Piiri valik sõltub rikkeolukorrast, mitte ainult paigaldusmugavusest.

## Zeroconf teeb avastamise lihtsaks, mitte turvaliseks

mDNS/Zeroconf aitab Home Assistantil samas võrgus teenuse leida. See ei tõesta, et leitud teenus on usaldusväärne ega kaitse endpointi võõra käsu eest.

Praktilised turvapiirid:

- eralda külalised ja usaldamata IoT seadmed sobivasse võrku;
- valideeri `/update` payload ja lubatud entity võtmed;
- piira päringu suurust ning sagedust;
- ära pane saladusi Zeroconfi TXT kirjesse ega entity väärtusesse;
- kasuta autentimist, kui võrku ei saa täielikult usaldada;
- ära ava lokaalse teenuse porti ruuterist internetti;
- hoia GitHub token minimaalse repo-lugemisõigusega.

## Oleku sünkroonimise keeruline koht

Kui kasutaja lülitab HA-s lüliti sisse, saadetakse käsk Node'i. Node peaks käivitama tegevuse ja teatama tagasi tegeliku seisu. Kui ta lihtsalt eeldab edu, võib UI näidata sisse lülitatud seadet, mis füüsiliselt ei reageerinud.

Hea mudel eristab soovitud ja kinnitatud olekut. Vajadusel kuvab entity ajutist unavailable/error olekut ning logi näitab, miks käsk ebaõnnestus. Korduv käsk peab olema ohutu, eriti restarti, ukse, relee või muu mõjuka tegevuse juures.

## Varukoopia pole veel taastamine

Varukoopia väärtus selgub alles taastamistestis. Dokumenteeri:

- Home Assistanti ja add-on'ide versioonid;
- integratsiooni ning Node repo töötav commit;
- keskkonnamuutujate nimed ja taastamise allikas;
- võrgu püsiaadressid või DHCP reservation'id;
- millised entity ID-d on automaatikates kasutusel;
- kuidas süsteem töötab ohutus režiimis.

Ära salvesta API võtmeid tavatekstina dokumentatsiooni. Säilita need sobivas paroolihalduris või saladuste süsteemis.

## Millal pilv on siiski õige valik?

Pilveteenus võib anda turvalise kaugühenduse, suure arvutusvõimsuse, hallatud teavitused, varunduse või tootja seadme ainsa toetatud API. Local-first arhitektuur võib neid kasutada teadlikult, kui kohaliku ja välise vastutus on selge.

Hea küsimus pole „kas pilv või kohalik?”, vaid „mis juhtub iga sõltuvuse katkemisel?”. Kui vastus on teada ja vastuvõetav, on arhitektuur kontrolli all.

## Ohutuskriitilised süsteemid

Home lab'i automaatika ei asenda sertifitseeritud tule-, valve-, meditsiini- ega elutähtsat juhtimissüsteemi. Kriitilisel funktsioonil peab olema sõltumatu failsafe, käsitsi juhtimine ja sobiv sertifitseeritud lahendus.

Automaatika võib mugavust suurendada, kuid ei tohi muuta ohutust sõltuvaks ühest hobiserverist, Wi‑Fi võrgust või JavaScripti protsessist.

## Lõppmõte

Local-first annab omanikule rohkem kontrolli, prognoositavama latentsuse ja võimaluse jätkata põhilisi automaatikaid välise katkestuse ajal. Vastutasuks võtab omanik suurema vastutuse uuenduste, turbe, varukoopia ja taastamise eest.

Õnnestunud lahendus pole see, kus kõik töötab ideaalsel päeval. Õnnestunud lahendus käitub arusaadavalt siis, kui internet, üks teenus või host ise ei tööta.

## Loe edasi

- [Extaas ja Home Assistant](/et/docs/home-assistant)
- [Dynamic Entities integratsiooni artikkel](/et/blog/2026/home-assistant-dynamic-entities-integration)
- [Node.js Server add-on'i artikkel](/et/blog/2026/home-assistant-nodejs-ui-addon)
