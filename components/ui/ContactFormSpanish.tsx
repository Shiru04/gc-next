"use client";
import { useRef, useState, type FormEvent } from "react";
import { Turnstile } from "@/components/ui/Turnstile";
import { validateContact, type ContactErrors } from "@/lib/contact-schema";
import { pushConversionEvent } from "@/lib/conversions";
import { SERVICE_LABELS, SERVICE_TYPES, type ServiceType } from "@/lib/service-types";
const EMPTY = { name: "", email: "", phone: "", service: "other" as ServiceType, zip: "", message: "", consent: false, turnstileToken: "", website: "" };
export function ContactFormSpanish() {
  const [form, setForm] = useState(EMPTY); const [errors, setErrors] = useState<ContactErrors>({}); const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle"); const started = useRef(false);
  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) { if (!started.current) { started.current = true; pushConversionEvent("contact_form_start", { serviceType: form.service, ctaLocation: "contact-form" }); } setForm((old) => ({ ...old, [key]: value })); setErrors((old) => ({ ...old, [key]: undefined })); }
  async function submit(event: FormEvent) {
    event.preventDefault(); const parsed = validateContact(form);
    if (!parsed.success) { setErrors(parsed.errors); const first = Object.keys(parsed.errors)[0]; document.getElementById(`cf-${first}`)?.focus(); return; }
    setStatus("sending"); setErrors({});
    try { const response = await fetch("/api/contact/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(parsed.data) }); const result = await response.json() as { ok?: boolean; errors?: ContactErrors }; if (!response.ok || !result.ok) { if (result.errors) setErrors(result.errors); throw new Error(); } pushConversionEvent("contact_form_submit", { serviceType: form.service, ctaLocation: "contact-form" }); if (form.service === "installation") pushConversionEvent("installation_estimate_request", { serviceType: form.service, ctaLocation: "contact-form" }); setStatus("sent"); setForm(EMPTY); }
    catch { setStatus("error"); }
  }
  if (status === "sent") return <div role="status" className="py-8 text-center"><h2 className="text-2xl font-extrabold text-brand-red">Solicitud recibida</h2><p className="mt-2 text-black/70">Gracias. GC Heating & Cooling ahora puede revisar su solicitud.</p></div>;
  const fieldClass = "mt-1 w-full rounded-xl border border-black/20 bg-white px-4 py-3 outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/20";
  const error = (key: keyof ContactErrors) => errors[key] ? <p id={`cf-${key}-error`} className="mt-1 text-sm text-red-700">{errors[key]}</p> : null;
  return <form method="post" action="/api/contact/" onSubmit={submit} onFocus={() => { if (!started.current) { started.current = true; pushConversionEvent("contact_form_start", { serviceType: form.service, ctaLocation: "contact-form" }); } }} noValidate className="space-y-4">
    <input id="cf-website" name="website" value={form.website} onChange={(e) => update("website", e.target.value)} autoComplete="off" tabIndex={-1} aria-hidden="true" className="absolute -left-[9999px] h-0 w-0" />
    <div><label htmlFor="cf-name" className="font-semibold">Nombre *</label><input id="cf-name" name="name" autoComplete="name" value={form.name} onChange={(e) => update("name", e.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "cf-name-error" : undefined} className={fieldClass} />{error("name")}</div>
    <div><label htmlFor="cf-email" className="font-semibold">Correo electrónico *</label><input id="cf-email" name="email" type="email" inputMode="email" autoComplete="email" value={form.email} onChange={(e) => update("email", e.target.value)} aria-invalid={Boolean(errors.email)} className={fieldClass} />{error("email")}</div>
    <div className="grid gap-4 sm:grid-cols-2"><div><label htmlFor="cf-phone" className="font-semibold">Teléfono</label><input id="cf-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} aria-invalid={Boolean(errors.phone)} className={fieldClass} />{error("phone")}</div><div><label htmlFor="cf-zip" className="font-semibold">Código postal *</label><input id="cf-zip" name="zip" inputMode="numeric" autoComplete="postal-code" value={form.zip} onChange={(e) => update("zip", e.target.value)} aria-invalid={Boolean(errors.zip)} className={fieldClass} />{error("zip")}</div></div>
    <div><label htmlFor="cf-service" className="font-semibold">Servicio *</label><select id="cf-service" name="service" value={form.service} onChange={(e) => update("service", e.target.value as ServiceType)} className={fieldClass}>{SERVICE_TYPES.map((type) => <option key={type} value={type}>{SERVICE_LABELS.en[type]}</option>)}</select></div>
    <div><label htmlFor="cf-message" className="font-semibold">¿Cómo podemos ayudar? *</label><textarea id="cf-message" name="message" rows={5} value={form.message} onChange={(e) => update("message", e.target.value)} aria-invalid={Boolean(errors.message)} className={fieldClass} />{error("message")}</div>
    <div><label className="flex items-start gap-3"><input id="cf-consent" type="checkbox" checked={form.consent} onChange={(e) => update("consent", e.target.checked)} className="mt-1" /><span className="text-sm">Acepto que GC Heating & Cooling pueda comunicarse conmigo acerca de esta solicitud de servicio. Esto no es un consentimiento de comercialización.</span></label>{error("consent")}</div>
    <Turnstile onToken={(token) => update("turnstileToken", token)} />
    <div aria-live="polite">{status === "error" ? <p className="text-sm font-medium text-red-700">No pudimos enviar su solicitud. Por favor revise los campos o llámenos.</p> : null}</div>
    <button type="submit" disabled={status === "sending"} className="h-12 w-full rounded-xl bg-brand-red font-semibold text-white disabled:opacity-60">{status === "sending" ? "Sending…" : "Send service request"}</button>
  </form>;
}
