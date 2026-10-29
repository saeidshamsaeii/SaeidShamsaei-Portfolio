'use client';
import {useMemo,useState} from 'react';
import Link from 'next/link';
import {engineeringEvidence,fileUrl,sourceSnapshots,type Discipline,type EngineeringRecord,type EngineeringDecision} from '@/data/engineeringEvidence';
import {projects} from '@/data/portfolio';

type Filter='all'|Discipline;
const filterLabels:{id:Filter;label:string}[]=[
 {id:'all',label:'All decisions'},
 {id:'architecture',label:'Architecture'},
 {id:'experience',label:'Product experience'},
 {id:'delivery',label:'Delivery & evidence'}
];
const normalized=(value:string)=>value.toLocaleLowerCase('en-US').trim().replace(/\s+/g,' ');

/** One matching rule for project visibility, result count and the rendered rows. */
function matchingDecisions(entry:EngineeringRecord,filter:Filter,query:string):EngineeringDecision[]{
 const brand=projects.find(item=>item.id===entry.id)?.brand||entry.id;
 return entry.decisions.filter(item=>{
  if(filter!=='all'&&item.discipline!==filter)return false;
  if(!query)return true;
  const corpus=[entry.id,brand,entry.scope,entry.differentiator,entry.boundary,
   item.question,item.design,item.tradeoff,item.evidence,
   ...item.files.map(index=>entry.files[index].label+' '+entry.files[index].path)
  ].join(' ');
  return normalized(corpus).includes(query);
 });
}

function EvidenceProject({entry,decisions}:{entry:EngineeringRecord;decisions:EngineeringDecision[]}){
 const project=projects.find(item=>item.id===entry.id)!;

 return <section id={'evidence-'+entry.id} className={'sx-ei-project sx-ei-project--'+entry.id}
  aria-labelledby={'ei-title-'+entry.id}>
  <div className="sx-ei-project-intro">
   <div className="sx-ei-overline">{project.index} / ENGINEERING RECORD</div>
   <h2 id={'ei-title-'+entry.id}>{project.brand}</h2>
   <p className="sx-ei-scope">{entry.scope}</p>
   <p className="sx-ei-boundary">{entry.differentiator}</p>
   <div className="sx-ei-project-links">
    <Link href={'/work/'+entry.id+'/'}>Read full case study ↗</Link>
    <a href={'#source-'+entry.id}>Source register ↓</a>
   </div>
  </div>
  <div className="sx-ei-decisions">
   {decisions.map((decision,index)=><article key={decision.id} className="sx-ei-decision">
    <div className="sx-ei-decision-id">
     <span>{String(index+1).padStart(2,'0')}</span>
     <span>{decision.discipline.replace('-', ' ').toUpperCase()}</span>
    </div>
    <h3>{decision.question}</h3>
    <div className="sx-ei-pair">
     <div><span className="sx-ei-label">Implemented / documented approach</span><p>{decision.design}</p></div>
     <div><span className="sx-ei-label">Engineering trade-off</span><p>{decision.tradeoff}</p></div>
    </div>
    <div className="sx-ei-evidence">
     <span className="sx-ei-label">Why this is in the portfolio</span>
     <p>{decision.evidence}</p>
     <div className="sx-ei-file-links">{decision.files.map(i=><a
      href={fileUrl(entry.files[i])} key={entry.files[i].repo+'/'+entry.files[i].path}
      target="_blank" rel="noopener noreferrer" title={entry.files[i].why}>
      {entry.files[i].repo} / {entry.files[i].path} ↗
     </a>)}</div>
    </div>
   </article>)}
  </div>
  <section id={'source-'+entry.id} className="sx-ei-register" aria-label={project.brand+' source register'}>
   <div className="sx-ei-register-head"><h3>Source register</h3><p>References are pinned to checked Git commit SHAs; GitHub access may be required.</p></div>
   <div className="sx-ei-source-list">{entry.files.map((file,i)=><a
    href={fileUrl(file)} key={file.repo+'/'+file.path} target="_blank" rel="noopener noreferrer">
    <span>{String(i+1).padStart(2,'0')} / {file.label}</span>
    <small>{file.why}</small>
    <em>{file.repo} @ {(sourceSnapshots[file.repo]||"main").slice(0,10)} / {file.path} ↗</em>
   </a>)}</div>
   <div className="sx-ei-unknown">
    <span className="sx-ei-label">Not independently verified</span>
    <p>{entry.boundary}</p>
    <ul>{entry.unverified.map(item=><li key={item}>{item}</li>)}</ul>
   </div>
  </section>
 </section>;
}

