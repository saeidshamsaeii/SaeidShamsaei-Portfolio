import {defineConfig,devices} from '@playwright/test';
// Manual QA picks an installed browser after probing Chrome then Edge.
// No Playwright-managed Chromium download is required.
const localChannel=process.env.PLAYWRIGHT_BROWSER_CHANNEL==='msedge'?'msedge':'chrome';
export default defineConfig({
testDir:'./tests',timeout:30000,expect:{timeout:10000},fullyParallel:false,retries:process.env.CI?1:0,workers:1,reporter:[['line'],['html',{open:'never',outputFolder:'playwright-report'}]],
use:{baseURL:'http://127.0.0.1:4185',trace:'retain-on-failure',screenshot:'only-on-failure'},
projects:[{name:'chromium',use:{...devices['Desktop Chrome'],channel:localChannel}}],
webServer:{command:'node scripts/serve-static.mjs 4185',url:'http://127.0.0.1:4185/',reuseExistingServer:!process.env.CI,timeout:30000}
});
