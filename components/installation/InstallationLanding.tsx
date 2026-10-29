import { AcquisitionPage } from '@/components/acquisition/AcquisitionPage';
import { acquisitionPage } from '@/lib/acquisition-content';
export function InstallationLanding({locale='en'}:{locale?:'en'|'es'}){return <AcquisitionPage locale={locale} page={acquisitionPage('installation-replacement')!}/>;}
