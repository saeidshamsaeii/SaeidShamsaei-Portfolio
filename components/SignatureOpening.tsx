'use client';
import {useEffect,useRef} from 'react';
import Link from 'next/link';
import {WordReveal} from '@/components/WordReveal';

/** Edition 16: an editorial portrait cover using the actual checked-in owner
 * photograph. No artificial headshot, location metadata or client metrics.
 * Pure DOM scroll parallax (no canvas, WebGL or continuous timer).
 */
export function SignatureOpening(){
 const root=useRef<HTMLElement>(null);
 useEffect(()=>{
  const el=root.current;if(!el)return;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  let raf=0;
  const update=()=>{
   raf=0;
   if(reduced.matches){el.style.setProperty('--sx-cover-scroll','0');return;}
   const rect=el.getBoundingClientRect();
   const progress=Math.max(0,Math.min(1,-rect.top/Math.max(1,rect.height)));
   el.style.setProperty('--sx-cover-scroll',String(progress));
  };
  const request=()=>{if(!raf)raf=requestAnimationFrame(update);};
  window.addEventListener('scroll',request,{passive:true});
  window.addEventListener('resize',request);
  reduced.addEventListener('change',request);
  request();
  return()=>{
   window.removeEventListener('scroll',request);
   window.removeEventListener('resize',request);
   reduced.removeEventListener('change',request);
   if(raf)cancelAnimationFrame(raf);
  };
 },[]);
 return <section ref={root} id="intro" className="sx-v16-cover"
  data-tour-stop data-tour-label="Introduction / Saeid Shamsaei"
  data-tour-duration="14" data-tour-pace=".67" aria-labelledby="sx-v16-name">
  <div className="sx-v16-cover-meta" aria-hidden="true">
   <span>INDEPENDENT / SOFTWARE ARCHITECTURE</span>
   <span>PORTFOLIO · 2026</span>
  </div>
  <div className="sx-v16-cover-image">
   <img src="/assets/hires/portrait.webp" width={1122} height={1402}
    alt="Saeid Shamsaei — personal portrait" decoding="async" fetchPriority="high"/>
   <div className="sx-v16-cover-image-glaze" aria-hidden="true"/>
   <div className="sx-v16-cover-photo-note" aria-hidden="true">PORTRAIT / PERSONAL IDENTITY</div>
  </div>
  <div className="sx-v16-cover-identity">
   <div className="sx-v16-cover-intro">
    <WordReveal as="span" text="CODE, DESIGN AND ENGINEERING."/>
    <WordReveal as="p" text="I make complex digital systems feel considered, useful and human."/>
   </div>
   <h1 id="sx-v16-name"><WordReveal as="span" text="SAEID"/><WordReveal as="span" text="SHAMSAEI."/></h1>
   <div className="sx-v16-cover-bottom">
    <WordReveal as="span" text="SOFTWARE ARCHITECT / PRODUCT ENGINEER"/>
    <Link href="/engineering/">EXPLORE ENGINEERING ↗</Link>
    <a href="#top">SCROLL TO DISCOVER <span aria-hidden="true">↓</span></a>
   </div>
  </div>
  <div className="sx-v16-cover-edge" aria-hidden="true"><span>01 / 06</span><span>THE PERSON BEHIND THE SYSTEMS</span></div>
 </section>;
}
