/** Keep arbitrary URL parameters, form values and referrer queries out of Google. */
export function googleContext(href: string, cookies = "", referrer = "") {
  const url = new URL(href);
  // Explicit QA mode follows this tab through consent and the thank-you page.
  // It labels events; it does not fabricate a conversion or disable consent.
  const qaChoice = url.searchParams.get("test_event");
  let testEvent = qaChoice === "true" || url.hostname === "localhost" || url.hostname === "127.0.0.1";
  try {
    if (qaChoice === "true" || qaChoice === "false") window.sessionStorage.setItem("gc_tracking_test", qaChoice);
    testEvent ||= window.sessionStorage.getItem("gc_tracking_test") === "true";
  } catch {}
  const keys = ["gclid", "gbraid", "wbraid", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gad_campaignid"];
  const clean = (value: unknown, key = "") => typeof value === "string" && (key.startsWith("utm_") ? /^[a-zA-Z0-9_.~ -]{1,160}$/ : /^[a-zA-Z0-9_.~-]{1,160}$/).test(value) && (key === "gad_campaignid" || !/^\d{5}(?:\d{5,10})?$/.test(value)) ? value : undefined;
  let stored: Record<string, unknown> = {};
  for (const name of ["gc_attribution_latest", "gc_attribution_first"]) {
    try {
      const raw = cookies.split(";").map(item => item.trim()).find(item => item.startsWith(`${name}=`));
      const touch = raw ? JSON.parse(decodeURIComponent(raw.slice(name.length + 1))) : {};
      if (keys.some(key => clean(touch[key], key))) { stored = touch; break; }
    } catch {}
  }
  const incoming = Object.fromEntries(keys.flatMap(key => { const value = clean(url.searchParams.get(key), key); return value ? [[key, value]] : []; }));
  const weak = ["direct", "referral", "(none)"].includes(incoming.utm_medium?.toLowerCase()) || ["direct", "syndicatedsearch.goog"].includes(incoming.utm_source?.toLowerCase());
  const source = Object.keys(incoming).length && (!weak || incoming.gclid || incoming.gbraid || incoming.wbraid || !Object.keys(stored).length) ? incoming : stored;
  const safe = new URL(url.origin + url.pathname);
  for (const key of keys) { const value = clean(source[key], key); if (value) safe.searchParams.set(key, value); }
  let pageReferrer = "";
  let ignore = false;
  try {
    const previous = new URL(referrer);
    pageReferrer = previous.origin;
    ignore = previous.hostname === "tagassistant.google.com" || (previous.hostname === "syndicatedsearch.goog" || previous.hostname.endsWith(".syndicatedsearch.goog")) && Boolean(source.gclid || source.gbraid || source.wbraid || source.utm_source);
  } catch {}
  return { page_location: safe.href, page_referrer: pageReferrer, ...(ignore ? { ignore_referrer: true } : {}), ...(testEvent ? { test_event: true, debug_mode: true } : {}) };
}
