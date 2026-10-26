'use client';
import {useEffect,useRef,useState} from 'react';
import Link from 'next/link';
import {caseNarratives} from '@/data/caseNarratives';
import {projects,type Project} from '@/data/portfolio';
import {WordReveal} from '@/components/WordReveal';

const clamp=(v:number)=>Math.min(1,Math.max(0,v));
/**
 * The homepage is a curated visual index, NOT a duplicate of the long case.
 * 8 frames per project: brand, six unique source-grounded chapters, handoff.
 * Normal vertical scroll drives the horizontally pinned rail; the next
 * product enters vertically once the final frame releases.
 */
export function HorizontalCaseChapter({project,index}:{project:Project;index:number}){
 const section=useRef<HTMLElement>(null);
 const stage=useRef<HTMLDivElement>(null);
 const rail=useRef<HTMLDivElement>(null);
 const count=8;
 const next=projects[index+1];
 const narrative=caseNarratives[project.id];
 const [current,setCurrent]=useState(0);
 useEffect(()=>{
  const node=section.current,viewport=stage.current,track=rail.current;
  if(!node||!viewport||!track)return;
  const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
  let raf=0;
  const update=()=>{
   raf=0;
   if(motion.matches)return;
   const rect=node.getBoundingClientRect();
   const progress=clamp(-rect.top/Math.max(1,rect.height-window.innerHeight));
   const scaled=Math.min(count-.00001,progress*count);
   const index=Math.min(count-1,Math.floor(scaled));
   const phase=scaled-index;
   const t=clamp((phase-.72)/.28);
   const glide=t*t*(3-2*t);
   track.style.transform='translate3d('+(-Math.min(count-1,index+glide)*window.innerWidth)+'px,0,0)';
   node.dataset.frameProgress=String(scaled);
   node.dataset.activeFrame=String(index);
   setCurrent(previous=>previous===index?previous:index);
  };
  const request=()=>{if(!raf)raf=requestAnimationFrame(update);};
  const measure=()=>{
   if(motion.matches){
    node.style.height='';
    node.dataset.frameProgress=String(count);
    track.style.transform='';
    track.style.removeProperty('--sx-horizontal-width');
    return;
   }
   const perFrame=Math.max(440,Math.round(window.innerHeight*(window.innerWidth<761?.85:.94)));
   node.style.height=(window.innerHeight+perFrame*count)+'px';
   track.style.setProperty('--sx-horizontal-width',window.innerWidth+'px');
   request();
  };
  window.addEventListener('scroll',request,{passive:true});
  window.addEventListener('resize',measure);
  motion.addEventListener('change',measure);
  measure();
  return()=>{
   if(raf)cancelAnimationFrame(raf);
   window.removeEventListener('scroll',request);
   window.removeEventListener('resize',measure);
   motion.removeEventListener('change',measure);
   node.style.height='';track.style.transform='';
  };
 },[]);
 return <section ref={section} id={'project-'+project.id}
  className={'sx-v10-chapter sx-v10-chapter--'+project.id+' sx-v11-horizontal-chapter sx-v12-curated'}
  data-horizontal-chapter="" data-frame-count={count} data-frame-progress="0"
  aria-labelledby={'title-'+project.id}>
  <div className="sx-v11-sticky" ref={stage}>
   <div className="sx-v11-rail" ref={rail}>
    <article className="sx-v11-slide sx-v11-slide--intro" data-frame-index="0" data-tour-stop
     data-tour-pace="0.76" data-tour-label={project.brand+' / opening'} data-tour-duration="8">
     <div className="sx-v11-intro-layout">
      <WordReveal as="span" className="sx-v10-counter" text={project.index+' / SELECTED ENGINEERING WORK'}/>
      <WordReveal as="h2" id={'title-'+project.id} text={project.brand}/>
      <WordReveal as="p" className="sx-v10-thesis" text={narrative.thesis}/>
      <div className="sx-v10-techline">{project.stack.map(technology=><WordReveal as="span" key={technology} text={technology}/>)}</div>
      <Link className="sx-v10-case-link" href={'/work/'+project.id+'/'}><WordReveal as="span" text="READ THE COMPLETE CASE STUDY ↗"/></Link>
     </div>
    </article>
    {narrative.chapters.map((chapter,i)=><article key={chapter.id}
     className={'sx-v11-slide sx-v11-slide--story sx-v12-chapter-scene sx-v12-chapter-scene--'+(i%3)}
     id={'project-'+project.id+'-'+chapter.id}
     data-frame-index={i+1} data-tour-stop
     data-tour-pace={String([1.12,.82,.7,1.25,.92,1.48][i])}
     data-tour-label={project.brand+' / '+chapter.title}
     data-tour-duration={String(Math.max(7,chapter.durationSeconds))}>
     <div className="sx-v11-story-meta">
      <WordReveal as="span" className="sx-v10-counter" text={project.index+' / '+chapter.eyebrow}/>
      <span className="sx-v11-story-sequence">{String(i+1).padStart(2,'0')} / 06</span>
     </div>
     <div className="sx-v11-story-content">
      <WordReveal as="h3" text={chapter.title}/>
      <WordReveal text={chapter.paragraphs[0]}/>
      <div className="sx-v11-story-points" aria-label="Documented engineering characteristics">
       {chapter.details.map((note,j)=><WordReveal as="span" key={note} text={String(j+1).padStart(2,'0')+' / '+note}/>)}
      </div>
     </div>
     <div className="sx-v11-frame-footer">
      <WordReveal as="span" text={'STORY '+String(i+1).padStart(2,'0')+' / 06'}/>
      <span>CONTINUE TO DISCOVER <b aria-hidden="true">→</b></span>
     </div>
    </article>)}
    <article className="sx-v11-slide sx-v11-slide--end" data-frame-index={count-1}
     data-tour-stop data-tour-pace="1.36"
     data-tour-label={project.brand+' / continue'} data-tour-duration="8">
     <WordReveal as="span" className="sx-v10-counter" text={project.brand+' / BEYOND THE OVERVIEW'}/>
     <WordReveal as="h3" text="The detail is in the system."/>
     <WordReveal text={project.outcome.en}/>
     <div className="sx-v11-end-links">
      <Link href={'/work/'+project.id+'/'}><WordReveal as="span" text="EXPLORE THE FULL TECHNICAL STORY ↗"/></Link>
      <a href={next?'#project-'+next.id:'#contact'}><WordReveal as="span" text={next?'NEXT / '+next.brand+' ↓':'LET’S TALK ↓'}/></a>
     </div>
    </article>
   </div>
   <div className="sx-v11-project-status" aria-label={project.brand+' chapter progress'}>
    <span>{project.index} / {project.brand}</span>
    <div className="sx-v11-project-meter" aria-hidden="true"><i style={{width:((current+1)/count*100)+'%'}}/></div>
    <span>{String(current+1).padStart(2,'0')} / {count}</span>
   </div>
  </div>
 </section>;
}
