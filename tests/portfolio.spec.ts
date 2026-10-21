import {test,expect} from '@playwright/test';
const names=['gartal','factory','digirezhim','petiwoo'] as const;
const fileNames=['portrait','logo',...names.map(n=>'project-'+n)];

async function goToProgress(page:import('@playwright/test').Page,name:string,fraction:number){
 return await page.locator('#project-'+name).evaluate((section,progress)=>{
  const sticky=section.querySelector('.sx-chapter-sticky') as HTMLElement;
  const rail=section.querySelector('.sx-story-rail') as HTMLElement;
  const start=section.getBoundingClientRect().top+window.scrollY;
  const range=section.getBoundingClientRect().height-sticky.getBoundingClientRect().height;
  window.scrollTo({top:start+range*progress,behavior:'instant'});
  return {start,range,max:rail.scrollWidth-rail.clientWidth};
 },fraction);
}

test('first developer workspace, second personal profile, then four projects',async({page})=>{
 await page.setViewportSize({width:1440,height:900});
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('html')).toHaveAttribute('lang','en');
 await expect(page.locator('html')).toHaveAttribute('dir','ltr');
 await expect(page.locator('#top .sx-work-copy h1')).toContainText('BEYOND');
 await expect(page.locator('#about .sx-profile-photo img')).toHaveCount(1);
 await expect(page.locator('#about .sx-focus-list>div')).toHaveCount(4);
 await expect(page.locator('.sx-chapter')).toHaveCount(4);
 await expect(page.locator('.sx-slide')).toHaveCount(20);
 expect(await page.locator('body').innerText()).not.toMatch(/[\u0600-\u06ff]/);
 expect(await page.locator('body').innerText()).not.toMatch(/\bIran\b/i);
 for(const item of fileNames){
  const res=await page.request.get('/assets/hires/'+item+'.webp');
  expect(res.status(),item).toBe(200);
 }
 expect((await page.request.get('/assets/hires/developer-workspace.svg')).status()).toBe(200);
 expect(await page.locator('.sx-profile-photo img').evaluate(async(e:HTMLImageElement)=>{
  await e.decode();return e.naturalWidth;
 })).toBe(1122);
 for(const name of names){
  await expect(page.locator('#project-'+name+' .sx-slide')).toHaveCount(5);
  const image=page.locator('#project-'+name+' .sx-slide-art img');
  expect(await image.evaluate(async(e:HTMLImageElement)=>{
   await e.decode();return e.naturalWidth;
  })).toBe(1448);
  await expect(page.locator('#project-'+name+' .sx-architecture-list>div')).toHaveCount(6);
  await expect(page.locator('#project-'+name+' .sx-capability-list>div')).toHaveCount(4);
 }
 expect(errors).toEqual([]);
 await expect(page.locator('.sx-intro')).toHaveCount(0); await page.screenshot({path:'artifacts/desktop-workspace.png',animations:'disabled'});
 await page.locator('#about').scrollIntoViewIfNeeded();
 await expect(page.locator('.sx-intro')).toHaveCount(0); await page.screenshot({path:'artifacts/desktop-about.png',animations:'disabled'});
});

