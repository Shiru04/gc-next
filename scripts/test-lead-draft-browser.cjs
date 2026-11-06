const assert = require('node:assert/strict');
const { chromium } = require(process.env.QA_PLAYWRIGHT_PATH || '../../tracking-browser/node_modules/playwright');

const base = process.env.QA_BASE_URL || 'http://localhost:3102';
const siteHost = new URL(base).hostname;

async function run(browser, { locale, mobile, transition }) {
  const context = await browser.newContext({ viewport: mobile ? { width: 390, height: 844 } : { width: 1365, height: 900 }, isMobile: mobile, hasTouch: mobile });
  await context.addInitScript(() => {
    localStorage.setItem('cookieConsent', 'denied');
    window.turnstile = { render: (_element, options) => { setTimeout(() => options.callback('mock-token'), 0); return 'mock'; }, remove: () => {} };
  });
  let requests = 0;
  await context.route('**/*', route => new URL(route.request().url()).hostname === siteHost ? route.continue() : route.fulfill({ status: 200, contentType: 'application/javascript', body: '' }));
  await context.route('**/api/installation-leads/**', async route => {
    requests++;
    const id = route.request().headers()['idempotency-key'];
    const body = JSON.parse(route.request().postData());
    assert.equal(body.zipCode, '90703');
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true, provider: 'housecall_pro', providerLeadId: 'mock-lead', leadId: id }) });
  });
  const page = await context.newPage();
  const path = locale === 'es' ? '/es/installation-replacement/' : '/installation-replacement/';
  const zip = locale === 'es' ? 'Código postal *' : 'ZIP code *';
  const next = locale === 'es' ? 'Continuar a datos de contacto' : 'Continue to contact details';
  const first = locale === 'es' ? 'Nombre *' : 'First name *';
  const last = locale === 'es' ? 'Apellido *' : 'Last name *';
  const phone = locale === 'es' ? 'Teléfono *' : 'Phone *';
  try {
    await page.goto(base + path);
    let form = page.locator('form.gc-lead-form');
    await form.locator('button[type=submit]:enabled').waitFor();
    await form.getByLabel(zip).fill('90703');
    await form.getByRole('button', { name: next }).click();
    await form.getByLabel(first).waitFor();
    if (transition === 'reload') await page.reload();
    else { await page.goto(base + '/services/'); await page.goto(base + path); }
    form = page.locator('form.gc-lead-form');
    await form.getByLabel(first).waitFor();
    const stored = await page.evaluate(() => Object.entries(sessionStorage).find(([key]) => key.startsWith('gc-lead-v2-installation-'))?.[1]);
    assert(stored && stored.includes('90703'), 'ZIP must be restored in session draft');
    assert(!stored.includes('Synthetic') && !stored.includes('2025550100'), 'contact details must not be stored');
    await form.getByRole('button', { name: locale === 'es' ? 'Atrás' : 'Back' }).click();
    assert.equal(await form.getByLabel(zip).inputValue(), '90703', 'ZIP must survive step back');
    await form.getByLabel(zip).fill('123');
    await form.getByRole('button', { name: next }).click();
    assert.equal(await form.getByLabel(zip).getAttribute('aria-invalid'), 'true', 'invalid ZIP marked');
    assert(await form.getByLabel(zip).isVisible(), 'invalid ZIP remains visible');
    await form.getByLabel(zip).fill('90703');
    await form.getByRole('button', { name: next }).click();
    await form.getByLabel(first).fill('Synthetic');
    await form.getByLabel(last).fill('Audit');
    await form.getByLabel(phone).fill('2025550100');
    await form.locator('input[type=checkbox]').check();
    await form.locator('button[type=submit]').dblclick();
    try { await page.getByText(locale === 'es' ? 'Gracias. GC recibió su solicitud.' : 'Thank you. GC received your request.', { exact: true }).waitFor({ timeout: 10000 }); }
    catch (error) { console.error({ locale, mobile, transition, requests, formText: await form.innerText() }); throw error; }
    assert.equal(requests, 1, 'only mocked API request expected');
    assert.equal(new URL(page.url()).pathname, path, 'double click must not navigate away');
    console.log(`PASS ${locale} ${mobile ? 'mobile' : 'desktop'} ${transition}`);
  } finally { await context.close(); }
}

