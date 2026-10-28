'use client';
import {useEffect,useMemo,useRef} from 'react';

type Tag='p'|'h1'|'h2'|'h3'|'span'|'small'|'strong';
const clamp=(n:number)=>Math.max(0,Math.min(1,n));

/**
 * Edition 20: Reveal real rendered lines, not arbitrary groups of 9 words.
 * Each preceding visual line must finish before the next line can begin.
 * Multiple paragraphs share one ordered scroll clock inside each section.
 * The initial hero gets its own on-entry clock so its title is actually
 * readable on the first screen without requiring the visitor to scroll.
 */
export function WordReveal({text,as='p',className='',id,mode='lines',stagger=0,ready=true}:{
 text:string;as?:Tag;className?:string;id?:string;
 mode?:'lines'|'words';stagger?:number;ready?:boolean;
}){
 const root=useRef<HTMLElement>(null);
 const authoredLines=useMemo(()=>{
  const lines=text.split(/\n/g).map(chunk=>chunk.trim()).filter(Boolean);
  return lines.map(line=>line.split(/\s+/).filter(Boolean));
 },[text]);

 useEffect(()=>{
  const host=root.current;if(!host)return;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const onIntro=Boolean(host.closest('#intro'));
  const started=performance.now();
  let raf=0;
  let layoutCache=new WeakMap<HTMLElement,HTMLElement[][]>();

  // Browser layout, not word counts, determines the line breaks at any
  // screen width. Explicit newlines remain mandatory chapter boundaries.
  const measureLines=(element:HTMLElement):HTMLElement[][]=>{
   const existing=layoutCache.get(element);
   if(existing)return existing;
   const result:HTMLElement[][]=[];
   const explicit=Array.from(element.querySelectorAll<HTMLElement>('[data-reveal-line]'));
   for(const line of explicit){
    const words=Array.from(line.querySelectorAll<HTMLElement>('[data-reveal-word]'));
    let prior=Number.NaN;
    for(const word of words){
     const top=word.getBoundingClientRect().top;
     if(!result.length||!Number.isFinite(prior)||Math.abs(prior-top)>3)result.push([]);
     result[result.length-1].push(word);
     prior=top;
    }
   }
   if(!result.length)result.push([]);
   layoutCache.set(element,result);
   return result;
  };

  const render=(value:number)=>{
   const progress=clamp((value-stagger)/Math.max(.05,1-stagger));
   host.dataset.motion='on';
   // The legacy line clipping must not hide actual word visibility.
   for(const line of host.querySelectorAll<HTMLElement>('[data-reveal-line]')){
    line.style.opacity='1';
    line.style.clipPath='none';
    line.style.transform='none';
   }
   const lines=measureLines(host);
   const timeline=progress*lines.length;
   for(let i=0;i<lines.length;i++){
    const fraction=clamp(timeline-i);
    const words=lines[i],typed=fraction*words.length;
    for(let j=0;j<words.length;j++){
     const amount=clamp(typed-j);
     words[j].style.opacity=String(amount);
     words[j].style.clipPath='inset(0 '+((1-amount)*100)+'% 0 0)';
     words[j].style.transform='none';
    }
   }
  };
  const clear=()=>{
   host.dataset.motion='off';
   for(const node of host.querySelectorAll<HTMLElement>('[data-reveal-line],[data-reveal-word]')){
    node.style.removeProperty('opacity');
    node.style.removeProperty('clip-path');
    node.style.removeProperty('transform');
   }
  };

  // One scroll clock across a heading and ALL its paragraphs. A block's
  // window of time is proportional to its actual rendered line count.
  const grouped=(container:HTMLElement,local:number)=>{
   const blocks=Array.from(container.querySelectorAll<HTMLElement>('.sx-word-reveal'))
    .filter(element=>element.getClientRects().length>0);
   if(blocks.length<=1)return clamp(local);
   const sizes=blocks.map(element=>Math.max(1,measureLines(element).length));
   const self=blocks.indexOf(host);
   if(self<0)return clamp(local);
   const total=Math.max(1,sizes.reduce((a,b)=>a+b,0));
   const before=sizes.slice(0,self).reduce((a,b)=>a+b,0);
   return clamp((clamp(local)*total-before)/sizes[self]);
  };
  const request=()=>{if(!raf)raf=requestAnimationFrame(update);};
  const update=()=>{
   raf=0;
   if(reduced.matches){clear();return;}
   const chapter=host.closest<HTMLElement>('[data-horizontal-chapter]');
   const panel=host.closest<HTMLElement>('[data-frame-index]');
   let progress=0;
   if(chapter&&panel){
    const scaled=Number(chapter.dataset.frameProgress||'0');
    const index=Number(panel.dataset.frameIndex||'0');
    // Finish copy before the horizontal rail departs this frame.
    progress=grouped(panel,clamp((scaled-index)/.64));
   }else if(onIntro){
    const container=host.closest<HTMLElement>('.sx-v19-cover-content');
    if(ready&&container){
     const cover=host.closest<HTMLElement>('#intro')!;
     const rect=cover.getBoundingClientRect();
     const byScroll=clamp(-rect.top/Math.max(1,rect.height*.72));
     const byEntry=clamp((performance.now()-started)/2300);
     progress=grouped(container,Math.max(byEntry,byScroll));
     // The on-entry score is finite and starts only when the greeting ends.
     if(byEntry<1)request();
    }
   }else{
    const hero=host.closest<HTMLElement>('.sx-v8-hero-slide');
    const heroRoot=hero?.closest<HTMLElement>('#top');
    if(hero&&heroRoot){
     const slides=Array.from(heroRoot.querySelectorAll('.sx-v8-hero-slide'));
     const index=slides.indexOf(hero);
     const scaled=Number(heroRoot.dataset.heroProgress||'0')*slides.length;
     progress=grouped(hero,clamp((scaled-index)/.72));
    }else{
     const group=host.closest<HTMLElement>(
      '.sx-v10-case-section,.sx-v10-case-cover,.sx-v10-case-evidence,.sx-v10-case-next,'+
      '.sx-v18-about-inner,.sx-v18-index-heading,.sx-v18-index-entry,'+
      '#contact,.sx-v14-editorial-copy,.sx-v14-ending-inner,.sx-v18-work-intro'
     );
     const rect=(group||host).getBoundingClientRect();
     const length=Math.max(1,rect.height+window.innerHeight*.56);
     const local=clamp((window.innerHeight*.83-rect.top)/length);
     progress=group?grouped(group,local):local;
    }
   }
   render(progress);
  };
  const invalidate=()=>{
   layoutCache=new WeakMap<HTMLElement,HTMLElement[][]>();
   request();
  };
  const observer=new IntersectionObserver(entries=>{
   if(entries.some(entry=>entry.isIntersecting)){
    window.addEventListener('scroll',request,{passive:true});
    window.addEventListener('resize',invalidate);
    request();
   }else{
    window.removeEventListener('scroll',request);
    window.removeEventListener('resize',invalidate);
    if(host.getBoundingClientRect().bottom<0&&!host.closest('[data-horizontal-chapter]'))render(1);
   }
  },{rootMargin:'200px 0px 200px 0px',threshold:0});
  observer.observe(host);
  const sizing=new ResizeObserver(invalidate);
  sizing.observe(host);
  const onMotion=()=>reduced.matches?clear():request();
  reduced.addEventListener('change',onMotion);
  if(document.fonts)void document.fonts.ready.then(invalidate);
  if(reduced.matches)clear();else request();
  return()=>{
   observer.disconnect();sizing.disconnect();
   window.removeEventListener('scroll',request);
   window.removeEventListener('resize',invalidate);
   reduced.removeEventListener('change',onMotion);
   if(raf)cancelAnimationFrame(raf);
  };
 },[text,stagger,ready,authoredLines.length,mode]);

 const Tag=as;
 return <Tag id={id} ref={node=>{root.current=node;}}
  className={'sx-word-reveal sx-v18-line-reveal sx-v20-ordered '+className}>
  <span className="sx-word-a11y">{text}</span>
  <span className="sx-word-pieces" aria-hidden="true">
   {authoredLines.map((words,line)=><span key={line} data-reveal-line="" className="sx-v18-reveal-line">
    {words.map((word,i)=><span key={i} data-reveal-word="" className="sx-word-piece">
     {word}{i<words.length-1?' ':''}
    </span>)}
   </span>)}
  </span>
 </Tag>;
}
