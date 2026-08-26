import "server-only";

const API_URL = (process.env.HIVE_BLOG_API_URL ?? "").replace(/\/+$/, "");
const SITE_KEY = process.env.HIVE_BLOG_SITE_KEY ?? "";
const REVALIDATE_SECONDS = Number(process.env.HIVE_REVALIDATE_SECONDS ?? 3600);

export const isBlogConfigured = Boolean(API_URL && SITE_KEY);

export interface TipTapMark { type: string; attrs?: Record<string, unknown> }
export interface TipTapNode { type: string; content?: TipTapNode[]; text?: string; attrs?: Record<string, unknown>; marks?: TipTapMark[] }
export interface TipTapDoc { type: "doc"; content: TipTapNode[] }
export interface BlogCategory { _id: string; name: string; slug: string; description?: string }
export interface BlogTag { _id: string; name: string; slug: string }
export interface BlogPostSummary {
  title: string; slug: string; excerpt: string; coverImage: string;
  category: BlogCategory | null; tags: BlogTag[]; publishedAt: string;
  updatedAt: string; readingTimeMinutes: number; featured: boolean; language: string;
}
export interface BlogPostTranslation { language: string; slug: string; title: string }
export interface BlogPost extends BlogPostSummary {
  content: TipTapDoc | string; seoTitle: string; metaDescription: string;
  ogTitle: string; ogDescription: string; ogImage: string; index: boolean;
  translations: BlogPostTranslation[];
}
export interface BlogListResponse { items: BlogPostSummary[]; total: number; page: number; limit: number; totalPages: number }

async function apiFetch<T>(path: string, fallback: T): Promise<T> {
  if (!isBlogConfigured) return fallback;
  try {
    const response = await fetch(`${API_URL}${path}`, {
      headers: { "X-Site-Key": SITE_KEY },
      next: { revalidate: REVALIDATE_SECONDS, tags: ["hive-blog"] },
    });
    if (!response.ok) {
      console.warn(`[hive-blog] ${response.status} for ${path}`);
      return fallback;
    }
    return await response.json() as T;
  } catch (error) {
    console.warn(`[hive-blog] request failed for ${path}`, error);
    return fallback;
  }
}

const EMPTY_LIST: BlogListResponse = { items: [], total: 0, page: 1, limit: 100, totalPages: 0 };

export async function getBlogPosts(params: { limit?: number; page?: number; lang?: string } = {}) {
  const query = new URLSearchParams();
  if (params.limit) query.set("limit", String(params.limit));
  if (params.page) query.set("page", String(params.page));
  if (params.lang) query.set("lang", params.lang);
  const suffix = query.size ? `?${query}` : "";
  return apiFetch<BlogListResponse>(`/api/public/blog/posts${suffix}`, EMPTY_LIST);
}

export async function getAllBlogPosts(lang?: string) {
  const posts: BlogPostSummary[] = [];
  for (let page = 1; page <= 50; page += 1) {
    const response = await getBlogPosts({ limit: 100, page, lang });
    posts.push(...response.items);
    if (!response.items.length || page >= response.totalPages) break;
  }
  return posts;
}

export function getBlogPost(slug: string) {
  return apiFetch<BlogPost | null>(`/api/public/blog/posts/${encodeURIComponent(slug)}`, null);
}

export function formatBlogDate(iso: string, locale = "en-US") {
  if (!iso) return "";
  return new Intl.DateTimeFormat(locale, { year: "numeric", month: "long", day: "numeric" }).format(new Date(iso));
}

export function isTipTapDoc(value: unknown): value is TipTapDoc {
  return Boolean(value && typeof value === "object" && (value as TipTapDoc).type === "doc" && Array.isArray((value as TipTapDoc).content));
}
