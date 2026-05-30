import { notFound } from "next/navigation";
import { COMMERCIAL_SERVICES, getServiceBySlug } from "@/lib/services";
import { ServiceDetail } from "@/components/sections/ServiceDetail";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return COMMERCIAL_SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service || service.audience !== "commercial") return {};
  return buildMetadata({
    title: service.seoTitle,
    description: service.seoDescription,
    path: `/commercial/${service.slug}`,
  });
}

export default async function CommercialServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service || service.audience !== "commercial") return notFound();
  return <ServiceDetail service={service} basePath="commercial" />;
}
