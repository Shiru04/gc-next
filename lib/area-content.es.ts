import { AREA_CONTENT_LA } from "@/lib/area-content-la.es";
import { AREA_CONTENT_OC } from "@/lib/area-content-oc.es";
export type AreaContent = { about: string[]; nearby: string[]; faqs: { q: string; a: string }[] };
const ALL: Record<string, AreaContent> = { ...AREA_CONTENT_LA, ...AREA_CONTENT_OC };
export function getAreaContent(slug: string): AreaContent | undefined { return ALL[slug]; }
