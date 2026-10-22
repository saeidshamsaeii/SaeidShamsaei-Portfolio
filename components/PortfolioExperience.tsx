'use client';
import {useCallback,useEffect,useRef,useState} from 'react';
import Link from 'next/link';
import {ScrollHero} from '@/components/ScrollHero';
import {GuidedTour} from '@/components/GuidedTour';

import {projects,publicContact,publicBiography,type Project} from '@/data/portfolio';

const themes:{[key in Project['id']]:{sector:string;accent:string;tagline:string}}={
 gartal:{sector:'ENTERPRISE PLATFORM',accent:'gold',tagline:'One foundation. Multiple businesses.'},
 factory:{sector:'AI ENGINEERING',accent:'blue',tagline:'From repository to governed delivery.'},
 digirezhim:{sector:'HEALTHTECH',accent:'mint',tagline:'Physician knowledge. Structured decisions.'},
 petiwoo:{sector:'VERTICAL COMMERCE',accent:'peach',tagline:'Thoughtful technology for pet care.'}
};

function Brand({footer=false}:{footer?:boolean}){
 return <Link className={'sx-brand'+(footer?' sx-brand--footer':'')} href="/" aria-label="Saeid Shamsaei — home">
  <img src="/assets/hires/logo.webp" width={44} height={44} alt="" decoding="async"/>
  <span>SAEID <strong>SHAMSAEI</strong>{footer&&<small>Product architecture & engineering</small>}</span>
 </Link>;
}

