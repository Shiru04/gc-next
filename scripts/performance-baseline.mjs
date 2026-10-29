import fs from 'node:fs';
import lighthouse from '../tmp/performance/node_modules/lighthouse/core/index.js';
import * as chromeLauncher from '../tmp/performance/node_modules/chrome-launcher/dist/index.js';
const root='docs/qa-redesign';fs.mkdirSync(root,{recursive:true});
const base=process.env.QA_BASE_URL || 'https://gc-heatingandcooling.com/';
const stage=process.env.QA_STAGE || 'before-production';
const chrome=await chromeLauncher.launch({chromeFlags:['--headless','--no-first-run']});
try{
 for(const device of ['mobile','desktop']){
  const settings=device==='desktop'?{formFactor:'desktop',screenEmulation:{mobile:false,width:1440,height:900,deviceScaleFactor:1,disabled:false},throttling:{rttMs:40,throughputKbps:10240,cpuSlowdownMultiplier:1,requestLatencyMs:0,downloadThroughputKbps:0,uploadThroughputKbps:0}}:{};
  const result=await lighthouse(base,{port:chrome.port,output:['html','json'],onlyCategories:['performance','accessibility','best-practices','seo'],...settings});
  fs.writeFileSync(`${root}/${stage}-${device}.html`,result.report[0]);fs.writeFileSync(`${root}/${stage}-${device}.json`,result.report[1]);
  console.log(JSON.stringify({stage,device,url:base,scores:Object.fromEntries(Object.entries(result.lhr.categories).map(([k,v])=>[k,v.score])),LCP:result.lhr.audits['largest-contentful-paint'].numericValue,CLS:result.lhr.audits['cumulative-layout-shift'].numericValue,TBT:result.lhr.audits['total-blocking-time'].numericValue}));
 }
}finally{try { await chrome.kill(); } catch(error) { console.warn('Chrome cleanup warning:',error.code); }}
