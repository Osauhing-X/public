# Workspace v2 paigaldamine

Vaja on Dockerit ja Docker Compose’i. Alusta usaldatud kohalikus võrgus; avalikku domeeni pole vaja.

## 1. Valmista ette püsiv salvestus

Laadi [docker-compose.yml](https://extaas.com/downloads/workspace/docker-compose.yml) tühja kausta. Vaata fail enne käivitamist üle. See kasutab kujutist `ghcr.io/osauhing-x/workspace-core:latest` ja püsivat `core-data:/data` volume’it.

## 2. Käivita Core

Käivita selles kaustas:

```sh
docker compose pull
docker compose up -d
```

Ava `http://localhost:3000`. Teises seadmes kasuta Dockeri serveri LAN-i IP-d ja väliselt suunatud porti. Loo kohalik administraatorikonto.

Katsetamise ajal ära avalda Core’i haldust. Kasuta tugevat parooli ja säilita püsiv volume.

## 3. Lisa töövahendid

1. Ava **Storage** ja lisa GitHubi hoidla, ZIP-kogumik või ühendatud kaust. Ametlikku kataloogi hallatakse Extaas Connecti kaudu.
2. Seadista nõutud integratsioon ja kontrolli selle valmisolekut.
3. Paigalda moodul või rakendus. Rakendus võib vajada sõltuvuste paigaldamist ja build’i enne tervisekontrolli läbimist.
4. Ava see ja kontrolli tegelikku sisu. Tõrke korral vaata **Runtime logs** või **System → Queued**.

Valikuline integratsioon pole sama mis nõutud integratsioon. Loe paketi manifesti ja seadistusjuhist.

## 4. Avalda teadlikult

Vali eraldi pordil töötav rakendus, määra **Domains** all täpne domeen ning seadista pöördproksi või [Cloudflare Tunnel](/et/docs/cloudflare). Connectori sisemine Core’i port on tavaliselt 3000; see ei pruugi olla LAN-i suunatud port.

Kontrolli enne klientide lisamist väljalogitud vaadet, õigusi, HTTPS-i, faile, vorme ja veateateid.

## Varundamine ja uuendamine

Varunda püsiv volume ning juurutuse seadistus. Uuendamiseks kasuta ülal olevaid pull- ja up-käske. Säilita eelmine image digest tagasipöördumiseks ning kontrolli pärast taaskäivitust tervist.

**Ära kasuta uuendamiseks `docker compose down -v`: see eemaldab nimetatud volume’id.**

[Järgmine: moodulite valimine](/et/docs/modules-overview)
