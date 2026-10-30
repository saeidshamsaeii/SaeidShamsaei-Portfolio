// Local, owner-invoked browser check. No downloads or system changes.
// Playwright officially supports installed Google Chrome and Microsoft Edge.
'use strict';
const {chromium}=require('@playwright/test');
const preferred=process.env.PLAYWRIGHT_BROWSER_CHANNEL;
const channels=preferred==='chrome'||preferred==='msedge'
 ?[preferred,...['chrome','msedge'].filter(ch=>ch!==preferred)]
 :['chrome','msedge'];
(async()=>{
 for(const channel of channels){
  try{
   const browser=await chromium.launch({channel,headless:true,timeout:15000});
   const page=await browser.newPage();
   await page.goto('about:blank');
   await browser.close();
   process.stdout.write('PLAYWRIGHT_CHANNEL='+channel+'\n');
   return;
  }catch(error){
   process.stderr.write('Browser '+channel+' could not start: '+String(error).slice(0,1000)+'\n');
  }
 }
 process.stderr.write(
  'No usable local Chrome or Edge installation was found. '+
  'Install/repair a standard browser from its official website, then retry manual QA. '+
  'Do not download Playwright Chromium from a geographically blocked CDN.\n'
 );
 process.exitCode=1;
})().catch(error=>{process.stderr.write(String(error)+'\n');process.exitCode=1;});
