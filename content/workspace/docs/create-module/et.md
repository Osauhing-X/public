# Õpetus: loo esimene moodul

Vaata [mooduli kohustuslikke ja valikulisi faile ning kaustu](/et/docs/package-structure). `api/` on valikuline moodulitevaheline andmeliides: selle kaudu saavad teised moodulid pärida sinu mooduli lubatud andmeid.

Privaatne loendur näitab täielikku lugemise ja kirjutamise ringi väliste teenusteta. Igal paigaldatud moodulikoopial on eraldi loendur.

## Failid

Loo `modules/example-counter/`, lisa package.json sisuga `{"type":"module","private":true}` ja järgmised failid.

### manifest.json

```json
{
  "schema_version": 2,
  "id": "example-counter",
  "kind": "module",
  "version": "1.0.0",
  "name": "Example Counter",
  "description": "A private counter using Core-owned instance persistence.",
  "environment": [],
  "runtime": {
    "type": "none"
  },
  "ui": {
    "document": "ui/index.html",
    "data": {
      "entry": "server/data.js",
      "export": "manage"
    }
  },
  "cron": []
}
```

### server/data.js

```js
export function manage({ payload }) {
  const count = Number.isSafeInteger(payload.state?.count) ? payload.state.count : 0;
  if (payload.operation === 'read') return { result: { count } };
  if (payload.operation !== 'write' || payload.body?.action !== 'increment') {
    throw new Error('Unsupported counter operation.');
  }
  if (count >= 1000000) throw new Error('Counter limit reached.');
  const state = { count: count + 1 };
  return { state, result: state };
}
```

### ui/index.html

```html
<!doctype html>
<html lang="en"><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Example Counter</title>
<h1>Example Counter</h1><p id="value" role="status">Loading…</p>
<button id="increment" type="button" disabled>Add one</button>
<script>
let sequence = 0;
const waiting = new Map();
function request(method, body) {
  return new Promise((resolve, reject) => {
    const id = ++sequence;
    const timer = setTimeout(() => {
      waiting.delete(id); reject(new Error('Result not confirmed. Reload before retrying.'));
    }, 45000);
    waiting.set(id, { resolve, reject, timer });
    parent.postMessage({ type: 'workspace:request', id, method, body }, '*');
  });
}
addEventListener('message', event => {
  if (event.source !== parent || event.data?.type !== 'workspace:response') return;
  const pending = waiting.get(event.data.id);
  if (!pending) return;
  waiting.delete(event.data.id); clearTimeout(pending.timer);
  if (event.data.status >= 400) pending.reject(new Error(event.data.result?.error || 'Failed'));
  else pending.resolve(event.data.result);
});
const button = document.getElementById('increment');
const value = document.getElementById('value');
function display(result) { value.textContent = String(result.count); }
button.onclick = async () => {
  button.disabled = true;
  try { display(await request('POST', { action: 'increment' })); button.disabled = false; }
  catch (error) { value.textContent = error.message; }
};
request('GET').then(result => { display(result); button.disabled = false; })
  .catch(error => { value.textContent = error.message; });
</script></html>
```

## Kuidas see töötab?

Eraldatud päritoluga UI-kaader saadab vanemale workspace:request sõnumi. Core kontrollib kaadrit, kasutab autentitud CRUD-adapterit ja tagastab workspace:response vastuse. Ära päringuga Core’i otse sandbox’ist kasuta ega küsi administraatori küpsiseid.

Andmefunktsioon saab payload.operation, payload.body ja payload.state väljad. Lugemine tagastab `{result}`; kirjutamine võib tagastada `{state,result}`. Core salvestab seisu optimistliku revisjonikontrolliga. Lugemine ei tohi tagastada muudetud state’i. Paketiseis ei anna üldist failisüsteemi kirjutamise õigust.

Näide jätab nupu ebakindla salvestamistulemuse korral keelatuks. Laadi vaade uuesti, et kontrollida salvestatud seisu enne kordamist.

## Kontrollimine

1. Lisa hoidla või ZIP Storage’isse ja paigalda Example Counter.
2. Ava: loendur algab nullist.
3. Lisa üks, laadi uuesti ja kontrolli säilimist.
4. Paigalda teine koopia ning kontrolli selle sõltumatust.
5. Saada ühekordses testis tundmatu toiming: see peab ebaõnnestuma seisu muutmata.

UI skriptid ja stiilid hoia iseseisvad. Teenusega ühendamiseks jätka [pakettide ühendamisega](/et/docs/connect-packages).

## Kohanduv paigutus ja ühilduvus

Piira tavalise vormi- või detaililehe laiust mooduli iframe’i sees stiiliga `width: min(100%, 1440px); margin: 0 auto; box-sizing: border-box;` ning kasuta kohanduvaid sisevahesid. Väikesel ekraanil peavad veerud koonduma ja vormiväljadel olema selged sildid. Kalender ja Kanban võivad teadlikult kasutada kogu laiust. Kontrolli nii telefonilaiust kui laia ekraani; iframe üksi ei tee paigutust kohanduvaks.

Ühilduvus kirjeldab, millised paketid saavad koos töötada. See ei ole alammoodulite puu ega loo ise seost rakendusega või lubatud integratsiooniühendust. Erista nõutud sõltuvused valikulisest ühilduvusest.
