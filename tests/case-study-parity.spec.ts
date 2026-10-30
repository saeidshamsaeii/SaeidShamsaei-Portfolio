import {test,expect} from '@playwright/test';

const ids=['gartal','factory','digirezhim','petiwoo'] as const;
const screens=[
 {width:390,height:844},
 {width:768,height:1024},
 {width:1440,height:900}
] as const;

// Browser-verified only when the owner executes the manual Playwright suite
// against a real Next.js static export. Never claim passing scores from this
// file being committed to GitHub.
test('four project pages share readable three-scene homepage rhythm',async({page})=>{
 test.setTimeout(100000);
 await page.emulateMedia({reducedMotion:'reduce'});
 for(const viewport of screens){
  await page.setViewportSize(viewport);
  for(const id of ids){
   const response=await page.goto('/work/'+id+'/',{waitUntil:'domcontentloaded'});
   expect(response?.status()).toBe(200);
   const cases=page.locator('.sx-v31-case-page');
   await expect(cases).toHaveCount(1);
   const slides=cases.locator('.sx-v31-case-scene');
   await expect(slides).toHaveCount(3);
   const titles=['THE PROBLEM','IMPLEMENTATION','WHAT IS VERIFIED'];
   for(let i=0;i<3;i++){
    const scene=slides.nth(i);
    await expect(scene).toHaveAttribute('data-tour-hold','case-scene');
    await expect(scene.locator('.sx-v31-scene-meta')).toContainText(titles[i]);
    await expect(scene.locator('.sx-v31-scene-copy h2')).toBeVisible();
    await expect(scene.locator('.sx-v31-scene-lead')).toBeVisible();
    await expect(scene.locator('.sx-v31-scene-notes li')).toHaveCount(2);
    const metrics=await scene.evaluate(el=>({
     height:el.getBoundingClientRect().height,
     title:Number.parseFloat(getComputedStyle(el.querySelector('h2')!).fontSize),
     body:Number.parseFloat(getComputedStyle(el.querySelector('.sx-v31-scene-lead')!).fontSize)
    }));
    expect(metrics.title,id+' heading too small at '+viewport.width).toBeGreaterThanOrEqual(29);
    expect(metrics.body,id+' paragraph too small at '+viewport.width).toBeGreaterThanOrEqual(14);
    expect(metrics.height,'scene must not collapse').toBeGreaterThanOrEqual(viewport.height*.88);
   }
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth);
   expect(overflow,id+' horizontal overflow at '+viewport.width).toBeLessThanOrEqual(2);
  }
 }
});

test('six source-grounded engineering chapters are compact, expandable and keyboard reachable',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 for(const id of ids){
  await page.goto('/work/'+id+'/',{waitUntil:'domcontentloaded'});
  const items=page.locator('#case-deep-dive details.sx-v31-deep-item');
  await expect(items).toHaveCount(6);
  const first=items.first();
  await expect(first).not.toHaveAttribute('open','');
  const height=await first.evaluate(el=>el.getBoundingClientRect().height);
  expect(height,'collapsed chapter must not occupy an extra full screen')
   .toBeLessThan(250);
  await first.locator('summary').focus();
  await page.keyboard.press('Enter');
  await expect(first).toHaveAttribute('open','');
  await expect(first.locator('.sx-v31-deep-content p')).toHaveCount(3);
  await expect(first.locator('.sx-v31-deep-details li')).toHaveCount(3);
  await page.keyboard.press('Enter');
  await expect(first).not.toHaveAttribute('open','');
 }
});

test('case study cover is first autoplay stop, with 2s reading holds and ordered text',async({page})=>{
 test.setTimeout(35000);
 await page.setViewportSize({width:390,height:844});
 await page.goto('/work/gartal/',{waitUntil:'domcontentloaded'});
 const pageRoot=page.locator('.sx-v31-case-page');
 await expect(pageRoot).toHaveCount(1);
 const cover=pageRoot.locator('.sx-v31-case-cover');
 await expect(cover).toHaveAttribute('data-tour-hold','case-scene');
 await expect(page.locator('html')).toHaveAttribute('data-portfolio-tour','playing',{timeout:7000});
 await expect(cover).toHaveAttribute('data-case-scene-progress',/0(?:\.\d+)?|1/,{timeout:5500});
 await expect(page.locator('html')).toHaveAttribute('data-portfolio-tour-hold','case-scene',{timeout:15000});
 const y=await page.evaluate(()=>window.scrollY);
 await page.waitForTimeout(750);
 expect(Math.abs((await page.evaluate(()=>window.scrollY))-y)).toBeLessThanOrEqual(2);
 await expect(cover.locator('.sx-word-reveal[data-reveal-complete="true"]')).toHaveCount(3);
});
