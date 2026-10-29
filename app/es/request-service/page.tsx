import { AcquisitionPage } from "@/components/acquisition/AcquisitionPage";
import { acquisitionPage } from "@/lib/acquisition-content";
import { buildMetadata } from "@/lib/seo";
export const metadata=buildMetadata({title:"Solicitar servicio HVAC | GC",description:"Solicite reparación, mantenimiento o servicio comercial HVAC.",path:"/es/request-service/"});
export default async function Page({searchParams}:{searchParams:Promise<{service?:string}>}){const {service}=await searchParams;const slug=service?.startsWith("commercial")?"commercial":service==="maintenance"?"maintenance":"repair";return <AcquisitionPage locale="es" page={acquisitionPage(slug)!}/>;}

