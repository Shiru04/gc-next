import { ServiceRequestForm } from "@/components/service/ServiceRequestForm";
import { INSTALLATION_CONSULTATION_CTA, INSTALLATION_CONSULTATION_HREF } from "@/lib/consultation";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Request HVAC Service", description: "Request AC repair or HVAC tune-up service from GC Heating & Cooling.", path: "/request-service" });

export default async function RequestServicePage({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const { service } = await searchParams;
  return <main className="mx-auto max-w-3xl px-4 py-16 sm:py-24">
    <p className="font-bold uppercase tracking-wide text-brand-red">GC Heating &amp; Cooling</p>
    <h1 className="mt-3 text-4xl font-extrabold">Book a Free HVAC Consultation</h1>
    <p className="mt-4 max-w-2xl text-lg text-black/70">Tell us what you need and our team will help confirm the right next step for your HVAC service.</p>
    <aside className="mt-8 rounded-2xl border border-brand-red/25 bg-red-50 p-5 sm:p-6" aria-label="Installation and replacement consultation">
      <p className="font-bold uppercase tracking-wide text-brand-red">Installing or replacing a system?</p>
      <h2 className="mt-2 text-2xl font-extrabold">Request Your Free HVAC Consultation</h2>
      <p className="mt-2 max-w-2xl text-black/75">Get professional system sizing and a free estimate for central AC, heat pump or mini-split installation and replacement. No appointment is required to submit your request.</p>
      <a href={INSTALLATION_CONSULTATION_HREF} className="mt-4 inline-flex min-h-12 items-center rounded-xl bg-brand-red px-5 py-3 font-extrabold text-white transition-colors hover:bg-red-700">{INSTALLATION_CONSULTATION_CTA}</a>
    </aside>
    <div className="mt-8 rounded-2xl border border-black/10 bg-brand-gray p-5 sm:p-8"><ServiceRequestForm initialService={service} /></div>
  </main>;
}
