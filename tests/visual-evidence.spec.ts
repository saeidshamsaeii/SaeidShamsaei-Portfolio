import {test,expect} from '@playwright/test';
import {mkdirSync} from 'node:fs';
import {join} from 'node:path';
import {execFileSync} from 'node:child_process';

// Capture proof for human visual review. Screenshot creation is NOT visual
// approval: owner compares these before authorizing any release.
const routes=[
 ['home','/'],['engineering','/engineering/'],
 ['gartal','/work/gartal/'],['factory','/work/factory/'],
 ['digirezhim','/work/digirezhim/'],['petiwoo','/work/petiwoo/']
] as const;
const viewports=[{width:390,height:844},{width:1440,height:900}] as const;
let sha='unverified';
try{sha=execFileSync('git',['rev-parse','--short=12','HEAD'],{encoding:'utf8'}).trim();}
catch{/* Screenshots remain labeled unverified when source provenance is absent. */}
const folder=join(process.cwd(),'reports','quality','screenshots',sha);

test('generate owner-review screenshots for every route on phone and desktop',async({page})=>{
 test.setTimeout(150000);
 mkdirSync(folder,{recursive:true});
 await page.emulateMedia({reducedMotion:'reduce'});
 for(const viewport of viewports){
  await page.setViewportSize(viewport);
  for(const [name,url] of routes){
   const response=await page.goto(url,{waitUntil:'domcontentloaded'});
   expect(response?.status()).toBe(200);
   await expect(page.locator('.sx-v18-loader')).toHaveCount(0,{timeout:9000});
   await page.evaluate(()=>document.fonts.ready);
   await page.screenshot({
    path:join(folder,name+'-'+viewport.width+'x'+viewport.height+'.png'),
    fullPage:true,animations:'disabled'
   });
  }
 }
});
