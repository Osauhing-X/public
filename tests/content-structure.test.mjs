import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync,readdirSync} from 'node:fs';
const root=new URL('../',import.meta.url);
const read=file=>readFileSync(new URL(file,root),'utf8');
const registry=JSON.parse(read('routes.json'));
test('topic roots contain all content sections and shared asset folders',()=>{
 for(const domain of ['extaas.com','oux.ee','home_assistant','workspace'])for(const section of ['pages','blog','docs','legal-documents','campaigns','changelog'])assert.ok(existsSync(new URL(domain+'/'+section+'/',root)),domain+'/'+section);
 for(const section of ['images','icons','files'])assert.ok(existsSync(new URL('assets/'+section+'/',root)));
});
test('central registry preserves public paths and resolves every bilingual article',()=>{
 const paths=new Set();
 for(const entry of registry){
  assert.ok(!paths.has(entry.path),'Duplicate '+entry.path);paths.add(entry.path);
  assert.match(entry.source,/^(extaas\.com|oux\.ee|home_assistant|workspace)\//);
  const meta=JSON.parse(read(entry.source+'/meta.json'));
  if(!meta.meta_only&&!meta.redirect)for(const lang of ['en','et'])assert.ok(read(entry.source+'/'+lang+'.md').trim(),entry.source+'/'+lang);
 }
 assert.ok(paths.has('/docs/account'));assert.ok(paths.has('/blog/2026/extaas-ecosystem'));
 assert.equal(registry.filter(item=>item.network==='workspace'&&item.path.startsWith('/docs/')).length,22);
});
test('public page registries contain existing metadata and all embedded repository assets resolve',()=>{
 for(const domain of ['oux.ee','extaas.com'])for(const route of JSON.parse(read(domain+'/pages/routes.json')))assert.ok(existsSync(new URL(domain+'/pages/'+route.replace(/^\//,'')+'/meta.json',root)));
 function scan(dir){for(const item of readdirSync(dir,{withFileTypes:true})){if(item.name.startsWith('.'))continue;const file=new URL(item.name+(item.isDirectory()?'/':''),dir);if(item.isDirectory())scan(file);else if(/\.(md|json)$/.test(item.name))for(const match of readFileSync(file,'utf8').matchAll(/https:\/\/raw\.githubusercontent\.com\/Osauhing-X\/public\/(?:www|refs\/heads\/www)\/([^\s"'<>\)]+)/g)){
   const asset=decodeURIComponent(match[1]);assert.ok(existsSync(new URL(asset,root)),file.pathname+': '+asset);
  }}}
 for(const domain of ['oux.ee','extaas.com','home_assistant','workspace'])scan(new URL(domain+'/',root));
});
