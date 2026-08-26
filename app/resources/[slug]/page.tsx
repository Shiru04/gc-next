import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { POSTS, getPost } from "@/lib/posts";
import { BUSINESS } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import { HiveTipTapRenderer } from "@/components/HiveTipTapRenderer";
import { formatBlogDate, getAllBlogPosts, getBlogPost } from "@/lib/hive-blog";

export const dynamicParams = true;

export async function generateStaticParams() {
  const hivePosts = await getAllBlogPosts("en");
  return Array.from(new Set([...POSTS.map((post) => post.slug), ...hivePosts.map((post) => post.slug)])).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const hivePost = await getBlogPost(slug);
  if (hivePost) return buildMetadata({
    title: hivePost.seoTitle || `${hivePost.title} | GC Heating & Cooling`,
    description: hivePost.metaDescription || hivePost.excerpt,
    path: `/resources/${hivePost.slug}`,
    image: hivePost.ogImage || hivePost.coverImage || undefined,
  });
  const post = getPost(slug);
  if (!post) return {};
  return buildMetadata({
    title: `${post.title} | GC Heating & Cooling`,
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

  const hivePost = await getBlogPost(slug);
  if (hivePost) return (
    <>
      <Section className="pt-10 sm:pt-14">
        <article className="mx-auto max-w-3xl">
          <div className="text-xs font-bold uppercase tracking-wide text-brand-red">{hivePost.category?.name || "Resources"}</div>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">{hivePost.title}</h1>
          <p className="mt-4 text-lg text-black/70">{hivePost.excerpt}</p>
          <div className="mt-4 text-sm text-black/55"><time dateTime={hivePost.publishedAt}>{formatBlogDate(hivePost.publishedAt)}</time>{hivePost.readingTimeMinutes ? ` · ${hivePost.readingTimeMinutes} min read` : ""}</div>
          {hivePost.coverImage ? <div className="mt-8 overflow-hidden rounded-2xl">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={hivePost.coverImage} alt="" className="aspect-[16/9] w-full object-cover" /></div> : null}
        </article>
      </Section>
      <Section><article className="mx-auto max-w-3xl"><HiveTipTapRenderer content={hivePost.content} /></article></Section>
      <Section className="bg-brand-gray"><Card className="mx-auto max-w-3xl p-6"><div className="text-lg font-extrabold">Need help with your HVAC system?</div><p className="mt-2 text-black/70">GC Heating & Cooling is ready to help.</p><div className="mt-5 flex flex-wrap gap-3"><Button href="/schedule-service/" variant="primary">Schedule Service</Button><Button href="/resources" variant="secondary">Back to resources</Button></div></Card></Section>
    </>
  );

  const post = getPost(slug);
  if (!post) return notFound();

  return (
    <>
      <Section className="pt-10 sm:pt-14">
        <div className="max-w-3xl">
          <div className="text-xs font-bold text-black/65">{post.date}</div>
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
            <Button href="/schedule-service/" variant="primary" size="lg">
              Schedule Service
            </Button>
          </div>
        </div>
      </Section>

      <Section>
        <article className="max-w-3xl">
          {post.sections.map((section) => (
            <div key={section.heading} className="mt-10 first:mt-0">
              <h2 className="text-2xl font-extrabold tracking-tight">
                {section.heading}
              </h2>
              {section.paragraphs.map((p) => (
                <p
                  key={p.slice(0, 40)}
                  className="mt-4 leading-relaxed text-black/75"
                >
                  {p}
                </p>
              ))}
              {section.bullets ? (
                <ul className="mt-4 space-y-3 text-black/80">
                  {section.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span className="mt-0.5 shrink-0 text-brand-red">✓</span>
                      <span className="leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </article>
      </Section>

      <Section className="bg-brand-gray">
        <Card className="p-6">
          <div className="text-lg font-extrabold">Related services</div>
          <p className="mt-2 text-black/70">
            Ready to take the next step? These services cover everything
            discussed in this guide.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {post.related.map((r) => (
              <Button key={r.href} href={r.href} variant="secondary" size="sm">
                {r.label}
              </Button>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/schedule-service/" variant="primary" size="md">
              Schedule Service
            </Button>
            <Button href="/resources" variant="secondary" size="md">
              Back to resources
            </Button>
          </div>
        </Card>
      </Section>
    </>
  );
}
