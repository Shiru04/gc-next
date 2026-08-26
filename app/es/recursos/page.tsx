import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { POSTS } from "@/lib/posts.es";
import { buildMetadata } from "@/lib/seo";
import { formatBlogDate, getBlogPosts } from "@/lib/hive-blog";

export const metadata = buildMetadata({
  title: "Recursos | Calefacción y refrigeración GC",
  description:
    "Consejos, guías y recursos útiles sobre HVAC para propietarios de viviendas en Los Ángeles y el condado de Orange.",
  path: "/es/recursos",
});

export default async function ResourcesPage() {
  const { items: hivePosts } = await getBlogPosts({ limit: 100, lang: "es" });
  const hiveSlugs = new Set(hivePosts.map((post) => post.slug));
  const articles = [
    ...hivePosts.map((post) => ({ slug: post.slug, title: post.title, description: post.excerpt, date: formatBlogDate(post.publishedAt, "es-US"), coverImage: post.coverImage })),
    ...POSTS.filter((post) => !hiveSlugs.has(post.slug)).map((post) => ({ ...post, coverImage: "" })),
  ];
  return (
    <>
      <Section className="pt-10 sm:pt-14">
        <div className="max-w-3xl">
          <div className="text-sm font-extrabold tracking-wide text-brand-red">
            RECURSOS
          </div>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Guías útiles sobre climatización
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-black/70">
            Contenido sencillo y práctico centrado en la comodidad, la eficiencia y lo común.
            Preguntas sobre HVAC en Los Ángeles y OC.
          </p>
        </div>
      </Section>

      {/* Articles grid */}
      <Section className="bg-brand-gray">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((p) => (
            <Card key={p.slug} className="flex flex-col overflow-hidden">
              {p.coverImage ? <div className="aspect-[16/9] overflow-hidden bg-black/5">{/* eslint-disable-next-line @next/next/no-img-element */}<img src={p.coverImage} alt="" className="h-full w-full object-cover" loading="lazy" /></div> : <div className="h-2 bg-gradient-to-r from-brand-red to-brand-red/60" />}
              <div className="flex flex-1 flex-col p-6">
                <div className="text-xs font-bold text-black/65">{p.date}</div>
                <h2 className="mt-2 text-xl font-extrabold leading-tight">
                  {p.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-black/70">
                  {p.description}
                </p>
                <div className="mt-5">
                  <Button
                    href={`/es/recursos/${p.slug}`}
                    variant="secondary"
                    size="md"
                  >
                    Leer artículo
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* PDF resources placeholder */}
      <Section>
        <div className="text-center">
          <h2 className="text-2xl font-extrabold sm:text-3xl">
            Documentos técnicos y guías
          </h2>
          <p className="mt-3 max-w-xl mx-auto text-black/70">
            Recursos descargables para propietarios de viviendas: listas de verificación de mantenimiento,
            guías de equipos y consejos de temporada.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border-2 border-dashed border-black/10 bg-brand-gray/50 p-10 text-center">
          <div className="text-sm font-semibold text-black/40">
            Recursos en PDF próximamente
          </div>
          <div className="mt-2 text-xs text-black/30">
            Las guías de HVAC y las listas de verificación de mantenimiento descargables estarán disponibles aquí
          </div>
        </div>
      </Section>
    </>
  );
}
