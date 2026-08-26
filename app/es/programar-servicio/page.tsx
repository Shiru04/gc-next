import type { Metadata } from "next";
import { ScheduleService } from "@/components/scheduling/ScheduleService";
export const metadata: Metadata = { title: "Programar servicio de HVAC | GC Heating & Cooling", alternates: { canonical: "/es/programar-servicio/", languages: { en: "/schedule-service/", es: "/es/programar-servicio/", "x-default": "/schedule-service/" } } };
export default async function Page({ searchParams }: { searchParams: Promise<{ service?: string; coupon?: string }> }) { const { service, coupon } = await searchParams; return <ScheduleService locale="es" initialService={service} coupon={coupon === "GC149" ? coupon : undefined} />; }
