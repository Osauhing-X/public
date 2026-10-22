import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,copyFileSync,rmSync} from 'node:fs';
import {join,dirname} from 'node:path';
import {tmpdir} from 'node:os';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';

function fixture(t){
  const root=mkdtempSync(join(tmpdir(),'public-content-check-'));
  t.after(()=>rmSync(root,{recursive:true,force:true}));
  const write=(path,value)=>{const file=join(root,path);mkdirSync(dirname(file),{recursive:true});writeFileSync(file,typeof value==='string'?value:JSON.stringify(value));};
  write('routes.json',[{source:'content/workspace/docs/example',path:'/docs/example',network:'workspace'}]);
  write('content/workspace/docs/example/meta.json',{});
  write('content/workspace/docs/example/en.md','# Example\n');
  write('content/workspace/docs/example/et.md','# Näide\n');
  write('scripts/.keep','');
  copyFileSync(fileURLToPath(new URL('./validate-content.mjs',import.meta.url)),join(root,'scripts/validate-content.mjs'));
  return {write,run:()=>spawnSync(process.execPath,[join(root,'scripts/validate-content.mjs')],{encoding:'utf8',timeout:10_000})};
}
test('accepts bilingual registered content',t=>assert.equal(fixture(t).run().status,0));
test('rejects malformed JSON and absent translations',t=>{
  const f=fixture(t);f.write('content/workspace/docs/example/meta.json','{');
  let result=f.run();assert.equal(result.status,1);assert.match(result.stderr,/Invalid JSON/);
  f.write('routes.json',[{source:'content/workspace/docs/missing',path:'/docs/missing',network:'workspace'}]);
  result=f.run();assert.equal(result.status,1);assert.match(result.stderr,/Missing .*en.md/);
});
test('rejects retired URLs in metadata and article links',t=>{
  const f=fixture(t);f.write('content/workspace/docs/example/meta.json',{redirect:'https://workspace.extaas.com/old'});
  let result=f.run();assert.equal(result.status,1);assert.match(result.stderr,/Retired public URL/);
  f.write('content/workspace/docs/example/meta.json',{});f.write('content/workspace/docs/example/en.md','[Old](https://oux.ee/?popover=contact_popover)');
  result=f.run();assert.equal(result.status,1);assert.match(result.stderr,/Retired public URL/);
});
test('rejects missing files, duplicate routes and mismatched translation keys',t=>{
  const f=fixture(t);f.write('content/workspace/docs/example/en.md','![Missing](missing.png)');
  f.write('content/workspace/i18n/test/et.json',{label:'Näide'});f.write('content/workspace/i18n/test/en.json',{other:'Example'});
  f.write('routes.json',Array(2).fill({source:'content/workspace/docs/example',path:'/docs/example',network:'workspace'}));
  const result=f.run();assert.equal(result.status,1);assert.match(result.stderr,/Missing linked file/);assert.match(result.stderr,/Duplicate route/);assert.match(result.stderr,/Translation key sets differ/);
});
test('allows explicit metadata-only redirects without invented article bodies',t=>{
  const f=fixture(t);f.write('routes.json',[{source:'content/workspace/legal-documents/example',path:'/legal-documents/example',network:'workspace'}]);
  f.write('content/workspace/legal-documents/example/meta.json',{meta_only:true,redirect:'https://oux.ee/@/read?category=legal-documents'});
  assert.equal(f.run().status,0);
});
test('prevents reintroducing executable SQL through the retired helper URL',t=>{
  const f=fixture(t);
  f.write('content/workspace/docs/supabase/tenant-exec-sql.txt','create function public.exec_sql(query text) returns void language sql as $$ select 1 $$;');
  let result=f.run();assert.equal(result.status,1);assert.match(result.stderr,/Retired SQL helper must contain comments only/);
  f.write('content/workspace/docs/supabase/tenant-exec-sql.txt','-- Deprecated: no executable installation step.\n');
  result=f.run();assert.equal(result.status,0);
});
