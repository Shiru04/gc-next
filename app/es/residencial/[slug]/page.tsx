import { notFound } from "next/navigation";
import { RESIDENTIAL_SERVICES, getServiceBySlug } from "@/lib/services.es";
import { ServiceDetail } from "@/components/sections/ServiceDetailSpanish";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return RESIDENTIAL_SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service || service.audience !== "residential") return {};
  return buildMetadata({
    title: service.seoTitle,
    description: service.seoDescription,
    path: `/es/residencial/${service.slug}`,
  });
}

export default async function ResidentialServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service || service.audience !== "residential") return notFound();
  return <ServiceDetail service={service} basePath="residential" />;
}
