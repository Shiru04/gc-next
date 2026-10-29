import type { ServiceType } from "@/lib/service-types";
import { acquisitionPath } from "@/lib/acquisition-content";
export function customerFlowHref(service: ServiceType, locale: "en" | "es" = "en", coupon?: string) {
 const slug=service.startsWith("commercial")?"commercial":service==="installation"?"installation-replacement":service==="maintenance"?"maintenance":service==="other"?"": "repair";
 const base=slug?acquisitionPath(slug,locale):locale==="es"?"/es/":"/";
 return base+(coupon?"?coupon="+encodeURIComponent(coupon):"")+"#free-hvac-quote";
}
export function housecallProBookingHref(service: ServiceType, coupon?: string) {
 const configured=process.env.NEXT_PUBLIC_HOUSECALL_PRO_ONLINE_BOOKING_URL;
 if(!configured)return customerFlowHref(service,"en",coupon);
 try{const url=new URL(configured);if(url.protocol!=="https:" || !/(^|\.)(housecallpro\.com|housecall\.pro)$/.test(url.hostname))return customerFlowHref(service,"en",coupon);url.searchParams.set("service",service);if(coupon)url.searchParams.set("coupon",coupon);return url.toString();}catch{return customerFlowHref(service,"en",coupon);}
}
export const scheduleServiceHref=customerFlowHref;
/** Compatibility for older imports; the destination is always a GC/HCP journey. */
export const dispatchServiceHref=(service:ServiceType,coupon?:string)=>customerFlowHref(service,"en",coupon);
export function serviceIntentFromSlug(slug:string):ServiceType {
 if(slug.startsWith("commercial-"))return slug.includes("installation")?"commercial_installation":slug.includes("maintenance")?"commercial_maintenance":"commercial_repair";
 if(slug.includes("installation") || slug.includes("insulation"))return "installation";
 if(slug.includes("maintenance"))return "maintenance";
 return slug.includes("heating")?"heating_repair":"ac_repair";
}
export function serviceCtaLabel(service:ServiceType,locale:"en"|"es"="en"){
 const es=locale==="es";
 if(service.startsWith("commercial"))return es?"Solicitar servicio HVAC comercial":"Request Commercial HVAC Service";
 if(service==="installation")return es?"Obtener un estimado gratuito":"Get a Free Estimate";
 if(service==="maintenance")return es?"Solicitar mantenimiento por $149":"Book the $149 Tune-Up";
 return es?"Solicitar servicio HVAC":"Request HVAC Service";
}
