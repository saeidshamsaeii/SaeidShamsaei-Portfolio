import {test,expect} from '@playwright/test';

const names=['gartal','factory','digirezhim','petiwoo'] as const;
const widths=[360,390,768,1024,1440,1920];

test('English-only portfolio, original image assets, and coherent project sections',async({page})=>{
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
  const image=page.locator('#project-'+name+' .pf-project-art img');
  await expect(image).toHaveCount(1);
  expect(await image.evaluate(async(i:HTMLImageElement)=>{
   await i.decode();return i.naturalWidth;
  })).toBe(1448);
  await expect(page.locator('#project-'+name+' .pf-note')).toHaveCount(4);
  await expect(page.locator('#project-'+name+' a[href="/work/'+name+'/"]').first()).toBeAttached();
 }
 const portrait=page.locator('.pf-portrait');
 expect(await portrait.evaluate(async(i:HTMLImageElement)=>{
  await i.decode();return i.naturalWidth;
 })).toBe(1122);
 for(const item of ['portrait','logo',...names.map(n=>'project-'+n)]){
  const url='/assets/hires/'+item+'.webp';
  const response=await page.request.get(url);
  expect(response.status(),url).toBe(200);
 }
 expect(errors).toEqual([]);
 await page.screenshot({path:'artifacts/portfolio-desktop-1440.png',fullPage:true,animations:'disabled'});
});

test('six responsive widths: content never overlaps visuals or overflows horizontally',async({browser})=>{
 const overlap=(a:{x:number;y:number;width:number;height:number},
  b:{x:number;y:number;width:number;height:number})=>
  Math.min(a.x+a.width,b.x+b.width)-Math.max(a.x,b.x)>3 &&
  Math.min(a.y+a.height,b.y+b.height)-Math.max(a.y,b.y)>3;
 for(const width of widths){
  const page=await browser.newPage({viewport:{width,height:900}});
  await page.goto('/',{waitUntil:'domcontentloaded'});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),String(width)).toBe(true);
  for(const name of names){
   const area='#project-'+name+' ';
   const copy=await page.locator(area+'.pf-project-copy').boundingBox();
   const image=await page.locator(area+'.pf-project-art').boundingBox();
   const details=await page.locator(area+'.pf-project-notes').boundingBox();
   expect(copy&&image&&details,name+' elements missing').toBeTruthy();
   expect(overlap(copy!,image!),name+' text overlaps image at '+width).toBe(false);
   expect(overlap(details!,image!),name+' details overlap image at '+width).toBe(false);
  }
  if(width===390){
   const loaded=await page.locator('.pf-project-art img').evaluateAll(async imgs=>{
    return await Promise.all(imgs.map(async el=>{
     const img=el as HTMLImageElement;await img.decode();return img.naturalWidth;
    }));
   });
   expect(loaded).toEqual([1448,1448,1448,1448]);
   await page.screenshot({path:'artifacts/portfolio-mobile-390.png',fullPage:true,animations:'disabled'});
  }
  await page.close();
 }
});

test('all internal navigation anchors and meaningful actions resolve',async({page})=>{
 await page.goto('/',{waitUntil:'domcontentloaded'});
 for(const anchor of ['#selected-projects','#about','#approach','#contact']){
  const element=page.locator('a[href="'+anchor+'"]').first();
  await expect(element).toHaveCount(1);
  await element.evaluate((el:HTMLAnchorElement)=>el.click());
  await expect.poll(()=>page.evaluate(()=>location.hash)).toBe(anchor);
  await expect(page.locator(anchor)).toBeAttached();
 }
 await expect(page.locator('a[href*="mailto:"]').first()).toBeAttached();
 expect(await page.locator('body').innerText()).not.toContain('Watch Video');
});

test('four detailed case-study routes remain functional with concept visuals',async({page})=>{
 for(const slug of names){
  await page.goto('/work/'+slug+'/',{waitUntil:'domcontentloaded'});
  const heading=slug==='factory'?'AI Development Factory':
   slug==='gartal'?'GARTAL':slug==='digirezhim'?'DigiRezhim':'Petiwoo';
  await expect(page.locator('h1')).toContainText(heading);
  await expect(page.locator('.case-section')).toHaveCount(2);
  await expect(page.locator('.case-capabilities>div')).toHaveCount(6);
  await expect(page.locator('.case-hero-art')).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 }
});

test('reduced-motion accessibility retains links and avoids overflow',async({browser})=>{
 const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('.pf-project')).toHaveCount(4);
 await expect(page.locator('#contact')).toBeAttached();
 await expect(page.locator('a[href="/work/gartal/"]').first()).toBeAttached();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
 await page.close();
});
