"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Turnstile } from "@/components/ui/Turnstile";
import { validateInstallation, type InstallationErrors } from "@/lib/installation-schema";

const EMPTY = { firstName: "", lastName: "", phone: "", email: "", zipCode: "", homeownerStatus: "homeowner" as const, projectType: "replace_existing_system" as const, comfortNeeds: [] as string[], systemType: "not_sure" as const, timeline: "within_30_days" as const, financingInterest: "maybe" as const, comments: "", consent: false, turnstileToken: "", website: "", attribution: {}, ctaSource: "installation_page" };
const STEPS = ["Project", "Comfort", "System", "Timing", "Contact"] as const;
const OPTIONS = {
  projectType: [["replace_existing_system", "Replace my current system"], ["upgrade_existing_system", "Upgrade for better comfort or efficiency"], ["new_system_installation", "Install a new system"], ["not_sure", "I’m not sure yet"]],
  comfortNeeds: [["uneven_temperatures", "Uneven room temperatures"], ["high_energy_bills", "High energy bills"], ["frequent_breakdowns", "Frequent breakdowns"], ["poor_air_quality", "Indoor air quality"], ["add_cooling_or_heating", "Add cooling or heating"], ["other", "Something else"], ["not_sure", "Not sure"]],
  systemType: [["central_ac", "Central AC"], ["heat_pump", "Heat pump"], ["mini_split", "Mini-split"], ["not_sure", "Help me choose"]],
  timeline: [["asap", "As soon as possible"], ["within_30_days", "Within 30 days"], ["within_3_months", "Within 3 months"], ["researching", "Researching options"]],
  financingInterest: [["yes", "Yes"], ["maybe", "Maybe"], ["no", "No"]],
  homeownerStatus: [["homeowner", "Homeowner"], ["property_manager", "Property manager"], ["renter", "Renter"]],
} as const;
function analytics(event: string, values: Record<string, unknown> = {}) { window.dataLayer = window.dataLayer ?? []; window.dataLayer.push({ event, lead_type: "installation", ...values }); }