test('editorial workspace has one primary action and uncluttered composition',async({page})=>{
 await page.setViewportSize({width:1440,height:900});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('#top h1')).toContainText('INTERFACE.');
 await expect(page.locator('#top .sx-hero-actions a')).toHaveCount(1);
 await expect(page.locator('#top .sx-work-art')).toHaveCount(1);
 await expect(page.locator('#top .sx-hero-blueprint .sx-blueprint-step')).toHaveCount(3);
 expect(await page.locator('#top .sx-work-art').evaluate(e=>getComputedStyle(e).backgroundImage)).toBe('none');
 await expect(page.locator('#contact .sx-contact-symbol img')).toHaveAttribute('src','/assets/hires/logo.webp');
 await expect(page.locator('#contact .sx-contact-symbol span')).toHaveCount(0);
 await expect(page.locator('#about .sx-profile-photo img')).toHaveCount(1);
 await expect(page.locator('#about .sx-profile-orbit')).toHaveCount(0);
 await expect(page.locator('#selected-projects h2')).toHaveCount(0);
 await expect(page.locator('#about .sx-focus-list>div')).toHaveCount(4);
 const rect=await page.locator('#top').boundingBox();
 expect(rect?.height).toBeGreaterThan(730);
 expect(rect?.height).toBeLessThan(920);
 await expect(page.locator('.sx-intro')).toHaveCount(0); await page.screenshot({path:'artifacts/editorial-workspace-1440.png',animations:'disabled'});
 await page.locator('#about').scrollIntoViewIfNeeded();
 await expect(page.locator('.sx-intro')).toHaveCount(0); await page.screenshot({path:'artifacts/editorial-about-1440.png',animations:'disabled'});
});
test('hero and personal introduction are responsive single-screen frames',async({browser})=>{
 for(const [width,height] of [[360,800],[390,844],[768,1024],[1024,768],[1440,900]]){
  const page=await browser.newPage({viewport:{width,height}});
  await page.goto('/',{waitUntil:'domcontentloaded'});
  const measurements=await page.evaluate(()=>{
   const hero=document.querySelector<HTMLElement>('#top')!;
   const profile=document.querySelector<HTMLElement>('#about')!;
   const image=document.querySelector<HTMLElement>('.sx-profile-photo')!;
   const copy=document.querySelector<HTMLElement>('.sx-profile-copy')!;
   const size=(el:HTMLElement)=>el.getBoundingClientRect();
   const ph=size(profile),hi=size(hero),im=size(image),cp=size(copy);
   return {innerHeight,heroHeight:hi.height,profileHeight:ph.height,
    profileCopyBottom:cp.bottom,profileImageBottom:im.bottom,profileBottom:ph.bottom,
    documentWidth:document.documentElement.scrollWidth,windowWidth:window.innerWidth,
    copyHeight:cp.height,photoHeight:im.height};
  });
  expect(measurements.documentWidth,String(width)).toBeLessThanOrEqual(measurements.windowWidth+1);
  const header=width<=760?62:72;
  expect(Math.abs(measurements.heroHeight-(measurements.innerHeight-header)),String(width)).toBeLessThanOrEqual(2);
  expect(Math.abs(measurements.profileHeight-measurements.innerHeight),String(width)).toBeLessThanOrEqual(2);
  expect(measurements.profileCopyBottom, 'about copy clipped at '+width).toBeLessThanOrEqual(measurements.profileBottom+3);
  expect(measurements.profileImageBottom, 'portrait clipped at '+width).toBeLessThanOrEqual(measurements.profileBottom+3);
  if(width===390){
   await page.locator('#top').scrollIntoViewIfNeeded();
   await expect(page.locator('.sx-intro')).toHaveCount(0); await page.screenshot({path:'artifacts/editorial-workspace-mobile.png',animations:'disabled'});
   await page.locator('#about').scrollIntoViewIfNeeded();
   await expect(page.locator('.sx-intro')).toHaveCount(0); await page.screenshot({path:'artifacts/editorial-about-mobile.png',animations:'disabled'});
  }
  await page.close();
 }
});
test('authored atelier first frame and real gold logo in final frame',async({browser})=>{
 for(const [width,height] of [[360,640],[360,800],[390,844],[768,1024],[1024,768],[1440,900],[1920,1080]]){
  const page=await browser.newPage({viewport:{width,height}});
  await page.goto('/',{waitUntil:'domcontentloaded'});
  const dimensions=await page.evaluate(()=>{
   const hero=document.querySelector<HTMLElement>('#top')!;
   const copy=hero.querySelector<HTMLElement>('.sx-work-copy')!;
   const diagram=hero.querySelector<HTMLElement>('.sx-hero-blueprint')!;
   const footer=document.querySelector<HTMLElement>('#contact .sx-contact-symbol')!;
   const bounds=(element:HTMLElement)=>{const {top,bottom,left,right,width,height}=element.getBoundingClientRect();return{top,bottom,left,right,width,height}};
   return {viewport:{width:innerWidth,height:innerHeight},scrollWidth:document.documentElement.scrollWidth,
     hero:bounds(hero),copy:bounds(copy),diagram:bounds(diagram),footer:bounds(footer)};
  });
  expect(dimensions.scrollWidth,'horizontal overflow '+width).toBeLessThanOrEqual(width+1);
  expect(dimensions.copy.left,'copy out of frame '+width).toBeGreaterThanOrEqual(dimensions.hero.left-1);
  expect(dimensions.copy.right,'copy right clipped '+width).toBeLessThanOrEqual(dimensions.hero.right+2);
  expect(dimensions.copy.bottom,'copy bottom clipped '+width).toBeLessThanOrEqual(dimensions.hero.bottom-25);
  expect(dimensions.diagram.right,'blueprint right clipped '+width).toBeLessThanOrEqual(dimensions.hero.right+2);
  expect(dimensions.diagram.bottom,'blueprint bottom clipped '+width).toBeLessThanOrEqual(dimensions.hero.bottom-15);
  // The process composition and the editorial message must be distinct surfaces.
  const overlap=(a:typeof dimensions.copy,b:typeof dimensions.copy)=>
    Math.min(a.left+a.width,b.left+b.width)-Math.max(a.left,b.left)>2 &&
    Math.min(a.top+a.height,b.top+b.height)-Math.max(a.top,b.top)>2;
  expect(overlap(dimensions.copy,dimensions.diagram),'hero typography overlaps visual '+width).toBe(false);
  await expect(page.locator('#contact .sx-contact-symbol img')).toHaveCount(1);
  expect(await page.locator('#contact .sx-contact-symbol img').evaluate(async(i:HTMLImageElement)=>{
   await i.decode();return i.naturalWidth;
  })).toBe(1254);
  if(width===390){
   await expect(page.locator('.sx-intro')).toHaveCount(0); await page.screenshot({path:'artifacts/atelier-hero-mobile.png',animations:'disabled'});
   await page.locator('#contact').scrollIntoViewIfNeeded();
   await expect(page.locator('.sx-intro')).toHaveCount(0); await page.screenshot({path:'artifacts/atelier-logo-mobile.png',animations:'disabled'});
  }
  if(width===1440){
   await expect(page.locator('.sx-intro')).toHaveCount(0); await page.screenshot({path:'artifacts/atelier-hero-desktop.png',animations:'disabled'});
   await page.locator('#contact').scrollIntoViewIfNeeded();
   await expect(page.locator('.sx-intro')).toHaveCount(0); await page.screenshot({path:'artifacts/atelier-logo-desktop.png',animations:'disabled'});
  }
  await page.close();
 }
});

