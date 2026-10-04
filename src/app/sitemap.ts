import type { MetadataRoute } from "next";
import { getDb, PAGE_KEYS } from "@/lib/store";
import { tools } from "@/lib/tools";
import { SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const db = await getDb();
  const lastTool = new Date("2026-10-04");
  const posts = db.posts.filter((p) => p.published);
  return [
    { url: `${SITE_URL}/`, lastModified: lastTool, changeFrequency: "weekly", priority: 1 },
    ...tools.map((t) => ({ url: `${SITE_URL}${t.href}/`, lastModified: lastTool, changeFrequency: "monthly" as const, priority: 0.9 })),
    { url: `${SITE_URL}/blog/`, lastModified: posts[0] ? new Date(posts[0].updatedAt) : lastTool, changeFrequency: "weekly", priority: 0.7 },
    ...posts.map((p) => ({ url: `${SITE_URL}/blog/${p.slug}/`, lastModified: new Date(p.updatedAt), changeFrequency: "monthly" as const, priority: 0.6 })),
    ...PAGE_KEYS.map((k) => ({ url: `${SITE_URL}/${k}/`, lastModified: new Date(db.pages[k].updatedAt), changeFrequency: "yearly" as const, priority: 0.3 })),
  ];
}
