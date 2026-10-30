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

test('engineering records provide image-free project summary dialogs',async({page})=>{
 await page.goto('/engineering/',{waitUntil:'domcontentloaded'});
 for(const id of ['gartal','factory','digirezhim','petiwoo']){
  const record=page.locator('#evidence-'+id);
  await expect(record).toHaveCount(1);
  await expect(record.locator('.sx-ei-decision')).toHaveCount(3);
  await expect(record.locator('.sx-ei-source-list a')).toHaveCount(0);
  await record.getByRole('button',{name:'OPEN PROJECT SUMMARY'}).click();
  const modal=record.locator('dialog.sx-v32-project-modal');
  await expect(modal).toBeVisible();
  await expect(modal).toContainText('VERIFIED SCOPE');
  await expect(modal.locator('img')).toHaveCount(0);
  await modal.getByRole('button',{name:/CLOSE/}).click();
  await expect(modal).not.toBeVisible();
 }
});

test('cinematic landing and each case route have a direct evidence-first shortcut',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('header.sx-v18-header nav a[href="/engineering/"]')).toHaveText('Engineering');
 await expect(page.locator('#work-index a[href="/engineering/#evidence-factory"]')).toHaveCount(1);
 await page.goto('/work/factory/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('.case-nav a[href="/engineering/#evidence-factory"]')).toHaveCount(1);
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
