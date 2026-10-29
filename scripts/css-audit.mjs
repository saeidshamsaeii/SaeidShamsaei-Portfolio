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
