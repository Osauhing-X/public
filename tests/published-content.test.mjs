import test from 'node:test';
import assert from 'node:assert/strict';
test('published registry and bilingual source files are reachable',{skip:process.env.PUBLIC_CONTENT_REMOTE_CHECK!=='1',timeout:90_000},async()=>{
 const root='https://raw.githubusercontent.com/Osauhing-X/public/www/';
 const request=url=>fetch(root+url,{cache:'no-store',signal:AbortSignal.timeout(10_000)});
 const response=await request('routes.json');assert.equal(response.status,200);
 const entries=await response.json();assert.equal(entries.length,42);
 const queue=[...entries.map(entry=>entry.source+'/meta.json'),'oux.ee/pages/routes.json','extaas.com/pages/routes.json'];
 let cursor=0;
 await Promise.all(Array.from({length:6},async()=>{
  while(cursor<queue.length){const source=queue[cursor++];const result=await request(source);assert.equal(result.status,200,source);const meta=await result.json();
   if(source.endsWith('/meta.json')&&!meta.meta_only&&!meta.redirect)for(const language of ['en','et']){const body=await request(source.replace('meta.json',language+'.md'));assert.equal(body.status,200,source+'/'+language);assert.ok((await body.text()).trim());}
  }
 }));
});
