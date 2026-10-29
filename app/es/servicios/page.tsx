import { ServiceDirectory } from "@/components/acquisition/ServiceDirectory";
import { buildMetadata } from "@/lib/seo";
export const metadata=buildMetadata({title:"Servicios HVAC para su hogar y negocio",description:"Instalación, reparación, mantenimiento y HVAC comercial en Los Ángeles y Orange County. Llame al 562-867-4123.",path:"/es/servicios/"});
export default function Page(){return <ServiceDirectory locale="es" />;}
