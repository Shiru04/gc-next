import { notFound } from 'next/navigation';
import { AcquisitionPage } from '@/components/acquisition/AcquisitionPage';
import { ACQUISITION_PAGES, acquisitionPage, acquisitionPath } from '@/lib/acquisition-content';
import { buildMetadata } from '@/lib/seo';
export const dynamicParams=false;
export function generateStaticParams(){return ACQUISITION_PAGES.filter(p=>p.slug.startsWith('installation-replacement/')).map(p=>({slug:p.slug.split('/')[1]}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}) {const {slug}=await params; const p=acquisitionPage('installation-replacement/'+slug); if(!p)return {};return buildMetadata({title:p.title[0]+' | GC Heating & Cooling',description:p.intro[0],path:acquisitionPath(p.slug,'en')});}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=acquisitionPage('installation-replacement/'+slug);if(!p)notFound();return <AcquisitionPage page={p} locale="en"/>;}
