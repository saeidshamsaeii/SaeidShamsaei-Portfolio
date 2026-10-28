'use client';
import {useEffect,useRef,useState} from 'react';
import Link from 'next/link';
import {WordReveal} from '@/components/WordReveal';
import {projects,type ProjectId} from '@/data/portfolio';
import {projectText} from '@/data/projectTranslations';
import {siteText} from '@/data/siteTranslations';
import {useSiteLocale} from '@/components/LocaleProvider';

const keywords:Record<ProjectId,string>={
 gartal:'Service pages · project requests',
 factory:'Git sync · Windows Worker',
 digirezhim:'Doctor workspace · nutrition rules',
 petiwoo:'Product search · cart · checkout'
};
export function SelectedWorkIndex(){
 const {locale}=useSiteLocale();
 const t=siteText(locale);
 const [active,setActive]=useState<ProjectId>('gartal');
 const section=useRef<HTMLElement>(null);
 // Edition 30: five strictly ordered beats. The heading and then each
 // project title/description type, its own underline draws, and a two-second
 // hold completes BEFORE the next project is allowed to start.
 // The last project's hold is owned by GuidedTour to avoid a double pause.
 useEffect(()=>{
  const host=section.current;
  if(!host)return;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const stages=Array.from(host.querySelectorAll<HTMLElement>('[data-work-stage]'));
  const TITLE_TYPE_MS=2300;
  const ROW_TYPE_MS=2600;
  const LINE_DRAW_MS=500;
  const BETWEEN_BLOCK_HOLD_MS=2000;
  const stageDuration=(index:number)=>(
   (index===0?TITLE_TYPE_MS:ROW_TYPE_MS)+LINE_DRAW_MS+
   (index<stages.length-1?BETWEEN_BLOCK_HOLD_MS:0)
  );
  const TOTAL_MS=stages.reduce((sum,_,index)=>sum+stageDuration(index),0);
  let runningElapsed=0,lastTime=0,started=false,finished=false,raf=0;
  const update=(time:number)=>{
   raf=0;
   if(reduced.matches){
    stages.forEach(stage=>{
     stage.dataset.workStageState='complete';
     stage.style.setProperty('--sx-work-rule','1');
    });
    host.dataset.workStageIndex=String(stages.length);
    host.dataset.workStageProgress='1';
    host.dataset.workRevealProgress='1';
    host.dispatchEvent(new Event('sx-work-progress'));
    finished=true;
    return;
   }
   if(!started){
    const rect=host.getBoundingClientRect();
    const visible=Math.max(0,Math.min(rect.bottom,innerHeight)-Math.max(0,rect.top));
    // Automatic narration starts only once the entire black panel is framed;
    // manual readers can begin as soon as most of it is in view.
    const autoNarrating=document.documentElement.dataset.portfolioTour==='playing';
    const fullyFramed=rect.height>innerHeight+12||
     (rect.top>=-12&&rect.bottom<=innerHeight+12);
    if(host.hasAttribute('data-tour-awaiting')||
       (autoNarrating?!fullyFramed:
        visible<Math.min(innerHeight,rect.height)*.72))return;
    started=true;
   }
   const delta=lastTime?Math.min(80,Math.max(0,time-lastTime)):0;
   lastTime=time;
   runningElapsed=Math.min(TOTAL_MS,runningElapsed+delta);
   let local=runningElapsed;
   let current=stages.length;
   for(let index=0;index<stages.length;index++){
    const duration=stageDuration(index);
    if(local<duration){current=index;break;}
    local-=duration;
   }
   const typeDuration=current===0?TITLE_TYPE_MS:ROW_TYPE_MS;
   const typingProgress=current===stages.length?1:
    Math.min(1,local/typeDuration);
   host.dataset.workStageIndex=String(current);
   host.dataset.workStageProgress=String(typingProgress);
   for(let index=0;index<stages.length;index++){
    const stage=stages[index];
    const typing=index===current&&local<typeDuration;
    const line=index===current&&local>=typeDuration&&
     local<typeDuration+LINE_DRAW_MS;
    const holding=index===current&&local>=typeDuration+LINE_DRAW_MS;
    stage.dataset.workStageState=index<current?'complete':
     index>current?'pending':typing?'typing':line?'line':'holding';
    const draw=index<current?1:index>current?0:
     Math.min(1,Math.max(0,(local-typeDuration)/LINE_DRAW_MS));
    stage.style.setProperty('--sx-work-rule',String(draw));
   }
   host.dataset.workRevealProgress=String(runningElapsed/TOTAL_MS);
   // WordReveal receives the current stage only. No upcoming row can type
   // while the previous rule is drawing or the reader is on its 2s hold.
   host.dispatchEvent(new Event('sx-work-progress'));
   if(runningElapsed<TOTAL_MS)raf=requestAnimationFrame(update);
   else finished=true;
  };
  const request=()=>{if(!raf&&!finished)raf=requestAnimationFrame(update);};
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
   const distance=Math.max(130,Math.min(260,window.innerHeight*.32));
   const progress=reduced.matches?0:
    Math.max(0,Math.min(1,-rect.top/distance));
   host.style.setProperty('--sx-work-exit',String(progress));
  };
  const requestExit=()=>{
   if(!exitFrame)exitFrame=requestAnimationFrame(renderExit);
  };
  window.addEventListener('scroll',requestExit,{passive:true});
  window.addEventListener('resize',requestExit);
  reduced.addEventListener('change',requestExit);
  requestExit();
  return()=>{
   window.removeEventListener('scroll',requestExit);
   window.removeEventListener('resize',requestExit);
   reduced.removeEventListener('change',requestExit);
   if(exitFrame)cancelAnimationFrame(exitFrame);
   host.style.removeProperty('--sx-work-exit');
  };
 },[]);
 return <section ref={section} className="sx-v16-index sx-v18-index" id="work-index"
  data-work-reveal-progress="0"
  aria-labelledby="sx-v16-work-title" data-active-project={active}
  data-tour-stop data-tour-label="Selected work" data-tour-duration="10" data-tour-pace=".92">
  <div className="sx-v18-index-heading" data-work-stage="0" data-work-stage-state="pending">
   <WordReveal as="h2" id="sx-v16-work-title" text={t.selectedWork}/>
   <span>{t.projectsCount}</span>
  </div>
  <div className="sx-v18-index-rows">
   {projects.map((project,index)=><div className="sx-v18-index-entry" key={project.id}
    data-work-stage={index+1} data-work-stage-state="pending"
    onMouseEnter={()=>setActive(project.id)}
    onFocusCapture={()=>setActive(project.id)}
    onTouchStart={()=>setActive(project.id)}>
    <a href={'#project-'+project.id} className="sx-v16-index-row"
     aria-label={t.viewWork+' / '+project.brand}>
     <WordReveal as="strong" text={project.brand}/>
     <WordReveal as="span" text={locale==='en'?keywords[project.id]:projectText(locale,project.id).keyword}/>
     <span aria-hidden="true">↗</span>
    </a>
    <div className="sx-v18-index-direct">
     <Link href={'/work/'+project.id+'/'}>{t.caseStudy}</Link>
     <Link href={'/engineering/#evidence-'+project.id}>{t.source} ↗</Link>
    </div>
   </div>)}
  </div>
 </section>;
}
