'use client';
import {useMemo,useState} from 'react';
import Link from 'next/link';
import {engineeringEvidence,fileUrl,sourceSnapshots,type Discipline,type EngineeringRecord} from '@/data/engineeringEvidence';
import {projects} from '@/data/portfolio';
import {useSiteLocale} from '@/components/LocaleProvider';
import {LanguageSwitcher} from '@/components/LanguageSwitcher';
import {engineeringText,localizeEngineering,filterName} from '@/data/engineeringTranslations';

type Filter='all'|Discipline;
const filterLabels:{id:Filter;label:string}[]=[
 {id:'all',label:'All decisions'},
 {id:'architecture',label:'Architecture'},
 {id:'experience',label:'Product experience'},
 {id:'delivery',label:'Delivery & evidence'}
];
const normalized=(value:string)=>value.toLocaleLowerCase('en-US').trim();

function EvidenceProject({entry,filter,query}:{entry:EngineeringRecord;filter:Filter;query:string}){
 const {locale}=useSiteLocale();
 const t=engineeringText(locale);
 const project=projects.find(item=>item.id===entry.id)!;
 const decisions=entry.decisions.filter(item=>{
  if(filter!=='all'&&item.discipline!==filter)return false;
  const corpus=[entry.id,item.question,item.design,item.tradeoff,item.evidence,
   entry.scope,entry.differentiator,project.brand,
   ...item.files.map(index=>entry.files[index].label+' '+entry.files[index].path)].join(' ');
  return !query||normalized(corpus).includes(query);
 });
 if(!decisions.length)return null;
 return <section id={'evidence-'+entry.id} className={'sx-ei-project sx-ei-project--'+entry.id}
  aria-labelledby={'ei-title-'+entry.id}>
  <div className="sx-ei-project-intro">
   <div className="sx-ei-overline">{project.index} / {t.record}</div>
   <h2 id={'ei-title-'+entry.id}>{project.brand}</h2>
   <p className="sx-ei-scope">{entry.scope}</p>
   <p className="sx-ei-boundary">{entry.differentiator}</p>
   <div className="sx-ei-project-links">
    <Link href={'/work/'+entry.id+'/'}>{t.fullCase} ↗</Link>
    <a href={'#source-'+entry.id}>{t.register} ↓</a>
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
     <div><span className="sx-ei-label">{t.approach}</span><p>{decision.design}</p></div>
     <div><span className="sx-ei-label">{t.tradeoff}</span><p>{decision.tradeoff}</p></div>
    </div>
    <div className="sx-ei-evidence">
     <span className="sx-ei-label">{t.why}</span>
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
   <div className="sx-ei-register-head"><h3>{t.sourceRegister}</h3><p>{t.sourceNote}</p></div>
   <div className="sx-ei-source-list">{entry.files.map((file,i)=><a
    href={fileUrl(file)} key={file.repo+'/'+file.path} target="_blank" rel="noopener noreferrer">
    <span>{String(i+1).padStart(2,'0')} / {file.label}</span>
    <small>{file.why}</small>
    <em>{file.repo} @ {(sourceSnapshots[file.repo]||"main").slice(0,10)} / {file.path} ↗</em>
   </a>)}</div>
   <div className="sx-ei-unknown">
    <span className="sx-ei-label">{t.notVerified}</span>
    <p>{entry.boundary}</p>
    <ul>{entry.unverified.map(item=><li key={item}>{item}</li>)}</ul>
   </div>
  </section>
 </section>;
}