test('intro is polished, skippable, session-aware, and respects reduced motion',async({browser})=>{
 const context=await browser.newContext({viewport:{width:390,height:844}});
 const page=await context.newPage();
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('.sx-intro')).toHaveCount(1);
 await expect(page.locator('.sx-intro strong')).toContainText('Complex ideas.');
 await expect(page.locator('.sx-intro img')).toHaveAttribute('src','/assets/hires/logo.webp');
 await page.locator('.sx-intro button').click();
 await expect(page.locator('.sx-intro')).toHaveCount(0);
 expect(await page.evaluate(()=>sessionStorage.getItem('saeid-portfolio-intro-v1'))).toBe('seen');
 await page.reload({waitUntil:'domcontentloaded'});
 await expect(page.locator('.sx-intro')).toHaveCount(0);
 await context.close();

 const reduced=await browser.newContext({reducedMotion:'reduce'});
 const reducedPage=await reduced.newPage();
 await reducedPage.goto('/',{waitUntil:'domcontentloaded'});
 await expect(reducedPage.locator('.sx-intro')).toHaveCount(0);
 await reduced.close();
});

test('real contact links and mobile layout do not collide',async({browser})=>{
 for(const [width,height] of [[360,640],[390,844],[430,932],[768,1024],[1440,900]]){
  const page=await browser.newPage({viewport:{width,height}});
  await page.goto('/',{waitUntil:'domcontentloaded'});
  await expect(page.locator('.sx-intro')).toHaveCount(0);
  const directory=page.locator('#contact .sx-contact-link');
  await expect(directory).toHaveCount(4);
  const hrefs=await directory.evaluateAll(nodes=>nodes.map(n=>n.getAttribute('href')));
  expect(hrefs).toEqual([
   'mailto:saeidshamsaeii00@gmail.com',
   'tel:+989017470729',
   'https://www.linkedin.com/in/saeidshamsaei/',
   'https://t.me/sd_shms'
  ]);
  await expect(page.locator('#contact')).toContainText('09017470729');
  await expect(page.locator('#contact')).toContainText('@sd_shms');
  await expect(page.locator('.sx-footer-social>a')).toHaveCount(4);
  const geometry=await page.evaluate(()=>{
   const root=document.querySelector<HTMLElement>('#contact')!;
   const layout=root.querySelector<HTMLElement>('.sx-contact-layout')!;
   const main=root.querySelector<HTMLElement>('.sx-contact-main')!;
   const brand=root.querySelector<HTMLElement>('.sx-contact-mark')!;
   const links=Array.from(root.querySelectorAll<HTMLElement>('.sx-contact-link'));
   const rect=(e:HTMLElement)=>{const {top,bottom,left,right}=e.getBoundingClientRect();return{top,bottom,left,right}};
   return {root:rect(root),layout:rect(layout),main:rect(main),brand:rect(brand),links:links.map(rect),
    scrollWidth:document.documentElement.scrollWidth,viewWidth:innerWidth};
  });
  expect(geometry.scrollWidth,'body overflow '+width).toBeLessThanOrEqual(geometry.viewWidth+1);
  const overlap=(a:{top:number;bottom:number;left:number;right:number},b:typeof a)=>
   Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top)>3 &&
   Math.min(a.right,b.right)-Math.max(a.left,b.left)>3;
  expect(overlap(geometry.main,geometry.brand),'contact text/logo overlap '+width).toBe(false);
  for(let i=0;i<geometry.links.length;i++){
   expect(geometry.links[i].left,'contact link outside left '+width).toBeGreaterThanOrEqual(geometry.root.left-2);
   expect(geometry.links[i].right,'contact link outside right '+width).toBeLessThanOrEqual(geometry.root.right+2);
   for(let j=i+1;j<geometry.links.length;j++){
    expect(overlap(geometry.links[i],geometry.links[j]),'contact links overlap '+width+' '+i+','+j).toBe(false);
   }
  }
  if(width===390||width===1440){
   await page.locator('#contact').scrollIntoViewIfNeeded();
   await page.screenshot({path:'artifacts/contact-'+width+'.png',animations:'disabled'});
  }
  await page.close();
 }
});

