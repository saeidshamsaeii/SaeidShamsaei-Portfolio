import {test,expect} from '@playwright/test';

const ids=['gartal','factory','digirezhim','petiwoo'] as const;

test('each selected editorial photograph ships as a decodable WebP asset',async({page,request})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 for(const id of ids){
  const source='/assets/projects/'+id+'.webp';
  const response=await request.get(source);
  expect(response.ok(),id+' photograph missing from production export').toBe(true);
  expect(response.headers()['content-type']||'').toMatch(/image\/webp/);
  const image=page.locator('#project-'+id+' .sx-v35-project-art img');
  await expect(image).toHaveAttribute('src',source);
  await image.scrollIntoViewIfNeeded();
  await expect.poll(()=>image.evaluate(el=>(el as HTMLImageElement).naturalWidth),{
   message:id+' photograph failed to decode',
   timeout:6000
  }).toBeGreaterThan(400);
 }
});

test('Selected Work does not fade before all five reading beats finish',async({page})=>{
 await page.emulateMedia({reducedMotion:'no-preference'});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('.sx-v18-loader')).toHaveCount(0,{timeout:10000});
 await page.keyboard.press('Escape');
 const section=page.locator('#work-index');
 await section.evaluate(e=>e.scrollIntoView({block:'start',behavior:'instant'}));
 await expect.poll(()=>section.getAttribute('data-work-reveal-progress')).not.toBe('0');
 await section.evaluate(e=>window.scrollTo({
  top:window.scrollY+130,behavior:'instant'
 }));
 await expect.poll(()=>section.evaluate(e=>Number(
  (e as HTMLElement).style.getPropertyValue('--sx-work-exit')||0))).toBe(0);
});
