'use client';
import {useEffect,useRef,useState} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {useGSAP} from '@gsap/react';
import {projects,publicContact,txt,type Locale} from '@/data/portfolio';
import {SceneVisual} from '@/components/SceneVisual';

gsap.registerPlugin(ScrollTrigger,useGSAP);
function SSMark({className=''}:{className?:string}){return <svg className={'ss-mark '+className} viewBox="0 0 120 120" fill="none" aria-label="SS brand monogram" role="img"><defs><linearGradient id="ss-gold" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse"><stop stopColor="#FFF1B9"/><stop offset=".45" stopColor="#BA8749"/><stop offset="1" stopColor="#E8C382"/></linearGradient></defs><path d="M90 20H49c-24 0-32 30-9 39l33 13c18 7 7 27-10 27H23" stroke="url(#ss-gold)" strokeWidth="11" strokeLinecap="square"/><path d="M97 40H60c-18 0-29 23-8 32l20 8c16 8 4 22-15 22H28" stroke="url(#ss-gold)" strokeWidth="6" strokeLinecap="square"/></svg>}
const detailNames=[['PROBLEM','مسئله'],['ARCHITECTURE','معماری'],['CAPABILITIES','قابلیت‌ها'],['OUTCOME','وضعیت و شواهد']] as const;
function ProjectJourney({project,lang}:{project:(typeof projects)[number],lang:Locale}){
 const scrollRef=useRef<HTMLDivElement>(null);
 const [position,setPosition]=useState(0);
 const [touchX,setTouchX]=useState<number|null>(null);
 const step=(direction:number)=>{const node=scrollRef.current;if(node){node.scrollBy({left:direction*node.clientWidth*.86,behavior:'smooth'});}};
 const cards=[
 {number:'01',label:lang==='fa'?'مسئله':'THE CHALLENGE',body:txt(lang,project.problem)},
 {number:'02',label:lang==='fa'?'تصمیم معماری':'SYSTEM ARCHITECTURE',body:txt(lang,project.solution)},
 {number:'03',label:lang==='fa'?'قابلیت‌های کلیدی':'CAPABILITIES',body:project.architecture.map(x=>txt(lang,x)).join(' • ')},
 {number:'04',label:lang==='fa'?'شواهد و وضعیت':'DOCUMENTED STATUS',body:txt(lang,project.outcome)}
 ];
 return <section id={'project-'+project.id} className={'motion-chapter chapter-'+project.id} aria-label={project.brand+' case study'}>
 <div className="motion-chapter-inner"><div className="motion-copy"><p className="motion-label">{project.index} / 04 <span>{txt(lang,project.kicker)}</span></p><h2>{project.brand}</h2><h3>{txt(lang,project.title)}</h3><p>{txt(lang,project.intro)}</p><div className="motion-tags">{project.features.slice(0,3).map((x,i)=><span key={i}>{txt(lang,x)}</span>)}</div><div className="motion-instruction"><span>↔</span>{lang==='fa'?'برای دیدن کیس‌استادی به چپ و راست حرکت کنید':'SCROLL SIDEWAYS TO EXPLORE THE CASE STUDY'}</div></div>
 <div className="motion-visual"><SceneVisual id={project.id}/></div></div>
 <div className="motion-drawer"><div className="motion-track" ref={scrollRef} tabIndex={0} aria-label={project.brand+' horizontal case study'} onScroll={e=>{const el=e.currentTarget;setPosition(el.scrollWidth===el.clientWidth?0:Math.round(100*el.scrollLeft/(el.scrollWidth-el.clientWidth)));}}
 onWheel={e=>{if(Math.abs(e.deltaX)>Math.abs(e.deltaY)){e.currentTarget.scrollLeft+=e.deltaX;}}}
 onTouchStart={e=>setTouchX(e.touches[0].clientX)} onTouchEnd={()=>setTouchX(null)}
 onKeyDown={e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();step(e.key==='ArrowRight'?1:-1);}}}>
 <article className="motion-frame motion-cover"><div><small>THE PROJECT / {project.index}</small><h4>{txt(lang,project.tagline)}</h4><p>{txt(lang,project.intro)}</p></div><div className="motion-miniart"><SceneVisual id={project.id} compact/></div></article>
 {cards.map(x=><article className="motion-frame motion-detail" key={x.number}><span className="motion-frame-number">{x.number} / 04</span><div><small>{x.label}</small><h4>{x.label}</h4><p>{x.body}</p></div></article>)}
 </div><div className="motion-progress"><button onClick={()=>step(-1)} aria-label="Previous case study frame">←</button><div className="motion-progress-track"><span style={{width:Math.max(4,position)+'%'}}/></div><button onClick={()=>step(1)} aria-label="Next case study frame">→</button><span>{Math.min(5,Math.round(position/25)+1)} / 05</span></div></div>
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
 useEffect(()=>{let cancelled=false;let completed=false;const started=performance.now();const images=Array.from(document.querySelectorAll<HTMLImageElement>('img'));const ready=Promise.all([document.fonts.ready,...images.map(i=>i.complete?Promise.resolve():new Promise(r=>{i.addEventListener('load',r,{once:true});i.addEventListener('error',r,{once:true});}))]);const heartbeat=window.setInterval(()=>setProgress(p=>Math.min(91,p+6)),95);
 const close=()=>{if(cancelled||completed)return;completed=true;window.clearInterval(heartbeat);setProgress(100);window.setTimeout(()=>{if(!cancelled)setLoading(false);},250)};
 ready.then(()=>{const remaining=Math.max(0,1200-(performance.now()-started));window.setTimeout(close,remaining);});const safety=window.setTimeout(close,4000);
 return()=>{cancelled=true;window.clearInterval(heartbeat);window.clearTimeout(safety);};},[]);
 useGSAP(()=>{const scope=root.current;if(!scope||loading)return;const mm=gsap.matchMedia();mm.add('(min-width: 960px) and (prefers-reduced-motion: no-preference)',()=>{const triggers=gsap.utils.toArray<HTMLElement>('.motion-chapter').map((el,i)=>ScrollTrigger.create({trigger:el,start:'top 50%',end:'bottom 50%',onEnter:()=>setActive(i),onEnterBack:()=>setActive(i)}));
 gsap.utils.toArray<HTMLElement>('.motion-visual').forEach(el=>gsap.fromTo(el,{y:50,scale:.96},{y:-30,scale:1.04,ease:'none',scrollTrigger:{trigger:el.closest('.motion-chapter')!,start:'top bottom',end:'bottom top',scrub:1}}));return()=>triggers.forEach(t=>t.kill());});
 return()=>mm.revert();},{scope:root,dependencies:[loading]});
 const changeLang=()=>{const next=lang==='en'?'fa':'en';setLang(next);const url=new URL(window.location.href);url.searchParams.set('lang',next);window.history.replaceState(null,'',url.pathname+url.search+url.hash);};
 return <div className="motion-site" ref={root} data-language={lang}>
 {loading&&<div className="ss-preloader" role="status" aria-live="polite"><div className="ss-preloader-top"><span>LOADING EXPERIENCE</span><span>{String(progress).padStart(2,'0')} / 100</span></div><SSMark className="ss-loading-logo"/><div className="ss-loading-copy"><span>FROM SYSTEMS TO IMPACT</span><small>{lang==='fa'?'طراحی سیستم‌هایی که ماندگارند':'DESIGNING DIGITAL SYSTEMS THAT ENDURE'}</small></div><div className="ss-loading-bar"><span style={{width:progress+'%'}}/></div></div>}
 <header className="motion-nav"><a href="#top" aria-label="Home"><SSMark/><strong>SAEID<br/>SHAMSAEI</strong></a><span>ARCHITECT / BUILD / EVOLVE</span><button type="button" onClick={changeLang}>{lang==='fa'?'EN':'FA'} ↗</button></header>
 <main>
 <section className="motion-hero" id="top"><div className="motion-hero-copy"><span>SOFTWARE ARCHITECT / PRODUCT ENGINEER</span><h1>SAEID<br/><em>SHAMSAEI.</em></h1><p>{lang==='fa'?'مهندسی محصول‌های دیجیتال و سیستم‌های پیچیده، با تمرکز بر تجربه و پایداری.':'Designing digital systems that make complex ideas feel remarkably simple.'}</p><small>SCROLL ↓ / SELECTED PROJECTS</small></div><div className="motion-portrait" aria-label="Portrait placement pending an owner-supplied verified personal photograph"><div className="portrait-placeholder"><SSMark/><span>PORTRAIT / OWNER PHOTO PENDING</span></div></div></section>
 <section className="motion-section-divider"><span>SELECTED PROJECTS</span><span>FOUR JOURNEYS. ONE PHILOSOPHY.</span></section>
 {projects.map(p=><ProjectJourney key={p.id} project={p} lang={lang}/>)}
 <section className="motion-end" id="contact"><span>IDEAS / SYSTEMS / PEOPLE / IMPACT</span><h2>{lang==='fa'?'بیایید آینده را بسازیم.':"LET'S BUILD\nWHAT'S NEXT."}</h2><p>{lang==='fa'?'برای همکاری و گفتگو از ایمیل استفاده کنید.':'Ambitious product? Interesting challenge? Start a conversation.'}</p><a href={'mailto:'+publicContact.email}>{publicContact.email} ↗</a><div className="motion-social"><a href={publicContact.github} target="_blank" rel="noreferrer">GITHUB ↗</a><a href={publicContact.linkedin} target="_blank" rel="noreferrer">LINKEDIN ↗</a></div></section>
 </main><footer className="motion-footer"><SSMark/><span>© 2026 SAEID SHAMSAEI</span><span>DESIGNING DIGITAL SYSTEMS THAT ENDURE.</span></footer>
 </div>;
}