import {test,expect} from '@playwright/test';

const routes=['/','/engineering/','/work/gartal/','/work/factory/','/work/digirezhim/','/work/petiwoo/'];
const viewports=[
 {width:320,height:640},{width:390,height:844},
 {width:768,height:1024},{width:1024,height:768},{width:1440,height:900}
];

test('every authored route fits both small and large viewports without JS errors',async({page})=>{
 test.setTimeout(150000);
 await page.emulateMedia({reducedMotion:'reduce'});
 const failures:string[]=[];
 page.on('pageerror',error=>failures.push(error.message));
 for(const viewport of viewports){
  await page.setViewportSize(viewport);
  for(const route of routes){
   const response=await page.goto(route,{waitUntil:'domcontentloaded'});
   expect(response?.status(),route+' HTTP status').toBe(200);
   await expect(page.locator('html')).toHaveAttribute('lang','en');
   expect(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth),
    route+' horizontal overflow at '+viewport.width).toBeLessThanOrEqual(2);
  }
 }
 expect(failures).toEqual([]);
});

test('all original works and engineering links remain navigable without a language switcher',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/');
 await expect(page.locator('header.sx-v18-header nav a')).toHaveCount(4);
 await expect(page.locator('.sx-language-switcher')).toHaveCount(0);
 await expect(page.locator('#work-index .sx-v18-index-entry')).toHaveCount(4);
 await expect(page.locator('#work-index [data-work-stage]')).toHaveCount(5);
 for(const id of ['gartal','factory','digirezhim','petiwoo']){
  await expect(page.locator('#project-'+id)).toHaveCount(1);
  await expect(page.locator('#work-index a[href="/work/'+id+'/"]')).toHaveCount(1);
  await page.goto('/work/'+id+'/');
  await expect(page.locator('.sx-v10-case-section')).toHaveCount(6);
  await expect(page.locator('.sx-v10-reference-list a')).toHaveCount(0);
  await expect(page.getByRole('button',{name:/READ PROJECT SUMMARY/})).toHaveCount(1);
  await page.getByRole('button',{name:/READ PROJECT SUMMARY/}).click();
  await expect(page.locator('.sx-v32-project-modal')).toBeVisible();
  await page.locator('.sx-v32-project-modal button[aria-label="Close project summary"]').click();
  await expect(page.locator('.sx-v32-project-modal')).not.toBeVisible();
  await page.goto('/');
 }
});

test('reduced motion exposes all work text and dividers and prevents guided autoplay',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/');
 await expect(page.locator('.sx-v18-loader')).toHaveCount(0,{timeout:9000});
 await expect(page.locator('html')).not.toHaveAttribute('data-portfolio-tour','playing');
 await expect(page.locator('#work-index [data-work-stage-state="complete"]')).toHaveCount(5);
 for(const stage of await page.locator('#work-index [data-work-stage]').all()){
  const transform=await stage.evaluate(el=>getComputedStyle(el,'::after').transform);
  expect(transform).not.toBe('matrix(0, 0, 0, 1, 0, 0)');
 }
});

test('engineering search count always matches the number of visible decisions',async({page})=>{
 await page.goto('/engineering/',{waitUntil:'domcontentloaded'});
 const search=page.getByLabel('Search technical evidence');
 for(const phrase of ['tenancy','clinic','Worker','delivered-no-such-term']){
  await search.fill(phrase);
  const number=await page.locator('.sx-ei-decision').count();
  const counter=page.locator('.sx-ei-results-head');
  await expect(counter).toContainText(number+' matching decisions');
  if(number===0)await expect(page.getByText('No matching source evidence.')).toBeVisible();
 }
 await search.fill('');
 await expect(page.locator('.sx-ei-decision')).toHaveCount(12);
});

test('404 route offers direct recovery navigation in the correct theme',async({page})=>{
 const response=await page.goto('/an-unknown-page/',{waitUntil:'domcontentloaded'});
 expect(response?.status()).toBe(404);
 await expect(page.getByRole('heading',{name:/The page moved/})).toBeVisible();
 await expect(page.getByRole('link',{name:/Back to portfolio/})).toHaveAttribute('href','/');
 await expect(page.getByRole('link',{name:/Engineering index/})).toHaveAttribute('href','/engineering/');
});

test('unwritten project links are not keyboard-focusable, and completed ones are',async({page})=>{
 await page.goto('/');
 await expect(page.locator('.sx-v18-loader')).toHaveCount(0,{timeout:9000});
 await page.keyboard.press('Escape');
 const selected=page.locator('#work-index');
 const rows=selected.locator('.sx-v18-index-entry');
 const first=rows.first();
 await expect(first).toHaveAttribute('data-work-stage-state','pending');
 for(const link of await first.locator('a').all()){
  await expect(link).toHaveAttribute('tabindex','-1');
  await expect(link).toHaveAttribute('aria-hidden','true');
 }
 await page.emulateMedia({reducedMotion:'reduce'});
 await expect(selected.locator('[data-work-stage-state="complete"]')).toHaveCount(5);
 for(const link of await first.locator('a').all()){
  await expect(link).toHaveAttribute('tabindex','0');
  await expect(link).not.toHaveAttribute('aria-hidden','true');
 }
});
