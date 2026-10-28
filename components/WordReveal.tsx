'use client';
import {useEffect,useMemo,useRef} from 'react';

type Tag='p'|'h1'|'h2'|'h3'|'span'|'small'|'strong';
const clamp=(n:number)=>Math.max(0,Math.min(1,n));

/** Editorial line sequencing, not individual ghosted letters.
 * Each visible visual line is revealed only when the preceding line has
 * completed. The semantic text remains intact and read once by AT.
 * source scroll progress is pinned-panel / Linux hero / natural document.
 */
export function WordReveal({text,as='p',className='',id,mode='lines',stagger=0}:{
 text:string;as?:Tag;className?:string;id?:string;
 mode?:'lines'|'words';stagger?:number
}){
 const root=useRef<HTMLElement>(null);
 const lines=useMemo(()=>{
  const chunks=text.split(/\n/g).map(chunk=>chunk.trim()).filter(Boolean);
  const limit=mode==='words'?1:as==='h1'||as==='h2'||as==='h3'?5:as==='p'?9:12;
  const groups:string[][]=[];
  for(const chunk of chunks){
   const words=chunk.split(/\s+/).filter(Boolean);
   for(let offset=0;offset<words.length;offset+=limit)groups.push(words.slice(offset,offset+limit));
  }
  return groups.length?groups:[[]];
 },[text,as,mode]);

 useEffect(()=>{
  const host=root.current;if(!host)return;
  const media=window.matchMedia('(prefers-reduced-motion: reduce)');
  const lineNodes=Array.from(host.querySelectorAll<HTMLElement>('[data-reveal-line]'));
  const nodes=Array.from(host.querySelectorAll<HTMLElement>('[data-reveal-word]'));
  let raf=0;
  const render=(value:number)=>{
   host.dataset.motion='on';
   const progress=clamp((value-stagger)/Math.max(.05,1-stagger));
   const position=progress*lineNodes.length;
   for(let i=0;i<lineNodes.length;i++){
    const fraction=clamp(position-i);
    // No animation on the next line until the current line is complete.
    lineNodes[i].style.opacity=String(fraction);
    lineNodes[i].style.clipPath='inset(0 '+((1-fraction)*100)+'% 0 0)';
    lineNodes[i].style.transform='none';
   }
   for(const node of nodes){
    node.style.opacity='1';
    node.style.clipPath='none';
    node.style.transform='none';
    node.classList.remove('is-typing');
   }
  };
  const clear=()=>{
   host.dataset.motion='off';
   for(const node of [...lineNodes,...nodes]){
    node.style.removeProperty('opacity');
    node.style.removeProperty('clip-path');
    node.style.removeProperty('transform');
    node.classList.remove('is-typing');
   }
  };
  // A section is one reading score: its heading's final line must finish
  // before the very first line of its supporting paragraph can start.
  const grouped=(container:HTMLElement,local:number)=>{
   const blocks=Array.from(container.querySelectorAll<HTMLElement>('.sx-word-reveal'));
   if(blocks.length<2)return local;
   const sizes=blocks.map(el=>Math.max(1,el.querySelectorAll('[data-reveal-line]').length));
   const own=Math.max(0,blocks.indexOf(host));
   const total=sizes.reduce((a,b)=>a+b,0);
   const preceding=sizes.slice(0,own).reduce((a,b)=>a+b,0);
   const start=.035+.58*preceding/total;
   const distance=.58*sizes[own]/total;
   return clamp((local-start)/Math.max(.04,distance));
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
    progress=grouped(panel,clamp(scaled-index));
   }else if(host.closest<HTMLElement>('#intro')){
    // Intro uses document travel, not viewport entrance: at scrollY=0 the
    // name starts blank, then line 1 completes before line 2 begins.
    // The short role statement follows only after the name is written.
    const cover=host.closest<HTMLElement>('#intro')!;
    const rect=cover.getBoundingClientRect();
    const base=clamp(-rect.top/Math.max(1,rect.height*.80));
    progress=host.closest('h1')?clamp(base*1.43):clamp((base-.70)/.30);
   }else{
    const hero=host.closest<HTMLElement>('.sx-v8-hero-slide');
    const heroRoot=hero?.closest<HTMLElement>('#top');
    if(hero&&heroRoot){
     const slides=Array.from(heroRoot.querySelectorAll('.sx-v8-hero-slide'));
     const idx=slides.indexOf(hero);
     const scaled=Number(heroRoot.dataset.heroProgress||'0')*slides.length;
     progress=grouped(hero,clamp(scaled-idx));
    }else{
     // Vertical editorial sections also use a single ordered line score.
     const group=host.closest<HTMLElement>(
      '.sx-v18-about-inner,.sx-v14-editorial-copy,.sx-v10-case-cover,.sx-v10-case-evidence,.sx-v10-case-next,.sx-v14-ending-inner,.sx-v18-work-intro'
     );
     const rect=(group||host).getBoundingClientRect();
     const travel=Math.max(window.innerHeight*.52,Math.min(window.innerHeight*.98,rect.height+window.innerHeight*.32));
     const local=clamp((window.innerHeight*.89-rect.top)/travel);
     progress=group?grouped(group,local):local;
    }
   }
   render(progress);
  };
  const request=()=>{if(!raf)raf=requestAnimationFrame(update);};
  const observer=new IntersectionObserver(entries=>{
   if(entries.some(e=>e.isIntersecting)){
    window.addEventListener('scroll',request,{passive:true});
    window.addEventListener('resize',request);
    request();
   }else{
    window.removeEventListener('scroll',request);
    window.removeEventListener('resize',request);
    if(host.getBoundingClientRect().bottom<0&&!host.closest('[data-horizontal-chapter]'))render(1);
   }
  },{rootMargin:'160px 0px 160px 0px',threshold:0});
  observer.observe(host);
  const onMotion=()=>media.matches?clear():request();
  media.addEventListener('change',onMotion);
  if(media.matches)clear();else request();
  return()=>{
   observer.disconnect();
   window.removeEventListener('scroll',request);
   window.removeEventListener('resize',request);
   media.removeEventListener('change',onMotion);
   if(raf)cancelAnimationFrame(raf);
  };
 },[text,stagger,lines.length]);

 const Tag=as;
 return <Tag id={id} ref={node=>{root.current=node;}}
   className={'sx-word-reveal sx-v18-line-reveal '+className}>
  <span className="sx-word-a11y">{text}</span>
  <span className="sx-word-pieces" aria-hidden="true">
   {lines.map((words,line)=><span key={line} data-reveal-line="" className="sx-v18-reveal-line">
    {words.map((word,i)=><span data-reveal-word="" className="sx-word-piece" key={i}>
     {word}{i<words.length-1?' ':''}
    </span>)}
   </span>)}
  </span>
 </Tag>;
}
