import {test,expect} from '@playwright/test';

async function resumeNearPanel(page:import('@playwright/test').Page,project:string,index:number){
 const target=await page.evaluate(({project,index})=>{
  const section=document.querySelector<HTMLElement>('#project-'+project);
  if(!section)throw new Error('Missing project '+project);
  const rect=section.getBoundingClientRect();
  const travel=Math.max(0,rect.height-innerHeight);
  return rect.top+scrollY+travel*((index+.66)/3);
 },{project,index});
 // An explicit user gesture suspends the invisible director immediately;
 // then scroll to just before the desired horizontal panel's reading stop.
 await page.mouse.wheel(0,40);
 await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),Math.max(0,target-190));
 await expect(page.locator('html')).toHaveAttribute('data-portfolio-tour','manual');
 await expect(page.locator('html')).toHaveAttribute('data-portfolio-tour','playing',{timeout:6500});
}

test('each of four projects marks all three horizontal reading panels',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 const ids=['gartal','factory','digirezhim','petiwoo'];
 for(const id of ids){
  const section=page.locator('#project-'+id);
  await expect(section.locator('[data-tour-stop][data-tour-hold="horizontal-frame"]')).toHaveCount(3);
  await expect(section.locator('[data-frame-index="0"]')).toHaveCount(1);
  await expect(section.locator('[data-frame-index="1"]')).toHaveCount(1);
  await expect(section.locator('[data-frame-index="2"]')).toHaveCount(1);
 }
});

test('first horizontal frame completes its words, waits 2 seconds, then glides left',async({page})=>{
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('.sx-v18-loader')).toHaveCount(0,{timeout:9000});
 await resumeNearPanel(page,'gartal',0);
 const html=page.locator('html');
 await expect(html).toHaveAttribute('data-portfolio-tour-hold','horizontal-frame',{timeout:13000});
 await expect(page.locator('#project-gartal [data-frame-index="0"] .sx-word-reveal').first())
  .toHaveAttribute('data-reveal-complete','true');
 await expect(page.locator('#project-gartal [data-frame-index="0"]'))
  .toHaveAttribute('data-frame-state','active');
 for(const future of ['1','2']){
  const pending=page.locator('#project-gartal [data-frame-index="'+future+'"]');
  await expect(pending).toHaveAttribute('data-frame-state','upcoming');
  await expect(pending.locator('.sx-word-pieces').first()).toHaveCSS('visibility','hidden');
  await expect(pending.locator('[data-reveal-word]').first()).toHaveCSS('opacity','0');
 }
 const before=await page.evaluate(()=>scrollY);
 await page.waitForTimeout(950);
 expect(Math.abs((await page.evaluate(()=>scrollY))-before)).toBeLessThanOrEqual(3);
 await expect(html).not.toHaveAttribute('data-portfolio-tour-hold','horizontal-frame',{timeout:2600});
 await expect(html).toHaveAttribute('data-portfolio-tour','playing');
});

test('middle horizontal panel also pauses despite the same black background',async({page})=>{
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('.sx-v18-loader')).toHaveCount(0,{timeout:9000});
 await resumeNearPanel(page,'gartal',1);
 const html=page.locator('html');
 await expect(html).toHaveAttribute('data-portfolio-tour-hold','horizontal-frame',{timeout:14000});
 await expect(page.locator('#project-gartal')).toHaveAttribute('data-active-frame','1');
 const panel=page.locator('#project-gartal [data-frame-index="1"]');
 await expect(panel.locator('.sx-word-reveal')).toHaveCount(2);
 await expect(panel.locator('.sx-word-reveal').last()).toHaveAttribute('data-reveal-complete','true');
 const future=page.locator('#project-gartal [data-frame-index="2"]');
 await expect(future).toHaveAttribute('data-frame-state','upcoming');
 await expect(future.locator('.sx-word-pieces').first()).toHaveCSS('visibility','hidden');
 await expect(future.locator('.sx-v14-ending-actions')).toHaveCSS('visibility','hidden');
});

test('manual scroll cancels a horizontal panel pause; reduced-motion skips it',async({page})=>{
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('.sx-v18-loader')).toHaveCount(0,{timeout:9000});
 await resumeNearPanel(page,'gartal',2);
 const html=page.locator('html');
 await expect(html).toHaveAttribute('data-portfolio-tour-hold','horizontal-frame',{timeout:14000});
 await page.mouse.wheel(0,180);
 await expect(html).toHaveAttribute('data-portfolio-tour','manual');
 await expect(html).not.toHaveAttribute('data-portfolio-tour-hold','horizontal-frame');
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.reload({waitUntil:'domcontentloaded'});
 await expect(html).not.toHaveAttribute('data-portfolio-tour-hold','horizontal-frame');
 await expect(html).not.toHaveAttribute('data-portfolio-tour','playing');
});
