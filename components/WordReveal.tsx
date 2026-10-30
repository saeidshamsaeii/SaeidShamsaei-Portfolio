'use client';
import {useEffect,useMemo,useRef} from 'react';

type Tag='p'|'h1'|'h2'|'h3'|'span'|'small'|'strong';
const clamp=(n:number)=>Math.max(0,Math.min(1,n));

/**
 * Centerline contract: the actual rendered block reaches 100% disclosure
 * when its visual midpoint crosses the viewport's vertical midpoint.
 * This geometric clock cannot fall behind long case studies or the page tail.
 */
function centerlineProgress(element:HTMLElement){
 const rect=element.getBoundingClientRect();
 const viewport=Math.max(1,window.innerHeight);
 const begin=viewport*.88;
 const complete=viewport*.50-rect.height*.50;
 return clamp((begin-rect.top)/Math.max(1,begin-complete));
}

/**
 * Edition 20: Reveal real rendered lines, not arbitrary groups of 9 words.
 * Each preceding visual line must finish before the next line can begin.
 * Multiple paragraphs share one ordered scroll clock inside each section.
 * The initial hero gets its own on-entry clock so its title is actually
 * readable on the first screen without requiring the visitor to scroll.
 */
export function WordReveal({text,as='p',className='',id,mode='lines',stagger=0,ready=true}:{
 text:string;as?:Tag;className?:string;id?:string;
 mode?:'lines'|'words';stagger?:number;ready?:boolean;
}){
 const root=useRef<HTMLElement>(null);
 const authoredLines=useMemo(()=>{
  const lines=text.split(/\n/g).map(chunk=>chunk.trim()).filter(Boolean);
  return lines.map(line=>line.split(/\s+/).filter(Boolean));
 },[text]);

 useEffect(()=>{
  const host=root.current;if(!host)return;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const onIntro=Boolean(host.closest('#intro'));
  // The very first "SAEID" glyph must not show as a 1px slice ("tick")
  // while its whole-word clipping animation advances from zero.
  const introTitle=onIntro&&Boolean(host.closest('h1'));
  const caseStoryScene=host.closest<HTMLElement>('.sx-v31-case-page [data-tour-hold="case-scene"]');
  const biography=host.closest<HTMLElement>('#about.sx-v33-biography');
  const horizontalChapter=host.closest<HTMLElement>('[data-horizontal-chapter]');
  const workIndex=host.closest<HTMLElement>('#work-index');
  const started=performance.now();
  let raf=0;
  let disposed=false;
  let layoutCache=new WeakMap<HTMLElement,HTMLElement[][]>();

  // Browser layout, not word counts, determines the line breaks at any
  // screen width. Explicit newlines remain mandatory chapter boundaries.
  const measureLines=(element:HTMLElement):HTMLElement[][]=>{
   const existing=layoutCache.get(element);
   if(existing)return existing;
   const result:HTMLElement[][]=[];
   const explicit=Array.from(element.querySelectorAll<HTMLElement>('[data-reveal-line]'));
   for(const line of explicit){
    const words=Array.from(line.querySelectorAll<HTMLElement>('[data-reveal-word]'));
    let prior=Number.NaN;
    for(const word of words){
     const top=word.getBoundingClientRect().top;
     if(!result.length||!Number.isFinite(prior)||Math.abs(prior-top)>3)result.push([]);
     result[result.length-1].push(word);
     prior=top;
    }
   }
   if(!result.length)result.push([]);
   layoutCache.set(element,result);
   return result;
  };

  const render=(value:number)=>{
   const progress=clamp((value-stagger)/Math.max(.05,1-stagger));
   host.dataset.motion='on';
   // Expose actual animation completion to the headless reading director.
   // This is not an on-screen counter and never affects manual scrolling.
   host.dataset.revealComplete=progress>=.999?'true':'false';
   // The legacy line clipping must not hide actual word visibility.
   for(const line of host.querySelectorAll<HTMLElement>('[data-reveal-line]')){
    line.style.opacity='1';
    line.style.clipPath='none';
    line.style.transform='none';
   }
   const lines=measureLines(host);
   const timeline=progress*lines.length;
   for(let i=0;i<lines.length;i++){
    const fraction=clamp(timeline-i);
    const words=lines[i],typed=fraction*words.length;
    for(let j=0;j<words.length;j++){
     const amount=clamp(typed-j);
     const firstIntroWord=introTitle&&i===0&&j===0;
     // Keep the first glyph completely invisible until the clipping area
     // can hold a recognizable letter. Then fade it in, continuously:
     // no isolated vertical stroke and no extra typing restart.
     const shown=firstIntroWord?clamp((amount-.18)/.17):amount;
     const clipped=firstIntroWord&&amount<.18?0:amount;
     words[j].style.opacity=String(shown);
     words[j].style.clipPath='inset(0 '+((1-clipped)*100)+'% 0 0)';
     words[j].style.transform='none';
    }
   }
  };
  const clear=()=>{
   host.dataset.motion='off';
   host.dataset.revealComplete='true';
   for(const node of host.querySelectorAll<HTMLElement>('[data-reveal-line],[data-reveal-word]')){
    node.style.removeProperty('opacity');
    node.style.removeProperty('clip-path');
    node.style.removeProperty('transform');
   }
  };

  // A section's headings and paragraphs share a single ordering, but
  // the target is based on EACH block's position. A tall case chapter must
  // not leave its final paragraphs unwritten as they pass the centerline.
  const blocksFor=(container:HTMLElement)=>Array.from(
   container.querySelectorAll<HTMLElement>('.sx-word-reveal')
  ).filter(element=>element.getClientRects().length>0);
  const grouped=(container:HTMLElement,local:number)=>{
   const blocks=blocksFor(container);
   if(!blocks.length)return clamp(local);
   const sizes=blocks.map(element=>Math.max(1,measureLines(element).length));
   const self=blocks.indexOf(host);
   if(self<0)return clamp(local);
   const total=Math.max(1,sizes.reduce((a,b)=>a+b,0));
   const before=sizes.slice(0,self).reduce((a,b)=>a+b,0);
   return clamp((clamp(local)*total-before)/sizes[self]);
  };
  const viewportGroup=(container:HTMLElement)=>{
   const blocks=blocksFor(container);
   if(!blocks.length)return centerlineProgress(host);
   const sizes=blocks.map(element=>Math.max(1,measureLines(element).length));
   const total=Math.max(1,sizes.reduce((a,b)=>a+b,0));
   let before=0,goal=0;
   for(let i=0;i<blocks.length;i++){
    const progress=centerlineProgress(blocks[i]);
    goal=Math.max(goal,(before+progress*sizes[i])/total);
    before+=sizes[i];
   }
   return grouped(container,goal);
  };
  const request=()=>{if(!disposed&&!raf)raf=requestAnimationFrame(update);};
  const update=()=>{
   raf=0;
   if(disposed)return;
   if(reduced.matches){clear();return;}
   const chapter=host.closest<HTMLElement>('[data-horizontal-chapter]');
   const panel=host.closest<HTMLElement>('[data-frame-index]');
   let progress=0;
   if(chapter&&panel){
    const scaled=Number(chapter.dataset.frameProgress||'0');
    const index=Number(panel.dataset.frameIndex||'0');
    // Finish copy before the horizontal rail departs this frame.
    progress=grouped(panel,clamp((scaled-index)/.64));
   }else if(biography){
    // A single reading frame: the director types every authored line in
    // DOM order only after arrival, then holds the fully written section.
    // Manual scrolling uses the same centerline geometry as other chapters.
    const autoplay=document.documentElement.dataset.portfolioTour==='playing';
    progress=autoplay?
     grouped(biography,clamp(Number(biography.dataset.bioReadingProgress||'0'))):
     viewportGroup(biography);
   }else if(caseStoryScene){
    // The case-study chapters use the same grouped, line-by-line reveal
    // engine as home. On autoplay, the director advances a 4.2s reading
    // clock WITHOUT scrolling the viewport during typing. When readers
    // take manual control, their actual viewport position owns the copy.
    const tourMode=document.documentElement.dataset.portfolioTour;
    const playing=tourMode==='playing';
    // Before GuidedTour mounts, a case cover at scrollY=0 must start
    // completely blank. Otherwise hydration shows partially completed
    // text for one frame and rewinds it when autoplay takes over.
    const initialAtTop=!tourMode&&window.scrollY<=12&&
     !window.location.hash&&!caseStoryScene.dataset.caseSceneProgress;
    progress=playing?
     grouped(caseStoryScene,clamp(Number(caseStoryScene.dataset.caseSceneProgress||'0'))):
     initialAtTop?0:viewportGroup(caseStoryScene);
   }else if(workIndex){
    // Each row is a distinct beat: name and summary type in order,
    // then its underline draws, then 2s of reading before the NEXT row.
    // A single continuous group previously made every underline and
    // upcoming row appear prematurely.
    const stage=host.closest<HTMLElement>('[data-work-stage]');
    const current=Number(workIndex.dataset.workStageIndex||'0');
    const active=stage?Number(stage.dataset.workStage||'0'):0;
    const local=clamp(Number(workIndex.dataset.workStageProgress||'0'));
    progress=stage?active<current?1:active>current?0:
     grouped(stage,local):0;
   }else if(onIntro){
    const container=host.closest<HTMLElement>('.sx-v19-cover-content');
    if(ready&&container){
     const cover=host.closest<HTMLElement>('#intro')!;
     const rect=cover.getBoundingClientRect();
     const byScroll=clamp(-rect.top/Math.max(1,rect.height*.72));
     const mobile=window.matchMedia('(max-width:760px)').matches;
     const phase=cover.dataset.mobilePhotoPhase;
     if(mobile&&phase==='photo'){
      // The first two seconds belong to the portrait, never the words.
      // Name and description remain blank until the photo hold finishes.
      progress=0;
     }else{
      const mobileStarted=Number(cover.dataset.mobileCopyStartedAt||0);
      const entryStart=mobile&&mobileStarted>0?mobileStarted:started;
      const byEntry=clamp((performance.now()-entryStart)/4700);
      // Automatic mobile narration must actually TYPE in the visible copy
      // stage, not jump ahead because the portrait has scrolled offscreen.
      // A missing tour dataset during the handoff from Hello is NOT manual
      // navigation. Previously it made copy jump to 100%, then rewind when
      // GuidedTour mounted: the visible flash/retyping bug.
      const manualMobile=mobile&&cover.dataset.mobileCopyManual==='true';
      const copyRect=container.getBoundingClientRect();
      const manualCopyProgress=clamp((window.innerHeight*.78-copyRect.top)/
       Math.max(1,copyRect.height*.85));
      progress=grouped(container,mobile?
       (manualMobile?Math.max(byEntry,manualCopyProgress):byEntry):
       Math.max(byEntry,byScroll));
      // The clock starts when mobile copy actually comes into view.
      if(byEntry<1)request();
     }
    }
   }else{
    const hero=host.closest<HTMLElement>('.sx-v8-hero-slide');
    const heroRoot=hero?.closest<HTMLElement>('#top');
    if(hero&&heroRoot){
     const slides=Array.from(heroRoot.querySelectorAll('.sx-v8-hero-slide'));
     const index=slides.indexOf(hero);
     const scaled=Number(heroRoot.dataset.heroProgress||'0')*slides.length;
     progress=grouped(hero,clamp((scaled-index)/.72));
    }else{
     const group=host.closest<HTMLElement>(
      '.sx-v10-case-section,.sx-v10-case-cover,.sx-v10-case-evidence,.sx-v10-case-next,'+
      '.sx-v18-about-inner,.sx-v18-index-heading,.sx-v18-index-entry,'+
      '#contact,.sx-v14-editorial-copy,.sx-v14-ending-inner,.sx-v18-work-intro'
     );
     progress=group?viewportGroup(group):centerlineProgress(host);
     // The document's last visible text cannot always physically cross the
     // centerline (the browser runs out of scrollable space). Complete all
     // remaining on-screen text as soon as the actual page bottom is reached.
     const atBottom=window.scrollY>=
      document.documentElement.scrollHeight-window.innerHeight-4;
     if(atBottom&&host.getBoundingClientRect().top<window.innerHeight){
      progress=1;
     }
    }
   }
   // The incoming block must start blank; even a prior visit or a
   // browser scroll jump must not pre-complete its words during the hold.
   if(host.closest('[data-tour-awaiting="true"]'))progress=0;
   render(progress);
  };
  const invalidate=()=>{
   layoutCache=new WeakMap<HTMLElement,HTMLElement[][]>();
   request();
  };
  const observer=new IntersectionObserver(entries=>{
   if(entries.some(entry=>entry.isIntersecting)){
    window.addEventListener('scroll',request,{passive:true});
    window.addEventListener('resize',invalidate);
    request();
   }else{
    window.removeEventListener('scroll',request);
    window.removeEventListener('resize',invalidate);
    // If a text block is already above the centerline, complete it even
    // after a very fast swipe moved it outside the observer's root.
    if(!onIntro&&!workIndex&&!host.closest('[data-horizontal-chapter]')&&
       host.getBoundingClientRect().bottom<=window.innerHeight*.5)render(1);
   }
  },{rootMargin:'200px 0px 200px 0px',threshold:0});
  observer.observe(host);
  // Unlike IntersectionObserver, this synchronizes all three panels,
  // including those outside the horizontal viewport. On a backwards move
  // their future text is reset BEFORE the rail's next animation frame.
  // Synchronous updates avoid a one-frame flash of previously read text.
  if(horizontalChapter){
   horizontalChapter.addEventListener('sx-horizontal-progress',update);
  }
  if(workIndex)workIndex.addEventListener('sx-work-progress',update);
  caseStoryScene?.addEventListener('sx-case-reading-progress',update);
  biography?.addEventListener('sx-biography-reading-progress',update);
  const introCover=onIntro?host.closest<HTMLElement>('#intro'):null;
  introCover?.addEventListener('sx-mobile-intro-copy',invalidate);
  const sizing=new ResizeObserver(invalidate);
  sizing.observe(host);
  const onMotion=()=>reduced.matches?clear():request();
  reduced.addEventListener('change',onMotion);
  if(document.fonts)void document.fonts.ready.then(()=>{if(!disposed)invalidate();});
  if(reduced.matches)clear();else request();
  return()=>{
   disposed=true;
   observer.disconnect();sizing.disconnect();
   horizontalChapter?.removeEventListener('sx-horizontal-progress',update);
   workIndex?.removeEventListener('sx-work-progress',update);
   caseStoryScene?.removeEventListener('sx-case-reading-progress',update);
   biography?.removeEventListener('sx-biography-reading-progress',update);
   introCover?.removeEventListener('sx-mobile-intro-copy',invalidate);
   window.removeEventListener('scroll',request);
   window.removeEventListener('resize',invalidate);
   reduced.removeEventListener('change',onMotion);
   if(raf)cancelAnimationFrame(raf);
  };
 },[text,stagger,ready,authoredLines.length,mode]);

 const Tag=as;
 return <Tag id={id} ref={node=>{root.current=node;}}
  className={'sx-word-reveal sx-v18-line-reveal sx-v20-ordered '+className}>
  <span className="sx-word-a11y">{text}</span>
  <span className="sx-word-pieces" aria-hidden="true">
   {authoredLines.map((words,line)=><span key={line} data-reveal-line="" className="sx-v18-reveal-line">
    {words.map((word,i)=><span key={i} data-reveal-word="" className="sx-word-piece">
     {word}{i<words.length-1?' ':''}
    </span>)}
   </span>)}
  </span>
 </Tag>;
}
