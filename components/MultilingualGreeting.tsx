'use client';
import {useEffect,useState} from 'react';

/** Hello... leads, with a short deliberate beat; other greetings pass quickly.
 * RTL languages use their true script and language direction. */
const greetings=[
 {text:'Hello...',lang:'en',dir:'ltr'},
 {text:'سلام',lang:'fa',dir:'rtl'},
 {text:'مرحباً',lang:'ar',dir:'rtl'},
 {text:'こんにちは',lang:'ja',dir:'ltr'},
 {text:'Привет',lang:'ru',dir:'ltr'},
 {text:'नमस्ते',lang:'hi',dir:'ltr'},
 {text:'Ciao',lang:'it',dir:'ltr'},
 {text:'Bonjour',lang:'fr',dir:'ltr'},
 {text:'Hola',lang:'es',dir:'ltr'},
 {text:'Hallo',lang:'de',dir:'ltr'},
 {text:'你好',lang:'zh',dir:'ltr'},
 {text:'Olá',lang:'pt',dir:'ltr'}
] as const;

export function MultilingualGreeting({onComplete}:{onComplete:()=>void}){
 const [index,setIndex]=useState(0);
 const [leaving,setLeaving]=useState(false);
 useEffect(()=>{
  const oldOverflow=document.documentElement.style.overflow;
  document.documentElement.style.overflow='hidden';
  return()=>{document.documentElement.style.overflow=oldOverflow;};
 },[]);
 useEffect(()=>{
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
   const timer=window.setTimeout(onComplete,420);
   return()=>window.clearTimeout(timer);
  }
  // First word stays a little longer; subsequent greetings change quickly.
  const duration=index===0?600:125;
  const timer=window.setTimeout(()=>{
   if(index===greetings.length-1)setLeaving(true);
   else setIndex(n=>n+1);
  },duration);
  return()=>window.clearTimeout(timer);
 },[index,onComplete]);
 useEffect(()=>{
  if(!leaving)return;
  const timer=window.setTimeout(onComplete,260);
  return()=>window.clearTimeout(timer);
 },[leaving,onComplete]);
 const greeting=greetings[index];
 return <div className={'sx-v18-loader'+(leaving?' is-leaving':'')}
  role="status" aria-label="Welcome" aria-live="off" data-greeting-index={index}>
  <span className={'sx-v18-loader-word'+(index===0?' sx-v19-hello-ltr':'')} key={greeting.lang}
   lang={greeting.lang} dir={greeting.dir}>
   {index===0
    ? <span className="sx-v19-hello-content" dir="ltr" aria-label="Hello...">
       <span aria-hidden="true">Hello</span><span className="sx-v19-hello-dots" aria-hidden="true">...</span>
      </span>
    : greeting.text}
  </span>
  <span className="sr-only">Welcome to Saeid Shamsaei's portfolio.</span>
 </div>;
}
