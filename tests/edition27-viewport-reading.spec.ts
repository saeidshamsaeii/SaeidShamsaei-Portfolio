import {test,expect} from '@playwright/test';

test('Selected Work presents four complete linked rows in one viewport at standard responsive sizes',async({browser})=>{
 for(const viewport of [
  {width:320,height:568},{width:390,height:844},
  {width:768,height:1024},{width:1440,height:900}
 ]){
  const page=await browser.newPage({viewport,reducedMotion:'reduce'});
  await page.goto('/',{waitUntil:'domcontentloaded'});
  const result=await page.locator('#work-index').evaluate(section=>{
   const bounds=section.getBoundingClientRect();
   const children=Array.from(section.querySelectorAll<HTMLElement>(
    '.sx-v18-index-heading,.sx-v18-index-entry,.sx-v18-index-entry .sx-v18-index-direct'
   ));
   return {
    height:bounds.height,screen:innerHeight,
    overflow:section.scrollWidth-section.clientWidth,
    rows:section.querySelectorAll('.sx-v18-index-entry').length,
    childrenWithin:children.every(el=>{
     const r=el.getBoundingClientRect();
     return r.top>=bounds.top-2&&r.bottom<=bounds.bottom+2;
    })
   };
  });
  expect(result.rows).toBe(4);
  expect(Math.abs(result.height-result.screen)).toBeLessThanOrEqual(2);
  expect(result.childrenWithin,'clipped content at '+viewport.width).toBe(true);
  expect(result.overflow,'horizontal overflow at '+viewport.width).toBeLessThanOrEqual(2);
  await page.close();
 }
});

test('Selected Work types title and projects in one slower ordered sequence',async({page})=>{
 test.setTimeout(60000);
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('.sx-v18-loader')).toHaveCount(0,{timeout:9000});
 await page.keyboard.press('Escape');
 await page.locator('#work-index').evaluate(node=>node.scrollIntoView({block:'start',behavior:'instant'}));
 const section=page.locator('#work-index');
 await expect.poll(()=>section.getAttribute('data-work-reveal-progress'),{timeout:4000})
  .not.toBe('0');
 await page.waitForTimeout(850);
 await expect(section.locator('.sx-v18-index-entry').last().locator('.sx-word-reveal').last())
  .toHaveAttribute('data-reveal-complete','false');
 await expect.poll(()=>section.locator('.sx-word-reveal[data-reveal-complete="true"]').count(),
  {timeout:36000}).toBe(9);
});

test('portrait opening finishes typing and holds completely still for two seconds',async({page})=>{
 await page.setViewportSize({width:1440,height:900});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('.sx-v18-loader')).toHaveCount(0,{timeout:9000});
 const html=page.locator('html');
 await expect(html).toHaveAttribute('data-portfolio-tour-hold','intro-photo',{timeout:12000});
 await expect(page.locator('#intro .sx-word-reveal[data-reveal-complete="true"]')).toHaveCount(2);
 const y=await page.evaluate(()=>scrollY);
 await page.waitForTimeout(700);
 expect(Math.abs((await page.evaluate(()=>scrollY))-y)).toBeLessThanOrEqual(2);
 await expect(html).not.toHaveAttribute('data-portfolio-tour-hold','intro-photo',{timeout:3000});
 await expect.poll(()=>page.evaluate(()=>scrollY),{timeout:5000}).toBeGreaterThan(y+4);
});

