# Workspace v2 integratsioonide seadistamine

Integratsioon omab ühendust ja deklareeritud serveritoiminguid. Moodul ja rakendus küsivad lubatud toimingut; nad ei peaks saama teise integratsiooni toorvõtmeid.

## Seadistamise järjekord

1. Loe tarbiva paketi manifesti sõltuvusi.
2. Paigalda vastav integratsioon usaldatud allikast.
3. Täida nõutud väärtused selle paneelis või määratud Environment-grupis.
4. Luba integratsioon ja kontrolli valmisolekut.
5. Testi ohutut toimingut ning vaata tulemust ja logisid.
6. Alles siis luba avalik töövoog.

## Ühendused

| Integratsioon | Otstarve |
| --- | --- |
| GitHub | Pakettide allikad ja piiratud hoidlatöö |
| Cloudflare | Core’i külge ühendatud Tunnel-connector; avalikud hostinimed seadistatakse Cloudflare’is |
| Reverse Proxy | Lubatud teekonnad seadistatud proksi kaudu |
| Supabase | Paketi järgi valikuline või nõutud väline andme-, konto- või failikiht |
| Resend | Selgelt kinnitatud kirjade saatmine ja kontaktitoimingud |
| Stripe | Piiratud kataloog, makselingid ja maksete kooskõlastamine |
| Discord / Trello | Paigaldatud paketi deklareeritud toimingud |

OpenAI ei kuulu praegusesse avalikku integratsioonikomplekti. V1 AI-koostaja juhend pole v2 seadistustee.

## Keskkonnad ja allikagrupid

Väärtused on grupeeritud kontrollitud allikaomaniku järgi. Võti antakse edasi ainult deklareerimise ja määramise järel. Tavapärane pakettidevaheline kutse vajab sama allikagruppi ning lubatud toiminguõigusi. Teise allika sama nimega integratsioon pole automaatselt samaväärne.

Allika eemaldamine säilitab paigaldatud koopiad. Tarbijata keskkonnaväärtused märgitakse kasutamata ja säilivad kuni eraldi eemaldamiseni.

Ära pane service-role võtmeid, tokeneid ega webhook-saladusi avalikku lehte, URL-i või kuvatõmmisesse. Ühenduse test ja päris saatmise/makse kontroll on eri asjad.

[Järgmine: avalikud rakendused](/et/docs/landing-page)
