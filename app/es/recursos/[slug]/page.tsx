import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { POSTS, getPost } from "@/lib/posts.es";
import { BUSINESS } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import { HiveTipTapRenderer } from "@/components/HiveTipTapRenderer";
import { formatBlogDate, getAllBlogPosts, getBlogPost } from "@/lib/hive-blog";

export const dynamicParams = true;

export async function generateStaticParams() {
  const hivePosts = await getAllBlogPosts("es");
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
    path: `/es/recursos/${hivePost.slug}`,
    image: hivePost.ogImage || hivePost.coverImage || undefined,
  });
  const post = getPost(slug);
  if (!post) return {};
  return buildMetadata({
    title: `${post.title} | GC Heating & Cooling`,
    description: post.description,
    path: `/es/recursos/${post.slug}`,
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
          <div className="text-xs font-bold uppercase tracking-wide text-brand-red">{hivePost.category?.name || "Recursos"}</div>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">{hivePost.title}</h1>
          <p className="mt-4 text-lg text-black/70">{hivePost.excerpt}</p>
          <div className="mt-4 text-sm text-black/55"><time dateTime={hivePost.publishedAt}>{formatBlogDate(hivePost.publishedAt, "es-US")}</time>{hivePost.readingTimeMinutes ? ` · ${hivePost.readingTimeMinutes} min de lectura` : ""}</div>
          {hivePost.coverImage ? <div className="mt-8 overflow-hidden rounded-2xl">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={hivePost.coverImage} alt="" className="aspect-[16/9] w-full object-cover" /></div> : null}
        </article>
      </Section>
      <Section><article className="mx-auto max-w-3xl"><HiveTipTapRenderer content={hivePost.content} /></article></Section>
      <Section className="bg-brand-gray"><Card className="mx-auto max-w-3xl p-6"><div className="text-lg font-extrabold">¿Necesita ayuda con su sistema HVAC?</div><p className="mt-2 text-black/70">GC Heating & Cooling está listo para ayudarle.</p><div className="mt-5 flex flex-wrap gap-3"><Button href={BUSINESS.bookingUrl} variant="primary">Reservar ahora</Button><Button href="/es/recursos" variant="secondary">Volver a recursos</Button></div></Card></Section>
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
              Llamar {BUSINESS.phoneDisplay}
            </Button>
            <Button href={BUSINESS.bookingUrl} variant="primary" size="lg">
              Reserva ahora
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
          <div className="text-lg font-extrabold">Servicios relacionados</div>
          <p className="mt-2 text-black/70">
            ¿Listo para dar el siguiente paso? Estos servicios cubren todo.
            discutidos en esta guía.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {post.related.map((r) => (
              <Button key={r.href} href={r.href} variant="secondary" size="sm">
                {r.label}
              </Button>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button href={BUSINESS.bookingUrl} variant="primary" size="md">
              Reserva ahora
            </Button>
            <Button href="/es/recursos" variant="secondary" size="md">
              Volver a recursos
            </Button>
          </div>
        </Card>
      </Section>
    </>
  );
}