test('mobile opens with portrait above copy in ONE section, waits 2s, types, then advances',async({page})=>{
 test.setTimeout(45000);
 await page.setViewportSize({width:390,height:844});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('.sx-v18-loader')).toHaveCount(0,{timeout:9000});
 const html=page.locator('html');
 const intro=page.locator('#intro');
 const photo=intro.locator('.sx-v19-photo-background');
 const copy=intro.locator('.sx-v19-cover-content');
 await expect(html).toHaveAttribute('data-portfolio-tour-hold','intro-photo',{timeout:12000});
 await expect(intro).toHaveAttribute('data-mobile-photo-phase','photo');
 await expect(copy).toHaveCSS('visibility','hidden');
 await expect(intro.locator('h1')).toHaveCSS('visibility','hidden');
 await expect(intro.locator('.sx-word-reveal[data-reveal-complete="true"]')).toHaveCount(0);
 const imageLayout=await intro.evaluate(section=>{
  const image=section.querySelector<HTMLElement>('.sx-v19-photo-background')!;
  const copy=section.querySelector<HTMLElement>('.sx-v19-cover-content')!;
  return {photo:image.getBoundingClientRect().height,
   portraitEnd:image.getBoundingClientRect().bottom,
   textStart:copy.getBoundingClientRect().top,
   firstLineTop:section.querySelector<HTMLElement>('h1')!.getBoundingClientRect().top,
   imageTransform:getComputedStyle(image.querySelector('img')!).transform,
   introHeight:section.getBoundingClientRect().height};
 });
 expect(imageLayout.photo).toBeGreaterThan(190);
 expect(imageLayout.photo).toBeLessThan(400);
 expect(Math.abs(imageLayout.textStart-imageLayout.portraitEnd)).toBeLessThanOrEqual(3);
 // Name starts immediately under the photo, not vertically centered below
 // a large empty black strip.
 expect(imageLayout.firstLineTop-imageLayout.portraitEnd).toBeGreaterThanOrEqual(-2);
 expect(imageLayout.firstLineTop-imageLayout.portraitEnd).toBeLessThanOrEqual(18);
 expect(imageLayout.imageTransform).not.toBe('none');
 expect(imageLayout.introHeight).toBeLessThan(844);
 const initialY=await page.evaluate(()=>scrollY);
 expect(initialY).toBeLessThanOrEqual(2);
 await page.waitForTimeout(850);
 await expect(html).toHaveAttribute('data-portfolio-tour-hold','intro-photo');
 await expect(html).not.toHaveAttribute('data-portfolio-tour','playing');
 expect(Math.abs((await page.evaluate(()=>scrollY))-initialY)).toBeLessThanOrEqual(2);

 await expect(html).not.toHaveAttribute('data-portfolio-tour-hold','intro-photo',{timeout:4000});
 await expect(intro).toHaveAttribute('data-mobile-photo-phase','copy',{timeout:4000});
 await expect(copy).toHaveCSS('visibility','visible');
 await expect(html).toHaveAttribute('data-portfolio-tour','playing');
 // Typing begins in-place: a new chapter cannot start before BOTH copy
 // blocks have completed, and normal phones do not jump off the photograph.
 await page.waitForTimeout(650);
 await expect(intro.locator('.sx-word-reveal[data-reveal-complete="true"]')).not.toHaveCount(2);
 expect(await page.evaluate(()=>scrollY)).toBeLessThan(45);
 await expect(intro.locator('.sx-word-reveal[data-reveal-complete="true"]'))
  .toHaveCount(2,{timeout:9000});
 await expect.poll(()=>page.evaluate(()=>scrollY),{timeout:7000}).toBeGreaterThan(55);
});

test('mobile first paint hides the entire intro copy even without hydration',async({page})=>{
 await page.setViewportSize({width:390,height:844});
 // Keep HTML/CSS, but block Next client scripts to inspect server HTML before
 // hydration. This catches an early flash that animation timing alone misses.
 await page.route(/\\/_next\\/static\\/.*\\.(?:js|mjs)(?:\\?.*)?$/,route=>route.abort());
 await page.goto('/',{waitUntil:'domcontentloaded'});
 const intro=page.locator('#intro');
 await expect(intro).toHaveAttribute('data-mobile-photo-phase','photo');
 await expect(intro.locator('.sx-v19-cover-content')).toHaveCSS('visibility','hidden');
 await expect(intro.locator('h1')).toHaveCSS('visibility','hidden');
 await expect(intro.locator('.sx-v18-cover-lead')).toHaveCSS('visibility','hidden');
});

test('mobile no-script fallback keeps introductory copy readable',async({browser})=>{
 const page=await browser.newPage({viewport:{width:390,height:844},javaScriptEnabled:false});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('#intro .sx-v19-cover-content')).toHaveCSS('visibility','visible');
 await expect(page.locator('#intro h1')).toHaveCSS('visibility','visible');
 await page.close();
});

