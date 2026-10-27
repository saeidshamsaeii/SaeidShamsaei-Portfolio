import {test,expect} from '@playwright/test';

const ids=['gartal','factory','digirezhim','petiwoo'];

test('welcome starts with Persian and finishes before automatic page motion',async({page})=>{
 await page.goto('/',{waitUntil:'domcontentloaded'});
 const greeting=page.locator('.sx-v18-loader');
 await expect(greeting).toHaveCount(1);
 await expect(greeting.locator('[lang="fa"]')).toContainText('سلام');
 await expect(page.getByRole('region',{name:'Guided portfolio tour'})).toHaveCount(0);
 await expect(greeting).toHaveCount(0,{timeout:9000});
 await expect(page.getByRole('region',{name:'Guided portfolio tour'})).toBeVisible({timeout:5000});
});

test('portrait remains fully inside its own frame with zero text intersection',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('.sx-v18-loader')).toHaveCount(0,{timeout:5000});
 const frame=page.locator('#intro .sx-v18-portrait-frame');
 const photo=frame.locator('img');
 await expect(photo).toHaveAttribute('src','/assets/hires/portrait.webp');
 await expect(photo).toHaveCSS('object-fit','contain');
 await expect(photo).toHaveCSS('filter',/grayscale/);
 const bounds=await page.evaluate(()=>{
  const f=document.querySelector('#intro .sx-v18-portrait-frame')!.getBoundingClientRect();
  const n=document.querySelector('#intro h1')!.getBoundingClientRect();
  return {overlap:f.left<n.right&&n.left<f.right&&f.top<n.bottom&&n.top<f.bottom,
   photoInside:document.querySelector('#intro .sx-v18-portrait-frame img')!.getBoundingClientRect().width<=f.width+1};
 });
 expect(bounds.overlap).toBe(false);
 expect(bounds.photoInside).toBe(true);
 await expect(frame.locator('figcaption,.sx-v16-cover-photo-note')).toHaveCount(0);
 await expect(page.locator('#about img')).toHaveCount(0);
});

test('main visual identity is strict black and white with sparse work rows',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 const colors=await page.evaluate(()=>{
  const read=(selector:string)=>getComputedStyle(document.querySelector(selector)!).backgroundColor;
  return {intro:read('#intro'),index:read('#work-index'),about:read('#about')};
 });
 expect(colors.intro).toBe('rgb(255, 255, 255)');
 expect(colors.index).toBe('rgb(8, 8, 8)');
 expect(colors.about).toBe('rgb(255, 255, 255)');
 await expect(page.locator('#work-index .sx-v18-index-entry')).toHaveCount(4);
 await expect(page.locator('#work-index .sx-v17-index-watermark')).toHaveCount(0);
 for(const id of ids){
  await expect(page.locator('#work-index a[href="#project-'+id+'"]')).toHaveCount(1);
  await expect(page.locator('#work-index a[href="/work/'+id+'/"]')).toHaveCount(1);
 }
});

test('owner name uses one ordered two-line visual sequence',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 const title=page.locator('#intro h1');
 await expect(title.locator('[data-reveal-line]')).toHaveCount(2);
 await expect(title.locator('[data-reveal-line]').first()).toContainText('SAEID');
 await expect(title.locator('[data-reveal-line]').last()).toContainText('SHAMSAEI');
 expect(await title.locator('[data-reveal-line]').first().evaluate(el=>getComputedStyle(el).display)).toBe('block');
 await expect(title.locator('.sx-word-a11y')).toHaveCount(1);
});

test('actual Linux code and source-driven projects remain available',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('#top .sx-linux-editor')).toHaveCount(1);
 for(const id of ids){
  await expect(page.locator('#project-'+id+' .sx-v14-scene')).toHaveCount(3);
  await expect(page.locator('#project-'+id+' img')).toHaveCount(0);
 }
});

test('new minimalist cover, directory and contact do not overflow narrow viewports',async({browser})=>{
 for(const width of [320,360,390,430,768,1440]){
  const page=await browser.newPage({viewport:{width,height:844},reducedMotion:'reduce'});
  await page.goto('/',{waitUntil:'domcontentloaded'});
  await expect(page.locator('.sx-v18-loader')).toHaveCount(0,{timeout:6000});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth),
   'horizontal overflow at '+width).toBeLessThanOrEqual(2);
  await expect(page.locator('#intro .sx-v18-portrait-frame img')).toBeVisible();
  await expect(page.locator('#work-index .sx-v18-index-entry')).toHaveCount(4);
  await page.close();
 }
});
