import { ServiceDirectory } from "@/components/acquisition/ServiceDirectory";
import { buildMetadata } from "@/lib/seo";
export const metadata=buildMetadata({title:"HVAC Services for Your Home & Business",description:"Installation, repair, maintenance and commercial HVAC in Los Angeles and Orange County. Call 562-867-4123.",path:"/services/"});
export default function Page(){return <ServiceDirectory locale="en" />;}
