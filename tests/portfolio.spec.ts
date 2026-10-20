import {test,expect} from '@playwright/test';
const names=['gartal','factory','digirezhim','petiwoo'] as const;
const widths=[360,390,768,1024,1440,1920];
test('complete English-only premium page and every image loads',async({page})=>{
 await page.setViewportSize({width:1440,height:900});
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('html')).toHaveAttribute('lang','en');
 await expect(page.locator('html')).toHaveAttribute('dir','ltr');
 await expect(page.locator('h1')).toContainText('SAEID');
 await expect(page.locator('.pf-project')).toHaveCount(4);
 await expect(page.locator('.motion-chapter')).toHaveCount(0);
 await expect(page.locator('.ss-preloader')).toHaveCount(0);
 expect(await page.locator('body').innerText()).not.toMatch(/[\u0600-\u06ff]/);
 for(const name of names){
  await expect(page.locator('#project-'+name+' .pf-project-art img')).toHaveCount(1);
  const image=page.locator('#project-'+name+' .pf-project-art img');
  await image.scrollIntoViewIfNeeded();
  expect(await image.evaluate(async(i:HTMLImageElement)=>{await i.decode();return i.naturalWidth})).toBe(1448);
  await expect(page.locator('#project-'+name+' .pf-note')).toHaveCount(4);
  await expect(page.locator('#project-'+name+' a[href="/work/'+name+'/"]').first()).toBeVisible();
 }
 const portrait=page.locator('.pf-portrait');
 expect(await portrait.evaluate(async(i:HTMLImageElement)=>{await i.decode();return i.naturalWidth})).toBe(1122);
 const media=['portrait','logo',...names.map(n=>'project-'+n)];
 for(const item of media){const url='/assets/hires/'+item+'.webp';const response=await page.request.get(url);expect(response.status(),url).toBe(200);}
 expect(errors).toEqual([]);
 await page.screenshot({path:'artifacts/portfolio-desktop-1440.png',fullPage:true,animations:'disabled'});
});
test('no image/card overlaps or horizontal page overflow on responsive sizes',async({browser})=>{
 for(const width of widths){
  const page=await browser.newPage({viewport:{width,height:900}});
  await page.goto('/',{waitUntil:'domcontentloaded'});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),String(width)).toBe(true);
  for(const name of names){
   const copy=await page.locator('#project-'+name+' .pf-project-copy').boundingBox();
   const visual=await page.locator('#project-'+name+' .pf-project-art').boundingBox();
   const notes=await page.locator('#project-'+name+' .pf-project-notes').boundingBox();
   expect(copy&&visual&&notes,'missing layout box').toBeTruthy();
   const overlap=(a:{x:number;y:number;width:number;height:number},b:typeof a)=>
    Math.min(a.x+a.width,b.x+b.width)-Math.max(a.x,b.x)>3 &&
    Math.min(a.y+a.height,b.y+b.height)-Math.max(a.y,b.y)>3;
   expect(overlap(copy!,visual!),name+' copy overlaps art at '+width).toBe(false);
   expect(overlap(notes!,visual!),name+' notes overlap art at '+width).toBe(false);
  }
  if(width===390)await page.screenshot({path:'artifacts/portfolio-mobile-390.png',fullPage:true,animations:'disabled'});
  await page.close();
 }
});
test('navigation and links resolve without invented video actions',async({page})=>{
 await page.goto('/');
 for(const anchor of ['#selected-projects','#about','#approach','#contact']){
  const a=page.locator('a[href="'+anchor+'"]').first();
  await expect(a).toHaveCount(1);
  await a.evaluate((el:HTMLAnchorElement)=>el.click());
  await expect(page).toHaveURL(new RegExp(anchor.replace('#','\\#')+'
 }
 await expect(page.locator('a[href*="mailto:"]').first()).toBeAttached();
 expect(await page.locator('body').innerText()).not.toContain('Watch Video');
});
test('all four detailed project routes load with genuine concept art',async({page})=>{
 for(const slug of names){
  await page.goto('/work/'+slug+'/',{waitUntil:'domcontentloaded'});
  await expect(page.locator('h1')).toContainText(slug==='factory'?'AI Development Factory':slug==='gartal'?'GARTAL':slug==='digirezhim'?'DigiRezhim':'Petiwoo');
  await expect(page.locator('.case-section')).toHaveCount(2);
  await expect(page.locator('.case-capabilities>div')).toHaveCount(6);
  await expect(page.locator('.case-hero-art')).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 }
});
test('reduced motion and keyboard-accessible project links',async({browser})=>{
 const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
 await page.goto('/');
 await expect(page.locator('.pf-project')).toHaveCount(4);
 await expect(page.locator('#contact')).toBeAttached();
 await expect(page.locator('a[href="/work/gartal/"]').first()).toBeAttached();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 await page.close();
});
));
  await expect(page.locator(anchor)).toBeAttached();
 }
 await expect(page.locator('a[href*="mailto:"]').first()).toBeAttached();
 expect(await page.locator('body').innerText()).not.toContain('Watch Video');
});
test('all four detailed project routes load with genuine concept art',async({page})=>{
 for(const slug of names){
  await page.goto('/work/'+slug+'/',{waitUntil:'domcontentloaded'});
  await expect(page.locator('h1')).toContainText(slug==='factory'?'AI Development Factory':slug==='gartal'?'GARTAL':slug==='digirezhim'?'DigiRezhim':'Petiwoo');
  await expect(page.locator('.case-section')).toHaveCount(2);
  await expect(page.locator('.case-capabilities>div')).toHaveCount(6);
  await expect(page.locator('.case-hero-art')).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 }
});
test('reduced motion and keyboard-accessible project links',async({browser})=>{
 const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
 await page.goto('/');
 await expect(page.locator('.pf-project')).toHaveCount(4);
 await expect(page.locator('#contact')).toBeAttached();
 await expect(page.locator('a[href="/work/gartal/"]').first()).toBeAttached();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 await page.close();
});