test('no mobile project overview text over picture or off the available scene',async({browser})=>{
 for(const [width,height] of [[360,640],[390,844],[768,1024]]){
  const page=await browser.newPage({viewport:{width,height}});
  await page.goto('/',{waitUntil:'domcontentloaded'});
  await expect(page.locator('.sx-intro')).toHaveCount(0);
  for(const name of names){
   await goToProgress(page,name,0);
   await expect.poll(()=>page.locator('#project-'+name+' .sx-story-rail').evaluate(e=>e.scrollLeft)).toBeLessThan(6);
   const g=await page.locator('#project-'+name).evaluate(section=>{
    const area=section.querySelector('.sx-viewport')!.getBoundingClientRect();
    const copy=section.querySelector('.sx-slide--overview .sx-slide-copy')!.getBoundingClientRect();
    const art=section.querySelector('.sx-slide--overview .sx-slide-art')!.getBoundingClientRect();
    return {copy:{top:copy.top,bottom:copy.bottom,left:copy.left,right:copy.right},
     art:{top:art.top,bottom:art.bottom,left:art.left,right:art.right},area:{top:area.top,bottom:area.bottom}};
   });
   const intersect=Math.min(g.copy.bottom,g.art.bottom)-Math.max(g.copy.top,g.art.top)>2
    &&Math.min(g.copy.right,g.art.right)-Math.max(g.copy.left,g.art.left)>2;
   expect(intersect,'content/image overlay '+name+' '+width).toBe(false);
   expect(g.art.bottom,'art exceeds frame '+name+' '+width).toBeLessThanOrEqual(g.area.bottom+3);
   expect(g.copy.top,'copy above frame '+name+' '+width).toBeGreaterThanOrEqual(g.area.top-3);
   if(width===390&&name==='gartal')
    await page.screenshot({path:'artifacts/mobile-gartal-frame.png',animations:'disabled'});
  }
  await page.close();
 }
});

