'use client';
import {useCallback,useEffect,useRef,useState} from 'react';
import {LinuxCodeCanvas} from '@/components/LinuxCodeCanvas';
import {WordReveal} from '@/components/WordReveal';

/**
 * Linux code is a DOM animation driven by native scroll progress.
 * No canvas capture, stock photo, autoplay, interval, or animated background asset.
 * Screen-reader narration stays with the three editorial story slides.
 */
const slides=[
 {index:'01',eyebrow:'SAEID SHAMSAEI / SOFTWARE ARCHITECT & PRODUCT ENGINEER',
  title:<>I BUILD DIGITAL<br/><em>THINGS THAT MATTER.</em></>,
  description:'I design useful digital products — thoughtful experiences built on dependable engineering.'},
 {index:'02',eyebrow:'MY PURPOSE / CLARITY BEFORE COMPLEXITY',
  title:<>COMPLEX IDEAS.<br/><em>CLEAR EXPERIENCES.</em></>,
  description:'A clear problem, a considered interface and the systems underneath it. Every decision serves a purpose.'},
 {index:'03',eyebrow:'HOW I THINK / THE BIG PICTURE',
  title:<>ARCHITECTURE.<br/><em>PRODUCT. PEOPLE.</em></>,
  description:'From the first line of code to the full product experience, I build for people and for what comes next.'}
] as const;

export function ScrollHero(){
 const host=useRef<HTMLElement>(null);
 const [scene,setScene]=useState(0);
 const [progress,setProgress]=useState(0);
 const [reduced,setReduced]=useState(false);
 const [enhanced,setEnhanced]=useState(false);
 useEffect(()=>{
  const root=host.current;
  if(!root)return;
  const media=window.matchMedia('(prefers-reduced-motion: reduce)');
  let frame=0;
  const update=()=>{
   frame=0;
   if(media.matches){root.dataset.heroProgress='1';setReduced(true);setEnhanced(false);setScene(0);setProgress(1);return;}
   setReduced(false);setEnhanced(true);
   const rect=root.getBoundingClientRect();
   const distance=Math.max(1,rect.height-window.innerHeight);
   const fraction=Math.max(0,Math.min(1,-rect.top/distance));
   root.dataset.heroProgress=String(fraction);
   setProgress(previous=>Math.abs(previous-fraction)>.001?fraction:previous);
   const next=Math.min(slides.length-1,Math.floor(fraction*slides.length));
   setScene(previous=>previous===next?previous:next);
  };
  const request=()=>{if(!frame)frame=requestAnimationFrame(update);};
  update();
  window.addEventListener('scroll',request,{passive:true});
  window.addEventListener('resize',request);
  media.addEventListener('change',request);
  return()=>{
   window.removeEventListener('scroll',request);
   window.removeEventListener('resize',request);
   media.removeEventListener('change',request);
   if(frame)cancelAnimationFrame(frame);
  };
 },[]);
 const goTo=useCallback((index:number)=>{
  const root=host.current;if(!root)return;
  const top=root.getBoundingClientRect().top+window.scrollY;
  const travel=Math.max(0,root.getBoundingClientRect().height-window.innerHeight);
  const position=top+travel*(index+.1)/slides.length;
  window.scrollTo({top:position,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
 },[]);
 return <section id="top" ref={host} className="sx-work-hero sx-v3-hero sx-v4-hero sx-v8-hero sx-v9-hero"
  data-scene={String(scene)} data-ready={enhanced?'true':'false'}
  aria-label="Introduction and professional purpose">
  <div className="sx-v8-hero-stage">
   <LinuxCodeCanvas progress={progress} reduced={reduced}/>
   <div className="sx-v8-hero-frame">
    <div className="sx-v8-hero-head">
     <WordReveal as="span" text="PORTFOLIO / SAEID SHAMSAEI"/>
     <WordReveal as="span" text="CODE AS A CANVAS / 01—03"/>
    </div>
    <div className="sx-v8-hero-slides">
     {slides.map((slide,index)=><div key={slide.index} className="sx-v8-hero-slide"
      data-active={scene===index?'true':'false'} aria-hidden={enhanced&&scene!==index}
      data-tour-stop data-tour-label={'Introduction / '+slide.eyebrow} data-tour-duration="9"
      data-tour-pace={String([.72,1.28,.88][index])}
      data-tour-progress={String((index+.18)/slides.length)}>
       <WordReveal className="sx-kicker" text={slide.eyebrow}/>
       {index===0?<h1 id="sx-work-title"><WordReveal as="span" text="I BUILD DIGITAL"/><br/><em><WordReveal as="span" text="THINGS THAT MATTER."/></em></h1>:
        <h2>{index===1?<><WordReveal as="span" text="COMPLEX IDEAS."/><br/><em><WordReveal as="span" text="CLEAR EXPERIENCES."/></em></>:
         <><WordReveal as="span" text="ARCHITECTURE."/><br/><em><WordReveal as="span" text="PRODUCT. PEOPLE."/></em></>}</h2>}
       <WordReveal className="sx-v8-hero-desc" text={slide.description}/>
      </div>)}
    </div>
    <div className="sx-v8-hero-bottom">
     <a href="#about" className="sx-v8-next"><WordReveal as="span" text="MEET THE PERSON BEHIND THE WORK ↘"/></a>
     <div className="sx-v8-hero-controls" aria-label="Introduction slides">
      {slides.map((slide,index)=><button type="button" key={slide.index}
       className={scene===index?'is-active':''} aria-label={'Show introduction slide '+slide.index}
       aria-current={enhanced&&scene===index?'step':undefined}
       onClick={()=>goTo(index)}><span>{slide.index}</span><i/></button>)}
     </div>
    </div>
   </div>
  </div>
 </section>;
}
