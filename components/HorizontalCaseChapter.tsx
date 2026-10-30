'use client';
import {useEffect,useRef} from 'react';
import Link from 'next/link';
import {homeStories} from '@/data/homeStories';
import {projects,type Project} from '@/data/portfolio';
import {WordReveal} from '@/components/WordReveal';

const clamp=(v:number)=>Math.max(0,Math.min(1,v));

// Each project uses three substantive, source-bounded editorial scenes.
// No decorative introduction or empty CTA-only frame.

/**
 * A short horizontal editorial sequence, not a gallery of identical cards.
 * 3 distinct scenes per project: problem, implementation, verified scope.
 * The final scene also links to the detailed, source-backed case study.
 * Only native vertical document scroll controls the pinned horizontal track.
 */
export function HorizontalCaseChapter({project,index}:{project:Project;index:number}){
 const section=useRef<HTMLElement>(null);
 const rail=useRef<HTMLDivElement>(null);
 const count=3;
 const story=homeStories[project.id];
 const next=projects[index+1];

 useEffect(()=>{
  const node=section.current,track=rail.current;
  if(!node||!track)return;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  let raf=0;
  const update=()=>{
   raf=0;
   if(reduced.matches)return;
   const rect=node.getBoundingClientRect();
   const available=Math.max(1,rect.height-window.innerHeight);
   const progress=clamp(-rect.top/available);
   const scaled=Math.min(count-.00001,progress*count);
   const position=Math.min(count-1,Math.floor(scaled));
   const fraction=scaled-position;
   // Differentiate reading from movement: leave time for words to reveal,
   // then a gentle tracking glide connects the next scene without a hard cut.
   const departure=clamp((fraction-.67)/.33);
   const glide=departure*departure*(3-2*departure);
   const offset=Math.min(count-1,position+glide);
   track.style.transform='translate3d('+(-offset*window.innerWidth)+'px,0,0)';
   node.dataset.frameProgress=String(scaled);
   node.dataset.activeFrame=String(position);
   // Future frames must remain completely unwritten while an earlier frame
   // is held. Rewind their visual text on backwards navigation as well.
   for(const panel of Array.from(node.querySelectorAll<HTMLElement>('[data-frame-index]'))){
    const panelIndex=Number(panel.dataset.frameIndex||'0');
    const state=panelIndex>position?'upcoming':panelIndex===position?'active':'past';
    if(panel.dataset.frameState!==state)panel.dataset.frameState=state;
   }
   // WordReveal listens even for horizontally off-screen frames so their
   // opacity is reset when the reader returns to an earlier section.
   node.dispatchEvent(new Event('sx-horizontal-progress'));
  };
  const request=()=>{if(!raf)raf=requestAnimationFrame(update);};
  const measure=()=>{
   if(reduced.matches){
    node.style.removeProperty('height');
    node.dataset.frameProgress=String(count);
    track.style.removeProperty('transform');
    track.style.removeProperty('--sx-horizontal-width');
    return;
   }
   const frameDistance=Math.max(360,Math.round(window.innerHeight*(window.innerWidth<761?.93:1.09)));
   node.style.height=(window.innerHeight+frameDistance*count)+'px';
   track.style.setProperty('--sx-horizontal-width',window.innerWidth+'px');
   request();
  };
  window.addEventListener('scroll',request,{passive:true});
  window.addEventListener('resize',measure);
  reduced.addEventListener('change',measure);
  measure();
  return()=>{
   if(raf)cancelAnimationFrame(raf);
   window.removeEventListener('scroll',request);
   window.removeEventListener('resize',measure);
   reduced.removeEventListener('change',measure);
   node.style.removeProperty('height');
   track.style.removeProperty('transform');
  };
 },[]);

 return <section id={'project-'+project.id} ref={section}
  className={'sx-v10-chapter sx-v10-chapter--'+project.id+' sx-v11-horizontal-chapter sx-v14-story'}
  data-horizontal-chapter="" data-frame-count={count} data-frame-progress="0" data-active-frame="0"
  aria-labelledby={'title-'+project.id}>
  <div className="sx-v11-sticky">
   <div className="sx-v11-rail" ref={rail}>
    {story.beats.map((beat,slideIndex)=>
     <article key={slideIndex}
      id={'project-'+project.id+'-slide-'+(slideIndex+1)}
      className={'sx-v11-slide sx-v14-scene sx-v14-scene--'+beat.mode+' sx-v30-case-slide'}
      data-frame-index={slideIndex} data-frame-state={slideIndex===0?'active':'upcoming'}
      data-tour-stop data-tour-hold="horizontal-frame"
      data-tour-label={project.brand+' / '+beat.eyebrow}
      data-tour-duration={String(beat.duration)} data-tour-pace={String(beat.pace)}
      aria-label={project.brand+' / '+beat.eyebrow+' / slide '+(slideIndex+1)+' of 3'}>
      {slideIndex===0&&<div className="sx-v35-project-art" aria-hidden="true">
       <img
        src={'/assets/projects/'+project.id+'.webp'}
        width={832} height={468} loading="lazy" decoding="async"
        alt="" />
      </div>}
      <div className="sx-v30-case-meta">
       <span>{project.index} / {project.brand}</span>
       <span>{String(slideIndex+1).padStart(2,'0')} / 03</span>
      </div>
      <div className="sx-v14-editorial-copy sx-v30-case-copy">
       <span className="sx-v30-case-eyebrow">{beat.eyebrow}</span>
       <WordReveal as="h3" id={slideIndex===0?'title-'+project.id:undefined}
        text={beat.headline}/>
       <WordReveal as="p" text={beat.copy}/>
       <ul className="sx-v30-case-notes" aria-label="Specific implementation points">
        {beat.notes.map((note,noteIndex)=><li key={note}>
         <span aria-hidden="true">{String(noteIndex+1).padStart(2,'0')}</span>
         <span>{note}</span>
        </li>)}
       </ul>
      </div>
      <div className="sx-v30-case-footer">
       <span>{slideIndex===0?'PROBLEM':slideIndex===1?'IMPLEMENTATION':'CURRENT EVIDENCE'}</span>
       {slideIndex===2?
        <div className="sx-v14-ending-actions">
         <Link href={'/work/'+project.id+'/'}>READ FULL CASE STUDY ↗</Link>
         <a href={next?'#project-'+next.id:'#contact'}>{next?'NEXT / '+next.brand:'CONTACT'} ↓</a>
        </div>:
        <span>SCROLL FOR {slideIndex===0?'IMPLEMENTATION':'EVIDENCE'} ↓</span>}
      </div>
     </article>)}
   </div>
  </div>
 </section>;
}
