'use client';
import {useEffect,useRef} from 'react';

type Tag='p'|'h1'|'h2'|'h3'|'span'|'small'|'strong';
const clamp=(v:number)=>Math.max(0,Math.min(1,v));

/**
 * True native-scroll word reveal. Text stays in the DOM from SSR and remains
 * fully accessible with CSS off, JS off or reduced-motion. Only the visible
 * decoration is split; screen readers receive one uninterrupted sentence.
 * Automatic site tour uses the same real scroll position, not a fake timer.
 */
export function WordReveal({text,as='p',className='',id}:{
 text:string;as?:Tag;className?:string;id?:string
}){
 const root=useRef<HTMLElement>(null);
 const words=text.trim().split(/\s+/);
 useEffect(()=>{
  const host=root.current;if(!host)return;
  const media=window.matchMedia('(prefers-reduced-motion: reduce)');
  let frame=0,visible=false;
  const pieces=Array.from(host.querySelectorAll<HTMLElement>('[data-reveal-word]'));
  const clear=()=>{
   host.dataset.motion='off';
   for(const node of pieces){node.style.opacity='';node.style.transform='';}
  };
  const update=()=>{
   frame=0;
   if(media.matches){clear();return;}
   host.dataset.motion='on';
   const box=host.getBoundingClientRect();
   // Start as the block enters lower viewport; complete before its exit.
   // Long paragraphs are deliberately paced so every word has a scroll beat.
   const travel=Math.max(window.innerHeight*.48,Math.min(window.innerHeight*.95,box.height+window.innerHeight*.27));
   const progress=clamp((window.innerHeight*.91-box.top)/travel);
   const reached=progress*(pieces.length+2);
   for(let i=0;i<pieces.length;i++){
    const fade=clamp((reached-i)*1.65);
    pieces[i].style.opacity=String(.13+.87*fade);
    pieces[i].style.transform='translateY('+((1-fade)*.34)+'em)';
   }
  };
  const request=()=>{if(!frame)frame=requestAnimationFrame(update);};
  const observer=new IntersectionObserver(entries=>{
   visible=entries.some(entry=>entry.isIntersecting);
   if(visible){window.addEventListener('scroll',request,{passive:true});window.addEventListener('resize',request);request();}
   else{window.removeEventListener('scroll',request);window.removeEventListener('resize',request);
    // Keep previously passed blocks fully revealed instead of hiding them.
    if(host.getBoundingClientRect().bottom<=0){
     pieces.forEach(node=>{node.style.opacity='1';node.style.transform='none';});
    }}
  },{rootMargin:'130px 0px 130px 0px'});
  observer.observe(host);
  const onMotion=()=>{if(media.matches)clear();else request();};
  media.addEventListener('change',onMotion);
  if(media.matches)clear();
  return()=>{observer.disconnect();window.removeEventListener('scroll',request);window.removeEventListener('resize',request);media.removeEventListener('change',onMotion);if(frame)cancelAnimationFrame(frame);};
 },[text]);
 const Tag=as;
 return <Tag id={id} ref={root as React.Ref<never>} className={'sx-word-reveal '+className} aria-label={text}>
  <span className="sx-word-a11y">{text}</span>
  <span className="sx-word-pieces" aria-hidden="true">
   {words.map((word,i)=><span data-reveal-word="" className="sx-word-piece" key={i}>{word}{i<words.length-1?' ':''}</span>)}
  </span>
 </Tag>;
}
