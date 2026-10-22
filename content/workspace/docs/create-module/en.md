# Tutorial: create your first module

This private counter demonstrates the complete read/write loop without external services. It stores a separate count for each installed module instance.

## Files

Create `modules/example-counter/` with `package.json` containing `{"type":"module","private":true}`, then these files.

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

## How it works

The opaque-origin UI frame sends a workspace:request to its parent. Core validates the frame, calls its authenticated CRUD adapter and returns workspace:response. Do not fetch Core directly from the sandbox or ask for administrator cookies.

The data export receives payload.operation, payload.body and payload.state. A read returns `{result}`; a write can return `{state,result}`. Core persists state with optimistic revision checks. Returning state from a read is refused. Package state is not a general filesystem-write permission.

This example disables the button after an uncertain write result. Reload to confirm existing state before retrying.

## Verify

1. Add the repository or ZIP in Storage and install Example Counter.
2. Open it: the count starts at zero.
3. Add one, reload, and verify the count persists.
4. Install another copy and verify its count is independent.
5. Send an unsupported action in a disposable test; it must fail without modifying state.

Keep UI scripts and styles self-contained. For provider-backed operations continue with [connecting packages](/en/docs/connect-packages).

## Responsive layout and compatibility

Constrain ordinary form/detail pages inside the module frame with `width: min(100%, 1440px); margin: 0 auto; box-sizing: border-box;` and responsive padding. Make grids collapse on narrow screens and label form fields clearly. Calendar and Kanban may intentionally use the full available width. Test phone-sized and wide views; an iframe alone does not make a layout responsive.

Compatibility describes which packages can work together. It is not a submodule tree and does not create an assignment or an authorised integration connection by itself. Explain required dependencies separately from optional compatibility.
