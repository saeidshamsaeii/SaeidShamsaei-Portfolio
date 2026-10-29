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
 const horizontal=read('components/HorizontalCaseChapter.tsx');
 const detail=read('components/CaseStudy.tsx');
 const narrative=read('data/caseNarratives.ts');
 const data=read('data/portfolio.ts');
 assert.doesNotMatch(home,/SourceProductPreview|project-'\+project\.id|sx-v4-project-art|sx-slide--overview/);
 assert.doesNotMatch(detail,/SourceProductPreview|project-'\+p\.id|case-hero-art/);
 assert.match(home,/HorizontalCaseChapter/);
 assert.match(horizontal,/story\.beats\.map\(\(beat,slideIndex\)=>/);
 assert.match(detail,/story\.chapters\.map/);
 assert.match(horizontal,/WordReveal/);
 assert.match(detail,/WordReveal/);
 for(const id of ['gartal','factory','digirezhim','petiwoo']){
  assert.ok(data.includes("id:'"+id+"'"),'missing core project '+id);
  assert.match(narrative,new RegExp('\\b'+id+':\\{'));
 }
 assert.equal((narrative.match(/durationSeconds:\d+/g)||[]).length,24);
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
test('headless moderate director preserves auto scroll, manual override and idle resume',()=>{
 const director=read('components/GuidedTour.tsx');
 const horizontal=read('components/HorizontalCaseChapter.tsx');
 const homepage=read('components/PortfolioExperience.tsx');
 const cases=read('components/CaseStudy.tsx');
 assert.ok(director.includes("querySelectorAll<HTMLElement>('[data-tour-stop]')"));
 assert.ok(director.includes('const READING_SPEED_PX_PER_SECOND=150'));
 assert.ok(director.includes('const MIN_SEGMENT_MS=2400'));
 assert.ok(director.includes('state.elapsed+=delta;'));
 assert.ok(!director.includes('targetSpeed=BASE_SPEED*stops[index].pace'));
 assert.ok(!director.includes('Current cinematic playback pace'));
 assert.ok(director.includes('const IDLE_RESUME_MS=3500'));
 assert.ok(director.includes('findNextFromScroll'));
 assert.ok(director.includes('resumeFromHere'));
 assert.ok(director.includes('setTimeout(resumeFromHere,IDLE_RESUME_MS)'));
 assert.ok(director.includes("window.addEventListener('wheel',manualInput"));
 assert.ok(director.includes("window.addEventListener('touchstart',onTouchStart"));
 assert.ok(director.includes("window.addEventListener('keydown',onKey"));
 assert.ok(director.includes("window.addEventListener('scroll',onScroll"));
 assert.ok(director.includes("root.dataset.portfolioTour=next"));
 assert.ok(director.includes('return null;'));
 assert.ok(!director.includes('Fixed playback speed'));
 assert.ok(!director.includes('displaySpeed.toFixed(1)'));
 assert.ok(!director.includes('setDisplaySpeed'));
 assert.ok(read('app/edition13.css').includes('@media (scripting:enabled)'));
 assert.ok(!director.includes('Change tour speed'));
 assert.ok(director.includes("event.key==='Escape'"));
 assert.ok(director.includes('resumeFromHere'));
 assert.ok(director.includes('onExitRef.current()'));
 assert.ok(director.includes('frameIndex'));
 assert.ok(horizontal.includes('data-horizontal-chapter'));
 assert.ok(horizontal.includes('data-frame-index'));
 assert.ok(homepage.includes('useState(true)'));
 assert.ok(cases.includes('useState(true)'));
 assert.doesNotMatch(homepage,/Restart guided site tour|sx-tour-trigger/);
 assert.doesNotMatch(cases,/RESTART TOUR/);
});
test('five distinct scroll-pinned editorial scenes preserve source-backed context and natural handoff',()=>{
 const home=read('components/PortfolioExperience.tsx');
 const chapter=read('components/HorizontalCaseChapter.tsx');
 const css=read('app/edition11.css');
 const word=read('components/WordReveal.tsx');
 assert.match(home,/HorizontalCaseChapter key=\{project\.id\}/);
 assert.match(chapter,/const count=3/);
 assert.match(chapter,/story\.beats\.map\(\(beat,slideIndex\)=>/);
 assert.match(chapter,/window\.addEventListener\('scroll',request/);
 assert.match(chapter,/translate3d\(/);
 assert.match(chapter,/data-frame-count=\{count\}/);
 assert.match(css,/position:sticky/);
 assert.match(css,/overflow:visible!important/);
 assert.match(css,/@media\(prefers-reduced-motion:reduce\)/);
 assert.match(word,/chapter\.dataset\.frameProgress/);
 assert.ok(word.includes('sx-v20-ordered'));
 assert.ok(word.includes('.sx-v10-case-section'));
 assert.ok(read('app/layout.tsx').includes("import './edition20.css';"));
 assert.ok(word.includes('word.getBoundingClientRect().top'));
 assert.ok(word.includes("clipPath='inset(0 '"));
 assert.ok(word.includes('[data-reveal-line]'));
 assert.ok(word.includes('progress*lines.length'));
 assert.ok(read('app/layout.tsx').includes("import './edition18.css';"));
 assert.ok(read('app/layout.tsx').includes("import './edition13.css';"));
 assert.match(read('app/layout.tsx'),/edition11\.css/);
 assert.ok(read('app/layout.tsx').includes("import './edition14.css';"));
 assert.ok(read('data/homeStories.ts').includes("factory:"));
 assert.ok(read('data/homeStories.ts').includes("digirezhim:"));
 assert.ok(!chapter.includes('chapters.flatMap'));
 assert.ok(!read('components/GuidedTour.tsx').includes('const eased='));
 assert.ok(read('components/GuidedTour.tsx').includes('scriptedScroll=state.start+(state.end-state.start)*fraction'));

});
test('personal portrait is preserved and public-facing case narrative is English',()=>{
 const homepage=read('components/PortfolioExperience.tsx');
 const bio=read('data/portfolio.ts');
 const cases=read('data/caseNarratives.ts');
 assert.equal((homepage.match(/src="\/assets\/hires\/portrait\.webp"/g)||[]).length,0);
 const cover=read('components/SignatureOpening.tsx');
 assert.equal((cover.match(/src="\/assets\/hires\/portrait\.webp"/g)||[]).length,1);
 assert.match(homepage,/SignatureOpening/);
 assert.match(homepage,/SelectedWorkIndex/);
 assert.match(read('app/layout.tsx'),/edition16\.css/);
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

test('engineering evidence mode is source-anchored, searchable and outside the cinematic tour',()=>{
 const data=read('data/engineeringEvidence.ts');
 const view=read('components/EngineeringIndex.tsx');
 const route=read('app/engineering/page.tsx');
 const css=read('app/engineering.css');
 const home=read('components/PortfolioExperience.tsx');
 const detail=read('components/CaseStudy.tsx');
 const sitemap=read('app/sitemap.ts');
 assert.equal((data.match(/id:'(gartal|factory|digirezhim|petiwoo)',scope:/g)||[]).length,4);
 assert.equal((data.match(/discipline:'(architecture|experience|delivery)'/g)||[]).length,12);
 assert.match(data,/Not independently verified|unverified:/);
 assert.match(data,/https:\/\/github.com\/saeidshamsaeii/);
 assert.match(view,/setQuery/);
 assert.match(view,/setFilter/);
 assert.match(view,/setProject/);
 assert.match(view,/fileUrl\(entry\.files\[i\]\)/);
 assert.doesNotMatch(view,/GuidedTour|SourceProductPreview/);
 assert.match(route,/EngineeringIndex/);
 assert.match(css,/sx-ei-project/);
 assert.match(home,/href="\/engineering\/"/);
 assert.match(detail,/engineering\/\#evidence-/);
 assert.match(sitemap,/engineering/);
});

test('Edition 19 starts Hello... and displays a high clear portrait with sequential authored project beats',()=>{
 const home=read('components/PortfolioExperience.tsx');
 const opening=read('components/SignatureOpening.tsx');
 const greeting=read('components/EnglishGreeting.tsx');
 const directory=read('components/SelectedWorkIndex.tsx');
 const css=read('app/edition19.css');
 assert.match(home,/EnglishGreeting onComplete=\{finishGreeting\}/);
 assert.match(home,/active=\{loaded&&introHoldFinished&&tour\}/);
 assert.match(opening,/sx-v19-photo-background/);
 assert.match(css,/object-fit:cover/);
 assert.doesNotMatch(opening,/sx-v16-cover-photo-note|sx-v16-cover-edge|sx-v16-cover-meta/);
  assert.match(greeting,/lang="en" dir="ltr"/);
  assert.doesNotMatch(greeting,/سلام|مرحباً|こんにちは|Привет|नमस्ते|Ciao|Bonjour/);
 assert.match(directory,/sx-v18-index-entry/);
 assert.doesNotMatch(directory,/sx-v17-index-watermark|PROJECT NOTE/);
 assert.match(css,/sx-v18-loader/);
 assert.match(css,/sx-v19-cover-content/);
 assert.match(read('app/edition18.css'),/sx-v18-reveal-line/);
 assert.match(css,/sx-v10-case-page/);
 assert.match(css,/sx-ei/);
});

test('ordered opening animation never overlaps its next sentence beat',()=>{
 const component=read('components/HorizontalCaseChapter.tsx');
 const word=read('components/WordReveal.tsx');
 const director=read('components/GuidedTour.tsx');
 const opening=read('components/SignatureOpening.tsx');
 const loader=read('components/EnglishGreeting.tsx');
 const mono=read('app/edition19.css');
 assert.match(component,/const count=3/);
 assert.ok(component.includes('data-tour-label={project.brand+\' / \'+beat.eyebrow}'));
 assert.match(component,/text=\{beat\.headline\}/);
 assert.match(word,/const before=sizes\.slice\(0,self\)/);
 assert.match(word,/return clamp\(\(clamp\(local\)\*total-before\)\/sizes\[self\]\)/);
 assert.match(word,/data-reveal-line/);
 assert.match(opening,/sx-v19-photo-background/);
 assert.match(mono,/object-position:50% 7%/);
 assert.match(mono,/background:#000!important/);
 assert.match(mono,/color:#fff!important/);
 assert.match(read('app/layout.tsx'),/themeColor:'#000000'/);
 assert.doesNotMatch(director,/sx-v11-top-speed|sx-v11-top-progress|setDisplaySpeed|AUTO STORY/);
 assert.match(loader,/setTimeout\(\(\)=>setLeaving\(true\),850\)/);
 assert.match(director,/stop\.element\.id==='intro'/);
});

test('Edition 20 keeps motion without visible Auto Story and reveals real wrapped lines in paragraph order',()=>{
 const tour=read('components/GuidedTour.tsx');
 const word=read('components/WordReveal.tsx');
 const cover=read('components/SignatureOpening.tsx');
 const home=read('components/PortfolioExperience.tsx');
 const css=read('app/edition20.css');
 assert.ok(tour.includes('return null;'));
 assert.ok(!tour.includes('AUTO STORY')||tour.includes('// automatic'));
 assert.ok(tour.includes('resumeFromHere'));
 assert.ok(word.includes('word.getBoundingClientRect().top'));
 assert.ok(word.includes('const blocks=blocksFor(container)'));
 assert.ok(word.includes('const before=sizes.slice(0,self)'));
 assert.ok(word.includes('.sx-v10-case-section'));
 assert.ok(word.includes('new ResizeObserver(invalidate)'));
 assert.ok(word.includes('function centerlineProgress(element:HTMLElement)'));
 assert.ok(word.includes('viewportGroup(group)'));
 assert.ok(word.includes('ready=true'));
 assert.ok(cover.includes('ready={ready}'));
 assert.ok(home.includes('<SignatureOpening ready={loaded}/>'));
 assert.match(css,/grid-template-columns:minmax\(0,1fr\) auto minmax\(0,1fr\)/);
 assert.match(css,/scale\(\.91\)/);
 assert.match(css,/object-fit:cover!important/);
 assert.match(css,/sx-v20-ordered/);
 assert.ok(read('app/layout.tsx').includes("import './edition20.css';"));
});

test('Edition 21 restores actual first-screen words and prevents simultaneous paragraphs while scrolling at a moderate speed',()=>{
 const cover=read('components/SignatureOpening.tsx');
 const style=read('app/edition20.css');
 const reveal=read('components/WordReveal.tsx');
 const director=read('components/GuidedTour.tsx');
 assert.match(cover,/I make complex digital systems/);
 assert.match(cover,/feel considered, useful and human\./);
 assert.match(cover,/ready=\{ready\}/);
 assert.match(style,/font-size:clamp\(45px,5\.8vw,90px\)/);
 assert.match(style,/transition:none!important/);
 assert.match(reveal,/function centerlineProgress/);
 assert.match(reveal,/const complete=viewport\*\.50-rect\.height\*\.50/);
 assert.match(reveal,/const before=sizes\.slice\(0,self\)/);
 assert.match(reveal,/host\.getBoundingClientRect\(\)\.bottom<=window\.innerHeight\*\.5/);
 assert.match(director,/READING_SPEED_PX_PER_SECOND=150/);
 assert.match(director,/distance\/READING_SPEED_PX_PER_SECOND\*1000/);
 assert.match(director,/MIN_SEGMENT_MS=2400/);
 assert.doesNotMatch(director,/currentSpeed|targetSpeed|paceBound/);
 assert.match(director,/return null;/);
});

test('Edition 22 guarantees complete text at viewport center, readable page tail and true monochrome contrast',()=>{
 const text=read('components/WordReveal.tsx');
 const css=read('app/edition20.css');
 const home=read('components/PortfolioExperience.tsx');
 assert.match(text,/function centerlineProgress\(element:HTMLElement\)/);
 assert.match(text,/const complete=viewport\*\.50-rect\.height\*\.50/);
 assert.match(text,/viewportGroup\(group\)/);
 assert.match(text,/progress=centerlineProgress\(host\)|:centerlineProgress\(host\)/);
 assert.match(text,/document\.documentElement\.scrollHeight-window\.innerHeight-4/);
 assert.match(text,/host\.getBoundingClientRect\(\)\.bottom<=window\.innerHeight\*\.5/);
 assert.doesNotMatch(text,/sectionClocks|pacedSection\(/);
 assert.match(css,/sx-v19-photo-background::after/);
 assert.match(css,/rgba\(0,0,0,\.74\)/);
 assert.match(css,/a\.sx-v18-brand:visited/);
 assert.match(css,/\.sx-v19-cover-content h1 \.sx-word-piece/);
 assert.match(css,/--sx-v10-accent:#fff!important/);
 assert.match(css,/sx-v10-case-page \.sx-v10-counter/);
 assert.match(css,/--ei-gold:#fff!important/);
 assert.ok(home.includes("className=\"sx-header sx-v18-header\""));
});

test('Edition 23 has grounded project copy, a blurred photo seam, no legacy gold and slower headless scroll',()=>{
 const stories=read('data/homeStories.ts');
 const directory=read('components/SelectedWorkIndex.tsx');
 const caseCopy=read('data/caseNarratives.ts');
 const director=read('components/GuidedTour.tsx');
 const css=read('app/edition20.css');
 const engineering=read('app/engineering.css');
 assert.match(stories,/GARTAL-SITE uses Next\\.js service routes/);
 assert.match(stories,/Windows Worker/);
 assert.match(stories,/clinical nutrition workflows/);
 assert.match(stories,/Zustand/);
 assert.match(directory,/Service pages · project requests/);
 assert.match(directory,/Doctor workspace · nutrition rules/);
 assert.match(caseCopy,/owner-approved upward-arrow brand mark/);
 assert.doesNotMatch(caseCopy,/energetic orange accents/);
 assert.match(director,/READING_SPEED_PX_PER_SECOND=150/);
 assert.match(director,/IDLE_RESUME_MS=3500/);
 assert.match(director,/return null;/);
 assert.match(css,/sx-v19-photo-background::before/);
 assert.match(css,/backdrop-filter:blur\(15px\)/);
 assert.match(css,/mask-image:linear-gradient\(to bottom/);
 assert.match(css,/sx-v19-photo-background::after/);
 assert.match(css,/rgba\(0,0,0,\.66\) 83%,#000 100%/);
 assert.match(css,/#intro\+\.sx-work-hero\{border-top:0!important/);
 assert.match(engineering,/--ei-gold:#ffffff/);
 assert.doesNotMatch(engineering,/#d2b78c|#dfc89f|#eddec4/);
});

test('Edition 24 holds for exactly two seconds only across real section background changes after text is complete',()=>{
 const director=read('components/GuidedTour.tsx');
 const words=read('components/WordReveal.tsx');
 const linux=read('components/ScrollHero.tsx');
 const homepage=read('components/PortfolioExperience.tsx');
 assert.match(director,/const BACKGROUND_PAUSE_MS=2000/);
 assert.match(director,/visibleSurface\(stop\)!==visibleSurface\(stops\[index\+1\]\)/);
 assert.match(director,/const hasBackgroundChange=stops\.map/);
 assert.match(director,/textHasFinished\(stops\[state\.index\]\)/);
 assert.match(director,/element\.dataset\.revealComplete==='true'/);
 assert.match(director,/horizontalHold\?'horizontal-frame':'background-change'/);
 assert.match(director,/const BACKGROUND_PAUSE_MS=2000/);
 assert.match(director,/delete root\.dataset\.portfolioTourHold/);
 assert.match(director,/last\.getBoundingClientRect\(\)/);
 assert.match(director,/COPY_SETTLE_MAX_MS=2600/);
 assert.match(linux,/data-tour-progress=\{String\(\(index\+\.80\)\/slides\.length\)\}/);
 assert.match(words,/host\.dataset\.revealComplete=progress>=\.999/);
 assert.match(words,/host\.dataset\.revealComplete='true'/);
 assert.match(homepage,/id="about"/);
 assert.match(homepage,/id="selected-projects"/);
 assert.doesNotMatch(director,/<aside|AUTO STORY|sx-v11-top-speed/);
 assert.match(director,/window\.addEventListener\('wheel',manualInput/);
 assert.match(director,/IDLE_RESUME_MS=3500/);
});

test('Edition 25 holds every horizontal panel 2 seconds after its text and before the leftward glide',()=>{
 const director=read('components/GuidedTour.tsx');
 const chapter=read('components/HorizontalCaseChapter.tsx');
 const reveal=read('components/WordReveal.tsx');
 assert.equal((chapter.match(/data-tour-hold="horizontal-frame"/g)||[]).length,1);
 assert.match(chapter,/story\.beats\.map\(\(beat,slideIndex\)=>/);
 assert.match(chapter,/data-frame-index=\{slideIndex\}/);
 assert.match(chapter,/const count=3/);
 assert.match(chapter,/const departure=clamp\(\(fraction-\.67\)\/\.33\)/);
 assert.match(director,/const HORIZONTAL_FRAME_PAUSE_MS=2000/);
 assert.match(director,/return top\+travel\*clamp\(\(index\+\.66\)\/count\)/);
 assert.match(director,/stop\.element\.dataset\.tourHold==='horizontal-frame'/);
 assert.match(director,/const horizontalHold=isHorizontalFrame\[state\.index\]/);
 assert.match(director,/const backgroundHold=hasBackgroundChange\[state\.index\]/);
 assert.match(director,/if\(horizontalHold\|\|backgroundHold\|\|mobileIntroCopy\|\|selectedWorkHold\)/);
 assert.match(director,/textHasFinished\(stops\[state\.index\]\)/);
 assert.match(director,/root\.dataset\.portfolioTourHold=mobileIntroCopy\?'intro-copy':/);
 assert.match(director,/horizontalHold\?HORIZONTAL_FRAME_PAUSE_MS:BACKGROUND_PAUSE_MS/);
 assert.match(director,/time-state\.holdStartedAt>=duration/);
 assert.match(director,/delete root\.dataset\.portfolioTourHold/);
 assert.match(reveal,/progress=grouped\(panel,clamp\(\(scaled-index\)\/\.64\)\)/);
 assert.match(director,/READING_SPEED_PX_PER_SECOND=150/);
 assert.match(director,/IDLE_RESUME_MS=3500/);
 assert.match(director,/return null;/);
});

test('Edition 26 never previews the next block during its predecessor reading hold',()=>{
 const chapter=read('components/HorizontalCaseChapter.tsx');
 const word=read('components/WordReveal.tsx');
 const director=read('components/GuidedTour.tsx');
 const css=read('app/edition20.css');
 assert.match(chapter,/panel\.dataset\.frameState!==state/);
 assert.match(chapter,/panelIndex>position\?'upcoming'/);
 assert.match(chapter,/new Event\('sx-horizontal-progress'\)/);
 assert.equal((chapter.match(/data-frame-state="upcoming"/g)||[]).length,2);
 assert.match(word,/horizontalChapter\.addEventListener\('sx-horizontal-progress',update\)/);
 assert.match(word,/horizontalChapter\?\.removeEventListener\('sx-horizontal-progress',update\)/);
 assert.match(word,/if\(host\.closest\('\[data-tour-awaiting="true"\]'\)\)progress=0/);
 assert.match(director,/awaitingNext\.dataset\.tourAwaiting='true'/);
 assert.match(director,/if\(awaitingNext\)delete awaitingNext\.dataset\.tourAwaiting/);
 assert.match(director,/reserveNext\(index\)/);
 assert.match(director,/clearAwaiting\(\)/);
 // All later beats must be reserved, not just the immediately upcoming one.
 assert.match(director,/stops\.slice\(index\+2\)/);
 assert.match(director,/awaitingLater\.push\(later\.element\)/);
 assert.match(director,/for\(const later of awaitingLater\)delete later\.dataset\.tourAwaiting/);
 assert.match(css,/\[data-frame-state="upcoming"\] \.sx-word-pieces/);
 assert.match(css,/\[data-tour-awaiting="true"\] > \*/);
 assert.match(css,/@media\(prefers-reduced-motion:reduce\)/);
 assert.match(director,/HORIZONTAL_FRAME_PAUSE_MS=2000/);
 assert.match(director,/!strictCopy&&time-state\.arrivedAt>=COPY_SETTLE_MAX_MS/);
 assert.match(director,/return top\+travel\*clamp\(\(index\+\.66\)\/count\)/);
});

test('Edition 27 fits the entire Selected Work directory and slows every reading beat',()=>{
 const directory=read('components/SelectedWorkIndex.tsx');
 const director=read('components/GuidedTour.tsx');
 const word=read('components/WordReveal.tsx');
 const css=read('app/edition20.css');
 assert.match(css,/#work-index\.sx-v18-index\{/);
 assert.match(css,/height:100svh!important/);
 assert.match(css,/grid-template-rows:repeat\(4,minmax\(0,1fr\)\)!important/);
 assert.match(css,/@media\(max-width:760px\)/);
 assert.match(css,/@media\(max-height:430px\)/);
 assert.match(directory,/const BETWEEN_BLOCK_HOLD_MS=2000/);
 assert.match(directory,/data-work-reveal-progress="0"/);
 assert.match(directory,/host\.hasAttribute\('data-tour-awaiting'\)/);
 assert.match(word,/grouped\(stage,local\)/);
 assert.match(word,/workIndex\.addEventListener\('sx-work-progress',update\)/);
 assert.match(word,/const byEntry=clamp\(\(performance\.now\(\)-entryStart\)\/4700\)/);
 assert.match(director,/READING_SPEED_PX_PER_SECOND=150/);
 assert.match(director,/MIN_SEGMENT_MS=2400/);
 assert.match(director,/const modestReadingMs=Math\.min\(6000,words\*120\)/);
 assert.match(director,/const INTRO_PHOTO_HOLD_MS=2000/);
 assert.match(director,/root\.dataset\.portfolioTourHold='intro-copy'/);
 assert.match(director,/time-state\.holdStartedAt>=INTRO_COPY_HOLD_MS/);
 assert.match(director,/mobileIntroCopy\?0:/);
 assert.match(director,/stops\[state\.index\]\.element\.id==='work-index'/);
});

test('Edition 28 holds all nine Selected Work word blocks fully framed for two seconds',()=>{
 const tour=read('components/GuidedTour.tsx');
 const directory=read('components/SelectedWorkIndex.tsx');
 const word=read('components/WordReveal.tsx');
 assert.match(tour,/const SELECTED_WORK_HOLD_MS=2000/);
 assert.match(tour,/if\(stop\.element\.id==='work-index'\)return top/);
 assert.match(tour,/hasBackgroundChange\[index\]&&stop\.element\.id!=='work-index'/);
 assert.match(tour,/const selectedWorkHold=stops\[state\.index\]\.element\.id==='work-index'/);
 assert.match(tour,/const workTypingFinished=!selectedWorkHold/);
 assert.match(tour,/dataset\.workRevealProgress\|\|'0'/);
 assert.match(tour,/workFullyFramed&&workTypingFinished/);
 assert.match(tour,/selectedWorkHold\?'selected-work'/);
 assert.match(tour,/selectedWorkHold\?SELECTED_WORK_HOLD_MS/);
 assert.match(directory,/const fullyFramed=rect\.height>innerHeight\+12/);
 assert.match(directory,/autoNarrating\?!fullyFramed/);
 assert.match(word,/!onIntro&&!workIndex&&!host\.closest/);
});

test('Edition 29 moves Selected Work copy up while it fades away on departure',()=>{
 const directory=read('components/SelectedWorkIndex.tsx');
 const css=read('app/edition20.css');
 const director=read('components/GuidedTour.tsx');
 assert.match(directory,/const renderExit=\(\)=>/);
 assert.match(directory,/Math\.min\(1,-rect\.top\/distance\)/);
 assert.match(directory,/host\.style\.setProperty\('--sx-work-exit',String\(progress\)\)/);
 assert.match(directory,/window\.addEventListener\('scroll',requestExit/);
 assert.match(directory,/host\.style\.removeProperty\('--sx-work-exit'\)/);
 assert.match(css,/#work-index \.sx-v18-index-heading\{/);
 assert.match(css,/#work-index \.sx-v18-index-entry\{/);
 assert.match(css,/opacity:calc\(1 - var\(--sx-work-exit, 0\) \* \.97\)/);
 assert.match(css,/translate3d\(0,calc\(var\(--sx-work-exit, 0\) \* -62px\),0\)/);
 assert.match(css,/@media\(prefers-reduced-motion:reduce\)/);
 // The new exit cue does not replace the full-copy two-second reading hold.
 assert.match(director,/const SELECTED_WORK_HOLD_MS=2000/);
 assert.match(director,/workFullyFramed&&workTypingFinished/);
});

test('Edition 30 types each Selected Work block before its own line and 2s reading hold',()=>{
 const directory=read('components/SelectedWorkIndex.tsx');
 const reveal=read('components/WordReveal.tsx');
 const css=read('app/edition20.css');
 const tour=read('components/GuidedTour.tsx');
 assert.match(directory,/const TITLE_TYPE_MS=2300/);
 assert.match(directory,/const ROW_TYPE_MS=2600/);
 assert.match(directory,/const LINE_DRAW_MS=500/);
 assert.match(directory,/const BETWEEN_BLOCK_HOLD_MS=2000/);
 assert.match(directory,/index<stages\.length-1\?BETWEEN_BLOCK_HOLD_MS:0/);
 assert.match(directory,/data-work-stage="0"/);
 assert.match(directory,/data-work-stage=\{index\+1\}/);
 assert.match(directory,/stage\.dataset\.workStageState=index<current\?'complete'/);
 assert.match(directory,/stage\.style\.setProperty\('--sx-work-rule',String\(draw\)\)/);
 assert.match(directory,/host\.dataset\.workStageIndex=String\(current\)/);
 assert.match(directory,/host\.dataset\.workStageProgress=String\(typingProgress\)/);
 assert.match(reveal,/active<current\?1:active>current\?0/);
 assert.match(reveal,/grouped\(stage,local\)/);
 assert.match(css,/border-bottom-color:transparent!important/);
 assert.match(css,/transform:scaleX\(var\(--sx-work-rule,0\)\)/);
 assert.match(css,/\[data-work-stage-state="pending"\]/);
 assert.match(css,/@media\(prefers-reduced-motion:reduce\)/);
 assert.match(css,/@media\(scripting:none\)/);
 assert.match(tour,/const SELECTED_WORK_HOLD_MS=2000/);
 assert.match(tour,/workFullyFramed&&workTypingFinished/);
});

test('English-only portfolio has no locale picker or translated routes',()=>{
 const layout=read('app/layout.tsx');
 const home=read('components/PortfolioExperience.tsx');
 const greeting=read('components/EnglishGreeting.tsx');
 const removed=[
  'components/LocaleProvider.tsx','components/LanguageSwitcher.tsx',
  'data/siteTranslations.ts','data/projectTranslations.ts',
  'data/caseTranslations.ts','data/engineeringTranslations.ts',
  'app/i18n.css','tests/edition31-eight-languages.spec.ts',
  'docs/EDITION31-EIGHT-LANGUAGE-LOCALIZATION.md'
 ];
 for(const file of removed)assert.ok(!fs.existsSync(path.join(root,file)),file+' must be absent');
 for(const flag of ['gb','ir','sa','it','de','fr','cn','ru'])
  assert.ok(!fs.existsSync(path.join(root,'public/flags',flag+'.svg')));
 assert.match(layout,/<html lang="en" dir="ltr">/);
 assert.doesNotMatch(layout,/LocaleProvider|i18n\.css/);
 assert.doesNotMatch(home,/LanguageSwitcher|useSiteLocale|siteText/);
 assert.match(greeting,/Hello/);
 assert.doesNotMatch(greeting,/سلام|مرحباً|Bonjour|Ciao|Привет/);
 assert.match(read('components/SelectedWorkIndex.tsx'),/BETWEEN_BLOCK_HOLD_MS=2000/);
 assert.match(read('components/SelectedWorkIndex.tsx'),/LINE_DRAW_MS=500/);
});

test('mobile Hello exits before a separate two-second photo hold and any automatic scroll',()=>{
 const home=read('components/PortfolioExperience.tsx');
 const tour=read('components/GuidedTour.tsx');
 const opening=read('components/SignatureOpening.tsx');
 const word=read('components/WordReveal.tsx');
 const css=read('app/quality.css');
 assert.match(home,/!loaded&&<EnglishGreeting onComplete=\{finishGreeting\}\/>/);
 assert.match(home,/if\(!loaded\)return/);
 assert.match(home,/root\.dataset\.portfolioTourHold='intro-photo'/);
 assert.match(home,/window\.setTimeout\(\(\)=>release\(false\),2000\)/);
 assert.match(home,/window\.scrollTo\(\{top:0,behavior:'instant'\}\)/);
 assert.match(home,/historyReturn/);
 assert.match(home,/active=\{loaded&&introHoldFinished&&tour\}/);
 assert.match(home,/const startHold=\(\)=>/);
 assert.match(home,/image\.addEventListener\('load',startHold/);
 assert.match(home,/window\.setTimeout\(startHold,4500\)/);
 assert.match(home,/revealCopy\(\)/);
 assert.match(tour,/introCover\.dataset\.mobilePhotoPhase==='copy'/);
 assert.match(tour,/if\(textHasFinished\(stops\[0\]\)&&beyond<=2\)/);
 assert.match(tour,/if\(stops\.length>1\)goTo\(1,window\.scrollY\)/);
 assert.doesNotMatch(tour,/photoWaitStartedAt|photoVisible\|\|time-photoWaitStartedAt/);
 assert.match(opening,/data-mobile-photo-phase="photo"/);
 assert.match(home,/new ResizeObserver\(measure\)/);
 assert.match(home,/--sx-intro-header-height/);
 assert.match(css,/min-height:max\(0px,calc\(100svh - var\(--sx-intro-header-height,72px\)\)\)!important/);
 assert.match(css,/--sx-intro-photo-height:clamp\(185px,42svh,405px\)/);
 assert.match(css,/height:var\(--sx-intro-photo-height\)!important/);
 assert.match(css,/margin-top:var\(--sx-intro-photo-height\)!important/);
 assert.match(css,/min-height:max\(0px,calc\(100svh - var\(--sx-intro-header-height,110px\) - var\(--sx-intro-photo-height\)\)\)!important/);
 assert.match(css,/data-mobile-photo-phase="photo"/);
 assert.match(tour,/const mobileIntroCopy=state\.index===0&&introMobile/);
 assert.match(tour,/const duration=mobileIntroCopy\?0:/);
 assert.match(word,/if\(mobile&&phase==='photo'\)/);
 assert.doesNotMatch(home,/mobilePhotoPhase='moving'/);
 assert.doesNotMatch(tour,/mobilePhotoPhase==='moving'/);
 assert.match(word,/mobileCopyStartedAt/);
 assert.match(word,/sx-mobile-intro-copy/);
});

test('mobile introduction has no image-to-title dead zone or first-paint text flash',()=>{
 const css=read('app/quality.css');
 const layout=read('app/layout.tsx');
 const opening=read('components/SignatureOpening.tsx');
 const word=read('components/WordReveal.tsx');
 assert.match(opening,/data-mobile-photo-phase="photo"/);
 assert.match(css,/justify-content:flex-start!important/);
 assert.match(css,/padding:clamp\(14px,2svh,21px\)/);
 assert.match(css,/scale\(1\.075\)!important/);
 assert.match(css,/transparent 57%,rgba\(0,0,0,\.08\) 72%/);
 assert.match(css,/@media \(max-width:760px\) and \(prefers-reduced-motion:no-preference\)\{/);
 assert.match(css,/\[data-mobile-photo-phase="photo"\] \.sx-v19-cover-content \*/);
 assert.match(css,/\[data-mobile-photo-phase="copy"\]/);
 assert.match(css,/\.sx-word-reveal:not\(\[data-motion="on"\]\) \[data-reveal-word\]/);
 assert.match(layout,/<noscript><style>/);
 assert.match(word,/host\.dataset\.motion='on'/);
});

test('exactly three substantive slides per project: problem, implementation, evidence',()=>{
 const chapter=read('components/HorizontalCaseChapter.tsx');
 const stories=read('data/homeStories.ts');
 const css=read('app/quality.css');
 assert.match(chapter,/const count=3/);
 assert.match(chapter,/story\.beats\.map\(\(beat,slideIndex\)=>/);
 assert.match(chapter,/data-frame-index=\{slideIndex\}/);
 assert.match(chapter,/text=\{beat\.headline\}/);
 assert.match(chapter,/text=\{beat\.copy\}/);
 assert.match(chapter,/beat\.notes\.map/);
 assert.match(chapter,/slideIndex===2\?/);
 assert.match(chapter,/READ FULL CASE STUDY/);
 for(const id of ['gartal','factory','digirezhim','petiwoo']){
  assert.match(stories,new RegExp('\\b'+id+':\\{beats:\\['));
 }
 assert.equal((stories.match(/eyebrow:'01 \/ THE PROBLEM'/g)||[]).length,4);
 assert.equal((stories.match(/eyebrow:'02 \/ IMPLEMENTATION'/g)||[]).length,4);
 assert.equal((stories.match(/eyebrow:'03 \/ WHAT IS VERIFIED'/g)||[]).length,4);
 assert.equal((stories.match(/notes:\[/g)||[]).length,12);
 assert.doesNotMatch(stories,/paying customers (?:have|were)|(?:increased|grew) sales by \d+%/);
 assert.match(css,/sx-v30-case-copy/);
 assert.match(css,/sx-v30-case-notes/);
});

test('intro types once, with deliberate photo-to-name spacing and no false manual state',()=>{
 const reveal=read('components/WordReveal.tsx');
 const home=read('components/PortfolioExperience.tsx');
 const css=read('app/quality.css');
 assert.match(reveal,/cover\.dataset\.mobileCopyManual==='true'/);
 assert.doesNotMatch(reveal,/document\.documentElement\.dataset\.portfolioTour!=='playing'/);
 assert.match(home,/cover\.dataset\.mobileCopyManual='true'/);
 assert.match(home,/timer=window\.setTimeout\(\(\)=>release\(false\),2000\)/);
 assert.match(css,/padding:clamp\(14px,2svh,21px\)/);
 assert.match(css,/padding:10px 16px 15px!important/);
 assert.match(css,/data-mobile-photo-phase="photo"/);
});

test('first intro glyph has no isolated one-pixel typing artifact',()=>{
 const word=read('components/WordReveal.tsx');
 const css=read('app/quality.css');
 assert.match(word,/const introTitle=onIntro&&Boolean\(host\.closest\('h1'\)\)/);
 assert.match(word,/const firstIntroWord=introTitle&&i===0&&j===0/);
 assert.match(word,/const shown=firstIntroWord\?clamp\(\(amount-\.18\)\/\.17\):amount/);
 assert.match(word,/const clipped=firstIntroWord&&amount<\.18\?0:amount/);
 assert.match(css,/#intro \[data-reveal-word\]::after/);
 assert.match(css,/content:none!important/);
 // The first letter stays fully invisible while only a hairline of the
 // word would have been clipped into view, then advances monotonically.
 const clamp=value=>Math.max(0,Math.min(1,value));
 const samples=[0,.01,.10,.17,.18,.20,.24,.30,.35,.60,1];
 const shown=samples.map(amount=>clamp((amount-.18)/.17));
 assert.deepEqual(shown.slice(0,5),[0,0,0,0,0]);
 assert.ok(shown.every((value,i)=>i===0||value>=shown[i-1]));
 assert.equal(shown[shown.length-1],1);
});

test('homepage introduction holds the native camera still through typing on phone and desktop',()=>{
 const tour=read('components/GuidedTour.tsx');
 const homepage=read('components/PortfolioExperience.tsx');
 assert.match(tour,/if\(stop\.element\.id==='intro'\)\{[\s\S]*?return top;[\s\S]*?\}/);
 assert.match(tour,/state\.index===0&&introCover&&state\.start<=12&&window\.scrollY<=12/);
 assert.match(tour,/const copyEnabled=!introMobile\|\|introCover\.dataset\.mobilePhotoPhase==='copy'/);
 assert.match(tour,/if\(copyEnabled&&textHasFinished\(stops\[0\]\)\)/);
 assert.match(tour,/if\(stops\.length>1\)goTo\(1,window\.scrollY\)/);
 assert.match(tour,/const first=introCover&&window\.scrollY<=12\?/);
 assert.doesNotMatch(tour,/Math\.min\(beyond,delta\*\.12\)/);
 assert.doesNotMatch(tour,/return top\+box\.height\*\.72/);
 assert.doesNotMatch(tour,/copy\.getBoundingClientRect\(\)\.top\+window\.scrollY-window\.innerHeight\*\.15/);
 assert.match(homepage,/window\.scrollTo\(\{top:0,behavior:'instant'\}\);[\s\S]*?setLoaded\(true\)/);
 assert.match(homepage,/if\(!window\.location\.hash&&nav\?\.type!=='back_forward'\)/);
 const greetingCompleted=homepage.indexOf('const finishGreeting=useCallback');
 const photoEffect=homepage.indexOf('if(!loaded)return');
 assert.ok(greetingCompleted>=0&&photoEffect>greetingCompleted);
 assert.doesNotMatch(homepage.slice(photoEffect),/window\.scrollTo\(\{top:0,behavior:'instant'\}\)/);
});

test('intro actions appear only after the full typed lead, then both viewports hold 2s',()=>{
 const opening=read('components/SignatureOpening.tsx');
 const css=read('app/quality.css');
 const director=read('components/GuidedTour.tsx');
 const layout=read('app/layout.tsx');
 assert.match(opening,/WordReveal as="p" className="sx-v18-cover-lead"/);
 assert.match(opening,/<div className="sx-v18-cover-links">/);
 assert.match(opening,/View work/);
 assert.match(opening,/Engineering/);
 assert.match(css,/#intro\.sx-v19-cover \.sx-v18-cover-links\{/);
 assert.match(css,/visibility:hidden!important;/);
 assert.match(css,/pointer-events:none!important;/);
 assert.match(css,/\.sx-v18-cover-lead\[data-reveal-complete="true"\] \+ \.sx-v18-cover-links/);
 assert.match(css,/visibility:visible!important;/);
 assert.match(css,/transition:none!important;/);
 assert.match(director,/const INTRO_COPY_HOLD_MS=2000/);
 assert.match(director,/const fullCopyReady=copyEnabled&&textHasFinished\(stops\[0\]\)&&/);
 assert.match(director,/introCover\.querySelector\('\.sx-v18-cover-lead\[data-reveal-complete="true"\]'\)/);
 assert.match(director,/if\(fullCopyReady\)\{/);
 assert.match(director,/root\.dataset\.portfolioTourHold='intro-copy'/);
 assert.match(director,/time-state\.holdStartedAt>=INTRO_COPY_HOLD_MS/);
 assert.match(director,/if\(stops\.length>1\)goTo\(1,window\.scrollY\)/);
 assert.doesNotMatch(director,/if\(introMobile\)\{[\s\S]{0,140}Advance only after BOTH/);
 assert.match(layout,/\.sx-v18-site #intro\.sx-v19-cover \.sx-v18-cover-links\{/);
});
