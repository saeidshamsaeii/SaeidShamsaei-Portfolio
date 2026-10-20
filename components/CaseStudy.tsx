'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';
import {projects,publicContact,txt,type ProjectId,type Locale} from '@/data/portfolio';
import {SceneVisual} from '@/components/SceneVisual';
export default function CaseStudy({id}:{id:ProjectId}){
const p=projects.find(x=>x.id===id)!;const [lang,setLang]=useState<Locale>('en');
useEffect(()=>{setLang(new URLSearchParams(location.search).get('lang')==='fa'?'fa':'en');},[]);
useEffect(()=>{document.documentElement.lang=lang;document.documentElement.dir=lang==='fa'?'rtl':'ltr';},[lang]);
const l=(fa:string,en:string)=>lang==='fa'?fa:en;
return <main className={'case-study scene-'+p.id}>
<nav className="case-nav"><Link href={'/?lang='+lang}>← SAEID SHAMSAEI</Link><span>CASE STUDY / {p.index} OF 04</span><button type="button" onClick={()=>setLang(lang==='en'?'fa':'en')}>{lang==='en'?'FA':'EN'} ↗</button></nav>
<header className="case-hero"><div className="case-hero-text"><p className="eyebrow">{txt(lang,p.kicker)}</p><h1>{p.brand}</h1><h2>{txt(lang,p.title)}</h2><p>{txt(lang,p.intro)}</p><div className="case-hero-meta">{p.stack.slice(0,4).map(x=><span key={x}>{x}</span>)}</div></div><div className="case-hero-art"><SceneVisual id={p.id} compact/></div></header>
<div className="case-editorial"><div className="case-section"><span>01 / THE CHALLENGE</span><h2>{l('چالش','The challenge.')}</h2><p>{txt(lang,p.problem)}</p></div><div className="case-section"><span>02 / THE APPROACH</span><h2>{l('تصمیم طراحی','The architectural answer.')}</h2><p>{txt(lang,p.solution)}</p></div></div>
<section className="case-systems"><div className="case-systems-head"><span>03 / SYSTEM ANATOMY</span><h2>{l('درون سیستم','Inside the system.')}</h2><p>{l('دامنه‌ها و قابلیت‌های کلیدی','Documented capabilities and domain boundaries')}</p></div><div className="case-capabilities">{p.architecture.map((item,i)=><div key={i}><span>{String(i+1).padStart(2,'0')}</span><h3>{txt(lang,item)}</h3><b>↗</b></div>)}</div></section>
<section className="case-evidence"><span>04 / EVIDENCE & DELIVERY</span><div><h2>{l('وضعیت و مستندات','Built with context, not inflated claims.')}</h2><p>{txt(lang,p.outcome)}</p><small>{l('مبنای اطلاعات:','Source context:')} {p.source}</small><p className="evidence-disclaimer">{l('تصاویر این سایت بازآفرینی مفهومی معماری پروژه‌ها هستند؛ جایگزین اسکرین‌شات تأییدشده محصول واقعی نیستند.','Visuals are bespoke conceptual product illustrations, not authenticated screenshots of deployed production systems.')}</p></div></section>
<section className="case-next"><div><span>05 / NEXT PROJECT</span><h2>{projects[(projects.findIndex(x=>x.id===id)+1)%projects.length].brand}</h2></div><Link href={'/work/'+projects[(projects.findIndex(x=>x.id===id)+1)%projects.length].id+'/?lang='+lang}>{l('پروژه بعدی','NEXT CASE STUDY')} ↗</Link></section>
<footer className="case-footer"><Link href={'/?lang='+lang}>← {l('بازگشت به سایت','BACK TO PORTFOLIO')}</Link><a href={'mailto:'+publicContact.email}>LET’S TALK ↗</a></footer>
</main>;
}
