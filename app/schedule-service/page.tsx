import type { Metadata } from "next";
import { ScheduleService } from "@/components/scheduling/ScheduleService";
export const metadata: Metadata = { title: "Schedule HVAC Service | GC Heating & Cooling", alternates: { canonical: "/schedule-service/", languages: { en: "/schedule-service/", es: "/es/programar-servicio/", "x-default": "/schedule-service/" } } };
export default async function Page({ searchParams }: { searchParams: Promise<{ service?: string; coupon?: string }> }) { const { service, coupon } = await searchParams; return <ScheduleService locale="en" initialService={service} coupon={coupon === "GC149" ? coupon : undefined} />; }