test('scroll camera movement honors reduced motion',async({browser})=>{
 for(const mode of ['no-preference','reduce'] as const){
  const page=await browser.newPage({viewport:{width:1280,height:800},reducedMotion:mode});
  await page.goto('/',{waitUntil:'domcontentloaded'});
  await page.evaluate(()=>window.scrollTo({top:350,behavior:'instant'}));
  await expect.poll(async()=>{
   return await page.locator('#top').evaluate(element=>{
    const hero=element as HTMLElement;
    const actual=Number(hero.style.getPropertyValue('--sx-scroll'));
    const fraction=Math.min(1,Math.max(0,-hero.getBoundingClientRect().top/Math.max(1,window.innerHeight)));
    const expected=window.matchMedia('(prefers-reduced-motion: reduce)').matches?0:fraction;
    return Math.abs(actual-expected);
   });
  },{timeout:3000}).toBeLessThan(.005);
  if(mode==='no-preference'){
   const progress=await page.locator('#top').evaluate(e=>Number((e as HTMLElement).style.getPropertyValue('--sx-scroll')));
   expect(progress).toBeGreaterThan(0);
   expect(progress).toBeLessThan(1);
  }
  await page.close();
 }
});

test('vertical scroll drives horizontal story for each project on desktop',async({page})=>{
 await page.setViewportSize({width:1440,height:900});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 for(const name of names){
  const segment=page.locator('#project-'+name);
  await expect.poll(async()=>segment.evaluate(e=>e.getBoundingClientRect().height)).toBeGreaterThan(1000);
  await goToProgress(page,name,0);
  await expect.poll(()=>segment.locator('.sx-story-rail').evaluate(e=>e.scrollLeft)).toBeLessThan(12);
  const middle=await goToProgress(page,name,.55);
  expect(middle.max).toBeGreaterThan(1200);
  await expect.poll(()=>segment.locator('.sx-story-rail').evaluate(e=>e.scrollLeft),{timeout:5500}).toBeGreaterThan(middle.max*.40);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1)).toBe(true);
  if(name==='gartal')await expect(page.locator('.sx-intro')).toHaveCount(0); await page.screenshot({path:'artifacts/desktop-case-study-horizontal.png',animations:'disabled'});
  await goToProgress(page,name,1);
  await expect.poll(()=>segment.locator('.sx-story-rail').evaluate(e=>e.scrollLeft)).toBeGreaterThan(middle.max*.95);
 }
 const first=page.locator('#project-gartal'),second=page.locator('#project-factory');
 expect(await first.evaluate(e=>e.compareDocumentPosition(document.querySelector('#project-factory')!) & Node.DOCUMENT_POSITION_FOLLOWING)).toBeTruthy();
 await second.scrollIntoViewIfNeeded();
 await expect(second).toBeVisible();
});

