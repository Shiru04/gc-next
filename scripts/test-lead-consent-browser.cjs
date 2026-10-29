const assert = require('node:assert/strict');
const { chromium } = require(process.env.QA_PLAYWRIGHT_PATH || '../tmp/tracking-browser/node_modules/playwright');

const base = process.env.QA_BASE_URL || 'http://localhost:3100';
const conversions = async page => page.evaluate(() => Array.from(window.dataLayer || [], entry => Array.from(entry)).filter(entry => entry[1] === 'conversion' || entry[1] === 'installation_lead_submit'));

async function runScenario(browser, name, { choice, gpc = false, outcomes, mobile = false }) {
  const context = await browser.newContext(mobile ? { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } : {});
  await context.addInitScript(({ choice, gpc }) => {
    localStorage.setItem('cookieConsent', choice);
    if (gpc) Object.defineProperty(navigator, 'globalPrivacyControl', { value: true });
    window.__verificationCalls = 0;
    window.turnstile = { render: (el, options) => { window.__verificationCalls++; setTimeout(() => options.callback('synthetic-token'), 10); return 'mock'; }, remove: () => {} };
  }, { choice, gpc });
  await context.route(/google-analytics\.com|googletagmanager\.com|googleadservices\.com|doubleclick\.net/, route => route.fulfill({ status: 200, contentType: 'application/javascript', body: '' }));
  let hotjarRequests = 0;
  await context.route(/hotjar\.com|hotjar\.io/, route => { hotjarRequests++; return route.fulfill({ status: 200, contentType: 'application/javascript', body: '' }); });
  await context.route('**/challenges.cloudflare.com/**', route => route.fulfill({ status: 200, contentType: 'application/javascript', body: 'window.turnstile={render:(el,o)=>{window.__verificationCalls++;setTimeout(()=>o.callback("synthetic-token"),10);return "mock"},remove:()=>{}};' }));
  const requests = [];
  await context.route('**/api/installation-leads/', async route => {
    const id = route.request().headers()['idempotency-key'];
    requests.push(id);
    const outcome = outcomes[Math.min(requests.length - 1, outcomes.length - 1)];
    await new Promise(resolve => setTimeout(resolve, 120));
    await route.fulfill({ status: outcome === 'failure' ? 503 : outcome === 'conflict' ? 409 : 200, contentType: 'application/json', body: JSON.stringify(outcome === 'failure' ? { ok: false } : outcome === 'conflict' ? { ok: false, error: 'submission_changed' } : { ok: true, provider: 'housecall_pro', leadId: id, ...(outcome === 'confirmed' ? { providerLeadId: 'synthetic-lead' } : {}) }) });
  });
  const page = await context.newPage();
  const pageErrors = [];
  const failedHosts = [];
  page.on('pageerror', error => pageErrors.push(error.message));
  page.on('requestfailed', request => failedHosts.push(new URL(request.url()).hostname));
  try {
    await page.goto(base + '/installation-replacement/');
    const form = page.locator('form.gc-lead-form');
    const allowedHotjar = choice === 'accepted' && !gpc;
    if (allowedHotjar) await page.locator('#gc-hotjar-script').waitFor({ state: 'attached', timeout: 10000 });
    assert.equal(await page.evaluate(() => !!document.getElementById('gc-hotjar-script')), allowedHotjar, `${name}: Hotjar consent gate`);
    if (allowedHotjar) await page.waitForFunction(() => performance.getEntriesByType('resource').some(entry => entry.name.includes('hotjar-6415624.js')));
    assert.equal(hotjarRequests > 0, allowedHotjar, `${name}: Hotjar request gate`);
    assert.equal(await form.evaluate(element => element.hasAttribute('data-cs-mask') && [...element.querySelectorAll('input, textarea, select')].every(field => field.hasAttribute('data-cs-mask'))), true, `${name}: form fields unmasked`);
    if (mobile) assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), true, `${name}: horizontal overflow`);
    await form.getByLabel('ZIP code *').fill('90703');
    await form.getByRole('button', { name: 'Continue to contact details' }).click();
    await form.getByLabel('First name *').fill('Synthetic');
    await form.getByLabel('Last name *').fill('Validation');
    await form.getByLabel('Phone *').fill('2025550100');
    await form.getByLabel('Email (optional)').fill('qa@example.invalid');
    await form.locator('input[type=checkbox]').check();
    const draft = await page.evaluate(() => sessionStorage.getItem('gc-lead-v2-installation-installation-replacement'));
    for (const pii of ['Synthetic', 'Validation', '2025550100', 'qa@example.invalid', '90703']) assert.equal(draft?.includes(pii), false, `${name}: draft contains ${pii}`);
    await form.locator('button[type=submit]').click();
    if (outcomes[0] === 'failure' || outcomes[0] === 'missing_id' || outcomes[0] === 'conflict') {
      await form.getByRole('button', { name: outcomes[0] === 'conflict' ? 'Request paused' : 'Try again' }).waitFor();
      assert.equal((await conversions(page)).length, 0, `${name}: failed HCP response measured`);
      if (outcomes[0] === 'conflict') assert.equal(await form.getByRole('button', { name: 'Request paused' }).isDisabled(), true);
    }
    if (outcomes.length > 1) {
      await form.getByRole('button', { name: 'Try again' }).dblclick();
    }
    if (outcomes.at(-1) === 'confirmed') {
      await page.getByText('Thank you. GC received your request.', { exact: true }).waitFor({ timeout: 8000 }).catch(async () => {
        const alert = await page.locator('[role=alert]').allTextContents();
        const verification = await page.evaluate(() => ({ ready: Boolean(window.turnstile), calls: window.__verificationCalls, hasUuid: typeof crypto.randomUUID, challenge: Boolean(document.querySelector('.gc-verification [aria-label="Security verification"]')), draft: sessionStorage.getItem('gc-lead-v2-installation-installation-replacement')?.replace(/"submissionId":"[^"]+"/, '"submissionId":"[redacted]"') }));
        throw new Error(`${name}: success not shown; requests=${requests.length}, alerts=${JSON.stringify(alert)}, verification=${JSON.stringify(verification)}, failedHosts=${JSON.stringify(failedHosts)}, pageErrors=${JSON.stringify(pageErrors)}`);
      });
    }
    const expected = choice === 'accepted' && !gpc && outcomes.at(-1) === 'confirmed' ? 2 : 0;
    const measured = await conversions(page);
    assert.equal(measured.length, expected, `${name}: conversion count`);
    if (expected) {
      assert.equal(measured.filter(entry => entry[1] === 'installation_lead_submit').length, 1, `${name}: GA4 lead count`);
      const ads = measured.filter(entry => entry[1] === 'conversion');
      assert.equal(ads.length, 1, `${name}: Ads lead count`);
      assert.equal(ads[0][2].send_to, 'AW-800582055/Ix72CKqVyukcEKfT3_0C');
      for (const pii of ['Synthetic', 'Validation', '2025550100', 'qa@example.invalid', '90703']) assert.equal(JSON.stringify(measured).includes(pii), false, `${name}: event contains PII`);
    }
    if (outcomes.length > 1) { assert.equal(requests.length, 2, `${name}: double submission`); assert.equal(requests[0], requests[1], `${name}: idempotency changed`); }
    if (choice === 'denied' && outcomes.at(-1) === 'confirmed') {
      await page.evaluate(() => window.dispatchEvent(new Event('gc:open-privacy')));
      await page.getByRole('button', { name: 'Keep measurement' }).click();
      assert.equal((await conversions(page)).length, 0, `${name}: retroactive conversion after opt-in`);
      assert.equal(await page.evaluate(() => !!document.getElementById('gc-hotjar-script')), true, `${name}: Hotjar did not start after opt-in`);
    }
    if (outcomes.at(-1) === 'confirmed') {
      await page.reload();
      await page.getByText('Thank you. GC received your request.', { exact: true }).waitFor();
      assert.equal((await conversions(page)).length, 0, `${name}: conversion replayed on reload`);
    }
    assert.deepEqual(pageErrors, [], `${name}: browser errors`);
  } finally { await context.close(); }
}

async function testStaleLegacy(browser) {
  const context = await browser.newContext();
  await context.addInitScript(() => { if (localStorage.getItem('cookieConsent') === null) localStorage.setItem('cookieConsent', 'accepted'); });
  await context.route(/google-analytics\.com|googletagmanager\.com|googleadservices\.com|doubleclick\.net/, route => route.fulfill({ status: 200, contentType: 'application/javascript', body: '' }));
  const page = await context.newPage();
  try {
    await page.goto(base + '/');
    const id = '3d146839-f9ea-483c-9a16-c0b16accd799';
    await page.evaluate(id => sessionStorage.setItem('gc_installation_conversion', JSON.stringify({ leadId: id, providerLeadId: 'synthetic-lead' })), id);
    await page.goto(base + '/thank-you/installation-estimate/?lead=' + id);
    assert.equal((await conversions(page)).length, 0, 'stale legacy confirmation measured');
    assert.equal(await page.evaluate(() => sessionStorage.getItem('gc_installation_conversion')), null, 'stale legacy confirmation retained');
  } finally { await context.close(); }
}

async function testHotjarRevocation(browser) {
  const context = await browser.newContext();
  await context.addInitScript(() => { if (localStorage.getItem('cookieConsent') === null) localStorage.setItem('cookieConsent', 'accepted'); });
  await context.route(/hotjar\.com|hotjar\.io|googletagmanager\.com|google-analytics\.com/, route => route.fulfill({ status: 200, contentType: 'application/javascript', body: '' }));
  const page = await context.newPage();
  try {
    await page.goto(base + '/installation-replacement/');
    assert.equal(await page.evaluate(() => !!document.getElementById('gc-hotjar-script')), true, 'Hotjar absent before revocation');
    await page.evaluate(() => window.dispatchEvent(new Event('gc:open-privacy')));
    await page.getByRole('button', { name: 'Opt out' }).click();
    await page.waitForLoadState();
    await page.waitForFunction(() => localStorage.getItem('cookieConsent') === 'denied' && !document.getElementById('gc-hotjar-script'));
    assert.equal(await page.evaluate(() => !!document.getElementById('gc-hotjar-script')), false, 'Hotjar remained after revocation');
  } finally { await context.close(); }
}

(async () => {
  const browser = await chromium.launch({ channel: process.env.QA_CHANNEL || 'chrome', headless: true });
  try {
    await runScenario(browser, 'accepted retry mobile', { choice: 'accepted', outcomes: ['failure', 'confirmed'], mobile: true });
    await runScenario(browser, 'missing provider ID', { choice: 'accepted', outcomes: ['missing_id'] });
    await runScenario(browser, 'payload conflict', { choice: 'accepted', outcomes: ['conflict'] });
    await runScenario(browser, 'denied then accepted', { choice: 'denied', outcomes: ['confirmed'] });
    await runScenario(browser, 'GPC', { choice: 'accepted', gpc: true, outcomes: ['confirmed'] });
    await testStaleLegacy(browser);
    await testHotjarRevocation(browser);
    console.log('PASS browser consent/HCP scenarios; HCP, Turnstile and Google requests mocked.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
