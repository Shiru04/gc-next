import { AboutContact } from "@/components/acquisition/AboutContact";
import { buildMetadata } from "@/lib/seo";
export const metadata=buildMetadata({title:"About GC Heating & Cooling",description:"Installation, repair, maintenance and commercial HVAC in Los Angeles and Orange County. Call 562-867-4123.",path:"/about/"});
export default function Page(){return <AboutContact locale="en" />;}
