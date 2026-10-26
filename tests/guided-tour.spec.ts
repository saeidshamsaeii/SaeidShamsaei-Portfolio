import {test,expect} from '@playwright/test';
import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {join} from 'node:path';

test('the portfolio automatically launches a full-screen-scroll narrative with real progress',async({page})=>{
 await page.goto('/',{waitUntil:'domcontentloaded'});
 const tour=page.getByRole('region',{name:'Guided portfolio tour'});
 await expect(tour).toBeVisible({timeout:6000});
 await expect(tour.locator('[role="progressbar"]')).toHaveAttribute('aria-valuemax','100');
 await expect(page.locator('html')).toHaveAttribute('data-portfolio-tour','running');
 await expect(tour).toContainText('AUTOMATIC STORY');
});

test('stopping the director never blocks free scroll or navigating case studies',async({page})=>{
 await page.goto('/',{waitUntil:'domcontentloaded'});
 const tour=page.getByRole('region',{name:'Guided portfolio tour'});
 await expect(tour).toBeVisible({timeout:6000});
 await tour.getByRole('button',{name:'Exit guided tour'}).click();
 await expect(tour).toHaveCount(0);
 await page.locator('#project-gartal-origin').scrollIntoViewIfNeeded();
 await expect(page.locator('#project-gartal-origin')).toBeVisible();
 await page.locator('#project-gartal').getByRole('link',{name:/FULL TECHNICAL CASE STUDY/i}).click();
 await expect(page).toHaveURL(/\/work\/gartal\//);
 await expect(page.locator('.sx-v10-case-section')).toHaveCount(6);
});

test('a full independent case study also starts its own timed reading tour',async({page})=>{
 await page.goto('/work/digirezhim/',{waitUntil:'domcontentloaded'});
 const tour=page.getByRole('region',{name:'Guided portfolio tour'});
 await expect(tour).toBeVisible({timeout:6000});
 await tour.getByRole('button',{name:'Pause tour'}).click();
 await expect(tour).toContainText('PAUSED');
 await tour.getByRole('button',{name:'Exit guided tour'}).click();
 await expect(tour).toHaveCount(0);
 await expect(page.getByRole('button',{name:'RESTART TOUR'})).toBeVisible();
});

test('manual keyboard navigation exits playback without a forced scroll trap',async({page})=>{
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.getByRole('region',{name:'Guided portfolio tour'})).toBeVisible({timeout:6000});
 await page.keyboard.press('Escape');
 await expect(page.getByRole('region',{name:'Guided portfolio tour'})).toHaveCount(0);
});

test('reduced motion never autostarts the tour but keeps the complete story visible',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.getByRole('region',{name:'Guided portfolio tour'})).toHaveCount(0);
 await expect(page.locator('#project-gartal .sx-v10-story-panel')).toHaveCount(6);
 await expect(page.locator('#about .sx-v8-about-portrait img')).toHaveCount(1);
});

test('owner portrait remains the approved original asset',()=>{
 const file=readFileSync(join(process.cwd(),'public','assets','hires','portrait.webp'));
 expect(createHash('sha256').update(file).digest('hex'))
  .toBe('34c4d0509db4e2cb0f1e0c48716cb60286f92c8342c254e007074781dcadec70');
});
