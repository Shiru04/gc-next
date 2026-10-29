const {chromium}=require('../tmp/tracking-browser/node_modules/playwright');
const fs=require('node:fs');const assert=require('node:assert/strict');
(async()=>{const browser=await chromium.launch({channel:'chrome',headless:true});const context=await browser.newContext({viewport:{width:1440,height:1000}});const page=await context.newPage();
const report={simulated:false,qa:true,run:'gc_attribution_20260910',googleRequests:[],result:'pending'};
page.on('request',r=>{if(/google-analytics\.com\/g\/collect|googleadservices\.com|doubleclick\.net\/.*conversion|google\.com\/.*conversion/.test(r.url()))report.googleRequests.push({url:r.url(),body:r.postData()});});
page.on('response',async r=>{if(r.url().includes('/api/installation-leads/')){report.hcpResponse={status:r.status(),body:await r.json().catch(()=>({}))};}});
try{
 await page.goto('https://gc-heatingandcooling.com/residential/residential-ac-installation/?utm_source=qa&utm_medium=validation&utm_campaign=gc_installation_qa&utm_content=acceptance_20260910&gclid=TEST_ONLY_GC_20260910&test_event=true#free-hvac-quote');
 await page.getByRole('button',{name:'Accept analytics and advertising',exact:true}).waitFor();
 assert.equal(await page.locator('#google-tag').count(),0,'New basic-consent build must be live before submitting');
 await page.getByRole('button',{name:'Accept analytics and advertising',exact:true}).click();
 if(process.env.QA_PAGE_ONLY === '1'){
  await page.waitForTimeout(7000);
  report.events=await page.evaluate(()=>Array.from(window.dataLayer||[],e=>Array.from(e)));
  report.result='page_only';return;
 }
 await page.getByRole('button',{name:'Continue',exact:true}).click();await page.getByLabel('High energy bills',{exact:true}).check();
 for(let i=0;i<3;i++)await page.getByRole('button',{name:'Continue',exact:true}).click();
 for(const [id,value]of Object.entries({firstName:'Synthetic',lastName:'AttributionQA',phone:'2025550100',email:'qa@example.invalid',zipCode:'90703',comments:'AUTOMATED ATTRIBUTION QA 2026-09-10. Synthetic test only; no service requested.'}))await page.locator('#if-'+id).fill(value);
 await page.locator('#if-consent').focus();await page.locator('#if-consent').press('Space');
 await page.locator('form button[type=submit]').click();
 await Promise.race([page.waitForURL('**/thank-you/installation-estimate/**',{timeout:45000}),page.getByRole('button',{name:'Try again',exact:true}).waitFor({timeout:45000})]);
 report.url=page.url();report.events=await page.evaluate(()=>Array.from(window.dataLayer||[],e=>Array.from(e)));report.attribution=await context.cookies().then(c=>c.filter(x=>x.name.startsWith('gc_attribution')).map(x=>({name:x.name,value:JSON.parse(decodeURIComponent(x.value))})));
 if(report.hcpResponse?.body?.ok){
  assert.equal(report.events.filter(e=>e[1]==='installation_lead_submit').length,1);
  assert.equal(report.events.filter(e=>e[1]==='conversion').length,1);
  assert.equal(report.events.some(e=>e[1]==='service_request_submit'),false);
  await page.reload();await page.getByRole('button',{name:'Cookie settings',exact:true}).waitFor();
  report.reloadEvents=await page.evaluate(()=>Array.from(window.dataLayer||[],e=>Array.from(e)));assert.equal(report.reloadEvents.some(e=>['conversion','installation_lead_submit'].includes(e[1])),false);report.result='hcp_confirmed';
 }else{report.result='not_confirmed';report.visibleError=await page.locator('form').innerText().catch(()=>'');}
 await page.screenshot({path:'docs/attribution-live-acceptance.png',fullPage:false});
 const googlePayload=JSON.stringify({requests:report.googleRequests,events:report.events});
 report.formPiiAbsent=!['qa@example.invalid','2025550100','AttributionQA','AUTOMATED ATTRIBUTION'].some(v=>googlePayload.includes(v)||googlePayload.includes(encodeURIComponent(v)));
 assert.equal(report.formPiiAbsent,true);
}catch(e){report.result='blocked';report.error=e.message;await page.screenshot({path:'docs/attribution-live-acceptance.png',fullPage:false}).catch(()=>{});}
finally{fs.writeFileSync(process.env.QA_PAGE_ONLY === '1' ? 'docs/attribution-live-page-2026-09-10.json' : 'docs/attribution-live-acceptance-2026-09-10.json',JSON.stringify(report,null,2)+'\n');console.log({result:report.result,hcpResponse:report.hcpResponse,formPiiAbsent:report.formPiiAbsent,error:report.error});await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
