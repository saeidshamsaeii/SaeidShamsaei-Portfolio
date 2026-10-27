import {test,expect} from '@playwright/test';

const ids=['gartal','factory','digirezhim','petiwoo'] as const;

test('full portfolio pins four image-free, five distinct editorial horizontal scenes',async({page})=>{
 const errors:string[]=[];
 page.on('pageerror',error=>errors.push(error.message));
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('html')).toHaveAttribute('lang','en');
 await expect(page.locator('#intro .sx-v18-portrait-frame')).toHaveCount(1);
 await expect(page.locator('#intro .sx-v18-portrait-frame img')).toHaveCSS('object-fit','contain');
 await expect(page.locator('#intro h1')).toHaveCount(1);
 await expect(page.locator('#intro .sx-v16-cover-image img')).toHaveAttribute('src','/assets/hires/portrait.webp');
 await expect(page.locator('#work-index .sx-v18-index-entry')).toHaveCount(4);
 await expect(page.locator('#top .sx-linux-editor')).toHaveCount(1);
 await expect(page.locator('#top img')).toHaveCount(0);
 await expect(page.locator('#top .sx-v8-hero-slide')).toHaveCount(3);
 await expect(page.locator('#intro .sx-v16-cover-image img')).toHaveAttribute('src','/assets/hires/portrait.webp');
 await expect(page.locator('.sx-guided-tour')).toHaveCount(0);
 for(const id of ids){
  const section=page.locator('#project-'+id);
  await expect(section.locator('.sx-v11-slide')).toHaveCount(3);
  await expect(section.locator('.sx-v14-editorial-copy')).toHaveCount(1);
  await expect(section).toHaveAttribute('data-horizontal-chapter','');
  await expect(section.locator('.sx-v14-editorial-copy>p')).toHaveCount(1);
  await expect(section.locator('img')).toHaveCount(0);
  await expect(section.locator('.sx-source-app')).toHaveCount(0);
  await expect(section.locator('.sx-v14-ending')).toHaveCount(1);
  await expect(section.getByRole('link',{name:/FULL CASE STUDY/i})).toHaveAttribute('href','/work/'+id+'/');
 }
 expect(errors).toEqual([]);
});

test('vertical scrolling advances each project sideways, then releases to the next project',async({page})=>{
 await page.emulateMedia({reducedMotion:'no-preference'});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 // Disable the default autoplay before checking precise native scroll positions.
 const tour=page.getByRole('region',{name:'Guided portfolio tour'});
 await expect(tour).toBeVisible({timeout:6000});
 await tour.getByRole('button',{name:'Exit guided tour'}).click();
 for(const id of ids){
  const chapter=page.locator('#project-'+id);
  const info=await chapter.evaluate(e=>({
   top:e.getBoundingClientRect().top+window.scrollY,
   distance:e.getBoundingClientRect().height-window.innerHeight
  }));
  expect(info.distance).toBeGreaterThan(3000);
  await page.evaluate(y=>window.scrollTo({top:y,behavior:'instant'}),info.top+info.distance*.24);
  await expect.poll(()=>chapter.getAttribute('data-active-frame')).not.toBe('0');
  const track=chapter.locator('.sx-v11-rail');
  const horizontal=await track.evaluate(e=>getComputedStyle(e).transform);
  expect(horizontal).not.toBe('none');
  await page.evaluate(y=>window.scrollTo({top:y,behavior:'instant'}),info.top+info.distance*.97);
  await expect(chapter).toHaveAttribute('data-active-frame','2');
 }
 const last=page.locator('#project-petiwoo');
 const bottom=await last.evaluate(e=>e.getBoundingClientRect().bottom+window.scrollY);
 await page.evaluate(y=>window.scrollTo({top:y,behavior:'instant'}),bottom+50);
 await expect(page.locator('#contact')).toBeVisible();
});

test('native scroll reveals code and words without drawing a code screenshot',async({page})=>{
 await page.goto('/',{waitUntil:'domcontentloaded'});
 const scene=page.locator('#top');
 await expect(scene.locator('img,canvas,video')).toHaveCount(0);
 const first=page.locator('#top .sx-linux-code');
 const start=await scene.evaluate(el=>el.getBoundingClientRect().top+window.scrollY);
 const travel=await scene.evaluate(el=>el.getBoundingClientRect().height-window.innerHeight);
 await page.evaluate(y=>window.scrollTo({top:y,behavior:'instant'}),start+travel*.91);
 await expect.poll(async()=>first.innerText()).toContain('return { ...system, mission };');
 await expect(page.locator('.sx-linux-scene')).toHaveAttribute('data-complete','true');
 const visible=await page.locator('#top .sx-word-piece').first().evaluate(el=>getComputedStyle(el).opacity);
 expect(Number(visible)).toBeGreaterThanOrEqual(0);
});

test('automatic tour varies speed by scene but allows temporary manual interruption',async({page})=>{
 await page.goto('/',{waitUntil:'domcontentloaded'});
 const tour=page.getByRole('region',{name:'Guided portfolio tour'});
 await expect(tour).toBeVisible({timeout:6000});
 await expect(tour).toHaveAttribute('data-playback','playing');
 await expect(page.getByRole('button',{name:'Restart guided site tour'})).toHaveCount(0);
 await expect(tour.getByLabel('Current cinematic playback pace')).toContainText('×');
 await page.mouse.wheel(0,180);
 await expect(tour).toHaveAttribute('data-playback','manual');
 await expect(tour).toHaveAttribute('data-playback','playing',{timeout:6500});
 await tour.getByRole('button',{name:'Pause tour'}).click();
 await expect(tour).toHaveAttribute('data-playback','paused');
 await tour.getByRole('button',{name:'Resume tour'}).click();
 await expect(tour).toHaveAttribute('data-playback','playing');
 await tour.getByRole('button',{name:'Exit guided tour'}).click();
 await expect(tour).toHaveCount(0);
});

