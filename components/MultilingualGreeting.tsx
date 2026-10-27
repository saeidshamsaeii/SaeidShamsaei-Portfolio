'use client';
import {useEffect,useState} from 'react';

/** Owner-requested greeting sequence. Starts in Persian and ends in Italian.
 * Real translations; language and direction are explicit for screen readers.
 * Motion is disabled in OS reduced-motion mode.
 */
const greetings=[
 {text:'سلام',lang:'fa',dir:'rtl'},
 {text:'Hello',lang:'en',dir:'ltr'},
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
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduced){
   // Do not trap readers with a long animated overlay.
   const timer=window.setTimeout(onComplete,450);
   return()=>window.clearTimeout(timer);
  }
  let i=0,completed=false;
  const interval=window.setInterval(()=>{
   i+=1;
   if(i>=greetings.length){
    window.clearInterval(interval);
    if(!completed){completed=true;setLeaving(true);}
   }else setIndex(i);
  },240);
  return()=>window.clearInterval(interval);
 },[onComplete]);
 useEffect(()=>{
  if(!leaving)return;
  const timer=window.setTimeout(onComplete,380);
  return()=>window.clearTimeout(timer);
 },[leaving,onComplete]);
 const greeting=greetings[index];
 return <div className={'sx-v18-loader'+(leaving?' is-leaving':'')}
  role="status" aria-label="Welcome" aria-live="off" data-greeting-index={index}>
  <span className="sx-v18-loader-word" key={greeting.lang}
   lang={greeting.lang} dir={greeting.dir}>{greeting.text}</span>
  <span className="sr-only">Welcome to Saeid Shamsaei's portfolio.</span>
 </div>;
}
