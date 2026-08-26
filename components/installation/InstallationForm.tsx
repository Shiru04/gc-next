"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Turnstile } from "@/components/ui/Turnstile";
import { validateInstallation, type InstallationErrors } from "@/lib/installation-schema";

const EMPTY = { firstName: "", lastName: "", phone: "", email: "", zipCode: "", homeownerStatus: "homeowner" as const, projectType: "replace_existing_system" as const, systemType: "central_ac" as const, timeline: "asap" as const, financingInterest: "maybe" as const, comments: "", consent: false, turnstileToken: "", website: "", attribution: {} };
const LABELS = {
  homeownerStatus: [["homeowner", "Homeowner"], ["property_manager", "Property manager"], ["renter", "Renter"]],
  projectType: [["replace_existing_system", "Replace existing system"], ["new_system_installation", "New system installation"], ["not_sure", "Not sure"]],
  systemType: [["central_ac", "Central AC"], ["heat_pump", "Heat pump"], ["mini_split", "Mini-split"], ["not_sure", "Not sure"]],
  timeline: [["asap", "As soon as possible"], ["within_30_days", "Within 30 days"], ["within_3_months", "Within 3 months"], ["researching", "Researching options"]],
  financingInterest: [["yes", "Yes"], ["no", "No"], ["maybe", "Maybe"]],
} as const;
function analytics(event: string, values: Record<string, unknown> = {}) { window.dataLayer = window.dataLayer ?? []; window.dataLayer.push({ event, lead_type: "installation", ...values }); }
export function InstallationForm() {
  const router = useRouter(); const [form, setForm] = useState(EMPTY); const [errors, setErrors] = useState<InstallationErrors>({}); const [status, setStatus] = useState<"idle"|"sending"|"error">("idle"); const started = useRef(false); const submitting = useRef(false);
  useEffect(() => { analytics("installation_page_view"); }, []);
  function update(key: keyof typeof EMPTY, value: string | boolean | Record<string, unknown>) { if (!started.current) { started.current = true; analytics("installation_form_start"); } setForm(old => ({ ...old, [key]: value })); setErrors(old => ({ ...old, [key]: undefined })); }
  async function submit(event: FormEvent) {
    event.preventDefault(); if (submitting.current) return;
    let attribution = {};
    try { attribution = JSON.parse(localStorage.getItem("gc_attribution_v1") ?? "{}"); } catch {}
    const payload = { ...form, attribution: { ...attribution, landingUrl: location.href, referrer: document.referrer, submittedAt: new Date().toISOString(), device: innerWidth < 768 ? "mobile" : innerWidth < 1024 ? "tablet" : "desktop" } };
    const parsed = validateInstallation(payload);
    if (!parsed.success) { setErrors(parsed.errors); analytics("installation_form_error", { error_fields: Object.keys(parsed.errors).join(",") }); document.getElementById(`if-${Object.keys(parsed.errors)[0]}`)?.focus(); return; }
    submitting.current = true; setStatus("sending");
    try {
      const response = await fetch("/api/installation-leads/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(parsed.data) });
      const result = await response.json() as { ok?: boolean; leadId?: string; errors?: InstallationErrors };
      if (!response.ok || !result.ok || !result.leadId) { if (result.errors) setErrors(result.errors); throw new Error(); }
      sessionStorage.setItem("gc_installation_conversion", JSON.stringify({ leadId: result.leadId, systemType: form.systemType, projectType: form.projectType, timeline: form.timeline, financingInterest: form.financingInterest, zipCode: form.zipCode }));
      router.push(`/thank-you/installation-estimate/?lead=${encodeURIComponent(result.leadId)}`);
    } catch { submitting.current = false; setStatus("error"); analytics("installation_form_error", { error_type: "submission" }); }
  }
  const cls = "mt-1 min-h-12 w-full rounded-xl border border-black/25 bg-white px-3 py-3 text-base focus:border-brand-red focus:ring-2 focus:ring-brand-red/20";
  const error = (key: keyof InstallationErrors) => errors[key] ? <p id={`if-${key}-error`} className="mt-1 text-sm font-medium text-red-700" role="alert">{errors[key]}</p> : null;
  const select = (key: keyof typeof LABELS, label: string) => <div><label htmlFor={`if-${key}`} className="font-semibold">{label} *</label><select id={`if-${key}`} value={String(form[key])} onChange={e => update(key, e.target.value)} className={cls}>{LABELS[key].map(([value, text]) => <option key={value} value={value}>{text}</option>)}</select></div>;
  return <form onSubmit={submit} noValidate className="space-y-4" aria-busy={status === "sending"}>
    <input name="website" value={form.website} onChange={e => update("website", e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px]" />
    <div className="grid gap-4 sm:grid-cols-2"><div><label htmlFor="if-firstName" className="font-semibold">First name *</label><input id="if-firstName" autoComplete="given-name" value={form.firstName} onChange={e => update("firstName", e.target.value)} className={cls} aria-invalid={!!errors.firstName}/>{error("firstName")}</div><div><label htmlFor="if-lastName" className="font-semibold">Last name *</label><input id="if-lastName" autoComplete="family-name" value={form.lastName} onChange={e => update("lastName", e.target.value)} className={cls} aria-invalid={!!errors.lastName}/>{error("lastName")}</div></div>
    <div className="grid gap-4 sm:grid-cols-2"><div><label htmlFor="if-phone" className="font-semibold">Phone *</label><input id="if-phone" type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={e => update("phone", e.target.value)} className={cls} aria-invalid={!!errors.phone}/>{error("phone")}</div><div><label htmlFor="if-email" className="font-semibold">Email *</label><input id="if-email" type="email" inputMode="email" autoComplete="email" value={form.email} onChange={e => update("email", e.target.value)} className={cls} aria-invalid={!!errors.email}/>{error("email")}</div></div>
    <div><label htmlFor="if-zipCode" className="font-semibold">ZIP code *</label><input id="if-zipCode" inputMode="numeric" pattern="[0-9]{5}" maxLength={5} autoComplete="postal-code" value={form.zipCode} onChange={e => update("zipCode", e.target.value.replace(/\D/g, "").slice(0,5))} className={cls} aria-invalid={!!errors.zipCode}/>{error("zipCode")}</div>
    <div className="grid gap-4 sm:grid-cols-2">{select("homeownerStatus", "Homeowner status")}{select("projectType", "Project type")}{select("systemType", "System interest")}{select("timeline", "Timeline")}{select("financingInterest", "Interested in financing?")}</div>
    <div><label htmlFor="if-comments" className="font-semibold">Comments <span className="font-normal text-black/55">(optional)</span></label><textarea id="if-comments" rows={3} value={form.comments} onChange={e => update("comments", e.target.value)} className={cls}/></div>
    <label className="flex items-start gap-3"><input id="if-consent" type="checkbox" checked={form.consent} onChange={e => update("consent", e.target.checked)} className="mt-1 h-5 w-5"/><span className="text-sm">I agree that GC Heating & Cooling may contact me about this request and accept the <a className="underline" href="/privacy-policy/">Privacy Policy</a>. *</span></label>{error("consent")}
    <Turnstile onToken={token => update("turnstileToken", token)} />{error("turnstileToken")}
    <div aria-live="polite">{status === "error" ? <p className="text-sm font-medium text-red-700">We couldn’t send your request. Your entries are still here—please try again or call us.</p> : null}</div>
    <button type="submit" disabled={status === "sending"} className="min-h-12 w-full rounded-xl bg-brand-red px-5 py-3 font-extrabold text-white disabled:cursor-not-allowed disabled:opacity-60">{status === "sending" ? "Sending…" : "Get My Free Estimate"}</button>
  </form>;
}