export default function EngineeringIndex(){
 const [filter,setFilter]=useState<Filter>('all');
 const [query,setQuery]=useState('');
 const [project,setProject]=useState<string>('all');
 const safeQuery=normalized(query);
 const visible=useMemo(()=>engineeringEvidence
  .filter(entry=>project==='all'||entry.id===project)
  .map(entry=>({entry,decisions:matchingDecisions(entry,filter,safeQuery)}))
  .filter(result=>result.decisions.length>0),[filter,project,safeQuery]);
 const count=visible.reduce((sum,result)=>sum+result.decisions.length,0);

 return <main className="sx-ei">
  <div className="sx-ei-skip"><a href="#evidence-results">Skip to engineering evidence</a></div>
  <nav className="sx-ei-nav" aria-label="Engineering section navigation">
   <Link href="/">← Saeid Shamsaei</Link>
   <span>ENGINEERING / THE WORK BEHIND THE WORK</span>
   <a href="#evidence-results">Browse evidence ↓</a>
  </nav>
  <header className="sx-ei-hero">
   <div className="sx-ei-hero-index"><span>INDEX / 2026</span><span>FOUR PROJECT FAMILIES</span></div>
   <h1>Make the <em>work</em><br/>inspectable.</h1>
   <div className="sx-ei-hero-bottom">
    <p>Real architecture decisions, trade-offs and checked-in source references. A fast, readable alternative to the cinematic portfolio — without invented benchmarks or production claims.</p>
    <div><strong>04</strong><span>PROJECT RECORDS</span><strong>12</strong><span>DOCUMENTED DECISIONS</span></div>
   </div>
  </header>
  <div className="sx-ei-main" id="evidence-results">
   <aside className="sx-ei-sidebar" aria-label="Engineering index filters">
    <div className="sx-ei-sidebar-head">FIND WHAT MATTERS</div>
    <label htmlFor="sx-ei-search">Search technical evidence</label>
    <input id="sx-ei-search" type="search" value={query} onChange={e=>setQuery(e.target.value)}
     placeholder="Try: tenancy, clinical, Worker…" autoComplete="off"/>
    <fieldset>
     <legend>Project</legend>
     <div className="sx-ei-filter-list">
      <button type="button" aria-pressed={project==='all'} onClick={()=>setProject('all')}>All four projects</button>
      {projects.map(item=><button type="button" key={item.id} aria-pressed={project===item.id}
       onClick={()=>setProject(item.id)}>{item.brand}</button>)}
     </div>
    </fieldset>
    <fieldset>
     <legend>Discipline</legend>
     <div className="sx-ei-filter-list">
      {filterLabels.map(item=><button type="button" key={item.id} aria-pressed={filter===item.id}
       onClick={()=>setFilter(item.id)}>{item.label}</button>)}
     </div>
    </fieldset>
    <div className="sx-ei-method"><span>READING THIS INDEX</span>
     <p>Repository evidence means a feature or decision appears in checked-in source. It does not certify deployment, regulatory approval, uptime or commercial performance.</p>
    </div>
   </aside>
   <div className="sx-ei-results">
    <div className="sx-ei-results-head" role="status" aria-live="polite" aria-atomic="true"><span>{visible.length} projects / {count} matching decisions</span>
     {(query||project!=='all'||filter!=='all')&&<button type="button" onClick={()=>{setQuery('');setProject('all');setFilter('all');}}>Clear filters ↺</button>}
    </div>
    {visible.length?visible.map(result=><EvidenceProject key={result.entry.id}
     entry={result.entry} decisions={result.decisions}/>):<div className="sx-ei-empty">
     <h2>No matching source evidence.</h2><p>Try another project or clear the filters. Results only include material documented in the repositories.</p>
     <button type="button" onClick={()=>{setQuery('');setProject('all');setFilter('all');}}>Show all evidence</button>
    </div>}
   </div>
  </div>
  <footer className="sx-ei-footer"><p>A portfolio should make engineering judgment inspectable — not just visually impressive.</p>
   <div><Link href="/">← Cinematic portfolio</Link><a href="mailto:saeidshamsaeii00@gmail.com">Discuss a project ↗</a></div>
  </footer>
 </main>;
}
