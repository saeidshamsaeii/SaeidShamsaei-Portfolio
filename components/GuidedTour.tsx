'use client';
import {useEffect,useRef} from 'react';

type Stop={element:HTMLElement;label:string;fraction:number|null};
type Mode='playing'|'manual'|'paused'|'finished';
type Playback={index:number;elapsed:number;last:number;start:number;end:number;duration:number;arrivedAt:number;holdStartedAt:number|null};
const clamp=(x:number)=>Math.max(0,Math.min(1,x));
const READING_SPEED_PX_PER_SECOND=150;
const MIN_SEGMENT_MS=2400;
const IDLE_RESUME_MS=3500;
const BACKGROUND_PAUSE_MS=2000;
const INTRO_COPY_HOLD_MS=2000;
const HORIZONTAL_FRAME_PAUSE_MS=2000;
const SELECTED_WORK_HOLD_MS=2000;
const CASE_SCENE_COPY_MS=4200;
const BIOGRAPHY_COPY_MS=5400;
const BIOGRAPHY_HOLD_MS=2000;
const CASE_SCENE_HOLD_MS=2000;
const COPY_SETTLE_MAX_MS=2600;

function findStops():Stop[]{
 return Array.from(document.querySelectorAll<HTMLElement>('[data-tour-stop]')).map(element=>({
  element,label:element.dataset.tourLabel||'The story',
  fraction:element.dataset.tourProgress!==undefined?clamp(Number(element.dataset.tourProgress)):null
 }));
}
/** Identify the effective visible surface, not a decorative child background.
 * The pause belongs at the *change* of section background, not every slide.
 */
function visibleSurface(stop:Stop){
 const region=stop.element.closest<HTMLElement>(
  '#intro,#top,#about,#work-index,#selected-projects,#contact,[data-horizontal-chapter],.sx-v10-case-section,.sx-v10-case-cover'
 )||stop.element;
 let node:HTMLElement|null=stop.element;
 while(node){
  const color=getComputedStyle(node).backgroundColor;
  if(color&&color!=='transparent'&&color!=='rgba(0, 0, 0, 0)'){
   return color;
  }
  if(node===region)break;
  node=node.parentElement;
 }
 return getComputedStyle(region).backgroundColor;
}
function textHasFinished(stop:Stop){
 const words=Array.from(stop.element.querySelectorAll<HTMLElement>('.sx-word-reveal'));
 return words.every(element=>element.dataset.revealComplete==='true');
}
function scrollDestination(stop:Stop){
 const panel=stop.element.closest<HTMLElement>('[data-frame-index]');
 const horizontal=panel?.closest<HTMLElement>('[data-horizontal-chapter]');
 if(panel&&horizontal){
  // Each pinned frame has the same DOM top. Resolve its real vertical
  // position instead so both automatic and manual reading stay in sync.
  const count=Math.max(1,Number(horizontal.dataset.frameCount||'1'));
  const index=Math.max(0,Number(panel.dataset.frameIndex||'0'));
  const rect=horizontal.getBoundingClientRect();
  const top=rect.top+window.scrollY;
  const travel=Math.max(0,rect.height-window.innerHeight);
  // At .66 every WordReveal panel has completed its .64 reveal window,
  // but the next panel's sideways glide has not begun (.67 threshold).
  // The director can hold the fully visible panel before moving left.
  return top+travel*clamp((index+.66)/count);
 }
 const box=stop.element.getBoundingClientRect(),top=box.top+window.scrollY;
 // Selected Work is a single black, viewport-height editorial frame.
 // Stop at its actual TOP, not at the last row's centerline: otherwise the
 // headline and first project are pushed above the visible reading frame.
 if(stop.element.id==='work-index'){
  // Traverse the entire sticky scroll runway. The five row reveals now
  // advance with scroll position in BOTH directions, not with wall time.
  return top+Math.max(0,box.height-window.innerHeight);
 }
 if(stop.element.id==='about'){
  // A short one-screen biography stops at its TOP. On small/zoomed screens
  // that require extra height, visit the BOTTOM instead of halting halfway.
  return top+Math.max(0,box.height-window.innerHeight);
 }
 // A case-study cover is the opening reading frame, even when its height
 // is a little shorter than the visual viewport below navigation.
 if(stop.element.classList.contains('sx-v31-case-cover'))return Math.max(0,top);
 // The owner name, surname and concise role are an ordered introduction,
 // not three unrelated reveals rushed past by the automatic director.
 if(stop.element.id==='intro'){
  // The introduction must remain at its original viewport position.
  // Its portrait and type are revealed in place; only the NEXT stop scrolls.
  return top;
 }
 if(stop.fraction!==null){
  const stage=stop.element.closest<HTMLElement>('#top')||stop.element;
  return stage.getBoundingClientRect().top+window.scrollY+
   Math.max(0,stage.getBoundingClientRect().height-window.innerHeight)*stop.fraction;
 }
 const room=Math.max(0,box.height-window.innerHeight*.82);
 return top-window.innerHeight*.09+room;
}

