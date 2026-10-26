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
 await expect(tour).toContainText('AUTO STORY');
 await expect(tour).toHaveClass(/sx-v11-tour/);
 await expect(tour.getByRole('button',{name:'Change tour speed'})).toContainText('2×');
 const position=await tour.evaluate(e=>getComputedStyle(e).top);
 expect(parseFloat(position)).toBeGreaterThan(0);
});

test('stopping the director never blocks free scroll or navigating case studies',async({page})=>{
 await page.goto('/',{waitUntil:'domcontentloaded'});
 const tour=page.getByRole('region',{name:'Guided portfolio tour'});
 await expect(tour).toBeVisible({timeout:6000});
 await tour.getByRole('button',{name:'Exit guided tour'}).click();
 await expect(tour).toHaveCount(0);
 await page.locator('#project-gartal').evaluate(e=>window.scrollTo({top:e.getBoundingClientRect().top+window.scrollY+10,behavior:'instant'}));
 await expect(page.locator('#project-gartal .sx-v11-slide--intro')).toBeVisible();
 await page.locator('#project-gartal').getByRole('link',{name:/THE FULL ENGINEERING STORY/i}).click();
 await expect(page).toHaveURL(/\/work\/gartal\//);
 await expect(page.locator('.sx-v10-case-section')).toHaveCount(6);
});

test('a full independent case study also starts its own timed reading tour',async({page})=>{
 await page.goto('/work/digirezhim/',{waitUntil:'domcontentloaded'});
 const tour=page.getByRole('region',{name:'Guided portfolio tour'});
 await expect(tour).toBeVisible({timeout:6000});
 await tour.getByRole('button',{name:'Pause tour'}).click();
 await expect(tour.getByRole('button',{name:'Resume tour'})).toBeVisible();
 await tour.getByRole('button',{name:'Exit guided tour'}).click();
 await expect(tour).toHaveCount(0);
 await expect(page.getByRole('button',{name:'RESTART TOUR'})).toBeVisible();
});

test('top-only transparent tour toolbar has no bottom controller box',async({page})=>{
 await page.goto('/',{waitUntil:'domcontentloaded'});
 const tour=page.getByRole('region',{name:'Guided portfolio tour'});
 await expect(tour).toBeVisible({timeout:6000});
 const placement=await tour.evaluate(el=>({
  top:parseFloat(getComputedStyle(el).top),
  bottom:getComputedStyle(el).bottom,
  background:getComputedStyle(el).backgroundColor,
  border:getComputedStyle(el).borderTopWidth,
  buttons:el.querySelectorAll('button').length
 }));
 expect(placement.top).toBeGreaterThan(0);
 expect(placement.bottom).toBe('auto');
 expect(placement.background).toBe('rgba(0, 0, 0, 0)');
 expect(placement.border).toBe('0px');
 expect(placement.buttons).toBe(3);
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
 await expect(page.locator('#project-gartal .sx-v11-slide--story')).toHaveCount(18);
 await expect(page.locator('#about .sx-v8-about-portrait img')).toHaveCount(1);
});

test('owner portrait remains the approved original asset',()=>{
 const file=readFileSync(join(process.cwd(),'public','assets','hires','portrait.webp'));
 expect(createHash('sha256').update(file).digest('hex'))
  .toBe('34c4d0509db4e2cb0f1e0c48716cb60286f92c8342c254e007074781dcadec70');
});
