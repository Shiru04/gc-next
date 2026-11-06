"use client";

import { useEffect, useId, useRef, useState } from "react";
import { readStoredAttribution } from "@/lib/attribution";
import { OptionalBooking } from "./OptionalBooking";
import { sendConfirmedLeadConversion, sendGoogleEvent } from "@/lib/google-tag";
import { InstallationVerification, type InstallationVerificationHandle } from "@/components/installation/InstallationVerification";

type Intent = "replace" | "install" | "repair" | "maintenance" | "unknown" | "commercial";
type Values = { firstName: string; lastName: string; phone: string; email: string; zipCode: string; projectType: string; systemType: string; timeline: string; company: string; propertyType: string; equipmentType: string; serviceNeeded: string; urgency: string; consent: boolean };
const empty: Values = { firstName: "", lastName: "", phone: "", email: "", zipCode: "", projectType: "not_sure", systemType: "not_sure", timeline: "researching", company: "", propertyType: "", equipmentType: "", serviceNeeded: "", urgency: "", consent: false };
const read = (key: string) => { try { return JSON.parse(sessionStorage.getItem(key) || "null"); } catch { return null; } };
const save = (key: string, value: unknown) => { try { sessionStorage.setItem(key, JSON.stringify(value)); } catch {} };
const trackFormEvent = (...args: Parameters<typeof sendGoogleEvent>) => { try { sendGoogleEvent(...args); } catch {} };

