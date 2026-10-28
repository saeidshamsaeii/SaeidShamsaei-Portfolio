'use client';
import {useEffect,useState} from 'react';

/** English-only greeting. Preserve the cinematic Hello... and fade-out. */
export function MultilingualGreeting({onComplete}:{onComplete:()=>void}){
 const [leaving,setLeaving]=useState(false);
 useEffect(()=>{
  const original=document.documentElement.style.overflow;
  document.documentElement.style.overflow='hidden';
  return()=>{document.documentElement.style.overflow=original;};
 },[]);
 useEffect(()=>{
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
   const timer=window.setTimeout(onComplete,420);
   return()=>window.clearTimeout(timer);
  }
  const timer=window.setTimeout(()=>setLeaving(true),850);
  return()=>window.clearTimeout(timer);
 },[onComplete]);
 useEffect(()=>{
  if(!leaving)return;
  const timer=window.setTimeout(onComplete,260);
  return()=>window.clearTimeout(timer);
 },[leaving,onComplete]);
 return <div className={'sx-v18-loader'+(leaving?' is-leaving':'')}
  role="status" aria-label="Welcome" aria-live="off" data-greeting-index={0}>
  <span className="sx-v18-loader-word sx-v19-hello-ltr"
   lang="en" dir="ltr">
   <span className="sx-v19-hello-content" dir="ltr" aria-label="Hello...">
    <span aria-hidden="true">Hello</span>
    <span className="sx-v19-hello-dots" aria-hidden="true">...</span>
   </span>
  </span>
  <span className="sr-only">Welcome to Saeid Shamsaei's portfolio.</span>
 </div>;
}
