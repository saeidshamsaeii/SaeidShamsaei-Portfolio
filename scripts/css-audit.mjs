// Manual CSS debt inventory. Reports cascade complexity; never rewrites styles.
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(import.meta.dirname,'..');
const layout=fs.readFileSync(path.join(root,'app/layout.tsx'),'utf8');
const imports=[...layout.matchAll(/import\s+['"]\.\/([^'"]+\.css)['"]/g)].map(m=>'app/'+m[1]);
imports.push('app/engineering.css');
const metrics=imports.map(file=>{
 const text=fs.readFileSync(path.join(root,file),'utf8');
 return {file,bytes:Buffer.byteLength(text),important:(text.match(/!important/g)||[]).length,
  lines:text.split(/\r?\n/).length};
});
const total=metrics.reduce((a,r)=>a+r.bytes,0);
const important=metrics.reduce((a,r)=>a+r.important,0);
console.log('\nPORTFOLIO CSS DEBT — read-only audit');
console.log('Loaded style sources: '+imports.length+' (engineering.css loads only on its route)');
console.log('Total uncompressed source: '+(total/1024).toFixed(1)+' KiB; !important declarations: '+important);
for(const row of [...metrics].sort((a,b)=>b.bytes-a.bytes).slice(0,10))
 console.log(row.file.padEnd(34)+' '+(row.bytes/1024).toFixed(1).padStart(6)+' KiB '+String(row.important).padStart(4)+' !important');
console.log('This is a source-debt indicator, not network bytes, Lighthouse or visual QA.');
console.log('Do not delete historical layers before screenshot comparisons for all routes/viewports.\n');


// Read-only selector inventory. Cross-layer overlaps are not blindly removed:
// media conditions and historical overrides can be necessary for the design.
const occurrences=new Map();
for(const {file} of metrics){
 const source=fs.readFileSync(path.join(root,file),'utf8').replace(/\/\*[\s\S]*?\*\//g,'');
 const selectors=[...source.matchAll(/(^|\})\s*([^{}@]+?)\s*\{/gm)];
 for(const match of selectors){
  const selector=match[2].trim().replace(/\s+/g,' ');
  if(!selector||selector.startsWith('@')||selector.length>240)continue;
  const family=occurrences.get(selector)||new Set();
  family.add(file);
  occurrences.set(selector,family);
 }
}
const crossLayer=[...occurrences].filter(([,files])=>files.size>1)
 .map(([selector,files])=>({selector,layers:[...files]}))
 .sort((a,b)=>b.layers.length-a.layers.length);
console.log('Selectors shared across historical CSS layers: '+crossLayer.length);
for(const item of crossLayer.slice(0,12)){
 console.log('  '+item.layers.length+' layers: '+item.selector.slice(0,105));
}
const tailCss=fs.readFileSync(path.join(root,'app/quality.css'),'utf8');
const tokens=['--sx-color-black','--sx-color-white',
 '--sx-color-secondary','--sx-focus-ring-width','--sx-reading-line-height'];
const missingTokens=tokens.filter(token=>!tailCss.includes(token+':'));
if(missingTokens.length){
 console.error('Missing design tokens: '+missingTokens.join(', '));
 process.exitCode=1;
}
console.log('Consolidate only with before/after browser screenshots across all routes.');