/**
 * Headless guided scroll at a moderate, distance-based pace instead of
 * accelerating and braking on every scene. Native manual scroll remains free.
 * Every genuine interaction suspends playback; after 3.5s idle, the director
 * finds the next stop AHEAD OF THE CURRENT scrollY (never jumps to the start).
 * Press Escape to pause scripted motion. Reduced-motion never starts it.
 */
export function GuidedTour({active,onExit}:{active:boolean;onExit:()=>void}){
 const onExitRef=useRef(onExit);
 onExitRef.current=onExit;

 useEffect(()=>{
  if(!active)return;
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){onExitRef.current();return;}
  const stops=findStops();
  if(!stops.length){onExitRef.current();return;}
  const root=document.documentElement;
  const state:Playback={index:0,elapsed:0,last:0,start:window.scrollY,end:0,duration:8000,arrivedAt:0,holdStartedAt:null};
  let playback:Mode='playing';
  let raf=0, idleTimer:ReturnType<typeof setTimeout>|undefined;
  let scriptedScroll=-1, touchActive=false, disposed=false;
  const introMobile=window.matchMedia('(max-width:760px)').matches;
  const introCover=stops.find(stop=>stop.element.id==='intro')?.element;
  const caseCover=stops.find(stop=>stop.element.classList.contains('sx-v31-case-cover'))?.element;
  const revealMobileCopy=()=>{
   if(!introMobile||!introCover||introCover.dataset.mobilePhotoPhase==='copy')return;
   introCover.dataset.mobilePhotoPhase='copy';
   introCover.dataset.mobileCopyStartedAt=String(performance.now());
   introCover.dispatchEvent(new Event('sx-mobile-intro-copy'));
  };
  // A returning visitor at a saved scroll position must not have copy hidden.
  if(introMobile&&window.scrollY>12)revealMobileCopy();
  // A pause is required for every marked horizontal panel, even between
  // black panels. A color transition also requires one pause. Both reasons
  // share ONE hold at a stop (never two consecutive two-second delays).
  const hasBackgroundChange=stops.map((stop,index)=>
   index<stops.length-1&&visibleSurface(stop)!==visibleSurface(stops[index+1])
  );
  const isHorizontalFrame=stops.map(stop=>
   stop.element.dataset.tourHold==='horizontal-frame'
  );
  const isCaseScene=stops.map(stop=>stop.element.dataset.tourHold==='case-scene');
  const isBiography=stops.map(stop=>stop.element.dataset.tourHold==='biography');
  // While the automatic director reads the current block, the NEXT block
  // is a blank canvas: its copy cannot peek into the viewport below.
  // This is removed immediately for manual scrolling and reduced motion.
  let awaitingNext:HTMLElement|null=null;
  let awaitingLater:HTMLElement[]=[];
  const clearAwaiting=()=>{
   if(awaitingNext)delete awaitingNext.dataset.tourAwaiting;
   for(const later of awaitingLater)delete later.dataset.tourAwaiting;
   awaitingNext=null;
   awaitingLater=[];
  };
  const reserveNext=(index:number)=>{
   clearAwaiting();
   const next=stops[index+1]?.element;
   if(next){
    awaitingNext=next;
    awaitingNext.dataset.tourAwaiting='true';
   }
   // Do not reveal any more distant section just because the viewport is
   // tall or the current stop is short. Every future beat stays blank until
   // it becomes the active stop; manual input removes all reservations.
   for(const later of stops.slice(index+2)){
    later.element.dataset.tourAwaiting='true';
    awaitingLater.push(later.element);
   }
  };
  const setPlayback=(next:Mode)=>{
   if(playback===next)return;
   playback=next;
   root.dataset.portfolioTour=next;
   if(next!=='playing'){
    delete root.dataset.portfolioTourHold;
    clearAwaiting();
   }
  };
  const maxScroll=()=>Math.max(0,document.documentElement.scrollHeight-window.innerHeight);
  const target=(index:number)=>{
   let destination=scrollDestination(stops[index]);
   const stop=stops[index];
   // Finish every line before changing black ↔ white. Pinned horizontal
   // panels and the Linux stage use their own normalized frame positions.
   if(hasBackgroundChange[index]&&stop.element.id!=='work-index'&&stop.element.id!=='intro'&&
      !stop.element.closest('[data-frame-index],.sx-v8-hero-slide')){
    const lines=Array.from(stop.element.querySelectorAll<HTMLElement>('.sx-word-reveal'));
    const last=lines[lines.length-1];
    if(last){
     const rect=last.getBoundingClientRect();
     const finishAt=rect.top+window.scrollY+rect.height*.5-window.innerHeight*.5;
     destination=Math.max(destination,finishAt);
    }
   }
   return clamp(destination/Math.max(1,maxScroll()))*maxScroll();
  };

  const goTo=(index:number,from=window.scrollY)=>{
   state.index=index;
   reserveNext(index);
   state.elapsed=0;
   state.last=0;
   state.arrivedAt=0;
   state.holdStartedAt=null;
   delete root.dataset.portfolioTourHold;
   if(isBiography[index]){
    stops[index].element.dataset.bioReadingProgress='0';
    stops[index].element.dispatchEvent(new Event('sx-biography-reading-progress'));
   }
   if(isCaseScene[index]){
    // Never start typing the NEXT case study scene before its camera arrives.
    stops[index].element.dataset.caseSceneProgress='0';
    stops[index].element.dispatchEvent(new Event('sx-case-reading-progress'));
   }
   state.start=from;
   state.end=target(index);
   // Desktop waits for the side-by-side copy to finish, then holds for 2s.
   // On mobile, the photo's initial two-second pause has finished before
   // GuidedTour mounts; typed copy is read inside the SAME opening block.
   // Use actual travel distance to prevent one section racing while the
   // next crawls. Keep a bounded minimum for short reading beats.
   const distance=Math.abs(state.end-state.start);
   const words=stops[index].element.querySelectorAll('[data-reveal-word]').length;
   const modestReadingMs=Math.min(6000,words*120);
   const openingMs=stops[index].element.id==='intro'?3400:MIN_SEGMENT_MS;
   state.duration=Math.max(openingMs,modestReadingMs,
    distance/READING_SPEED_PX_PER_SECOND*1000);
  };
  const findNextFromScroll=()=>{
   const y=window.scrollY;
   for(let i=0;i<stops.length;i++){
    if(target(i)>y+12)return i;
   }
   return -1;
  };
  const clearIdle=()=>{
   if(idleTimer!==undefined){clearTimeout(idleTimer);idleTimer=undefined;}
  };
  const resumeFromHere=()=>{
   clearIdle();
   if(disposed||document.hidden||touchActive||playback==='paused'||playback==='finished')return;
   const next=findNextFromScroll();
   if(next<0){
    setPlayback('finished');
    onExitRef.current();
    return;
   }
   goTo(next);
   setPlayback('playing');
  };
  const scheduleResume=()=>{
   clearIdle();
   if(playback!=='manual'||document.hidden||touchActive)return;
   idleTimer=setTimeout(resumeFromHere,IDLE_RESUME_MS);
  };
  const temporarilyYield=()=>{
   if(playback==='paused'||playback==='finished')return;
   // User scrolling or touching during the mobile photo pause skips autoplay
   // but must never leave the text hidden behind the photo-only phase.
   if(introMobile)revealMobileCopy();
   setPlayback('manual');
   // An in-flight playback frame must not advance from an old position.
   state.last=0;
   scheduleResume();
  };
  const manualInput=(event:Event)=>{
   if(event.target instanceof Element&&event.target.closest('.sx-guided-tour'))return;
   temporarilyYield();
  };
  const onTouchStart=(event:TouchEvent)=>{
   if(event.target instanceof Element&&event.target.closest('.sx-guided-tour'))return;
   touchActive=true;
   temporarilyYield();
   clearIdle();
  };
  const onTouchEnd=()=>{
   touchActive=false;
   if(playback==='manual')scheduleResume();
  };
  const onScroll=()=>{
   // Catch scroll-bar dragging and other genuine scroll commands as well as
   // wheel/keyboard gestures. Ignore our own scrollTo-generated events.
   if(playback==='paused'||playback==='finished')return;
   if(playback==='playing'&&Math.abs(window.scrollY-scriptedScroll)<3)return;
   temporarilyYield();
  };
  const onKey=(event:KeyboardEvent)=>{
   if(event.target instanceof Element&&event.target.closest('.sx-guided-tour'))return;
   if(['ArrowDown','ArrowUp','PageDown','PageUp',' ','Home','End'].includes(event.key)){
    temporarilyYield();
   }
   if(event.key==='Escape'){
    clearIdle();
    if(introMobile)revealMobileCopy();
    setPlayback('paused');
   }
  };
  const onVisibility=()=>{
   if(document.hidden){
    clearIdle();
    if(playback==='playing'||playback==='manual')setPlayback('manual');
   }else if(playback==='manual')scheduleResume();
  };

  const frame=(time:number)=>{
   if(disposed)return;
   if(playback==='playing'&&!document.hidden){
    // The opening is one stationary composition on BOTH desktop and mobile.
    // Never move the camera while typing. The visible links are the final
    // beat: they appear only once the entire introduction is complete.
    if(state.index===0&&introCover&&state.start<=12&&window.scrollY<=12){
     state.last=time;
     scriptedScroll=window.scrollY;
     const copyEnabled=!introMobile||introCover.dataset.mobilePhotoPhase==='copy';
     const fullCopyReady=copyEnabled&&textHasFinished(stops[0])&&
      Boolean(introCover.querySelector('.sx-v18-cover-lead[data-reveal-complete="true"]'));
     if(fullCopyReady){
      if(state.holdStartedAt===null){
       state.holdStartedAt=time;
       root.dataset.portfolioTourHold='intro-copy';
      }
      // Links are now visible in their reserved position, so the viewer
      // gets two uninterrupted seconds with the COMPLETE first block.
      if(time-state.holdStartedAt>=INTRO_COPY_HOLD_MS){
       delete root.dataset.portfolioTourHold;
       if(stops.length>1)goTo(1,window.scrollY);
       else {setPlayback('finished');onExitRef.current();return;}
      }
     }
     raf=requestAnimationFrame(frame);
     return;
    }
    const delta=state.last?Math.min(100,time-state.last):0;
    state.last=time;
    // Distance-based moderate pace; there is no per-stop speed multiplier
    // that could make the start artificially fast and later sections slow.
    state.elapsed+=delta;
    const fraction=clamp(state.elapsed/state.duration);
    // One continuous camera move, not the old repeated stop/ease/hold pattern
    // that appeared fake at every chapter. Variation comes from the smoothed
    // physical scroll pace, not from restarting a CSS easing on each panel.
    scriptedScroll=state.start+(state.end-state.start)*fraction;
    window.scrollTo({top:scriptedScroll,behavior:'instant'});
    // Small screens may need a taller biography. Read its opening lines
    // while the camera travels through it, never hide those lines until
    // after the camera has passed them.
    if(isBiography[state.index]&&fraction<1){
     const stop=stops[state.index].element;
     if(stop.getBoundingClientRect().height>window.innerHeight+12){
      stop.dataset.bioReadingProgress=String(clamp(fraction*.72));
      stop.dispatchEvent(new Event('sx-biography-reading-progress'));
     }
    }
    if(fraction>=1){
     if(state.index===stops.length-1){
      setPlayback('finished');onExitRef.current();return;
     }
     const horizontalHold=isHorizontalFrame[state.index];
     const caseSceneHold=isCaseScene[state.index];
     const biographyHold=isBiography[state.index];
     const backgroundHold=hasBackgroundChange[state.index];
     // This black one-screen directory always gets its OWN reading hold,
     // even if a future theme change removes the white following section.
     const selectedWorkHold=stops[state.index].element.id==='work-index';
     // Mobile copy waits for actual typing completion, not another two-
     // second photo hold; the photo pause already happened before travel.
     const mobileIntroCopy=state.index===0&&introMobile&&Boolean(introCover);
     if(horizontalHold||backgroundHold||mobileIntroCopy||selectedWorkHold||caseSceneHold||biographyHold){
      if(!state.arrivedAt)state.arrivedAt=time;
      if(biographyHold){
       const stop=stops[state.index].element;
       const tall=stop.getBoundingClientRect().height>window.innerHeight+12;
       const initial=tall?.72:0;
       const amount=clamp(initial+(1-initial)*(time-state.arrivedAt)/BIOGRAPHY_COPY_MS);
       stop.dataset.bioReadingProgress=String(amount);
       stop.dispatchEvent(new Event('sx-biography-reading-progress'));
      }
      if(caseSceneHold){
       // Same ordered WordReveal typing as the homepage, but in a fixed
       // reading frame: title finishes before description, then hold 2s.
       const amount=clamp((time-state.arrivedAt)/CASE_SCENE_COPY_MS);
       const stop=stops[state.index].element;
       stop.dataset.caseSceneProgress=String(amount);
       stop.dispatchEvent(new Event('sx-case-reading-progress'));
      }
      // Wait for genuine text completion on the mobile intro and
      // all strict reading stages; no arbitrary timeout for the copy.
      const strictCopy=horizontalHold||mobileIntroCopy||selectedWorkHold||caseSceneHold||biographyHold;
      const workFullyFramed=!selectedWorkHold||(()=>{
       const rect=stops[state.index].element.getBoundingClientRect();
       // Short landscape windows cannot fit the whole section: never
       // strand playback, but ordinary screens require the full black card.
       return rect.height>innerHeight+12||
        (rect.top>=-12&&rect.bottom<=innerHeight+12);
      })();
      // Reading is complete only after the directory's own animation
      // reaches its final frame AND every title/description acknowledges it.
      // No time-based fallback may ever start this particular hold early.
      const workTypingFinished=!selectedWorkHold||
       Number(stops[state.index].element.dataset.workRevealProgress||'0')>=.999;
      if(workFullyFramed&&workTypingFinished&&
         (textHasFinished(stops[state.index])||
          (!strictCopy&&time-state.arrivedAt>=COPY_SETTLE_MAX_MS))){
       if(state.holdStartedAt===null){
        state.holdStartedAt=time;
        root.dataset.portfolioTourHold=mobileIntroCopy?'intro-copy':
         selectedWorkHold?'selected-work':
         caseSceneHold?'case-scene':
         biographyHold?'biography':
         horizontalHold?'horizontal-frame':'background-change';
       }
       const duration=mobileIntroCopy?0:
        selectedWorkHold?SELECTED_WORK_HOLD_MS:
        caseSceneHold?CASE_SCENE_HOLD_MS:
        biographyHold?BIOGRAPHY_HOLD_MS:
        horizontalHold?HORIZONTAL_FRAME_PAUSE_MS:BACKGROUND_PAUSE_MS;
       if(time-state.holdStartedAt>=duration){
        delete root.dataset.portfolioTourHold;
        goTo(state.index+1);
       }
      }
     }else{
      goTo(state.index+1);
     }
    }
   }else state.last=0;
   raf=requestAnimationFrame(frame);
  };

  root.dataset.portfolioTour='playing';
  // At the top of the homepage the intro is a reading stop even though its
  // new (stationary) scroll destination equals current scrollY.
  const first=introCover&&window.scrollY<=12?
   stops.findIndex(stop=>stop.element===introCover):
   caseCover&&window.scrollY<=12?
   stops.findIndex(stop=>stop.element===caseCover):
   findNextFromScroll();
  if(first>=0){goTo(first);scriptedScroll=window.scrollY;}
  else {setPlayback('finished');onExitRef.current();return;}
  window.addEventListener('wheel',manualInput,{passive:true});
  window.addEventListener('touchstart',onTouchStart,{passive:true});
  window.addEventListener('touchmove',manualInput,{passive:true});
  window.addEventListener('touchend',onTouchEnd,{passive:true});
  window.addEventListener('touchcancel',onTouchEnd,{passive:true});
  window.addEventListener('keydown',onKey);
  window.addEventListener('scroll',onScroll,{passive:true});
  document.addEventListener('pointerdown',manualInput);
  document.addEventListener('visibilitychange',onVisibility);
  raf=requestAnimationFrame(frame);
  return()=>{
   disposed=true;clearIdle();cancelAnimationFrame(raf);
   delete root.dataset.portfolioTour;
   delete root.dataset.portfolioTourHold;
   clearAwaiting();
   window.removeEventListener('wheel',manualInput);
   window.removeEventListener('touchstart',onTouchStart);
   window.removeEventListener('touchmove',manualInput);
   window.removeEventListener('touchend',onTouchEnd);
   window.removeEventListener('touchcancel',onTouchEnd);
   window.removeEventListener('keydown',onKey);
   window.removeEventListener('scroll',onScroll);
   document.removeEventListener('pointerdown',manualInput);
   document.removeEventListener('visibilitychange',onVisibility);
  };
 },[active]);

 // The tour is deliberately headless. It still performs the complete
 // automatic native-scroll narrative, yields to user input, and resumes
 // after idle without rendering any on-screen playback controls.
 return null;
}
