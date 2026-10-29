'use client';
import {useCallback,useEffect,useState} from 'react';
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
 const [introHoldFinished,setIntroHoldFinished]=useState(false);
 const [tour,setTour]=useState(true);
 const finishGreeting=useCallback(()=>setLoaded(true),[]);

 // The mobile photo pause starts *when Hello is gone*, independently of the
 // scroll director. Previously the hold lived inside GuidedTour and could be
 // bypassed by its initial scroll/restore state. Do not mount the director
 // until this full 2000ms hold has elapsed.
 useEffect(()=>{
  if(!loaded)return;
  const cover=document.getElementById('intro');
  if(!cover){setIntroHoldFinished(true);return;}
  const mobile=window.matchMedia('(max-width:760px)').matches;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const root=document.documentElement;
  const revealCopy=()=>{
   cover.dataset.mobilePhotoPhase='copy';
   cover.dataset.mobileCopyStartedAt=String(performance.now());
   cover.dispatchEvent(new Event('sx-mobile-intro-copy'));
  };
  // A normal reload may restore a stale scrollY before Hello disappears.
  // Such restoration must not silently skip the requested photo pause.
  // Respect explicit anchor navigation and genuine back/forward restoration.
  const historyReturn=(performance.getEntriesByType('navigation')[0] as
   PerformanceNavigationTiming|undefined)?.type==='back_forward';
  if(!mobile||reduced||Boolean(window.location.hash)||historyReturn){
   if(mobile)revealCopy();
   setIntroHoldFinished(true);
   return;
  }
  window.scrollTo({top:0,behavior:'instant'});

  // At this point the Hello overlay has unmounted, the portrait is visible,
  // and neither the guided scroll nor intro typing has started.
  root.dataset.portfolioTourHold='intro-photo';
  let released=false;
  let photoTimerStarted=false;
  let timer=0, imageTimeout=0;
  const image=cover.querySelector<HTMLImageElement>('.sx-v19-photo-background img');
  const release=(manual:boolean)=>{
   if(released)return;
   released=true;
   window.clearTimeout(timer);
   window.clearTimeout(imageTimeout);
   image?.removeEventListener('load',startHold);
   image?.removeEventListener('error',startHold);
   // Remove all pause-only input listeners as soon as the hold ends.
   window.removeEventListener('wheel',onManual);
   window.removeEventListener('touchmove',onManual);
   window.removeEventListener('keydown',onKey);
   delete root.dataset.portfolioTourHold;
   if(manual){
    revealCopy();
    setTour(false);
   }else{
    // Both portrait and copy are now in the opening viewport. Start the
    // sequential typing clock here, without scrolling away from the image.
    revealCopy();
   }
   setIntroHoldFinished(true);
  };
  const onManual=()=>release(true);
  const onKey=(event:KeyboardEvent)=>{
   if(['ArrowDown','ArrowUp','PageDown','PageUp',' ','Home','End','Escape'].includes(event.key))
    onManual();
  };
  const startHold=()=>{
   if(released||photoTimerStarted)return;
   photoTimerStarted=true;
   window.clearTimeout(imageTimeout);
   timer=window.setTimeout(()=>release(false),2000);
  };
  window.addEventListener('wheel',onManual,{passive:true});
  window.addEventListener('touchmove',onManual,{passive:true});
  window.addEventListener('keydown',onKey);
  // The image may arrive after the Hello overlay on a slow mobile network.
  // Hold for 2s of actual photo visibility, without trapping a failed image.
  if(!image||image.complete)startHold();
  else{
   image.addEventListener('load',startHold,{once:true});
   image.addEventListener('error',startHold,{once:true});
   imageTimeout=window.setTimeout(startHold,4500);
  }
  return()=>{
   window.clearTimeout(timer);
   window.clearTimeout(imageTimeout);
   image?.removeEventListener('load',startHold);
   image?.removeEventListener('error',startHold);
   window.removeEventListener('wheel',onManual);
   window.removeEventListener('touchmove',onManual);
   window.removeEventListener('keydown',onKey);
   if(root.dataset.portfolioTourHold==='intro-photo')
    delete root.dataset.portfolioTourHold;
  };
 },[loaded]);

 return <div className="sx-site sx-v18-site">
  {!loaded&&<EnglishGreeting onComplete={finishGreeting}/>}
  <GuidedTour active={loaded&&introHoldFinished&&tour} onExit={()=>setTour(false)}/>
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
