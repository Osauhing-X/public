# Node.js rakendused Home Assistantis: nüüd X Platformi kaudu

Varasem eraldiseisev Node.js Server add-on ei ole enam eraldi toode. Selle roll on koondatud **X Platformi**, mis avastab GitHubi hoidlaid, paigaldab sõltuvused, ehitab rakendused ning haldab nende protsesse, porte, keskkonnamuutujaid ja logisid ühest vaatest.

## Miks muudatus tehti?

Üks halduskiht vähendab dubleerimist ja teeb rakenduse elutsükli arusaadavamaks: sama töövoog katab paigalduse, uuendamise, käivitamise ja tõrkeotsingu. Rakenduse andmed jäävad add-on’i püsivasse andmekausta.

## Turvaline kasutamine

Paigalda ainult lähtekoodi, mida usaldad ja oled üle vaadanud. Hallatav rakendus võib kasutada Home Assistanti runtime-tokenit ning seetõttu tuleb õigusi, ENV-muutujaid ja väliseid porte käsitleda nagu muid tootmiskeskkonna saladusi.

Vaata ajakohast juhendit: [X Platform](/docs/x-platform).
