import {test,expect} from '@playwright/test';
import {siteTranslations} from '../data/siteTranslations';
import {projectText} from '../data/projectTranslations';

const locales=['en','fa','ar','it','de','fr','zh','ru'] as const;

test('all eight languages translate the homepage and update semantic reading direction',async({page})=>{
 test.setTimeout(85000);
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/',{waitUntil:'domcontentloaded'});
 await expect(page.locator('.sx-v18-loader')).toHaveCount(0,{timeout:9000});
 for(const locale of locales){
  await page.locator('.sx-language-trigger').click();
  await page.locator('.sx-language-menu button[lang="'+locale+'"]').click();
  await expect(page.locator('html')).toHaveAttribute('lang',locale);
  await expect(page.locator('html')).toHaveAttribute('dir',
   locale==='fa'||locale==='ar'?'ltr':'rtl');
  await expect(page.locator('#work-index h2')).toContainText(siteTranslations[locale].selectedWork);
  await expect(page.locator('#about h2')).toContainText(siteTranslations[locale].aboutTitle);
  await expect(page.locator('#intro .sx-v18-cover-lead')).toContainText(
   siteTranslations[locale].coverLead.split('\n')[0]
  );
  await expect(page.locator('#work-index .sx-v18-index-entry').first())
   .toContainText(locale==='en'?'Service pages':projectText(locale,'gartal').keyword);
 }
});

test('language choice survives navigation to case studies, the engineering index and reload',async({page})=>{
 test.setTimeout(45000);
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/');
 await expect(page.locator('.sx-v18-loader')).toHaveCount(0,{timeout:9000});
 await page.locator('.sx-language-trigger').click();
 await page.locator('.sx-language-menu button[lang="de"]').click();
 await page.goto('/work/gartal/');
 await expect(page.locator('html')).toHaveAttribute('lang','de');
 await expect(page.locator('.sx-v10-case-cover h2')).toContainText(projectText('de','gartal').title);
 await expect(page.locator('#case-story .sx-v10-case-section')).toHaveCount(6);
 await page.goto('/engineering/');
 await expect(page.locator('html')).toHaveAttribute('lang','de');
 await expect(page.locator('.sx-ei-hero h1')).toContainText('prüfbar');
 await expect(page.locator('.sx-ei-decision')).toHaveCount(12);
 await page.reload();
 await expect(page.locator('html')).toHaveAttribute('lang','de');
 await page.locator('.sx-language-trigger').click();
 await page.locator('.sx-language-menu button[lang="fa"]').click();
 await expect(page.locator('html')).toHaveAttribute('dir','ltr');
 await expect(page.locator('.sx-ei-hero h1')).toContainText('قابل بررسی');
});

test('language menu remains keyboard-accessible and minimalist on narrow screens',async({page})=>{
 await page.setViewportSize({width:390,height:844});
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/');
 await expect(page.locator('.sx-v18-loader')).toHaveCount(0,{timeout:9000});
 const trigger=page.locator('.sx-language-trigger');
 await trigger.focus();
 await page.keyboard.press('Enter');
 await expect(trigger).toHaveAttribute('aria-expanded','true');
 await expect(page.locator('.sx-language-menu button')).toHaveCount(8);
 await expect(page.locator('.sx-language-menu .sx-language-flag')).toHaveCount(8);
 await expect(page.locator('.sx-language-trigger .sx-language-flag')).toHaveCount(1);
 await expect(page.locator('.sx-language-menu .sx-language-native')).toHaveCount(0);
 await expect(page.locator('.sx-language-menu .sx-language-code')).toHaveCount(0);
 for(const option of await page.locator('.sx-language-menu button').all()){
  expect(await option.getAttribute('aria-label')).toBeTruthy();
 }
 await page.keyboard.press('Escape');
 await expect(trigger).toHaveAttribute('aria-expanded','false');
 await trigger.click();
 await page.locator('.sx-language-menu button[lang="ar"]').click();
 await expect(page.locator('html')).toHaveAttribute('dir','rtl');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth-innerWidth)).toBeLessThanOrEqual(2);
});

test('a fresh deep link accepts language query parameters without relying on saved preferences',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/work/petiwoo/?lang=zh');
 await expect(page.locator('html')).toHaveAttribute('lang','zh');
 await expect(page.locator('.sx-v10-case-cover h2')).toContainText(projectText('zh','petiwoo').title);
});

test('translated blocks and long project names stay inside their reading frames',async({page})=>{
 test.setTimeout(85000);
 await page.emulateMedia({reducedMotion:'reduce'});
 const viewports=[
  {width:320,height:640},{width:390,height:844},
  {width:768,height:1024},{width:1440,height:900}
 ];
 for(const viewport of viewports){
  await page.setViewportSize(viewport);
  for(const locale of locales){
   await page.goto('/?lang='+locale,{waitUntil:'domcontentloaded'});
   await expect(page.locator('.sx-v18-loader')).toHaveCount(0,{timeout:9000});
   const bounds=await page.evaluate(()=>{
    const selectors=[
     '#intro .sx-v18-cover-lead',
     '#work-index .sx-v18-index-heading h2',
     '#work-index .sx-v18-index-entry strong',
     '#work-index .sx-v18-index-entry .sx-word-reveal',
     '#about .sx-word-reveal'
    ];
    const items=selectors.flatMap(selector=>Array.from(
     document.querySelectorAll<HTMLElement>(selector)));
    return items.map(node=>{
     const r=node.getBoundingClientRect();
     const parent=node.closest<HTMLElement>(
      '.sx-v18-index-entry,.sx-v18-index-heading,.sx-v19-cover-content,.sx-v18-about-inner'
     )||node.parentElement!;
     const p=parent.getBoundingClientRect();
     return {node:node.tagName,overflowsX:r.right>p.right+4||r.left<p.left-4,
      scrollX:node.scrollWidth>node.clientWidth+4};
    });
   });
   expect(bounds.filter(item=>item.overflowsX||item.scrollX),
    'overflow on '+locale+' at '+viewport.width+'px').toEqual([]);
  }
 }
});

test('flag menu exposes the requested visual direction for all eight languages',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/');
 await expect(page.locator('.sx-v18-loader')).toHaveCount(0,{timeout:9000});
 for(const locale of locales){
  await page.locator('.sx-language-trigger').click();
  await page.locator('.sx-language-menu button[lang="'+locale+'"]').click();
  await expect(page.locator('html')).toHaveAttribute('dir',
   locale==='fa'||locale==='ar'?'ltr':'rtl');
 }
});
