import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root=path.resolve(import.meta.dirname,'..');
const read=(file)=>fs.readFileSync(path.join(root,file),'utf8');

test('Linux hero types real DOM code according to scroll and retains three editorial acts',()=>{
 const hero=read('components/ScrollHero.tsx');
 const linux=read('components/LinuxCodeCanvas.tsx');
 assert.equal((hero.match(/index:'0[123]'/g)||[]).length,3);
 assert.match(hero,/requestAnimationFrame\(update\)/);
 assert.match(hero,/LinuxCodeCanvas progress=\{progress\}/);
 assert.match(hero,/WordReveal as="span"/);
 assert.match(linux,/fullProgram\.slice\(0,reveal\)/);
 assert.doesNotMatch(linux,/<img\b|<canvas\b|<video\b/);
 assert.match(hero,/data-tour-progress/);
});
test('all four case studies replace images and visual simulations with detailed source-backed prose',()=>{
 const home=read('components/PortfolioExperience.tsx');
 const detail=read('components/CaseStudy.tsx');
 const narrative=read('data/caseNarratives.ts');
 const data=read('data/portfolio.ts');
 assert.doesNotMatch(home,/SourceProductPreview|project-'\+project\.id|sx-v4-project-art|sx-slide--overview/);
 assert.doesNotMatch(detail,/SourceProductPreview|project-'\+p\.id|case-hero-art/);
 assert.match(home,/story\.chapters\.map/);
 assert.match(detail,/story\.chapters\.map/);
 assert.match(home,/WordReveal/);
 assert.match(detail,/WordReveal/);
 for(const id of ['gartal','factory','digirezhim','petiwoo']){
  assert.ok(data.includes("id:'"+id+"'"),'missing core project '+id);
  assert.match(narrative,new RegExp('\\b'+id+':\\{'));
 }
 assert.equal((narrative.match(/durationSeconds:/g)||[]).length,24);
 assert.match(narrative,/GARTAL-SITE/);
 assert.match(narrative,/AI-Development-Factory/);
 assert.match(narrative,/DigiRezhim/);
 assert.match(narrative,/Core-Petshop-Store/);
});
test('readable word reveal is linked to native scroll and respects reduced motion',()=>{
 const words=read('components/WordReveal.tsx');
 const css=read('app/edition10.css');
 assert.match(words,/data-reveal-word/);
 assert.match(words,/IntersectionObserver/);
 assert.match(words,/window\.addEventListener\('scroll'/);
 assert.match(words,/window\.matchMedia\('\(prefers-reduced-motion: reduce\)'\)/);
 assert.match(words,/sx-word-a11y/);
 assert.match(css,/sx-word-piece/);
 assert.match(css,/@media\(prefers-reduced-motion:reduce\)/);
});
test('automatic tour is shared by home and case pages and always allows manual takeover',()=>{
 const director=read('components/GuidedTour.tsx');
 const homepage=read('components/PortfolioExperience.tsx');
 const cases=read('components/CaseStudy.tsx');
 assert.match(director,/querySelectorAll<HTMLElement>\('\[data-tour-stop\]'\)/);
 assert.match(director,/requestAnimationFrame\(frame\)/);
 assert.match(director,/window\.scrollTo/);
 assert.match(director,/window\.addEventListener\('wheel',onManual/);
 assert.match(director,/window\.addEventListener\('touchstart',onManual/);
 assert.match(director,/Pause tour/);
 assert.match(director,/Resume tour/);
 assert.match(director,/Change tour speed/);
 assert.match(director,/Exit guided tour/);
 assert.match(homepage,/window\.setTimeout\(\(\)=>\{if\(!tourDismissed\)setTour\(true\);\},1800\)/);
 assert.match(cases,/window\.setTimeout\(\(\)=>\{if\(!dismissed\)setTour\(true\);\},1800\)/);
});
test('personal portrait is preserved and public-facing case narrative is English',()=>{
 const homepage=read('components/PortfolioExperience.tsx');
 const bio=read('data/portfolio.ts');
 const cases=read('data/caseNarratives.ts');
 assert.equal((homepage.match(/src="\/assets\/hires\/portrait\.webp"/g)||[]).length,1);
 assert.ok(fs.statSync(path.join(root,'public/assets/hires/portrait.webp')).size>1000);
 assert.match(bio,/ageYears:\s*25/);
 assert.match(bio,/yearsOfExperience:\s*5/);
 assert.doesNotMatch(cases,/[\u0600-\u06ff]/);
 assert.doesNotMatch(homepage,/[\u0600-\u06ff]/);
});
test('Edition 10 theme is last in stack, retaining accessibility and no forced deployment',()=>{
 const layout=read('app/layout.tsx');
 const css=read('app/edition10.css');
 assert.ok(layout.indexOf("import './edition10.css';")>layout.indexOf("import './edition09.css';"));
 assert.match(layout,/html lang="en" dir="ltr"/);
 assert.match(css,/sx-v10-case-section/);
 assert.match(css,/sx-v10-story-panel/);
 assert.match(css,/sx-v10-tour/);
});
