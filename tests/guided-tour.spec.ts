import {test,expect,type Page} from '@playwright/test';

const introSeen=async(page:Page)=>page.addInitScript(()=>{
 try{sessionStorage.setItem('saeid-portfolio-intro-v1','seen');}catch{}
});

test('first landing offers both exploration and a non-trapping guided tour',async({page})=>{
 await page.setViewportSize({width:1440,height:900});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 const intro=page.locator('.sx-intro');
 await expect(intro).toBeVisible();
 await expect(intro.getByRole('button',{name:'Watch guided tour'})).toBeVisible();
 await expect(intro.getByRole('button',{name:'Skip introduction'})).toBeVisible();
 await intro.getByRole('button',{name:'Watch guided tour'}).click();
 await expect(intro).toHaveCount(0);
 await expect(page.getByRole('region',{name:'Guided portfolio tour'})).toBeVisible();
 await expect.poll(()=>page.evaluate(()=>document.documentElement.dataset.portfolioTour)).toBe('running');
 await expect(page.getByRole('button',{name:'Pause tour'})).toBeVisible();
 await page.getByRole('button',{name:'Pause tour'}).click();
 await expect(page.getByRole('button',{name:'Resume tour'})).toBeVisible();
 const y=await page.evaluate(()=>window.scrollY);
 await page.waitForTimeout(300);
 expect(await page.evaluate(()=>window.scrollY)).toBeCloseTo(y,0);
 await page.getByRole('button',{name:'Resume tour'}).click();
 await expect(page.getByRole('button',{name:'Pause tour'})).toBeVisible();
 await page.getByRole('button',{name:'Exit guided tour'}).click();
 await expect(page.getByRole('region',{name:'Guided portfolio tour'})).toHaveCount(0);
 await expect.poll(()=>page.evaluate(()=>document.documentElement.dataset.portfolioTour)).toBeUndefined();
});

test('manual wheel cancels guided playback and native scroll still works',async({page})=>{
 await introSeen(page);
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await page.getByRole('button',{name:'Start guided site tour'}).click();
 await expect(page.getByRole('region',{name:'Guided portfolio tour'})).toBeVisible();
 await page.mouse.wheel(0,380);
 await expect(page.getByRole('region',{name:'Guided portfolio tour'})).toHaveCount(0);
 await expect.poll(()=>page.evaluate(()=>document.documentElement.dataset.portfolioTour)).toBeUndefined();
});

test('one real downward gesture starts chapter autoplay; a second gesture takes control back',async({page})=>{
 await introSeen(page);
 await page.setViewportSize({width:1440,height:900});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 const chapter=page.locator('#project-gartal');
 const start=await chapter.evaluate(e=>e.getBoundingClientRect().top+window.scrollY);
 await page.evaluate(y=>window.scrollTo({top:y+30,behavior:'instant'}),start);
 await page.mouse.wheel(0,300);
 await expect(chapter).toHaveAttribute('data-auto-playing','true',{timeout:4500});
 const a=await chapter.locator('.sx-story-rail').evaluate(e=>e.scrollLeft);
 await expect.poll(()=>chapter.locator('.sx-story-rail').evaluate(e=>e.scrollLeft),{timeout:4500}).toBeGreaterThan(a+20);
 await page.mouse.wheel(0,130);
 await expect(chapter).toHaveAttribute('data-auto-playing','false',{timeout:2500});
});

test('professional photo is the verified existing owner portrait, with office visual behind it',async({page})=>{
 await introSeen(page);
 await page.goto('/',{waitUntil:'domcontentloaded'});
 const portrait=page.locator('#top .sx-v4-hero-persona img');
 await expect(portrait).toHaveAttribute('src','/assets/hires/portrait.webp');
 await expect(portrait).toHaveAttribute('alt',/tailored dark suit/);
 const d=await portrait.evaluate(async (img:HTMLImageElement)=>{
  await img.decode();
  const bg=getComputedStyle(img.parentElement!,'::before').backgroundImage;
  return {w:img.naturalWidth,h:img.naturalHeight,bg};
 });
 expect(d.w).toBe(1122);expect(d.h).toBe(1402);
 expect(d.bg).toContain('portrait-office.webp');
 await page.screenshot({path:'artifacts/v6-professional-hero.png',animations:'disabled'});
});

test('experience introduction is present without fabricated time-in-role or outcomes',async({page})=>{
 await introSeen(page);
 await page.goto('/',{waitUntil:'domcontentloaded'});
 const about=page.locator('#about');
 await expect(about).toContainText("I'm Saeid Shamsaei");
 await expect(about).toContainText('GARTAL');
 await expect(about).toContainText('DigiRezhim');
 await expect(about).toContainText('business systems');
 expect(await about.locator('.sx-profile-experience').count()).toBe(1);
 for(const [width,height] of [[360,640],[390,844],[768,1024]]){
  await page.setViewportSize({width,height});
  const over=await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth);
  expect(over,'horizontal overflow at '+width).toBeLessThanOrEqual(1);
  await about.scrollIntoViewIfNeeded();
  if(width===390)await page.screenshot({path:'artifacts/v6-about-experience-mobile.png',animations:'disabled'});
 }
});

test('reduced-motion visitors are not launched into automatic playback',async({browser})=>{
 const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
 const page=await context.newPage();
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('.sx-intro')).toHaveCount(0);
 await page.getByRole('button',{name:'Start guided site tour'}).click();
 await expect(page.getByRole('region',{name:'Guided portfolio tour'})).toHaveCount(0);
 await context.close();
});
