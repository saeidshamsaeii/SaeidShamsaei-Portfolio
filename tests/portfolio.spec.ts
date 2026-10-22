import {test,expect,type Page} from '@playwright/test';

const projectIds=['gartal','factory','digirezhim','petiwoo'] as const;
async function suppressIntro(page:Page){
 await page.addInitScript(()=>{try{sessionStorage.setItem('saeid-portfolio-intro-v1','seen')}catch{}});
}
async function progressTo(page:Page,id:string,ratio:number){
 return await page.locator('#project-'+id).evaluate((section,p)=>{
  const sticky=section.querySelector('.sx-chapter-sticky') as HTMLElement;
  const rail=section.querySelector('.sx-story-rail') as HTMLElement;
  const start=section.getBoundingClientRect().top+window.scrollY;
  const distance=section.getBoundingClientRect().height-sticky.getBoundingClientRect().height;
  window.scrollTo({top:start+distance*p,behavior:'instant'});
  return {distance,width:rail.scrollWidth-rail.clientWidth,start};
 },ratio);
}

test('Edition 08 opens with purpose-only slides, then a portrait bio and four five-frame projects',async({page})=>{
 await suppressIntro(page);
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.setViewportSize({width:1440,height:900});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('html')).toHaveAttribute('lang','en');
 await expect(page.locator('html')).toHaveAttribute('dir','ltr');
 await expect(page.locator('#top h1')).toContainText('I BUILD DIGITAL');
 await expect(page.locator('#top h1')).toContainText('THINGS THAT MATTER.');
 await expect(page.locator('#top img')).toHaveCount(0);
 await expect(page.locator('#top .sx-v8-hero-slide')).toHaveCount(3);
 await expect(page.locator('#about .sx-v8-about-portrait img')).toHaveCount(1);
 const imageWidth=await page.locator('#about .sx-v8-about-portrait img').evaluate(async(img:HTMLImageElement)=>{await img.decode();return img.naturalWidth;});
 expect(imageWidth).toBe(1122);
 await expect(page.locator('#about .sx-v8-about-portrait img')).toHaveAttribute('src','/assets/hires/portrait.webp');
 expect((await page.request.get('/assets/hires/portrait-office.webp')).status()).toBe(200);
 await expect(page.locator('#top .sx-blueprint-step')).toHaveCount(0);
 await expect(page.locator('#about .sx-v8-about-experience>div')).toHaveCount(3);
 await expect(page.locator('#approach')).toHaveCount(0);
 await expect(page.locator('.sx-chapter')).toHaveCount(4);
 await expect(page.locator('.sx-slide')).toHaveCount(20);
 await expect(page.locator('#contact .sx-contact-symbol img')).toHaveCount(1);
 expect(await page.locator('body').innerText()).not.toMatch(/[\u0600-\u06ff]/);
 expect(await page.locator('body').innerText()).not.toMatch(/\bIran\b/i);
 for(const id of projectIds){
  const section=page.locator('#project-'+id);
  await expect(section.locator('.sx-slide')).toHaveCount(5);
  const art=section.locator('.sx-slide--overview .sx-v4-project-art img');
  await expect(art).toHaveAttribute('src','/assets/hires/project-'+id+'.webp');
  const dimensions=await art.evaluate(async(img:HTMLImageElement)=>{await img.decode();return{width:img.naturalWidth,height:img.naturalHeight}});
  expect(dimensions).toEqual({width:1448,height:1086});
  await expect(section.locator('.sx-architecture-list>div')).toHaveCount(3);
  await expect(section.locator('.sx-capability-list>div')).toHaveCount(3);
  await expect(section.locator('.sx-slide-dots button')).toHaveCount(5);
 }
 expect(errors).toEqual([]);
 await page.screenshot({path:'artifacts/v5-office-hero-desktop.png',animations:'disabled'});
 await page.locator('#about').scrollIntoViewIfNeeded();
 await page.screenshot({path:'artifacts/v4-about-desktop.png',animations:'disabled'});
});

test('vertical wheel progress moves every horizontal chapter and allows natural handoff',async({page})=>{
 await suppressIntro(page);
 await page.setViewportSize({width:1440,height:900});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 for(const id of projectIds){
  const section=page.locator('#project-'+id);
  await expect.poll(()=>section.evaluate(e=>e.getBoundingClientRect().height)).toBeGreaterThan(1200);
  await progressTo(page,id,0);
  await expect.poll(()=>section.locator('.sx-story-rail').evaluate(e=>e.scrollLeft)).toBeLessThan(15);
  const mid=await progressTo(page,id,.57);
  expect(mid.distance).toBeGreaterThan(500);
  expect(mid.width).toBeGreaterThan(1000);
  await expect.poll(()=>section.locator('.sx-story-rail').evaluate(e=>e.scrollLeft),{timeout:5000}).toBeGreaterThan(mid.width*.43);
  if(id==='gartal')await page.screenshot({path:'artifacts/v4-horizontal-gartal-desktop.png',animations:'disabled'});
  await progressTo(page,id,1);
  await expect.poll(()=>section.locator('.sx-story-rail').evaluate(e=>e.scrollLeft)).toBeGreaterThan(mid.width*.94);
 }
 const first=page.locator('#project-gartal'),last=page.locator('#project-petiwoo');
 expect(await first.evaluate(e=>!!(e.compareDocumentPosition(document.querySelector('#project-factory')!)&Node.DOCUMENT_POSITION_FOLLOWING))).toBe(true);
 await last.scrollIntoViewIfNeeded();
 await expect(last).toBeVisible();
});

