import { AcquisitionPage } from '@/components/acquisition/AcquisitionPage';
import { acquisitionPage, acquisitionPath } from '@/lib/acquisition-content';
import { buildMetadata } from '@/lib/seo';
const page=acquisitionPage('attic-insulation')!;
export const metadata=buildMetadata({title:page.title[1]+' | GC Heating & Cooling',description:page.intro[1],path:'/es/attic-insulation/'});
export default function Page(){return <AcquisitionPage page={page} locale="es"/>;}
