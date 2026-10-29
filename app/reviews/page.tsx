import { AcquisitionReviews } from "@/components/acquisition/Reviews";
import { fetchGoogleReviews } from "@/lib/google-reviews";
import { buildMetadata } from "@/lib/seo";
export const metadata=buildMetadata({title:"Reviews of GC Heating & Cooling",description:"Customer experiences with HVAC installation, repair and maintenance.",path:"/reviews/"});
export default async function Page(){const data=await fetchGoogleReviews();return <AcquisitionReviews locale="en" reviews={data?.reviews || []}/>;}