export function InstallationForm() {
  const router = useRouter(); const [form, setForm] = useState(EMPTY); const [step, setStep] = useState(0); const [errors, setErrors] = useState<InstallationErrors>({}); const [status, setStatus] = useState<"idle"|"sending"|"error">("idle"); const started = useRef(false); const submitting = useRef(false);
  useEffect(() => {
    analytics("installation_page_view");
    const source = sessionStorage.getItem("gc_quote_cta_source") || new URLSearchParams(location.search).get("cta_source") || "installation_page";
    setForm(old => ({ ...old, ctaSource: source }));
    const onQuoteClick = (event: MouseEvent) => { const element = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-quote-cta]"); if (element?.dataset.quoteCta) { sessionStorage.setItem("gc_quote_cta_source", element.dataset.quoteCta); setForm(old => ({ ...old, ctaSource: element.dataset.quoteCta || old.ctaSource })); } };
    document.addEventListener("click", onQuoteClick); return () => document.removeEventListener("click", onQuoteClick);
  }, []);
  function update(key: keyof typeof EMPTY, value: string | boolean | Record<string, unknown> | string[]) { if (!started.current) { started.current = true; analytics("installation_form_start", { cta_source: form.ctaSource }); } setForm(old => ({ ...old, [key]: value })); setErrors(old => ({ ...old, [key]: undefined })); }
  function toggleComfort(value: string) { update("comfortNeeds", form.comfortNeeds.includes(value) ? form.comfortNeeds.filter(item => item !== value) : [...form.comfortNeeds, value]); }
  function goNext() { if (step === 1 && !form.comfortNeeds.length) { setErrors(old => ({ ...old, comfortNeeds: "Choose at least one comfort priority." })); return; } setStep(old => Math.min(old + 1, STEPS.length - 1)); analytics("installation_guide_step", { step_number: step + 2, step_name: STEPS[step + 1] }); document.getElementById("quote-guide-heading")?.focus(); }
  async function submit(event: FormEvent) {
    event.preventDefault(); if (submitting.current) return;
    let attribution = {}; try { attribution = JSON.parse(localStorage.getItem("gc_attribution_v1") ?? "{}"); } catch {}
    const payload = { ...form, attribution: { ...attribution, landingUrl: location.href, referrer: document.referrer, submittedAt: new Date().toISOString(), device: innerWidth < 768 ? "mobile" : innerWidth < 1024 ? "tablet" : "desktop" } };
    const parsed = validateInstallation(payload);
    if (!parsed.success) { setErrors(parsed.errors); analytics("installation_form_error", { error_fields: Object.keys(parsed.errors).join(",") }); setStep(Object.keys(parsed.errors).some(key => ["firstName", "lastName", "phone", "email", "zipCode", "consent", "turnstileToken"].includes(key)) ? 4 : step); return; }
    submitting.current = true; setStatus("sending");
    try {
      const response = await fetch("/api/installation-leads/", { method: "POST", headers: { "Content-Type": "application/json", "Idempotency-Key": crypto.randomUUID() }, body: JSON.stringify(parsed.data) });
      const result = await response.json() as { ok?: boolean; leadId?: string; provider?: string; providerLeadId?: string; errors?: InstallationErrors };
      if (!response.ok || !result.ok || !result.leadId || result.provider !== "housecall_pro") { if (result.errors) setErrors(result.errors); throw new Error(); }
      sessionStorage.setItem("gc_installation_conversion", JSON.stringify({ leadId: result.leadId, providerLeadId: result.providerLeadId, systemType: form.systemType, projectType: form.projectType, timeline: form.timeline, financingInterest: form.financingInterest, zipCode: form.zipCode, ctaSource: form.ctaSource }));
      router.push(`/thank-you/installation-estimate/?lead=${encodeURIComponent(result.leadId)}`);
    } catch { submitting.current = false; setStatus("error"); analytics("installation_form_error", { error_type: "housecall_pro_submission", backup_preserved: true }); }
  }
  const choice = "flex min-h-14 cursor-pointer items-center gap-3 rounded-xl border-2 border-black/10 p-4 font-semibold transition has-[:checked]:border-brand-red has-[:checked]:bg-red-50";
  const input = "mt-1 min-h-12 w-full rounded-xl border border-black/25 bg-white px-3 py-3 text-base focus:border-brand-red focus:ring-2 focus:ring-brand-red/20";
  const error = (key: keyof InstallationErrors) => errors[key] ? <p id={`if-${key}-error`} className="mt-2 text-sm font-medium text-red-700" role="alert">{errors[key]}</p> : null;
  const radios = (key: keyof typeof OPTIONS) => <div className="grid gap-3 sm:grid-cols-2">{OPTIONS[key].map(([value, label]) => <label key={value} className={choice}><input type="radio" name={key} value={value} checked={form[key] === value} onChange={() => update(key, value)} /><span>{label}</span></label>)}</div>;
  return <form onSubmit={submit} noValidate aria-busy={status === "sending"}>
    <input name="website" value={form.website} onChange={e => update("website", e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px]" />
    <div className="mb-6"><div className="flex justify-between text-xs font-bold text-black/55"><span>Step {step + 1} of {STEPS.length}</span><span>{STEPS[step]}</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-black/10"><div className="h-full bg-brand-red transition-all" style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} /></div></div>
    <div key={step} className="min-h-[320px]">
      {step === 0 ? <fieldset><legend id="quote-guide-heading" tabIndex={-1} className="text-xl font-extrabold">What kind of project are you considering?</legend><p className="mb-5 mt-1 text-sm text-black/65">A quick answer is fine. We’ll confirm the details with you.</p>{radios("projectType")}</fieldset> : null}
      {step === 1 ? <fieldset><legend id="quote-guide-heading" tabIndex={-1} className="text-xl font-extrabold">What would you like to improve?</legend><p className="mb-5 mt-1 text-sm text-black/65">Choose all that apply.</p><div className="grid gap-3 sm:grid-cols-2">{OPTIONS.comfortNeeds.map(([value, label]) => <label key={value} className={choice}><input type="checkbox" checked={form.comfortNeeds.includes(value)} onChange={() => toggleComfort(value)} /><span>{label}</span></label>)}</div>{error("comfortNeeds")}</fieldset> : null}
      {step === 2 ? <fieldset><legend id="quote-guide-heading" tabIndex={-1} className="text-xl font-extrabold">Which system interests you?</legend><p className="mb-5 mt-1 text-sm text-black/65">GC installs complete central AC, heat pump and mini-split systems.</p>{radios("systemType")}</fieldset> : null}
      {step === 3 ? <div><fieldset><legend id="quote-guide-heading" tabIndex={-1} className="text-xl font-extrabold">When are you hoping to start?</legend><div className="mb-6 mt-4">{radios("timeline")}</div></fieldset><fieldset><legend className="mb-3 font-bold">Interested in financing?</legend>{radios("financingInterest")}</fieldset></div> : null}
      {step === 4 ? <div className="space-y-4"><h3 id="quote-guide-heading" tabIndex={-1} className="text-xl font-extrabold">Where should we send your free quote follow-up?</h3><div className="grid gap-4 sm:grid-cols-2"><Field id="firstName" label="First name" value={form.firstName} onChange={value => update("firstName", value)} className={input} error={error("firstName")} autoComplete="given-name"/><Field id="lastName" label="Last name" value={form.lastName} onChange={value => update("lastName", value)} className={input} error={error("lastName")} autoComplete="family-name"/><Field id="phone" label="Phone" value={form.phone} onChange={value => update("phone", value)} className={input} error={error("phone")} type="tel" autoComplete="tel"/><Field id="email" label="Email" value={form.email} onChange={value => update("email", value)} className={input} error={error("email")} type="email" autoComplete="email"/></div><Field id="zipCode" label="ZIP code" value={form.zipCode} onChange={value => update("zipCode", value.replace(/\D/g, "").slice(0, 5))} className={input} error={error("zipCode")} inputMode="numeric" autoComplete="postal-code"/><fieldset><legend className="mb-2 font-bold">Your relationship to the property</legend>{radios("homeownerStatus")}</fieldset><div><label htmlFor="if-comments" className="font-semibold">Anything else we should know? <span className="font-normal text-black/55">(optional)</span></label><textarea id="if-comments" rows={3} value={form.comments} onChange={e => update("comments", e.target.value)} className={input}/></div><label className="flex items-start gap-3"><input type="checkbox" checked={form.consent} onChange={e => update("consent", e.target.checked)} className="mt-1 h-5 w-5"/><span className="text-sm">I agree that GC Heating &amp; Cooling may contact me about this request and accept the <a className="underline" href="/privacy-policy/">Privacy Policy</a>. *</span></label>{error("consent")}<Turnstile onToken={token => update("turnstileToken", token)} />{error("turnstileToken")}<div aria-live="polite">{status === "error" ? <p className="rounded-xl bg-red-50 p-3 text-sm font-medium text-red-700">Housecall Pro could not confirm receipt. Your request was saved safely—please try again or call GC. No conversion was recorded.</p> : null}</div></div> : null}
    </div>
    <div className="mt-6 flex gap-3">{step > 0 ? <button type="button" onClick={() => setStep(old => old - 1)} className="min-h-12 rounded-xl border border-black/20 px-5 py-3 font-bold">Back</button> : null}{step < STEPS.length - 1 ? <button type="button" onClick={goNext} className="min-h-12 flex-1 rounded-xl bg-brand-red px-5 py-3 font-extrabold text-white">Continue</button> : <button type="submit" disabled={status === "sending"} className="min-h-12 flex-1 rounded-xl bg-brand-red px-5 py-3 font-extrabold text-white disabled:opacity-60">{status === "sending" ? "Sending…" : "Get My Free HVAC Quote"}</button>}</div>
  </form>;
}

function Field({ id, label, value, onChange, className, error, type = "text", autoComplete, inputMode }: { id: string; label: string; value: string; onChange: (value: string) => void; className: string; error: React.ReactNode; type?: string; autoComplete?: string; inputMode?: "numeric" }) { return <div><label htmlFor={`if-${id}`} className="font-semibold">{label} *</label><input id={`if-${id}`} type={type} inputMode={inputMode} autoComplete={autoComplete} value={value} onChange={event => onChange(event.target.value)} className={className}/>{error}</div>; }