test('first intro block tracks real header height and fills available responsive viewport',async({browser})=>{
 for(const viewport of [
  {width:320,height:568},{width:390,height:844},{width:768,height:1024},
  {width:1440,height:900},{width:320,height:430}
 ]){
  const page=await browser.newPage({viewport,reducedMotion:'reduce'});
  await page.goto('/',{waitUntil:'domcontentloaded'});
  const site=page.locator('.sx-v18-site');
  await expect.poll(()=>site.evaluate(node=>
   Number.parseFloat(node.style.getPropertyValue('--sx-intro-header-height'))
  )).toBeGreaterThan(35);
  const result=await page.locator('#intro').evaluate(section=>{
   const header=document.querySelector<HTMLElement>('.sx-v18-header')!;
   const h=header.getBoundingClientRect();
   const intro=section.getBoundingClientRect();
   const computed=getComputedStyle(section);
   const photo=section.querySelector<HTMLElement>('.sx-v19-photo-background')!;
   const copy=section.querySelector<HTMLElement>('.sx-v19-cover-content')!;
   const image=photo.getBoundingClientRect(),text=copy.getBoundingClientRect();
   return {
    headerBottom:h.bottom,
    introTop:intro.top,
    introHeight:intro.height,
    expectedHeight:innerHeight-h.height,
    minHeight:Number.parseFloat(computed.minHeight),
    noHorizontalOverflow:section.scrollWidth<=section.clientWidth+2,
    photoOnTop:image.bottom<=text.top+3,
    copyInSection:text.bottom<=intro.bottom+3,
    portraitIsPartialScreen:image.height<innerHeight*.55
   };
  });
  expect(Math.abs(result.introTop-result.headerBottom),'intro follows header').toBeLessThanOrEqual(3);
  expect(Math.abs(result.minHeight-result.expectedHeight),'viewport/header height contract').toBeLessThanOrEqual(3);
  expect(result.introHeight).toBeGreaterThanOrEqual(result.expectedHeight-3);
  expect(result.noHorizontalOverflow,'intro should not overflow horizontally').toBe(true);
  expect(result.copyInSection,'intro text must never be clipped by section').toBe(true);
  if(viewport.width<=760){
   expect(result.photoOnTop).toBe(true);
   expect(result.portraitIsPartialScreen).toBe(true);
  }
  await page.close();
 }
});

test('first block responds to mobile rotation and menu reflow without clipping',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.setViewportSize({width:390,height:844});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 const read=()=>page.locator('#intro').evaluate(section=>{
  const header=document.querySelector<HTMLElement>('.sx-v18-header')!;
  const photo=section.querySelector<HTMLElement>('.sx-v19-photo-background')!;
  const copy=section.querySelector<HTMLElement>('.sx-v19-cover-content')!;
  return {
   available:innerHeight-header.getBoundingClientRect().height,
   minHeight:Number.parseFloat(getComputedStyle(section).minHeight),
   imageEnd:photo.getBoundingClientRect().bottom,
   copyStart:copy.getBoundingClientRect().top,
   contentEnd:copy.getBoundingClientRect().bottom,
   sectionEnd:section.getBoundingClientRect().bottom,
   overflow:section.scrollWidth-section.clientWidth
  };
 });
 await expect.poll(async()=>Math.abs((await read()).available-(await read()).minHeight))
  .toBeLessThanOrEqual(3);
 await page.setViewportSize({width:568,height:320});
 await expect.poll(async()=>Math.abs((await read()).available-(await read()).minHeight))
  .toBeLessThanOrEqual(3);
 const rotated=await read();
 expect(rotated.imageEnd).toBeLessThanOrEqual(rotated.copyStart+3);
 expect(rotated.contentEnd).toBeLessThanOrEqual(rotated.sectionEnd+3);
 expect(rotated.overflow).toBeLessThanOrEqual(2);
});

test('short mobile viewports keep portrait above copy without horizontal overflow',async({browser})=>{
 for(const viewport of [{width:320,height:568},{width:390,height:844}]){
  const page=await browser.newPage({viewport,reducedMotion:'reduce'});
  await page.goto('/',{waitUntil:'domcontentloaded'});
  const data=await page.locator('#intro').evaluate(section=>{
   const photo=section.querySelector<HTMLElement>('.sx-v19-photo-background')!;
   const copy=section.querySelector<HTMLElement>('.sx-v19-cover-content')!;
   const p=photo.getBoundingClientRect(),c=copy.getBoundingClientRect();
   return {
    imageAboveText:p.bottom<=c.top+3,
    sameSection:section.contains(photo)&&section.contains(copy),
    noOverflow:section.scrollWidth<=section.clientWidth+2,
    textVisible:getComputedStyle(copy).visibility==='visible',
    photoHeight:p.height
   };
  });
  expect(data.sameSection).toBe(true);
  expect(data.imageAboveText).toBe(true);
  expect(data.noOverflow).toBe(true);
  expect(data.textVisible).toBe(true);
  expect(data.photoHeight).toBeLessThan(viewport.height*.55);
  await page.close();
 }
});

