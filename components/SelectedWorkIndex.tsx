'use client';
import {useState} from 'react';
import Link from 'next/link';
import {WordReveal} from '@/components/WordReveal';
import {projects,type ProjectId} from '@/data/portfolio';

const keywords:Record<ProjectId,string>={
 gartal:'Service pages · project requests',
 factory:'Git sync · Windows Worker',
 digirezhim:'Doctor workspace · nutrition rules',
 petiwoo:'Product search · cart · checkout'
};
export function SelectedWorkIndex(){
 const [active,setActive]=useState<ProjectId>('gartal');
 return <section className="sx-v16-index sx-v18-index" id="work-index"
  aria-labelledby="sx-v16-work-title" data-active-project={active}
  data-tour-stop data-tour-label="Selected work" data-tour-duration="10" data-tour-pace=".92">
  <div className="sx-v18-index-heading">
   <WordReveal as="h2" id="sx-v16-work-title" text="Selected work."/>
   <span>04 projects</span>
  </div>
  <div className="sx-v18-index-rows">
   {projects.map(project=><div className="sx-v18-index-entry" key={project.id}
    onMouseEnter={()=>setActive(project.id)}
    onFocusCapture={()=>setActive(project.id)}
    onTouchStart={()=>setActive(project.id)}>
    <a href={'#project-'+project.id} className="sx-v16-index-row"
     aria-label={'Discover '+project.brand+' immersive story'}>
     <WordReveal as="strong" text={project.brand}/>
     <WordReveal as="span" text={keywords[project.id]}/>
     <span aria-hidden="true">↗</span>
    </a>
    <div className="sx-v18-index-direct">
     <Link href={'/work/'+project.id+'/'}>Case study</Link>
     <Link href={'/engineering/#evidence-'+project.id}>Source ↗</Link>
    </div>
   </div>)}
  </div>
 </section>;
}
