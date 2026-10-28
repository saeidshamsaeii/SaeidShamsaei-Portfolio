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
  {timeout:12000}).toBe(9);
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

test('mobile portrait hold occurs after scrolling to the stacked readable copy',async({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('.sx-v18-loader')).toHaveCount(0,{timeout:9000});
 const html=page.locator('html');
 await expect(html).toHaveAttribute('data-portfolio-tour-hold','intro-photo',{timeout:18000});
 await expect(page.locator('#intro .sx-word-reveal[data-reveal-complete="true"]')).toHaveCount(2);
 expect(await page.evaluate(()=>scrollY)).toBeGreaterThan(100);
});

test('black Selected Work freezes only AFTER all nine word blocks finish and fit the viewport',async({page})=>{
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
 await expect(html).toHaveAttribute('data-portfolio-tour-hold','selected-work',{timeout:25000});

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
