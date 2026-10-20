import {test,expect} from '@playwright/test';
const names=['gartal','factory','digirezhim','petiwoo'];
test('desktop four project chapters, source, navigation, scroll and screenshot',async ({browser})=>{
const page=await browser.newPage({viewport:{width:1440,height:900}});
const jsErrors:string[]=[];page.on('pageerror',e=>jsErrors.push(e.message));
await page.goto('/',{waitUntil:'domcontentloaded'});
await expect(page.locator('.ss-preloader')).toHaveCount(0,{timeout:10000});
await expect(page.locator('.motion-chapter')).toHaveCount(4);
await expect(page.locator('h1')).toContainText('SAEID');
for(const asset of ['/assets/portrait.webp','/assets/ss-gold.webp','/assets/hires/manifest.json']){const response=await page.request.get(asset);expect(response.status(),asset).toBe(200);expect((await response.body()).length).toBeGreaterThan(asset.endsWith('.json')?0:1000);}
await expect(page.locator('.cinematic-portrait-image')).toBeVisible();
for(const name of names){await expect(page.locator('#project-'+name+' .motion-visual .cinematic-vector-art .art-scene')).toHaveCount(1);}
expect(await page.locator('#project-gartal .motion-visual .cinematic-vector-art').evaluate(el=>getComputedStyle(el).backgroundImage)).toBe('none');
expect(await page.locator('.cinematic-portrait-image').evaluate((i:HTMLImageElement)=>i.naturalWidth)).toBeGreaterThan(100);
const rail=page.locator('#project-gartal .motion-track');
const oldX=await rail.evaluate(el=>el.scrollLeft);
await rail.evaluate(el=>{el.scrollLeft=el.scrollWidth-el.clientWidth;});
await expect.poll(async()=>rail.evaluate(el=>el.scrollLeft)).toBeGreaterThan(oldX);
expect(await page.locator('.motion-drawer a').count()).toBe(0);
for(const name of names){await expect(page.locator('#project-'+name)).toHaveCount(1);await expect(page.locator('#project-'+name+' .motion-track')).toHaveCount(1);}
await page.screenshot({path:'artifacts/portfolio-desktop-1440.png',fullPage:true,animations:'disabled'});
const p=page.locator('#project-petiwoo');await p.scrollIntoViewIfNeeded();await page.waitForTimeout(250);
await page.locator('#project-gartal').scrollIntoViewIfNeeded();
await expect(page.locator('#project-gartal')).toBeVisible();
const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
expect(overflow).toBe(false);expect(jsErrors).toEqual([]);
await page.close();
});
test('mobile touch layout, menu, language and screenshot',async ({browser})=>{
const page=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('/',{waitUntil:'domcontentloaded'});
await expect(page.locator('.ss-preloader')).toHaveCount(0,{timeout:10000});
await expect(page.locator('.motion-chapter')).toHaveCount(4);
await expect(page.locator('.cinematic-portrait-image')).toBeVisible();
await page.screenshot({path:'artifacts/portfolio-mobile-390.png',fullPage:true,animations:'disabled'});
expect(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)).toBe(false);
await expect(page.locator('.motion-track')).toHaveCount(4);
await page.locator('.motion-nav button').click();
await expect(page.locator('html')).toHaveAttribute('lang','fa');
await expect(page.locator('html')).toHaveAttribute('dir','rtl');
expect(errors).toEqual([]);
await page.close();
});
test('360 and 768 responsive widths',async ({browser})=>{
for(const width of [360,768]){
const page=await browser.newPage({viewport:{width,height:780}});
await page.goto('/',{waitUntil:'domcontentloaded'});
expect(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)).toBe(false);
await page.close();
}
});
test('all four real case-study routes',async ({page})=>{
for(const slug of names){
await page.goto('/work/'+slug+'/',{waitUntil:'domcontentloaded'});
await expect(page.locator('h1')).toContainText(slug==='factory'?'AI Development Factory':slug==='digirezhim'?'DigiRezhim':slug==='petiwoo'?'Petiwoo':'GARTAL');
await expect(page.locator('.case-section')).toHaveCount(2);
await expect(page.locator('.case-capabilities>div')).toHaveCount(6);
}
});
test('reduced-motion fallback remains navigable',async ({browser})=>{
const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
await page.goto('/',{waitUntil:'domcontentloaded'});
await expect(page.locator('.motion-chapter')).toHaveCount(4);
await expect(page.locator('#contact')).toBeAttached();
expect(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)).toBe(false);
await page.close();
});

test('vertical desktop scroll reveals the horizontal story before the next project',async ({browser})=>{
 const page=await browser.newPage({viewport:{width:1440,height:900}});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('.ss-preloader')).toHaveCount(0,{timeout:10000});
 const chapter=page.locator('#project-gartal');
 await chapter.scrollIntoViewIfNeeded();
 await page.waitForTimeout(650);
 const track=chapter.locator('.motion-track');
 const initial=await track.evaluate(el=>el.scrollLeft);
 await page.mouse.move(800,580);
 await page.mouse.wheel(0,950);
 await page.waitForTimeout(1800);
 const progressed=await track.evaluate(el=>el.scrollLeft);
 expect(progressed).toBeGreaterThan(initial+50);
 await expect(chapter).toBeVisible();
 await page.close();
});
