import {test,expect} from '@playwright/test';

test('the first screen is an authentic identity-led cover, not a fake interface mockup',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 const cover=page.locator('#intro');
 await expect(cover).toBeVisible();
 await expect(cover.locator('h1')).toContainText('SAEID');
 await expect(cover.locator('h1')).toContainText('SHAMSAEI');
 await expect(cover.locator('img')).toHaveCount(1);
 await expect(cover.locator('img')).toHaveAttribute('src','/assets/hires/portrait.webp');
 await expect(page.locator('#about img')).toHaveCount(0);
 await expect(page.locator('#top .sx-linux-editor')).toHaveCount(1);
 await expect(page.locator('#intro canvas,#intro video')).toHaveCount(0);
});

test('work directory shows four distinct products and offers evidence links without a tour',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 const index=page.locator('#work-index');
 await expect(index).toHaveCount(1);
 await expect(index.locator('.sx-v16-index-entry')).toHaveCount(4);
 await expect(index.getByRole('heading',{name:/Selected work/})).toBeVisible();
 for(const id of ['gartal','factory','digirezhim','petiwoo']){
  await expect(index.getByRole('link',{name:new RegExp('Discover '+{
   gartal:'GARTAL',factory:'AI Development Factory',digirezhim:'DigiRezhim',petiwoo:'Petiwoo'
  }[id as 'gartal'|'factory'|'digirezhim'|'petiwoo'])})).toHaveAttribute('href','#project-'+id);
  await expect(index.locator('a[href="/engineering/#evidence-'+id+'"]')).toHaveCount(1);
  await expect(index.locator('a[href="/work/'+id+'/"]')).toHaveCount(1);
 }
});

test('keyboard focus reveals contextual project information and preserves direct navigation',async({page})=>{
 await page.goto('/',{waitUntil:'domcontentloaded'});
 const tour=page.getByRole('region',{name:'Guided portfolio tour'});
 if(await tour.isVisible())await tour.getByRole('button',{name:'Exit guided tour'}).click();
 const petiwoo=page.locator('.sx-v16-index-entry').last();
 await petiwoo.locator('.sx-v16-index-row').focus();
 await expect(petiwoo).toHaveClass(/is-current/);
 await expect(petiwoo.getByText('Designed for the animal.')).toHaveCount(1);
 await expect(petiwoo.locator('a[href="/work/petiwoo/"]')).toHaveCount(1);
});

test('tour includes a portrait opening, Linux code, work index and all four horizontal projects',async({page})=>{
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('#intro[data-tour-stop]')).toHaveCount(1);
 await expect(page.locator('#top .sx-v8-hero-slide[data-tour-stop]')).toHaveCount(3);
 await expect(page.locator('#work-index[data-tour-stop]')).toHaveCount(1);
 for(const id of ['gartal','factory','digirezhim','petiwoo']){
  await expect(page.locator('#project-'+id+'[data-horizontal-chapter]')).toHaveCount(1);
  await expect(page.locator('#project-'+id+' .sx-v14-scene')).toHaveCount(5);
 }
});

test('no horizontal overflow on narrow phones for the new cover and directory',async({browser})=>{
 for(const width of [320,360,390,430,768]){
  const page=await browser.newPage({viewport:{width,height:844},reducedMotion:'reduce'});
  await page.goto('/',{waitUntil:'domcontentloaded'});
  const delta=await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth);
  expect(delta,'document overflow at '+width).toBeLessThanOrEqual(2);
  await expect(page.locator('#intro .sx-v16-cover-image img')).toBeVisible();
  await expect(page.locator('#work-index .sx-v16-index-entry')).toHaveCount(4);
  await page.close();
 }
});

test('project identity and focus word respond to direct keyboard navigation',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 const directory=page.locator('#work-index');
 await expect(directory).toHaveAttribute('data-active-project','gartal');
 await expect(directory.locator('.sx-v17-index-watermark')).toContainText('SYSTEMS');
 await page.locator('.sx-v16-index-entry').nth(2).locator('.sx-v16-index-row').focus();
 await expect(directory).toHaveAttribute('data-active-project','digirezhim');
 await expect(directory.locator('.sx-v17-index-watermark')).toContainText('PRECISION');
 await expect(directory.locator('.sx-v17-index-current')).toContainText('Healthtech / Platforms');
});

test('cover scroll typography uses computed pixel displacement instead of an unsupported CSS multiplier',async({page})=>{
 await page.emulateMedia({reducedMotion:'no-preference'});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 const cover=page.locator('#intro');
 await expect(cover).toBeVisible();
 const before=await cover.evaluate(el=>el.style.getPropertyValue('--sx-cover-left'));
 await page.evaluate(()=>window.scrollTo({top:Math.min(innerHeight*.45,document.documentElement.scrollHeight-innerHeight),behavior:'instant'}));
 await expect.poll(()=>cover.evaluate(el=>el.style.getPropertyValue('--sx-cover-left')),{timeout:5000}).not.toBe(before);
 const now=await cover.evaluate(el=>el.style.getPropertyValue('--sx-cover-left'));
 expect(now).toMatch(/^-?\d+(?:\.\d+)?px$/);
});

test('top progress controls are dark over light identity and return to light over Linux',async({page})=>{
 await page.goto('/',{waitUntil:'domcontentloaded'});
 const tour=page.getByRole('region',{name:'Guided portfolio tour'});
 await expect(tour).toBeVisible({timeout:6000});
 await expect(tour).toHaveAttribute('data-surface','light');
 await tour.getByRole('button',{name:'Pause tour'}).click();
 await page.locator('#top').evaluate(el=>window.scrollTo({top:el.getBoundingClientRect().top+window.scrollY+innerHeight*.3,behavior:'instant'}));
 await expect(tour).toHaveAttribute('data-surface','dark',{timeout:4000});
});
