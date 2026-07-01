# Node.js Server Add-on Home Assistantis â€“ laiendatav runtime sinu automaatikale

<section>
  <h2>Sissejuhatus</h2>

  <p>
    Kui sul on Home Assistant juba kasutuses, siis see add-on lisab sellele tÃ¤iesti uue kihi:
    keskkonna, kuhu saad jooksutada oma teenuseid, loogikat ja rakendusi otse Home Assistanti sees,
    ilma eraldi serverite vÃµi infrastruktuurita.
  </p>

  <p>
    Node.js Server Add-on laiendab seda ideed, vÃµimaldades kÃ¤itada Node.js rakendusi
    otse Home Assistanti sees kui osa samast Ã¶kosÃ¼steemist.
  </p>
</section>

<section>
  <h2>Mis see add-on tegelikult teeb?</h2>

  <p>
    Add-on toimib kui lihtne runtime kiht Home Assistantis.
    Selle asemel, et hallata eraldi serverit vÃµi deploy keskkonda,
    antakse sÃ¼steemile GitHub repository ning rakendus kÃ¤ivitatakse automaatselt.
  </p>

  <p>
    Kood muutub tÃ¶Ã¶tavaks teenuseks ilma kÃ¤sitsi serverihalduse, deploy protsesside vÃµi eraldi infrastruktuurita.
  </p>
</section>

<section>
  <h2>Kuidas tÃ¶Ã¶voog tÃ¶Ã¶tab?</h2>

  <p>
    Iga rakenduse kÃ¤ivitamine jÃ¤rgib Ã¼htset automatiseeritud protsessi,
    mis viib koodi GitHubist tÃ¶Ã¶tava Node.js teenuseni.
  </p>

  <ol>
    <li>Repository kloonitakse GitHubist (sh private repo tugi)</li>
    <li>SÃµltuvused installitakse automaatselt (<code>npm install</code>)</li>
    <li>Rakenduse entry point (<code>index.js</code>) kÃ¤ivitatakse Node protsessina</li>
    <li>Protsessi jÃ¤lgib supervisor, mis hoiab selle elus</li>
    <li>Rikke korral tehakse automaatne restart</li>
  </ol>

  <p>
    Tulemus on minimaalne hÃµÃµrdumine koodi ja tÃ¶Ã¶tava teenuse vahel.
  </p>
</section>

<section>
  <h2>Kus seda jooksutada?</h2>

  <p>
    Kuigi sÃ¼steem tÃ¶Ã¶tab Home Assistantis, vajab see stabiilset ja piisava jÃµudlusega keskkonda.
  </p>

  <p>
    Parima tulemuse annavad seadmed, mis ei ole piiripealsed ega aladimensioneeritud.
    VÃ¤ga vanad sÃ¼steemid vÃµi nÃµrgad konfiguratsioonid vÃµivad mÃµjutada stabiilsust ja jÃµudlust.
  </p>

  <p>
    Virtuaalmasinate puhul on oluline tagada piisav CPU ja RAM, eriti kui jooksutada mitut Node teenust korraga.
  </p>
</section>

<section>
  <h2>Miks see Ã¼ldse eksisteerib?</h2>

  <p>
    Peamine probleem ei ole Node.js kÃ¤ivitamine ise, vaid kogu sellega kaasnev lisatÃ¶Ã¶:
    eraldi serverid, deploy protsessid, jÃ¤lgimine ja kÃ¤sitsi haldus.
  </p>

  <p>
    Selle lahenduse eesmÃ¤rk on see tÃ¤ielikult eemaldada.
  </p>

  <ul>
    <li>ei ole vaja eraldi masinat Node rakenduste jaoks</li>
    <li>ei ole vaja kÃ¤sitsi jÃ¤lgida protsesside seisundit</li>
    <li>ei ole vaja keerulist deploy pipelineâ€™i</li>
  </ul>

  <p>
    Selle asemel saab backend loogika jooksutada otse Home Assistanti sees,
    kasutada olemasolevat riistvara ning hoida kogu sÃ¼steemi Ã¼hest kohast hallatavana.
  </p>

  <p>
    Koodiuuendused muutuvad lihtsaks â€” GitHubist tÃµmbamine ja kohene rakendamine.
  </p>

  <p>
    EesmÃ¤rk on vÃ¤hendada ebavajalikku halduskoormust ja kasutada olemasolevat ressurssi maksimaalselt.
  </p>