test('black Selected Work freezes only AFTER all nine word blocks finish and fit the viewport',async({page})=>{
 test.setTimeout(65000);
 await page.setViewportSize({width:1440,height:900});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('.sx-v18-loader')).toHaveCount(0,{timeout:9000});
 const section=page.locator('#work-index');
 const top=await section.evaluate(node=>node.getBoundingClientRect().top+scrollY);
 // Manual takeover, then auto-resume from before this exact section.
 await page.mouse.wheel(0,40);
 await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),Math.max(0,top-260));
 await expect(page.locator('html')).toHaveAttribute('data-portfolio-tour','manual');
 await expect(page.locator('html')).toHaveAttribute('data-portfolio-tour','playing',{timeout:6500});
 const html=page.locator('html');
 await expect(html).toHaveAttribute('data-portfolio-tour-hold','selected-work',{timeout:47000});

 // No partially typed title, project name or description may initiate hold.
 await expect(section.locator('.sx-word-reveal')).toHaveCount(9);
 await expect(section.locator('.sx-word-reveal[data-reveal-complete="true"]')).toHaveCount(9);
 const progress=Number(await section.getAttribute('data-work-reveal-progress'));
 expect(progress).toBeGreaterThanOrEqual(.999);
 const rect=await section.evaluate(node=>{
  const box=node.getBoundingClientRect();
  return {top:box.top,bottom:box.bottom,viewport:innerHeight};
 });
 expect(Math.abs(rect.top)).toBeLessThanOrEqual(12);
 expect(Math.abs(rect.bottom-rect.viewport)).toBeLessThanOrEqual(12);
 const frozen=await page.evaluate(()=>scrollY);
 await page.waitForTimeout(650);
 expect(Math.abs((await page.evaluate(()=>scrollY))-frozen)).toBeLessThanOrEqual(2);
 await expect(html).not.toHaveAttribute('data-portfolio-tour-hold','selected-work',{timeout:2700});
});

test('Selected Work copy rises and fades only while the black section departs',async({page})=>{
 await page.setViewportSize({width:1440,height:900});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('.sx-v18-loader')).toHaveCount(0,{timeout:9000});
 await page.keyboard.press('Escape');
 const section=page.locator('#work-index');
 const top=await section.evaluate(node=>node.getBoundingClientRect().top+scrollY);
 const read=()=>section.evaluate(node=>{
  const heading=node.querySelector<HTMLElement>('.sx-v18-index-heading')!;
  const first=node.querySelector<HTMLElement>('.sx-v18-index-entry')!;
  return {
   progress:Number(node.style.getPropertyValue('--sx-work-exit')||0),
   headingOpacity:Number(getComputedStyle(heading).opacity),
   rowOpacity:Number(getComputedStyle(first).opacity),
   headingTransform:getComputedStyle(heading).transform
  };
 });
 await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),top);
 await expect.poll(async()=>(await read()).progress).toBe(0);
 const still=await read();
 expect(still.headingOpacity).toBe(1);
 expect(still.rowOpacity).toBe(1);

 await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),top+130);
 await expect.poll(async()=>(await read()).progress).toBeGreaterThan(.3);
 const departing=await read();
 expect(departing.headingOpacity).toBeLessThan(still.headingOpacity);
 expect(departing.rowOpacity).toBeLessThan(still.rowOpacity);
 expect(departing.headingTransform).not.toBe('none');
 await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),top);
 await expect.poll(async()=>(await read()).progress).toBe(0);
 expect((await read()).headingOpacity).toBe(1);
});

