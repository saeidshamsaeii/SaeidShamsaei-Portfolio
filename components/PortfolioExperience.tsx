'use client';
import {useCallback,useEffect,useRef,useState} from 'react';
import Link from 'next/link';
import {projects,publicContact,type Project} from '@/data/portfolio';

const focuses=[
 {title:'Architecture',detail:'Systems that scale'},
 {title:'AI & Automation',detail:'Intelligence with intention'},
 {title:'Product Design',detail:'Useful, memorable experiences'},
 {title:'Craft & Quality',detail:'Details that make it work'}
];
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

const phases=['OVERVIEW','THE CHALLENGE','THE ARCHITECTURE','CAPABILITIES','EVIDENCE & NEXT'];
function ProjectChapter({project,index}:{project:Project;index:number}){
 const sectionRef=useRef<HTMLElement>(null);
 const stickyRef=useRef<HTMLDivElement>(null);
 const railRef=useRef<HTMLDivElement>(null);
 const [active,setActive]=useState(0);
 const state=useRef({start:0,distance:1,width:1,reduced:false});
 const touch=useRef<{x:number;y:number}|null>(null);
 const meta=themes[project.id];
 const count=phases.length;

 useEffect(()=>{
  const section=sectionRef.current,sticky=stickyRef.current,rail=railRef.current;
  if(!section||!sticky||!rail)return;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  let handle=0;
  let snapTimer:number|undefined;
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
   if(!state.current.reduced){
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
      if(Math.abs(ratio-nearest)>.015){
       window.scrollTo({top:state.current.start+nearest*state.current.distance,behavior:'smooth'});
      }
     },260);
    }
   }
   if(handle)return;
   handle=requestAnimationFrame(()=>{handle=0;move();});
  };
  const onResize=()=>{if(handle)cancelAnimationFrame(handle);handle=requestAnimationFrame(()=>{handle=0;measure();});};
  const observer=new ResizeObserver(onResize);observer.observe(sticky);
  window.addEventListener('scroll',onScroll,{passive:true});
  window.addEventListener('resize',onResize);
  const mq=()=>onResize();reduced.addEventListener('change',mq);
  const ready=document.fonts.ready.then(()=>{if(section.isConnected)measure();});
  measure();
  return()=>{void ready;observer.disconnect();window.removeEventListener('scroll',onScroll);window.removeEventListener('resize',onResize);reduced.removeEventListener('change',mq);if(handle)cancelAnimationFrame(handle);window.clearTimeout(snapTimer);section.style.height='';};
 },[count]);

 const goTo=useCallback((n:number)=>{
  const rail=railRef.current;
  if(!rail)return;
  const bounded=Math.max(0,Math.min(count-1,n));
  if(state.current.reduced){rail.scrollTo({left:bounded*rail.clientWidth,behavior:'smooth'});setActive(bounded);return;}
  const {start,distance}=state.current;
  window.scrollTo({top:start+distance*(bounded/(count-1)),behavior:'smooth'});
 },[count]);
 const nextProject=projects[index+1];
 return <section className={'sx-chapter sx-theme-'+meta.accent} id={'project-'+project.id} ref={sectionRef}
  aria-label={project.brand+' scroll-driven case study'} data-active-slide={String(active)}>
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
       <div className="sx-stack">{project.features.slice(0,3).map(f=><span key={f.en}>{f.en}</span>)}</div>
       <Link className="sx-action" href={'/work/'+project.id+'/'}>Open the full case study <span aria-hidden="true">↗</span></Link>
      </div>
      <div className="sx-slide-art"><img src={'/assets/hires/project-'+project.id+'.webp'} alt={project.brand+' illustrated product interface'} width={1448} height={1086} loading="eager" decoding="async"/></div>
     </article>
     <article className="sx-slide sx-slide--detail" aria-label="The challenge">
      <div className="sx-slide-narrative"><p className="sx-kicker">01 / THE CHALLENGE</p>
       <h2>The <em>challenge.</em></h2><p>{project.problem.en}</p>
       <div className="sx-slide-footnote">DESIGNING A BETTER FOUNDATION</div>
      </div>
      <div className="sx-diagram sx-diagram--challenge" aria-hidden="true">
       <div className="sx-diagram-orb"><span>?</span></div>
       <strong>COMPLEXITY → CLARITY</strong>
       <div className="sx-diagram-lines"><i/><i/><i/><i/></div>
       <small>DEFINE THE REAL PROBLEM</small>
      </div>
     </article>
     <article className="sx-slide sx-slide--detail" aria-label="System architecture">
      <div className="sx-slide-narrative"><p className="sx-kicker">02 / SYSTEM ARCHITECTURE</p>
       <h2>Designed to <em>evolve.</em></h2><p>{project.solution.en}</p>
       <Link className="sx-text-link" href={'/work/'+project.id+'/'}>Read the architecture breakdown ↗</Link>
      </div>
      <div className="sx-diagram sx-diagram--architecture"><span className="sx-diagram-title">ARCHITECTURE MAP</span>
       <div className="sx-architecture-list">{project.architecture.map((item,i)=>
        <div key={item.en}><span>{String(i+1).padStart(2,'0')}</span><strong>{item.en}</strong></div>)}</div>
      </div>
     </article>
     <article className="sx-slide sx-slide--detail" aria-label="Capabilities">
      <div className="sx-slide-narrative"><p className="sx-kicker">03 / CAPABILITIES</p>
       <h2>Built with <em>purpose.</em></h2>
       <p>Purpose-built capabilities shaped around the domain, with a focus on coherence, adaptability and user experience.</p>
      </div>
      <div className="sx-diagram sx-diagram--capabilities"><span className="sx-diagram-title">CORE CAPABILITIES</span>
       <div className="sx-capability-list">{project.features.map((item,i)=><div key={item.en}><span>0{i+1}</span><strong>{item.en}</strong><i aria-hidden="true">↗</i></div>)}</div>
      </div>
     </article>
     <article className="sx-slide sx-slide--detail sx-slide--end" aria-label="Documented evidence and next project">
      <div className="sx-slide-narrative"><p className="sx-kicker">04 / DOCUMENTED STATUS</p>
       <h2>Beyond the <em>concept.</em></h2><p>{project.outcome.en}</p>
       <small className="sx-evidence-note">Visualizations are conceptual; operating metrics are not asserted.</small>
       <Link className="sx-action" href={'/work/'+project.id+'/'}>Explore full case study ↗</Link>
      </div>
      <div className="sx-diagram sx-diagram--next">
       <span className="sx-diagram-title">UP NEXT</span>
       <strong>{nextProject?nextProject.brand:'LET’S BUILD TOGETHER'}</strong>
       <p>{nextProject?'Keep scrolling down to enter the next project.':'Continue down for the approach and contact details.'}</p>
       <a href={nextProject?'#project-'+nextProject.id:'#approach'}>Continue ↓</a>
      </div>
     </article>
    </div>
   </div>
   <div className="sx-chapter-bottom">
    <div className="sx-slide-dots" aria-label={project.brand+' case study navigation'}>
     {phases.map((phase,i)=><button key={phase} type="button" className={i===active?'is-active':''}
      aria-label={'Show '+phase.toLowerCase()} aria-current={i===active?'step':undefined} onClick={()=>goTo(i)}><span/></button>)}
    </div>
    <span className="sx-scroll-hint">{active===count-1?'SCROLL DOWN FOR THE NEXT PROJECT':'SCROLL DOWN → STORY MOVES SIDEWAYS'}</span>
    <div className="sx-chapter-buttons"><button type="button" onClick={()=>goTo(active-1)} disabled={active===0} aria-label={'Previous '+project.brand+' slide'}>←</button>
    <button type="button" onClick={()=>goTo(active+1)} disabled={active===count-1} aria-label={'Next '+project.brand+' slide'}>→</button></div>
   </div>
  </div>
 </section>;
}

