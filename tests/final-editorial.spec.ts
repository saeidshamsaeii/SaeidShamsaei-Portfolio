import {test,expect} from '@playwright/test';

// Owner-invoked visual/interaction regression; never run by Factory Worker.
test('biography reveals its heading and paragraphs in one ordered reading frame',async({page})=>{
 test.setTimeout(40000);
 await page.setViewportSize({width:1440,height:900});
 await page.emulateMedia({reducedMotion:'no-preference'});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('.sx-v18-loader')).toHaveCount(0,{timeout:10000});
 await page.keyboard.press('Escape'); // pause headless director
 const section=page.locator('#about.sx-v33-biography');
 await section.scrollIntoViewIfNeeded();
 await expect(section).toHaveCount(1);
 const copy=section.locator('.sx-word-reveal');
 await expect(copy).toHaveCount(3);
 const setProgress=async(progress:number)=>{
  await section.evaluate((node,value)=>{
   document.documentElement.dataset.portfolioTour='playing';
   (node as HTMLElement).dataset.bioReadingProgress=String(value);
   node.dispatchEvent(new Event('sx-biography-reading-progress'));
  },progress);
 };
 await setProgress(0);
 await expect.poll(()=>copy.first().getAttribute('data-reveal-complete')).toBe('false');
 await expect.poll(()=>copy.last().getAttribute('data-reveal-complete')).toBe('false');
 await expect.poll(()=>copy.last().locator('[data-reveal-word]').first().evaluate(el=>getComputedStyle(el).opacity)).toBe('0');
 await setProgress(.35);
 await expect.poll(()=>copy.first().getAttribute('data-reveal-complete')).toBe('true');
 await expect(copy.last()).toHaveAttribute('data-reveal-complete','false');
 await setProgress(1);
 await expect.poll(()=>copy.last().getAttribute('data-reveal-complete')).toBe('true');
 await expect.poll(()=>copy.last().locator('[data-reveal-word]').last().evaluate(el=>getComputedStyle(el).opacity)).toBe('1');
 await expect(section).not.toContainText('Qab Novin');
 await expect(section).not.toContainText('IELTS');
});

test('single biography frame is responsive and never clips its last line',async({page})=>{
 test.setTimeout(55000);
 await page.emulateMedia({reducedMotion:'reduce'});
 for(const viewport of [{width:320,height:568},{width:390,height:844},{width:768,height:1024},{width:1440,height:900}]){
  await page.setViewportSize(viewport);
  await page.goto('/',{waitUntil:'domcontentloaded'});
  const section=page.locator('#about.sx-v33-biography');
  await section.scrollIntoViewIfNeeded();
  const metrics=await section.evaluate(el=>{
   const outer=el.getBoundingClientRect();
   const inner=el.querySelector('.sx-v18-about-inner')!.getBoundingClientRect();
   return {outerHeight:outer.height,innerBottom:inner.bottom,outerBottom:outer.bottom,
    overflow:document.documentElement.scrollWidth-innerWidth};
  });
  expect(metrics.innerBottom,'biography clipped at '+viewport.width).toBeLessThanOrEqual(metrics.outerBottom+3);
  expect(metrics.overflow,'horizontal overflow at '+viewport.width).toBeLessThanOrEqual(2);
 }
});
