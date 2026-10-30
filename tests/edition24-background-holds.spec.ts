import {test,expect} from '@playwright/test';

test('only actual black/white block transitions are reading breaks',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 const colors=await page.evaluate(()=>{
  const background=(selector:string)=>
   getComputedStyle(document.querySelector(selector)!).backgroundColor;
  return {
   linux:background('#top'),
   about:background('#about'),
   directory:background('#work-index'),
   workIntro:background('#selected-projects'),
   projectFirst:background('#project-gartal .sx-v14-scene--statement'),
   projectSecond:background('#project-gartal .sx-v14-scene--statement'),
   contact:background('#contact')
  };
 });
 expect(colors).toEqual({
  linux:'rgb(0, 0, 0)',about:'rgb(255, 255, 255)',
  directory:'rgb(0, 0, 0)',workIntro:'rgb(255, 255, 255)',
  projectFirst:'rgb(0, 0, 0)',projectSecond:'rgb(0, 0, 0)',
  contact:'rgb(255, 255, 255)'
 });
});

test('headless reading pauses around 2 seconds after the text completes at a background boundary',async({page})=>{
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('.sx-v18-loader')).toHaveCount(0,{timeout:9000});
 // Use the short white title section so the test does not traverse the full
 // portfolio at 205 px/s. Manual scroll must remain authoritative.
 await page.evaluate(()=>{
  const section=document.querySelector('#selected-projects')!;
  const top=section.getBoundingClientRect().top+window.scrollY;
  window.scrollTo({top:Math.max(0,top-innerHeight*.35),behavior:'instant'});
 });
 await expect(page.locator('html')).toHaveAttribute('data-portfolio-tour','manual',{timeout:3000});
 await expect(page.locator('html')).toHaveAttribute('data-portfolio-tour','playing',{timeout:6500});
 const html=page.locator('html');
 await expect(html).toHaveAttribute('data-portfolio-tour-hold','background-change',{timeout:14000});
 await expect(page.locator('#selected-projects .sx-word-reveal')).toHaveAttribute('data-reveal-complete','true');
 const before=await page.evaluate(()=>window.scrollY);
 await page.waitForTimeout(1050);
 expect(Math.abs((await page.evaluate(()=>window.scrollY))-before)).toBeLessThanOrEqual(3);
 await expect(html).not.toHaveAttribute('data-portfolio-tour-hold','background-change',{timeout:2400});
 await expect(html).toHaveAttribute('data-portfolio-tour','playing');
 await expect(page.locator('.sx-guided-tour')).toHaveCount(0);
});

test('user input immediately cancels any automatic reading break',async({page})=>{
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('.sx-v18-loader')).toHaveCount(0,{timeout:9000});
 await page.evaluate(()=>{
  const section=document.querySelector('#selected-projects')!;
  window.scrollTo({top:section.getBoundingClientRect().top+window.scrollY-innerHeight*.35,behavior:'instant'});
 });
 const html=page.locator('html');
 await expect(html).toHaveAttribute('data-portfolio-tour-hold','background-change',{timeout:19000});
 await page.mouse.wheel(0,170);
 await expect(html).toHaveAttribute('data-portfolio-tour','manual');
 await expect(html).not.toHaveAttribute('data-portfolio-tour-hold','background-change');
 await expect(html).toHaveAttribute('data-portfolio-tour','playing',{timeout:6500});
});

test('reduced motion does not trigger scripted holds',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('.sx-v18-loader')).toHaveCount(0,{timeout:5000});
 await expect(page.locator('html')).not.toHaveAttribute('data-portfolio-tour','playing');
 await expect(page.locator('html')).not.toHaveAttribute('data-portfolio-tour-hold','background-change');
});
