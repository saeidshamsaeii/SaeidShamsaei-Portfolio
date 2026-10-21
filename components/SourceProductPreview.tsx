'use client';
import {useState} from 'react';
import type {ProjectId} from '@/data/portfolio';

/**
 * These are interactive, source-informed interface anatomy cards, NOT screenshots,
 * logged-in sessions or production data. Each label maps to a checked-in project
 * route or supported source feature. No metrics or fictitious customers are shown.
 */
type Preview={tag:string;name:string;repo:string;source:string;areas:string[];flows:string[];foundation:string[]};
const records:Record<ProjectId,Preview>={
 gartal:{
  tag:'MULTI-TENANT OPERATIONS',name:'GARTAL / Core Admin',
  repo:'saeidshamsaeii/Core-Admin',
  source:'pages/Dashboard.tsx',
  areas:['Overview','Customers','Products','Orders','Animals','Appointments','Inventory'],
  flows:['Enterprise administration','Products & orders','Inventory operations','Tenant-aware services'],
  foundation:['CORE SERVER','CORE ADMIN','STOREFRONT','VERTICAL PRODUCTS']
 },
 factory:{
  tag:'ENGINEERING GOVERNANCE',name:'Saeid AI Factory / Source pipeline',
  repo:'saeidshamsaeii/AI-Development-Factory',
  source:'src/worker.js',
  areas:['Repositories','Source review','CI evidence','Permissions','Safe sync'],
  flows:['Exact-SHA verification','Owner-directed work','Bounded checks','Reviewable evidence'],
  foundation:['OWNER','SOURCE','QUALITY GATE','LOCAL SYNC']
 },
 digirezhim:{
  tag:'CLINICAL NUTRITION',name:'DigiRezhim / Physician workspace',
  repo:'saeidshamsaeii/DigiRezhim',
  source:'apps/web/src/components/doctor/doctor-dashboard.tsx',
  areas:['Dashboard','Patients','Clinical review','Nutrition','Follow-up'],
  flows:['Physician dashboard','Patient context','Nutrition pathways','Longitudinal follow-up'],
  foundation:['PHYSICIAN','PATIENT','CARE CONTEXT','NUTRITION PLAN']
 },
 petiwoo:{
  tag:'VERTICAL STORE EXPERIENCE',name:'Petiwoo / Pet commerce',
  repo:'saeidshamsaeii/Core-Petshop-Store',
  source:'pages/index.tsx',
  areas:['Home','Categories','Products','Booking','Orders','My pets'],
  flows:['Category navigation','Pet-specific catalog','Appointment booking','Customer accounts'],
  foundation:['STOREFRONT','CATALOG','APPOINTMENTS','PET PROFILES']
 }
};
export function SourceProductPreview({id}:{id:ProjectId}){
 const item=records[id], [mode,setMode]=useState<'workflows'|'architecture'>('workflows');
 const labels=mode==='workflows'?item.flows:item.foundation;
 return <div className={'sx-v3-source-preview sx-v3-source-preview--'+id} aria-label={item.name+' source-informed interface study'}>
  <div className="sx-v3-source-head"><div className="sx-v3-source-window-dots" aria-hidden="true"><i/><i/><i/></div><strong>{item.name}</strong><span>INTERFACE STUDY</span></div>
  <div className="sx-v3-source-body">
   <div className="sx-v3-source-sidebar"><strong>{id==='factory'?'FCTRY':id==='gartal'?'GARTAL':id==='petiwoo'?'PETIWOO':'DIGIREZHIM'}</strong>
    <div>{item.areas.map((area,i)=><span className={i===0?'is-selected':''} key={area}>{area}</span>)}</div>
    <small>SOURCE-BASED</small>
   </div>
   <div className="sx-v3-source-main">
    <div className="sx-v3-source-main-head"><span>{item.tag}</span><strong>Inside the product</strong><p>Explore the architecture, not invented product metrics.</p></div>
    <div className="sx-v3-source-tabs" role="group" aria-label={item.name+' preview mode'}>
     <button type="button" aria-pressed={mode==='workflows'} className={mode==='workflows'?'is-active':''} onClick={()=>setMode('workflows')}>Workflows</button>
     <button type="button" aria-pressed={mode==='architecture'} className={mode==='architecture'?'is-active':''} onClick={()=>setMode('architecture')}>Architecture</button>
    </div>
    <div className="sx-v3-source-modules">
     {labels.map((label,i)=><div key={label}><span>{String(i+1).padStart(2,'0')}</span><strong>{label}</strong><span aria-hidden="true">↗</span></div>)}
    </div>
   </div>
  </div>
  <div className="sx-v3-source-foot">
   <span>INTERACTIVE SOURCE-INFORMED STUDY · NOT A LIVE SCREENSHOT</span>
   <a href={'https://github.com/'+item.repo+'/blob/main/'+item.source} target="_blank" rel="noreferrer noopener" aria-label={'View '+item.name+' source'}>Source ↗</a>
  </div>
 </div>;
}
