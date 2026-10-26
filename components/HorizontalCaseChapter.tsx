'use client';
import {useEffect,useRef,useState} from 'react';
import Link from 'next/link';
import {caseNarratives} from '@/data/caseNarratives';
import {projects,type Project} from '@/data/portfolio';
import {WordReveal} from '@/components/WordReveal';

const clamp=(v:number)=>Math.min(1,Math.max(0,v));
/**
 * Native vertical page scroll is converted into a pinned horizontal editorial
 * sequence. It never intercepts wheel/touch or changes scrollY itself.
 * Each project is one independent section; the final panel naturally
 * releases the sticky stage so the next project arrives vertically below.
 * Three readable panels per source-grounded chapter keep small screens legible.
 */
export function HorizontalCaseChapter({project,index}:{project:Project;index:number}){
 const section=useRef<HTMLElement>(null);
 const stage=useRef<HTMLDivElement>(null);
 const rail=useRef<HTMLDivElement>(null);
 const count=20; // intro + (6 chapters × 3 paragraphs) + conclusion
 const next=projects[index+1];
 const narrative=caseNarratives[project.id];
 const [current,setCurrent]=useState(0);

 useEffect(()=>{
  const sectionNode=section.current,stageNode=stage.current,railNode=rail.current;
  if(!sectionNode||!stageNode||!railNode)return;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  let frame=0,observer:ResizeObserver|undefined;
  const measure=()=>{
   if(reduced.matches){
    sectionNode.style.height='';
    sectionNode.dataset.frameProgress=String(count);
    railNode.style.transform='';
    railNode.style.removeProperty('--sx-horizontal-width');
    return;
   }
   const viewport=Math.max(1,window.innerWidth);
   // Each paragraph receives enough vertical scroll to reveal every word,
   // while no expensive image, WebGL or continuous background timer is used.
   const perPanel=Math.max(440,Math.round(window.innerHeight*(viewport<761?.74:.86)));
   sectionNode.style.height=(window.innerHeight+perPanel*count)+'px';
   railNode.style.setProperty('--sx-horizontal-width',viewport+'px');
   request();
  };
  const update=()=>{
   frame=0;
   if(reduced.matches)return;
   const rect=sectionNode.getBoundingClientRect();
   const distance=Math.max(1,rect.height-window.innerHeight);
   const scrollProgress=clamp(-rect.top/distance);
   const scaled=Math.min(count-.00001,scrollProgress*count);
   const index=Math.min(count-1,Math.floor(scaled));
   const phase=scaled-index;
   // Hold the current paragraph for most of its scroll interval, then
   // traverse to the next panel in the final 28%, with a smooth easing.
   const transition=clamp((phase-.72)/.28);
   const eased=transition*transition*(3-2*transition);
   const translate=Math.min(count-1,index+eased);
   railNode.style.transform='translate3d('+(-translate*window.innerWidth)+'px,0,0)';
   sectionNode.dataset.frameProgress=String(scaled);
   sectionNode.dataset.activeFrame=String(index);
   setCurrent(old=>old===index?old:index);
  };
  const request=()=>{if(!frame)frame=requestAnimationFrame(update);};
  const onMotion=()=>{measure();request();};
  observer=new ResizeObserver(request);
  observer.observe(stageNode);
  window.addEventListener('resize',measure);
  window.addEventListener('scroll',request,{passive:true});
  reduced.addEventListener('change',onMotion);
  measure();
  return()=>{
   if(frame)cancelAnimationFrame(frame);
   observer?.disconnect();
   window.removeEventListener('resize',measure);
   window.removeEventListener('scroll',request);
   reduced.removeEventListener('change',onMotion);
   sectionNode.style.height='';
   railNode.style.transform='';
  };
 },[count]);

 return <section ref={section} id={'project-'+project.id}
   className={'sx-v10-chapter sx-v10-chapter--'+project.id+' sx-v11-horizontal-chapter'}
   data-horizontal-chapter data-frame-count={count} data-frame-progress="0"
   aria-labelledby={'title-'+project.id}>
  <div className="sx-v11-sticky" ref={stage}>
   <div className="sx-v11-rail" ref={rail}>
    <article className="sx-v11-slide sx-v11-slide--intro" data-frame-index="0"
      data-tour-stop data-tour-label={project.brand+' / the introduction'} data-tour-duration="8">
     <div className="sx-v11-intro-layout">
      <span className="sx-v10-counter">{project.index} / 04 — SELECTED WORK</span>
      <WordReveal as="h2" id={'title-'+project.id} text={project.brand}/>
      <WordReveal as="p" className="sx-v10-thesis" text={narrative.thesis}/>
      <div className="sx-v10-techline">{project.stack.map(tech=><span key={tech}>{tech}</span>)}</div>
      <Link className="sx-v10-case-link" href={'/work/'+project.id+'/'}>THE FULL ENGINEERING STORY ↗</Link>
     </div>
    </article>
    {narrative.chapters.flatMap((chapter,chapterIndex)=>chapter.paragraphs.map((paragraph,paragraphIndex)=>{
     const frameIndex=1+chapterIndex*3+paragraphIndex;
     return <article className="sx-v11-slide sx-v11-slide--story" key={chapter.id+'-'+paragraphIndex}
      id={paragraphIndex===0?'project-'+project.id+'-'+chapter.id:undefined}
      data-frame-index={frameIndex} data-tour-stop
      data-tour-label={project.brand+' / '+chapter.title+' / '+(paragraphIndex+1)}
      data-tour-duration={String(Math.max(6,Math.ceil(chapter.durationSeconds/2)))}>
      <div className="sx-v11-story-meta">
       <span className="sx-v10-counter">{project.index} / {chapter.eyebrow}</span>
       <span className="sx-v11-story-sequence">{String(paragraphIndex+1).padStart(2,'0')} / 03</span>
      </div>
      <div className="sx-v11-story-content">
       <WordReveal as="h3" text={chapter.title}/>
       <WordReveal text={paragraph}/>
       {paragraphIndex===2&&<div className="sx-v11-story-points" aria-label="Source-backed architecture notes">
        {chapter.details.map((note,n)=><span key={note}><small>{String(n+1).padStart(2,'0')}</small>{note}</span>)}
       </div>}
      </div>
      <div className="sx-v11-frame-footer"><span>CHAPTER {String(chapterIndex+1).padStart(2,'0')} / 06</span>
       <span>SCROLL TO CONTINUE <b aria-hidden="true">→</b></span></div>
     </article>;
    }))}
    <article className="sx-v11-slide sx-v11-slide--end" data-frame-index={count-1}
      data-tour-stop data-tour-label={project.brand+' / documented evidence'} data-tour-duration="8">
     <span className="sx-v10-counter">SOURCE / DOCUMENTED EVIDENCE</span>
     <WordReveal as="h3" text="Evidence over decoration."/>
     <WordReveal text={project.outcome.en}/>
     <p className="sx-v10-source-line">Checked-in evidence: {project.source}</p>
     <div className="sx-v11-end-links">
      <Link href={'/work/'+project.id+'/'}>EXPLORE FULL CASE STUDY ↗</Link>
      <a href={next?'#project-'+next.id:'#contact'}>{next?'NEXT PROJECT / '+next.brand:'LET’S TALK'} ↓</a>
     </div>
    </article>
   </div>
   <div className="sx-v11-project-status" aria-label={project.brand+' horizontal chapter progress'}>
    <span>{project.index} / {project.brand}</span>
    <div className="sx-v11-project-meter" aria-hidden="true"><i style={{width:((current+1)/count*100)+'%'}}/></div>
    <span>{String(current+1).padStart(2,'0')} / {count}</span>
   </div>
  </div>
 </section>;
}
