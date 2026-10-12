import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { createServer } from 'node:net';
import { spawn } from 'node:child_process';
import { validateManifest } from '../../workspace.extaas.com/Core/runtime/manifest.js';
const root=new URL('../network/Our Domains/workspace.extaas.com/docs/',import.meta.url);
const routes=JSON.parse(readFileSync(new URL('../network/routes.json',import.meta.url),'utf8'));
test('all Workspace v2 guides have bilingual content, metadata, order and registry paths',()=>{
  const dirs=readdirSync(root,{withFileTypes:true}).filter(item=>item.isDirectory());
  assert.equal(dirs.length,22);
  const orders=new Set();
  for(const dir of dirs){
    const meta=JSON.parse(readFileSync(new URL(dir.name+'/meta.json',root),'utf8'));
    assert.equal(meta.sitemap.lastmod,'2026-10-12',dir.name);
    assert.ok(Number.isInteger(meta.docs_order));assert.ok(!orders.has(meta.docs_order),dir.name);orders.add(meta.docs_order);
    assert.ok(routes.some(item=>item.path==='/docs/'+dir.name));
    for(const lang of ['en','et']){
      const body=readFileSync(new URL(dir.name+'/'+lang+'.md',root),'utf8');
      assert.match(body,/^# /);assert.ok(meta.seo[lang].title);
      assert.doesNotMatch(body,/Settings → Extaas|credits_used = delivered_recipient_count|All private management belongs in `workspace.extaas.com`/);
      for(const match of body.matchAll(/\]\(\/(?:en|et)\/docs\/([^\s)#]+)\)/g))assert.ok(routes.some(item=>item.path==='/docs/'+match[1]),match[1]);
      for(const match of body.matchAll(/```json\n([\s\S]*?)\n```/g)){
        const value=JSON.parse(match[1]);if(!value.kind)continue;
        assert.deepEqual(validateManifest(value).errors,[],dir.name);
      }
    }
  }
});
test('documented application serves its page, health and 404 boundary',async()=>{
  const doc=readFileSync(new URL('create-application/en.md',root),'utf8');
  const source=doc.match(/```js\n([\s\S]*?)\n```/)[1];
  const probe=createServer();await new Promise(resolve=>probe.listen(0,'127.0.0.1',resolve));
  const port=probe.address().port;await new Promise(resolve=>probe.close(resolve));
  const child=spawn(process.execPath,['--input-type=module','-e',source],{env:{...process.env,PORT:String(port),HOST:'127.0.0.1'},stdio:'ignore',windowsHide:true});
  try {
    let response;
    for(let attempt=0;attempt<80;attempt++){
      try{response=await fetch('http://127.0.0.1:'+port+'/health');break;}catch{await new Promise(resolve=>setTimeout(resolve,25));}
    }
    assert.equal(response?.status,200);assert.equal(await response.text(),'ok');
    const page=await fetch('http://127.0.0.1:'+port+'/');assert.equal(page.status,200);assert.match(await page.text(),/Hello from Workspace/);
    assert.equal((await fetch('http://127.0.0.1:'+port+'/private')).status,404);
  } finally { child.kill(); }
});
test('documented module and integration exports execute without leaking credentials',async()=>{
  const moduleDoc=readFileSync(new URL('create-module/en.md',root),'utf8');
  const source=moduleDoc.match(/```js\n([\s\S]*?)\n```/)[1];
  const {manage}=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
  assert.deepEqual(manage({payload:{operation:'read',state:{count:4}}}),{result:{count:4}});
  assert.deepEqual(manage({payload:{operation:'write',state:{count:4},body:{action:'increment'}}}),{state:{count:5},result:{count:5}});
  assert.throws(()=>manage({payload:{operation:'write',body:{action:'unknown'}}}));
  const integrationDoc=readFileSync(new URL('create-integration/en.md',root),'utf8');
  const code=integrationDoc.match(/```js\n([\s\S]*?)\n```/)[1];
  const {connectionStatus}=await import('data:text/javascript;base64,'+Buffer.from(code).toString('base64'));
  assert.deepEqual(connectionStatus({environment:{EXAMPLE_SERVICE_KEY:'test-only-secret'}}),{configured:true});
});
