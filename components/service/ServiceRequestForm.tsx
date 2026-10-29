"use client";
import { LeadForm } from '@/components/acquisition/LeadForm';
export function ServiceRequestForm({initialService='ac_repair',locale='en'}:{initialService?:string;locale?:'en'|'es'}){return <LeadForm mode={initialService.startsWith('commercial')?'commercial':initialService==='maintenance'?'maintenance':'repair'} locale={locale} placement="request-service"/>;}
