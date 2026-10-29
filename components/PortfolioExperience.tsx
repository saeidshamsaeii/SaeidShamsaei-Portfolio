'use client';
import {useCallback,useState} from 'react';
import Link from 'next/link';
import {SignatureOpening} from '@/components/SignatureOpening';
import {EnglishGreeting} from '@/components/EnglishGreeting';
import {ScrollHero} from '@/components/ScrollHero';
import {SelectedWorkIndex} from '@/components/SelectedWorkIndex';
import {HorizontalCaseChapter} from '@/components/HorizontalCaseChapter';
import {GuidedTour} from '@/components/GuidedTour';
import {WordReveal} from '@/components/WordReveal';
import {projects,publicContact} from '@/data/portfolio';

export default function PortfolioExperience(){
 const [loaded,setLoaded]=useState(false);
 const [tour,setTour]=useState(true);
 const finishGreeting=useCallback(()=>setLoaded(true),[]);
 return <div className="sx-site sx-v18-site">
  {!loaded&&<EnglishGreeting onComplete={finishGreeting}/>}
  <GuidedTour active={loaded&&tour} onExit={()=>setTour(false)}/>
  <a className="skip-link" href="#work-index">Skip to work</a>
  <header className="sx-header sx-v18-header">
   <Link className="sx-v18-brand" href="#intro" aria-label="Back to start">SAEID SHAMSAEI.</Link>
   <nav aria-label="Primary navigation">
    <a href="#work-index">Work</a>
    <a href="#about">About</a>
    <Link href="/engineering/">Engineering</Link>
    <a href="#contact">Contact</a>
   </nav>
  </header>
  <main>
   <SignatureOpening ready={loaded}/>
   <ScrollHero/>
   <section className="sx-profile sx-editorial-frame sx-v8-about sx-v18-about"
    id="about" data-tour-stop data-tour-label="About" data-tour-duration="12"
    data-tour-pace=".72" aria-labelledby="sx-profile-title">
    <div className="sx-v18-about-inner">
     <WordReveal as="h2" id="sx-profile-title" text="Clarity in design. Precision in code."/>
     <WordReveal className="sx-v18-about-summary"
      text="I build thoughtful digital products — from architecture to the experience people use."/>
     <div className="sx-v18-keywords" aria-label="Specialties">
      <WordReveal as="span" text="Architecture"/><WordReveal as="span" text="Engineering"/><WordReveal as="span" text="Experience"/>
     </div>
    </div>
   </section>
   <SelectedWorkIndex/>
   <div className="sx-work-intro sx-v18-work-intro" id="selected-projects"
    data-tour-stop data-tour-label="Selected projects" data-tour-duration="5"
    data-tour-pace="1.2" aria-label="Selected projects">
    <WordReveal as="h2" text="Behind the work."/>
   </div>
   {projects.map((project,index)=><HorizontalCaseChapter key={project.id} project={project} index={index}/>)}
   <section className="sx-contact sx-editorial-frame sx-v18-contact"
    id="contact" data-tour-stop data-tour-label="Contact" data-tour-duration="10"
    data-tour-pace=".76" aria-labelledby="sx-contact-title">
    <WordReveal as="h2" id="sx-contact-title" text="Let's build something that matters."/>
    <div className="sx-contact-directory" aria-label="Contact channels">
     <a className="sx-contact-link" href={'mailto:'+publicContact.email}>
      <WordReveal as="strong" text="Email"/><WordReveal as="span" text={publicContact.email+" ↗"}/>
     </a>
     <a className="sx-contact-link" href={publicContact.phoneHref}>
      <WordReveal as="strong" text="Phone"/><WordReveal as="span" text={publicContact.phone+" ↗"}/>
     </a>
     <a className="sx-contact-link" href={publicContact.linkedin} target="_blank" rel="noreferrer noopener">
      <WordReveal as="strong" text="LinkedIn"/><WordReveal as="span" text="Profile ↗"/>
     </a>
     <a className="sx-contact-link" href={publicContact.telegram} target="_blank" rel="noreferrer noopener">
      <WordReveal as="strong" text="Telegram"/><WordReveal as="span" text="Message ↗"/>
     </a>
    </div>
   </section>
  </main>
  <footer className="sx-footer sx-v18-footer">
   <span>SAEID SHAMSAEI.</span>
   <nav aria-label="Footer navigation"><a href="#intro">Top ↑</a><Link href="/engineering/">Engineering</Link>
    <a href={'mailto:'+publicContact.email}>Contact ↗</a></nav>
  </footer>
 </div>;
}
