"use client";
import { useEffect } from "react";
export function InstallationThankYou() {
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("gc_installation_conversion"); if (!raw) return;
      const lead = JSON.parse(raw) as Record<string, unknown>;
      window.dataLayer = window.dataLayer ?? [];
      window.dataLayer.push({ event: "housecall_pro_installation_lead_confirmed", lead_type: "installation", internal_lead_id: lead.leadId, housecall_pro_lead_id: lead.providerLeadId, system_type: lead.systemType, project_type: lead.projectType, timeline: lead.timeline, financing_interest: lead.financingInterest, zip_code: lead.zipCode, source: "free_hvac_quote_guide", cta_source: lead.ctaSource });
      sessionStorage.removeItem("gc_installation_conversion");
    } catch {}
  }, []);
  return null;
}
