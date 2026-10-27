'use client';
import {useState} from 'react';
import Link from 'next/link';
import {projects,type ProjectId} from '@/data/portfolio';

const indexLines:Record<ProjectId,{type:string;signal:string;summary:string;word:string;discipline:string}>={
 gartal:{type:'DIGITAL STUDIO / PRODUCT PLATFORM',signal:'Two systems. One direction.',summary:'A focused digital studio and a separately versioned multi-product foundation.',word:'SYSTEMS',discipline:'Architecture / Web'},
 factory:{type:'ENGINEERING AUTOMATION',signal:'Trust the evidence.',summary:'Owner-directed workflows connecting real Git history and one guarded local Worker.',word:'EVIDENCE',discipline:'Automation / Provenance'},
 digirezhim:{type:'CLINICAL NUTRITION',signal:'Precision before polish.',summary:'Specialist clinical software with physician, administrative and nutrition boundaries.',word:'PRECISION',discipline:'Healthtech / Platforms'},
 petiwoo:{type:'COMMERCE / PET CARE',signal:'Designed for the animal.',summary:'Species-aware product discovery, inventory context and familiar commerce flows.',word:'DISCOVERY',discipline:'Commerce / Experience'}
};

/**
 * Editorial index: a fast non-gimmicky entry path inspired by the clarity of
 * creative-developer work directories, not by their assets or copyrighted UI.
 * Hover and keyboard focus both reveal real text; mobile remains fully usable.
 */
export function SelectedWorkIndex(){
 const [active,setActive]=useState<ProjectId>('gartal');
 return <section className="sx-v16-index sx-v17-work-index" id="work-index" data-active-project={active} aria-labelledby="sx-v16-work-title"
  data-tour-stop data-tour-label="Project directory / selected work" data-tour-duration="10" data-tour-pace=".92">
  <div className="sx-v16-index-head">
   <div><span className="sx-v16-index-overline">INDEX 002 / PROJECTS</span>
    <h2 id="sx-v16-work-title">Selected <em>work.</em></h2></div>
   <p>Four distinct products. Choose where to begin, or continue scrolling for the immersive engineering stories.</p>
  </div>
  <div className="sx-v17-index-watermark" aria-hidden="true" key={active}>
   <span>{indexLines[active].word}</span>
  </div>
  <div className="sx-v17-index-current" aria-live="polite" aria-atomic="true">
   <span>IN FOCUS / {projects.findIndex(p=>p.id===active)+1} OF {projects.length}</span>
   <strong>{indexLines[active].discipline}</strong>
  </div>
  <div className="sx-v16-index-table">
   <div className="sx-v16-index-columns" aria-hidden="true"><span>NO.</span><span>PRODUCT</span><span>FIELD</span><span>EXPLORE</span></div>
   {projects.map(project=><div className={'sx-v16-index-entry'+(active===project.id?' is-current':'')}
    key={project.id}
    onMouseEnter={()=>setActive(project.id)}
    onFocusCapture={()=>setActive(project.id)}
    onTouchStart={()=>setActive(project.id)}>
    <a href={'#project-'+project.id} className="sx-v16-index-row"
     aria-label={'Discover '+project.brand+' immersive story'}>
     <span className="sx-v16-index-number">{project.index}</span>
     <span className="sx-v16-index-name">{project.brand}</span>
     <span className="sx-v16-index-type">{indexLines[project.id].type}</span>
     <span className="sx-v16-index-arrow" aria-hidden="true">↗</span>
    </a>
    <div className="sx-v16-index-expansion">
     <div><span>PROJECT NOTE</span><h3>{indexLines[project.id].signal}</h3><p>{indexLines[project.id].summary}</p></div>
     <div className="sx-v16-index-side-links">
      <Link href={'/work/'+project.id+'/'}>IN-DEPTH CASE ↗</Link>
      <Link href={'/engineering/#evidence-'+project.id}>ARCHITECTURE EVIDENCE ↗</Link>
     </div>
    </div>
   </div>)}
  </div>
  <div className="sx-v16-index-foot"><span>THE SHORT WAY INTO THE WORK.</span><a href="#selected-projects">OR LET THE STORY UNFOLD ↓</a></div>
 </section>;
}
