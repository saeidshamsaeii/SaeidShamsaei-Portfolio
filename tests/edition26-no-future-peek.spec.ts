import {test,expect} from '@playwright/test';

test('every future block stays blank through a held panel, then manual scroll restores control',async({page})=>{
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('.sx-v18-loader')).toHaveCount(0,{timeout:9000});
 // Jump near a real reading stop, then let idle resume the headless tour.
 const destination=await page.evaluate(()=>{
  const section=document.querySelector<HTMLElement>('#project-gartal');
  if(!section)throw new Error('Missing GARTAL chapter');
  const rect=section.getBoundingClientRect();
  return rect.top+scrollY+Math.max(0,rect.height-innerHeight)*(.66/3)-190;
 });
 await page.mouse.wheel(0,40);
 await page.evaluate(y=>scrollTo({top:Math.max(0,y),behavior:'instant'}),destination);
 await expect(page.locator('html')).toHaveAttribute('data-portfolio-tour','manual');
 await expect(page.locator('html')).toHaveAttribute('data-portfolio-tour','playing',{timeout:6500});
 await expect(page.locator('html')).toHaveAttribute('data-portfolio-tour-hold','horizontal-frame',{timeout:14000});

 const current=page.locator('#project-gartal [data-frame-index="0"]');
 await expect(current).toHaveAttribute('data-frame-state','active');
 await expect(current.locator('.sx-word-reveal').last()).toHaveAttribute('data-reveal-complete','true');

 // Both adjacent and distant future stops are reserved, not only the next one.
 const upcoming=page.locator('#project-gartal [data-frame-index="1"]');
 const distant=page.locator('#project-petiwoo [data-frame-index="2"]');
 await expect(upcoming).toHaveAttribute('data-tour-awaiting','true');
 await expect(distant).toHaveAttribute('data-tour-awaiting','true');
 await expect(page.locator('#contact')).toHaveAttribute('data-tour-awaiting','true');
 await expect(upcoming.locator('.sx-word-pieces').first()).toHaveCSS('visibility','hidden');
 await expect(distant.locator('.sx-word-pieces').first()).toHaveCSS('visibility','hidden');
 await expect(page.locator('#contact > *').first()).toHaveCSS('visibility','hidden');

 const before=await page.evaluate(()=>scrollY);
 await page.waitForTimeout(650);
 expect(Math.abs(await page.evaluate(()=>scrollY)-before)).toBeLessThanOrEqual(3);

 // Native input immediately drops every reservation, including distant ones.
 await page.mouse.wheel(0,150);
 await expect(page.locator('html')).toHaveAttribute('data-portfolio-tour','manual');
 await expect(page.locator('[data-tour-awaiting="true"]')).toHaveCount(0);
});

test('reduced motion never hides future sections',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('[data-tour-awaiting="true"]')).toHaveCount(0);
 await expect(page.locator('#contact > *').first()).not.toHaveCSS('visibility','hidden');
});
