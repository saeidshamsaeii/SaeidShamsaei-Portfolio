import {test,expect} from '@playwright/test';

for(const width of [390,1440]){
 test(`biography capabilities and portrait render at ${width}px without horizontal overflow`,async({page})=>{
  await page.setViewportSize({width,height:900});
  await page.emulateMedia({reducedMotion:'reduce'});
  await page.goto('/');
  const about=page.locator('#about');
  const capabilities=about.locator('#about-capabilities');
  await capabilities.scrollIntoViewIfNeeded();
  await expect(about.getByText('THE PERSON BEHIND THE WORK')).toBeVisible();
  await expect(capabilities.getByRole('heading',{name:'Capabilities & technologies'})).toBeVisible();
  await expect(capabilities.getByText('Solution Architecture')).toBeVisible();
  await expect(capabilities.getByText('TypeORM')).toBeVisible();
  await expect(capabilities.getByText('TypeScript',{exact:true}).first()).toBeVisible();
  await expect(page.locator('#expertise')).toHaveCount(0);
  await expect(page.getByRole('heading',{name:'Programming languages'})).toHaveCount(0);
  const brandIcon=page.locator('.sx-v18-header .sx-brand-icon');
  await expect(brandIcon).toBeVisible();
  expect(await brandIcon.evaluate((image:HTMLImageElement)=>image.complete&&image.naturalWidth>0)).toBe(true);
  const bounds=await page.evaluate(()=>{
   const about=document.getElementById('about')!.getBoundingClientRect();
   const capabilities=document.getElementById('about-capabilities')!.getBoundingClientRect();
   return {inside:capabilities.top>=about.top&&capabilities.bottom<=about.bottom+1};
  });
  expect(bounds.inside).toBe(true);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth+1)).toBe(true);
  expect(await page.locator('#intro .sx-v19-portrait-art').evaluate(el=>getComputedStyle(el).backgroundImage.includes('portrait-hero-private.webp'))).toBe(true);
  expect(await page.locator('body').innerText()).not.toMatch(/[\u0600-\u06ff]/);
 });
}

test('guided scroll visits capabilities within the biography on mobile',async({page})=>{
 await page.setViewportSize({width:390,height:800});
 await page.goto('/#about');
 await expect.poll(()=>page.evaluate(()=>{
  const element=document.getElementById('about-capabilities');
  if(!element)return false;
  const rect=element.getBoundingClientRect();
  return rect.top<window.innerHeight*.85&&rect.bottom>0&&
   element.dataset.tourAwaiting!=='true';
 }),{timeout:30000}).toBe(true);
});
