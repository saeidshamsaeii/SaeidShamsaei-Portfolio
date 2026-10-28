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
 // All four project rows fit a single screen. Their words share one
 // deliberate time-based reading clock rather than separate centerlines.
 useEffect(()=>{
  const host=section.current;
  if(!host)return;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const DURATION_MS=7200;
  let startedAt:number|null=null,finished=false,raf=0;
  const update=(time:number)=>{
   raf=0;
   if(reduced.matches){
    host.dataset.workRevealProgress='1';
    host.dispatchEvent(new Event('sx-work-progress'));
    finished=true;
    return;
   }
   if(startedAt===null){
    const rect=host.getBoundingClientRect();
    const visible=Math.max(0,Math.min(rect.bottom,innerHeight)-Math.max(0,rect.top));
    // The director reserves future scenes; don't type while reserved.
    if(host.hasAttribute('data-tour-awaiting')||
       visible<Math.min(innerHeight,rect.height)*.72)return;
    startedAt=time;
   }
   const progress=Math.min(1,(time-startedAt)/DURATION_MS);
   host.dataset.workRevealProgress=String(progress);
   host.dispatchEvent(new Event('sx-work-progress'));
   if(progress<1)raf=requestAnimationFrame(update);
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
 return <section ref={section} className="sx-v16-index sx-v18-index" id="work-index"
  data-work-reveal-progress="0"
  aria-labelledby="sx-v16-work-title" data-active-project={active}
  data-tour-stop data-tour-label="Selected work" data-tour-duration="10" data-tour-pace=".92">
  <div className="sx-v18-index-heading">
   <WordReveal as="h2" id="sx-v16-work-title" text="Selected work."/>
   <span>04 projects</span>
  </div>
  <div className="sx-v18-index-rows">
   {projects.map(project=><div className="sx-v18-index-entry" key={project.id}
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
 </section>;
}
