'use client';
import {useEffect,useRef,useState} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {useGSAP} from '@gsap/react';
import {projects,publicContact,txt,type Locale} from '@/data/portfolio';
import {ResponsivePicture,ProjectArtwork} from '@/components/ResponsiveMedia';

gsap.registerPlugin(ScrollTrigger,useGSAP);
function SSMark({className=''}:{className?:string}){return <ResponsivePicture id="logo" className={'ss-mark '+className} fallback="/assets/ss-gold.webp" alt="SS — Saeid Shamsaei" width={128} height={128} sizes="(max-width: 520px) 96px, 128px" loading="eager"/>}
function ProjectJourney({project,lang}:{project:(typeof projects)[number],lang:Locale}){
 const scrollRef=useRef<HTMLDivElement>(null);
 const [position,setPosition]=useState(0);
 const chapterRef=useRef<HTMLElement>(null);
 const pinned=useRef<ScrollTrigger|null>(null);
 const dragging=useRef<{x:number;left:number}|null>(null);
 useGSAP(()=>{
  const mm=gsap.matchMedia();
  mm.add('(min-width: 961px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)',()=>{
   const section=chapterRef.current,track=scrollRef.current;
   if(!section||!track)return;
   let previous=-1;
   const trigger=ScrollTrigger.create({
    trigger:section,start:'top top',
    end:()=>'+='+Math.max(750,Math.round((track.scrollWidth-track.clientWidth)*1.25)),
    pin:true,pinSpacing:true,scrub:1,invalidateOnRefresh:true,anticipatePin:1,
    onUpdate:self=>{
     const range=Math.max(0,track.scrollWidth-track.clientWidth);
     track.scrollLeft=range*self.progress;
     const next=Math.round(self.progress*100);
     if(next!==previous){previous=next;setPosition(next);}
    }
   });
   pinned.current=trigger;
   return()=>{pinned.current=null;trigger.kill();};
  });
  return()=>mm.revert();
 },{scope:chapterRef});
 const step=(direction:number)=>{
  const track=scrollRef.current;if(!track)return;
  const max=Math.max(0,track.scrollWidth-track.clientWidth);
  const target=Math.max(0,Math.min(max,track.scrollLeft+direction*track.clientWidth*.85));
  const trigger=pinned.current;
  if(trigger&&trigger.isActive&&max>0){
   window.scrollTo({top:trigger.start+(target/max)*(trigger.end-trigger.start),behavior:'smooth'});
  }else{track.scrollTo({left:target,behavior:'smooth'});}
 };
 const cards=[
 {number:'01',label:lang==='fa'?'مسئله':'THE CHALLENGE',body:txt(lang,project.problem)},
 {number:'02',label:lang==='fa'?'تصمیم معماری':'SYSTEM ARCHITECTURE',body:txt(lang,project.solution)},
 {number:'03',label:lang==='fa'?'قابلیت‌های کلیدی':'CAPABILITIES',body:project.architecture.map(x=>txt(lang,x)).join(' • ')},
 {number:'04',label:lang==='fa'?'شواهد و وضعیت':'DOCUMENTED STATUS',body:txt(lang,project.outcome)}
 ];
 return <section id={'project-'+project.id} ref={chapterRef} className={'motion-chapter chapter-'+project.id} aria-label={project.brand+' case study'}>
 <div className="motion-chapter-inner"><div className="motion-copy"><p className="motion-label">{project.index} / 04 <span>{txt(lang,project.kicker)}</span></p><h2>{project.brand}</h2><h3>{txt(lang,project.title)}</h3><p>{txt(lang,project.intro)}</p><div className="motion-tags">{project.features.slice(0,3).map((x,i)=><span key={i}>{txt(lang,x)}</span>)}</div><div className="motion-instruction"><span>↔</span>{lang==='fa'?'برای دیدن کیس‌استادی به چپ و راست حرکت کنید':'SCROLL SIDEWAYS TO EXPLORE THE CASE STUDY'}</div></div>
 <div className="motion-visual"><div className={'cinematic-project-art cinematic-'+project.id} role="img" aria-label={project.brand+' original concept visualization'}><span className="cinematic-art-number">{project.index}</span><ProjectArtwork id={project.id}/></div></div></div>
 <div className="motion-drawer"><div className="motion-track" ref={scrollRef} tabIndex={0} aria-label={project.brand+' horizontal case study'} onScroll={e=>{const el=e.currentTarget;setPosition(el.scrollWidth===el.clientWidth?0:Math.round(100*el.scrollLeft/(el.scrollWidth-el.clientWidth)));}}
 onWheel={e=>{if(pinned.current?.isActive)return;if(e.shiftKey&&e.deltaY){e.currentTarget.scrollLeft+=e.deltaY;}else if(Math.abs(e.deltaX)>Math.abs(e.deltaY)){e.currentTarget.scrollLeft+=e.deltaX;}}}
 onPointerDown={e=>{if(e.pointerType==='mouse'&&!pinned.current?.isActive){dragging.current={x:e.clientX,left:e.currentTarget.scrollLeft};e.currentTarget.setPointerCapture(e.pointerId);}}} onPointerMove={e=>{if(dragging.current){e.currentTarget.scrollLeft=dragging.current.left+(dragging.current.x-e.clientX);}}} onPointerUp={()=>{dragging.current=null;}} onPointerCancel={()=>{dragging.current=null;}}
 onKeyDown={e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();step(e.key==='ArrowRight'?1:-1);}}}>
 <article className="motion-frame motion-cover"><div><small>THE PROJECT / {project.index}</small><h4>{txt(lang,project.tagline)}</h4><p>{txt(lang,project.intro)}</p></div><div className={'motion-miniart cinematic-'+project.id}><ProjectArtwork id={project.id}/></div></article>
 {cards.map(x=><article className={'motion-frame motion-detail cinematic-'+project.id} key={x.number}><span className="motion-frame-number">{x.number} / 04</span><div><small>{x.label}</small><h4>{x.label}</h4><p>{x.body}</p></div></article>)}
 </div><div className="cinematic-thumbnails" aria-hidden="true">{['OVERVIEW','ARCHITECTURE','WORKFLOWS','EVIDENCE'].map((word,i)=><div className={'cinematic-thumbnail cinematic-'+project.id} key={word}><span>0{i+1}</span><strong>{word}</strong></div>)}</div><div className="motion-progress"><button onClick={()=>step(-1)} aria-label="Previous case study frame">←</button><div className="motion-progress-track"><span style={{width:Math.max(4,position)+'%'}}/></div><button onClick={()=>step(1)} aria-label="Next case study frame">→</button><span>{Math.min(5,Math.round(position/25)+1)} / 05</span></div></div>
 </section>;
}
export default function PortfolioExperience(){
 const root=useRef<HTMLDivElement>(null);
 const [lang,setLang]=useState<Locale>('en');
 const [loading,setLoading]=useState(true);
 const [progress,setProgress]=useState(5);
 useEffect(()=>{const url=new URL(window.location.href);setLang(url.searchParams.get('lang')==='fa'?'fa':'en');},[]);
 useEffect(()=>{document.documentElement.lang=lang;document.documentElement.dir=lang==='fa'?'rtl':'ltr';},[lang]);
 useEffect(()=>{let cancelled=false;let completed=false;const started=performance.now();const images=['/assets/portrait.webp','/assets/ss-gold.webp'].map(src=>new Promise<void>(resolve=>{const img=new Image();img.onload=()=>resolve();img.onerror=()=>resolve();img.src=src;if(img.complete)resolve();}));const ready=Promise.all([document.fonts.ready,...images]);const heartbeat=window.setInterval(()=>setProgress(p=>Math.min(91,p+6)),95);
 const close=()=>{if(cancelled||completed)return;completed=true;window.clearInterval(heartbeat);setProgress(100);window.setTimeout(()=>{if(!cancelled)setLoading(false);},250)};
 ready.then(()=>{const remaining=Math.max(0,1200-(performance.now()-started));window.setTimeout(close,remaining);});const safety=window.setTimeout(close,6000);
 return()=>{cancelled=true;window.clearInterval(heartbeat);window.clearTimeout(safety);};},[]);
 useGSAP(()=>{if(!loading)ScrollTrigger.refresh();},{scope:root,dependencies:[loading,lang]});
 const changeLang=()=>{const next=lang==='en'?'fa':'en';setLang(next);const url=new URL(window.location.href);url.searchParams.set('lang',next);window.history.replaceState(null,'',url.pathname+url.search+url.hash);};
 return <div className="motion-site" ref={root} data-language={lang}>
 {loading&&<div className="ss-preloader" role="status" aria-live="polite"><div className="ss-preloader-top"><span>LOADING EXPERIENCE</span><span>{String(progress).padStart(2,'0')} / 100</span></div><SSMark className="ss-loading-logo"/><div className="ss-loading-orbits" aria-hidden="true"></div><div className="ss-loading-copy"><span>FROM SYSTEMS TO IMPACT</span><small>{lang==='fa'?'طراحی سیستم‌هایی که ماندگارند':'DESIGNING DIGITAL SYSTEMS THAT ENDURE'}</small></div><div className="ss-loading-bar"><span style={{width:progress+'%'}}/></div></div>}
 <a className="skip-link" href="#selected-projects">{lang==='fa'?'رفتن به پروژه‌ها':'Skip to selected projects'}</a>
 <header className="motion-nav"><a href="#top" aria-label="Home"><SSMark/><strong>SAEID<br/>SHAMSAEI</strong></a><nav className="cinematic-header-links" aria-label="Site sections"><a href="#selected-projects">{lang==='fa'?'پروژه‌ها':'WORK'}</a><a href="#about">{lang==='fa'?'درباره من':'ABOUT'}</a><a href="#approach">{lang==='fa'?'رویکرد':'APPROACH'}</a><a href="#contact">{lang==='fa'?'تماس':'CONTACT'}</a></nav><button type="button" onClick={changeLang}>{lang==='fa'?'EN':'FA'} ↗</button></header>
 <main>
 <section className="motion-hero" id="top"><div className="motion-hero-copy"><span>SOFTWARE ARCHITECT / PRODUCT ENGINEER</span><h1>SAEID<br/><em>SHAMSAEI.</em></h1><p>{lang==='fa'?'مهندسی محصول‌های دیجیتال و سیستم‌های پیچیده، با تمرکز بر تجربه و پایداری.':'Designing digital systems that make complex ideas feel remarkably simple.'}</p><div className="cinematic-hero-keywords"><span>ARCHITECT</span><i/> <span>BUILD</span><i/> <span>SOLVE</span><i/> <span>SCALE</span></div><small>SCROLL ↓ / SELECTED PROJECTS</small></div><div className="motion-portrait"><ResponsivePicture id="portrait" className="cinematic-portrait-image" fallback="/assets/portrait.webp" alt="Saeid Shamsaei, owner-provided personal portrait" width={325} height={285} sizes="(max-width: 960px) 100vw, 54vw" loading="eager" fetchPriority="high"/><span className="cinematic-halo"/><div className="cinematic-sidewords"><span>SYSTEMS</span><span>IDEAS</span><span>PEOPLE</span><span>IMPACT</span></div><div className="cinematic-portrait-mark"><SSMark/></div></div></section>
 <section className="motion-section-divider" id="selected-projects"><span>✦ &nbsp; {lang==='fa'?'پروژه‌های منتخب':'SELECTED PROJECTS'}</span><span>FOUR JOURNEYS. ONE PHILOSOPHY.</span></section>
 {projects.map(p=><ProjectJourney key={p.id} project={p} lang={lang}/>)}
 <section className="motion-about" id="about"><div className="motion-editorial-number">01 / {lang==='fa'?'درباره من':'ABOUT THE PRACTICE'}</div><div className="motion-editorial-copy"><h2>{lang==='fa'?'از ایده تا سیستم‌های ماندگار.':'COMPLEX IDEAS.\\nENDURING SYSTEMS.'}</h2><p>{lang==='fa'?'من سعید شمسایی هستم، معمار نرم‌افزار و توسعه‌دهنده محصول. از معماری پلتفرم‌های سازمانی تا طراحی سیستم‌های مبتنی بر هوش مصنوعی و محصولات تخصصی، مسئله را به تجربه‌ای یکپارچه تبدیل می‌کنم.':'I’m Saeid Shamsaei, a software architect and product engineer connecting enterprise platforms, AI-enabled workflows and thoughtful interfaces into coherent products.'}</p></div></section>
 <section className="motion-approach" id="approach"><div className="motion-editorial-number">02 / {lang==='fa'?'رویکرد من':'MY APPROACH'}</div><div className="motion-principles">{[{n:'01',fa:'مسئله قبل از ابزار',en:'PROBLEM BEFORE TOOLING'},{n:'02',fa:'معماری قابل رشد',en:'ARCHITECTURE FOR CHANGE'},{n:'03',fa:'تجربه بدون اصطکاک',en:'EXPERIENCE WITHOUT FRICTION'},{n:'04',fa:'کیفیت قابل سنجش',en:'VERIFIABLE QUALITY'}].map(item=><div key={item.n}><span>{item.n}</span><strong>{lang==='fa'?item.fa:item.en}</strong><span aria-hidden="true">↗</span></div>)}</div></section>
 <section className="motion-end" id="contact"><span>IDEAS / SYSTEMS / PEOPLE / IMPACT</span><h2>{lang==='fa'?'بیایید آینده را بسازیم.':"LET'S BUILD\nWHAT'S NEXT."}</h2><div className="cinematic-end-logo" aria-hidden="true"><span className="cinematic-end-wordmark">SS</span></div><p>{lang==='fa'?'برای همکاری و گفتگو از ایمیل استفاده کنید.':'Ambitious product? Interesting challenge? Start a conversation.'}</p><a href={'mailto:'+publicContact.email}>{publicContact.email} ↗</a><div className="motion-social"><a href={publicContact.github} target="_blank" rel="noreferrer">GITHUB ↗</a><a href={publicContact.linkedin} target="_blank" rel="noreferrer">LINKEDIN ↗</a></div></section>
 </main><footer className="motion-footer"><SSMark/><span>© 2026 SAEID SHAMSAEI</span><span>DESIGNING DIGITAL SYSTEMS THAT ENDURE.</span></footer>
 </div>;
}