const phases=['REVEAL','CHALLENGE','ARCHITECTURE','EXPERIENCE','NEXT'];
function ProjectChapter({project,index}:{project:Project;index:number}){
 const sectionRef=useRef<HTMLElement>(null);
 const stickyRef=useRef<HTMLDivElement>(null);
 const railRef=useRef<HTMLDivElement>(null);
 const [active,setActive]=useState(0);
 const state=useRef({start:0,distance:1,width:1,reduced:false});
 const touch=useRef<{x:number;y:number}|null>(null);
 const [autoPlaying,setAutoPlaying]=useState(false);
 const stopAuto=useRef<()=>void>(()=>{});
 const meta=themes[project.id];
 const count=phases.length;

 useEffect(()=>{
  const section=sectionRef.current,sticky=stickyRef.current,rail=railRef.current;
  if(!section||!sticky||!rail)return;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  let handle=0;
  let snapTimer:number|undefined;
  let startTimer:number|undefined;
  let autoFrame=0;
  let running=false;
  let played=false;
  let touchStartY:number|null=null;
  const cancelAuto=()=>{window.clearTimeout(startTimer);if(autoFrame)cancelAnimationFrame(autoFrame);autoFrame=0;running=false;setAutoPlaying(false);};
  stopAuto.current=cancelAuto;
  const measure=()=>{
   state.current.reduced=reduced.matches;
   if(reduced.matches){section.style.height='auto';return;}
   const width=Math.max(1,rail.scrollWidth-rail.clientWidth);
   const distance=Math.max(820,Math.round(width*(window.innerWidth<768?.94:.7)),Math.round((count-1)*window.innerHeight*(window.innerWidth<768?.56:.48)));
   state.current={start:0,distance,width,reduced:false};
   section.style.height=(sticky.getBoundingClientRect().height+distance)+'px';
   state.current.start=section.getBoundingClientRect().top+window.scrollY;
   move();
  };
  const move=()=>{
   if(state.current.reduced)return;
   const {start,distance,width}=state.current;
   const fraction=Math.max(0,Math.min(1,(window.scrollY-start)/distance));
   rail.scrollLeft=fraction*width;
   setActive(current=>{const n=Math.min(count-1,Math.round(fraction*(count-1)));return n===current?current:n;});
  };
  const onScroll=()=>{
   if(!state.current.reduced&&!running){
    // A paused wheel / vertical touch gesture settles on one complete case
    // frame. Never snap outside the active chapter or past its boundaries.
    window.clearTimeout(snapTimer);
    const {start,distance}=state.current;
    if(window.scrollY>start+4&&window.scrollY<start+distance-4){
     snapTimer=window.setTimeout(()=>{
      if(state.current.reduced)return;
      const ratio=(window.scrollY-state.current.start)/state.current.distance;
      if(ratio<=0||ratio>=1)return;
      const nearest=Math.round(ratio*(count-1))/(count-1);
      if(Math.abs(ratio-nearest)>.038){
       window.scrollTo({top:state.current.start+nearest*state.current.distance,behavior:'smooth'});
      }
     },260);
    }
   }
   if(handle)return;
   handle=requestAnimationFrame(()=>{handle=0;move();});
  };
  const requestAuto=(direction:number)=>{
   if(direction<=0||running||played||reduced.matches||document.documentElement.dataset.portfolioTour==='running')return;
   const rect=section.getBoundingClientRect();
   if(rect.top>window.innerHeight*.65||rect.bottom<window.innerHeight*.72)return;
   window.clearTimeout(startTimer);
   startTimer=window.setTimeout(()=>{
    const {start,distance}=state.current;
    const progress=(window.scrollY-start)/distance;
    if(progress<0||progress>.85||running||played||reduced.matches||document.documentElement.dataset.portfolioTour==='running')return;
    played=true;running=true;setAutoPlaying(true);window.clearTimeout(snapTimer);
    const beginning=window.scrollY,target=start+distance;
    const duration=clampDuration((1-progress)*11500);
    let startTime=0;
    const tick=(ts:number)=>{
     if(!running)return;
     if(!startTime)startTime=ts;
     const x=Math.min(1,(ts-startTime)/duration);
     const ease=x<.5?2*x*x:1-Math.pow(-2*x+2,2)/2;
     window.scrollTo({top:beginning+(target-beginning)*ease,behavior:'instant'});
     if(x<1)autoFrame=requestAnimationFrame(tick);
     else{
      running=false;setAutoPlaying(false);autoFrame=0;
      // Handoff without another wheel gesture; the next chapter remains
      // native-scroll controlled until the visitor chooses to engage.
      window.scrollTo({top:target+Math.min(240,window.innerHeight*.23),behavior:'smooth'});
     }
    };
    autoFrame=requestAnimationFrame(tick);
   },260);
  };
  const wheel=(event:WheelEvent)=>{if(running){cancelAuto();return;}requestAuto(event.deltaY);};
  const touchStart=(event:TouchEvent)=>{
   touchStartY=event.touches[0]?.clientY??null;
   if(running)cancelAuto();
  };
  const touchEnd=(event:TouchEvent)=>{
   const endY=event.changedTouches[0]?.clientY;
   const intendedDownwardScroll=touchStartY!==null&&endY!==undefined&&touchStartY-endY>35;
   touchStartY=null;
   if(running){cancelAuto();return;}
   if(intendedDownwardScroll)requestAuto(1);
  };
  const interrupt=(event:KeyboardEvent)=>{
   if(running&&['Escape','ArrowUp','ArrowDown','PageUp','PageDown',' '].includes(event.key))cancelAuto();
  };
  window.addEventListener('wheel',wheel,{passive:true});
  window.addEventListener('touchstart',touchStart,{passive:true});
  window.addEventListener('touchend',touchEnd,{passive:true});
  window.addEventListener('keydown',interrupt);
  function clampDuration(v:number){return Math.max(2600,Math.min(11500,v));}

  const onResize=()=>{if(handle)cancelAnimationFrame(handle);handle=requestAnimationFrame(()=>{handle=0;measure();});};
  const observer=new ResizeObserver(onResize);observer.observe(sticky);
  window.addEventListener('scroll',onScroll,{passive:true});
  window.addEventListener('resize',onResize);
  const mq=()=>onResize();reduced.addEventListener('change',mq);
  const ready=document.fonts.ready.then(()=>{if(section.isConnected)measure();});
  measure();
  return()=>{void ready;cancelAuto();window.removeEventListener('wheel',wheel);window.removeEventListener('touchstart',touchStart);window.removeEventListener('touchend',touchEnd);window.removeEventListener('keydown',interrupt);observer.disconnect();window.removeEventListener('scroll',onScroll);window.removeEventListener('resize',onResize);reduced.removeEventListener('change',mq);if(handle)cancelAnimationFrame(handle);window.clearTimeout(snapTimer);section.style.height='';};
 },[count]);

 const goTo=useCallback((n:number)=>{
  stopAuto.current();
  const rail=railRef.current;
  if(!rail)return;
  const bounded=Math.max(0,Math.min(count-1,n));
  if(state.current.reduced){rail.scrollTo({left:bounded*rail.clientWidth,behavior:'smooth'});setActive(bounded);return;}
  const {start,distance}=state.current;
  window.scrollTo({top:start+distance*(bounded/(count-1)),behavior:'smooth'});
 },[count]);
 const nextProject=projects[index+1];
 return <section className={'sx-chapter sx-theme-'+meta.accent} id={'project-'+project.id} ref={sectionRef}
  aria-label={project.brand+' scroll-driven case study'} data-active-slide={String(active)} data-auto-playing={autoPlaying?'true':'false'}>
  <div className="sx-chapter-sticky" ref={stickyRef}>
   <div className="sx-chapter-top">
    <div><span className="sx-chapter-index">{project.index} / 04</span><span className="sx-chapter-name">{project.brand}</span><span className="sx-chapter-category">{meta.sector}</span></div>
    <div className="sx-chapter-progress" aria-label={String(active+1)+' of '+count+' case study slides'}>
     <span>{String(active+1).padStart(2,'0')} / 0{count}</span>
     <div className="sx-progress-bar"><i style={{width:((active+1)/count*100)+'%'}}/></div>
    </div>
   </div>
   <div className="sx-viewport">
    <div className="sx-story-rail" ref={railRef}
     onTouchStart={e=>{touch.current={x:e.touches[0].clientX,y:e.touches[0].clientY};}}
     onTouchEnd={e=>{const start=touch.current;touch.current=null;if(!start)return;
      const dx=e.changedTouches[0].clientX-start.x,dy=e.changedTouches[0].clientY-start.y;
      if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.2)goTo(active+(dx<0?1:-1));
     }}
     aria-label={project.brand+' horizontal case study frames'} tabIndex={0}
     onKeyDown={e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();goTo(active+(e.key==='ArrowRight'?1:-1));}}}>
     <article className="sx-slide sx-slide--overview" aria-label="Project overview">
      <div className="sx-slide-copy">
       <p className="sx-kicker">{project.index} / {meta.sector}</p>
       <h2>{project.id==='factory'?<>AI <em>Factory</em></>:project.brand}</h2>
       <h3>{meta.tagline}</h3>
       <p>{project.intro.en}</p>
       <Link className="sx-action" href={'/work/'+project.id+'/'}>Open the full case study <span aria-hidden="true">↗</span></Link>
      </div>
      <div className="sx-slide-art sx-v4-project-art">
       <img src={'/assets/hires/project-'+project.id+'.webp'} width={1448} height={1086} loading="eager" decoding="sync" fetchPriority={index===0?'high':'auto'} alt={project.brand+' concept visualization of the software product'}/>
       <span className="sx-v4-art-label">CONCEPT VISUALIZATION — NOT A LIVE SCREENSHOT</span>
      </div>
     </article>
     <article className="sx-slide sx-slide--detail" aria-label="The challenge">
      <div className="sx-slide-narrative"><p className="sx-kicker">01 / THE CHALLENGE</p>
       <h2>The <em>challenge.</em></h2><p>{project.problem.en}</p>
       <div className="sx-slide-footnote">DESIGNING A BETTER FOUNDATION</div>
      </div>
      <div className="sx-ed7-image-detail">
       <img src={'/assets/hires/project-'+project.id+'.webp'} width={1448} height={1086} loading="lazy" decoding="async" alt={project.brand+' illustrated product concept detail'}/>
       <small>DETAIL OF CONCEPT VISUALIZATION — NOT A LIVE SCREENSHOT</small>
      </div>
     </article>
     <article className="sx-slide sx-slide--detail" aria-label="System architecture">
      <div className="sx-slide-narrative"><p className="sx-kicker">02 / SYSTEM ARCHITECTURE</p>
       <h2>Designed to <em>evolve.</em></h2><p>{project.solution.en}</p>
       <Link className="sx-text-link" href={'/work/'+project.id+'/'}>Read the architecture breakdown ↗</Link>
      </div>
      <div className="sx-diagram sx-diagram--architecture"><span className="sx-diagram-title">ARCHITECTURE MAP</span>
       <div className="sx-architecture-list">{project.architecture.slice(0,3).map((item,i)=>
        <div key={item.en}><span>{String(i+1).padStart(2,'0')}</span><strong>{item.en}</strong></div>)}</div>
      </div>
     </article>
     <article className="sx-slide sx-slide--detail" aria-label="Capabilities">
      <div className="sx-slide-narrative"><p className="sx-kicker">03 / CAPABILITIES</p>
       <h2>Built with <em>purpose.</em></h2>
       <p>Three areas of focus from the documented product scope.</p>
      </div>
      <div className="sx-diagram sx-diagram--capabilities"><span className="sx-diagram-title">EXPERIENCE / WORKFLOWS</span>
       <div className="sx-capability-list">{project.features.slice(0,3).map((item,i)=><div key={item.en}><span>0{i+1}</span><strong>{item.en}</strong><i aria-hidden="true">↗</i></div>)}</div>
      </div>
     </article>
     <article className="sx-slide sx-slide--detail sx-slide--end" aria-label="Documented evidence and next project">
      <div className="sx-slide-narrative"><p className="sx-kicker">04 / DOCUMENTED STATUS</p>
       <h2>Beyond the <em>concept.</em></h2><p>{project.outcome.en}</p>
       <small className="sx-evidence-note">Project images are conceptual visualizations, not verified live screenshots or operating metrics.</small>
       <Link className="sx-action" href={'/work/'+project.id+'/'}>Explore full case study ↗</Link>
      </div>
      <div className="sx-diagram sx-diagram--next">
       <span className="sx-diagram-title">UP NEXT</span>
       <strong>{nextProject?nextProject.brand:'LET’S BUILD TOGETHER'}</strong>
       <p>{nextProject?'Keep scrolling down to enter the next project.':'Continue down to contact.'}</p>
       <a href={nextProject?'#project-'+nextProject.id:'#contact'}>Continue ↓</a>
      </div>
     </article>
    </div>
   </div>
   <div className="sx-chapter-bottom">
    <div className="sx-slide-dots" aria-label={project.brand+' case study navigation'}>
     {phases.map((phase,i)=><button key={phase} type="button" className={i===active?'is-active':''}
      aria-label={'Show '+phase.toLowerCase()} aria-current={i===active?'step':undefined} onClick={()=>goTo(i)}><span/></button>)}
    </div>
    <span className="sx-scroll-hint">{autoPlaying?'AUTO STORY PLAYING · SCROLL TO CONTROL':active===count-1?'NEXT PROJECT ↓':'SCROLL TO EXPLORE →'}</span>
    <div className="sx-chapter-buttons"><button type="button" onClick={()=>goTo(active-1)} disabled={active===0} aria-label={'Previous '+project.brand+' slide'}>←</button>
    <button type="button" onClick={()=>goTo(active+1)} disabled={active===count-1} aria-label={'Next '+project.brand+' slide'}>→</button></div>
   </div>
  </div>
 </section>;
}

