'use client';
import {useEffect,useState} from 'react';
import Link from 'next/link';
import {ScrollHero} from '@/components/ScrollHero';
import {GuidedTour} from '@/components/GuidedTour';
import {WordReveal} from '@/components/WordReveal';
import {HorizontalCaseChapter} from '@/components/HorizontalCaseChapter';

import {projects,publicContact,publicBiography} from '@/data/portfolio';

function Brand({footer=false}:{footer?:boolean}){
 return <Link className={'sx-brand'+(footer?' sx-brand--footer':'')} href="/" aria-label="Saeid Shamsaei — home">
  <img src="/assets/hires/logo.webp" width={44} height={44} alt="" decoding="async"/>
  <span>SAEID <strong>SHAMSAEI</strong>{footer&&<small>Product architecture & engineering</small>}</span>
 </Link>;
}

export default function PortfolioExperience(){
 const [tour,setTour]=useState(false);
 const [tourDismissed,setTourDismissed]=useState(false);
 useEffect(()=>{
  // The site launches as a narrated, timed scroll tour after hydration.
  // A reduced-motion visitor receives static, fully readable content.
  const media=window.matchMedia('(prefers-reduced-motion: reduce)');
  if(media.matches)return;
  let interacted=window.scrollY>80;
  const cancel=()=>{interacted=true;};
  const kickoff=window.setTimeout(()=>{if(!tourDismissed&&!interacted)setTour(true);},1800);
  window.addEventListener('wheel',cancel,{passive:true});
  window.addEventListener('touchstart',cancel,{passive:true});
  window.addEventListener('keydown',cancel);
  return()=>{window.clearTimeout(kickoff);window.removeEventListener('wheel',cancel);
   window.removeEventListener('touchstart',cancel);window.removeEventListener('keydown',cancel);};
 },[tourDismissed]);
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
  <GuidedTour active={tour} onExit={()=>{setTour(false);setTourDismissed(true);}}/>
  <a className="skip-link" href="#selected-projects">Skip to projects</a>
  <header className="sx-header">
   <Brand/>
   <nav aria-label="Primary navigation"><a href="#top">Home</a><a href="#about">About</a><a href="#selected-projects">Projects</a><a href="#contact">Contact</a></nav>
   <div className="sx-header-actions"><button type="button" className="sx-tour-trigger" onClick={()=>{setTourDismissed(false);setTour(true);}} aria-label="Restart guided site tour">▶ TOUR</button><a className="sx-header-cta" href={'mailto:'+publicContact.email}>Let’s Talk ↗</a></div>
  </header>
  <main>
   <ScrollHero/>

   <section className="sx-profile sx-editorial-frame sx-v8-about" id="about" data-tour-stop data-tour-label="Meet Saeid" data-tour-duration="12" aria-labelledby="sx-profile-title">
    <div className="sx-v8-about-inner">
     <div className="sx-v8-about-portrait">
      <img src="/assets/hires/portrait.webp" alt="Portrait of Saeid Shamsaei in a black suit and sunglasses" width={1122} height={1402} loading="eager" decoding="async"/>
      <div className="sx-v8-portrait-note"><span>SAEID SHAMSAEI</span><span>THE PERSON BEHIND THE WORK</span></div>
     </div>
     <div className="sx-v8-about-content">
      <p className="sx-kicker">02 / ABOUT ME</p>
      <WordReveal as="h2" id="sx-profile-title" text="A LITTLE ABOUT ME."/>
      <WordReveal className="sx-v8-about-role" text="Software Architect & Product Engineer"/>
      <WordReveal className="sx-v8-about-summary" text="I'm Saeid Shamsaei. I enjoy turning ambitious ideas into thoughtful software — combining system architecture, practical engineering and a strong sense of product experience."/>
      <div className="sx-v8-fact-line" aria-label="Verified professional profile">
       <div><span>FOCUS</span><strong>Software Architecture · Product Engineering</strong></div>
       {publicBiography.ageYears!==null&&<div><span>AGE</span><strong>{publicBiography.ageYears}</strong></div>}
       {publicBiography.yearsOfExperience!==null&&<div><span>EXPERIENCE</span><strong>{publicBiography.yearsOfExperience} Years</strong></div>}
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

   <div className="sx-work-intro" id="selected-projects" data-tour-stop data-tour-label="Four engineering stories" data-tour-duration="5" aria-label="Selected projects">
    <span className="sx-kicker">SELECTED WORK / FOUR STORIES</span>
    <span className="sx-work-intro-hint">SCROLL DOWN · EXPLORE SIDEWAYS ↘</span>
   </div>
   {projects.map((project,index)=><HorizontalCaseChapter key={project.id} project={project} index={index}/>)}

   <section className="sx-contact sx-editorial-frame" id="contact" data-tour-stop data-tour-label="Start a conversation" data-tour-duration="10" aria-labelledby="sx-contact-title">
    <p className="sx-kicker">04 / DIRECT CONTACT</p>
    <div className="sx-contact-layout">
     <div className="sx-contact-main">
      <WordReveal as="h2" id="sx-contact-title" text="LET’S BUILD WHAT MATTERS."/>
      <WordReveal text="Thoughtful products start with a good conversation."/>
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
