# Node.js Server Add-on Home Assistantis – laiendatav runtime sinu automaatikale

<section>
  <h2>Sissejuhatus</h2>

  <p>
    Kui sul on Home Assistant juba kasutuses, siis see add-on lisab sellele täiesti uue kihi:
    keskkonna, kuhu saad jooksutada oma teenuseid, loogikat ja rakendusi otse Home Assistanti sees,
    ilma eraldi serverite või infrastruktuurita.
  </p>

  <p>
    Node.js Server Add-on laiendab seda ideed, võimaldades käitada Node.js rakendusi
    otse Home Assistanti sees kui osa samast ökosüsteemist.
  </p>
</section>

<section>
  <h2>Mis see add-on tegelikult teeb?</h2>

  <p>
    Add-on toimib kui lihtne runtime kiht Home Assistantis.
    Selle asemel, et hallata eraldi serverit või deploy keskkonda,
    antakse süsteemile GitHub repository ning rakendus käivitatakse automaatselt.
  </p>

  <p>
    Kood muutub töötavaks teenuseks ilma käsitsi serverihalduse, deploy protsesside või eraldi infrastruktuurita.
  </p>
</section>

<section>
  <h2>Kuidas töövoog töötab?</h2>

  <p>
    Iga rakenduse käivitamine järgib ühtset automatiseeritud protsessi,
    mis viib koodi GitHubist töötava Node.js teenuseni.
  </p>

  <ol>
    <li>Repository kloonitakse GitHubist (sh private repo tugi)</li>
    <li>Sõltuvused installitakse automaatselt (<code>npm install</code>)</li>
    <li>Rakenduse entry point (<code>index.js</code>) käivitatakse Node protsessina</li>
    <li>Protsessi jälgib supervisor, mis hoiab selle elus</li>
    <li>Rikke korral tehakse automaatne restart</li>
  </ol>

  <p>
    Tulemus on minimaalne hõõrdumine koodi ja töötava teenuse vahel.
  </p>
</section>

<section>
  <h2>Kus seda jooksutada?</h2>

  <p>
    Kuigi süsteem töötab Home Assistantis, vajab see stabiilset ja piisava jõudlusega keskkonda.
  </p>

  <p>
    Parima tulemuse annavad seadmed, mis ei ole piiripealsed ega aladimensioneeritud.
    Väga vanad süsteemid või nõrgad konfiguratsioonid võivad mõjutada stabiilsust ja jõudlust.
  </p>

  <p>
    Virtuaalmasinate puhul on oluline tagada piisav CPU ja RAM, eriti kui jooksutada mitut Node teenust korraga.
  </p>
</section>

<section>
  <h2>Miks see üldse eksisteerib?</h2>

  <p>
    Peamine probleem ei ole Node.js käivitamine ise, vaid kogu sellega kaasnev lisatöö:
    eraldi serverid, deploy protsessid, jälgimine ja käsitsi haldus.
  </p>

  <p>
    Selle lahenduse eesmärk on see täielikult eemaldada.
  </p>

  <ul>
    <li>ei ole vaja eraldi masinat Node rakenduste jaoks</li>
    <li>ei ole vaja käsitsi jälgida protsesside seisundit</li>
    <li>ei ole vaja keerulist deploy pipeline’i</li>
  </ul>

  <p>
    Selle asemel saab backend loogika jooksutada otse Home Assistanti sees,
    kasutada olemasolevat riistvara ning hoida kogu süsteemi ühest kohast hallatavana.
  </p>

  <p>
    Koodiuuendused muutuvad lihtsaks — GitHubist tõmbamine ja kohene rakendamine.
  </p>

  <p>
    Eesmärk on vähendada ebavajalikku halduskoormust ja kasutada olemasolevat ressurssi maksimaalselt.
  </p>
</section>

<section>
  <h2>Node.js kui Home Assistanti laienduskiht</h2>

  <p>
    Node.js ei ole siin ainult backend runtime, vaid muutub andmete ja loogika vahekihiks,
    mis suudab mõjutada kogu Home Assistanti käitumist.
  </p>

  <p>
    See loob võimaluse ehitada süsteeme, kus automaatika ei ole enam staatiline,
    vaid dünaamiliselt laiendatav.
  </p>
</section>

<section>
  <h2>Valikuline laiendus: dünaamilised Home Assistant integratsioonid</h2>

  <p>
    Node.js Server Add-on ei ole ainult eraldiseisev runtime, vaid seda saab kasutada ka
    koos meie teise avaliku projektiga — Home Assistant Dynamic Entities integratsiooniga.
  </p>

  <p>
    See on valikuline laiendus, mis võimaldab viia süsteemi sammu edasi:
    Node.js ei tööta ainult teenusena, vaid hakkab defineerima ja laiendama Home Assistanti struktuuri ennast.
  </p>

  <p>
    👉 <a href="https://github.com/Osauhing-X/home-assistant/blob/main/plugins/osayhing_x/README.md">
      Dynamic HA integratsioon (repo / demo)
    </a><br/>
    👉 <a href="https://extaas.com/@/blog/2026/home-assistant-dynamic-entities-integration">
      Dynamic Entities integratsioon (arhitektuur ja idee)
    </a>
  </p>

  <p>
    Selle tulemusena ei ole Node.js enam ainult andmete tootja,
    vaid süsteemi osa, mis võib luua Home Assistant entiteete ja loogikat dünaamiliselt.
  </p>
</section>

<section>
  <h2>Mis teeb selle praktiliseks?</h2>

  <p>
    Tugevus tuleb paindlikkusest ja kiirusest, millega ideed muutuvad töötavaks süsteemiks.
  </p>

  <ul>
    <li>custom backend loogika ilma eraldi serverita</li>
    <li>väliste teenuste integratsioon ühes keskkonnas</li>
    <li>andmete töötlus enne Home Assistanti jõudmist</li>
    <li>dünaamilised ja sündmuspõhised automaatikad</li>
  </ul>
</section>

<section>
  <h2>Piirangud ja reaalsus</h2>

  <p>
    Tegemist ei ole enterprise tasemel platvormiga.
    Mõned juhtimisfunktsioonid (nt stop/restart) on veel arenduses.
  </p>

  <p>
    Lahendus on mõeldud home lab ja arenduskeskkonna jaoks,
    mitte range tootmisinfrastruktuuri asendamiseks.
  </p>
</section>

<section>
  <h2>Kokkuvõte</h2>

  <p>
    Node.js Server Add-on muudab Home Assistanti rolli oluliselt laiemaks.
    See ei ole lihtsalt Node.js runtime, vaid viis tuua backend loogika ja automaatika samasse süsteemi.
  </p>

  <p>
    Koos valikulise dünaamiliste integratsioonide kihiga muutub see täielikuks laiendatavaks platvormiks,
    kus automaatika ja backend loogika töötavad ühtse tervikuna.
  </p>

  <p>
    <strong>Repo:</strong>
    <a href="https://github.com/Osauhing-X/home-assistant">GitHub – Home Assistant (add-on’id ja integratsioonid)</a>
  </p>
</section>

