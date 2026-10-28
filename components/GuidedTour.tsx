'use client';
import {useEffect,useRef} from 'react';

type Stop={element:HTMLElement;label:string;fraction:number|null};
type Mode='playing'|'manual'|'paused'|'finished';
type Playback={index:number;elapsed:number;last:number;start:number;end:number;duration:number;arrivedAt:number;holdStartedAt:number|null};
const clamp=(x:number)=>Math.max(0,Math.min(1,x));
const READING_SPEED_PX_PER_SECOND=205;
const MIN_SEGMENT_MS=1700;
const IDLE_RESUME_MS=3500;
const BACKGROUND_PAUSE_MS=2000;
const HORIZONTAL_FRAME_PAUSE_MS=2000;
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
 // The owner name, surname and concise role are an ordered introduction,
 // not three unrelated reveals rushed past by the automatic director.
 if(stop.element.id==='intro')return top+box.height*.72;
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
  let openingAlreadyPresented=false;
  // A pause is required for every marked horizontal panel, even between
  // black panels. A color transition also requires one pause. Both reasons
  // share ONE hold at a stop (never two consecutive two-second delays).
  const hasBackgroundChange=stops.map((stop,index)=>
   index<stops.length-1&&visibleSurface(stop)!==visibleSurface(stops[index+1])
  );
  const isHorizontalFrame=stops.map(stop=>
   stop.element.dataset.tourHold==='horizontal-frame'
  );
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
   if(hasBackgroundChange[index]&&
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
   state.start=from;
   state.end=target(index);
   // Show the real name and adjacent introductory sentence before the
   // camera starts moving. This is a one-time first-screen hold, not a
   // slow segment speed or a recurring stop between chapters.
   if(index===0&&!openingAlreadyPresented&&window.scrollY<12){
    state.elapsed=-2350;
    openingAlreadyPresented=true;
   }
   // Use actual travel distance to prevent one section racing while the
   // next crawls. Keep a bounded minimum for short reading beats.
   const distance=Math.abs(state.end-state.start);
   const words=stops[index].element.querySelectorAll('[data-reveal-word]').length;
   const modestReadingMs=Math.min(3300,words*55);
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
    if(fraction>=1){
     if(state.index===stops.length-1){
      setPlayback('finished');onExitRef.current();return;
     }
     const horizontalHold=isHorizontalFrame[state.index];
     const backgroundHold=hasBackgroundChange[state.index];
     if(horizontalHold||backgroundHold){
      if(!state.arrivedAt)state.arrivedAt=time;
      // Reveal the heading, then each successive line. Only when the
      // complete current panel is readable do we start its 2s hold.
      // A short safety bound handles missing intersection callbacks.
      if(textHasFinished(stops[state.index])||
         time-state.arrivedAt>=COPY_SETTLE_MAX_MS){
       if(state.holdStartedAt===null){
        state.holdStartedAt=time;
        root.dataset.portfolioTourHold=horizontalHold?'horizontal-frame':'background-change';
       }
       const duration=horizontalHold?HORIZONTAL_FRAME_PAUSE_MS:BACKGROUND_PAUSE_MS;
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
  const first=findNextFromScroll();
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
