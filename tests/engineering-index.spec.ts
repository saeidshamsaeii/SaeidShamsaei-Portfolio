import {test,expect} from '@playwright/test';

test('engineering index is available as a direct non-cinematic reading route',async({page})=>{
 await page.goto('/engineering/',{waitUntil:'domcontentloaded'});
 await expect(page.getByRole('heading',{name:/Make the work inspectable/})).toBeVisible();
 await expect(page.locator('.sx-ei-project')).toHaveCount(4);
 await expect(page.locator('.sx-ei-decision')).toHaveCount(12);
 await expect(page.getByRole('region',{name:'Guided portfolio tour'})).toHaveCount(0);
 await expect(page.locator('.sx-ei-project img')).toHaveCount(0);
});

test('project and technical discipline filters really change visible evidence',async({page})=>{
 await page.goto('/engineering/',{waitUntil:'domcontentloaded'});
 await page.getByRole('button',{name:'DigiRezhim'}).click();
 await expect(page.locator('.sx-ei-project')).toHaveCount(1);
 await expect(page.getByRole('heading',{name:'DigiRezhim',exact:true})).toBeVisible();
 await page.getByRole('button',{name:'Architecture'}).click();
 await expect(page.locator('.sx-ei-decision')).toHaveCount(1);
 await page.getByLabel('Search technical evidence').fill('no matches should appear');
 await expect(page.getByRole('heading',{name:'No matching source evidence.'})).toBeVisible();
 await page.getByRole('button',{name:'Show all evidence'}).click();
 await expect(page.locator('.sx-ei-decision')).toHaveCount(12);
});

test('source registers link to actual repo paths and disclose non-verified runtime facts',async({page})=>{
 await page.goto('/engineering/',{waitUntil:'domcontentloaded'});
 for(const id of ['gartal','factory','digirezhim','petiwoo']){
  const record=page.locator('#evidence-'+id);
  await expect(record).toHaveCount(1);
  await expect(record.locator('.sx-ei-decision')).toHaveCount(3);
  await expect(record.locator('.sx-ei-unknown')).toContainText('Not independently verified');
  const urls=await record.locator('.sx-ei-source-list a').evaluateAll(
   anchors=>anchors.map(a=>(a as HTMLAnchorElement).href));
  expect(urls.length).toBeGreaterThanOrEqual(4);
  expect(urls.every(url=>url.startsWith('https://github.com/saeidshamsaeii/'))).toBe(true);
 }
});

test('cinematic landing and each case route have a direct evidence-first shortcut',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.getByRole('link',{name:'Engineering Index',exact:true}).first()).toHaveAttribute('href','/engineering/');
 await expect(page.locator('.sx-ei-home-bridge')).toContainText('OPEN THE ENGINEERING INDEX');
 await page.goto('/work/factory/',{waitUntil:'domcontentloaded'});
 await expect(page.getByRole('link',{name:/INSPECT ARCHITECTURE DECISIONS/})).toHaveAttribute('href','/engineering/#evidence-factory');
});

test('mobile evidence reading route fits the viewport',async({browser})=>{
 for(const width of [360,390,430,768]){
  const page=await browser.newPage({viewport:{width,height:844},reducedMotion:'reduce'});
  await page.goto('/engineering/',{waitUntil:'domcontentloaded'});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth),
   'evidence page overflow at '+width).toBeLessThanOrEqual(2);
  await page.close();
 }
});
