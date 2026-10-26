import {test,expect} from '@playwright/test';
import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {join} from 'node:path';

test('autoplay begins without a launch button and ramps speed by authored chapter',async({page})=>{
 await page.goto('/',{waitUntil:'domcontentloaded'});
 const tour=page.getByRole('region',{name:'Guided portfolio tour'});
 await expect(tour).toBeVisible({timeout:6000});
 await expect(tour).toHaveAttribute('data-playback','playing');
 await expect(page.locator('html')).toHaveAttribute('data-portfolio-tour','playing');
 await expect(tour.getByLabel('Current cinematic playback pace')).toContainText('×');
 await expect(tour.getByRole('button',{name:'Change tour speed'})).toHaveCount(0);
 await expect(page.getByRole('button',{name:'Restart guided site tour'})).toHaveCount(0);
 await expect(tour.locator('[role="progressbar"]')).toHaveAttribute('aria-valuemax','100');
});

test('scrolling either direction yields instantly; idle restarts ahead of the actual scroll position',async({page})=>{
 await page.goto('/',{waitUntil:'domcontentloaded'});
 const tour=page.getByRole('region',{name:'Guided portfolio tour'});
 await expect(tour).toBeVisible({timeout:6000});
 await page.mouse.wheel(0,650);
 await expect(tour).toHaveAttribute('data-playback','manual');
 await page.mouse.wheel(0,-220);
 await expect(tour).toHaveAttribute('data-playback','manual');
 const manualY=await page.evaluate(()=>window.scrollY);
 await expect(tour).toHaveAttribute('data-playback','playing',{timeout:6500});
 const resumedY=await page.evaluate(()=>window.scrollY);
 expect(resumedY).toBeGreaterThanOrEqual(manualY-3);
 await expect.poll(async()=>await page.evaluate(()=>window.scrollY),{timeout:4500})
  .toBeGreaterThan(manualY+10);
 await expect(tour.getByLabel('Current cinematic playback pace')).toContainText('×');
});

test('scroll-linked velocity is not constant across slow and fast authored beats',async({page})=>{
 await page.goto('/',{waitUntil:'domcontentloaded'});
 const tour=page.getByRole('region',{name:'Guided portfolio tour'});
 await expect(tour).toBeVisible({timeout:6000});
 const speed=tour.getByLabel('Current cinematic playback pace');
 await expect.poll(async()=>speed.innerText(),{timeout:6000}).not.toBe('2.0×');
 // Every authored hero beat declares a different pace; transition remains smooth.
 const paces=await page.locator('#top [data-tour-pace]').evaluateAll(
  nodes=>nodes.map(node=>Number((node as HTMLElement).dataset.tourPace)));
 expect(new Set(paces).size).toBeGreaterThan(1);
});

test('new touch/keyboard actions extend the idle timeout instead of killing autoplay',async({page})=>{
 await page.goto('/',{waitUntil:'domcontentloaded'});
 const tour=page.getByRole('region',{name:'Guided portfolio tour'});
 await expect(tour).toBeVisible({timeout:6000});
 await page.keyboard.press('ArrowDown');
 await expect(tour).toHaveAttribute('data-playback','manual');
 await page.waitForTimeout(1900);
 await page.keyboard.press('ArrowUp');
 await expect(tour).toHaveAttribute('data-playback','manual');
 await page.waitForTimeout(1800);
 await expect(tour).toHaveAttribute('data-playback','manual');
 await expect(tour).toHaveAttribute('data-playback','playing',{timeout:3500});
});

test('explicit pause is durable and resumes only by the small upper playback control',async({page})=>{
 await page.goto('/',{waitUntil:'domcontentloaded'});
 const tour=page.getByRole('region',{name:'Guided portfolio tour'});
 await expect(tour).toBeVisible({timeout:6000});
 await tour.getByRole('button',{name:'Pause tour'}).click();
 await expect(tour).toHaveAttribute('data-playback','paused');
 await page.mouse.wheel(0,180);
 await page.waitForTimeout(3800);
 await expect(tour).toHaveAttribute('data-playback','paused');
 await tour.getByRole('button',{name:'Resume tour'}).click();
 await expect(tour).toHaveAttribute('data-playback','playing',{timeout:2000});
});

test('site tours can be permanently dismissed from the top, without a restart requirement',async({page})=>{
 await page.goto('/',{waitUntil:'domcontentloaded'});
 const tour=page.getByRole('region',{name:'Guided portfolio tour'});
 await expect(tour).toBeVisible({timeout:6000});
 await tour.getByRole('button',{name:'Exit guided tour'}).click();
 await expect(tour).toHaveCount(0);
 await page.mouse.wheel(0,240);
 await page.waitForTimeout(3750);
 await expect(tour).toHaveCount(0);
 await page.locator('#project-gartal').evaluate(el=>
  window.scrollTo({top:el.getBoundingClientRect().top+window.scrollY,behavior:'instant'}));
 await expect(page.locator('#project-gartal .sx-v14-scene--statement, #project-gartal .sx-v14-scene--system, #project-gartal .sx-v14-scene--experience')).toHaveCount(3);
});

test('a separate technical case page starts automatically and allows manual resume',async({page})=>{
 await page.goto('/work/digirezhim/',{waitUntil:'domcontentloaded'});
 const tour=page.getByRole('region',{name:'Guided portfolio tour'});
 await expect(tour).toBeVisible({timeout:6000});
 await expect(tour.getByLabel('Current cinematic playback pace')).toContainText('×');
 await expect(page.getByRole('button',{name:'RESTART TOUR'})).toHaveCount(0);
 await page.mouse.wheel(0,480);
 await expect(tour).toHaveAttribute('data-playback','manual');
 await expect(tour).toHaveAttribute('data-playback','playing',{timeout:6500});
});

test('transparent control line stays at the top and replaces the bottom box',async({page})=>{
 await page.goto('/',{waitUntil:'domcontentloaded'});
 const tour=page.getByRole('region',{name:'Guided portfolio tour'});
 await expect(tour).toBeVisible({timeout:6000});
 const layout=await tour.evaluate(el=>({
  top:parseFloat(getComputedStyle(el).top),
  bottom:getComputedStyle(el).bottom,
  background:getComputedStyle(el).backgroundColor,
  border:getComputedStyle(el).borderTopWidth,
  buttons:el.querySelectorAll('button').length
 }));
 expect(layout.top).toBeGreaterThan(0);
 expect(layout.bottom).toBe('auto');
 expect(layout.background).toBe('rgba(0, 0, 0, 0)');
 expect(layout.border).toBe('0px');
 expect(layout.buttons).toBe(2);
});

test('reduced-motion leaves the complete story readable and does not start automatic scrolling',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.getByRole('region',{name:'Guided portfolio tour'})).toHaveCount(0);
 await expect(page.locator('#project-gartal .sx-v14-scene--statement, #project-gartal .sx-v14-scene--system, #project-gartal .sx-v14-scene--experience')).toHaveCount(3);
 await expect(page.locator('#about .sx-v8-about-portrait img')).toHaveCount(1);
});

test('authentic original personal portrait remains unchanged',()=>{
 const file=readFileSync(join(process.cwd(),'public','assets','hires','portrait.webp'));
 expect(createHash('sha256').update(file).digest('hex'))
  .toBe('34c4d0509db4e2cb0f1e0c48716cb60286f92c8342c254e007074781dcadec70');
});