test('paused wheel scrolling snaps to a complete case-study frame',async({page})=>{
 await page.setViewportSize({width:1440,height:900});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 const segment=page.locator('#project-gartal');
 await expect.poll(()=>segment.evaluate(e=>e.getBoundingClientRect().height)).toBeGreaterThan(1000);
 const {max}=await goToProgress(page,'gartal',.59);
 await expect.poll(async()=>{
  const left=await segment.locator('.sx-story-rail').evaluate(e=>e.scrollLeft);
  return Math.abs(left/max-.5);
 },{timeout:6000,intervals:[150,200,300]}).toBeLessThan(.022);
 await expect(page.locator('.sx-intro')).toHaveCount(0); await page.screenshot({path:'artifacts/desktop-case-study-snapped.png',animations:'disabled'});
});

test('touch-size/mobile vertical scrolling progresses horizontally, then next project',async({browser})=>{
 for(const width of [360,390,768]){
  const page=await browser.newPage({viewport:{width,height:844},isMobile:width<500,hasTouch:width<500});
  await page.goto('/',{waitUntil:'domcontentloaded'});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1),String(width)).toBe(true);
  await expect(page.locator('#about')).toBeAttached();
  for(const name of names){
   const chapter=page.locator('#project-'+name);
   await expect.poll(()=>chapter.evaluate(e=>e.getBoundingClientRect().height)).toBeGreaterThan(1000);
   const middle=await goToProgress(page,name,.57);
   expect(middle.max).toBeGreaterThan(300);
   await expect.poll(()=>chapter.locator('.sx-story-rail').evaluate(e=>e.scrollLeft),{timeout:6000}).toBeGreaterThan(middle.max*.4);
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1)).toBe(true);
   if(width===390&&name==='factory')await expect(page.locator('.sx-intro')).toHaveCount(0); await page.screenshot({path:'artifacts/mobile-horizontal-case-study.png',animations:'disabled'});
   await goToProgress(page,name,1);
  }
  if(width===390){
   await page.locator('#top').scrollIntoViewIfNeeded();
   await expect(page.locator('.sx-intro')).toHaveCount(0); await page.screenshot({path:'artifacts/mobile-workspace.png',animations:'disabled'});
   await page.locator('#about').scrollIntoViewIfNeeded();
   await expect(page.locator('.sx-intro')).toHaveCount(0); await page.screenshot({path:'artifacts/mobile-about.png',animations:'disabled'});
  }
  await page.close();
 }
});

test('case slide arrow controls, full routes and navigation',async({page})=>{
 await page.goto('/',{waitUntil:'domcontentloaded'});
 for(const anchor of ['#top','#about','#selected-projects','#approach','#contact']){
  const a=page.locator('a[href="'+anchor+'"]').first();
  await expect(a).toBeAttached();
 }
 const project=page.locator('#project-gartal');
 await goToProgress(page,'gartal',0);
 await project.getByRole('button',{name:'Next GARTAL slide'}).click();
 await expect.poll(()=>project.locator('.sx-story-rail').evaluate(e=>e.scrollLeft),{timeout:6000}).toBeGreaterThan(100);
 for(const slug of names){
  await page.goto('/work/'+slug+'/',{waitUntil:'domcontentloaded'});
  await expect(page.locator('.case-section')).toHaveCount(2);
  await expect(page.locator('.case-capabilities>div')).toHaveCount(6);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1)).toBe(true);
 }
});

test('reduced motion preserves horizontal native navigation',async({browser})=>{
 const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('.sx-chapter')).toHaveCount(4);
 const first=page.locator('#project-gartal');
 expect(await first.evaluate(e=>getComputedStyle(e.querySelector('.sx-chapter-sticky')!).position)).toBe('relative');
 const rail=first.locator('.sx-story-rail');
 const overflow=await rail.evaluate(e=>getComputedStyle(e).overflowX);
 expect(overflow).toBe('auto');
 await rail.evaluate(e=>{e.scrollLeft=e.scrollWidth-e.clientWidth;});
 await expect.poll(()=>rail.evaluate(e=>e.scrollLeft)).toBeGreaterThan(300);
 await page.close();
});
