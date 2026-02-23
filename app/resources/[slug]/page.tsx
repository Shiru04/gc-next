import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { POSTS, getPost } from "@/lib/posts";
import { BUSINESS } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/resources/${post.slug}`,
  });
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = getPost(slug);
  if (!post) return notFound();

  return (
    <>
      <Section className="pt-10 sm:pt-14">
        <div className="max-w-3xl">
          <div className="text-xs font-bold text-black/50">{post.date}</div>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-black/70">{post.description}</p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Button
              href={`tel:${BUSINESS.phoneE164}`}
              variant="secondary"
              size="lg"
            >
              Call {BUSINESS.phoneDisplay}
            </Button>
            <Button href={BUSINESS.bookingUrl} variant="primary" size="lg">
              Book Now
            </Button>
          </div>
        </div>
      </Section>

      <Section className="bg-brand-gray">
        <Card className="p-6">
          <div className="text-lg font-extrabold">Article content</div>
          <p className="mt-2 text-black/70">
            This is a starter post shell for static export. We can add full
            content blocks (headings, lists, images) and internal links to
            services and service areas to boost SEO.
          </p>

          <div className="mt-6 rounded-2xl bg-white p-5 border border-black/10">
            <div className="text-sm font-extrabold">Quick links</div>
            <div className="mt-3 flex flex-wrap gap-3">
              <Button href="/services" variant="secondary" size="sm">
                Browse services
              </Button>
              <Button href="/service-areas" variant="secondary" size="sm">
                Service areas
              </Button>
              <Button href="/promotions" variant="primary" size="sm">
                Promotions
              </Button>
            </div>
          </div>

          <div className="mt-5">
            <Button href="/resources" variant="secondary" size="md">
              Back to resources
            </Button>
          </div>
        </Card>
      </Section>
    </>
  );
}