test('Selected Work exit movement is disabled for reduced-motion readers',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 const section=page.locator('#work-index');
 const top=await section.evaluate(node=>node.getBoundingClientRect().top+scrollY);
 await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),top+150);
 const copy=await section.locator('.sx-v18-index-heading').evaluate(node=>({
  opacity:getComputedStyle(node).opacity,
  transform:getComputedStyle(node).transform
 }));
 expect(copy.opacity).toBe('1');
 expect(copy.transform).toBe('none');
});

test('work rules draw one at a time and next block waits until predecessor hold finishes',async({page})=>{
 test.setTimeout(65000);
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('.sx-v18-loader')).toHaveCount(0,{timeout:9000});
 await page.keyboard.press('Escape');
 await page.locator('#work-index').evaluate(node=>
  node.scrollIntoView({block:'start',behavior:'instant'})
 );
 const section=page.locator('#work-index');
 const blocks=section.locator('[data-work-stage]');
 await expect(blocks).toHaveCount(5);
 await expect(blocks.nth(0)).toHaveAttribute('data-work-stage-state','typing',{timeout:5000});
 await expect(blocks.nth(1)).toHaveAttribute('data-work-stage-state','pending');
 const pendingRule=await blocks.nth(1).evaluate(el=>({
  border:getComputedStyle(el).borderBottomColor,
  scale:getComputedStyle(el,'::after').transform,
  progress:Number(el.style.getPropertyValue('--sx-work-rule')||'0')
 }));
 expect(pendingRule.progress).toBe(0);
 expect(pendingRule.border).toBe('rgba(0, 0, 0, 0)');
 expect(pendingRule.scale).toMatch(/^matrix\(0[, ]/);
 await expect(blocks.nth(0)).toHaveAttribute('data-work-stage-state','line',{timeout:6500});
 await expect(blocks.nth(1)).toHaveAttribute('data-work-stage-state','pending');
 await expect(blocks.nth(0)).toHaveAttribute('data-work-stage-state','holding',{timeout:2500});
 const pauseStart=await section.evaluate(el=>Number(el.dataset.workStageIndex));
 expect(pauseStart).toBe(0);
 await page.waitForTimeout(750);
 await expect(blocks.nth(1)).toHaveAttribute('data-work-stage-state','pending');
 await expect(blocks.nth(1)).toHaveAttribute('data-work-stage-state','typing',{timeout:4000});
 const firstRule=await blocks.nth(0).evaluate(el=>({
  progress:Number(el.style.getPropertyValue('--sx-work-rule')),
  scale:getComputedStyle(el,'::after').transform
 }));
 expect(firstRule.progress).toBe(1);
 expect(firstRule.scale).toMatch(/^matrix\(1[, ]/);
 await expect(blocks.nth(0)).toHaveAttribute('data-work-stage-state','complete');
 for(let index=1;index<5;index++){
  await expect(blocks.nth(index)).toHaveAttribute('data-work-stage-state','line',{timeout:6500});
  if(index<4){
   await expect(blocks.nth(index+1)).toHaveAttribute('data-work-stage-state','pending');
   await expect(blocks.nth(index)).toHaveAttribute('data-work-stage-state','holding',{timeout:2000});
   await page.waitForTimeout(700);
   await expect(blocks.nth(index+1)).toHaveAttribute('data-work-stage-state','pending');
   await expect(blocks.nth(index+1)).toHaveAttribute('data-work-stage-state','typing',{timeout:5000});
  }
 }
 await expect.poll(()=>section.getAttribute('data-work-reveal-progress'),{timeout:3500}).toBe('1');
 await expect(section.locator('[data-work-stage-state="complete"]')).toHaveCount(5);
});

test('mobile reader can skip photo hold, and case pages have no portrait delay',async({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('.sx-v18-loader')).toHaveCount(0,{timeout:9000});
 await page.keyboard.press('Escape');
 await expect(page.locator('html')).toHaveAttribute('data-portfolio-tour','paused');
 await expect(page.locator('#intro')).toHaveAttribute('data-mobile-photo-phase','copy');
 await expect(page.locator('#intro .sx-v19-cover-content')).toHaveCSS('visibility','visible');
 await page.goto('/work/gartal/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('#intro')).toHaveCount(0);
 await expect(page.locator('html')).not.toHaveAttribute('data-portfolio-tour-hold','intro-photo');
 await expect(page.locator('.sx-v10-case-cover')).toHaveCount(1);
});
