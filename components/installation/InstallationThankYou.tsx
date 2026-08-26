"use client";
import { useEffect } from "react";
export function InstallationThankYou() {
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("gc_installation_conversion"); if (!raw) return;
      const lead = JSON.parse(raw) as Record<string, unknown>;
      window.dataLayer = window.dataLayer ?? [];
      window.dataLayer.push({ event: "installation_lead_submit", lead_type: "installation", internal_lead_id: lead.leadId, system_type: lead.systemType, project_type: lead.projectType, timeline: lead.timeline, financing_interest: lead.financingInterest, zip_code: lead.zipCode, source: "installation_form" });
      sessionStorage.removeItem("gc_installation_conversion");
    } catch {}
  }, []);
  return null;
}
