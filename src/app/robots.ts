import type { MetadataRoute } from "next";
import { SITE_URL, BASE_PATH } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: `${BASE_PATH}/`, disallow: [`${BASE_PATH}/admin/`, `${BASE_PATH}/api/`] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