test('Edition 08 advances purpose slider with native scrolling and hands off to portrait biography',async({page})=>{
 await suppressIntro(page);
 await page.setViewportSize({width:1440,height:900});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 const hero=page.locator('#top');
 await expect(hero.locator('img')).toHaveCount(0);
 await expect(hero).toHaveAttribute('data-ready','true');
 const height=await hero.evaluate(e=>e.getBoundingClientRect().height);
 expect(height).toBeGreaterThan(1300);
 const meta=await hero.evaluate(e=>({start:e.getBoundingClientRect().top+window.scrollY,travel:e.getBoundingClientRect().height-window.innerHeight}));
 for(const [ratio,scene] of [[.08,'0'],[.47,'1'],[.88,'2']] as const){
  await page.evaluate(y=>window.scrollTo({top:y,behavior:'instant'}),meta.start+meta.travel*ratio);
  await expect(hero).toHaveAttribute('data-scene',scene);
  await expect(hero.locator('.sx-v8-hero-slide').nth(Number(scene))).toHaveAttribute('data-active','true');
 }
 const about=page.locator('#about');
 await about.scrollIntoViewIfNeeded();
 await expect(about.locator('.sx-v8-about-portrait img')).toBeVisible();
 await expect(about).toContainText('Software Architect');
 await expect(about.locator('.sx-v8-about-experience>div')).toHaveCount(3);
 await expect(page.locator('#selected-projects')).toHaveCount(1);
});

test('mobile viewport containment, no typography/image overlap and useful scroll cues',async({browser})=>{
 for(const [width,height] of [[360,640],[390,844],[430,932],[768,1024]]){
  const page=await browser.newPage({viewport:{width,height},isMobile:width<500,hasTouch:width<500});
  await suppressIntro(page);
  await page.goto('/',{waitUntil:'domcontentloaded'});
  const geom=await page.evaluate(()=>{
   const rect=(selector:string)=>{const r=document.querySelector(selector)!.getBoundingClientRect();return{left:r.left,right:r.right,top:r.top,bottom:r.bottom,height:r.height,width:r.width}};
   return{w:window.innerWidth,outer:document.documentElement.scrollWidth,
    hero:rect('#top'),slide:rect('.sx-v8-hero-slide[data-active="true"]'),
    about:rect('#about'),portrait:rect('#about .sx-v8-about-portrait')};
  });
  expect(geom.outer,'horizontal overflow '+width).toBeLessThanOrEqual(geom.w+1);
  expect(geom.slide.left,'hero text left '+width).toBeGreaterThanOrEqual(-2);
  expect(geom.slide.right,'hero text right '+width).toBeLessThanOrEqual(geom.w+2);
  expect(geom.portrait.right,'portrait right '+width).toBeLessThanOrEqual(geom.w+2);
  expect(geom.hero.height,'purpose scroll area '+width).toBeGreaterThan(height*1.4);
  expect(geom.about.height,'bio height '+width).toBeGreaterThan(height*.95);
  for(const id of projectIds){
   const chapter=page.locator('#project-'+id);
   const mid=await progressTo(page,id,.53);
   expect(mid.width).toBeGreaterThan(500);
   await expect.poll(()=>chapter.locator('.sx-story-rail').evaluate(e=>e.scrollLeft),{timeout:6000}).toBeGreaterThan(mid.width*.35);
   const noOverflow=await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1);
   expect(noOverflow,'page overflow after horizontal scroll '+id+' '+width).toBe(true);
   await progressTo(page,id,0);
   const img=chapter.locator('.sx-slide--overview .sx-v4-project-art img');
   const decoded=await img.evaluate(async(image:HTMLImageElement)=>{
    await image.decode();
    const box=image.getBoundingClientRect();
    return {naturalWidth:image.naturalWidth,display:getComputedStyle(image).display,opacity:getComputedStyle(image).opacity,width:box.width,height:box.height};
   });
   expect(decoded.naturalWidth,'visual did not load '+id).toBe(1448);
   expect(decoded.display,'visual is hidden '+id).not.toBe('none');
   expect(decoded.width,'visual is zero width '+id).toBeGreaterThan(150);
   expect(decoded.height,'visual is zero height '+id).toBeGreaterThan(150);
   if(width===390&&id==='gartal')await page.screenshot({path:'artifacts/v4-project-mobile.png',animations:'disabled'});
  }
  if(width===390){
   await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
   await page.locator('#about .sx-v8-about-portrait img').evaluate(async(img:HTMLImageElement)=>{await img.decode();});
   await page.screenshot({path:'artifacts/v5-office-hero-mobile.png',animations:'disabled'});
   await page.locator('#about').scrollIntoViewIfNeeded();
   await page.screenshot({path:'artifacts/v4-about-mobile.png',animations:'disabled'});
  }
  await page.close();
 }
});

