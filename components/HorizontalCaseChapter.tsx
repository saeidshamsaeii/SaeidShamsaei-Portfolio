'use client';
import {useEffect,useRef} from 'react';
import Link from 'next/link';
import {homeStories} from '@/data/homeStories';
import {projects,type Project} from '@/data/portfolio';
import {WordReveal} from '@/components/WordReveal';

const clamp=(v:number)=>Math.max(0,Math.min(1,v));

/**
 * A short horizontal editorial sequence, not a gallery of identical cards.
 * 3 distinct scenes: identity, one verified idea, and the case-study handoff.
 * Detailed technical chapters remain in the dedicated work page.
 * Only native vertical document scroll controls the pinned horizontal track.
 */
export function HorizontalCaseChapter({project,index}:{project:Project;index:number}){
 const section=useRef<HTMLElement>(null);
 const rail=useRef<HTMLDivElement>(null);
 const count=3;
 const story=homeStories[project.id];
 const lead=story.beats[0];
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
  data-horizontal-chapter="" data-frame-count={count} data-frame-progress="0"
  aria-labelledby={'title-'+project.id}>
  <div className="sx-v11-sticky">
   <div className="sx-v11-rail" ref={rail}>
    <article className="sx-v11-slide sx-v14-scene sx-v14-opening" data-frame-index="0"
     data-tour-stop data-tour-label={project.brand+' / opening'} data-tour-duration="10" data-tour-pace=".72">
     <div className="sx-v14-opening-inner">
      <WordReveal as="h2" id={'title-'+project.id} text={project.brand}/>
      <WordReveal as="p" text={story.signature}/>
     </div>
     <div className="sx-v14-opening-foot">
      <a href={'/work/'+project.id+'/'}>FULL CASE STUDY ↗</a>
     </div>
    </article>
    <article id={'project-'+project.id+'-origin'}
     className={'sx-v11-slide sx-v14-scene sx-v14-scene--'+lead.mode}
     data-frame-index="1" data-tour-stop data-tour-label={project.brand+' / core idea'}
     data-tour-duration={String(lead.duration)} data-tour-pace={String(lead.pace)}>
     <div className="sx-v14-editorial-copy">
      <WordReveal as="h3" text={lead.headline}/>
      <WordReveal as="p" text={lead.copy}/>
     </div>
    </article>
    <article className="sx-v11-slide sx-v14-scene sx-v14-ending" data-frame-index="2"
     data-tour-stop data-tour-label={project.brand+' / handoff'} data-tour-duration="8" data-tour-pace="1.24">
     <div className="sx-v14-ending-inner"><WordReveal as="h3" text={story.ending}/>
      <div className="sx-v14-ending-actions">
       <Link href={'/work/'+project.id+'/'}>READ THE CASE STUDY ↗</Link>
       <a href={next?'#project-'+next.id:'#contact'}>{next?'NEXT / '+next.brand:'LET’S TALK'} ↓</a>
      </div>
     </div>
    </article>
   </div>
  </div>
 </section>;
}
