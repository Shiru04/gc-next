import { notFound } from "next/navigation";
import { AreaPage } from "@/components/acquisition/AreaPage";
import { SERVICE_AREAS, getAreaBySlug } from "@/lib/areas";
import { buildMetadata } from "@/lib/seo";
export function generateStaticParams(){return SERVICE_AREAS.map(a=>({slug:a.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const area=getAreaBySlug(slug);if(!area)return {};return buildMetadata({title:"Instalación y servicio HVAC en "+area.name+" | GC",description:"Estimados gratuitos de instalación, reparación y mantenimiento HVAC en "+area.name+". GC Heating & Cooling · 562-867-4123.",path:"/es/areas-de-servicio/"+slug+"/"});}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;if(!getAreaBySlug(slug))notFound();return <AreaPage slug={slug} locale="es"/>;}

