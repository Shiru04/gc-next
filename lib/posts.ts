export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string; // display
};

export const POSTS: Post[] = [
  {
    slug: "how-to-know-if-your-ac-needs-repair",
    title: "How to know if your AC needs repair",
    description:
      "Common warning signs, what to check, and when to schedule service.",
    date: "2026-02-22",
  },
  {
    slug: "hvac-maintenance-checklist",
    title: "HVAC maintenance checklist for LA & OC",
    description:
      "Simple steps to reduce breakdown risk and improve efficiency.",
    date: "2026-02-22",
  },
];

export function getPost(slug: string) {
  return POSTS.find((p) => p.slug === slug);
}
