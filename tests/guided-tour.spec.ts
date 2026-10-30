import {test,expect} from '@playwright/test';
import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {join} from 'node:path';

const waitForIntro=async(page:import('@playwright/test').Page)=>{
 await expect(page.locator('.sx-v18-loader')).toHaveCount(0,{timeout:9000});
};

test('Auto Story interface is absent; the original cinematic scroll still starts itself',async({page})=>{
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await waitForIntro(page);
 await expect(page.locator('.sx-guided-tour')).toHaveCount(0);
 await expect(page.getByText('AUTO STORY')).toHaveCount(0);
 await expect(page.locator('.sx-v11-top-speed,.sx-v11-top-progress')).toHaveCount(0);
 await expect(page.locator('html')).toHaveAttribute('data-portfolio-tour','playing',{timeout:4000});
 const begin=await page.evaluate(()=>scrollY);
 await expect.poll(()=>page.evaluate(()=>scrollY),{timeout:11500}).toBeGreaterThan(begin+12);
});

test('manual wheel directions interrupt the hidden director and idle resumes at this position',async({page})=>{
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await waitForIntro(page);
 await expect(page.locator('html')).toHaveAttribute('data-portfolio-tour','playing');
 await page.mouse.wheel(0,490);
 await expect(page.locator('html')).toHaveAttribute('data-portfolio-tour','manual');
 await page.mouse.wheel(0,-180);
 const manualPosition=await page.evaluate(()=>scrollY);
 await expect(page.locator('html')).toHaveAttribute('data-portfolio-tour','playing',{timeout:6500});
 await expect.poll(()=>page.evaluate(()=>scrollY),{timeout:5000})
  .toBeGreaterThan(manualPosition+10);
});

test('keyboard interaction resets the idle interval without a visible control toolbar',async({page})=>{
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await waitForIntro(page);
 await page.keyboard.press('ArrowDown');
 await expect(page.locator('html')).toHaveAttribute('data-portfolio-tour','manual');
 await page.waitForTimeout(1900);
 await page.keyboard.press('ArrowUp');
 await page.waitForTimeout(1850);
 await expect(page.locator('html')).toHaveAttribute('data-portfolio-tour','manual');
 await expect(page.locator('html')).toHaveAttribute('data-portfolio-tour','playing',{timeout:3500});
});

test('Escape deliberately pauses an otherwise invisible autoplay without blocking native scrolling',async({page})=>{
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await waitForIntro(page);
 await page.keyboard.press('Escape');
 await expect(page.locator('html')).toHaveAttribute('data-portfolio-tour','paused');
 const y=await page.evaluate(()=>scrollY);
 await page.mouse.wheel(0,280);
 await expect.poll(()=>page.evaluate(()=>scrollY),{timeout:3000}).toBeGreaterThan(y);
 await page.waitForTimeout(3700);
 await expect(page.locator('html')).toHaveAttribute('data-portfolio-tour','paused');
});

test('case routes retain headless auto-reading and manual resume',async({page})=>{
 await page.goto('/work/digirezhim/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('html')).toHaveAttribute('data-portfolio-tour','playing',{timeout:6000});
 await expect(page.locator('.sx-guided-tour')).toHaveCount(0);
 await page.mouse.wheel(0,480);
 await expect(page.locator('html')).toHaveAttribute('data-portfolio-tour','manual');
 await expect(page.locator('html')).toHaveAttribute('data-portfolio-tour','playing',{timeout:6500});
});

test('reduced-motion reveals all copy and disables scripted auto-scroll',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('.sx-v18-loader')).toHaveCount(0,{timeout:5000});
 await expect(page.locator('html')).not.toHaveAttribute('data-portfolio-tour','playing');
 await expect(page.locator('#project-gartal .sx-v14-editorial-copy')).toHaveCount(3);
 const word=page.locator('#project-gartal .sx-v14-editorial-copy [data-reveal-word]').first();
 await expect(word).toHaveCSS('opacity','1');
});

test('original owner image hash is unchanged',()=>{
 const file=readFileSync(join(process.cwd(),'public','assets','hires','portrait.webp'));
 expect(createHash('sha256').update(file).digest('hex'))
  .toBe('34c4d0509db4e2cb0f1e0c48716cb60286f92c8342c254e007074781dcadec70');
});
