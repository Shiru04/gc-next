import { ServiceRequestForm } from "@/components/service/ServiceRequestForm";

export default async function SpanishRequestServicePage({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const { service } = await searchParams;
  return <main className="mx-auto max-w-3xl px-4 py-16 sm:py-24">
    <p className="font-bold uppercase tracking-wide text-brand-red">GC Heating &amp; Cooling</p>
    <h1 className="mt-3 text-4xl font-extrabold">Solicitar servicio</h1>
    <p className="mt-4 max-w-2xl text-lg text-black/70">Solicite reparación o mantenimiento en línea. Para un sistema nuevo o reemplazo, agende una consulta HVAC gratuita en sitio.</p>
    <div className="mt-8 rounded-2xl border border-black/10 bg-brand-gray p-5 sm:p-8"><ServiceRequestForm initialService={service} locale="es" /></div>
  </main>;
}