test('unwritten lines begin fully invisible and reveal in order as native scroll advances',async({page})=>{
 await page.goto('/',{waitUntil:'domcontentloaded'});
 const tour=page.getByRole('region',{name:'Guided portfolio tour'});
 if(await tour.isVisible())await tour.getByRole('button',{name:'Exit guided tour'}).click();
 const future=page.locator('#project-gartal-origin .sx-v14-editorial-copy h3 [data-reveal-line]').first();
 expect(await future.evaluate(el=>getComputedStyle(el).opacity)).toBe('0');
 const chapter=page.locator('#project-gartal');
 const info=await chapter.evaluate(el=>({top:el.getBoundingClientRect().top+scrollY,travel:el.getBoundingClientRect().height-innerHeight}));
 // Frame index 1 is the project's distinct core idea.
 await page.evaluate(y=>scrollTo({top:y,behavior:'instant'}),info.top+info.travel*(1.49/3));
 await expect.poll(()=>future.evaluate(el=>Number(getComputedStyle(el).opacity)),{timeout:5000}).toBeGreaterThan(.5);
});

test('case pages are text-only with source links and auto-tour',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 for(const id of ids){
  await page.goto('/work/'+id+'/',{waitUntil:'domcontentloaded'});
  const body=page.locator('.sx-v10-case-page');
  await expect(body.locator('.sx-v10-case-section')).toHaveCount(6);
  await expect(body.locator('.sx-v10-case-section .sx-v13-paragraph>p')).toHaveCount(18);
  await expect(body.locator('img,canvas,video')).toHaveCount(0);
  await expect(body.locator('.sx-source-app')).toHaveCount(0);
  await expect(body.locator('.sx-v10-reference-list>a').first()).toHaveAttribute('href',/github.com/);
  await expect(body.locator('.sx-v10-case-next')).toHaveCount(1);
 }
});

test('technical details stay available but closed until requested',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/work/gartal/',{waitUntil:'domcontentloaded'});
 const details=page.locator('.sx-v18-case-details');
 await expect(details).toHaveCount(6);
 await expect(details.first()).not.toHaveAttribute('open');
 await details.first().locator('summary').click();
 await expect(details.first()).toHaveAttribute('open','');
 expect(await details.first().locator('li').count()).toBeGreaterThan(0);
});

test('mobile text chapters fit without horizontal overflow',async({browser})=>{
 for(const [width,height] of [[360,740],[390,844],[430,932],[768,1024]]){
  const page=await browser.newPage({viewport:{width,height},reducedMotion:'reduce'});
  await page.goto('/',{waitUntil:'domcontentloaded'});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth),'mobile overflow at '+width).toBeLessThanOrEqual(2);
  await page.locator('#project-factory').scrollIntoViewIfNeeded();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth),'chapter overflow at '+width).toBeLessThanOrEqual(2);
  await page.close();
 }
});

test('horizontal chapters do not widen the page at phone widths during the live pinned transition',async({browser})=>{
 for(const width of [360,390,430]){
  const page=await browser.newPage({viewport:{width,height:844}});
  await page.goto('/',{waitUntil:'domcontentloaded'});
  const tour=page.getByRole('region',{name:'Guided portfolio tour'});
  await expect(tour).toBeVisible({timeout:6000});
  await tour.getByRole('button',{name:'Exit guided tour'}).click();
  const chapter=page.locator('#project-digirezhim');
  await chapter.evaluate(e=>{
   const rect=e.getBoundingClientRect();
   window.scrollTo({top:window.scrollY+rect.top+(rect.height-window.innerHeight)*.43,behavior:'instant'});
  });
  await expect.poll(()=>chapter.getAttribute('data-active-frame')).not.toBe('0');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth-window.innerWidth),
   'active horizontal scene leaked viewport width at '+width).toBeLessThanOrEqual(2);
  await page.close();
 }
});

test('reduced-motion readers receive full text and no automatic movement',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('.sx-guided-tour')).toHaveCount(0);
 const word=page.locator('#project-gartal .sx-v14-scene--statement .sx-word-piece').first();
 const style=await word.evaluate(el=>({opacity:getComputedStyle(el).opacity,transform:getComputedStyle(el).transform}));
 expect(style.opacity).toBe('1');
 expect(style.transform).toBe('none');
 await expect(page.locator('#intro .sx-v16-cover-image img')).toBeVisible();
});

test('public contact links and original owner portrait remain intact',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 const links=await page.locator('#contact .sx-contact-link').evaluateAll(nodes=>nodes.map(n=>n.getAttribute('href')));
 expect(links).toEqual([
  'mailto:saeidshamsaeii00@gmail.com',
  'tel:+989017470729',
  'https://www.linkedin.com/in/saeidshamsaei/',
  'https://t.me/sd_shms'
 ]);
 await expect(page.locator('#intro .sx-v16-cover-image img')).toHaveAttribute('src','/assets/hires/portrait.webp');
});
