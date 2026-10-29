import { AcquisitionReviews } from "@/components/acquisition/Reviews";
import { fetchGoogleReviews } from "@/lib/google-reviews";
import { buildMetadata } from "@/lib/seo";
export const metadata=buildMetadata({title:"Reseñas de GC Heating & Cooling",description:"Experiencias de clientes de instalación, reparación y mantenimiento HVAC.",path:"/es/resenas/"});
export default async function Page(){const data=await fetchGoogleReviews();return <AcquisitionReviews locale="es" reviews={[]}/>;}

