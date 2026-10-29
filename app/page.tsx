import { AcquisitionHome } from '@/components/acquisition/Home';
import { buildMetadata } from '@/lib/seo';
import { fetchGoogleReviews } from '@/lib/google-reviews';
export const metadata = buildMetadata({title:"GC Heating & Cooling | Installation, Repair & Maintenance",description:"Local HVAC experts serving Los Angeles and Orange County since 1999. Free installation estimates and distinct repair and maintenance service.",path:'/'});
export default async function Page(){ const reviews=await fetchGoogleReviews(); return <AcquisitionHome locale="en" googleReviews={reviews} />; }
