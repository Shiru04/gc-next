const {chromium,devices}=require('../tmp/tracking-browser/node_modules/playwright');
const fs=require('node:fs');const assert=require('node:assert/strict');
const root=process.env.QA_OUTPUT_DIR || 'docs/qa-redesign';fs.mkdirSync(root,{recursive:true});
const base=process.env.QA_BASE_URL || 'http://localhost:3100';
const report={simulated:true,base,note:'Browser API and Turnstile responses are mocked; no real HCP or Google delivery is claimed.',flows:[],templates:[]};
(async()=>{const browser=await chromium.launch({channel:process.env.QA_CHANNEL || 'chrome',headless:true});
try{for(const locale of (process.env.QA_LOCALE?[process.env.QA_LOCALE]:['en','es']))for(const mobile of (process.env.QA_MOBILE?[process.env.QA_MOBILE==='1']:[false,true])){
 const context=await browser.newContext({...mobile?devices['iPhone 13']:{viewport:{width:1440,height:1000}},deviceScaleFactor:1,reducedMotion:'reduce'});
 await context.route(/google-analytics\.com|googletagmanager\.com|googleadservices\.com|doubleclick\.net/,r=>r.fulfill({status:200,contentType:'application/javascript',body:''}));
 await context.route('**/challenges.cloudflare.com/**',r=>r.fulfill({status:200,contentType:'application/javascript',body:'window.turnstile={render:(el,o)=>{setTimeout(()=>o.callback("synthetic-token"),50);return "mock"},remove:()=>{}};'}));
 const page=await context.newPage();const pageErrors=[];page.on('pageerror',error=>pageErrors.push(error.message));
 const prefix=locale==='es'?'/es':'';const es=locale==='es';
 for(const mode of ['home','installation','repair','maintenance','commercial']){
  let requests=[],fail=true;await page.route('**/api/installation-leads/',async route=>{const request=route.request();const id=request.headers()['idempotency-key'];requests.push({id,payload:request.postDataJSON()});await new Promise(resolve=>setTimeout(resolve,200));await route.fulfill({status:fail?503:200,contentType:'application/json',body:JSON.stringify(fail?{ok:false,error:'hcp_unavailable'}:{ok:true,provider:'housecall_pro',providerLeadId:'simulated-'+id,leadId:id})});});
  const path=mode==='home'?prefix+'/':prefix+'/'+(mode==='installation'?'installation-replacement':mode==='commercial'&&es?'comercial':mode)+'/';
  await page.goto(base+path+'?utm_source=qa&utm_medium=cpc&utm_campaign=gc_redesign_test&gclid=TEST_GC_REDESIGN&gbraid=TEST_GBRAID&wbraid=TEST_WBRAID');
  if(mode==='home'){
   assert.equal(await page.locator('#google-tag').count(),0);
   await page.getByRole('button',{name:es?'Aceptar cookies opcionales':'Accept optional cookies',exact:true}).click();
   await page.getByRole('button',{name:es?'Reemplazar mi sistema':'Replace my current system',exact:true}).click();
  }
  console.log('Testing',locale,mobile,mode);
  const form=page.locator('form.gc-lead-form');await form.locator('button[type=submit]').click();
  await page.screenshot({path:`${root}/latest-form-attempt.png`,fullPage:true});
  await form.locator('[aria-invalid=true]').first().waitFor();
  await page.screenshot({path:`${root}/${locale}-${mobile?'mobile':'desktop'}-${mode}-validation.png`,fullPage:false});
  await form.getByLabel(es?'Código postal *':'ZIP code *',{exact:true}).fill('90703');
  if(mode==='installation'){
   await form.locator('button[type=submit]').click();
   await page.reload();
   await form.getByLabel(es?'Nombre *':'First name *',{exact:true}).waitFor();
  }
  await form.getByLabel(es?'Nombre *':'First name *',{exact:true}).fill('Synthetic');
  if(mode==='installation')await form.getByLabel(es?'Apellido *':'Last name *',{exact:true}).fill('Validation');
  if(mode==='commercial')await form.getByLabel(es?'Empresa *':'Company *',{exact:true}).fill('Synthetic Company');
  await form.getByLabel(es?'Teléfono *':'Phone *',{exact:true}).fill('2025550100');
  await form.getByLabel(es?'Correo electrónico (opcional)':'Email (optional)',{exact:true}).fill('qa@example.invalid');
  await form.locator('input[type=checkbox]').check();
  await form.locator('button[type=submit]').click();
  await form.getByRole('button',{name:es?'Intentar de nuevo':'Try again',exact:true}).waitFor();
  assert.equal(requests.length,1);
  const events=()=>page.evaluate(()=>Array.from(window.dataLayer||[],entry=>Array.from(entry)));
  let log=await events();assert.equal(log.some(e=>e[1]==='installation_lead_submit'||e[1]==='service_request_submit'),false);
  await page.screenshot({path:`${root}/${locale}-${mobile?'mobile':'desktop'}-${mode}-failure.png`,fullPage:false});
  fail=false;await form.getByRole('button',{name:es?'Intentar de nuevo':'Try again',exact:true}).dblclick();
  await page.getByText(es?'Gracias. GC recibió su solicitud.':'Thank you. GC received your request.',{exact:true}).waitFor();
  assert.equal(requests.length,2);assert.equal(requests[0].id,requests[1].id);
  log=await events();const installation=mode==='home'||mode==='installation';
  assert.equal(log.filter(e=>e[1]===(installation?'installation_lead_submit':'service_request_submit')).length,1);
  assert.equal(log.some(e=>e[1]===(installation?'service_request_submit':'installation_lead_submit')),false);
  for(const pii of ['Synthetic','Validation','2025550100','qa@example.invalid','90703'])assert.equal(JSON.stringify(log).includes(pii),false,pii);
  assert.equal(requests[1].payload.attribution.firstTouch.gclid,'TEST_GC_REDESIGN');
  await page.screenshot({path:`${root}/${locale}-${mobile?'mobile':'desktop'}-${mode}-success.png`,fullPage:false});
  await page.reload();await page.getByText(es?'Gracias. GC recibió su solicitud.':'Thank you. GC received your request.',{exact:true}).waitFor();
  assert.equal(requests.length,2);log=await events();assert.equal(log.some(e=>e[1]==='installation_lead_submit'||e[1]==='service_request_submit'),false);
  report.flows.push({locale,mobile,mode,passed:true,submissionId:requests[0].id});
  await page.unroute('**/api/installation-leads/');
 }
 await page.evaluate(()=>sessionStorage.clear());
 for(const [name,path] of [['home','/'],['installation','/installation-replacement/'],['system','/installation-replacement/heat-pumps/'],['guide','/installation-replacement/cost-guide/'],['repair','/repair/'],['maintenance','/maintenance/'],['commercial',es?'/comercial/':'/commercial/'],['services',es?'/servicios/':'/services/'],['about',es?'/acerca/':'/about/'],['contact',es?'/contacto/':'/contact/'],['reviews',es?'/resenas/':'/reviews/'],['area',es?'/areas-de-servicio/cerritos-ca/':'/service-areas/cerritos-ca/'],['area-directory',es?'/areas-de-servicio/':'/service-areas/'],['attic','/attic-insulation/'],['financing','/financing-incentives/']]){
  await page.goto(base+prefix+path);const h1=await page.locator('h1').count();assert.equal(h1,1,name);
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);assert.equal(overflow,false,name);
  await page.screenshot({path:`${root}/${locale}-${mobile?'mobile':'desktop'}-${name}.png`,fullPage:true});
  report.templates.push({locale,mobile,name,h1,overflow});
 }
 assert.equal(pageErrors.length,0,pageErrors.join('\n'));await context.close();
}fs.writeFileSync(root+'/browser-results.json',JSON.stringify(report,null,2));console.log('PASS '+report.flows.length+' bilingual responsive flows and '+report.templates.length+' template screenshots.');
}finally{await browser.close();}})().catch(error=>{fs.writeFileSync(root+'/browser-results.json',JSON.stringify({...report,error:error.message},null,2));console.error(error);process.exitCode=1;});
