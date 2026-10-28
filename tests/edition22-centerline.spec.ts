import {test,expect} from '@playwright/test';

test('the original owner name and top-left site wordmark are pure white on black',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 const brand=page.locator('header.sx-v18-header a.sx-v18-brand');
 await expect(brand).toHaveCSS('color','rgb(255, 255, 255)');
 const title=page.locator('#intro h1 .sx-word-piece').first();
 await expect(title).toHaveCSS('color','rgb(255, 255, 255)');
 await expect(title).toHaveCSS('opacity','1');
});

test('a real image fade reaches solid black at the bottom of the photo',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 const bg=await page.locator('#intro .sx-v19-photo-background').evaluate(el=>
  getComputedStyle(el,'::after').backgroundImage);
 expect(bg).toContain('linear-gradient');
 expect(bg).toMatch(/rgb\(0, 0, 0\).*100%/);
});

test('individual paragraphs complete no later than their own viewport midpoint',async({page})=>{
 await page.goto('/work/gartal/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('html')).toHaveAttribute('data-portfolio-tour','playing',{timeout:6000});
 await page.keyboard.press('Escape');
 const paragraph=page.locator('.sx-v10-case-section .sx-v13-paragraph p.sx-v20-ordered').nth(1);
 await paragraph.evaluate(el=>{
  const rect=el.getBoundingClientRect();
  window.scrollTo({top:window.scrollY+rect.top+rect.height/2-innerHeight/2,behavior:'instant'});
 });
 await expect.poll(()=>paragraph.locator('[data-reveal-word]').last().evaluate(el=>
  Number(getComputedStyle(el).opacity)),{timeout:3500}).toBeGreaterThan(.99);
});

test('last visible contact details are not left hidden at the bottom of the document',async({page})=>{
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('.sx-v18-loader')).toHaveCount(0,{timeout:8500});
 await page.keyboard.press('Escape');
 await page.evaluate(()=>window.scrollTo({top:document.documentElement.scrollHeight,behavior:'instant'}));
 const links=page.locator('#contact .sx-contact-link');
 await expect(links).toHaveCount(4);
 await expect.poll(async()=>{
  return links.locator('[data-reveal-word]').evaluateAll(nodes=>
   nodes.filter(node=>{
    const rect=node.getBoundingClientRect();
    return rect.top<innerHeight&&rect.bottom>0 &&
     Number(getComputedStyle(node).opacity)<.99;
   }).length);
 },{timeout:3500}).toBe(0);
});

test('old gold case labels and source links are explicitly white',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/work/gartal/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('.sx-v10-case-cover .sx-v10-counter')).toHaveCSS('color','rgb(255, 255, 255)');
 await page.goto('/engineering/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('.sx-ei .sx-ei-file-links a').first()).toHaveCSS('color','rgb(255, 255, 255)');
});
