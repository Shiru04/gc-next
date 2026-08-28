"use client";
import { useEffect } from "react";

declare global { interface Window { gtag?: (...args: any[]) => void; dataLayer?: Array<Record<string, unknown>>; } }

const ADS = {
  installation: "AW-800582055/Ix72CKqVyukcEKfT3_0C",
  service: "AW-800582055/j7wKCKeVyukcEKfT3_0C",
} as const;

function fireOnce(kind: keyof typeof ADS, lead: Record<string, unknown>) {
  const leadId = typeof lead.leadId === "string" ? lead.leadId : "";
  if (!leadId) return;
  const key = `gc_google_ads_conversion_${kind}_${leadId}`;
  if (localStorage.getItem(key)) return;
  localStorage.setItem(key, "1");
  window.gtag?.("event", "conversion", { send_to: ADS[kind], value: 1.0, currency: "USD" });
}

export function InstallationThankYou() {
  useEffect(() => {
    try {
      const installation = sessionStorage.getItem("gc_installation_conversion");
      if (installation) {
        const lead = JSON.parse(installation) as Record<string, unknown>;
        window.dataLayer = window.dataLayer ?? [];
        window.dataLayer.push({ event: "installation_lead_submit", lead_type: "installation", internal_lead_id: lead.leadId, housecall_pro_lead_id: lead.providerLeadId, system_type: lead.systemType, project_type: lead.projectType, timeline: lead.timeline, financing_interest: lead.financingInterest, zip_code: lead.zipCode, source: "free_hvac_quote_guide", cta_source: lead.ctaSource });
        fireOnce("installation", lead);
        sessionStorage.removeItem("gc_installation_conversion");
        return;
      }
      const service = sessionStorage.getItem("gc_service_request_conversion");
      if (!service) return;
      const lead = JSON.parse(service) as Record<string, unknown>;
      window.dataLayer = window.dataLayer ?? [];
      window.dataLayer.push({ event: "service_request_submit", lead_type: "service_request", service_type: lead.serviceType, internal_lead_id: lead.leadId, housecall_pro_lead_id: lead.providerLeadId, cta_source: lead.ctaSource });
      fireOnce("service", lead);
      sessionStorage.removeItem("gc_service_request_conversion");
    } catch {}
  }, []);
  return null;
}
