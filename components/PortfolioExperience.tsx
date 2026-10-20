'use client';
import {useEffect,useRef,useState} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {useGSAP} from '@gsap/react';
import {projects,publicContact,txt,type Locale} from '@/data/portfolio';
import {SceneVisual} from '@/components/SceneVisual';

gsap.registerPlugin(ScrollTrigger,useGSAP);
function SSMark({className=''}:{className?:string}){return <img className={'ss-mark '+className} src="/assets/ss-gold.webp" alt="SS — Saeid Shamsaei" width={96} height={96} decoding="async"/>}
const detailNames=[['PROBLEM','مسئله'],['ARCHITECTURE','معماری'],['CAPABILITIES','قابلیت‌ها'],['OUTCOME','وضعیت و شواهد']] as const;
function ProjectJourney({project,lang}:{project:(typeof projects)[number],lang:Locale}){
 const scrollRef=useRef<HTMLDivElement>(null);
 const [position,setPosition]=useState(0);
 const dragging=useRef<{x:number;left:number}|null>(null);
 const step=(direction:number)=>{const node=scrollRef.current;if(node){node.scrollBy({left:direction*node.clientWidth*.86,behavior:'smooth'});}};
 const cards=[
 {number:'01',label:lang==='fa'?'مسئله':'THE CHALLENGE',body:txt(lang,project.problem)},
 {number:'02',label:lang==='fa'?'تصمیم معماری':'SYSTEM ARCHITECTURE',body:txt(lang,project.solution)},
 {number:'03',label:lang==='fa'?'قابلیت‌های کلیدی':'CAPABILITIES',body:project.architecture.map(x=>txt(lang,x)).join(' • ')},
 {number:'04',label:lang==='fa'?'شواهد و وضعیت':'DOCUMENTED STATUS',body:txt(lang,project.outcome)}
 ];
 return <section id={'project-'+project.id} className={'motion-chapter chapter-'+project.id} aria-label={project.brand+' case study'}>
 <div className="motion-chapter-inner"><div className="motion-copy"><p className="motion-label">{project.index} / 04 <span>{txt(lang,project.kicker)}</span></p><h2>{project.brand}</h2><h3>{txt(lang,project.title)}</h3><p>{txt(lang,project.intro)}</p><div className="motion-tags">{project.features.slice(0,3).map((x,i)=><span key={i}>{txt(lang,x)}</span>)}</div><div className="motion-instruction"><span>↔</span>{lang==='fa'?'برای دیدن کیس‌استادی به چپ و راست حرکت کنید':'SCROLL SIDEWAYS TO EXPLORE THE CASE STUDY'}</div></div>
 <div className="motion-visual"><div className={'cinematic-project-art cinematic-'+project.id} role="img" aria-label={project.brand+' original concept visualization'}><span className="cinematic-art-number">{project.index}</span><div className="cinematic-art-image"/></div></div></div>
 <div className="motion-drawer"><div className="motion-track" ref={scrollRef} tabIndex={0} aria-label={project.brand+' horizontal case study'} onScroll={e=>{const el=e.currentTarget;setPosition(el.scrollWidth===el.clientWidth?0:Math.round(100*el.scrollLeft/(el.scrollWidth-el.clientWidth)));}}
 onWheel={e=>{if(e.shiftKey && e.deltaY){e.currentTarget.scrollLeft+=e.deltaY;}else if(Math.abs(e.deltaX)>Math.abs(e.deltaY)){e.currentTarget.scrollLeft+=e.deltaX;}}}
 onPointerDown={e=>{if(e.pointerType==='mouse'){dragging.current={x:e.clientX,left:e.currentTarget.scrollLeft};e.currentTarget.setPointerCapture(e.pointerId);}}} onPointerMove={e=>{if(dragging.current){e.currentTarget.scrollLeft=dragging.current.left+(dragging.current.x-e.clientX);}}} onPointerUp={()=>{dragging.current=null;}} onPointerCancel={()=>{dragging.current=null;}}
 onKeyDown={e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();step(e.key==='ArrowRight'?1:-1);}}}>
 <article className="motion-frame motion-cover"><div><small>THE PROJECT / {project.index}</small><h4>{txt(lang,project.tagline)}</h4><p>{txt(lang,project.intro)}</p></div><div className={'motion-miniart cinematic-'+project.id}><div className="cinematic-art-image"/></div></article>
 {cards.map(x=><article className={'motion-frame motion-detail cinematic-'+project.id} key={x.number}><span className="motion-frame-number">{x.number} / 04</span><div><small>{x.label}</small><h4>{x.label}</h4><p>{x.body}</p></div></article>)}
 </div><div className="cinematic-thumbnails" aria-hidden="true">{['OVERVIEW','ARCHITECTURE','WORKFLOWS','EVIDENCE'].map((word,i)=><div className={'cinematic-thumbnail cinematic-'+project.id} key={word}><span>0{i+1}</span><strong>{word}</strong></div>)}</div><div className="motion-progress"><button onClick={()=>step(-1)} aria-label="Previous case study frame">←</button><div className="motion-progress-track"><span style={{width:Math.max(4,position)+'%'}}/></div><button onClick={()=>step(1)} aria-label="Next case study frame">→</button><span>{Math.min(5,Math.round(position/25)+1)} / 05</span></div></div>
 </section>;
}
export default function PortfolioExperience(){
 const root=useRef<HTMLDivElement>(null);
 const [lang,setLang]=useState<Locale>('en');
 const [loading,setLoading]=useState(true);
 const [progress,setProgress]=useState(5);
 const [active,setActive]=useState(0);
 useEffect(()=>{const url=new URL(window.location.href);setLang(url.searchParams.get('lang')==='fa'?'fa':'en');},[]);
 useEffect(()=>{document.documentElement.lang=lang;document.documentElement.dir=lang==='fa'?'rtl':'ltr';},[lang]);
 useEffect(()=>{let cancelled=false;let completed=false;const started=performance.now();const images=['/assets/portrait.webp','/assets/ss-gold.webp','/assets/projects.webp'].map(src=>new Promise<void>(resolve=>{const img=new Image();img.onload=()=>resolve();img.onerror=()=>resolve();img.src=src;if(img.complete)resolve();}));const ready=Promise.all([document.fonts.ready,...images]);const heartbeat=window.setInterval(()=>setProgress(p=>Math.min(91,p+6)),95);
 const close=()=>{if(cancelled||completed)return;completed=true;window.clearInterval(heartbeat);setProgress(100);window.setTimeout(()=>{if(!cancelled)setLoading(false);},250)};
 ready.then(()=>{const remaining=Math.max(0,1200-(performance.now()-started));window.setTimeout(close,remaining);});const safety=window.setTimeout(close,6000);
 return()=>{cancelled=true;window.clearInterval(heartbeat);window.clearTimeout(safety);};},[]);
 useGSAP(()=>{const scope=root.current;if(!scope||loading)return;const mm=gsap.matchMedia();mm.add('(min-width: 960px) and (prefers-reduced-motion: no-preference)',()=>{const triggers=gsap.utils.toArray<HTMLElement>('.motion-chapter').map((el,i)=>ScrollTrigger.create({trigger:el,start:'top 50%',end:'bottom 50%',onEnter:()=>setActive(i),onEnterBack:()=>setActive(i)}));
 gsap.utils.toArray<HTMLElement>('.motion-visual').forEach(el=>gsap.fromTo(el,{y:50,scale:.96},{y:-30,scale:1.04,ease:'none',scrollTrigger:{trigger:el.closest('.motion-chapter')!,start:'top bottom',end:'bottom top',scrub:1}}));return()=>triggers.forEach(t=>t.kill());});
 return()=>mm.revert();},{scope:root,dependencies:[loading]});
 const changeLang=()=>{const next=lang==='en'?'fa':'en';setLang(next);const url=new URL(window.location.href);url.searchParams.set('lang',next);window.history.replaceState(null,'',url.pathname+url.search+url.hash);};
 return <div className="motion-site" ref={root} data-language={lang}>
 {loading&&<div className="ss-preloader" role="status" aria-live="polite"><div className="ss-preloader-top"><span>LOADING EXPERIENCE</span><span>{String(progress).padStart(2,'0')} / 100</span></div><SSMark className="ss-loading-logo"/><div className="ss-loading-orbits" aria-hidden="true"></div><div className="ss-loading-copy"><span>FROM SYSTEMS TO IMPACT</span><small>{lang==='fa'?'طراحی سیستم‌هایی که ماندگارند':'DESIGNING DIGITAL SYSTEMS THAT ENDURE'}</small></div><div className="ss-loading-bar"><span style={{width:progress+'%'}}/></div></div>}
 <header className="motion-nav"><a href="#top" aria-label="Home"><SSMark/><strong>SAEID<br/>SHAMSAEI</strong></a><nav className="cinematic-header-links" aria-label="Site sections"><span>WORK</span><span>ABOUT</span><span>APPROACH</span><span>CONTACT</span></nav><button type="button" onClick={changeLang}>{lang==='fa'?'EN':'FA'} ↗</button></header>
 <main>
 <section className="motion-hero" id="top"><div className="motion-hero-copy"><span>SOFTWARE ARCHITECT / PRODUCT ENGINEER</span><h1>SAEID<br/><em>SHAMSAEI.</em></h1><p>{lang==='fa'?'مهندسی محصول‌های دیجیتال و سیستم‌های پیچیده، با تمرکز بر تجربه و پایداری.':'Designing digital systems that make complex ideas feel remarkably simple.'}</p><div className="cinematic-hero-keywords"><span>ARCHITECT</span><i/> <span>BUILD</span><i/> <span>SOLVE</span><i/> <span>SCALE</span></div><small>SCROLL ↓ / SELECTED PROJECTS</small></div><div className="motion-portrait"><img className="cinematic-portrait-image" src="/assets/portrait.webp" alt="Saeid Shamsaei, original owner-provided personal photograph" width={360} height={360} loading="eager"/><span className="cinematic-halo"/><div className="cinematic-sidewords"><span>SYSTEMS</span><span>IDEAS</span><span>PEOPLE</span><span>IMPACT</span></div><div className="cinematic-portrait-mark"><SSMark/></div></div></section>
 <section className="motion-section-divider"><span>✦ &nbsp; SELECTED PROJECTS</span><span>FOUR JOURNEYS. ONE PHILOSOPHY.</span></section>
 {projects.map(p=><ProjectJourney key={p.id} project={p} lang={lang}/>)}
 <section className="motion-end" id="contact"><span>IDEAS / SYSTEMS / PEOPLE / IMPACT</span><h2>{lang==='fa'?'بیایید آینده را بسازیم.':"LET'S BUILD\nWHAT'S NEXT."}</h2><div className="cinematic-end-logo" aria-hidden="true"><SSMark/></div><p>{lang==='fa'?'برای همکاری و گفتگو از ایمیل استفاده کنید.':'Ambitious product? Interesting challenge? Start a conversation.'}</p><a href={'mailto:'+publicContact.email}>{publicContact.email} ↗</a><div className="motion-social"><a href={publicContact.github} target="_blank" rel="noreferrer">GITHUB ↗</a><a href={publicContact.linkedin} target="_blank" rel="noreferrer">LINKEDIN ↗</a></div></section>
 </main><footer className="motion-footer"><SSMark/><span>© 2026 SAEID SHAMSAEI</span><span>DESIGNING DIGITAL SYSTEMS THAT ENDURE.</span></footer>
 </div>;
}