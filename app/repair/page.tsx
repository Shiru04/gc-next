import { AcquisitionPage } from '@/components/acquisition/AcquisitionPage';
import { acquisitionPage, acquisitionPath } from '@/lib/acquisition-content';
import { buildMetadata } from '@/lib/seo';
const page=acquisitionPage('repair')!;
export const metadata=buildMetadata({title:page.title[0]+' | GC Heating & Cooling',description:page.intro[0],path:'/repair/'});
export default function Page(){return <AcquisitionPage page={page} locale="en"/>;}
