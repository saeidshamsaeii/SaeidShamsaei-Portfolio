import {test,expect} from '@playwright/test';

test('the opening photo softly blurs and fades to black at its bottom without a section divider',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 const photo=page.locator('#intro .sx-v19-photo-background');
 const computed=await photo.evaluate(el=>{
  const blurred=getComputedStyle(el,'::before');
  const gradient=getComputedStyle(el,'::after');
  const image=getComputedStyle(el.querySelector('img')!);
  return {
   backdrop:blurred.backdropFilter||blurred.getPropertyValue('-webkit-backdrop-filter'),
   mask:blurred.maskImage||blurred.getPropertyValue('-webkit-mask-image'),
   grad:gradient.backgroundImage,
   imageMask:image.maskImage||image.getPropertyValue('-webkit-mask-image'),
   introBorder:getComputedStyle(document.querySelector('#intro')!).borderBottomWidth,
   nextBorder:getComputedStyle(document.querySelector('#top')!).borderTopWidth
  };
 });
 expect(computed.backdrop).toMatch(/blur\((?:12|15)px\)/);
 expect(computed.mask).toContain('linear-gradient');
 expect(computed.grad).toMatch(/linear-gradient/);
 expect(computed.imageMask).toContain('linear-gradient');
 expect(computed.introBorder).toBe('0px');
 expect(computed.nextBorder).toBe('0px');
 await expect(photo.locator('img')).toHaveAttribute('src','/assets/hires/portrait.webp');
});

test('the work directory explains verifiable product functions without abstract slogans',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 const index=page.locator('#work-index');
 await expect(index).toContainText('Service pages');
 await expect(index).toContainText('Windows Worker');
 await expect(index).toContainText('nutrition rules');
 await expect(index).toContainText('checkout');
 for(const id of ['gartal','factory','digirezhim','petiwoo']){
  await expect(page.locator('#project-'+id+' .sx-v14-editorial-copy')).toHaveCount(1);
 }
 await expect(page.locator('#project-gartal .sx-v14-editorial-copy')).toContainText('34 public pages');
 await expect(page.locator('#project-factory .sx-v14-editorial-copy')).toContainText('Worker');
 await expect(page.locator('#project-digirezhim .sx-v14-editorial-copy')).toContainText('clinical nutrition');
 await expect(page.locator('#project-petiwoo .sx-v14-editorial-copy')).toContainText('Zustand');
});

test('remaining gold accents in the engineering records are rendered white',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/engineering/',{waitUntil:'domcontentloaded'});
 const selectors=['.sx-ei-hero h1 em','.sx-ei-file-links a','.sx-ei-source-list a em','.sx-ei-nav>a:last-child'];
 for(const selector of selectors){
  const value=page.locator(selector).first();
  if(await value.count())await expect(value).toHaveCSS('color','rgb(255, 255, 255)');
 }
});

test('automatic movement is hidden but still resumes after a user scroll',async({page})=>{
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('.sx-v18-loader')).toHaveCount(0,{timeout:8500});
 await expect(page.locator('.sx-guided-tour,.sx-v11-top-speed,.sx-v11-top-progress')).toHaveCount(0);
 await expect(page.locator('html')).toHaveAttribute('data-portfolio-tour','playing');
 await page.mouse.wheel(0,260);
 await expect(page.locator('html')).toHaveAttribute('data-portfolio-tour','manual');
 await expect(page.locator('html')).toHaveAttribute('data-portfolio-tour','playing',{timeout:6500});
});
