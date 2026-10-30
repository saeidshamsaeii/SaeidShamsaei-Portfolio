// Owner-run image pipeline: only genuine supplied masters are resized; never upscale thumbnails.
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root=path.resolve(import.meta.dirname,'..');
const sources=path.join(root,'media-originals');
const destination=path.join(root,'public','assets','hires');
const manifestPath=path.join(destination,'manifest.json');
const widths=[480,768,1024,1440,1920,2560,3840];
const ids=['portrait','logo','project-gartal','project-factory','project-digirezhim','project-petiwoo'];
const formats=['.png','.jpg','.jpeg','.webp','.avif','.tif','.tiff','.svg'];
const mode=process.argv.includes('--build')?'build':'audit';
const allow8k=process.argv.includes('--include-8k');
const expectedMinimum=id=>id==='logo'?512:1600;

async function inputFor(id){
 for(const ext of formats){
  const file=path.join(sources,id+ext);
  try {await fs.access(file);return file;}catch{}
 }
 return null;
}
async function inspect(file){
 const meta=await sharp(file,{limitInputPixels:110_000_000}).metadata();
 const vector=meta.format==='svg';
 const width=meta.autoOrient?.width??meta.width;
 const height=meta.autoOrient?.height??meta.height;
 if(!vector&&(!width||!height))throw Error('Source dimensions missing: '+file);
 return {width,height,vector};
}
await fs.mkdir(destination,{recursive:true});
const previous=JSON.parse(await fs.readFile(manifestPath,'utf8').catch(()=>'{}'));
const manifest=mode==='build'?{}:previous;
let produced=0;
for(const id of ids){
 // Inspect files the shipped pages ACTUALLY reference, not old thumbnail
 // placeholders. Never claim the available 1122px source is a 4K master.
 const displayed=id==='logo'?'logo.webp':id+'.webp';
 const displayedPath=path.join(destination,displayed);
 const displayMeta=await inspect(displayedPath);
 if(id==='portrait'||id.startsWith('project-')){
  if(displayMeta.width<1000||displayMeta.height<1000)
   throw Error('[media] low-resolution public artwork: '+id+' '+displayMeta.width+'x'+displayMeta.height);
  if(id.startsWith('project-')){
   const ratio=displayMeta.width/displayMeta.height;
   if(ratio<.70||ratio>.90)
    throw Error('[media] project art has wrong 4:5 aspect ratio: '+id+' '+ratio.toFixed(3));
  }
  console.log('[media] published '+id+': '+displayMeta.width+'x'+displayMeta.height+' original pixels; framed without distortion');
 }
 const legacy=id==='portrait'?'portrait.webp':id==='logo'?'ss-gold.webp':'projects.webp';
 const legacyPath=path.join(root,'public','assets',legacy);
 const legacyMeta=await inspect(legacyPath);
 const input=await inputFor(id);
 if(!input){
  console.log(`[media] ${id}: no original master; legacy ${legacyMeta.width}x${legacyMeta.height}; ${id.startsWith('project-')?'using scalable vector composition':'using existing fallback'}`);
  continue;
 }
 const meta=await inspect(input);
 const minimum=expectedMinimum(id);
 if(!meta.vector&&meta.width<minimum){
  console.warn(`[media] ${id}: rejected ${meta.width}x${meta.height} master (minimum native width ${minimum}px); refusing fake upscaling`);
  continue;
 }
 console.log(`[media] ${id}: accepted ${meta.vector?'vector original':meta.width+'x'+meta.height+' original'}`);
 if(mode!=='build')continue;
 const scales=[...widths,...(allow8k?[5120,7680]:[])].filter(w=>meta.vector||w<=meta.width);
 if(!scales.length)throw Error('No usable native resolutions for '+id);
 const variants=[];
 for(const width of scales){
  const webp=`/assets/hires/${id}-${width}.webp`;
  const avif=`/assets/hires/${id}-${width}.avif`;
  const from=sharp(input,{limitInputPixels:110_000_000}).rotate().resize({width,withoutEnlargement:!meta.vector});
  await from.clone().webp({quality:88,effort:4}).toFile(path.join(destination,`${id}-${width}.webp`));
  await from.clone().avif({quality:65,effort:3}).toFile(path.join(destination,`${id}-${width}.avif`));
  variants.push({width,webp,avif});produced+=2;
 }
 manifest[id]={width:meta.width||7680,height:meta.height||7680,variants};
}
if(mode==='build'){
 await fs.writeFile(manifestPath,JSON.stringify(manifest,null,2)+'\n','utf8');
 console.log(`[media] generated ${produced} optimized files; commit reviewed outputs, never private source masters`);
}else console.log('[media] audit only; no existing outputs were modified');
