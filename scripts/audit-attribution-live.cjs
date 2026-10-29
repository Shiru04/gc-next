const {chromium,devices}=require('../tmp/tracking-browser/node_modules/playwright');
const fs=require('node:fs');const assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true});const results=[];
try{for(const device of ['desktop','mobile']){const context=await browser.newContext(device==='mobile'?devices['iPhone 13']:{});
await context.route(/google-analytics\.com|googletagmanager\.com|googleadservices\.com|doubleclick\.net/,r=>r.fulfill({status:200,contentType:'application/javascript',body:''}));
const page=await context.newPage();const params=new URLSearchParams({gclid:'TEST_ONLY_GC_20260910',gbraid:'TEST_GBRAID',wbraid:'TEST_WBRAID',utm_source:'qa',utm_medium:'validation',utm_campaign:'gc_installation_qa',utm_content:device,utm_term:'synthetic',test_event:'true'});
const response=await page.goto('https://gc-heatingandcooling.com/residential/residential-ac-installation/?'+params,{waitUntil:'networkidle'});
for(const [key,value] of params)assert.equal(new URL(page.url()).searchParams.get(key),value,key);
const state=await page.evaluate(()=>({scripts:Array.from(document.scripts).map(s=>s.src).filter(Boolean),googleTagCount:document.querySelectorAll('#google-tag').length,bootstrap:document.getElementById('google-tag-bootstrap')?.textContent,events:Array.from(window.dataLayer||[],e=>Array.from(e))}));
results.push({device,url:page.url(),status:response.status(),...state});await page.screenshot({path:'docs/attribution-production-'+device+'.png',fullPage:false});await context.close();}
fs.writeFileSync('docs/attribution-production-2026-09-10.json',JSON.stringify({note:'Production landing, isolated profiles, Google network blocked; no lead submitted.',results},null,2)+'\n');console.log(results.map(r=>({device:r.device,status:r.status,url:r.url,googleTagCount:r.googleTagCount,measurementIds:[...new Set(r.bootstrap?.match(/G-[A-Z0-9]+/g)||[])]})));}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1});
