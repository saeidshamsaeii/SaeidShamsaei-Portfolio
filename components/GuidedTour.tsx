'use client';
import {useEffect,useRef,useState} from 'react';

type Stop={element:HTMLElement;label:string;seconds:number;fraction:number|null};
type Playback={index:number;elapsed:number;last:number;start:number;end:number;duration:number};
const clamp=(x:number)=>Math.max(0,Math.min(1,x));
const format=(n:number)=>String(n).padStart(2,'0');

function findStops():Stop[]{
 return Array.from(document.querySelectorAll<HTMLElement>('[data-tour-stop]')).map(element=>({
  element,label:element.dataset.tourLabel||'The story',
  seconds:Math.max(4,Math.min(24,Number(element.dataset.tourDuration)||9)),
  fraction:element.dataset.tourProgress!==undefined?clamp(Number(element.dataset.tourProgress)):null
 }));
}
function scrollDestination(stop:Stop){
 const box=stop.element.getBoundingClientRect(),top=box.top+window.scrollY;
 if(stop.fraction!==null){
  const stage=stop.element.closest<HTMLElement>('#top')||stop.element;
  return stage.getBoundingClientRect().top+window.scrollY+
   Math.max(0,stage.getBoundingClientRect().height-window.innerHeight)*stop.fraction;
 }
 const room=Math.max(0,box.height-window.innerHeight*.82);
 return top-window.innerHeight*.09+room;
}

/**
 * One default-on narrative director shared by home and case-study pages.
 * Nothing starts for reduced-motion visitors. Manual wheel, swipe, key,
 * click on page content, page visibility loss and Exit return user control.
 * All movement is real scrollY; word reveal observes the same scroll.
 */
export function GuidedTour({active,onExit}:{active:boolean;onExit:()=>void}){
 const [paused,setPaused]=useState(false);
 const [speed,setSpeed]=useState<1|1.5|2>(1);
 const [step,setStep]=useState(0);
 const [percent,setPercent]=useState(0);
 const [label,setLabel]=useState('Introduction');
 const [count,setCount]=useState(0);
 const pausedRef=useRef(false);
 const speedRef=useRef<number>(1);
 const onExitRef=useRef(onExit);
 onExitRef.current=onExit;
 useEffect(()=>{
  if(!active)return;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  if(reduced.matches){onExitRef.current();return;}
  const stops=findStops();
  if(!stops.length){onExitRef.current();return;}
  setStep(0);setPercent(0);setCount(stops.length);setLabel(stops[0].label);
  pausedRef.current=false;setPaused(false);
  speedRef.current=1;setSpeed(1);
  const root=document.documentElement;
  root.dataset.portfolioTour='running';
  let raf=0;
  const state:Playback={index:0,elapsed:0,last:0,start:window.scrollY,end:0,duration:stops[0].seconds*1000};
  const initialize=(i:number)=>{
   const stop=stops[i];
   setStep(i);setLabel(stop.label);
   state.index=i;state.elapsed=0;state.last=0;
   state.start=window.scrollY;
   state.end=scrollDestination(stop);
   state.duration=stop.seconds*1000;
  };
  initialize(0);
  const frame=(time:number)=>{
   if(root.dataset.portfolioTour!=='running')return;
   const delta=state.last?Math.min(100,time-state.last):0;
   state.last=time;
   if(!pausedRef.current){
    state.elapsed+=delta*speedRef.current;
    const f=clamp(state.elapsed/state.duration);
    // Deliberate forward movement that reads like a slow dolly shot,
    // followed by a short reading hold at the end of each chapter.
    const movement=clamp(f/.83);
    const ease=movement*movement*(3-2*movement);
    window.scrollTo({top:state.start+(state.end-state.start)*ease,behavior:'instant'});
    setPercent((state.index+f)/stops.length);
    if(f>=1){
     if(state.index===stops.length-1){onExitRef.current();return;}
     initialize(state.index+1);
    }
   }
   raf=requestAnimationFrame(frame);
  };
  const leave=()=>onExitRef.current();
  const onKey=(e:KeyboardEvent)=>{
   if(e.key==='Escape'||['ArrowDown','ArrowUp','PageDown','PageUp',' ','Home','End'].includes(e.key))leave();
  };
  const onPointer=(e:PointerEvent)=>{
   if(e.target instanceof Element&&!e.target.closest('.sx-guided-tour'))leave();
  };
  const onVisibility=()=>{
   if(document.hidden&&!pausedRef.current){pausedRef.current=true;setPaused(true);}
  };
  window.addEventListener('wheel',leave,{passive:true});
  window.addEventListener('touchstart',leave,{passive:true});
  window.addEventListener('keydown',onKey);
  document.addEventListener('pointerdown',onPointer);
  document.addEventListener('visibilitychange',onVisibility);
  raf=requestAnimationFrame(frame);
  return()=>{
   cancelAnimationFrame(raf);delete root.dataset.portfolioTour;
   window.removeEventListener('wheel',leave);
   window.removeEventListener('touchstart',leave);
   window.removeEventListener('keydown',onKey);
   document.removeEventListener('pointerdown',onPointer);
   document.removeEventListener('visibilitychange',onVisibility);
  };
 },[active]);
 if(!active)return null;
 return <aside className="sx-guided-tour sx-v10-tour" role="region" aria-label="Guided portfolio tour">
  <span className="sx-tour-kicker">AUTOMATIC STORY <b>{format(step+1)} / {format(count)}</b></span>
  <div className="sx-tour-status"><strong>{label}</strong><span>{paused?'PAUSED':'PLAYING'}</span></div>
  <div className="sx-tour-track" role="progressbar" aria-label="Tour progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(percent*100)}>
   <span style={{width:percent*100+'%'}}/>
  </div>
  <div className="sx-tour-actions">
   <button type="button" onClick={()=>{pausedRef.current=!pausedRef.current;setPaused(pausedRef.current);}} aria-label={paused?'Resume tour':'Pause tour'}>{paused?'▶ RESUME':'Ⅱ PAUSE'}</button>
   <button type="button" onClick={onExit} aria-label="Exit guided tour">✕ EXPLORE MANUALLY</button>
  </div>
  <button type="button" className="sx-tour-speed" onClick={()=>{const next=speed===1?1.5:speed===1.5?2:1;setSpeed(next);speedRef.current=next;}} aria-label="Change tour speed">
   PLAYBACK / {speed}×
  </button>
  <small>Scroll, touch or press Esc to take control. All chapters stay readable.</small>
 </aside>;
}
