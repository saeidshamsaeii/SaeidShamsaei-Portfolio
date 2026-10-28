import {test,expect} from '@playwright/test';

test('Hello... comes first, then the rest of the greeting sequence rapidly',async({page})=>{
 await page.goto('/',{waitUntil:'domcontentloaded'});
 const loader=page.locator('.sx-v18-loader');
 await expect(loader.locator('[lang="en"]')).toContainText('Hello...');
 await expect(page.getByRole('region',{name:'Guided portfolio tour'})).toHaveCount(0);
 await expect(loader).toHaveCount(0,{timeout:8500});
 await expect(page.getByRole('region',{name:'Guided portfolio tour'})).toBeVisible({timeout:5000});
});

test('original portrait is crisp full bleed, high in the background and not boxed',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 const photograph=page.locator('#intro .sx-v19-photo-background img');
 await expect(photograph).toHaveAttribute('src','/assets/hires/portrait.webp');
 await expect(photograph).toHaveCSS('object-fit','cover');
 await expect(photograph).toHaveCSS('object-position','50% 7%');
 await expect(photograph).toHaveCSS('filter',/grayscale\(1\)/);
 await expect(page.locator('#intro figure')).toHaveCount(0);
 await expect(page.locator('#intro .sx-v18-portrait-frame')).toHaveCount(0);
});

test('primary section backgrounds use exact rgb 0 or 255',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 const colors=await page.evaluate(()=>{
  const bg=(s:string)=>getComputedStyle(document.querySelector(s)!).backgroundColor;
  return {cover:bg('#intro'),index:bg('#work-index'),about:bg('#about'),
   contact:bg('#contact')};
 });
 expect(colors).toEqual({
  cover:'rgb(0, 0, 0)',index:'rgb(0, 0, 0)',
  about:'rgb(255, 255, 255)',contact:'rgb(255, 255, 255)'
 });
});

test('GARTAL reveals one title, then exactly two authored signature lines',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 const chapter=page.locator('#project-gartal .sx-v14-opening');
 const title=chapter.locator('h2 [data-reveal-line]');
 const lines=chapter.locator('p [data-reveal-line]');
 await expect(title).toHaveCount(1);
 await expect(title).toContainText('GARTAL');
 await expect(lines).toHaveCount(2);
 await expect(lines.first()).toContainText('A studio at the front. A platform');
 await expect(lines.last()).toContainText('underneath.');
 await expect(chapter.locator('p')).toContainText('A studio at the front. A platform');
 await expect(page.locator('#intro h1 [data-reveal-line]')).toHaveCount(2);
});

test('tour has no speed text or progress bar, while manual control is retained',async({page})=>{
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('.sx-v18-loader')).toHaveCount(0,{timeout:8500});
 const tour=page.getByRole('region',{name:'Guided portfolio tour'});
 await expect(tour).toBeVisible();
 await expect(tour.locator('.sx-v11-top-progress,.sx-v11-top-speed')).toHaveCount(0);
 await tour.getByRole('button',{name:'Pause tour'}).click();
 await expect(tour).toHaveAttribute('data-playback','paused');
 await tour.getByRole('button',{name:'Resume tour'}).click();
 await expect(tour).toHaveAttribute('data-playback','playing');
});

test('mobile photo sits above copy, not beneath the text',async({browser})=>{
 for(const width of [320,360,390,430,768,1024,1440]){
  const page=await browser.newPage({viewport:{width,height:844},reducedMotion:'reduce'});
  await page.goto('/',{waitUntil:'domcontentloaded'});
  await expect(page.locator('.sx-v18-loader')).toHaveCount(0,{timeout:5000});
  const geometry=await page.evaluate(()=>{
   const photo=document.querySelector('#intro .sx-v19-photo-background')!.getBoundingClientRect();
   const name=document.querySelector('#intro h1')!.getBoundingClientRect();
   return {overlap:photo.left<name.right&&name.left<photo.right&&
     photo.top<name.bottom&&name.top<photo.bottom,
    overflow:document.documentElement.scrollWidth-innerWidth};
  });
  expect(geometry.overlap,'portrait text overlap at '+width).toBe(false);
  expect(geometry.overflow,'horizontal overflow at '+width).toBeLessThanOrEqual(2);
  await page.close();
 }
});
