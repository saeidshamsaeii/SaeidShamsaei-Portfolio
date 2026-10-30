'use client';
import {useState} from 'react';
import Link from 'next/link';
import {projects,publicContact,type ProjectId} from '@/data/portfolio';
import {caseNarratives} from '@/data/caseNarratives';
import {homeStories} from '@/data/homeStories';
import {WordReveal} from '@/components/WordReveal';
import {GuidedTour} from '@/components/GuidedTour';

/**
 * Case studies use the same editorial rhythm as the homepage:
 * a clear opening, three substantial reading scenes, then an opt-in
 * technical deep dive. No false metrics, synthetic screenshots, or
 * 18 separate auto-scroll paragraph stops.
 */
export default function CaseStudy({id}:{id:ProjectId}){
 const p=projects.find(project=>project.id===id)!;
 const next=projects[(projects.findIndex(project=>project.id===id)+1)%projects.length];
 const story=caseNarratives[id];
 const slides=homeStories[id].beats;
 const [tour,setTour]=useState(true);
 return <main className={'case-study sx-v10-case-page sx-v31-case-page scene-'+id}>
  <GuidedTour active={tour} onExit={()=>setTour(false)}/>
  <a className="sx-v31-skip" href="#case-story">Skip to project story</a>
  <nav className="case-nav" aria-label="Case study navigation">
   <Link href="/">← SAEID SHAMSAEI</Link>
   <span>CASE STUDY / {p.index} OF 04</span>
   <Link href={'/engineering/#evidence-'+p.id}>ENGINEERING ↗</Link>
  </nav>
  <header className="sx-v10-case-cover sx-v31-case-cover"
   data-tour-stop data-tour-label={p.brand+' / introduction'}
   data-tour-duration="12" data-tour-pace="0.77" data-tour-hold="case-scene">
   <span className="sx-v31-kicker">{p.index} / {p.kicker.en}</span>
   <WordReveal as="h1" text={p.brand}/>
   <WordReveal as="h2" text={p.title.en}/>
   <WordReveal className="sx-v31-thesis" text={story.thesis}/>
   <div className="sx-v31-cover-footer">
    <span>PROJECT / {p.index} — THE WORK BEHIND THE DESIGN</span>
    <a href="#case-story">EXPLORE THE STORY ↓</a>
   </div>
  </header>
  <div id="case-story" className="sx-v31-story" aria-label={p.brand+' three-part project story'}>
   {slides.map((beat,index)=><section
    key={beat.eyebrow}
    id={'case-slide-'+(index+1)}
    className={'sx-v31-case-scene sx-v31-case-scene--'+beat.mode}
    data-tour-stop data-tour-hold="case-scene"
    data-tour-label={p.brand+' / '+beat.eyebrow}
    data-tour-pace={String(beat.pace)} data-tour-duration={String(beat.duration)}
    aria-labelledby={'case-scene-title-'+(index+1)}>
    <div className="sx-v31-scene-meta">
     <span>{p.brand} / {beat.eyebrow}</span>
     <span>{String(index+1).padStart(2,'0')} / 03</span>
    </div>
    <div className="sx-v31-scene-copy">
     <WordReveal as="h2" id={'case-scene-title-'+(index+1)} text={beat.headline}/>
     <WordReveal className="sx-v31-scene-lead" text={beat.copy}/>
     <ul className="sx-v31-scene-notes" aria-label="Specific project facts">
      {beat.notes.map((note,i)=><li key={note}>
       <span aria-hidden="true">{String(i+1).padStart(2,'0')}</span>
       <WordReveal as="span" className="sx-v32-note-text" text={note}/>
      </li>)}
     </ul>
    </div>
    <div className="sx-v31-scene-bottom">
     <span>{index===0?'THE PROBLEM':index===1?'THE IMPLEMENTATION':'WHAT THE SOURCES SUPPORT'}</span>
     <a href={index===2?'#case-deep-dive':'#case-slide-'+(index+2)}>
      {index===2?'EXPLORE TECHNICAL DETAIL':'NEXT CHAPTER'} ↓
     </a>
    </div>
   </section>)}
  </div>
  <section id="case-deep-dive" className="sx-v31-deep-dive"
   data-tour-stop data-tour-label={p.brand+' / technical chapters'}
   data-tour-duration="10" data-tour-pace=".85" aria-labelledby="case-deep-title">
   <div className="sx-v31-deep-intro">
    <span className="sx-v31-kicker">ENGINEERING NOTES / 06 CHAPTERS</span>
    <WordReveal as="h2" id="case-deep-title" text="Behind the decisions."/>
    <WordReveal text="Explore the implementation context, technical trade-offs and evidence behind the three-part story. Open any chapter to read the full explanation."/>
   </div>
   <div className="sx-v31-deep-list">
    {story.chapters.map((chapter,i)=><details
     className="sx-v10-case-section sx-v31-deep-item"
     key={chapter.id} id={'chapter-'+chapter.id}>
     <summary className="sx-v31-deep-summary">
      <span className="sx-v31-deep-number">{String(i+1).padStart(2,'0')}</span>
      <span className="sx-v31-deep-label">
       <small>{chapter.eyebrow}</small>
       <strong>{chapter.title}</strong>
      </span>
      <span className="sx-v31-deep-toggle" aria-hidden="true">+</span>
     </summary>
     <div className="sx-v31-deep-content">
      {chapter.paragraphs.map((paragraph,j)=><WordReveal key={j} text={paragraph}/>)}
      <div className="sx-v31-deep-details">
       <span>ENGINEERING POINTS</span>
       <ul>{chapter.details.map(detail=><li key={detail}>{detail}</li>)}</ul>
      </div>
     </div>
    </details>)}
   </div>
  </section>
  <section className="sx-v10-case-evidence sx-v31-evidence" id="case-evidence"
   data-tour-stop data-tour-hold="case-scene"
   data-tour-label={p.brand+' / evidence and current status'}
   data-tour-duration="13" data-tour-pace=".8" aria-labelledby="case-evidence-title">
   <span className="sx-v31-kicker">SOURCE / EVIDENCE & DELIVERY</span>
   <WordReveal as="h2" id="case-evidence-title" text="What is actually verified."/>
   <WordReveal className="sx-v31-evidence-outcome" text={p.outcome.en}/>
   <WordReveal text="These references document the code and architectural decisions. Production results and customer outcomes require separate verification."/>
   <WordReveal className="sx-v10-source-line" text={"Source context: "+p.source}/>
   <div className="sx-v10-reference-list">{story.references.map(reference=><a key={reference.href}
    target="_blank" rel="noreferrer noopener" href={reference.href}>{reference.label} ↗</a>)}</div>
   <Link className="sx-ei-case-link" href={'/engineering/#evidence-'+p.id}>INSPECT ARCHITECTURE DECISIONS ↗</Link>
  </section>
  <section className="sx-v10-case-next sx-v31-case-next"
   data-tour-stop data-tour-label={'Continue to '+next.brand} data-tour-duration="8" data-tour-pace="1.2">
   <span className="sx-v31-kicker">UP NEXT / {next.index}</span>
   <WordReveal as="h2" text={next.brand}/>
   <Link href={'/work/'+next.id+'/'}>NEXT PROJECT ↗</Link>
  </section>
  <footer className="case-footer">
   <Link href="/">← BACK TO PORTFOLIO</Link>
   <a href={'mailto:'+publicContact.email}>LET’S TALK ↗</a>
  </footer>
 </main>;
}