export function LeadForm({ locale = "en", mode = "home", placement = "hero" }: { locale?: "en" | "es"; mode?: "home" | "installation" | "repair" | "maintenance" | "commercial"; placement?: string }) {
  const es = locale === "es";
  const t = (en: string, spanish: string) => es ? spanish : en;
  const prefix = useId();
  const key = `gc-lead-v2-${mode}-${placement}`;
  const [intent, setIntent] = useState<Intent>(mode === "installation" ? "replace" : mode === "home" ? "unknown" : mode);
  const [values, setValues] = useState<Values>(empty);
  const [step, setStep] = useState(0);
  const [ready, setReady] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "error" | "success">("idle");
  const [failureCategory, setFailureCategory] = useState<"verification" | "validation" | "rejected" | "delivery" | null>(null);
  const [submissionConflict, setSubmissionConflict] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const failureMessage = failureCategory === "verification"
    ? t("Security verification could not finish. Please try again.", "No se pudo completar la verificaci\u00f3n de seguridad. Intente de nuevo.")
    : failureCategory === "validation"
      ? t("We couldn't accept these details. Please review the form and try again.", "No pudimos aceptar estos datos. Revise el formulario e intente de nuevo.")
      : failureCategory === "rejected"
        ? t("We couldn't submit this request. Please call 562-867-4123 for help.", "No pudimos enviar esta solicitud. Llame al 562-867-4123 para recibir ayuda.")
        : t("We couldn't confirm receipt. Please retry using this form, or call 562-867-4123.", "No pudimos confirmar la recepci\u00f3n. Intente de nuevo o llame al 562-867-4123.");
  const busy = useRef(false);
  const started = useRef(new Set<Intent>());
  const submissionId = useRef<string>();
  const draftSavedAt = useRef(Date.now());
  const confirmedAt = useRef(0);
  const verification = useRef<InstallationVerificationHandle>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const installation = intent === "replace" || intent === "install";
  const commercial = mode === "commercial" || intent === "commercial";
  const cta = commercial ? t("Request Commercial HVAC Service", "Solicitar servicio HVAC comercial") : installation ? t("Get My Free Installation Estimate", "Obtener mi estimado gratuito de instalación") : intent === "maintenance" ? t("Book the $149 Tune-Up", "Solicitar mantenimiento por $149") : intent === "repair" ? t("Request HVAC Service", "Solicitar servicio HVAC") : t("Let GC Guide Me", "Recibir orientación de GC");

  useEffect(() => {
    const draft = read(key);
    if (draft?.version === 2 && typeof draft.savedAt === "number" && Date.now() - draft.savedAt < 86400000) {
      draftSavedAt.current = draft.savedAt;
      const restoredZip = typeof draft.values?.zipCode === "string" && /^\d{5}$/.test(draft.values.zipCode) ? draft.values.zipCode : "";
      setValues(old => ({ ...old, zipCode: restoredZip, projectType: draft.values?.projectType || old.projectType, systemType: draft.values?.systemType || old.systemType, timeline: draft.values?.timeline || old.timeline }));
      if (["replace", "install", "repair", "maintenance", "unknown", "commercial"].includes(draft.intent)) setIntent(draft.intent);
      setStep(draft.step === 1 && (mode !== "installation" || restoredZip) ? 1 : 0);
      if (typeof draft.submissionId === "string") submissionId.current = draft.submissionId;
      if (draft.success) setStatus("success");
    } else {
      try { sessionStorage.removeItem(key); } catch {}
    }
    const system = new URLSearchParams(window.location.search).get("system_interest");
    if (["central_ac", "heat_pump", "mini_split"].includes(system || "")) setValues(old => ({ ...old, systemType: system! }));
    setReady(true);
  }, [key]);
  useEffect(() => {
    if (ready) save(key, { version: 2, savedAt: draftSavedAt.current, values: { zipCode: /^\d{5}$/.test(values.zipCode) ? values.zipCode : "", projectType: values.projectType, systemType: values.systemType, timeline: values.timeline }, intent, step, submissionId: submissionId.current, success: status === "success" });
  }, [values, intent, step, ready, key, status]);

  function start(selected = intent) {
    if (started.current.has(selected)) return;
    started.current.add(selected);
    trackFormEvent(selected === "replace" || selected === "install" ? "installation_form_start" : "service_request_start", { form_name: mode, form_location: placement, service_type: selected, language: locale });
  }
  function update(field: keyof Values, value: string | boolean) {
    if (field === "projectType" && mode === "installation") setIntent(value === "new_system_installation" ? "install" : "replace");
    start(); setValues(old => ({ ...old, [field]: value })); setErrors(old => ({ ...old, [field]: "" }));
  }
  function report(next: Record<string, string>) {
    if (mode === "installation" && step === 1 && next.zipCode) setStep(0);
    setErrors(next);
    for (const field of Object.keys(next)) if (installation) trackFormEvent("installation_form_error", { form_name: mode, form_location: placement, step: step + 1, field_name: field, error_type: "validation" });
    requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>("[aria-invalid=true]")?.focus());
  }
  function validate(projectOnly = false) {
    const next: Record<string, string> = {};
    if (!/^\d{5}$/.test(values.zipCode)) next.zipCode = t("Enter a five-digit ZIP code.", "Ingrese un código postal de cinco dígitos.");
    if (!projectOnly) {
      if (!values.firstName.trim()) next.firstName = t("Enter your first name.", "Ingrese su nombre.");
      if (mode === "installation" && !values.lastName.trim()) next.lastName = t("Enter your last name.", "Ingrese su apellido.");
      if (!/^(1)?\d{10}$/.test(values.phone.replace(/\D/g, ""))) next.phone = t("Enter a valid US phone number.", "Ingrese un teléfono válido de EE. UU.");
      if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = t("Check your email address.", "Revise su correo electrónico.");
      if (commercial && !values.company.trim()) next.company = t("Enter your company name.", "Ingrese el nombre de su empresa.");
      if (!values.consent) next.consent = t("Please agree to be contacted about this request.", "Autorice que le contactemos sobre esta solicitud.");
    }
    report(next); return !Object.keys(next).length;
  }
  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (busy.current || status === "success" || submissionConflict || !ready) return;
    start();
    if (mode === "installation" && step === 0) { if (validate(true)) { setStep(1); trackFormEvent("installation_contact_step_view", { form_name: mode, form_location: placement, service_type: intent, step: 2 }); requestAnimationFrame(() => formRef.current?.querySelector<HTMLInputElement>('input[autocomplete="given-name"]')?.focus()); } return; }
    if (!validate()) return;
    if (installation) trackFormEvent("installation_submit_attempt", { form_name: mode, form_location: placement, service_type: intent, step: step + 1 });
    setFailureCategory(null);
    busy.current = true; setStatus("sending");
    submissionId.current ??= crypto.randomUUID();
    save(key, { version: 2, savedAt: draftSavedAt.current, values: { zipCode: values.zipCode, projectType: values.projectType, systemType: values.systemType, timeline: values.timeline }, intent, step, submissionId: submissionId.current });
    let nextFailure: "verification" | "validation" | "rejected" | "delivery" = "delivery";
    try {
      let token: string;
      try { token = await verification.current!.verify(); }
      catch { nextFailure = "verification"; throw new Error("verification_failed"); }
      const digits = values.phone.replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "");
      const response = await fetch("/api/installation-leads/", { method: "POST", headers: { "Content-Type": "application/json", "Idempotency-Key": submissionId.current }, body: JSON.stringify({ ...values, phone: digits, projectType: intent === "install" ? "new_system_installation" : mode === "home" && intent === "replace" ? "replace_existing_system" : values.projectType, serviceRequestType: installation ? undefined : commercial ? "commercial_repair" : intent === "repair" ? "ac_repair" : intent === "maintenance" ? "maintenance" : "other", serviceIntent: intent, formMode: mode, turnstileToken: token, website: "", attribution: readStoredAttribution(), ctaSource: `${mode}-${placement}` }) });
      const result = await response.json();
      if (response.status === 409 && result.error === "submission_changed") setSubmissionConflict(true);
      if (response.status === 422 || result.error_stage === "validation") nextFailure = "validation";
      else if (response.status === 403 && result.error_stage === "cloudflare") nextFailure = "verification";
      else if (result.error === "hcp_rejected") nextFailure = "rejected";
      if (!response.ok || !result.ok || result.provider !== "housecall_pro" || !result.providerLeadId || result.leadId !== submissionId.current) throw new Error("unconfirmed");
      sendConfirmedLeadConversion(installation ? "installation" : "service", submissionId.current!, { request_id: submissionId.current, service_type: intent, form_name: mode, form_location: placement });
      save(key, { version: 2, savedAt: draftSavedAt.current, intent, step, submissionId: submissionId.current, success: true });
      // Keep the disabled submit target in place through a double-click sequence.
      // Otherwise a second click can fall through to the success state's phone link.
      await new Promise(resolve => setTimeout(resolve, 600));
      confirmedAt.current = Date.now(); setStatus("success"); setValues(empty);
    } catch {
      setFailureCategory(nextFailure);
      setStatus("error");
      if (installation) trackFormEvent("installation_form_error", { form_name: mode, form_location: placement, step: step + 1, field_name: "submission", error_type: nextFailure });
    } finally { busy.current = false; }
  }
  function field(name: keyof Values, label: string, type = "text", autoComplete?: string) {
    return <div className="gc-field"><label htmlFor={`${prefix}-${name}`}>{label}</label><input id={`${prefix}-${name}`} type={type} autoComplete={autoComplete} inputMode={name === "zipCode" ? "numeric" : undefined} value={String(values[name])} onChange={e => update(name, e.target.value)} aria-invalid={!!errors[name]} aria-describedby={errors[name] ? `${prefix}-${name}-error` : undefined} /><p id={`${prefix}-${name}-error`} className="gc-error">{errors[name]}</p></div>;
  }
  function select(name: keyof Values, label: string, options: string[][]) {
    return <div className="gc-field"><label htmlFor={`${prefix}-${name}`}>{label}</label><select id={`${prefix}-${name}`} value={String(values[name])} onChange={e => update(name, e.target.value)}>{options.map(([value, text]) => <option key={value} value={value}>{text}</option>)}</select></div>;
  }
  if (status === "success") return <div onClickCapture={event => { if (Date.now() - confirmedAt.current < 1200) { event.preventDefault(); event.stopPropagation(); } }} className="gc-success" role="status" tabIndex={-1}><span className="gc-kicker">{t("REQUEST RECEIVED", "SOLICITUD RECIBIDA")}</span><h2>{t("Thank you. GC received your request.", "Gracias. GC recibió su solicitud.")}</h2><p>{t("Our team will review your needs and contact you to discuss the next step. For help now, please call.", "Nuestro equipo revisará su solicitud y le contactará para acordar el siguiente paso. Para recibir ayuda ahora, llámenos.")}</p><a className="gc-button" href="tel:+15628674123">{t("Call", "Llamar al")} 562-867-4123</a><OptionalBooking locale={locale} submissionId={submissionId.current!}/></div>;
  return <form ref={formRef} onSubmit={submit} noValidate className="gc-lead-form" aria-label={cta} aria-busy={status === "sending"}>
    <h2>{mode === "installation" ? t("Your free estimate starts here", "Su estimado gratuito empieza aquí") : t("How can we help?", "¿Cómo podemos ayudarle?")}</h2>
    <p className="gc-form-intro">{mode === "installation" ? t(`Step ${step + 1} of 2 · ${step === 0 ? "Your project" : "Contact details"}`, `Paso ${step + 1} de 2 · ${step === 0 ? "Su proyecto" : "Datos de contacto"}`) : t("Tell us what you need. We’ll help with the next step.", "Cuéntenos qué necesita. Le ayudaremos con el siguiente paso.")}</p>
    <fieldset disabled={status === "sending"}>
    {mode === "home" ? <div className="gc-intent-picker" role="group" aria-label={t("I need to…", "Necesito…")}><span className="gc-intent-label">{t("I need to…", "Necesito…")}</span>{([["repair",t("Repair my system","Reparar mi sistema")],["replace",t("Replace my current system","Reemplazar mi sistema")],["install",t("Install a new system","Instalar un sistema")],["maintenance",t("Schedule maintenance","Mantenimiento")],["commercial",t("Commercial HVAC service","Servicio HVAC comercial")],["unknown",t("I’m not sure","No estoy seguro")]] as [Intent,string][]).map(([value,label])=><button type="button" key={value} aria-pressed={intent===value} onClick={()=>{setIntent(value);start(value);}}>{label}</button>)}</div> : null}
    {mode === "installation" && step === 0 ? <>{select("projectType", t("Your project", "Su proyecto"), [["replace_existing_system", t("Replace current system", "Reemplazar sistema actual")], ["new_system_installation", t("New system", "Sistema nuevo")], ["upgrade_existing_system", t("Efficiency upgrade", "Mejorar eficiencia")], ["not_sure", t("Not sure", "No estoy seguro")]])}{field("zipCode", t("ZIP code *", "Código postal *"), "text", "postal-code")}{select("timeline", t("Timing", "¿Cuándo?"), [["asap", t("ASAP", "Lo antes posible")], ["within_30_days", t("Within 30 days", "En 30 días")], ["within_3_months", t("Within 3 months", "En 3 meses")], ["researching", t("Researching", "Estoy investigando")]])}</> : <>
      {commercial ? field("company", t("Company *", "Empresa *"), "text", "organization") : null}
      <div className="gc-form-grid">{field("firstName", t("First name *", "Nombre *"), "text", "given-name")}{mode === "installation" || commercial ? field("lastName", mode === "installation" ? t("Last name *", "Apellido *") : t("Last name (optional)", "Apellido (opcional)"), "text", "family-name") : null}{field("phone", t("Phone *", "Teléfono *"), "tel", "tel")}{mode !== "installation" ? field("zipCode", t("ZIP code *", "Código postal *"), "text", "postal-code") : null}{field("email", t("Email (optional)", "Correo electrónico (opcional)"), "email", "email")}</div>
      {commercial ? <div className="gc-form-grid">{field("propertyType", t("Property type (optional)", "Tipo de propiedad (opcional)"))}{field("equipmentType", t("Equipment type (optional)", "Tipo de equipo (opcional)"))}{field("serviceNeeded", t("Service needed (optional)", "Servicio requerido (opcional)"))}{field("urgency", t("Urgency (optional)", "Urgencia (opcional)"))}</div> : null}
      <label className="gc-consent" htmlFor={`${prefix}-consent`}><input id={`${prefix}-consent`} type="checkbox" checked={values.consent} onChange={e => update("consent", e.target.checked)} aria-invalid={!!errors.consent} aria-describedby={`${prefix}-consent-error`} /><span>{t("I agree that GC Heating & Cooling may contact me about this request.", "Autorizo a GC Heating & Cooling a contactarme sobre esta solicitud.")}</span></label><p className="gc-error" id={`${prefix}-consent-error`}>{errors.consent}</p>
    </>}
    <div className="gc-verification"><InstallationVerification ref={verification} locale={locale} /></div>
    <div aria-live="polite">{Object.values(errors).some(Boolean) ? <p className="gc-error">{t("Please correct the highlighted fields.", "Corrija los campos indicados.")}</p> : null}{submissionConflict ? <p role="alert" className="gc-error">{t("These details differ from an earlier request. To avoid a duplicate, please call 562-867-4123 before submitting again.", "Estos datos difieren de una solicitud anterior. Para evitar un duplicado, llame al 562-867-4123 antes de volver a enviarla.")}</p> : failureCategory ? <p role="alert" className="gc-error">{failureMessage}</p> : null}</div>
    <div className="gc-form-actions">{mode === "installation" && step === 1 ? <button className="gc-button gc-button-light" type="button" onClick={() => setStep(0)}>{t("Back", "Atrás")}</button> : null}<button className="gc-button" type="submit" disabled={!ready || status === "sending" || submissionConflict}>{status === "sending" ? t("Sending…", "Enviando…") : mode === "installation" && step === 0 ? t("Continue to contact details", "Continuar a datos de contacto") : submissionConflict ? t("Request paused", "Solicitud pausada") : status === "error" ? t("Try again", "Intentar de nuevo") : cta}</button></div>
    </fieldset><p className="gc-form-note">{t("Prefer to talk?", "¿Prefiere hablar?")} <a href="tel:+15628674123">562-867-4123</a></p>
  </form>;
}