export default function PortfolioExperience(){
 const [tour,setTour]=useState(false);
 useEffect(()=>{
  const sections=Array.from(document.querySelectorAll('#about,#contact'));
  if(!sections.length||!('IntersectionObserver' in window))return;
  const io=new IntersectionObserver(entries=>entries.forEach(entry=>{
   entry.target.classList.toggle('sx-in-view',entry.isIntersecting);
   if(entry.isIntersecting)entry.target.classList.add('sx-v4-seen');
  }),{threshold:.08,rootMargin:'0px 0px -3% 0px'});
  sections.forEach(element=>io.observe(element));
  return()=>io.disconnect();
 },[]);
 return <div className="sx-site">
  <GuidedTour active={tour} onExit={()=>setTour(false)}/>
  <a className="skip-link" href="#selected-projects">Skip to projects</a>
  <header className="sx-header">
   <Brand/>
   <nav aria-label="Primary navigation"><a href="#top">Home</a><a href="#about">About</a><a href="#selected-projects">Projects</a><a href="#contact">Contact</a></nav>
   <div className="sx-header-actions"><button type="button" className="sx-tour-trigger" onClick={()=>setTour(true)} aria-label="Start guided site tour">▶ TOUR</button><a className="sx-header-cta" href={'mailto:'+publicContact.email}>Let’s Talk ↗</a></div>
  </header>
  <main>
   <ScrollHero/>

   <section className="sx-profile sx-editorial-frame sx-v8-about" id="about" aria-labelledby="sx-profile-title">
    <div className="sx-v8-about-inner">
     <div className="sx-v8-about-portrait">
      <img src="/assets/hires/portrait.webp" alt="Portrait of Saeid Shamsaei in a black suit and sunglasses" width={1122} height={1402} loading="eager" decoding="async"/>
      <div className="sx-v8-portrait-note"><span>SAEID SHAMSAEI</span><span>THE PERSON BEHIND THE WORK</span></div>
     </div>
     <div className="sx-v8-about-content">
      <p className="sx-kicker">02 / ABOUT ME</p>
      <h2 id="sx-profile-title">A LITTLE<br/><em>ABOUT ME.</em></h2>
      <p className="sx-v8-about-role">Software Architect &amp; Product Engineer</p>
      <p className="sx-v8-about-summary">I'm Saeid Shamsaei. I enjoy turning ambitious ideas into thoughtful software — combining system architecture, practical engineering and a strong sense of product experience.</p>
      <div className="sx-v8-fact-line" aria-label="Verified professional profile">
       <div><span>FOCUS</span><strong>Software Architecture · Product Engineering</strong></div>
       {publicBiography.ageYears!==null&&<div><span>AGE</span><strong>{publicBiography.ageYears}</strong></div>}
       {publicBiography.yearsOfExperience!==null&&<div><span>EXPERIENCE</span><strong>{publicBiography.yearsOfExperience}+ Years</strong></div>}
      </div>
      <div className="sx-v8-about-experience" aria-label="Experience areas">
       <p className="sx-v8-experience-kicker">EXPERIENCE &amp; INTERESTS</p>
       <div><span>01</span><strong>Platform Architecture</strong><small>Multi-tenant systems, reusable foundations and product infrastructure</small></div>
       <div><span>02</span><strong>Engineering &amp; Automation</strong><small>Developer workflows, quality gates and source-driven delivery</small></div>
       <div><span>03</span><strong>Digital Products</strong><small>Business platforms, commerce and clinical nutrition workflows</small></div>
      </div>
      <a href="#selected-projects" className="sx-v8-about-cta">EXPLORE SELECTED PROJECTS <span aria-hidden="true">↘</span></a>
     </div>
    </div>
   </section>

   <div className="sx-work-intro" id="selected-projects" aria-label="Selected projects">
    <span className="sx-kicker">SELECTED WORK / FOUR STORIES</span>
    <span className="sx-work-intro-hint">SCROLL DOWN · EXPLORE SIDEWAYS ↘</span>
   </div>
   {projects.map((project,index)=><ProjectChapter key={project.id} project={project} index={index}/>)}

   <section className="sx-contact sx-editorial-frame" id="contact" aria-labelledby="sx-contact-title">
    <p className="sx-kicker">04 / DIRECT CONTACT</p>
    <div className="sx-contact-layout">
     <div className="sx-contact-main">
      <h2 id="sx-contact-title">LET’S BUILD<br/><em>WHAT MATTERS.</em></h2>
      <p>Thoughtful products start with a good conversation.</p>
      <a href={'mailto:'+publicContact.email+'?subject=Project%20inquiry'} className="sx-action">Start a project <span aria-hidden="true">↗</span></a>
     </div>
     <div className="sx-contact-mark">
      <div className="sx-contact-symbol" aria-hidden="true"><img src="/assets/hires/logo.webp" alt="" width={1254} height={1254} decoding="async"/></div>
      <span className="sx-contact-mark-caption">ARCHITECTURE / ENGINEERING / EXPERIENCE</span>
     </div>
    </div>
    <div className="sx-contact-directory" aria-label="Ways to reach Saeid Shamsaei">
     <a className="sx-contact-link" href={'mailto:'+publicContact.email}>
      <span>01 / EMAIL</span><strong>{publicContact.email}</strong><span aria-hidden="true">↗</span>
     </a>
     <a className="sx-contact-link" href={publicContact.phoneHref}>
      <span>02 / PHONE</span><strong>{publicContact.phone}</strong><span aria-hidden="true">↗</span>
     </a>
     <a className="sx-contact-link" href={publicContact.linkedin} target="_blank" rel="noreferrer noopener">
      <span>03 / LINKEDIN</span><strong>Connect on LinkedIn</strong><span aria-hidden="true">↗</span>
     </a>
     <a className="sx-contact-link" href={publicContact.telegram} target="_blank" rel="noreferrer noopener">
      <span>04 / TELEGRAM</span><strong>{publicContact.telegramHandle}</strong><span aria-hidden="true">↗</span>
     </a>
    </div>
   </section>
  </main>
  <footer className="sx-footer"><Brand footer/><nav aria-label="Footer navigation"><a href="#top">Home</a><a href="#about">About</a><a href="#selected-projects">Projects</a><a href="#contact">Contact</a></nav>
   <div className="sx-footer-social"><a href={publicContact.github} rel="noreferrer noopener" target="_blank">GitHub ↗</a><a href={publicContact.linkedin} rel="noreferrer noopener" target="_blank">LinkedIn ↗</a><a href={publicContact.telegram} rel="noreferrer noopener" target="_blank">Telegram ↗</a><a href={'mailto:'+publicContact.email}>Email ↗</a></div></footer>
 </div>;
}
