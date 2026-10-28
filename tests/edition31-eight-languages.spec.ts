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
   locale==='fa'||locale==='ar'?'rtl':'ltr');
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
 await expect(page.locator('html')).toHaveAttribute('dir','rtl');
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
