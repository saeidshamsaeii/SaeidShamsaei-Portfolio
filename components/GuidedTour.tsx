'use client';
import {useEffect,useRef,useState} from 'react';

type Stop={element:HTMLElement;label:string;seconds:number;pace:number;fraction:number|null};
type Mode='playing'|'manual'|'paused'|'finished';
type Playback={index:number;elapsed:number;last:number;start:number;end:number;duration:number};
const clamp=(x:number)=>Math.max(0,Math.min(1,x));
const format=(n:number)=>String(n).padStart(2,'0');
const BASE_SPEED=2 as const;
const paceBound=(value:number)=>Math.max(.58,Math.min(1.55,Number.isFinite(value)?value:1));
const IDLE_RESUME_MS=3500;

function findStops():Stop[]{
 return Array.from(document.querySelectorAll<HTMLElement>('[data-tour-stop]')).map(element=>({
  element,label:element.dataset.tourLabel||'The story',
  seconds:Math.max(4,Math.min(24,Number(element.dataset.tourDuration)||9)),
  pace:paceBound(Number(element.dataset.tourPace||'1')),
  fraction:element.dataset.tourProgress!==undefined?clamp(Number(element.dataset.tourProgress)):null
 }));
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
  return top+travel*clamp((index+.68)/count);
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
 * Default-on cinematic scroll with an underlying 2x tempo and per-scene
 * variable speed ramps. Native bidirectional scroll always remains free.
 * Every genuine interaction suspends playback; after 3.5s idle, the director
 * finds the next stop AHEAD OF THE CURRENT scrollY (never jumps to the start).
 * A deliberate top-bar Pause or Exit remains available for accessibility.
 * Reduced-motion never starts the director.
 */
export function GuidedTour({active,onExit}:{active:boolean;onExit:()=>void}){
 const [mode,setMode]=useState<Mode>('playing');
 const [surface,setSurface]=useState<'light'|'dark'>('light');
 const [step,setStep]=useState(0);
 const [label,setLabel]=useState('Introduction');
 const [count,setCount]=useState(0);
 const onExitRef=useRef(onExit);
 onExitRef.current=onExit;
 const explicitResumeRef=useRef<()=>void>(()=>{});
 const explicitPauseRef=useRef<()=>void>(()=>{});

 useEffect(()=>{
  if(!active)return;
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){onExitRef.current();return;}
  const stops=findStops();
  if(!stops.length){onExitRef.current();return;}
  const root=document.documentElement;
  const state:Playback={index:0,elapsed:0,last:0,start:window.scrollY,end:0,duration:8000};
  let playback:Mode='playing';
  let raf=0, idleTimer:ReturnType<typeof setTimeout>|undefined;
  let scriptedScroll=-1, hudAt=0, touchActive=false, disposed=false;
  let currentSpeed=BASE_SPEED,targetSpeed=BASE_SPEED;
  const refreshSurface=()=>{
   const sampleY=window.innerHeight*.45;
   const light=['intro','about','work-index','selected-projects','contact'].some(id=>{
    const element=document.getElementById(id);if(!element)return false;
    const rect=element.getBoundingClientRect();
    return rect.top<=sampleY&&rect.bottom>=sampleY;
   });
   setSurface(previous=>previous===(light?'light':'dark')?previous:(light?'light':'dark'));
  };

  const setPlayback=(next:Mode)=>{
   if(playback===next)return;
   playback=next;
   root.dataset.portfolioTour=next;
   setMode(next);
  };
  const maxScroll=()=>Math.max(0,document.documentElement.scrollHeight-window.innerHeight);
  const target=(index:number)=>clamp(scrollDestination(stops[index])/Math.max(1,maxScroll()))*maxScroll();

  const goTo=(index:number,from=window.scrollY)=>{
   state.index=index;
   state.elapsed=0;
   state.last=0;
   state.start=from;
   state.end=target(index);
   // The destination and chapter pacing are recalculated from current scrollY.
   targetSpeed=BASE_SPEED*stops[index].pace;
   // Natural narration cannot reveal fifty words in a three-second drive-by.
   // Give long source-backed passages actual reading time, but bound a large
   // About section so a single stop does not monopolize the whole tour.
   const words=stops[index].element.querySelectorAll('[data-reveal-word]').length;
   const readingMs=Math.min(18000,(words/4.5)*1000);
   state.duration=Math.max(stops[index].seconds*1000,readingMs*targetSpeed);
   setStep(index);
   setLabel(stops[index].label);
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
   refreshSurface();
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
  explicitPauseRef.current=()=>{
   clearIdle();setPlayback('paused');
  };
  explicitResumeRef.current=()=>{
   if(playback==='paused'){
    setPlayback('manual');
    resumeFromHere();
   }
  };
  const frame=(time:number)=>{
   if(disposed)return;
   if(playback==='playing'&&!document.hidden){
    const delta=state.last?Math.min(100,time-state.last):0;
    state.last=time;
    // Continuously ramp velocity across narrative beats without instant changes.
    currentSpeed+=(targetSpeed-currentSpeed)*Math.min(1,delta/800);
    state.elapsed+=delta*currentSpeed;
    const fraction=clamp(state.elapsed/state.duration);
    // One continuous camera move, not the old repeated stop/ease/hold pattern
    // that appeared fake at every chapter. Variation comes from the smoothed
    // physical scroll pace, not from restarting a CSS easing on each panel.
    scriptedScroll=state.start+(state.end-state.start)*fraction;
    window.scrollTo({top:scriptedScroll,behavior:'instant'});
    if(time-hudAt>100){
     hudAt=time;
     refreshSurface();
    }
    if(fraction>=1){
     if(state.index===stops.length-1){
      setPlayback('finished');onExitRef.current();return;
     }
     goTo(state.index+1);
    }
   }else state.last=0;
   raf=requestAnimationFrame(frame);
  };

  setStep(0);setCount(stops.length);setLabel(stops[0].label);
  refreshSurface();
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

 if(!active)return null;
 return <aside className="sx-guided-tour sx-v11-tour" role="region" aria-label="Guided portfolio tour"
  data-playback={mode} data-surface={surface}>
  <span className="sx-v11-top-label" title={label}>
   {mode==='manual'?'EXPLORING — AUTO RESUMES':mode==='paused'?'TOUR PAUSED':'AUTO STORY'} · {format(step+1)}/{format(count)} · {label}
  </span>
  <button type="button" className="sx-v11-top-button"
   onClick={()=>{if(mode==='paused')explicitResumeRef.current();else explicitPauseRef.current();}}
   aria-label={mode==='paused'?'Resume tour':'Pause tour'} title={mode==='paused'?'Resume':'Pause'}>
   {mode==='paused'?'▶':'Ⅱ'}
  </button>
  <button type="button" className="sx-v11-top-button sx-v11-top-exit"
   onClick={onExit} aria-label="Exit guided tour" title="Disable automatic scrolling">×</button>
 </aside>;
}
