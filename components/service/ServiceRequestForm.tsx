"use client";
import { useState } from "react";
import { Turnstile } from "@/components/ui/Turnstile";

export function ServiceRequestForm({ initialService = "ac_repair" }: { initialService?: string }) {
  const [service, setService] = useState(["maintenance", "commercial_repair", "commercial_maintenance", "other"].includes(initialService || "") ? initialService : "ac_repair");
  const [form, setForm] = useState({ firstName: "", lastName: "", phone: "", email: "", zipCode: "", comments: "", consent: false });
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle"); const [turnstileToken, setTurnstileToken] = useState("");
  const update = (key: keyof typeof form, value: string | boolean) => setForm(old => ({ ...old, [key]: value }));
  async function submit(event: React.FormEvent) {
    event.preventDefault();
    const digits = form.phone.replace(/\D/g, "");
    if (!/^\d{10}$/.test(digits) || !/^\d{5}$/.test(form.zipCode) || !form.consent || !turnstileToken) { setStatus("error"); return; }
    setStatus("sending");
    try {
      const response = await fetch("/api/installation-leads/", { method: "POST", headers: { "Content-Type": "application/json", "Idempotency-Key": crypto.randomUUID() }, body: JSON.stringify({ ...form, phone: digits, serviceRequestType: service, projectType: "not_sure", comfortNeeds: ["other"], systemType: "not_sure", timeline: "asap", financingInterest: "maybe", turnstileToken, website: "", attribution: { landingUrl: location.href, referrer: document.referrer, submittedAt: new Date().toISOString() }, ctaSource: "request-service" }) });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error();
      window.dataLayer = window.dataLayer ?? []; window.dataLayer.push({ event: "service_request_submit", lead_type: "service_request", service_type: service, lead_id: result.leadId, cta_source: "request-service" });
      window.location.href = `/thank-you/installation-estimate/?lead=${encodeURIComponent(result.leadId)}`;
    } catch { setStatus("error"); }
  }
  const input = "mt-1 min-h-12 w-full rounded-xl border border-black/25 bg-white px-3 py-3 text-base";
  return <form onSubmit={submit} className="space-y-5" noValidate><div><label className="font-bold" htmlFor="service-type">What service do you need?</label><select id="service-type" value={service} onChange={e => setService(e.target.value)} className={input}><option value="ac_repair">AC repair</option><option value="maintenance">Tune-up / maintenance</option><option value="commercial_repair">Commercial HVAC</option><option value="commercial_maintenance">Commercial HVAC maintenance</option><option value="other">Something else</option></select></div><div className="grid gap-4 sm:grid-cols-2"><label className="font-bold">First name<input className={input} value={form.firstName} onChange={e => update("firstName", e.target.value)} required /></label><label className="font-bold">Last name<input className={input} value={form.lastName} onChange={e => update("lastName", e.target.value)} required /></label><label className="font-bold">Phone (10 digits)<input className={input} inputMode="numeric" placeholder="5628674123" value={form.phone} onChange={e => update("phone", e.target.value.replace(/\D/g, "").slice(0, 10))} required /></label><label className="font-bold">Email<input className={input} type="email" value={form.email} onChange={e => update("email", e.target.value)} required /></label></div><label className="font-bold">ZIP code<input className={input} inputMode="numeric" value={form.zipCode} onChange={e => update("zipCode", e.target.value.replace(/\D/g, "").slice(0, 5))} required /></label><label className="font-bold">How can we help?<textarea className={input} rows={4} value={form.comments} onChange={e => update("comments", e.target.value)} /></label><label className="flex items-start gap-3 text-sm"><input type="checkbox" className="mt-1 h-5 w-5" checked={form.consent} onChange={e => update("consent", e.target.checked)} /><span>I agree that GC Heating &amp; Cooling may contact me about this request.</span></label><Turnstile onToken={setTurnstileToken} />{status === "error" ? <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">We had an error receiving your request. Please call <a className="font-bold underline" href="tel:+15628674123">562-867-4123</a>.</p> : null}<button disabled={status === "sending"} className="min-h-12 w-full rounded-xl bg-brand-red px-5 py-3 font-extrabold text-white disabled:opacity-60">{status === "sending" ? "Sending…" : "Request Service"}</button></form>;
}
