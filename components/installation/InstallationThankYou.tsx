"use client";
import { useEffect } from "react";
import { sendConfirmedLeadConversion } from "@/lib/google-tag";

const sent = new Set<string>();
const freshConfirmation = (lead: Record<string, unknown>) =>
  typeof lead.confirmedAt === "number" && Date.now() >= lead.confirmedAt && Date.now() - lead.confirmedAt <= 300000;

export function fireOnce(kind: "installation" | "service", lead: Record<string, unknown>): boolean {
  const leadId = typeof lead.leadId === "string" ? lead.leadId : "";
  if (!/^[0-9a-f-]{36}$/i.test(leadId) || typeof lead.providerLeadId !== "string" || !lead.providerLeadId) return false;
  const key = `gc_success_conversion_${kind}_${leadId}`;
  if (sent.has(key)) return true;
  try { if (localStorage.getItem(key)) return true; } catch {}
  const parameters = kind === "installation" ? {
      lead_type: "installation",
      request_id: leadId,
      system_type: lead.systemType,
      project_type: lead.projectType,
      timeline: lead.timeline,
      financing_interest: lead.financingInterest,
      source: "free_hvac_quote_guide",
      cta_location: "installation_page",
    } : {
      lead_type: "service_request",
      service_type: lead.serviceType,
      cta_location: lead.ctaSource,
    };
  if (!sendConfirmedLeadConversion(kind, leadId, parameters)) return false;
  sent.add(key);
  try { localStorage.setItem(key, "1"); } catch {}
  return true;
}

export function InstallationThankYou() {
  useEffect(() => {
    try {
      const installation = sessionStorage.getItem("gc_installation_conversion");
      if (installation) {
        const lead = JSON.parse(installation) as Record<string, unknown>;
        const expectedLead = new URLSearchParams(location.search).get("lead");
        if (lead.leadId === expectedLead && freshConfirmation(lead)) fireOnce("installation", lead);
        return;
      }
      const service = sessionStorage.getItem("gc_service_request_conversion");
      if (!service) return;
      const expectedLead = new URLSearchParams(location.search).get("lead");
      const lead = JSON.parse(service) as Record<string, unknown>;
      if (lead.leadId === expectedLead && freshConfirmation(lead)) fireOnce("service", lead);
    } catch {} finally {
      try {
        for (const key of ["gc_installation_conversion", "gc_installation_submission_id", "gc_service_request_conversion", "gc_service_request_submission_id"]) sessionStorage.removeItem(key);
      } catch {}
    }
  }, []);
  return null;
}
