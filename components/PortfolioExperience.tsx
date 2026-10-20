'use client';
import {useEffect,useRef,useState} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {useGSAP} from '@gsap/react';
import {HeroArt,SceneVisual} from '@/components/SceneVisual';
import {projects,publicContact,txt,type Locale} from '@/data/portfolio';

gsap.registerPlugin(ScrollTrigger,useGSAP);
export default function PortfolioExperience(){
const root=useRef<HTMLDivElement>(null);
const [lang,setLang]=useState<Locale>('en');
const [active,setActive]=useState(0);
const [menu,setMenu]=useState(false);
const l=(fa:string,en:string)=>lang==='fa'?fa:en;
useEffect(()=>{const url=new URL(window.location.href);setLang(url.searchParams.get('lang')==='fa'?'fa':'en');},[]);
useEffect(()=>{document.documentElement.lang=lang;document.documentElement.dir=lang==='fa'?'rtl':'ltr';},[lang]);
const changeLanguage=()=>{const next=lang==='en'?'fa':'en';setLang(next);const u=new URL(window.location.href);u.searchParams.set('lang',next);window.history.replaceState(null,'',u.pathname+u.search+u.hash);};
useGSAP(()=>{
const scope=root.current;if(!scope)return;
const mm=gsap.matchMedia();
mm.add('(min-width: 920px) and (prefers-reduced-motion: no-preference)',()=>{
const triggerList:ScrollTrigger[]=[];
gsap.utils.toArray<HTMLElement>('.project-scene').forEach((scene,i)=>{
const art=scene.querySelector('.art-scene');
if(art){
gsap.fromTo(art,{scale:.9,y:90,rotate:-1.4,opacity:.65},{scale:1.045,y:-38,rotate:0,opacity:1,ease:'none',scrollTrigger:{trigger:scene,start:'top bottom',end:'bottom top',scrub:1.1}});
}
triggerList.push(ScrollTrigger.create({trigger:scene,start:'top center',end:'bottom center',onEnter:()=>setActive(i),onEnterBack:()=>setActive(i)}));
});
gsap.to('.hero-glass-front',{y:-70,rotate:2,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1}});
gsap.utils.toArray<HTMLElement>('[data-rise]').forEach(el=>gsap.fromTo(el,{opacity:0,y:45},{opacity:1,y:0,duration:.9,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 86%',once:true}}));
return ()=>triggerList.forEach(t=>t.kill());
});
return ()=>mm.revert();
},{scope:root});
return <div className="site" ref={root} data-lang={lang}>
<a className="skip-link" href="#content">{l('رفتن به محتوا','Skip to content')}</a>
<header className="nav-wrap"><div className="nav-inner"><a href="#top" className="wordmark" aria-label="Saeid Shamsaei home"><span className="wordmark-symbol">S<span>／</span></span><span>SAEID<br/>SHAMSAEI</span></a>
<nav className="nav-desktop" aria-label="Main navigation"><a href="#work">{l('پروژه‌ها','Work')}</a><a href="#about">{l('درباره من','About')}</a><a href="#approach">{l('رویکرد','Approach')}</a><a href="#contact">{l('ارتباط','Contact')}</a></nav>
<div className="nav-actions"><button type="button" className="locale-toggle" onClick={changeLanguage} aria-label="Change language">{lang==='en'?'FA':'EN'} <span>↗</span></button><a href={'mailto:'+publicContact.email} className="nav-cta">{l('شروع گفتگو','LET’S TALK')} ↗</a><button type="button" className="menu-toggle" aria-expanded={menu} aria-controls="mobile-navigation" onClick={()=>setMenu(!menu)}><span>{menu?'×':'☰'}</span><span className="sr-only">Menu</span></button></div></div>
{menu&&<nav id="mobile-navigation" className="nav-mobile" aria-label="Mobile navigation">{[['#work',l('پروژه‌ها','Work')],['#about',l('درباره من','About')],['#approach',l('رویکرد','Approach')],['#contact',l('ارتباط','Contact')]].map(([href,title])=><a key={href} href={href} onClick={()=>setMenu(false)}>{title} ↗</a>)}</nav>}</header>
<main id="content">
<section className="hero" id="top"><div className="hero-inner"><div className="hero-copy"><p className="eyebrow hero-eyebrow"><span className="eyebrow-line"/> SOFTWARE ARCHITECT / CREATIVE ENGINEERING</p><h1><span>SAEID</span><em>SHAMSAEI<span className="hero-period">.</span></em></h1><p className="hero-subtitle">{l('از ایده تا محصول؛ معماری سیستم‌های مقیاس‌پذیر، تجربه‌های دیجیتال و پلتفرم‌های واقعی.','Designing digital systems that make complex ideas feel remarkably simple.')}</p><div className="hero-buttons"><a href="#work" className="button button-gold">{l('دیدن پروژه‌ها','EXPLORE MY WORK')}<span>↘</span></a><a href="#about" className="button-ghost">{l('درباره من','THE PERSON BEHIND THE WORK')} ↗</a></div></div><HeroArt/></div><div className="hero-baseline"><span>INDEPENDENT SOFTWARE ARCHITECT / 2026</span><span>{l('برای کشف پروژه‌ها اسکرول کنید','SCROLL TO DISCOVER')} ↓</span></div></section>
<section className="intro" id="about"><div className="intro-index"><span>01 / THE PRACTICE</span><span>SAEID SHAMSAEI ©</span></div><div className="intro-grid"><div><p className="eyebrow dark">{l('نگاه من','WHAT DRIVES THE WORK')}</p><h2 data-rise>{l('ایده‌ها را به','From idea to')}<br/><em>{l('سیستم‌های ماندگار تبدیل می‌کنم.','lasting systems.')}</em></h2></div><div className="intro-description"><p data-rise>{l('من سعید شمسایی هستم؛ معمار نرم‌افزار و توسعه‌دهنده محصول. تجربه من ترکیبی از معماری پلتفرم‌های سازمانی، مهندسی سامانه‌های هوشمند و طراحی محصولات تخصصی است.','I’m Saeid Shamsaei, a software architect and product engineer. My work moves between enterprise platforms, AI-enabled engineering systems and distinctive domain-specific products.')}</p><div className="intro-keywords"><span>ENTERPRISE SAAS</span><span>AI SYSTEMS</span><span>HEALTHTECH</span><span>PRODUCT DESIGN</span></div></div></div><div className="intro-rule"><span>STRATEGY</span><span>ARCHITECTURE</span><span>ENGINEERING</span><span>EXPERIENCE</span></div></section>
<section className="work-intro" id="work"><span className="eyebrow">02 / THE PORTFOLIO</span><div className="work-intro-grid"><h2>{l('محصول‌ها،','Selected')}<br/><em>{l('یکی‌یکی روایت می‌شوند.','projects.')}</em></h2><p>{l('چهار مسئله واقعی، چهار زبان بصری متفاوت. هر فصل معماری، تصمیم‌ها و مسیر محصول را نشان می‌دهد.','Four different domains. Four distinct visual worlds. Scroll through the product thinking, architecture and evidence behind each project.')}</p></div><div className="work-rail"><span>01 — 04</span><span>SCROLL-DRIVEN CASE STUDIES</span></div></section>
{projects.map((p,i)=><section key={p.id} id={'project-'+p.id} className={'project-scene scene-'+p.id} data-project={p.id}><div className="project-pin"><div className="project-background-number">{p.index}</div><div className="project-layout"><div className="project-copy"><div className="project-index">{p.index} <span className="project-index-line"/> {txt(lang,p.kicker)}</div><h2>{p.brand}</h2><h3>{txt(lang,p.title)}</h3><p className="project-tagline">{txt(lang,p.tagline)}</p><p className="project-description">{txt(lang,p.intro)}</p><div className="project-categories">{p.features.map((f,j)=><span key={j}>{txt(lang,f)}</span>)}</div><a className="project-link" href={'/work/'+p.id+'/?lang='+lang}>{l('بررسی کیس‌استادی','EXPLORE CASE STUDY')} <span>↗</span></a></div><div className="project-artwork"><SceneVisual id={p.id}/></div></div><div className="project-foot"><span>SAEID / SELECTED WORK / {p.index}</span><div className="project-pagination" aria-label="Project navigation">{projects.map((project,j)=><a key={project.id} href={'#project-'+project.id} className={active===j?'active':''} aria-label={'Go to '+project.brand}><span/></a>)}</div><span>{p.brand.toUpperCase()} / 2026</span></div></div></section>)}
<section className="approach" id="approach"><div className="approach-meta">03 / HOW I WORK <span>BEYOND THE SURFACE</span></div><div className="approach-body"><div><p className="eyebrow">{l('پشت هر پروژه','THE ENGINEERING MINDSET')}</p><h2>{l('پیچیدگی را','Complexity,')}<br/><em>{l('قابل فهم می‌کنم.','made clear.')}</em></h2></div><p>{l('محصول خوب فقط یک ظاهر زیبا نیست. مسئله، داده، امنیت، مرزهای سیستم و تجربه کاربر باید در یک معماری منسجم قرار بگیرند.','Great software is more than an interface. Domain boundaries, reliable data, security and human experience need to work as one considered system.')}</p></div><div className="approach-steps">{[['01','DISCOVER','Understand the problem'],['02','ARCHITECT','Design clear boundaries'],['03','BUILD','Engineer the experience'],['04','EVOLVE','Test, learn, improve']].map(x=><div key={x[0]}><span>{x[0]}</span><strong>{x[1]}</strong><p>{x[2]}</p><b>↗</b></div>)}</div></section>
<section className="contact" id="contact"><p className="eyebrow">04 / START A CONVERSATION</p><h2>{l('چیز بزرگی','LET’S BUILD')}<br/><em>{l('بسازیم.','WHAT’S NEXT.')}</em></h2><p>{l('اگر یک مسئله واقعی، پروژه پیچیده یا ایده تازه دارید، خوشحال می‌شوم گفتگو کنیم.','Have a difficult problem, an ambitious product or a new opportunity? I’d love to hear about it.')}</p><a href={'mailto:'+publicContact.email} className="contact-primary">{l('ایمیل بزنید','START A CONVERSATION')} ↗</a><div className="contact-address"><a href={'mailto:'+publicContact.email}>{publicContact.email}</a><div><a href={publicContact.github} target="_blank" rel="noopener noreferrer">GITHUB ↗</a><a href={publicContact.linkedin} target="_blank" rel="noopener noreferrer">LINKEDIN ↗</a></div></div></section>
</main><footer className="site-footer"><span>© 2026 SAEID SHAMSAEI</span><span>PRODUCTS. SYSTEMS. IMPACT.</span><a href="#top">{l('بازگشت به بالا','BACK TO TOP')} ↑</a></footer>
</div>;
}
