'use client';
import {useState} from 'react';
import Link from 'next/link';
import {projects,publicContact,type ProjectId} from '@/data/portfolio';
import {caseNarratives} from '@/data/caseNarratives';
import {WordReveal} from '@/components/WordReveal';
import {GuidedTour} from '@/components/GuidedTour';

export default function CaseStudy({id}:{id:ProjectId}){
 const p=projects.find(project=>project.id===id)!;
 const next=projects[(projects.findIndex(project=>project.id===id)+1)%projects.length];
 const story=caseNarratives[id];
 const [tour,setTour]=useState(true); // An authored, variable-tempo narrative begins at hydration.
 return <main className={'case-study sx-v10-case-page scene-'+id}>
  <GuidedTour active={tour} onExit={()=>setTour(false)}/>
  <nav className="case-nav"><Link href="/">← SAEID SHAMSAEI</Link>
   <span>CASE STUDY / {p.index} OF 04</span>
   
  </nav>
  <header className="sx-v10-case-cover" data-tour-stop data-tour-label={p.brand+' / introduction'} data-tour-duration="12" data-tour-pace="0.68">
   <WordReveal as="span" className="sx-v10-counter" text={p.index+" / "+p.kicker.en}/>
   <WordReveal as="h1" text={p.brand}/>
   <WordReveal as="h2" text={p.title.en}/>
   <WordReveal text={story.thesis}/>
   <div className="sx-v10-techline">{p.stack.map(technology=><WordReveal as="span" key={technology} text={technology}/>)}</div>
   <a href="#case-story" className="sx-v10-case-link"><WordReveal as="span" text="READ THE ENGINEERING STORY ↓"/></a>
  </header>
  <div id="case-story">
   {story.chapters.map((chapter,i)=><article className="sx-v10-case-section" key={chapter.id} id={'chapter-'+chapter.id}
     data-tour-stop data-tour-label={p.brand+' / '+chapter.title} data-tour-duration={String(chapter.durationSeconds)}
     data-tour-pace={String([.92,.68,1.23,.83,1.12,.74][i])}>
    <div className="sx-v10-story-mark"><WordReveal as="span" text={String(i+1).padStart(2,"0")+" / 06"}/><WordReveal as="span" text={chapter.eyebrow}/></div>
    <div className="sx-v10-story-text"><WordReveal as="h2" text={chapter.title}/>
     {chapter.paragraphs.map((paragraph,j)=><WordReveal key={j} text={paragraph}/>)}
    </div>
    <aside className="sx-v10-story-aside"><WordReveal as="span" text="DOCUMENTED CONSIDERATIONS"/>
     {chapter.details.map((detail,j)=><div key={detail}><WordReveal as="small" text={String(j+1).padStart(2,"0")}/><WordReveal as="span" text={detail}/></div>)}
    </aside>
   </article>)}
  </div>
  <section className="sx-v10-case-evidence" data-tour-stop data-tour-label={p.brand+' / evidence and current state'} data-tour-duration="13" data-tour-pace="0.73">
   <WordReveal as="span" className="sx-v10-counter" text="SOURCE / EVIDENCE & DELIVERY"/>
   <WordReveal as="h2" text={p.id==="gartal"?"An architecture with distinct responsibilities.":p.id==="factory"?"Proof follows the commit.":p.id==="digirezhim"?"Clinical work demands precision.":"Discovery meets dependable commerce."}/>
   <WordReveal text={p.outcome.en}/>
   <WordReveal text="Follow the source references for the documented implementation; verification of deployed behavior is a separate step."/>
   <WordReveal className="sx-v10-source-line" text={"Source context: "+p.source}/>
   <div className="sx-v10-reference-list">{story.references.map(reference=><a key={reference.href} target="_blank" rel="noreferrer noopener" href={reference.href}><WordReveal as="span" text={reference.label+" ↗"}/></a>)}</div>
  </section>
  <section className="sx-v10-case-next" data-tour-stop data-tour-label={'Continue to '+next.brand} data-tour-duration="8" data-tour-pace="1.4">
   <WordReveal as="span" className="sx-v10-counter" text={"UP NEXT / "+next.index}/>
   <WordReveal as="h2" text={next.brand}/>
   <Link href={'/work/'+next.id+'/'}><WordReveal as="span" text="NEXT ENGINEERING STORY ↗"/></Link>
  </section>
  <footer className="case-footer"><Link href="/">← BACK TO PORTFOLIO</Link><a href={'mailto:'+publicContact.email}>LET’S TALK ↗</a></footer>
 </main>;
}