test('real contact actions and real logo remain available',async({page})=>{
 await suppressIntro(page);
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('#contact .sx-contact-link')).toHaveCount(4);
 const hrefs=await page.locator('#contact .sx-contact-link').evaluateAll(nodes=>nodes.map(n=>n.getAttribute('href')));
 expect(hrefs).toEqual([
  'mailto:saeidshamsaeii00@gmail.com','tel:+989017470729',
  'https://www.linkedin.com/in/saeidshamsaei/','https://t.me/sd_shms'
 ]);
 await expect(page.locator('#contact .sx-contact-symbol img')).toHaveAttribute('src','/assets/hires/logo.webp');
 await expect(page.locator('.sx-footer-social>a')).toHaveCount(4);
 await page.locator('#contact').scrollIntoViewIfNeeded();
 await page.screenshot({path:'artifacts/v4-contact-desktop.png',animations:'disabled'});
});

test('independent case routes show conceptual art and truthful interactive source studies',async({page})=>{
 await suppressIntro(page);
 for(const id of projectIds){
  await page.goto('/work/'+id+'/',{waitUntil:'domcontentloaded'});
  const img=page.locator('.sx-v4-case-hero-art img');
  await expect(img).toHaveCount(1);
  await expect(img).toHaveAttribute('src','/assets/hires/project-'+id+'.webp');
  await expect(page.locator('.sx-v4-case-hero-art')).toContainText('NOT A LIVE CAPTURE');
  await expect(page.locator('.sx-v4-case-source .sx-v3-source-preview')).toHaveCount(1);
  await page.locator('.sx-v4-case-source').getByRole('button',{name:'Architecture'}).click();
  await expect(page.locator('.sx-v4-case-source').getByRole('button',{name:'Architecture'})).toHaveAttribute('aria-pressed','true');
  await expect(page.locator('.case-section')).toHaveCount(2);
  await expect(page.locator('.case-capabilities>div')).toHaveCount(6);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1)).toBe(true);
 }
});

test('direct entry shows all purpose slides and reduced motion keeps projects navigable',async({browser})=>{
 const context=await browser.newContext({viewport:{width:390,height:844}});
 const page=await context.newPage();
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('.sx-intro')).toHaveCount(0);
 await expect(page.locator('#top .sx-v8-hero-slide')).toHaveCount(3);
 await expect(page.locator('#top img')).toHaveCount(0);
 await context.close();

 const reduced=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
 const rp=await reduced.newPage();
 await rp.goto('/',{waitUntil:'domcontentloaded'});
 await expect(rp.locator('.sx-intro')).toHaveCount(0);
 await expect(rp.locator('#top .sx-v8-hero-slide')).toHaveCount(3);
 const sticky=await rp.locator('#project-gartal .sx-chapter-sticky').evaluate(e=>getComputedStyle(e).position);
 expect(sticky).toBe('relative');
 const rail=rp.locator('#project-gartal .sx-story-rail');
 expect(await rail.evaluate(e=>getComputedStyle(e).overflowX)).toBe('auto');
 await rail.evaluate(el=>{el.scrollLeft=el.scrollWidth-el.clientWidth;});
 await expect.poll(()=>rail.evaluate(el=>el.scrollLeft)).toBeGreaterThan(300);
 await reduced.close();
});

test('Edition 07 visual parity holds on dark case pages without losing authenticity disclosures',async({page})=>{
 await suppressIntro(page);
 for(const id of projectIds){
  await page.goto('/work/'+id+'/',{waitUntil:'domcontentloaded'});
  const color=await page.locator('.case-study').evaluate(e=>getComputedStyle(e).backgroundColor);
  expect(color).toBe('rgb(10, 12, 14)');
  await expect(page.locator('.sx-v4-case-hero-art small')).toContainText('NOT A LIVE CAPTURE');
  await expect(page.locator('.case-nav')).toBeVisible();
 }
});

test('Edition 08 reduced motion keeps every mission slide readable without a scroll trap',async({browser})=>{
 const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
 const page=await context.newPage();
 await page.goto('/',{waitUntil:'domcontentloaded'});
 const root=page.locator('#top');
 await expect(root.locator('.sx-v8-hero-slide')).toHaveCount(3);
 for(const slide of await root.locator('.sx-v8-hero-slide').all()){
  const style=await slide.evaluate(e=>({position:getComputedStyle(e).position,opacity:getComputedStyle(e).opacity}));
  expect(style.position).toBe('relative');
  expect(style.opacity).toBe('1');
 }
 await expect(page.locator('#about .sx-v8-about-portrait img')).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth)).toBeLessThanOrEqual(1);
 await context.close();
});