</section>

<section>
  <h2>Node.js kui Home Assistanti laienduskiht</h2>

  <p>
    Node.js ei ole siin ainult backend runtime, vaid muutub andmete ja loogika vahekihiks,
    mis suudab mÃµjutada kogu Home Assistanti kÃ¤itumist.
  </p>

  <p>
    See loob vÃµimaluse ehitada sÃ¼steeme, kus automaatika ei ole enam staatiline,
    vaid dÃ¼naamiliselt laiendatav.
  </p>
</section>

<section>
  <h2>Valikuline laiendus: dÃ¼naamilised Home Assistant integratsioonid</h2>

  <p>
    Node.js Server Add-on ei ole ainult eraldiseisev runtime, vaid seda saab kasutada ka
    koos meie teise avaliku projektiga â€” Home Assistant Dynamic Entities integratsiooniga.
  </p>

  <p>
    See on valikuline laiendus, mis vÃµimaldab viia sÃ¼steemi sammu edasi:
    Node.js ei tÃ¶Ã¶ta ainult teenusena, vaid hakkab defineerima ja laiendama Home Assistanti struktuuri ennast.
  </p>

  <p>
    ðŸ‘‰ <a href="https://github.com/Osauhing-X/home-assistant/blob/main/plugins/osayhing_x/README.md">
      Dynamic HA integratsioon (repo / demo)
    </a><br/>
    ðŸ‘‰ <a href="https://extaas.com/@/read/blog/2026/home-assistant-dynamic-entities-integration">
      Dynamic Entities integratsioon (arhitektuur ja idee)
    </a>
  </p>

  <p>
    Selle tulemusena ei ole Node.js enam ainult andmete tootja,
    vaid sÃ¼steemi osa, mis vÃµib luua Home Assistant entiteete ja loogikat dÃ¼naamiliselt.
  </p>
</section>

<section>
  <h2>Mis teeb selle praktiliseks?</h2>

  <p>
    Tugevus tuleb paindlikkusest ja kiirusest, millega ideed muutuvad tÃ¶Ã¶tavaks sÃ¼steemiks.
  </p>

  <ul>
    <li>custom backend loogika ilma eraldi serverita</li>
    <li>vÃ¤liste teenuste integratsioon Ã¼hes keskkonnas</li>
    <li>andmete tÃ¶Ã¶tlus enne Home Assistanti jÃµudmist</li>
    <li>dÃ¼naamilised ja sÃ¼ndmuspÃµhised automaatikad</li>
  </ul>
</section>

<section>
  <h2>Piirangud ja reaalsus</h2>

  <p>
    Tegemist ei ole enterprise tasemel platvormiga.
    MÃµned juhtimisfunktsioonid (nt stop/restart) on veel arenduses.
  </p>

  <p>
    Lahendus on mÃµeldud home lab ja arenduskeskkonna jaoks,
    mitte range tootmisinfrastruktuuri asendamiseks.
  </p>
</section>

<section>
  <h2>KokkuvÃµte</h2>

  <p>
    Node.js Server Add-on muudab Home Assistanti rolli oluliselt laiemaks.
    See ei ole lihtsalt Node.js runtime, vaid viis tuua backend loogika ja automaatika samasse sÃ¼steemi.
  </p>

  <p>
    Koos valikulise dÃ¼naamiliste integratsioonide kihiga muutub see tÃ¤ielikuks laiendatavaks platvormiks,
    kus automaatika ja backend loogika tÃ¶Ã¶tavad Ã¼htse tervikuna.
  </p>

  <p>
    <strong>Repo:</strong>
    <a href="https://github.com/Osauhing-X/home-assistant">GitHub â€“ Home Assistant (add-onâ€™id ja integratsioonid)</a>
  </p>
</section>

