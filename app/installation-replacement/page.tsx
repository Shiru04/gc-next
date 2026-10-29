import { AcquisitionPage } from '@/components/acquisition/AcquisitionPage';
import { acquisitionPage, acquisitionPath } from '@/lib/acquisition-content';
import { buildMetadata } from '@/lib/seo';
const page=acquisitionPage('installation-replacement')!;
export const metadata=buildMetadata({title:page.title[0]+' | GC Heating & Cooling',description:page.intro[0],path:'/installation-replacement/'});
export default function Page(){return <AcquisitionPage page={page} locale="en"/>;}
