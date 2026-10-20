'use client';
import {useEffect,useState} from 'react';
import type {ProjectId} from '@/data/portfolio';
import {SceneVisual} from '@/components/SceneVisual';

type AssetId='portrait'|'logo'|`project-${ProjectId}`;
type Variant={width:number;webp:string;avif?:string};
type Asset={width:number;height:number;variants:Variant[]};
type Manifest=Partial<Record<AssetId,Asset>>;

let manifestRequest:Promise<Manifest>|undefined;
function loadManifest():Promise<Manifest>{
  if(typeof window==='undefined')return Promise.resolve({});
  if(!manifestRequest)manifestRequest=fetch('/assets/hires/manifest.json',{cache:'force-cache'})
    .then(r=>r.ok?r.json():{})
    .then((json:unknown)=>json&&typeof json==='object'?json as Manifest:{})
    .catch(()=>({}));
  return manifestRequest;
}
function useHighRes(id:AssetId){
 const [asset,setAsset]=useState<Asset|null>(null);
 useEffect(()=>{let active=true;void loadManifest().then(assets=>{
  const value=assets[id];
  if(active&&value&&Array.isArray(value.variants)&&value.variants.length>0)setAsset(value);
 });return()=>{active=false;};},[id]);
 return asset;
}
function sourceSet(asset:Asset,format:'webp'|'avif'){
 return asset.variants.filter(x=>x[format]).map(x=>`${x[format]} ${x.width}w`).join(', ');
}
export function ResponsivePicture({id,fallback,alt,className,width,height,sizes,loading='lazy',fetchPriority}:{
 id:'portrait'|'logo';fallback:string;alt:string;className?:string;width:number;height:number;
 sizes:string;loading?:'lazy'|'eager';fetchPriority?:'high'|'low'|'auto';
}){
 const high=useHighRes(id);
 return <picture>
  {high&&high.variants.some(x=>x.avif)&&<source type="image/avif" srcSet={sourceSet(high,'avif')} sizes={sizes}/>}
  {high&&<source type="image/webp" srcSet={sourceSet(high,'webp')} sizes={sizes}/>}
  <img className={className} src={fallback} width={width} height={height} alt={alt} sizes={high?sizes:undefined}
   loading={loading} decoding="async" fetchPriority={fetchPriority}/>
 </picture>;
}
export function ProjectArtwork({id}:{id:ProjectId}){
 const high=useHighRes(`project-${id}`);
 const [ready,setReady]=useState(false);
 return <div className="cinematic-vector-art">
  <div aria-hidden={ready}><SceneVisual id={id} compact/></div>
  {high&&<picture>
   <source type="image/avif" srcSet={sourceSet(high,'avif')} sizes="(max-width: 960px) 100vw, 63vw"/>
   <source type="image/webp" srcSet={sourceSet(high,'webp')} sizes="(max-width: 960px) 100vw, 63vw"/>
   <img className={'cinematic-master-image'+(ready?' is-ready':'')} src={high.variants[0].webp}
     alt="" width={high.width} height={high.height} loading="lazy" decoding="async" onLoad={()=>setReady(true)}/>
  </picture>}
 </div>;
}
