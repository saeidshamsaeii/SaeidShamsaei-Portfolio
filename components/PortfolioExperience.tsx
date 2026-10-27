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
 const [tour,setTour]=useState(true); // Begin the 2x director on initial hydration; no start button.
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
   <nav aria-label="Primary navigation"><a href="#top">Home</a><a href="#about">About</a><a href="#selected-projects">Projects</a><Link href="/engineering/">Engineering Index</Link><a href="#contact">Contact</a></nav>
   <div className="sx-header-actions"><a className="sx-header-cta" href={'mailto:'+publicContact.email}>Let’s Talk ↗</a></div>
  </header>
  <main>
   <ScrollHero/>

   <section className="sx-profile sx-editorial-frame sx-v8-about" id="about" data-tour-stop data-tour-label="Meet Saeid" data-tour-duration="17" data-tour-pace="0.65" aria-labelledby="sx-profile-title">
    <div className="sx-v8-about-inner">
     <div className="sx-v8-about-portrait">
      <img src="/assets/hires/portrait.webp" alt="Portrait of Saeid Shamsaei in a black suit and sunglasses" width={1122} height={1402} loading="eager" decoding="async"/>
      <div className="sx-v8-portrait-note"><WordReveal as="span" text="SAEID SHAMSAEI"/><WordReveal as="span" text="THE PERSON BEHIND THE WORK"/></div>
     </div>
     <div className="sx-v8-about-content">
      <WordReveal className="sx-kicker" text="02 / ABOUT ME"/>
      <WordReveal as="h2" id="sx-profile-title" text="A LITTLE ABOUT ME."/>
      <WordReveal className="sx-v8-about-role" text="Software Architect & Product Engineer"/>
      <WordReveal className="sx-v8-about-summary" text="I'm Saeid Shamsaei. I enjoy turning ambitious ideas into thoughtful software — combining system architecture, practical engineering and a strong sense of product experience."/>
      <div className="sx-v8-fact-line" aria-label="Verified professional profile">
       <div><WordReveal as="span" text="FOCUS"/><WordReveal as="strong" text="Software Architecture · Product Engineering"/></div>
       {publicBiography.ageYears!==null&&<div><WordReveal as="span" text="AGE"/><WordReveal as="strong" text={String(publicBiography.ageYears)}/></div>}
       {publicBiography.yearsOfExperience!==null&&<div><WordReveal as="span" text="EXPERIENCE"/><WordReveal as="strong" text={String(publicBiography.yearsOfExperience)+" Years"}/></div>}
      </div>
      <div className="sx-v8-about-experience" aria-label="Experience areas">
       <WordReveal className="sx-v8-experience-kicker" text="EXPERIENCE & INTERESTS"/>
       <div><WordReveal as="span" text="01"/><WordReveal as="strong" text="Platform Architecture"/><WordReveal as="small" text="Multi-tenant systems, reusable foundations and product infrastructure"/></div>
       <div><WordReveal as="span" text="02"/><WordReveal as="strong" text="Engineering & Automation"/><WordReveal as="small" text="Developer workflows, quality gates and source-driven delivery"/></div>
       <div><WordReveal as="span" text="03"/><WordReveal as="strong" text="Digital Products"/><WordReveal as="small" text="Business platforms, commerce and clinical nutrition workflows"/></div>
      </div>
      <a href="#selected-projects" className="sx-v8-about-cta"><WordReveal as="span" text="EXPLORE SELECTED PROJECTS ↘"/></a>
     </div>
    </div>
   </section>

   <div className="sx-work-intro" id="selected-projects" data-tour-stop data-tour-label="Four engineering stories" data-tour-duration="7" data-tour-pace="1.25" aria-label="Selected projects">
    <WordReveal as="span" className="sx-kicker" text="SELECTED WORK / FOUR STORIES"/>
    <WordReveal as="span" className="sx-work-intro-hint" text="SCROLL DOWN · EXPLORE SIDEWAYS ↘"/>
   </div>
   {projects.map((project,index)=><HorizontalCaseChapter key={project.id} project={project} index={index}/>)}
   <aside className="sx-ei-home-bridge" aria-label="Explore the engineering behind the work"><span>BEYOND THE STORY</span><p>Read the decisions, constraints and source files behind the four projects — without the automatic tour.</p><Link href="/engineering/">OPEN THE ENGINEERING INDEX ↗</Link></aside>

   <section className="sx-contact sx-editorial-frame" id="contact" data-tour-stop data-tour-label="Start a conversation" data-tour-duration="12" data-tour-pace="0.82" aria-labelledby="sx-contact-title">
    <WordReveal className="sx-kicker" text="04 / DIRECT CONTACT"/>
    <div className="sx-contact-layout">
     <div className="sx-contact-main">
      <WordReveal as="h2" id="sx-contact-title" text="LET’S BUILD WHAT MATTERS."/>
      <WordReveal text="Thoughtful products start with a good conversation."/>
      <a href={'mailto:'+publicContact.email+'?subject=Project%20inquiry'} className="sx-action"><WordReveal as="span" text="Start a project ↗"/></a>
     </div>
     <div className="sx-contact-mark">
      <div className="sx-contact-symbol" aria-hidden="true"><img src="/assets/hires/logo.webp" alt="" width={1254} height={1254} decoding="async"/></div>
      <WordReveal as="span" className="sx-contact-mark-caption" text="ARCHITECTURE / ENGINEERING / EXPERIENCE"/>
     </div>
    </div>
    <div className="sx-contact-directory" aria-label="Ways to reach Saeid Shamsaei">
     <a className="sx-contact-link" href={'mailto:'+publicContact.email}>
      <WordReveal as="span" text="01 / EMAIL"/><WordReveal as="strong" text={publicContact.email}/><span aria-hidden="true">↗</span>
     </a>
     <a className="sx-contact-link" href={publicContact.phoneHref}>
      <WordReveal as="span" text="02 / PHONE"/><WordReveal as="strong" text={publicContact.phone}/><span aria-hidden="true">↗</span>
     </a>
     <a className="sx-contact-link" href={publicContact.linkedin} target="_blank" rel="noreferrer noopener">
      <WordReveal as="span" text="03 / LINKEDIN"/><WordReveal as="strong" text="Connect on LinkedIn"/><span aria-hidden="true">↗</span>
     </a>
     <a className="sx-contact-link" href={publicContact.telegram} target="_blank" rel="noreferrer noopener">
      <WordReveal as="span" text="04 / TELEGRAM"/><WordReveal as="strong" text={publicContact.telegramHandle}/><span aria-hidden="true">↗</span>
     </a>
    </div>
   </section>
  </main>
  <footer className="sx-footer"><Brand footer/><nav aria-label="Footer navigation"><a href="#top">Home</a><a href="#about">About</a><a href="#selected-projects">Projects</a><Link href="/engineering/">Engineering Index</Link><a href="#contact">Contact</a></nav>
   <div className="sx-footer-social"><a href={publicContact.github} rel="noreferrer noopener" target="_blank">GitHub ↗</a><a href={publicContact.linkedin} rel="noreferrer noopener" target="_blank">LinkedIn ↗</a><a href={publicContact.telegram} rel="noreferrer noopener" target="_blank">Telegram ↗</a><a href={'mailto:'+publicContact.email}>Email ↗</a></div></footer>
 </div>;
}
