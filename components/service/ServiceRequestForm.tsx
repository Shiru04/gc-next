"use client";
import { useState } from "react";
import { Turnstile } from "@/components/ui/Turnstile";

type Field = "firstName" | "lastName" | "phone" | "email" | "zipCode" | "consent";
type Errors = Partial<Record<Field, string>>;

export function ServiceRequestForm({ initialService = "ac_repair", locale = "en" }: { initialService?: string; locale?: "en" | "es" }) {
  const es = locale === "es";
  const [service, setService] = useState(["maintenance", "commercial_repair", "commercial_maintenance", "other"].includes(initialService) ? initialService : "ac_repair");
  const [form, setForm] = useState({ firstName: "", lastName: "", phone: "", email: "", zipCode: "", comments: "", consent: false });
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [token, setToken] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const update = (key: keyof typeof form, value: string | boolean) => { setForm(old => ({ ...old, [key]: value })); setErrors(old => ({ ...old, [key]: undefined })); setStatus("idle"); };
  async function submit(event: React.FormEvent) {
    event.preventDefault();
    const digits = form.phone.replace(/\D/g, "");
    const preview = window.location.hostname.endsWith(".vercel.app");
    const next: Errors = {};
    if (!form.firstName.trim()) next.firstName = "Please enter your first name.";
    if (!form.lastName.trim()) next.lastName = "Please enter your last name.";
    if (!/^\d{10}$/.test(digits)) next.phone = "Enter a valid 10-digit phone number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) next.email = "Enter a valid email address.";
    if (!/^\d{5}$/.test(form.zipCode)) next.zipCode = "Enter a 5-digit ZIP code.";
    if (!form.consent) next.consent = "Please agree to be contacted.";
    if (!preview && !token) next.consent = "Please complete the security check.";
    if (Object.keys(next).length) { setErrors(next); setStatus("idle"); return; }
    setStatus("sending");
    try {
      const response = await fetch("/api/installation-leads/", { method: "POST", headers: { "Content-Type": "application/json", "Idempotency-Key": crypto.randomUUID() }, body: JSON.stringify({ ...form, phone: digits, serviceRequestType: service, projectType: "not_sure", comfortNeeds: ["other"], systemType: "not_sure", timeline: "asap", financingInterest: "maybe", turnstileToken: token || "preview-bypass", website: "", attribution: { landingUrl: location.href, referrer: document.referrer, submittedAt: new Date().toISOString() }, ctaSource: "request-service" }) });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error();
      window.dataLayer = window.dataLayer ?? []; window.dataLayer.push({ event: "service_request_submit", lead_type: "service_request", service_type: service, lead_id: result.leadId, cta_source: "request-service" });
      window.location.href = `/thank-you/installation-estimate/?lead=${encodeURIComponent(result.leadId)}`;
    } catch { setStatus("error"); }
  }
  const input = "mt-1 min-h-12 w-full rounded-xl border border-black/25 bg-white px-3 py-3 text-base";
  const error = (key: Field) => errors[key] ? <p role="alert" className="mt-1 text-sm font-medium text-red-700">{errors[key]}</p> : null;
  const summary = Object.values(errors).filter(Boolean);
  return <form onSubmit={submit} className="space-y-5" noValidate>
    {summary.length ? <div role="alert" aria-live="assertive" className="rounded-xl bg-red-50 p-3 text-sm text-red-700"><p className="font-bold">Please correct the following:</p><ul className="list-disc pl-5">{summary.map(item => <li key={item}>{item}</li>)}</ul></div> : null}
    <div><label className="font-bold" htmlFor="service-type">{es ? "¿Qué servicio necesita?" : "What service do you need?"}</label><select id="service-type" value={service} onChange={e => setService(e.target.value)} className={input}><option value="ac_repair">{es ? "Reparación de AC" : "AC repair"}</option><option value="maintenance">{es ? "Afinación / mantenimiento" : "Tune-up / maintenance"}</option><option value="commercial_repair">{es ? "HVAC comercial" : "Commercial HVAC"}</option><option value="commercial_maintenance">{es ? "Mantenimiento de HVAC comercial" : "Commercial HVAC maintenance"}</option><option value="other">{es ? "No estoy seguro / Otra necesidad de HVAC" : "Not sure / Other HVAC need"}</option></select></div>
    <div className="grid gap-4 sm:grid-cols-2"><label className="font-bold">First name<input className={input} value={form.firstName} onChange={e => update("firstName", e.target.value)} required />{error("firstName")}</label><label className="font-bold">Last name<input className={input} value={form.lastName} onChange={e => update("lastName", e.target.value)} required />{error("lastName")}</label><label className="font-bold">Phone (10 digits)<input className={input} inputMode="numeric" placeholder="5628674123" value={form.phone} onChange={e => update("phone", e.target.value.replace(/\D/g, "").slice(0, 10))} required />{error("phone")}</label><label className="font-bold">Email<input className={input} type="email" value={form.email} onChange={e => update("email", e.target.value)} required />{error("email")}</label></div>
    <label className="font-bold">ZIP code<input className={input} inputMode="numeric" value={form.zipCode} onChange={e => update("zipCode", e.target.value.replace(/\D/g, "").slice(0, 5))} required />{error("zipCode")}</label><label className="font-bold">How can we help?<textarea className={input} rows={4} value={form.comments} onChange={e => update("comments", e.target.value)} /></label>
    <label className="flex items-start gap-3 text-sm"><input type="checkbox" className="mt-1 h-5 w-5" checked={form.consent} onChange={e => update("consent", e.target.checked)} /><span>I agree that GC Heating &amp; Cooling may contact me about this request.</span></label>{error("consent")}<Turnstile onToken={setToken} />
    {status === "error" ? <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">We had an error receiving your request. Please call <a className="font-bold underline" href="tel:+15628674123">562-867-4123</a>.</p> : null}<button disabled={status === "sending"} className="min-h-12 w-full rounded-xl bg-brand-red px-5 py-3 font-extrabold text-white disabled:opacity-60">{status === "sending" ? "Sending…" : (es ? "Agendar una consulta HVAC gratuita" : "Book a Free HVAC Consultation")}</button>
  </form>;
}
