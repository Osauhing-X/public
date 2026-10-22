import {readdirSync,readFileSync,existsSync,statSync} from 'node:fs';
import {dirname,join,relative,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const errors=[];
const retired=/https?:\/\/(?:workspace\.extaas\.com|buymeacoffee\.com\/extaas)(?:[/\s)"?#]|$)|popover=contact_popover\b/;
const fail=(file,message)=>errors.push(`${relative(root,file)}: ${message}`);
const walk=folder=>readdirSync(folder,{withFileTypes:true}).flatMap(entry=>entry.isDirectory()?walk(join(folder,entry.name)):entry.isFile()?[join(folder,entry.name)]:[]);
const files=walk(join(root,'content'));
const retiredSql=join(root,'content/workspace/docs/supabase/tenant-exec-sql.txt');
if(existsSync(retiredSql)&&readFileSync(retiredSql,'utf8').split(/\r?\n/).some(line=>line.trim()&&!line.trim().startsWith('--')))fail(retiredSql,'Retired SQL helper must contain comments only, not executable setup SQL.');
const jsonFiles=[join(root,'routes.json'),...files.filter(file=>file.endsWith('.json'))];
const parsed=new Map();
for(const file of jsonFiles){try{
  const text=readFileSync(file,'utf8');
  parsed.set(file,JSON.parse(text));
  if(retired.test(text))fail(file,'Retired public URL.');
}catch(error){fail(file,`Invalid JSON: ${error.message}`);}}
const routes=parsed.get(join(root,'routes.json'));
if(!Array.isArray(routes))fail(join(root,'routes.json'),'Expected an array of content routes.');
const routeKeys=new Set();
for(const route of Array.isArray(routes)?routes:[]){
  if(typeof route.source!=='string'||typeof route.path!=='string'||!route.path.startsWith('/')||typeof route.network!=='string'){fail(join(root,'routes.json'),'Invalid route entry.');continue;}
  const key=`${route.network}:${route.path}`;
  if(routeKeys.has(key))fail(join(root,'routes.json'),`Duplicate route ${key}.`);
  routeKeys.add(key);
  const source=resolve(root,route.source);
  if(!relative(root,source).startsWith('content'+(process.platform==='win32'?'\\':'/'))){fail(join(root,'routes.json'),`Source outside content: ${route.source}.`);continue;}
  const meta=parsed.get(join(source,'meta.json'));
  for(const name of meta?.meta_only===true?['meta.json']:['meta.json','et.md','en.md'])if(!existsSync(join(source,name)))fail(join(root,'routes.json'),`Missing ${route.source}/${name}.`);
  if(meta?.meta_only===true&&typeof meta.redirect!=='string')fail(join(root,'routes.json'),`Metadata-only article needs a redirect: ${route.source}.`);
}
for(const file of files.filter(file=>/[/\\](?:et|en)\.md$/.test(file))){
  const counterpart=join(dirname(file),file.endsWith('et.md')?'en.md':'et.md');
  if(!existsSync(counterpart))fail(file,'Missing paired English/Estonian article.');
  const text=readFileSync(file,'utf8');
  if(!text.trim()||text.includes('\uFFFD'))fail(file,'Empty content or replacement character.');
  if((text.match(/^```/gm)??[]).length%2)fail(file,'Unclosed fenced code block.');
  if(retired.test(text))fail(file,'Retired public URL.');
  for(const match of text.matchAll(/!?\[[^\]\n]*\]\(([^\s)]+)(?:\s+"[^"]*")?\)/g)){
    let url=match[1];
    const raw='https://raw.githubusercontent.com/Osauhing-X/public/www/';
    if(url.startsWith(raw))url=resolve(root,decodeURIComponent(url.slice(raw.length).split(/[?#]/)[0]));
    else if(!/^(?:[a-z][a-z0-9+.-]*:|\/|#)/i.test(url))url=resolve(dirname(file),decodeURIComponent(url.split(/[?#]/)[0]));
    else continue;
    if(!existsSync(url)||!statSync(url).isFile())fail(file,`Missing linked file: ${match[1]}.`);
  }
}
const flatten=(value,prefix='')=>Object.entries(value??{}).flatMap(([key,entry])=>entry&&typeof entry==='object'&&!Array.isArray(entry)?flatten(entry,`${prefix}${key}.`):[`${prefix}${key}`]).sort();
for(const file of jsonFiles.filter(file=>/[/\\]i18n[/\\].*[/\\]et\.json$/.test(file))){
  const en=join(dirname(file),'en.json');
  if(!parsed.has(en)){fail(file,'Missing English translation JSON.');continue;}
  if(JSON.stringify(flatten(parsed.get(file)))!==JSON.stringify(flatten(parsed.get(en))))fail(file,'Translation key sets differ.');
}
if(errors.length){for(const error of errors)console.error(error);process.exitCode=1;}
else console.log(`Content checks passed: ${jsonFiles.length} JSON files, ${files.filter(file=>file.endsWith('.md')).length} Markdown files, ${routeKeys.size} registered articles.`);
