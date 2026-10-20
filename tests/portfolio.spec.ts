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
 await expect(page.locator('#top .sx-work-copy h1')).toContainText('BUILDING');
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
 await page.screenshot({path:'artifacts/desktop-workspace.png',animations:'disabled'});
 await page.locator('#about').scrollIntoViewIfNeeded();
 await page.screenshot({path:'artifacts/desktop-about.png',animations:'disabled'});
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
  if(name==='gartal')await page.screenshot({path:'artifacts/desktop-case-study-horizontal.png',animations:'disabled'});
  await goToProgress(page,name,1);
  await expect.poll(()=>segment.locator('.sx-story-rail').evaluate(e=>e.scrollLeft)).toBeGreaterThan(middle.max*.95);
 }
 const first=page.locator('#project-gartal'),second=page.locator('#project-factory');
 expect(await first.evaluate(e=>e.compareDocumentPosition(document.querySelector('#project-factory')!) & Node.DOCUMENT_POSITION_FOLLOWING)).toBeTruthy();
 await second.scrollIntoViewIfNeeded();
 await expect(second).toBeVisible();
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
   if(width===390&&name==='factory')await page.screenshot({path:'artifacts/mobile-horizontal-case-study.png',animations:'disabled'});
   await goToProgress(page,name,1);
  }
  if(width===390){
   await page.locator('#top').scrollIntoViewIfNeeded();
   await page.screenshot({path:'artifacts/mobile-workspace.png',animations:'disabled'});
   await page.locator('#about').scrollIntoViewIfNeeded();
   await page.screenshot({path:'artifacts/mobile-about.png',animations:'disabled'});
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
