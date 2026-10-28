'use client';
import {useState} from 'react';
import Link from 'next/link';
import {projects,publicContact,type ProjectId} from '@/data/portfolio';
import {caseNarratives} from '@/data/caseNarratives';
import {WordReveal} from '@/components/WordReveal';
import {GuidedTour} from '@/components/GuidedTour';
import {LanguageSwitcher} from '@/components/LanguageSwitcher';
import {useSiteLocale} from '@/components/LocaleProvider';
import {siteText} from '@/data/siteTranslations';
import {projectText} from '@/data/projectTranslations';
import {caseText} from '@/data/caseTranslations';

export default function CaseStudy({id}:{id:ProjectId}){
 const {locale}=useSiteLocale();
 const t=siteText(locale);
 const p=projects.find(project=>project.id===id)!;
 const next=projects[(projects.findIndex(project=>project.id===id)+1)%projects.length];
 const story=caseNarratives[id];
 const localized=projectText(locale,id);
 const chapterCopy=caseText(locale,id);
 const [tour,setTour]=useState(true); // An authored, variable-tempo narrative begins at hydration.
 return <main className={'case-study sx-v10-case-page scene-'+id}>
  <GuidedTour active={tour} onExit={()=>setTour(false)}/>
  <nav className="case-nav"><Link href="/">← SAEID SHAMSAEI</Link>
   <span>{t.caseLabel} / {p.index} / 04</span><Link href={"/engineering/#evidence-"+p.id}>{t.sourceIndex} ↗</Link><LanguageSwitcher/>
   
  </nav>
  <header className="sx-v10-case-cover" data-tour-stop data-tour-label={p.brand+' / introduction'} data-tour-duration="12" data-tour-pace="0.68">
   <WordReveal as="span" className="sx-v10-counter" text={p.index+' / '+(locale==='en'?p.kicker.en:t.caseLabel)}/>
   <WordReveal as="h1" text={p.brand}/>
   <WordReveal as="h2" text={localized.title}/>
   <WordReveal text={localized.thesis}/>
   <div className="sx-v10-techline">{p.stack.map(technology=><WordReveal as="span" key={technology} text={technology}/>)}</div>
   <a href="#case-story" className="sx-v10-case-link"><WordReveal as="span" text={t.readStory+" ↓"}/></a>
  </header>
  <div id="case-story">
   {story.chapters.map((chapter,i)=><article className="sx-v10-case-section" key={chapter.id} id={'chapter-'+chapter.id}>
    <div className="sx-v10-story-mark"><WordReveal as="span" text={String(i+1).padStart(2,"0")+" / 06"}/><WordReveal as="span" text={locale==='en'?chapter.eyebrow:String(i+1).padStart(2,'0')+' / '+t.caseLabel}/></div>
    <div className="sx-v10-story-text"><div className="sx-v14-case-chapter-head"
      data-tour-stop data-tour-label={p.brand+' / '+(chapterCopy?.chapters[i].title||chapter.title)}
      data-tour-duration="6" data-tour-pace={String([.92,.68,1.23,.83,1.12,.74][i])}>
       <WordReveal as="h2" text={chapterCopy?.chapters[i].title||chapter.title}/>
      </div>
     {(chapterCopy?[chapterCopy.chapters[i].body]:chapter.paragraphs).map((paragraph,j)=><div key={j} className="sx-v13-paragraph"
      data-tour-stop data-tour-label={p.brand+' / '+chapter.title+' / passage '+(j+1)}
      data-tour-duration={String([8,10,9][j])}
      data-tour-pace={String([.82,1.24,.7][j])}>
      <WordReveal text={paragraph}/>
     </div>)}
    </div>
    <details className="sx-v18-case-details">
     <summary>{t.technical} <span aria-hidden="true">+</span></summary>
     <ul>{(chapterCopy?[chapterCopy.chapters[i].body]:chapter.details).map(detail=><li key={detail}>{detail}</li>)}</ul>
    </details>
   </article>)}
  </div>
  <section className="sx-v10-case-evidence" data-tour-stop data-tour-label={p.brand+' / evidence and current state'} data-tour-duration="13" data-tour-pace="0.73">
   <WordReveal as="span" className="sx-v10-counter" text={t.sourceEvidence}/>
   <WordReveal as="h2" text={p.id==="gartal"?"An architecture with distinct responsibilities.":p.id==="factory"?"Proof follows the commit.":p.id==="digirezhim"?"Clinical work demands precision.":"Discovery meets dependable commerce."}/>
   <WordReveal text={localized.outcome}/>
   <WordReveal text={t.evidenceNote}/>
   <WordReveal className="sx-v10-source-line" text={t.sourceContext+': '+p.source}/>
   <div className="sx-v10-reference-list">{story.references.map(reference=><a key={reference.href} target="_blank" rel="noreferrer noopener" href={reference.href}><WordReveal as="span" text={(locale==='en'?reference.label:t.source+' / '+(story.references.indexOf(reference)+1))+' ↗'}/></a>)}</div>
   <Link className="sx-ei-case-link" href={"/engineering/#evidence-"+p.id}>{t.inspect} ↗</Link>
  </section>
  <section className="sx-v10-case-next" data-tour-stop data-tour-label={'Continue to '+next.brand} data-tour-duration="8" data-tour-pace="1.4">
   <WordReveal as="span" className="sx-v10-counter" text={t.next+' / '+next.index}/>
   <WordReveal as="h2" text={next.brand}/>
   <Link href={'/work/'+next.id+'/'}><WordReveal as="span" text={t.nextStory+" ↗"}/></Link>
  </section>
  <footer className="case-footer"><Link href="/">← {t.back}</Link><a href={'mailto:'+publicContact.email}>{t.letsTalk} ↗</a></footer>
 </main>;
}
