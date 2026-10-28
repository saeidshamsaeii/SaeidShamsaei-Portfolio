import {test,expect} from '@playwright/test';

test('all later panels remain blank when the current horizontal frame pauses',async({page})=>{
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('.sx-v18-loader')).toHaveCount(0,{timeout:9000});
 await page.mouse.wheel(0,60);
 await page.evaluate(()=>{
  const section=document.querySelector<HTMLElement>('#project-gartal')!;
  const rect=section.getBoundingClientRect();
  const travel=rect.height-innerHeight;
  scrollTo({top:scrollY+rect.top+travel*(.58/3),behavior:'instant'});
 });
 await expect(page.locator('html')).toHaveAttribute('data-portfolio-tour','manual');
 await expect(page.locator('html')).toHaveAttribute('data-portfolio-tour','playing',{timeout:6500});
 await expect(page.locator('html')).toHaveAttribute('data-portfolio-tour-hold','horizontal-frame',{timeout:14000});
 const current=page.locator('#project-gartal [data-frame-index="0"]');
 await expect(current).toHaveAttribute('data-frame-state','active');
 for(const index of [1,2]){
  const next=page.locator('#project-gartal [data-frame-index="'+index+'"]');
  await expect(next).toHaveAttribute('data-frame-state','upcoming');
  await expect(next.locator('.sx-word-pieces').first()).toHaveCSS('visibility','hidden');
  await expect(next.locator('[data-reveal-word]').first()).toHaveCSS('opacity','0');
 }
 await expect(page.locator('#project-gartal [data-frame-index="1"]')).toHaveAttribute('data-tour-awaiting','true');
});

test('reverse scrolling re-hides previously revealed future panels',async({page})=>{
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('.sx-v18-loader')).toHaveCount(0,{timeout:9000});
 await page.keyboard.press('Escape');
 const chapter=page.locator('#project-gartal');
 const move=async(value:number)=>{
  await page.evaluate(value=>{
   const section=document.querySelector<HTMLElement>('#project-gartal')!;
   const rect=section.getBoundingClientRect();
   const travel=rect.height-innerHeight;
   scrollTo({top:scrollY+rect.top+travel*(value/3),behavior:'instant'});
  },value);
 };
 await move(2.55);
 await expect(chapter).toHaveAttribute('data-active-frame','2');
 await expect(chapter.locator('[data-frame-index="2"]')).toHaveAttribute('data-frame-state','active');
 await move(.66);
 await expect(chapter).toHaveAttribute('data-active-frame','0');
 for(const index of [1,2]){
  const upcoming=chapter.locator('[data-frame-index="'+index+'"]');
  await expect(upcoming).toHaveAttribute('data-frame-state','upcoming');
  await expect(upcoming.locator('.sx-word-pieces').first()).toHaveCSS('visibility','hidden');
  await expect(upcoming.locator('[data-reveal-word]').first()).toHaveCSS('opacity','0');
 }
 await move(1.00);
 await expect(chapter).toHaveAttribute('data-active-frame','1');
 await expect(chapter.locator('[data-frame-index="1"] .sx-word-pieces').first()).toHaveCSS('visibility','visible');
 await expect(chapter.locator('[data-frame-index="1"] [data-reveal-word]').first()).toHaveCSS('opacity','0');
 await move(1.32);
 await expect.poll(()=>chapter.locator('[data-frame-index="1"] [data-reveal-word]').first()
  .evaluate(node=>Number(getComputedStyle(node).opacity))).toBeGreaterThan(0);
});

test('a manual scroll removes the pending-next-content restriction',async({page})=>{
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('.sx-v18-loader')).toHaveCount(0,{timeout:9000});
 await expect(page.locator('[data-tour-awaiting="true"]')).toHaveCount(1);
 await page.mouse.wheel(0,180);
 await expect(page.locator('html')).toHaveAttribute('data-portfolio-tour','manual');
 await expect(page.locator('[data-tour-awaiting="true"]')).toHaveCount(0);
});

test('reduced motion never hides future chapter text',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('[data-tour-awaiting="true"]')).toHaveCount(0);
 const future=page.locator('#project-gartal [data-frame-index="2"] .sx-word-pieces').first();
 await expect(future).toHaveCSS('visibility','visible');
 await expect(future.locator('[data-reveal-word]').first()).toHaveCSS('opacity','1');
});
