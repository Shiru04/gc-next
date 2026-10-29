/** Publish only records whose facts, images and customer permissions are approved. */
export type ProjectProof = {
 id: string; category: "installation" | "repair" | "maintenance" | "commercial";
 city: string; propertySituation: string; previousProblem: string; solution: string;
 systemCategory: string; installationConsiderations: string; outcome: string;
 photographs: { src: string; alt: string; width: number; height: number }[];
 customerReview?: { excerpt: string; author: string; sourceUrl: string };
 approval: { approvedAt: string; source: string };
 spanish?: { propertySituation: string; previousProblem: string; solution: string; systemCategory: string; installationConsiderations: string; outcome: string; photographAlts: string[]; reviewExcerpt?: string };
};
export const APPROVED_PROJECTS: ProjectProof[] = [];
