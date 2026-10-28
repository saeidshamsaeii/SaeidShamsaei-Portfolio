import {test,expect} from '@playwright/test';

test('hero contains the restored personal statement and appears beside the real portrait',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 const intro=page.locator('#intro');
 await expect(intro.getByRole('heading',{level:1})).toContainText('SAEID');
 await expect(intro.getByRole('heading',{level:1})).toContainText('SHAMSAEI');
 await expect(intro.locator('.sx-v18-cover-lead')).toContainText('I make complex digital systems');
 await expect(intro.locator('.sx-v18-cover-lead')).toContainText('feel considered, useful and human.');
 await expect(intro.locator('.sx-v19-photo-background img')).toHaveAttribute('src','/assets/hires/portrait.webp');
});

test('the first-screen statement becomes readable before automatic scroll leaves the opening',async({page})=>{
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('.sx-v18-loader')).toHaveCount(0,{timeout:8500});
 const name=page.locator('#intro h1 [data-reveal-word]').last();
 const lastWord=page.locator('#intro .sx-v18-cover-lead [data-reveal-word]').last();
 await expect.poll(()=>name.evaluate(el=>Number(getComputedStyle(el).opacity)),{timeout:4200}).toBeGreaterThan(.98);
 await expect.poll(()=>lastWord.evaluate(el=>Number(getComputedStyle(el).opacity)),{timeout:4200}).toBeGreaterThan(.98);
 await expect(page.locator('.sx-guided-tour')).toHaveCount(0);
});

test('scroll jumps do not write the next case paragraph before the prior paragraph is complete',async({page})=>{
 await page.goto('/work/gartal/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('html')).toHaveAttribute('data-portfolio-tour','playing',{timeout:6000});
 await page.keyboard.press('Escape');
 const article=page.locator('.sx-v10-case-section').first();
 const paragraphs=article.locator('.sx-v13-paragraph p');
 await expect(paragraphs).toHaveCount(3);
 const firstLast=paragraphs.nth(0).locator('[data-reveal-word]').last();
 const secondFirst=paragraphs.nth(1).locator('[data-reveal-word]').first();
 // Jump toward the bottom of a chapter: a sequential section clock should
 // process the passage in order instead of showing all lines simultaneously.
 await article.evaluate(el=>{
  const rect=el.getBoundingClientRect();
  window.scrollTo({top:window.scrollY+rect.top+rect.height*.70,behavior:'instant'});
 });
 const premature=await page.evaluate(async()=>{
  const firstArticle=document.querySelector('.sx-v10-case-section');
  const passages=firstArticle?.querySelectorAll('.sx-v13-paragraph p');
  const a=passages?.[0]?.querySelector('[data-reveal-word]:last-child');
  const b=passages?.[1]?.querySelector('[data-reveal-word]:first-child');
  if(!(a instanceof HTMLElement)||!(b instanceof HTMLElement))return true;
  for(let i=0;i<140;i++){
   await new Promise<void>(resolve=>requestAnimationFrame(()=>resolve()));
   const previous=Number(getComputedStyle(a).opacity);
   const next=Number(getComputedStyle(b).opacity);
   if(next>.02&&previous<.98)return true;
  }
  return false;
 });
 expect(premature).toBe(false);
 // Locators above check actual source structure independently as well.
 await expect(firstLast).toHaveCount(1);
 await expect(secondFirst).toHaveCount(1);
});

test('auto-reading speed is medium, continuous and has no on-screen speed bar',async({page})=>{
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('.sx-v18-loader')).toHaveCount(0,{timeout:8500});
 await expect(page.locator('html')).toHaveAttribute('data-portfolio-tour','playing');
 await expect(page.locator('.sx-guided-tour,.sx-v11-top-speed,.sx-v11-top-progress')).toHaveCount(0);
 await expect.poll(()=>page.evaluate(()=>scrollY),{timeout:8500}).toBeGreaterThan(60);
 await page.mouse.wheel(0,220);
 await expect(page.locator('html')).toHaveAttribute('data-portfolio-tour','manual');
 await expect(page.locator('html')).toHaveAttribute('data-portfolio-tour','playing',{timeout:6500});
});

test('hero and paragraph text is readable on monochrome phones with reduced motion',async({browser})=>{
 for(const width of [320,360,390,430,768,1024,1440]){
  const page=await browser.newPage({viewport:{width,height:844},reducedMotion:'reduce'});
  await page.goto('/',{waitUntil:'domcontentloaded'});
  await expect(page.locator('#intro .sx-v18-cover-lead')).toBeVisible();
  await expect(page.locator('#intro .sx-v18-cover-lead [data-reveal-word]').last()).toHaveCSS('opacity','1');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth),
   'horizontal overflow at '+width).toBeLessThanOrEqual(2);
  await page.close();
 }
});
