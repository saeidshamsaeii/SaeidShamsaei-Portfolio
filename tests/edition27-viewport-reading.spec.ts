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

test('mobile shows only Saeid portrait for 2s, then moves to typed introduction',async({page})=>{
 test.setTimeout(45000);
 await page.setViewportSize({width:390,height:844});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('.sx-v18-loader')).toHaveCount(0,{timeout:9000});
 const html=page.locator('html');
 const intro=page.locator('#intro');
 const copy=intro.locator('.sx-v19-cover-content');
 await expect(html).toHaveAttribute('data-portfolio-tour-hold','intro-photo',{timeout:12000});
 await expect(intro).toHaveAttribute('data-mobile-photo-phase','photo');
 await expect(copy).toHaveCSS('visibility','hidden');
 await expect(intro.locator('h1')).toHaveCSS('visibility','hidden');
 await expect(intro.locator('.sx-v18-cover-links a').first()).toHaveCSS('visibility','hidden');
 await expect(intro.locator('.sx-word-reveal[data-reveal-complete="true"]')).toHaveCount(0);
 const start=await page.evaluate(()=>scrollY);
 expect(start).toBeLessThanOrEqual(2);
 const portraitHeight=await intro.locator('.sx-v19-photo-background')
  .evaluate(el=>el.getBoundingClientRect().height);
 expect(Math.abs(portraitHeight-844)).toBeLessThanOrEqual(2);
 await page.waitForTimeout(650);
 expect(Math.abs((await page.evaluate(()=>scrollY))-start)).toBeLessThanOrEqual(2);
 await expect(html).not.toHaveAttribute('data-portfolio-tour-hold','intro-photo',{timeout:4000});
 await expect(intro).toHaveAttribute('data-mobile-photo-phase','copy',{timeout:13000});
 await expect(copy).toHaveCSS('visibility','visible');
 await expect.poll(()=>page.evaluate(()=>scrollY)).toBeGreaterThan(100);
 await expect(intro.locator('.sx-word-reveal[data-reveal-complete="true"]'))
  .toHaveCount(2,{timeout:9000});
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
