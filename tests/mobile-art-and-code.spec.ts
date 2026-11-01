import {test,expect} from '@playwright/test';

test('mobile editor keeps the complete code inside its visible viewport',async({browser})=>{
 for(const viewport of [{width:320,height:568},{width:390,height:844}]){
  const page=await browser.newPage({viewport,reducedMotion:'reduce'});
  await page.goto('/');
  await expect(page.locator('.sx-linux-scene')).toHaveAttribute('data-complete','true');
  await expect.poll(()=>page.evaluate(()=>{
   const code=document.querySelector<HTMLElement>('.sx-linux-code')!;
   const last=code.querySelector<HTMLElement>('.sx-linux-code-line:last-child')!;
   return last.getBoundingClientRect().bottom-code.getBoundingClientRect().bottom;
  })).toBeLessThanOrEqual(2);
  const metrics=await page.evaluate(()=>{
   const body=document.querySelector<HTMLElement>('.sx-linux-editor-body')!;
   const code=document.querySelector<HTMLElement>('.sx-linux-code')!;
   const last=code.querySelector<HTMLElement>('.sx-linux-code-line:last-child')!;
   return {bodyHeight:body.clientHeight,codeHeight:code.clientHeight,
    scrollHeight:code.scrollHeight,pointerEvents:getComputedStyle(code).pointerEvents,
    lastBottom:last.getBoundingClientRect().bottom,
    codeBottom:code.getBoundingClientRect().bottom};
  });
  expect(metrics.codeHeight,'code must fit its editor body').toBeLessThanOrEqual(metrics.bodyHeight+1);
  expect(metrics.pointerEvents,'overflowing code must remain scrollable by touch').toBe('auto');
  expect(metrics.lastBottom,'last typed line must be visible').toBeLessThanOrEqual(metrics.codeBottom+2);
  await page.close();
 }
});

test('mobile project photograph ends before project text begins',async({browser})=>{
 for(const viewport of [{width:320,height:568},{width:390,height:844}]){
  const page=await browser.newPage({viewport,reducedMotion:'reduce'});
  await page.goto('/');
  for(const id of ['gartal','factory','digirezhim','petiwoo']){
   const metrics=await page.evaluate(id=>{
    const slide=document.querySelector<HTMLElement>(`#project-${id} .sx-v30-case-slide`)!;
    const art=slide.querySelector<HTMLElement>('.sx-v35-project-art')!;
    const copy=slide.querySelector<HTMLElement>('.sx-v30-case-copy')!;
    return {artBottom:art.getBoundingClientRect().bottom,
      copyTop:copy.getBoundingClientRect().top,
      slideBottom:slide.getBoundingClientRect().bottom,
      copyBottom:copy.getBoundingClientRect().bottom};
   },id);
   expect(metrics.artBottom,`${id} photograph/text overlap`).toBeLessThanOrEqual(metrics.copyTop+1);
   expect(metrics.copyBottom,`${id} text clipped by slide`).toBeLessThanOrEqual(metrics.slideBottom+1);
  }
  await page.close();
 }
});
