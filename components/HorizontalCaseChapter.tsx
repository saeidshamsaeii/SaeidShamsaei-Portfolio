'use client';
import {useEffect,useRef,useState} from 'react';
import Link from 'next/link';
import {homeStories} from '@/data/homeStories';
import {projects,type Project} from '@/data/portfolio';
import {WordReveal} from '@/components/WordReveal';

const clamp=(v:number)=>Math.max(0,Math.min(1,v));

/**
 * A short horizontal editorial sequence, not a gallery of identical cards.
 * 5 scenes (identity / question / mechanism / human value / next chapter)
 * replace the old 20 and 8-panel loops.
 * Only native vertical document scroll controls the pinned horizontal track.
 */
export function HorizontalCaseChapter({project,index}:{project:Project;index:number}){
 const section=useRef<HTMLElement>(null);
 const rail=useRef<HTMLDivElement>(null);
 const count=5;
 const story=homeStories[project.id];
 const next=projects[index+1];
 const [current,setCurrent]=useState(0);

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
   setCurrent(previous=>previous===position?previous:position);
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
     <div className="sx-v14-scene-index"><span>{project.index} / 04</span><span>SELECTED ENGINEERING WORK</span></div>
     <div className="sx-v14-opening-inner">
      <WordReveal as="h2" id={'title-'+project.id} text={project.brand}/>
      <WordReveal as="p" text={story.signature}/>
     </div>
     <div className="sx-v14-opening-foot">
      <span>{project.kicker.en}</span>
      <a href={'/work/'+project.id+'/'}>FULL CASE STUDY ↗</a>
     </div>
    </article>
    {story.beats.map((beat,i)=><article key={beat.eyebrow} id={'project-'+project.id+'-'+['origin','architecture','experience'][i]}
     className={'sx-v11-slide sx-v14-scene sx-v14-scene--'+beat.mode}
     data-frame-index={i+1} data-tour-stop data-tour-label={project.brand+' / '+beat.eyebrow}
     data-tour-duration={String(beat.duration)} data-tour-pace={String(beat.pace)}>
     <div className="sx-v14-scene-index"><span>{project.index} / {String(i+1).padStart(2,'0')}</span><span>{beat.eyebrow}</span></div>
     <div className="sx-v14-editorial-copy">
      <WordReveal as="h3" text={beat.headline}/>
      <WordReveal as="p" text={beat.copy}/>
     </div>
     <aside className="sx-v14-observations" aria-label="Implementation notes">
      {beat.notes.map((note,j)=><div key={note}><small>{String(j+1).padStart(2,'0')}</small><WordReveal as="span" text={note}/></div>)}
     </aside>
    </article>)}
    <article className="sx-v11-slide sx-v14-scene sx-v14-ending" data-frame-index="4"
     data-tour-stop data-tour-label={project.brand+' / handoff'} data-tour-duration="8" data-tour-pace="1.24">
     <div className="sx-v14-scene-index"><span>{project.index} / FIN</span><span>WHAT REMAINS</span></div>
     <div className="sx-v14-ending-inner"><WordReveal as="h3" text={story.ending}/>
      <WordReveal as="p" text={project.outcome.en}/>
      <div className="sx-v14-ending-actions">
       <Link href={'/work/'+project.id+'/'}>READ THE CASE STUDY ↗</Link>
       <a href={next?'#project-'+next.id:'#contact'}>{next?'NEXT / '+next.brand:'LET’S TALK'} ↓</a>
      </div>
     </div>
    </article>
   </div>
   <div className="sx-v11-project-status" aria-label={project.brand+' chapter progress'}>
    <span>{project.index} / {project.brand}</span>
    <div className="sx-v11-project-meter" aria-hidden="true">
     <i style={{width:((current+1)/count*100)+'%'}}/>
    </div>
    <span>{String(current+1).padStart(2,'0')} / 05</span>
   </div>
  </div>
 </section>;
}
