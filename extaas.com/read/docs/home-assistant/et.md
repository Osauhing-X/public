# Extaas ja Home Assistant

![Kohalik Home Assistanti juhtimiskiht ühendab dünaamilised seadmed](cover.png)

Extaasi Home Assistanti ökosüsteem aitab ühendada kohalikus võrgus töötavaid Node.js rakendusi Home Assistantiga, käitada rakendusi lisadena ning hallata kohandatud pluginate paigaldust. Komponendid on eraldi tööriistad: vali neist ainult see, mis lahendab konkreetse vajaduse.

<div class="grid gap _3" style="grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); margin-block: 1.5rem;">
  <div class="css _radius _padding"><span class="css _color">INTEGRATSIOON</span><h3>Node ↔ Home Assistant</h3><p>Dünaamilised sensorid, lülitid ja nupud kohalikus võrgus.</p></div>
  <div class="css _radius _padding"><span class="css _color">ADD-ON</span><h3>Käivita rakendus</h3><p>Taustateenus või Ingressi kaudu avatav Node/Svelte kasutajaliides.</p></div>
  <div class="css _radius _padding"><span class="css _color">HALDUS</span><h3>Paigalda kontrollitult</h3><p>Privaatsed repod, keskkonnamuutujad, versioonid ja taastamine.</p></div>
</div>

## Komponendid ja nende eesmärk

| Komponent | Mida see teeb? | Millal kasutada? |
| --- | --- | --- |
| **Extaas custom integration (`extaas_com`)** | avastab Zeroconfi kaudu Node kliendid ning loob nende andmetest sensoreid, lüliteid ja nuppe | kui oma Node.js teenuse olekud ja juhtnupud peavad ilmuma Home Assistanti |
| **Node Server** | kloonib seadistatud privaatsed GitHubi Node.js repositooriumid ja käitab neid HA lisana | kui rakendus ei vaja Home Assistanti külgribal oma kasutajaliidest |
| **Node Server UI** | sama põhimõte koos Ingressi ja pordil 3000 töötava UI-ga | kui Node/Svelte rakendus peab avanema HA külgribal |
| **X Plugins Installer** | paigaldab ja uuendab GitHubi repositooriumidest kohandatud pluginaid perioodiliselt | kui hallata kontrollitud custom component'ide levitamist mitmesse HA installi |
| **Popcorn** | SvelteKit rakendus filmide/sarjade leidmiseks, voogedastusallikate linkide ja väljalaskekalendri jälgimiseks | kui soovid meedia-avastuse tööriista Home Assistanti Ingress-vaates |

## Miks custom integration'i kasutada?

Tavaline Node.js rakendus ja Home Assistant ei jaga automaatselt seadmemudelit. `extaas_com` loob nende vahele lokaalse lepingu:

1. Node avaldab Zeroconfi teenuse `_extaas_com._tcp.local.`.
2. Home Assistant pakub avastatud teenuse lisamist.
3. Node saadab `/api/extaas_com` endpointi oma `node_data` kirjelduse.
4. Integratsioon loob kirjeldusest dünaamilised entity'd ja rühmitab need seadmeteks.
5. HA saadab lüliti või nupu tegevuse Node'i `/update` endpointi.
6. `/heartbeat` ütleb integratsioonile, kas Node on võrgus.

See sobib prototüüpidele, lokaalsetele kontrolleritele, sensorihubidele ja oma teenustele, mille entity'd võivad tarkvara konfiguratsiooni järgi muutuda. Dünaamilisus vähendab vajadust kirjutada iga sensori jaoks eraldi Home Assistanti platvormikoodi.

## Toetatud entity loogika

- **sensor** edastab mõõte- või olekuväärtuse;
- **switch** kuvab olekut ja võtab Home Assistantist vastu sisse/välja käsu;
- **button** käivitab Node'i poolel ühekordse tegevuse;
- `device` väli rühmitab seotud entity'd ühe seadme alla;
- `icon` annab Material Design Icons tähise;
- sensori `device_class`, `unit` ja `state_class` aitavad Home Assistantil väärtust õigesti esitada ning statistikat luua.

Kasuta `measurement` hetkelise mõõteväärtuse jaoks ja `total_increasing` ainult loenduri jaoks, mis tavaliselt ei vähene, näiteks koguenergia. Ühik peab sobima Home Assistanti `device_class` väärtusega. Ebakorrektne kombinatsioon võib rikkuda statistika või tekitada parandusteateid.

## Millal valida Node Server või Node Server UI?

Vali **Node Server**, kui teenus töötab taustal, suhtleb API-de või seadmetega ja vajab ainult logisid/seadistust. Vali **Node Server UI**, kui kasutajal on vaja avada rakenduse veebiliides Home Assistanti külgribal. UI variant kasutab Ingressi, eeldab rakendust pordil 3000 ja kasutab host network'i.

Mõlemad variandid võtavad seadistusest GitHub tokeni, repositooriumide nimekirja ja keskkonnamuutujad. Repositoorium peab sisaldama käivitatavat Node.js projekti ning selle sõltuvused ja start-käsk peavad olema projekti enda failides korrektselt määratud.

## Turvalisus

