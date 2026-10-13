# X Entities

X Entities on X Platformiga kaasas olev Home Assistanti integratsioon rakendusepõhiste olemite loomiseks. See asendab varasema eraldiseisva dünaamiliste olemite lahenduse ning toetab sensoreid, binary sensor'eid, lüliteid ja nuppe ilma, et iga rakenduse jaoks peaks looma eraldi custom component'i.

X Platform avastab ametlikust hoidlast X Entitiesi ja paigaldab selle esmasel sünkroonimisel automaatselt, kui integratsiooni pole varem käsitsi eemaldatud. Pärast paigaldamist võib olla vajalik Home Assistanti taaskäivitamine ja X Entitiesi lisamine integratsioonide vaatest.

## Kuidas andmed liiguvad?

Ühilduv rakendus avastab Home Assistanti Zeroconfi kaudu ja saadab oma täieliku olekusnapshot'i X Entitiesi API-sse. Iga rakenduse `source_id` eraldab selle olemid teistest rakendustest ning olemid seotakse X Platformi hub-seadme alla oma rakenduse seadmena.

Home Assistantist tehtud lüliti- ja nupukäsud saadetakse otse vastava rakenduse `POST /update` otspunkti, kasutades algset entity võtit. X Platform ei vahenda ega talleta rakenduste olemite hetkeseisu.

## Heartbeat ja aegumine

Rakendus peaks avaldama olekut vähemalt iga 20 sekundi järel; soovituslik intervall on 5 sekundit. Kui avaldamine katkeb, muutuvad allika olemid 20 sekundi järel kättesaamatuks. 90 sekundi möödudes eemaldab X Entities aegunud allika olemid ja tühjaks jäänud rakenduse seadme.

Ühenduse oleku jaoks kasuta `heartbeat`, `alive` või `online` võtmega binary sensor'it või `device_class: connectivity` väärtust. Katkestuse korral muutub heartbeat väärtuseks `false` ja jääb alles kuni rakenduse seadme eemaldamiseni.

X Entities töötab lokaalselt ning kasutab Home Assistanti `http` ja `zeroconf` sõltuvusi. Rakendus peab ise pakkuma oleku avaldamise ja juhitavate olemite puhul `/update` otspunkti.
