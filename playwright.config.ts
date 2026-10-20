import {defineConfig,devices} from '@playwright/test';
export default defineConfig({
testDir:'./tests',timeout:30000,expect:{timeout:10000},fullyParallel:false,retries:process.env.CI?1:0,workers:1,reporter:[['line'],['html',{open:'never',outputFolder:'playwright-report'}]],
use:{baseURL:'http://127.0.0.1:4185',trace:'retain-on-failure',screenshot:'only-on-failure'},
projects:[{name:'chromium',use:{...devices['Desktop Chrome']}}],
webServer:{command:'python3 -m http.server 4185 --bind 127.0.0.1 --directory out',url:'http://127.0.0.1:4185/',reuseExistingServer:!process.env.CI,timeout:30000}
});