export default function EngineeringIndex(){
 const {locale}=useSiteLocale();
 const t=engineeringText(locale);
 const [filter,setFilter]=useState<Filter>('all');
 const [query,setQuery]=useState('');
 const [project,setProject]=useState<string>('all');
 const safeQuery=normalized(query);
 const visible=useMemo(()=>engineeringEvidence
  .map(entry=>localizeEngineering(locale,entry)).filter(entry=>{
  if(project!=='all'&&entry.id!==project)return false;
  if(!safeQuery&&filter==='all')return true;
  return entry.decisions.some(item=>{
   if(filter!=='all'&&item.discipline!==filter)return false;
   const corpus=[entry.id,entry.scope,entry.differentiator,entry.boundary,
    ...item.files.map(i=>entry.files[i].label+' '+entry.files[i].path),item.question,item.design,
    item.tradeoff,item.evidence].join(' ');
   return !safeQuery||normalized(corpus).includes(safeQuery);
  });
 }),[filter,project,safeQuery,locale]);
 const count=visible.reduce((sum,entry)=>sum+entry.decisions.filter(item=>
  (filter==='all'||item.discipline===filter)&&
  (!safeQuery||normalized([entry.id,entry.scope,entry.differentiator,item.question,item.design,
   item.tradeoff,item.evidence,...item.files.map(i=>entry.files[i].label+' '+entry.files[i].path)].join(' ')).includes(safeQuery))
 ).length,0);

 return <main className="sx-ei">
  <div className="sx-ei-skip"><a href="#evidence-results">{t.browse}</a></div>
  <nav className="sx-ei-nav" aria-label="Engineering section navigation">
   <Link href="/">← Saeid Shamsaei</Link>
   <span>{t.nav}</span>
   <a href="#evidence-results">{t.browse} ↓</a><LanguageSwitcher/>
  </nav>
  <header className="sx-ei-hero">
   <div className="sx-ei-hero-index"><span>INDEX / 2026</span><span>{t.families}</span></div>
   <h1>{t.titleStart} <em>{t.titleAccent}</em><br/>{t.titleEnd}</h1>
   <div className="sx-ei-hero-bottom">
    <p>{t.description}</p>
    <div><strong>04</strong><span>{t.projectRecords}</span><strong>12</strong><span>{t.documented}</span></div>
   </div>
  </header>
  <div className="sx-ei-main" id="evidence-results">
   <aside className="sx-ei-sidebar" aria-label="Engineering index filters">
    <div className="sx-ei-sidebar-head">{t.find}</div>
    <label htmlFor="sx-ei-search">{t.search}</label>
    <input id="sx-ei-search" type="search" value={query} onChange={e=>setQuery(e.target.value)}
     placeholder={t.placeholder} autoComplete="off"/>
    <fieldset>
     <legend>{t.project}</legend>
     <div className="sx-ei-filter-list">
      <button type="button" aria-pressed={project==='all'} onClick={()=>setProject('all')}>{t.allProjects}</button>
      {projects.map(item=><button type="button" key={item.id} aria-pressed={project===item.id}
       onClick={()=>setProject(item.id)}>{item.brand}</button>)}
     </div>
    </fieldset>
    <fieldset>
     <legend>{t.discipline}</legend>
     <div className="sx-ei-filter-list">
      {filterLabels.map(item=><button type="button" key={item.id} aria-pressed={filter===item.id}
       onClick={()=>setFilter(item.id)}>{filterName(locale,item.id)}</button>)}
     </div>
    </fieldset>
    <div className="sx-ei-method"><span>{t.reading}</span>
     <p>{t.method}</p>
    </div>
   </aside>
   <div className="sx-ei-results">
    <div className="sx-ei-results-head"><span>{visible.length} {t.projectRecords} / {count} {t.results}</span>
     {(query||project!=='all'||filter!=='all')&&<button type="button" onClick={()=>{setQuery('');setProject('all');setFilter('all');}}>{t.clear} ↺</button>}
    </div>
    {visible.length?visible.map(entry=><EvidenceProject key={entry.id} entry={entry}
     query={safeQuery} filter={filter}/>):<div className="sx-ei-empty">
     <h2>{t.none}</h2><p>{t.noneDetail}</p>
     <button type="button" onClick={()=>{setQuery('');setProject('all');setFilter('all');}}>{t.showAll}</button>
    </div>}
   </div>
  </div>
  <footer className="sx-ei-footer"><p>{t.footer}</p>
   <div><Link href="/">← {t.portfolio}</Link><a href="mailto:saeidshamsaeii00@gmail.com">{t.discuss} ↗</a></div>
  </footer>
 </main>;
}
