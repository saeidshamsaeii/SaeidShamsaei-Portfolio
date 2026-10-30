import {test,expect} from '@playwright/test';

test('Hello... still leads and the automatic story is invisible after welcome',async({page})=>{
 await page.goto('/',{waitUntil:'domcontentloaded'});
 const loader=page.locator('.sx-v18-loader');
 await expect(loader.locator('[lang="en"]')).toContainText('Hello...');
 await expect(loader.locator('.sx-v19-hello-content')).toHaveCSS('flex-direction','row');
 await expect(loader.locator('.sx-v19-hello-dots')).toHaveText('...');
 await expect(loader).toHaveCount(0,{timeout:8500});
 await expect(page.locator('.sx-guided-tour')).toHaveCount(0);
 await expect(page.locator('html')).toHaveAttribute('data-portfolio-tour','playing',{timeout:5000});
});

test('owner portrait is native-scale, correctly framed and monochrome',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 const image=page.locator('#intro .sx-v19-photo-background img');
 await expect(image).toHaveAttribute('src','/assets/hires/portrait.webp');
 await expect(image).toHaveCSS('object-fit','cover');
 await expect(image).toHaveCSS('object-position','50% 0%');
 await expect(image).toHaveCSS('filter',/grayscale\(1\)/);
 await expect(image).toHaveCSS('transform','none');
 await expect(page.locator('#intro figure')).toHaveCount(0);
});

test('header labels are centrally aligned in desktop and mobile layouts',async({browser})=>{
 for(const width of [390,768,1024,1440]){
  const page=await browser.newPage({viewport:{width,height:844},reducedMotion:'reduce'});
  await page.goto('/',{waitUntil:'domcontentloaded'});
  const delta=await page.evaluate(()=>{
   const nav=document.querySelector('.sx-v18-header nav')!.getBoundingClientRect();
   return Math.abs(nav.left+nav.width/2-innerWidth/2);
  });
  expect(delta,'nav center at '+width).toBeLessThanOrEqual(12);
  await page.close();
 }
});

test('first-screen words appear after greeting, without any required scroll',async({page})=>{
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('.sx-v18-loader')).toHaveCount(0,{timeout:8500});
 const first=page.locator('#intro h1 [data-reveal-word]').first();
 const last=page.locator('#intro h1 [data-reveal-word]').last();
 await expect.poll(()=>first.evaluate(el=>Number(getComputedStyle(el).opacity)),{timeout:4500}).toBeGreaterThan(.9);
 await expect.poll(()=>last.evaluate(el=>Number(getComputedStyle(el).opacity)),{timeout:4500}).toBeGreaterThan(.9);
 expect(await page.evaluate(()=>scrollY)).toBeLessThan(innerHeight);
});

test('GARTAL home scenes and case chapters retain ordered real-word typography',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 const chapter=page.locator('#project-gartal');
 await expect(chapter.locator('.sx-v30-case-slide')).toHaveCount(3);
 await expect(chapter.locator('.sx-v30-case-copy h3.sx-word-reveal')).toHaveCount(3);
 await page.goto('/work/gartal/',{waitUntil:'domcontentloaded'});
 const first=page.locator('.sx-v31-deep-item').first();
 await first.locator('summary').click();
 const paragraph=first.locator('.sx-v31-deep-content>p.sx-v20-ordered').first();
 expect(await paragraph.locator('[data-reveal-word]').count()).toBeGreaterThan(12);
 await expect(paragraph.locator('.sx-word-a11y')).toHaveCount(1);
});

test('dark and white section backgrounds remain exact',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 const colors=await page.evaluate(()=>{
  const bg=(selector:string)=>getComputedStyle(document.querySelector(selector)!).backgroundColor;
  return {cover:bg('#intro'),work:bg('#work-index'),about:bg('#about'),contact:bg('#contact')};
 });
 expect(colors).toEqual({
  cover:'rgb(0, 0, 0)',work:'rgb(0, 0, 0)',
  about:'rgb(255, 255, 255)',contact:'rgb(255, 255, 255)'
 });
});

test('auto reading remains functional without a visible control bar',async({page})=>{
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('.sx-v18-loader')).toHaveCount(0,{timeout:8500});
 await expect(page.locator('.sx-guided-tour')).toHaveCount(0);
 await expect(page.locator('html')).toHaveAttribute('data-portfolio-tour','playing');
 await page.mouse.wheel(0,220);
 await expect(page.locator('html')).toHaveAttribute('data-portfolio-tour','manual');
 await expect(page.locator('html')).toHaveAttribute('data-portfolio-tour','playing',{timeout:6500});
});

test('portrait and live chapters do not expand the document on narrow viewports',async({browser})=>{
 for(const width of [320,360,390,430,768,1024,1440]){
  const page=await browser.newPage({viewport:{width,height:844},reducedMotion:'reduce'});
  await page.goto('/',{waitUntil:'domcontentloaded'});
  const geometry=await page.evaluate(()=>{
   const photo=document.querySelector('#intro .sx-v19-photo-background')!.getBoundingClientRect();
   const title=document.querySelector('#intro h1')!.getBoundingClientRect();
   return {overlap:photo.left<title.right&&title.left<photo.right&&photo.top<title.bottom&&title.top<photo.bottom,
    excess:document.documentElement.scrollWidth-innerWidth};
  });
  expect(geometry.overlap,'cover overlap at '+width).toBe(false);
  expect(geometry.excess,'horizontal overflow at '+width).toBeLessThanOrEqual(2);
  await page.close();
 }
});
