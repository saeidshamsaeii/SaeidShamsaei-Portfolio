import Link from 'next/link';
import {projects,publicContact} from '@/data/portfolio';

const information={
 gartal:{kind:'FLAGSHIP PLATFORM',short:'One foundation. Multiple businesses.',theme:'gold',intro:'A flexible foundation for business software, commerce and operations — built to support multiple products without repeating the core.',cards:['Shared enterprise foundation','Tenant-aware system architecture','Composable business workflows','Documented platform design']},
 factory:{kind:'AI ENGINEERING SYSTEM',short:'From idea to governed delivery.',theme:'blue',intro:'AI-assisted engineering workflows with controlled permissions, repository orchestration, CI evidence and accountable delivery.',cards:['Reviewable engineering workflows','Exact-commit CI validation','Controlled orchestration','Clear permission boundaries']},
 digirezhim:{kind:'HEALTHTECH PLATFORM',short:'Better clinical workflows.',theme:'mint',intro:'Physician-oriented clinical nutrition workflows with structured patient context, review pathways and personalized planning.',cards:['Structured patient information','Clinical decision pathways','Nutrition planning','Longitudinal follow-up']},
 petiwoo:{kind:'VERTICAL COMMERCE',short:'Thoughtful technology for pet care.',theme:'peach',intro:'A pet retail and veterinary concept bringing domain-specific commerce and service workflows onto a shared platform.',cards:['Pet commerce experiences','Inventory and suppliers','Veterinary workflows','Customer-centered design']}
} as const;

function Brand({footer=false}:{footer?:boolean}){
 return <Link className={'pf-brand'+(footer?' pf-brand--footer':'')} href="/" aria-label="Saeid Shamsaei — home">
  <img src="/assets/hires/logo.webp" alt="" width="48" height="48" decoding="async"/>
  <span>SAEID <strong>SHAMSAEI</strong>{footer&&<small>Product architecture & engineering</small>}</span>
 </Link>;
}

function ProjectSection({project}:{project:(typeof projects)[number]}){
 const detail=information[project.id];
 const cells=[
  {label:'THE CHALLENGE',text:project.problem.en},
  {label:'SYSTEM ARCHITECTURE',text:project.solution.en},
  {label:'CAPABILITIES',text:project.features.slice(0,3).map(x=>x.en).join(' · ')},
  {label:'DOCUMENTED STATUS',text:project.outcome.en}
 ];
 return <article id={'project-'+project.id} className={'pf-project pf-project--'+detail.theme} aria-labelledby={'title-'+project.id}>
  <div className="pf-project-main">
   <div className="pf-project-copy">
    <p className="pf-eyebrow"><span>{project.index} / 04</span> {detail.kind}</p>
    <h3 id={'title-'+project.id}>{project.id==='factory'?<>AI <em>Factory</em></>:project.brand}</h3>
    <h4>{detail.short}</h4>
    <p className="pf-project-desc">{detail.intro}</p>
    <div className="pf-project-tags">{project.features.slice(0,3).map(item=><span key={item.en}>{item.en}</span>)}</div>
    <Link className="pf-button pf-button--color" href={'/work/'+project.id+'/'}>Explore case study <span aria-hidden="true">↗</span></Link>
   </div>
   <Link className="pf-project-art" href={'/work/'+project.id+'/'} aria-label={'Open '+project.brand+' case study'}>
    <img src={'/assets/hires/project-'+project.id+'.webp'} alt={project.brand+' — illustrated product concept'} width="1448" height="1086" loading="eager" decoding="async"/>
    <span className="pf-art-corner" aria-hidden="true">VIEW PROJECT ↗</span>
   </Link>
  </div>
  <div className="pf-project-notes">
   {cells.map((cell,i)=><div className="pf-note" key={cell.label}>
    <span className="pf-note-icon" aria-hidden="true">{['◇','⌘','✦','↗'][i]}</span>
    <h5>{cell.label}</h5>
    <p>{cell.text}</p>
   </div>)}
  </div>
 </article>;
}

