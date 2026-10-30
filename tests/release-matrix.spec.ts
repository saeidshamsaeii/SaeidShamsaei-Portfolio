import {test,expect} from '@playwright/test';

// Owner-invoked release matrix. These tests run against the REAL static
// export created by npm run build; they never start CI, Worker or a preview.
const routes=['/','/engineering/','/work/gartal/','/work/factory/','/work/digirezhim/','/work/petiwoo/'];
const screens=[
 {width:320,height:568},{width:390,height:844},{width:768,height:1024},
 {width:1024,height:768},{width:1440,height:900}
];

test('release matrix has no browser exceptions or horizontal viewport overflow',async({page})=>{
 test.setTimeout(165000);
 const errors:string[]=[];
 page.on('pageerror',error=>errors.push(error.message));
 await page.emulateMedia({reducedMotion:'reduce'});
 for(const viewport of screens){
  await page.setViewportSize(viewport);
  for(const url of routes){
   const response=await page.goto(url,{waitUntil:'domcontentloaded'});
   expect(response?.status(),url+' must exist at '+viewport.width).toBe(200);
   expect(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth),
    url+' horizontal overflow at '+viewport.width).toBeLessThanOrEqual(2);
   await expect(page.locator('html')).toHaveAttribute('lang','en');
   const main=page.locator('main');
   await expect(main,url+' needs a main landmark').toHaveCount(1);
  }
 }
 expect(errors,'uncaught JavaScript errors').toEqual([]);
});

test('home portrait loads and retains declared dimensions',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 const portrait=page.locator('#intro img');
 await expect(portrait).toHaveCount(1);
 await expect(portrait).toHaveAttribute('alt',/Portrait of Saeid Shamsaei/);
 await expect.poll(()=>portrait.evaluate(img=>(img as HTMLImageElement).complete))
  .toBe(true);
 const image=await portrait.evaluate(node=>{
  const img=node as HTMLImageElement;
  return {width:img.naturalWidth,height:img.naturalHeight};
 });
 expect(image.width,'portrait source must decode').toBeGreaterThan(400);
 expect(image.height).toBeGreaterThan(400);
});

test('three-line hero composition preserves line breaks on small and large screens',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 for(const viewport of [{width:390,height:844},{width:1440,height:900}]){
  await page.setViewportSize(viewport);
  await page.goto('/',{waitUntil:'domcontentloaded'});
  const final=page.locator('#top .sx-v8-hero-slide').nth(2);
  await expect(final.locator('h2 br')).toHaveCount(2);
  const blocks=final.locator('h2 .sx-word-reveal');
  await expect(blocks).toHaveCount(3);
  // WordReveal includes an accessible duplicate plus visual glyph spans;
  // compare the canonical screen-reader copy, not concatenated textContent.
  const lines=await blocks.locator('.sx-word-a11y').allTextContents();
  expect(lines.map(line=>line.trim())).toEqual([
   'ARCHITECTURE.','PRODUCT.','PEOPLE.'
  ]);
  // The browser must actually place these elements on separate baselines.
  const tops=await blocks.evaluateAll(elements=>
   elements.map(element=>Math.round(element.getBoundingClientRect().top)));
  expect(tops[1],viewport.width+'px PRODUCT on own line').toBeGreaterThan(tops[0]+8);
  expect(tops[2],viewport.width+'px PEOPLE on own line').toBeGreaterThan(tops[1]+8);
 }
});

test('project summaries replace README links; only two sites have public links',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 for(const id of ['gartal','factory','digirezhim','petiwoo']){
  await page.goto('/work/'+id+'/',{waitUntil:'domcontentloaded'});
  await expect(page.locator('.sx-v10-case-section')).toHaveCount(6);
  await expect(page.locator('.sx-v10-reference-list a')).toHaveCount(0);
  const summary=page.getByRole('button',{name:/READ PROJECT SUMMARY/});
  await summary.click();
  const modal=page.locator('.sx-v32-project-modal');
  await expect(modal).toBeVisible();
  await expect(modal.getByRole('heading',{name:'THE CHALLENGE'})).toBeVisible();
  await expect(modal.getByRole('heading',{name:'THE APPROACH'})).toBeVisible();
  await expect(modal.locator('img')).toHaveCount(0);
  const live=id==='digirezhim'?'https://digirezhim.ir':id==='petiwoo'?'https://petiwoo.ir':null;
  const link=modal.getByRole('link',{name:/VISIT .* WEBSITE/});
  if(live){
   await expect(link).toHaveAttribute('href',live);
   await expect(link).toHaveAttribute('target','_blank');
   await expect(link).toHaveAttribute('rel',/noopener/);
  }else await expect(link).toHaveCount(0);
  await page.keyboard.press('Escape');
  await expect(modal).not.toBeVisible();
 }
});

test('reduced-motion readers can reach home calls to action immediately',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('.sx-v18-loader')).toHaveCount(0,{timeout:9000});
 const links=page.locator('#intro .sx-v18-cover-links a');
 await expect(links).toHaveCount(2);
 await expect(links.first()).toBeVisible();
 await expect(links.last()).toBeVisible();
 await expect(page.locator('html')).not.toHaveAttribute('data-portfolio-tour','playing');
});

test('every route provides named links and a distinct primary heading',async({page})=>{
 test.setTimeout(75000);
 await page.emulateMedia({reducedMotion:'reduce'});
 for(const url of routes){
  await page.goto(url,{waitUntil:'domcontentloaded'});
  await expect(page.locator('h1'),url+' needs exactly one primary heading')
   .toHaveCount(1);
  const empty=await page.locator('a[href],button').evaluateAll(nodes=>
   nodes.filter(node=>{
    const label=(node.getAttribute('aria-label')||node.textContent||'').trim();
    const iconLabel=node.querySelector('img[alt]')?.getAttribute('alt')?.trim();
    return !label&&!iconLabel;
   }).map(node=>node.outerHTML.slice(0,180)));
  expect(empty,'unnamed actionable elements on '+url).toEqual([]);
 }
});

test('home skip navigation is keyboard accessible, including reduced motion',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 const skip=page.getByRole('link',{name:'Skip to work'});
 await page.keyboard.press('Tab');
 await expect(skip).toBeFocused();
 await page.keyboard.press('Enter');
 await expect(page).toHaveURL(/#work-index$/);
 await expect(page.locator('#work-index')).toHaveCount(1);
});
