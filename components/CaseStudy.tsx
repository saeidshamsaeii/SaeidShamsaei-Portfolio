'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';
import {projects,publicContact,type ProjectId} from '@/data/portfolio';
import {caseNarratives} from '@/data/caseNarratives';
import {WordReveal} from '@/components/WordReveal';
import {GuidedTour} from '@/components/GuidedTour';

export default function CaseStudy({id}:{id:ProjectId}){
 const p=projects.find(project=>project.id===id)!;
 const next=projects[(projects.findIndex(project=>project.id===id)+1)%projects.length];
 const story=caseNarratives[id];
 const [tour,setTour]=useState(false);
 const [dismissed,setDismissed]=useState(false);
 useEffect(()=>{
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  let interacted=window.scrollY>80;
  const cancel=()=>{interacted=true;};
  const timer=window.setTimeout(()=>{if(!dismissed&&!interacted)setTour(true);},1800);
  window.addEventListener('wheel',cancel,{passive:true});
  window.addEventListener('touchstart',cancel,{passive:true});
  window.addEventListener('keydown',cancel);
  return()=>{window.clearTimeout(timer);window.removeEventListener('wheel',cancel);
   window.removeEventListener('touchstart',cancel);window.removeEventListener('keydown',cancel);};
 },[dismissed]);
 return <main className={'case-study sx-v10-case-page scene-'+id}>
  <GuidedTour active={tour} onExit={()=>{setTour(false);setDismissed(true);}}/>
  <nav className="case-nav"><Link href="/">← SAEID SHAMSAEI</Link>
   <span>CASE STUDY / {p.index} OF 04</span>
   <button className="sx-v10-case-tour-button" type="button" onClick={()=>{setDismissed(false);setTour(true);}}>RESTART TOUR ↻</button>
  </nav>
  <header className="sx-v10-case-cover" data-tour-stop data-tour-label={p.brand+' / introduction'} data-tour-duration="10">
   <span className="sx-v10-counter">{p.index} / {p.kicker.en}</span>
   <WordReveal as="h1" text={p.brand}/>
   <WordReveal as="h2" text={p.title.en}/>
   <WordReveal text={story.thesis}/>
   <div className="sx-v10-techline">{p.stack.map(technology=><span key={technology}>{technology}</span>)}</div>
   <a href="#case-story" className="sx-v10-case-link">READ THE ENGINEERING STORY ↓</a>
  </header>
  <div id="case-story">
   {story.chapters.map((chapter,i)=><article className="sx-v10-case-section" key={chapter.id} id={'chapter-'+chapter.id}
     data-tour-stop data-tour-label={p.brand+' / '+chapter.title} data-tour-duration={String(chapter.durationSeconds)}>
    <div className="sx-v10-story-mark"><span>{String(i+1).padStart(2,'0')} / 06</span><span>{chapter.eyebrow}</span></div>
    <div className="sx-v10-story-text"><WordReveal as="h2" text={chapter.title}/>
     {chapter.paragraphs.map((paragraph,j)=><WordReveal key={j} text={paragraph}/>)}
    </div>
    <aside className="sx-v10-story-aside"><span>DOCUMENTED CONSIDERATIONS</span>
     {chapter.details.map((detail,j)=><div key={detail}><small>{String(j+1).padStart(2,'0')}</small><WordReveal as="span" text={detail}/></div>)}
    </aside>
   </article>)}
  </div>
  <section className="sx-v10-case-evidence" data-tour-stop data-tour-label={p.brand+' / evidence and current state'} data-tour-duration="12">
   <span className="sx-v10-counter">SOURCE / EVIDENCE & DELIVERY</span>
   <WordReveal as="h2" text="Built with context, not inflated claims."/>
   <WordReveal text={p.outcome.en}/>
   <WordReveal text="These descriptions are grounded in project documentation and checked-in source. No screenshots, fictitious customers, unverified production metrics or privately held data are displayed."/>
   <p className="sx-v10-source-line">Source context: {p.source}</p>
   <div className="sx-v10-reference-list">{story.references.map(reference=><a key={reference.href} target="_blank" rel="noreferrer noopener" href={reference.href}>{reference.label} ↗</a>)}</div>
  </section>
  <section className="sx-v10-case-next" data-tour-stop data-tour-label={'Continue to '+next.brand} data-tour-duration="8">
   <span className="sx-v10-counter">UP NEXT / {next.index}</span>
   <WordReveal as="h2" text={next.brand}/>
   <Link href={'/work/'+next.id+'/'}>NEXT ENGINEERING STORY ↗</Link>
  </section>
  <footer className="case-footer"><Link href="/">← BACK TO PORTFOLIO</Link><a href={'mailto:'+publicContact.email}>LET’S TALK ↗</a></footer>
 </main>;
}
