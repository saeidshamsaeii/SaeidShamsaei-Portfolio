'use client';
import {useEffect,useRef,useState} from 'react';
import Link from 'next/link';
import {WordReveal} from '@/components/WordReveal';
import {projects,type ProjectId} from '@/data/portfolio';

const keywords:Record<ProjectId,string>={
 gartal:'Service pages · project requests',
 factory:'Git sync · Windows Worker',
 digirezhim:'Doctor workspace · nutrition rules',
 petiwoo:'Product search · cart · checkout'
};
export function SelectedWorkIndex(){
 const [active,setActive]=useState<ProjectId>('gartal');
 const section=useRef<HTMLElement>(null);
 // Scroll is the single source of truth: no independent clock and no
 // irreversible "finished" flag. Reverse scrolling unwrites every word,
 // link and underline in strict reverse order.
 useEffect(()=>{
  const host=section.current;
  if(!host)return;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const stages=Array.from(host.querySelectorAll<HTMLElement>('[data-work-stage]'));
  const links=stages.map(stage=>Array.from(stage.querySelectorAll<HTMLAnchorElement>('a')));
  const exposeLinks=(index:number,expose:boolean)=>{
   for(const link of links[index]){
    link.tabIndex=expose?0:-1;
    if(expose)link.removeAttribute('aria-hidden');
    else link.setAttribute('aria-hidden','true');
   }
  };
  const TITLE_TYPE_MS=2300;
  const ROW_TYPE_MS=2600;
  const LINE_DRAW_MS=500;
  const BETWEEN_BLOCK_HOLD_MS=2000;
  const stageDuration=(index:number)=>(
   (index===0?TITLE_TYPE_MS:ROW_TYPE_MS)+LINE_DRAW_MS+
   (index<stages.length-1?BETWEEN_BLOCK_HOLD_MS:0)
  );
  const TOTAL_MS=stages.reduce((sum,_,index)=>sum+stageDuration(index),0);
  let raf=0,priorProgress=Number.NaN;
  const update=()=>{
   raf=0;
   const rect=host.getBoundingClientRect();
   // The sticky inner frame stays legible while the outer scroll runway
   // advances. Both manual and guided scrolling produce the same fraction.
   const travel=Math.max(1,rect.height-innerHeight);
   const position=Math.max(0,Math.min(1,-rect.top/travel));
   // Awaiting blocks may be written only by manual scroll or by the active
   // GuidedTour stop, never while a different autoplay stop is reading.
   const awaiting=host.hasAttribute('data-tour-awaiting')&&
    document.documentElement.dataset.portfolioTour==='playing';
   const progress=reduced.matches?1:awaiting?0:position;
   let local=progress*TOTAL_MS;
   let current=stages.length;
   for(let index=0;index<stages.length;index++){
    const duration=stageDuration(index);
    if(local<duration){current=index;break;}
    local-=duration;
   }
   const typeDuration=current===0?TITLE_TYPE_MS:ROW_TYPE_MS;
   const typed=current===stages.length?1:
    Math.min(1,local/typeDuration);
   host.dataset.workStageIndex=String(current);
   host.dataset.workStageProgress=String(typed);
   for(let index=0;index<stages.length;index++){
    const stage=stages[index];
    const typing=index===current&&local<typeDuration;
    const line=index===current&&local>=typeDuration&&local<typeDuration+LINE_DRAW_MS;
    const holding=index===current&&local>=typeDuration+LINE_DRAW_MS;
    const state=reduced.matches||index<current?'complete':
     index>current?'pending':typing?'typing':line?'line':holding?'holding':'complete';
    if(stage.dataset.workStageState!==state){
     stage.dataset.workStageState=state;
    }
    const draw=reduced.matches||index<current?1:index>current?0:
     Math.max(0,Math.min(1,(local-typeDuration)/LINE_DRAW_MS));
    stage.style.setProperty('--sx-work-rule',String(draw));
    // Links become accessible only after their text is readable.
    exposeLinks(index,state==='complete'||state==='holding'||state==='line');
   }
   host.dataset.workRevealProgress=String(progress);
   host.dispatchEvent(new Event('sx-work-progress'));
   if(progress>=.999&&priorProgress<.999)
    window.dispatchEvent(new Event('sx-work-reading-complete'));
   priorProgress=progress;
  };
  const request=()=>{if(!raf)raf=requestAnimationFrame(update);};
  const observer=new MutationObserver(request);
  observer.observe(host,{attributes:true,attributeFilter:['data-tour-awaiting']});
  window.addEventListener('scroll',request,{passive:true});
  window.addEventListener('resize',request);
  reduced.addEventListener('change',request);
  request();
  return()=>{
   observer.disconnect();
   window.removeEventListener('scroll',request);
   window.removeEventListener('resize',request);
   reduced.removeEventListener('change',request);
   if(raf)cancelAnimationFrame(raf);
   stages.forEach((_,index)=>exposeLinks(index,true));
  };
 },[]);
 // Keep the original five-stage choreography. Only grow the black section
 // when real measured text cannot fit a short viewport (e.g. mobile landscape
 // or increased browser text size). Never silently clip project names.
 useEffect(()=>{
  const host=section.current;
  if(!host)return;
  const rows=Array.from(host.querySelectorAll<HTMLElement>('[data-work-stage]'));
  let frame=0;
  const measure=()=>{
   frame=0;
   const pin=host.querySelector<HTMLElement>('.sx-v35-work-pin')!;
   const style=getComputedStyle(pin);
   const pad=parseFloat(style.paddingTop||'0')+parseFloat(style.paddingBottom||'0');
   const space=window.innerHeight-pad;
   const required=rows.reduce((total,row)=>total+row.scrollHeight,0);
   const tall=required>space+4;
   host.style.setProperty('--sx-work-overflow',Math.max(0,required-space+12)+'px');
   if(host.dataset.workOversize!==(tall?'true':'false'))
    host.dataset.workOversize=tall?'true':'false';
  };
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(measure);};
  const observer=new ResizeObserver(schedule);
  rows.forEach(row=>observer.observe(row));
  window.addEventListener('resize',schedule);
  schedule();
  return()=>{
   observer.disconnect();
   window.removeEventListener('resize',schedule);
   if(frame)cancelAnimationFrame(frame);
  };
 },[]);
 // Link the exit fade to actual scroll movement AFTER the two-second
 // fully typed reading hold. The heading and four rows rise as they fade;
 // revisiting the section restores them with no replay/blanking glitch.
 useEffect(()=>{
  const host=section.current;
  if(!host)return;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  let exitFrame=0;
  const renderExit=()=>{
   exitFrame=0;
   const rect=host.getBoundingClientRect();
   // Keep the entire index fully legible during its five-stage typing and
   // two-second reading holds. Fade only once the finished scene has
   // actually departed beyond the reading area, never at its first scroll.
   const completed=Number(host.dataset.workRevealProgress||0)>=.999;
   const distance=Math.max(140,Math.min(280,window.innerHeight*.30));
   const departureThreshold=window.innerHeight*.62;
   const progress=reduced.matches||!completed?0:
    Math.max(0,Math.min(1,(departureThreshold-rect.bottom)/distance));
   host.style.setProperty('--sx-work-exit',String(progress));
  };
  const requestExit=()=>{
   if(!exitFrame)exitFrame=requestAnimationFrame(renderExit);
  };
  window.addEventListener('scroll',requestExit,{passive:true});
  window.addEventListener('resize',requestExit);
  window.addEventListener('sx-work-reading-complete',requestExit);
  reduced.addEventListener('change',requestExit);
  requestExit();
  return()=>{
   window.removeEventListener('scroll',requestExit);
   window.removeEventListener('resize',requestExit);
   window.removeEventListener('sx-work-reading-complete',requestExit);
   reduced.removeEventListener('change',requestExit);
   if(exitFrame)cancelAnimationFrame(exitFrame);
   host.style.removeProperty('--sx-work-exit');
  };
 },[]);
 return <section ref={section} className="sx-v16-index sx-v18-index" id="work-index"
  data-work-reveal-progress="0"
  aria-labelledby="sx-v16-work-title" data-active-project={active}
  data-tour-stop data-tour-label="Selected work" data-tour-duration="10" data-tour-pace=".92">
  <div className="sx-v35-work-pin">
  <div className="sx-v18-index-heading" data-work-stage="0" data-work-stage-state="pending">
   <WordReveal as="h2" id="sx-v16-work-title" text="Selected work."/>
   <span>04 projects</span>
  </div>
  <div className="sx-v18-index-rows">
   {projects.map((project,index)=><div className="sx-v18-index-entry" key={project.id}
    data-work-stage={index+1} data-work-stage-state="pending"
    onMouseEnter={()=>setActive(project.id)}
    onFocusCapture={()=>setActive(project.id)}
    onTouchStart={()=>setActive(project.id)}>
    <a href={'#project-'+project.id} className="sx-v16-index-row"
     aria-label={'Discover '+project.brand+' immersive story'}>
     <WordReveal as="strong" text={project.brand}/>
     <WordReveal as="span" text={keywords[project.id]}/>
     <span aria-hidden="true">↗</span>
    </a>
    <div className="sx-v18-index-direct">
     <Link href={'/work/'+project.id+'/'}>Case study</Link>
     <Link href={'/engineering/#evidence-'+project.id}>Source ↗</Link>
    </div>
   </div>)}
  </div>
  </div>
 </section>;
}
