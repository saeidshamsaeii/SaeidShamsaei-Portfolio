'use client';
import {useEffect,useRef} from 'react';

type Tag='p'|'h1'|'h2'|'h3'|'span'|'small'|'strong';
const clamp=(n:number)=>Math.max(0,Math.min(1,n));

/** Scroll-scripted typography: nothing is ghosted before its first word.
 * Every sentence exists unbroken in semantic HTML for assistive technology.
 * The visible word layer starts at zero opacity/fully clipped, then writes
 * from left to right as native scroll advances. Reverse scrolling rewinds.
 * The CSS scripting media query keeps no-JS and reduced-motion fully legible.
 */
export function WordReveal({text,as='p',className='',id}:{
 text:string;as?:Tag;className?:string;id?:string
}){
 const root=useRef<HTMLElement>(null);
 const words=text.trim().split(/\s+/).filter(Boolean);
 useEffect(()=>{
  const host=root.current;if(!host)return;
  const media=window.matchMedia('(prefers-reduced-motion: reduce)');
  const nodes=Array.from(host.querySelectorAll<HTMLElement>('[data-reveal-word]'));
  let raf=0,observing=false;
  const render=(progress:number)=>{
   host.dataset.motion='on';
   const position=clamp(progress)*(nodes.length+.5);
   const active=Math.floor(position);
   for(let i=0;i<nodes.length;i++){
    const fraction=clamp(position-i);
    // Unlike the old 13% opacity treatment, zero means truly blank.
    nodes[i].style.opacity=String(fraction);
    nodes[i].style.clipPath='inset(0 '+((1-fraction)*100)+'% 0 0)';
    nodes[i].style.transform='translateY('+((1-fraction)*.18)+'em)';
    nodes[i].classList.toggle('is-typing',i===active&&progress>0&&progress<1);
   }
  };
  const clear=()=>{
   host.dataset.motion='off';
   for(const node of nodes){
    node.style.removeProperty('opacity');
    node.style.removeProperty('clip-path');
    node.style.removeProperty('transform');
    node.classList.remove('is-typing');
   }
  };
  const update=()=>{
   raf=0;
   if(media.matches){clear();return;}
   const chapter=host.closest<HTMLElement>('[data-horizontal-chapter]');
   const panel=host.closest<HTMLElement>('[data-frame-index]');
   let progress=0;
   if(chapter&&panel){
    const scaled=Number(chapter.dataset.frameProgress||'0');
    const index=Number(panel.dataset.frameIndex||'0');
    const blocks=Array.from(panel.querySelectorAll<HTMLElement>('.sx-word-reveal'));
    const ordinal=Math.max(0,blocks.indexOf(host));
    const total=blocks.length;
    const start=.035+(ordinal/Math.max(1,total))*.46;
    const duration=Math.max(.11,.58/Math.max(1,total)+.09);
    progress=clamp((scaled-index-start)/duration);
   }else{
    const hero=host.closest<HTMLElement>('.sx-v8-hero-slide');
    const heroRoot=hero?.closest<HTMLElement>('#top');
    if(hero&&heroRoot){
     const slides=Array.from(heroRoot.querySelectorAll('.sx-v8-hero-slide'));
     const idx=slides.indexOf(hero);
     const scaled=Number(heroRoot.dataset.heroProgress||'0')*slides.length;
     progress=clamp((scaled-idx-.01)/.67);
    }else{
     const rect=host.getBoundingClientRect();
     const travel=Math.max(window.innerHeight*.52,Math.min(window.innerHeight*.98,rect.height+window.innerHeight*.32));
     progress=clamp((window.innerHeight*.89-rect.top)/travel);
    }
   }
   render(progress);
  };
  const request=()=>{if(!raf)raf=requestAnimationFrame(update);};
  const observer=new IntersectionObserver(entries=>{
   observing=entries.some(e=>e.isIntersecting);
   if(observing){
    window.addEventListener('scroll',request,{passive:true});
    window.addEventListener('resize',request);
    request();
   }else{
    window.removeEventListener('scroll',request);
    window.removeEventListener('resize',request);
    // The past remains fully written; future chapters stay truly blank.
    if(host.getBoundingClientRect().bottom<0&&!host.closest('[data-horizontal-chapter]'))render(1);
   }
  },{rootMargin:'160px 0px 160px 0px',threshold:0});
  observer.observe(host);
  const onMotion=()=>media.matches?clear():request();
  media.addEventListener('change',onMotion);
  if(media.matches)clear();
  else request();
  return()=>{
   observer.disconnect();
   window.removeEventListener('scroll',request);
   window.removeEventListener('resize',request);
   media.removeEventListener('change',onMotion);
   if(raf)cancelAnimationFrame(raf);
  };
 },[text]);
 const Tag=as;
 return <Tag id={id} ref={(node:HTMLElement|null)=>{root.current=node;}}
   className={'sx-word-reveal '+className}>
  <span className="sx-word-a11y">{text}</span>
  <span className="sx-word-pieces" aria-hidden="true">
   {words.map((word,i)=><span data-reveal-word="" className="sx-word-piece" key={i}>
    {word}{i<words.length-1?' ':''}
   </span>)}
  </span>
 </Tag>;
}