- GitHub token on saladus. Kasuta minimaalse repo-lugemisõigusega peeneteralist tokenit ja roteeri seda.
- Ära kirjuta tokenit repo URL-i, logisse, README-sse ega avalikku issue'sse.
- `host_network: true` annab lisale laia võrgupinna; kasuta seda ainult siis, kui lokaalne avastus või teenuse port seda nõuab.
- `/update`, `/heartbeat` ja rakenduse muud endpointid on kohaliku võrgu API-d. Valideeri payload, piira keha suurust ning lisa autentimine, kui võrk ei ole täielikult usaldatud.
- Zeroconf on avastus, mitte autentimine. Teenuse leidmine ei tõenda saatja õigust seadet juhtida.
- Ära avalda Ingressi sisemist porti ruuteris internetti. Kaugjuurdepääsuks kasuta Home Assistanti turvalist kaugühendust või korralikult seadistatud VPN-i.
- Keskkonnamuutujad võivad sisaldada saladusi; rakendus ei tohi neid UI-s ega vealogis kuvada.

## Paigaldamise üldvoog

1. Lisa Home Assistantis add-on repository: `https://github.com/Osauhing-X/home-assistant`.
2. Värskenda Add-on Store'i ning vali vajalik lisa.
3. Täida konfiguratsioon. Node Serveri puhul lisa peeneteraline GitHub token, `owner/repository.git` kuju ja vajalikud `NAME=value` keskkonnamuutujad.
4. Käivita lisa ja vaata logi kuni rakenduse start on kinnitatud.
5. UI variandil ava Ingress külgribalt; taustateenusel kontrolli API-d või integratsiooni entity'sid.
6. Tee Home Assistantist varukoopia enne pluginate automaatpaigalduse või suure uuenduse lubamist.

## Node kliendi leping

Node kliendil on vähemalt kolm ülesannet:

- käitada `GET /heartbeat`, mis vastab eduka terviseseisundi korral;
- käitada `POST /update`, võtta vastu lubatud entity väärtused ja käivitada tegevused;
- saata Home Assistantile JSON kujul host, port ja `node_data`.

Igal entity võtmel peab olema stabiilne masinnimi. Nime muutmine võib Home Assistantis tekitada uue entity. Ära kasuta väärtuse sees saladusi ega tohutuid objekte. Nupu tegevus peab olema korduva päringu suhtes ohutu või vähemalt kaitsma sama käsu juhusliku topeltkäivituse eest.

## Tõrkeotsing

### Home Assistant ei avasta Node'i

Kontrolli, et mõlemad on samas mDNS-i lubavas võrgus, Node avaldab `_extaas_com._tcp.local.` teenust, host/IP ei ole loopback või Dockeri virtuaalliides ning reklaamitud port on kättesaadav. VLAN-id ja külalisvõrgud blokeerivad sageli multicast DNS-i.

### Entity on unavailable

Kontrolli Node'i `/heartbeat` vastust, lisa logi, reklaamitud IP-d ja porti. Seejärel kontrolli, kas Node'i protsess taaskäivitub või võrguaadress muutus. Püsiva aadressi jaoks kasuta DHCP reservation'it.

### Lüliti muutub tagasi

HA saatis `/update` käsu, kuid Node ei salvestanud uut väärtust või saatis järgmises sünkroonis vana seisu tagasi. Uuenda esmalt Node'i sisemist tõde, käivita füüsiline tegevus ja saada seejärel tegelik seis Home Assistantile.

### Sensoril puudub statistika

Kontrolli, et väärtus on arv, `device_class`, `unit` ja `state_class` sobivad kokku ning `total_increasing` loendur ei vähene tavakasutuses.

### Node Server ei klooni privaatset repo

Kontrolli tokeni aegumist, repository read õigust, `owner/repository.git` nimekuju ja GitHubi ligipääsu. Ära postita tokenit veateate kopeerimisel.

### Ingress näitab tühja või vigast lehte

Veendu, et rakendus kuulab konteineris kõigil liidestel, pordil 3000, toetab Ingressi baasrada ning ei sunni päringuid välisele hostinimele.

## Uuendamine ja taastamine

Loe enne versioonivahetust changelog'i, tee Home Assistantist varukoopia ja testi esmalt mitte-kriitilises installis. Integratsiooni uuendamisel taaskäivita vajadusel Home Assistant; lisa uuendamisel kontrolli käivituslogi ja entity'd. Hoia varasem töötav repo commit või lisa versioon taastamiseks teada.

X Plugins Installer teeb perioodilisi uuendusi (vaikimisi 3600 sekundi järel). Automaatne uuendamine vähendab käsitööd, kuid suurendab regressiooniriski. Kriitilises koduautomaatikas eelista kinnitatud versiooni või kontrollitud väljalaskeprotsessi.

## Piirangud

Praegune arhitektuur on eelkõige lokaalse võrgu integratsioon. See ei ole iseenesest pilvesõnumijärjekord, kõrge turbetasemega seadmeprotokoll ega garantii katkestusteta juhtimiseks. Elutähtsad, tule-, valve- või muud ohutuskriitilised funktsioonid vajavad sõltumatuid failsafe'e ja sertifitseeritud lahendusi.

## Seotud allikad

- [Home Assistanti lähtekood ja add-on repository](https://github.com/Osauhing-X/home-assistant)
- [Workspace'i moodulid](/et/docs/modules-overview)
- [Integratsioonide valik](/et/docs/integrations-guide)
