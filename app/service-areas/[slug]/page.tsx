import { notFound } from "next/navigation";
import { AreaPage } from "@/components/acquisition/AreaPage";
import { SERVICE_AREAS, getAreaBySlug } from "@/lib/areas";
import { buildMetadata } from "@/lib/seo";
export function generateStaticParams(){return SERVICE_AREAS.map(a=>({slug:a.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const area=getAreaBySlug(slug);if(!area)return {};return buildMetadata({title:"HVAC Installation & Service in "+area.name+" | GC",description:"Free installation estimates, HVAC repair and maintenance in "+area.name+". GC Heating & Cooling · 562-867-4123.",path:"/service-areas/"+slug+"/"});}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;if(!getAreaBySlug(slug))notFound();return <AreaPage slug={slug} locale="en"/>;}

