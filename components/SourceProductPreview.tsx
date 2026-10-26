'use client';
import {useState} from 'react';
import type {ProjectId} from '@/data/portfolio';

/**
 * Source-derived HTML interface compositions, not screenshots.
 * Navigation labels and module names are taken from project source.
 * No fabricated customers, sales, clinical values or production metrics.
 * compact=true is the selected-work card; full mode is the case-study study.
 */
type Preview={kind:string;title:string;repo:string;source:string;nav:string[];
 workflow:string[];foundation:string[]};
export const previewRecords:Record<ProjectId,Preview>={
 gartal:{kind:'DIGITAL STUDIO / SERVICE EXPERIENCE',title:'GARTAL / MAIN WEBSITE',
  repo:'saeidshamsaeii/GARTAL-SITE',source:'content.py',
  nav:['Home','Web design','E-commerce','Custom software','Automation'],
  workflow:['Web design services','Business automation','Project inquiry','Individual SEO pages'],
  foundation:['Python WSGI','Server-rendered pages','Lead intake','Brand system']},
 factory:{kind:'LOCAL ENGINEERING CONTROL',title:'SAEID / AI FACTORY',
  repo:'saeidshamsaeii/AI-Development-Factory',source:'scripts/owner-full-worker/owner-worker.mjs',
  nav:['Overview','Projects','Local sync','Guardians','Activity'],
  workflow:['GitHub HEAD monitoring','Owner-active projects','Safe fast-forward sync','Evidence and blockers'],
  foundation:['GitHub source','One Windows Worker','Local dashboard','Guardian Hub']},
 digirezhim:{kind:'PHYSICIAN WORKSPACE',title:'DIGIREZHIM / DOCTOR',
  repo:'saeidshamsaeii/DigiRezhim',source:'apps/web/src/components/doctor/doctor-dashboard.tsx',
  nav:['Overview','Patients','Verification','Subscription','Clinical context'],
  workflow:['Doctor identity and access','Patient records','Nutrition review','Longitudinal follow-up'],
  foundation:['Next.js web','NestJS API','PostgreSQL','Clinical workflows']},
 petiwoo:{kind:'PET COMMERCE',title:'PETIWOO / STOREFRONT',
  repo:'saeidshamsaeii/Core-Petshop-Store',source:'pages/index.tsx',
  nav:['Home','Shop','Categories','Brands','Basket'],
  workflow:['Species navigation','Category browsing','Product search','Stock and discounts'],
  foundation:['Storefront','Catalog API','Product inventory','Checkout']}
};

