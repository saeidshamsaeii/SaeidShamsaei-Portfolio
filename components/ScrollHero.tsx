'use client';
import {useEffect,useRef,useState} from 'react';

const stages=[
 {step:'01',verb:'Understand.',detail:'Translate an ambitious idea into a clear problem worth solving.',note:'PROBLEM BEFORE TOOLING'},
 {step:'02',verb:'Architect.',detail:'Make the right boundaries, workflows and decisions visible.',note:'SYSTEMS BUILT TO EVOLVE'},
 {step:'03',verb:'Deliver.',detail:'Connect craft with testable, maintainable software.',note:'EVIDENCE BEFORE CLAIMS'}
] as const;

/** Scroll-based narrative; the hero remains a normal document section and never traps wheel/touch input. */
export function ScrollHero(){
 const host=useRef<HTMLElement>(null);
 const [active,setActive]=useState(0);
 useEffect(()=>{
  const root=host.current;
  if(!root)return;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  let requestId=0;
  const sync=()=>{
   requestId=0;
   if(reduced.matches){root.style.setProperty('--sx-v3-progress','0');setActive(0);root.dataset.scene='0';return;}
   const rect=root.getBoundingClientRect();
   const travel=Math.max(1,rect.height-window.innerHeight);
   const fraction=Math.min(1,Math.max(0,-rect.top/travel));
   root.style.setProperty('--sx-v3-progress',fraction.toFixed(3));
   const index=fraction<.32?0:fraction<.69?1:2;
   root.dataset.scene=String(index);
   setActive(prev=>prev===index?prev:index);
  };
  const onScroll=()=>{if(!requestId)requestId=requestAnimationFrame(sync);};
  sync();
  window.addEventListener('scroll',onScroll,{passive:true});
  window.addEventListener('resize',onScroll);
  reduced.addEventListener('change',onScroll);
  return()=>{window.removeEventListener('scroll',onScroll);window.removeEventListener('resize',onScroll);reduced.removeEventListener('change',onScroll);if(requestId)cancelAnimationFrame(requestId);};
 },[]);
 return <section ref={host} className="sx-work-hero sx-editorial-frame sx-v3-hero" id="top" aria-labelledby="sx-work-title" data-scene="0">
  <div className="sx-v3-hero-stage">
   <div className="sx-work-art" aria-hidden="true"><span className="sx-art-coordinates">EDITORIAL / PRODUCT SYSTEMS</span></div>
   <div className="sx-work-copy">
    <p className="sx-kicker">SAEID SHAMSAEI <span className="sx-kicker-divider">/</span> PRODUCT &amp; SOFTWARE ENGINEERING</p>
    <h1 id="sx-work-title">BEYOND<br/><em>THE</em><br/>INTERFACE<span className="sx-title-stop">.</span></h1>
    <p>I design software architectures and digital products that make complexity feel effortless.</p>
    <div className="sx-hero-actions"><a href="#about" className="sx-action">Meet the architect <span aria-hidden="true">↘</span></a></div>
   </div>
   <div className="sx-hero-blueprint sx-v3-hero-blueprint" aria-label="A three-part design engineering journey">
    <div className="sx-blueprint-heading"><span>THE WAY I WORK</span><span>0{active+1} / 03</span></div>
    <div className="sx-blueprint-steps">
     {stages.map((stage,i)=><div className={'sx-blueprint-step'+(active===i?' sx-is-current':'')} key={stage.step} data-active={active===i?'true':'false'}>
      <span className="sx-blueprint-index">{stage.step}</span>
      <div><strong>{stage.verb}</strong><small>{active===i?stage.detail:stage.note}</small></div>
      <span aria-hidden="true" className="sx-blueprint-sign">{active===i?'↗':'·'}</span>
     </div>)}
    </div>
    <div className="sx-blueprint-base"><span>{stages[active].note}</span><span className="sx-blueprint-progress" aria-hidden="true"><i/></span></div>
   </div>
   <div className="sx-hero-bottom"><span>ARCHITECTURE · QUALITY · EXPERIENCE</span><span>SCROLL TO UNFOLD ↓</span></div>
  </div>
 </section>;
}
