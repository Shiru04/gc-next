import { AcquisitionPage } from "@/components/acquisition/AcquisitionPage";
import { acquisitionPage } from "@/lib/acquisition-content";
import { buildMetadata } from "@/lib/seo";
export const metadata=buildMetadata({title:"Request HVAC Service | GC",description:"Request HVAC repair, maintenance or commercial service.",path:"/request-service/"});
export default async function Page({searchParams}:{searchParams:Promise<{service?:string}>}){const {service}=await searchParams;const slug=service?.startsWith("commercial")?"commercial":service==="maintenance"?"maintenance":"repair";return <AcquisitionPage locale="en" page={acquisitionPage(slug)!}/>;}

