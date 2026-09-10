# X Platform

X Platform on Home Assistanti add-on, mis koondab rakenduste ja integratsioonide paigaldamise, käitamise ning haldamise ühte konsooli. Varasem eraldiseisev Node.js Server add-on ei ole enam eraldi toode: selle universaalsem järglane on X Platform.

## Mida X Platform teeb?

- avastab avalikke ja privaatseid GitHubi hoidlaid;
- leiab ühest hoidlast mitu rakendust ja Home Assistanti integratsiooni;
- paigaldab Node.js sõltuvused, käivitab build'i ja haldab rakenduse protsessi;
- haldab rakenduse porti, keskkonnamuutujaid, uuendusi, olekut ja logisid;
- võimaldab rakendusi avada nii Home Assistanti ingressi kui kohtvõrgu kaudu;
- paigaldab leitud ühilduvad integratsioonid Home Assistanti `custom_components` kausta.

X Platformi ametlik hoidla sisaldab ka **X Entities** integratsiooni. Esmasel hoidla sünkroonimisel leiab X Platform integratsiooni ja paigaldab selle automaatselt, kui kasutaja pole seda varem käsitsi eemaldanud. Integratsiooni kasutuselevõtuks võib Home Assistant vajada taaskäivitamist ja seejärel X Entities config entry lisamist.

## Rakenduse nõuded

Rakenduse nimi, versioon ning build- ja start-käsud loetakse `package.json` failist. Kui hoidlas on `package-lock.json`, kasutatakse `npm ci`; vastasel juhul `npm install`. Rakendus peab kuulama `process.env.PORT` väärtust. X Platform määrab lisaks `HOST=0.0.0.0`.

Ühes hoidlas olevate rakenduste X-spetsiifiline kirjeldus käib `x_config.json` kaudu. Seal saab määrata muu hulgas rakenduse kausta, kirjelduse, ikooni, taustapildi, pordi, dokumentatsiooni, ENV-väljad ja Home Assistanti toe.

## Home Assistant ja X Entities

Hallatav rakendus võib kasutada Home Assistanti sisemist API-t. X Platform annab rakendusele jooksvalt `SUPERVISOR_TOKEN`-i ning X Entitiesi jaoks `X_APPLICATION_ID`, `X_ENTITIES_HUB_HOST` ja `X_ENTITIES_HUB_PORT` väärtused. X Platform ise ei halda rakenduse olemite hetkeseisu: rakendus avaldab selle otse X Entitiesile.

Rakenduste seaded, hoidlad, integratsioonide koopiad ja logid säilivad add-on'i `/data` kaustas. Integratsiooni paigaldatud versioon arhiveeritakse enne `custom_components` kausta kopeerimist.

## Turvalisus

Paigalda ainult lähtekoodi, mida usaldad ja oled üle vaadanud. X Platformi hallatavad rakendused pärivad Home Assistanti runtime-tokeni ning võivad saada ligipääsu Home Assistanti API-le. Hoidla, ENV-saladusi ja avatud kohtvõrgu porte tuleb käsitleda samade turvanõuetega nagu muid tootmiskeskkonna teenuseid.