export default function PortfolioExperience(){
 useEffect(()=>{
  // Small scroll-led perspective changes, no scripted video or heavyweight 3D.
  // Respect reduced-motion preference and keep content fully readable.
  const hero=document.querySelector<HTMLElement>('.sx-work-hero');
  const profile=document.querySelector<HTMLElement>('.sx-profile');
  if(!hero||!profile)return;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  let frame=0;
  const update=()=>{
   frame=0;
   if(reduced.matches){
    hero.style.setProperty('--sx-scroll','0');
    profile.style.setProperty('--sx-reveal','0.5');
    return;
   }
   const height=Math.max(1,window.innerHeight);
   const intro=Math.min(1,Math.max(0,-hero.getBoundingClientRect().top/height));
   const about=Math.min(1,Math.max(0,(height-profile.getBoundingClientRect().top)/(height+profile.offsetHeight)));
   hero.style.setProperty('--sx-scroll',intro.toFixed(3));
   profile.style.setProperty('--sx-reveal',about.toFixed(3));
  };
  const request=()=>{if(!frame)frame=requestAnimationFrame(update);};
  window.addEventListener('scroll',request,{passive:true});
  window.addEventListener('resize',request);
  reduced.addEventListener('change',request);
  update();
  return()=>{if(frame)cancelAnimationFrame(frame);window.removeEventListener('scroll',request);window.removeEventListener('resize',request);reduced.removeEventListener('change',request);};
 },[]);
 return <div className="sx-site">
  <a className="skip-link" href="#selected-projects">Skip to projects</a>
  <header className="sx-header">
   <Brand/>
   <nav aria-label="Primary navigation"><a href="#top">Home</a><a href="#about">About</a><a href="#selected-projects">Projects</a><a href="#approach">Approach</a><a href="#contact">Contact</a></nav>
   <a className="sx-header-cta" href={'mailto:'+publicContact.email}>Let’s Talk ↗</a>
  </header>
  <main>
   <section className="sx-work-hero sx-editorial-frame" id="top" aria-labelledby="sx-work-title">
    <div className="sx-work-art" aria-hidden="true"><span className="sx-art-coordinates">001—FRAME / FIELD NOTES</span></div>
    <div className="sx-work-copy">
     <p className="sx-kicker">SAEID SHAMSAEI <span className="sx-kicker-divider">/</span> PRODUCT & SOFTWARE ENGINEERING</p>
     <h1 id="sx-work-title">BEYOND<br/><em>THE</em><br/>INTERFACE<span className="sx-title-stop">.</span></h1>
     <p>I turn complex ideas into products that feel effortless.</p>
     <div className="sx-hero-actions"><a href="#about" className="sx-action">Discover the work <span aria-hidden="true">↘</span></a></div>
    </div>
    <div className="sx-hero-blueprint" role="img" aria-label="Design process: discovery, system architecture, and meaningful experience">
     <div className="sx-blueprint-heading"><span>DESIGN ENGINEERING</span><span>01 — 03</span></div>
     <div className="sx-blueprint-steps">
      <div className="sx-blueprint-step"><span className="sx-blueprint-index">01</span><div><strong>Understand.</strong><small>Ask the right questions</small></div><span aria-hidden="true" className="sx-blueprint-sign">↗</span></div>
      <div className="sx-blueprint-step"><span className="sx-blueprint-index">02</span><div><strong>Architect.</strong><small>Shape a clearer system</small></div><span aria-hidden="true" className="sx-blueprint-sign">↗</span></div>
      <div className="sx-blueprint-step"><span className="sx-blueprint-index">03</span><div><strong>Deliver.</strong><small>Make it work beautifully</small></div><span aria-hidden="true" className="sx-blueprint-sign">↗</span></div>
     </div>
     <div className="sx-blueprint-base"><span>THOUGHTFUL BY DESIGN</span><span className="sx-blueprint-progress" aria-hidden="true"><i/></span></div>
    </div>
    <div className="sx-hero-bottom"><span>INDEPENDENT ENGINEERING · SELECTED WORK</span><span>SCROLL TO EXPLORE ↓</span></div>
   </section>

   <section className="sx-profile sx-editorial-frame" id="about" aria-labelledby="sx-profile-title">
    <div className="sx-profile-inner">
     <div className="sx-profile-photo">
      <img src="/assets/hires/portrait.webp" alt="Saeid Shamsaei — personal portrait" width={1122} height={1402} decoding="async"/>
     </div>
     <div className="sx-profile-copy">
      <p className="sx-kicker">THE PERSON BEHIND THE WORK</p>
      <h2 id="sx-profile-title">SAEID<br/><em>SHAMSAEI.</em></h2>
      <p className="sx-profile-role">Software Architect · Product Engineer</p>
      <p className="sx-profile-intro">I turn complex ideas into clear, lasting digital experiences — combining product thinking with thoughtful engineering.</p>
      <p className="sx-profile-interests-title">WHAT DRIVES MY WORK</p>
      <div className="sx-focus-list">{focuses.map((focus,i)=><div key={focus.title}>
       <span>0{i+1}</span><div><strong>{focus.title}</strong><small>{focus.detail}</small></div>
      </div>)}</div>
      <div className="sx-profile-actions"><a href="#selected-projects" className="sx-action">Selected work ↘</a></div>
     </div>
    </div>
   </section>

   <div className="sx-work-intro" id="selected-projects" aria-label="Selected projects">
    <span className="sx-kicker">SELECTED WORK / FOUR STORIES</span>
    <span className="sx-work-intro-hint">SCROLL DOWN · EXPLORE SIDEWAYS ↘</span>
   </div>
   {projects.map((project,index)=><ProjectChapter key={project.id} project={project} index={index}/>)}

   <section className="sx-principles-section sx-editorial-frame" id="approach">
    <div><p className="sx-kicker">04 / HOW I WORK</p><h2>Build with<br/><em>intention.</em></h2></div>
    <div className="sx-principles">{['PROBLEM BEFORE TOOLING','ARCHITECTURE FOR CHANGE','EXPERIENCE WITHOUT FRICTION','VERIFIABLE QUALITY'].map((t,i)=><div key={t}><span>{String(i+1).padStart(2,'0')}</span><strong>{t}</strong><i aria-hidden="true">↗</i></div>)}</div>
   </section>
   <section className="sx-contact sx-editorial-frame" id="contact">
    <p className="sx-kicker">05 / LET’S BUILD TOGETHER</p>
    <div><div><h2>COMPLEX IDEAS.<br/><em>REAL IMPACT.</em></h2><p>Have an ambitious product or challenging system in mind? Let’s make it tangible.</p>
     <a href={'mailto:'+publicContact.email} className="sx-action">Start a conversation ↗</a></div>
     <div className="sx-contact-symbol" aria-hidden="true"><img src="/assets/hires/logo.webp" alt="" width={1254} height={1254} decoding="async"/></div></div>
   </section>
  </main>
  <footer className="sx-footer"><Brand footer/><nav aria-label="Footer navigation"><a href="#top">Home</a><a href="#about">About</a><a href="#selected-projects">Projects</a><a href="#contact">Contact</a></nav>
   <div><a href={publicContact.github} rel="noreferrer" target="_blank">GitHub ↗</a><a href={publicContact.linkedin} rel="noreferrer" target="_blank">LinkedIn ↗</a></div></footer>
 </div>;
}
