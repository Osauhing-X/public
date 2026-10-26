# Booking ja Rent Workspace v2-s

Booking haldab teenuseid, nädalast saadavust, asukohti ja Website’i päringuid. Rent haldab rendikirjeid, asukohti, sisestatud saadaolevat kogust ja kliendi soovitud rendiperioodiga päringuid. Need on Website’iga ühilduvad moodulid; see ei tähenda automaatset laoseisu reserveerimist ega kattuvate rendiperioodide vältimist.

## Seadistus

Paigalda Website, Routes ja soovitud moodul. Kontrolli manifesti sõltuvusi ning seo konkreetne moodulikoopia. Lisa lehe sisusse `[import:booking]` või `[import:rent]`.

Loo teenus või rendikirje, ajad või olemasolev ressurss ja selged juhised kliendile. Testi avalikku päringut ja kontrolli salvestunud privaatset kirjet.

## Päring pole makse

Saabunud päring pole kinnitatud broneering, sõlmitud leping ega tasutud arve. Praegustes Booking- ja Rent-pakettides pole kinnitamise arveldus ühendatud; Rent keeldub kinnitamisest, kuni selle arveldus on teostatud. Ära kasuta v1 krediidikulu ega automaatse makse lubadusi.

Enne kinnitamist kontrolli kattuvaid aegu, töötajaid ja koguseid. Selgita ajavööndit, hinnastamise alust, vastamise ootust ja tühistamise teed. Sisemärkmeid ei avaldata.

Testi vigaseid kuupäevi, kordussaatmist, puuduvat seadistust ja teise koopia eraldatust. Teavitused ja makse lisa ainult siis, kui paigaldatud töövoog neid tegelikult teostab ja kontrollib.

