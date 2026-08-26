import type { MetadataRoute } from "next";
import { SERVICE_AREAS } from "@/lib/areas";
import { POSTS as ENGLISH_LOCAL_POSTS } from "@/lib/posts";
import { POSTS as SPANISH_LOCAL_POSTS } from "@/lib/posts.es";
import { SERVICES } from "@/lib/services";
import { getAllBlogPosts } from "@/lib/hive-blog";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://gc-heatingandcooling.com").replace(/\/+$/, "");

function absolute(path: string) {
  const normalized = path === "/" ? "/" : `/${path.replace(/^\/+|\/+$/g, "")}/`;
  return `${SITE_URL}${normalized}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [englishBlogPosts, spanishBlogPosts] = await Promise.all([
    getAllBlogPosts("en"),
    getAllBlogPosts("es"),
  ]);

  const entries = new Map<string, MetadataRoute.Sitemap[number]>();
  const add = (path: string, lastModified?: string | Date) => {
    const url = absolute(path);
    entries.set(url, { url, ...(lastModified ? { lastModified } : {}) });
  };

  [
    "/", "/about", "/services", "/residential", "/commercial",
    "/service-areas", "/resources", "/reviews", "/financing", "/contact",
    "/promotions", "/promotions/repairs", "/promotions/tune-ups",
    "/promotions/new-installation", "/schedule-service", "/privacy-policy",
    "/es", "/es/acerca", "/es/servicios", "/es/residencial", "/es/comercial",
    "/es/areas-de-servicio", "/es/recursos", "/es/resenas",
    "/es/financiamiento", "/es/contacto", "/es/promociones",
    "/es/promociones/reparaciones", "/es/promociones/mantenimiento",
    "/es/promociones/instalacion-nueva", "/es/programar-servicio",
    "/es/politica-de-privacidad",
  ].forEach((path) => add(path));

  for (const service of SERVICES) {
    add(`/${service.audience}/${service.slug}`);
    add(`/es/${service.audience === "residential" ? "residencial" : "comercial"}/${service.slug}`);
  }

  for (const area of SERVICE_AREAS) {
    add(`/service-areas/${area.slug}`);
    add(`/es/areas-de-servicio/${area.slug}`);
  }

  for (const post of ENGLISH_LOCAL_POSTS) add(`/resources/${post.slug}`);
  for (const post of SPANISH_LOCAL_POSTS) add(`/es/recursos/${post.slug}`);

  for (const post of englishBlogPosts) {
    add(`/resources/${post.slug}`, post.updatedAt || post.publishedAt);
  }
  for (const post of spanishBlogPosts) {
    add(`/es/recursos/${post.slug}`, post.updatedAt || post.publishedAt);
  }

  return [...entries.values()];
}
