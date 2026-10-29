import { AboutContact } from "@/components/acquisition/AboutContact";
import { buildMetadata } from "@/lib/seo";
export const metadata=buildMetadata({title:"Contacte a GC Heating & Cooling",description:"Instalación, reparación, mantenimiento y HVAC comercial en Los Ángeles y Orange County. Llame al 562-867-4123.",path:"/es/contacto/"});
export default function Page(){return <AboutContact locale="es" contact/>;}
