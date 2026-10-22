'use client';
import {useEffect,useMemo,useRef,useState} from 'react';

type Stop={id:string;label:string;fraction?:number};
const order:Stop[]=[
 {id:'top',label:'The idea',fraction:0},{id:'top',label:'How I work',fraction:.78},
 {id:'about',label:'About Saeid'},
 ...(['gartal','factory','digirezhim','petiwoo'] as const).flatMap(id=>
  [0,.25,.5,.75,1].map((fraction,i)=>({id:'project-'+id,label:id.toUpperCase()+' · '+(i+1)+'/5',fraction}))),
 {id:'approach',label:'My approach'},{id:'contact',label:'Let’s connect'}
];
const clamp=(x:number)=>Math.min(1,Math.max(0,x));
function destination(stop:Stop){
 const target=document.getElementById(stop.id);
 if(!target)return window.scrollY;
 const top=target.getBoundingClientRect().top+window.scrollY;
 if(stop.id==='top')return top+Math.max(0,target.getBoundingClientRect().height-window.innerHeight)*(stop.fraction||0);
 if(stop.id.startsWith('project-')){
  const sticky=target.querySelector<HTMLElement>('.sx-chapter-sticky');
  const travel=Math.max(0,target.getBoundingClientRect().height-(sticky?.getBoundingClientRect().height||window.innerHeight));
  return top+travel*(stop.fraction||0);
 }
 return top;
}
export function GuidedTour({active,onExit}:{active:boolean;onExit:()=>void}){
 const [paused,setPaused]=useState(false);
 const [index,setIndex]=useState(0);
 const [fraction,setFraction]=useState(0);
 const runtime=useRef({index:0,elapsed:0,previous:0,startY:0,endY:0});
 const pausedRef=useRef(false);
 const onExitRef=useRef(onExit);
 onExitRef.current=onExit;
 const label=useMemo(()=>order[index]?.label||'Finishing', [index]);
 useEffect(()=>{
  if(!active)return;
  // Replays always begin from a playing state, not a prior session's pause.
  pausedRef.current=false;
  setPaused(false);
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){onExitRef.current();return;}
  const root=document.documentElement;
  root.dataset.portfolioTour='running';
  let raf=0;
  const state=runtime.current;state.index=0;state.elapsed=0;state.previous=0;state.startY=window.scrollY;state.endY=destination(order[0]);
  window.scrollTo({top:0,behavior:'instant'});
  let lastIndex=-1;
  // Each step is a paced, fully controlled narrative. Users can exit or pause;
  // manual wheel, swipe, or keyboard returns control to native browsing.
  const tick=(now:number)=>{
   if(root.dataset.portfolioTour!=='running')return;
   if(!pausedRef.current){
    const delta=state.previous?Math.min(80,now-state.previous):0;
    state.elapsed+=delta;
    const stop=order[state.index];
    const hold=state.index===0?700:520;
    const duration=state.index===0?1000:2300;
    if(state.index!==lastIndex){
     lastIndex=state.index;setIndex(state.index);
     state.startY=window.scrollY;state.endY=destination(stop);
    }
    const f=clamp(state.elapsed/duration);
    const ease=f*f*(3-2*f);
    window.scrollTo({top:state.startY+(state.endY-state.startY)*ease,behavior:'instant'});
    setFraction((state.index+f)/order.length);
    if(state.elapsed>=duration+hold){
     state.index++;
     state.elapsed=0;
     if(state.index>=order.length){onExitRef.current();return;}
    }
   }
   state.previous=now;
   raf=requestAnimationFrame(tick);
  };
  const manual=()=>onExitRef.current();
  const key=(e:KeyboardEvent)=>{if(['Escape','ArrowDown','ArrowUp','PageDown','PageUp',' ','Home','End'].includes(e.key))manual();};
  window.addEventListener('wheel',manual,{passive:true});
  window.addEventListener('touchstart',manual,{passive:true});
  window.addEventListener('keydown',key);
  raf=requestAnimationFrame(tick);
  return()=>{cancelAnimationFrame(raf);delete root.dataset.portfolioTour;
   window.removeEventListener('wheel',manual);window.removeEventListener('touchstart',manual);window.removeEventListener('keydown',key);
  };
 },[active]);
 if(!active)return null;
 return <aside className="sx-guided-tour" aria-label="Guided portfolio tour" role="region">
  <span className="sx-tour-kicker">GUIDED EXPERIENCE <b>{String(index+1).padStart(2,'0')}/{order.length}</b></span>
  <div className="sx-tour-status"><strong>{label}</strong><span>{paused?'PAUSED':'PLAYING'}</span></div>
  <div className="sx-tour-track" role="progressbar" aria-label="Tour progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(fraction*100)}><span style={{width:(fraction*100)+'%'}}/></div>
  <div className="sx-tour-actions">
   <button type="button" onClick={()=>{pausedRef.current=!pausedRef.current;setPaused(pausedRef.current);}} aria-label={paused?'Resume tour':'Pause tour'}>{paused?'▶ RESUME':'Ⅱ PAUSE'}</button>
   <button type="button" onClick={onExit} aria-label="Exit guided tour">EXIT ↗</button>
  </div>
  <small>Any scroll or swipe exits the tour.</small>
 </aside>;
}
