'use client';
import {useEffect,useRef,useState} from 'react';

/**
 * First viewport is a portrait-led editorial cover. A short natural vertical
 * scroll changes the accompanying message without hijacking touch/wheel input.
 */
const beats=[
 {step:'01',word:'DESIGN',lead:'Design with purpose.',detail:'Clear interfaces and intentional decisions.'},
 {step:'02',word:'BUILD',lead:'Architect for change.',detail:'Products and systems with room to grow.'},
 {step:'03',word:'SHIP',lead:'Deliver with evidence.',detail:'Useful results and verifiable engineering.'}
] as const;
export function ScrollHero(){
 const host=useRef<HTMLElement>(null);
 const [active,setActive]=useState(0);
 useEffect(()=>{
  const root=host.current;
  if(!root)return;
  const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
  let raf=0;
  const measure=()=>{
   raf=0;
   if(motion.matches){root.style.setProperty('--sx-v3-progress','0');root.dataset.scene='0';setActive(0);return;}
   const rect=root.getBoundingClientRect();
   const progress=Math.max(0,Math.min(1,-rect.top/Math.max(1,rect.height-window.innerHeight)));
   const index=Math.min(2,Math.floor(progress*2.99));
   root.style.setProperty('--sx-v3-progress',progress.toFixed(4));
   root.dataset.scene=String(index);
   setActive(previous=>previous===index?previous:index);
  };
  const handler=()=>{if(!raf)raf=requestAnimationFrame(measure);};
  measure();
  window.addEventListener('scroll',handler,{passive:true});
  window.addEventListener('resize',handler);
  motion.addEventListener('change',handler);
  return()=>{window.removeEventListener('scroll',handler);window.removeEventListener('resize',handler);motion.removeEventListener('change',handler);if(raf)cancelAnimationFrame(raf);};
 },[]);
 return <section ref={host} className="sx-work-hero sx-v3-hero sx-v4-hero" id="top" aria-labelledby="sx-work-title" data-scene="0">
  <div className="sx-v3-hero-stage sx-v4-hero-stage">
   <div className="sx-v4-hero-content">
    <div className="sx-work-copy">
     <p className="sx-kicker">SAEID SHAMSAEI <span aria-hidden="true">/</span> SOFTWARE ENGINEER & PRODUCT BUILDER</p>
     <h1 id="sx-work-title">BEYOND<br/><em>THE INTERFACE.</em></h1>
     <p>I design software architecture and digital products that turn complex ideas into useful experiences.</p>
     <div className="sx-hero-actions sx-v5-hero-actions">
       <a href="#selected-projects" className="sx-action">Explore selected work <span aria-hidden="true">↘</span></a>
       <a href="#contact" className="sx-v5-secondary-cta">Start a conversation <span aria-hidden="true">↗</span></a>
      </div>
    </div>
    <div className="sx-hero-blueprint sx-v4-hero-beats" aria-label="Design, build and deliver: an animated scroll narrative">
     <div className="sx-blueprint-heading"><span>MY APPROACH</span><span>0{active+1} / 03</span></div>
     <div className="sx-blueprint-steps">
      {beats.map((beat,index)=><div key={beat.step} className={'sx-blueprint-step'+(active===index?' sx-is-current':'')} data-active={active===index?'true':'false'}>
       <span className="sx-blueprint-index">{beat.step}</span><div><strong>{beat.word}</strong><small>{active===index?beat.detail:beat.lead}</small></div>
       <span className="sx-blueprint-sign" aria-hidden="true">↗</span>
      </div>)}
     </div>
     <div className="sx-blueprint-base"><span>{beats[active].lead}</span><span className="sx-blueprint-progress" aria-hidden="true"><i/></span></div>
    </div>
   </div>
   <div className="sx-v4-hero-persona">
    <span className="sx-v5-portrait-halo" aria-hidden="true"/>
    <img src="/assets/hires/portrait-office.webp" width={900} height={1125} loading="eager" fetchPriority="high" decoding="async" alt="Saeid Shamsaei sitting in a modern development office with his hand touching his mustache"/>
    <span className="sx-v5-office-label" aria-hidden="true">THE PERSON BEHIND THE WORK <span>01 / 04</span></span>
   </div>
   <div className="sx-hero-bottom"><span>DESIGN · BUILD · EVOLVE</span><span>SCROLL TO EXPLORE ↓</span></div>
  </div>
 </section>;
}