async function legacy(browser) {
  const context = await browser.newContext();
  const page = await context.newPage();
  try {
    await page.goto(base + '/installation-replacement/');
    await page.evaluate(() => sessionStorage.setItem('gc-lead-v2-installation-installation-replacement', JSON.stringify({ version: 2, savedAt: Date.now(), values: { projectType: 'not_sure', systemType: 'not_sure', timeline: 'researching' }, intent: 'replace', step: 1 })));
    await page.reload();
    const form = page.locator('form.gc-lead-form');
    await form.getByLabel('ZIP code *').waitFor();
    assert(await form.getByLabel('ZIP code *').isVisible(), 'old draft must return to visible ZIP step');
    await form.getByRole('button', { name: 'Continue to contact details' }).click();
    assert(await form.getByText('Enter a five-digit ZIP code.').isVisible(), 'ZIP error must be visible');
    assert.equal(await form.getByLabel('ZIP code *').getAttribute('aria-invalid'), 'true');
    console.log('PASS legacy draft recovery and visible validation');
  } finally { await context.close(); }
}

async function retry(browser, { mobile, failure }) {
  const context = await browser.newContext({ viewport: mobile ? { width: 390, height: 844 } : { width: 1365, height: 900 }, isMobile: mobile, hasTouch: mobile });
  await context.addInitScript(() => {
    localStorage.setItem('cookieConsent', 'accepted');
    window.turnstile = { render: (_element, options) => { setTimeout(() => options.callback('mock-token'), 0); return 'mock'; }, remove: () => {} };
  });
  await context.route('**/*', route => new URL(route.request().url()).hostname === siteHost ? route.continue() : route.fulfill({ status: 200, contentType: 'application/javascript', body: '' }));
  const ids = [];
  await context.route('**/api/installation-leads/**', route => {
    ids.push(route.request().headers()['idempotency-key']);
    if (ids.length === 1 && failure === 'network') return route.abort('failed');
    if (ids.length === 1) return route.fulfill({ status: 422, contentType: 'application/json', body: JSON.stringify({ ok: false, error_stage: 'validation' }) });
    return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true, provider: 'housecall_pro', providerLeadId: 'mock-lead', leadId: ids[0] }) });
  });
  const page = await context.newPage();
  try {
    await page.goto(base + '/installation-replacement/');
    const form = page.locator('form.gc-lead-form');
    await form.locator('button[type=submit]:enabled').waitFor();
    await form.getByLabel('ZIP code *').fill('90703');
    await form.getByRole('button', { name: 'Continue to contact details' }).click();
    await form.getByLabel('First name *').fill('Synthetic');
    await form.getByLabel('Last name *').fill('Audit');
    await form.getByLabel('Phone *').fill('2025550100');
    await form.locator('input[type=checkbox]').check();
    await form.locator('button[type=submit]').click();
    await form.getByRole('alert').filter({ hasText: failure === 'network' ? "couldn't confirm receipt" : "couldn't accept these details" }).waitFor();
    const before = await page.evaluate(() => (window.dataLayer || []).filter(item => item[1] === 'conversion').length);
    assert.equal(before, 0, 'failed request must not count as conversion');
    await form.getByRole('button', { name: 'Try again' }).dblclick();
    await page.getByText('Thank you. GC received your request.', { exact: true }).waitFor();
    assert.deepEqual(ids.length, 2, 'one retry expected');
    assert.equal(ids[0], ids[1], 'retry should reuse idempotency key');
    const events = await page.evaluate(() => (window.dataLayer || []).filter(item => ['conversion', 'installation_lead_submit'].includes(item[1])));
    assert.equal(events.filter(item => item[1] === 'conversion').length, 1, 'confirmed lead converts once');
    assert.equal(events.filter(item => item[1] === 'installation_lead_submit').length, 1, 'confirmed lead emits one GA event');
    for (const pii of ['Synthetic', 'Audit', '2025550100', '90703']) assert(!JSON.stringify(events).includes(pii), 'tracking must not contain contact data');
    console.log(`PASS ${mobile ? 'mobile' : 'desktop'} ${failure} retry, tracking, and double click`);
  } finally { await context.close(); }
}

(async () => {
  const browser = await chromium.launch({ channel: process.env.QA_CHANNEL || 'chrome', headless: true });
  try {
    for (const locale of ['en', 'es']) for (const mobile of [false, true]) for (const transition of ['reload', 'navigate']) await run(browser, { locale, mobile, transition });
    await legacy(browser);
    for (const mobile of [false, true]) for (const failure of ['network', 'validation']) await retry(browser, { mobile, failure });
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
