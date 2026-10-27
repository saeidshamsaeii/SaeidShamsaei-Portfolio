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