function AppInterior({id}:{id:ProjectId}){
 if(id==='gartal')return <div className="sx-app-screen sx-app-screen--gartal sx-app-screen--gartal-site">
  <div className="sx-gartal-site-top"><strong>GARTAL<span>.</span></strong><span>Web design</span><span>Software</span><span>Automation</span></div>
  <div className="sx-gartal-site-hero"><small>GARTAL / DIGITAL ENGINEERING</small><h3>Digital products.<br/><em>Built for momentum.</em></h3>
   <p>Websites, custom software and business automation, from discovery to delivery.</p><span className="sx-gartal-site-cta">Start a project ↗</span>
  </div>
  <div className="sx-gartal-service-row"><span>01 / Web experiences</span><span>02 / Software systems</span><span>03 / Automation</span></div>
 </div>;
 if(id==='factory')return <div className="sx-app-screen sx-app-screen--factory">
  <div className="sx-app-screen-top"><span>CONTROL CENTER</span><strong>Owner operations</strong><span className="sx-app-filter">GitHub → local</span></div>
  <div className="sx-app-metric-row"><span>ACTIVE <b>Projects</b></span><span>SYNC <b>Protected</b></span><span>EVIDENCE <b>Guardians</b></span></div>
  <div className="sx-app-two-cols">
   <div className="sx-app-module"><span>DELIVERY PATH</span><strong>Commit to local checkout</strong><div className="sx-app-steps"><span>GitHub HEAD</span><span>Origin check</span><span>Safe pull</span></div><small>One owner-controlled Worker</small></div>
   <div className="sx-app-module"><span>PROJECT LIFECYCLE</span><strong>Owner-selected status</strong><div className="sx-app-labels"><em>Active</em><em>Future</em><em>Completed</em><em>Archived</em></div></div>
  </div></div>;
 if(id==='digirezhim')return <div className="sx-app-screen sx-app-screen--digirezhim">
  <div className="sx-app-screen-top"><span>PHYSICIAN</span><strong>Doctor workspace</strong><span className="sx-app-filter">Edit profile</span></div>
  <div className="sx-app-metric-row"><span>PROFILE <b>Professional status</b></span><span>ACCESS <b>Subscription</b></span><span>PATIENTS <b>Patient registry</b></span></div>
  <div className="sx-app-two-cols">
   <div className="sx-app-module"><span>CLINICAL WORKSPACE</span><strong>Patients and care context</strong><div className="sx-app-data-row"><span>Patient list</span><i/><i/></div><div className="sx-app-data-row"><span>Clinical review</span><i/><i/></div><div className="sx-app-data-row"><span>Follow-up</span><i/><i/></div></div>
   <div className="sx-app-module"><span>ACCOUNT READINESS</span><strong>Professional verification</strong><div className="sx-app-labels"><em>Profile</em><em>Medical registration</em><em>Access</em></div></div>
  </div></div>;
 return <div className="sx-app-screen sx-app-screen--petiwoo">
  <div className="sx-app-store-hero"><span>SHOP BY PET</span><strong>Everything for their everyday.</strong><p>Browse species, categories and carefully organized pet products.</p><span className="sx-app-store-action">Explore the catalogue ↗</span></div>
  <div className="sx-app-store-cats"><div><span>01</span><strong>Dogs</strong></div><div><span>02</span><strong>Cats</strong></div><div><span>03</span><strong>Birds</strong></div></div>
  <div className="sx-app-store-strip"><span>CATEGORY TREE</span><span>PRODUCT SEARCH</span><span>STOCK & PROMOTIONS</span></div>
 </div>;
}

export function SourceProductPreview({id,compact=false}:{id:ProjectId;compact?:boolean}){
 const item=previewRecords[id], [view,setView]=useState<'interface'|'architecture'>('interface');
 const content=view==='interface'?item.workflow:item.foundation;
 return <div className={'sx-source-app sx-source-app--'+id+(compact?' sx-source-app--compact':'')}
  aria-label={item.title+' reconstructed from repository source'}>
  <div className="sx-source-app-chrome"><div className="sx-source-app-dots" aria-hidden="true"><i/><i/><i/></div><strong>{item.title}</strong><span>REPOSITORY STUDY</span></div>
  <div className="sx-source-app-layout">
   <aside className="sx-source-app-nav"><strong>{id==='factory'?'FACTORY':id.toUpperCase()}</strong><div>{item.nav.map((x,i)=><span key={x} className={i===0?'is-current':''}>{x}</span>)}</div></aside>
   <div className="sx-source-app-primary">
    {view==='interface'?<AppInterior id={id}/>:<div className="sx-app-architecture"><small>SOURCE ARCHITECTURE</small><h3>{item.title}</h3><div>{content.map((name,i)=><span key={name}><b>{String(i+1).padStart(2,'0')}</b><strong>{name}</strong></span>)}</div></div>}
   </div>
  </div>
  {!compact&&<div className="sx-source-app-actions"><div role="group" aria-label="Interface presentation mode"><button type="button" aria-pressed={view==='interface'} onClick={()=>setView('interface')}>Interface</button><button type="button" aria-pressed={view==='architecture'} onClick={()=>setView('architecture')}>System</button></div><span>{item.kind}</span></div>}
  <div className="sx-source-app-credit"><span>RECONSTRUCTED FROM CHECKED-IN SOURCE · NOT A SCREENSHOT</span>
   {!compact&&<a href={'https://github.com/'+item.repo+'/blob/main/'+item.source} target="_blank" rel="noreferrer noopener">Inspect source ↗</a>}
  </div>
 </div>;
}