export default function PortfolioExperience(){
 return <div className="pf-site">
  <a className="skip-link" href="#selected-projects">Skip to projects</a>
  <header className="pf-header">
   <div className="pf-header-inner">
    <Brand/>
    <nav className="pf-nav" aria-label="Primary navigation">
     <a href="#top">Home</a><a href="#selected-projects">Projects</a>
     <a href="#about">About</a><a href="#approach">Approach</a><a href="#contact">Contact</a>
    </nav>
    <a className="pf-header-contact" href={'mailto:'+publicContact.email}>Let’s Talk <span aria-hidden="true">↗</span></a>
   </div>
  </header>

  <main>
   <section className="pf-hero" id="top" aria-labelledby="pf-hero-title">
    <div className="pf-hero-glow" aria-hidden="true"/>
    <div className="pf-hero-inner">
     <div className="pf-hero-copy">
      <p className="pf-eyebrow pf-hero-eyebrow">BUILDER <span>✦</span> PRODUCT ENGINEER <span>✦</span> PROBLEM SOLVER</p>
      <h1 id="pf-hero-title">SAEID <span>SHAMSAEI.</span></h1>
      <p className="pf-hero-lead">I design and build digital products that turn complex ideas into clear, scalable systems.</p>
      <p className="pf-hero-sub">Product thinking, software architecture and thoughtful execution — from the first idea to the working system.</p>
      <div className="pf-hero-actions">
       <a href="#selected-projects" className="pf-button pf-button--gold">View My Projects <span aria-hidden="true">↗</span></a>
       <a href={'mailto:'+publicContact.email} className="pf-button pf-button--outline">Get in Touch <span aria-hidden="true">✉</span></a>
      </div>
      <div className="pf-hero-facts" aria-label="Areas of focus">
       <div><strong>04</strong><small>Selected Projects</small></div>
       <div><strong>AI</strong><small>Automation & Systems</small></div>
       <div><strong>UX</strong><small>People-first Products</small></div>
      </div>
     </div>
     <div className="pf-hero-visual" aria-label="Editorial portrait of Saeid Shamsaei">
      <div className="pf-hero-halo" aria-hidden="true"/>
      <div className="pf-hero-halo pf-hero-halo--small" aria-hidden="true"/>
      <span className="pf-hero-vertical" aria-hidden="true">IDEAS&nbsp; · &nbsp; SYSTEMS&nbsp; · &nbsp; IMPACT</span>
      <img className="pf-portrait" src="/assets/hires/portrait.webp" alt="Saeid Shamsaei" width="1122" height="1402" fetchPriority="high" decoding="async"/>
      <span className="pf-portrait-base" aria-hidden="true"/>
     </div>
    </div>
   </section>

   <section className="pf-projects" id="selected-projects" aria-labelledby="pf-work-title">
    <div className="pf-section-heading">
     <div><span className="pf-eyebrow">01 / SELECTED WORK</span><h2 id="pf-work-title">Systems built with <em>purpose.</em></h2></div>
     <p>Four different domains. One approach: simplify complexity, design for change and make every part work together.</p>
    </div>
    <div className="pf-project-list">{projects.map(project=><ProjectSection project={project} key={project.id}/>)}</div>
    <p className="pf-project-disclosure">Project artwork is conceptual visualization. Product statistics shown inside artwork are illustrative and are not verified operating metrics.</p>
   </section>

   <section className="pf-about" id="about" aria-labelledby="pf-about-title">
    <p className="pf-eyebrow">02 / ABOUT</p>
    <div><h2 id="pf-about-title">COMPLEX IDEAS.<br/><span>ENDURING SYSTEMS.</span></h2>
     <p>I connect architecture, product thinking and design to build systems that are useful today and adaptable tomorrow. My work spans enterprise platforms, AI-enabled engineering, clinical workflows and focused digital commerce.</p></div>
   </section>

   <section className="pf-approach" id="approach" aria-labelledby="pf-approach-title">
    <div><p className="pf-eyebrow">03 / THE APPROACH</p><h2 id="pf-approach-title">Build with intention.</h2></div>
    <div className="pf-principles">
     <div><span>01</span><strong>PROBLEM BEFORE TOOLING</strong><span aria-hidden="true">↗</span></div>
     <div><span>02</span><strong>ARCHITECTURE FOR CHANGE</strong><span aria-hidden="true">↗</span></div>
     <div><span>03</span><strong>DESIGN WITHOUT FRICTION</strong><span aria-hidden="true">↗</span></div>
     <div><span>04</span><strong>VERIFIABLE QUALITY</strong><span aria-hidden="true">↗</span></div>
    </div>
   </section>

   <section className="pf-contact" id="contact" aria-labelledby="pf-contact-title">
    <div className="pf-contact-sky" aria-hidden="true"><i/><i/><i/></div>
    <p className="pf-eyebrow">04 / LET’S BUILD TOGETHER</p>
    <div className="pf-contact-layout"><div><h2 id="pf-contact-title">COMPLEX IDEAS.<br/><span>REAL IMPACT.</span></h2>
     <p>Have an ambitious product, a challenging system or a new partnership in mind? Let’s make it tangible.</p>
     <div className="pf-hero-actions"><a className="pf-button pf-button--gold" href={'mailto:'+publicContact.email}>Start a Conversation <span aria-hidden="true">↗</span></a>
      <a className="pf-button pf-button--outline" href="#selected-projects">View My Projects <span aria-hidden="true">↑</span></a></div>
    </div><div className="pf-contact-art" aria-hidden="true"><div className="pf-contact-ring"/><span>BUILD<br/>WHAT<br/>MATTERS.</span></div></div>
   </section>
  </main>
  <footer className="pf-footer"><Brand footer/><nav aria-label="Footer navigation"><a href="#top">Home</a><a href="#selected-projects">Projects</a><a href="#about">About</a><a href="#contact">Contact</a></nav>
   <div className="pf-footer-links"><a href={publicContact.github} rel="noreferrer" target="_blank">GitHub ↗</a><a href={publicContact.linkedin} rel="noreferrer" target="_blank">LinkedIn ↗</a><a href={'mailto:'+publicContact.email}>Email ↗</a></div>
  </footer>
 </div>;
}
