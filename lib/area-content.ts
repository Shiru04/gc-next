import { AREA_CONTENT_OC } from "./area-content-oc";
import { AREA_CONTENT_LA } from "./area-content-la";

export type AreaContent = {
  about: string[];
  faqs: Array<{ q: string; a: string }>;
  nearby: string[];
};

export const AREA_CONTENT: Record<string, AreaContent> = {
  ...AREA_CONTENT_OC,
  ...AREA_CONTENT_LA,
};

export function getAreaContent(slug: string): AreaContent | undefined {
  return AREA_CONTENT[slug];
}
