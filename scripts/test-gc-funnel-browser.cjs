const assert = require('node:assert/strict');
const { chromium } = require(process.env.QA_PLAYWRIGHT_PATH || '../tmp/tracking-browser/node_modules/playwright');

const base = process.env.QA_BASE_URL || 'http://localhost:3102';
const eventNames = ['lead_form_cta_click', 'installation_contact_step_view', 'installation_submit_attempt', 'installation_form_error', 'installation_lead_submit', 'conversion'];
const events = page => page.evaluate(names => Array.from(window.dataLayer || [], entry => Array.from(entry)).filter(entry => names.includes(entry[1])), eventNames);

async function scenario(browser, { name, consent = 'accepted', gpc = false, verification = 'pass', outcomes = ['confirmed'], expectedMessage }) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  await context.addInitScript(({ consent, gpc, verification }) => {
    localStorage.setItem('cookieConsent', consent);
    if (gpc) Object.defineProperty(navigator, 'globalPrivacyControl', { value: true });
    window.turnstile = { render: (element, options) => {
      setTimeout(() => verification === 'fail' ? options['error-callback']('verification_failed') : options.callback('mock-token'), 5);
      return 'mock';
    }, remove: () => {} };
  }, { consent, gpc, verification });
  await context.route('**/*', route => {
    const url = new URL(route.request().url());
    return url.hostname === 'localhost' ? route.continue() : route.fulfill({ status: 200, contentType: 'application/javascript', body: '' });
  });
  const requests = [];
  await context.route('**/api/installation-leads/', route => {
    const id = route.request().headers()['idempotency-key'];
    requests.push(id);
    const outcome = outcomes[Math.min(requests.length - 1, outcomes.length - 1)];
    const status = { confirmed: 200, outage: 503, invalid: 422, rejected: 502 }[outcome];
    const body = outcome === 'confirmed'
      ? { ok: true, provider: 'housecall_pro', providerLeadId: 'mock-lead', leadId: id }
      : { ok: false, error: { outage: 'delivery_unconfirmed', invalid: 'invalid_fields', rejected: 'hcp_rejected' }[outcome], error_stage: outcome === 'invalid' ? 'validation' : 'hcp' };
    return route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(body) });
  });
  const page = await context.newPage();
  try {
    await page.goto(base + '/residential/residential-ac-installation/');
    const form = page.locator('form.gc-lead-form');
    await form.locator('button[type=submit]').waitFor();
    await page.waitForFunction(() => !document.querySelector('form.gc-lead-form button[type=submit]').disabled);
    const sticky = page.locator('.gc-mobile-actions a.gc-button').first();
    assert.equal(await sticky.getAttribute('href'), '#free-hvac-quote', `${name}: sticky target`);
    await form.getByLabel('ZIP code *').fill('90703');
    await form.getByRole('button', { name: 'Continue to contact details' }).click();
    await form.getByLabel('First name *').fill('Synthetic');
    await sticky.click();
    assert.equal(new URL(page.url()).pathname, '/residential/residential-ac-installation/', `${name}: sticky changed page`);
    assert.equal(await form.getByLabel('First name *').inputValue(), 'Synthetic', `${name}: sticky lost contact data`);
    await form.getByLabel('Last name *').fill('Audit');
    await form.getByLabel('Phone *').fill('2025550100');
    await form.locator('input[type=checkbox]').check();
    await form.locator('button[type=submit]').click();
    if (outcomes.length > 1) {
      await form.getByRole('button', { name: 'Try again' }).waitFor();
      assert.equal((await events(page)).filter(event => event[1] === 'conversion').length, 0, `${name}: failed delivery converted`);
      await form.getByRole('button', { name: 'Try again' }).dblclick();
    }
    if (expectedMessage) await form.getByRole('alert').filter({ hasText: expectedMessage }).waitFor();
    else await page.getByText('Thank you. GC received your request.', { exact: true }).waitFor();
    const measured = await events(page);
    const count = event => measured.filter(item => item[1] === event).length;
    const allowed = consent === 'accepted' && !gpc;
    assert.equal(count('lead_form_cta_click'), allowed ? 1 : 0, `${name}: CTA event`);
    assert.equal(count('installation_contact_step_view'), allowed ? 1 : 0, `${name}: step 2 event`);
    assert.equal(count('installation_submit_attempt'), allowed ? Math.max(outcomes.length, 1) : 0, `${name}: attempt event`);
    assert.equal(count('conversion'), allowed && !expectedMessage ? 1 : 0, `${name}: Ads conversion`);
    assert.equal(count('installation_lead_submit'), allowed && !expectedMessage ? 1 : 0, `${name}: GA lead`);
    for (const pii of ['Synthetic', 'Audit', '2025550100', '90703']) assert.equal(JSON.stringify(measured).includes(pii), false, `${name}: event contains form data`);
    if (outcomes.length > 1) { assert.equal(requests.length, 2); assert.equal(requests[0], requests[1], `${name}: idempotency changed`); }
    else assert.equal(requests.length, verification === 'fail' ? 0 : 1, `${name}: delivery requests`);
    if (!expectedMessage) {
      await page.reload();
      await page.getByText('Thank you. GC received your request.', { exact: true }).waitFor();
      assert.equal((await events(page)).filter(event => event[1] === 'conversion').length, 0, `${name}: replay`);
    }
    return { name, passed: true };
  } finally { await context.close(); }
}

(async () => {
  const browser = await chromium.launch({ channel: process.env.QA_CHANNEL || 'chrome', headless: true });
  try {
    const cases = [
      { name: 'outage then confirmed', outcomes: ['outage', 'confirmed'] },
      { name: 'verification failed', verification: 'fail', outcomes: [], expectedMessage: 'Security verification could not finish' },
      { name: 'invalid server response', outcomes: ['invalid'], expectedMessage: "couldn't accept these details" },
      { name: 'HCP rejected', outcomes: ['rejected'], expectedMessage: "couldn't submit this request" },
      { name: 'denied', consent: 'denied' },
      { name: 'GPC', gpc: true },
    ];
    for (const item of cases) console.log(JSON.stringify(await scenario(browser, item)));
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    await context.addInitScript(() => localStorage.setItem('cookieConsent', 'accepted'));
    await context.route('**/*', route => new URL(route.request().url()).hostname === 'localhost' ? route.continue() : route.fulfill({ status: 200, body: '' }));
    const page = await context.newPage();
    await page.goto(base + '/privacy-policy/');
    await page.locator('.gc-mobile-actions a.gc-button').first().waitFor();
    assert.equal(await page.locator('.gc-mobile-actions a.gc-button').first().getAttribute('href'), '/installation-replacement/#free-hvac-quote');
    await context.close();
    console.log('PASS GC funnel browser; external services and HCP mocked.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
