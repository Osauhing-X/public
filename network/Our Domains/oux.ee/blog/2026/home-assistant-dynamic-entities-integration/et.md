# Dünaamilised Home Assistanti olemid: nüüd X Entities

Varasem dünaamiliste olemite eraldiseisev integratsioon on koondatud **X Entitiesi**. Integratsioon avastab ühilduvad Node.js rakendused Zeroconfi kaudu, võtab vastu olekusnapshote ning loob nende põhjal Home Assistantis olemid.

## Kuidas andmed liiguvad?

Rakendus saadab hetkeseisu X Entitiesi API-sse. Home Assistantist tehtud lüliti- ja nupukäsud liiguvad tagasi rakenduse /update otspunkti. Heartbeat aitab eristada toimivat allikat katkenud ühendusest: kadunud allikas muutub esmalt kättesaamatuks ja aegunud kirje eemaldatakse.

See lahendus sobib siis, kui oma teenus või seade peab Home Assistantiga suhtlema, kuid eraldi custom component’i loomine iga andmetüübi jaoks tekitaks tarbetut hoolduskoormust.

Vaata ajakohast juhendit: [X Entities](/docs/x-entities).
