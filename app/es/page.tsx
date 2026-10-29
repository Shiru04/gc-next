import { AcquisitionHome } from '@/components/acquisition/Home';
import { buildMetadata } from '@/lib/seo';
import { fetchGoogleReviews } from '@/lib/google-reviews';
export const metadata = buildMetadata({title:"GC Heating & Cooling | Instalación, reparación y mantenimiento",description:"Expertos locales en HVAC para Los Ángeles y Orange County desde 1999. Estimados gratuitos de instalación.",path:'/es/'});
export default async function Page(){ const reviews=await fetchGoogleReviews(); return <AcquisitionHome locale="es" googleReviews={reviews} />; }
