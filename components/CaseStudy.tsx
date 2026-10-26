'use client';
import Link from 'next/link';
import {projects,publicContact,txt,type ProjectId} from '@/data/portfolio';
import {SourceProductPreview} from '@/components/SourceProductPreview';

const english='en' as const;
export default function CaseStudy({id}:{id:ProjectId}){
 const p=projects.find(x=>x.id===id)!;
 const next=projects[(projects.findIndex(x=>x.id===id)+1)%projects.length];
 return <main className={'case-study scene-'+p.id}>
  <nav className="case-nav"><Link href="/">← SAEID SHAMSAEI</Link><span>CASE STUDY / {p.index} OF 04</span></nav>
  <header className="case-hero">
   <div className="case-hero-text"><p className="eyebrow">{txt(english,p.kicker)}</p><h1>{p.brand}</h1>
    <h2>{txt(english,p.title)}</h2><p>{txt(english,p.intro)}</p>
    <div className="case-hero-meta">{p.stack.slice(0,4).map(x=><span key={x}>{x}</span>)}</div>
   </div>
   <div className="case-hero-art cinematic-case-art sx-v4-case-hero-art sx-source-showcase">
    <SourceProductPreview id={p.id} compact/>
   </div>
  </header>
  <div className="case-editorial">
   <div className="case-section"><span>01 / THE CHALLENGE</span><h2>The challenge.</h2><p>{txt(english,p.problem)}</p></div>
   <div className="case-section"><span>02 / THE APPROACH</span><h2>The architectural answer.</h2><p>{txt(english,p.solution)}</p></div>
  </div>
  <section className="sx-v4-case-source"><div className="sx-v4-case-source-label"><span>SOURCE-DERIVED PRODUCT ANATOMY</span><p>An interactive reconstruction based on the source of the real project. No fabricated customer or performance data.</p></div><SourceProductPreview id={p.id}/></section>
  <section className="case-systems"><div className="case-systems-head"><span>03 / SYSTEM ANATOMY</span><h2>Inside the system.</h2><p>Documented capabilities and domain boundaries</p></div>
   <div className="case-capabilities">{p.architecture.map((item,i)=><div key={i}><span>{String(i+1).padStart(2,'0')}</span><h3>{txt(english,item)}</h3><b>↗</b></div>)}</div>
  </section>
  <section className="case-evidence"><span>04 / EVIDENCE & DELIVERY</span><div><h2>Built with context, not inflated claims.</h2><p>{txt(english,p.outcome)}</p>
   <small>Repository evidence: {p.source}</small>
   <p className="evidence-disclaimer">Both interface compositions use checked-in project source as their reference. They are not live screenshots, and no user data or unverified business results are displayed.</p>
  </div></section>
  <section className="case-next"><div><span>05 / NEXT PROJECT</span><h2>{next.brand}</h2></div><Link href={'/work/'+next.id+'/'}>NEXT CASE STUDY ↗</Link></section>
  <footer className="case-footer"><Link href="/">← BACK TO PORTFOLIO</Link><a href={'mailto:'+publicContact.email}>LET’S TALK ↗</a></footer>
 </main>;
}
