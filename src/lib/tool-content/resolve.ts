import type { DB } from "@/lib/store";
import { tools } from "@/lib/tools";
import { toolContent } from ".";
import type { ToolInfo } from "./types";

export interface ResolvedTool extends ToolInfo {
  slug: string;
  introHtml?: string;
  extraHtml?: string;
  ogImage?: string;
  cardDescription: string;
  defaultTitle: string;
  defaultDescription: string;
}

export function resolveTool(slug: string, db: DB): ResolvedTool | null {
  const base = toolContent[slug];
  if (!base) return null;
  const o = db.tools[slug] || {};
  const reg = tools.find((t) => t.href === `/${slug}`);
  return {
    ...base,
    slug,
    name: o.name || base.name,
    title: o.seoTitle || base.title,
    description: o.seoDescription || base.description,
    keywords: o.keywords ? o.keywords.split(",").map((k) => k.trim()).filter(Boolean) : base.keywords,
    steps: o.steps?.length ? o.steps : base.steps,
    features: o.features?.length ? o.features : base.features,
    useCases: o.useCases?.length ? o.useCases : base.useCases,
    faqs: o.faqs?.length ? o.faqs : base.faqs,
    introHtml: o.introHtml,
    extraHtml: o.extraHtml,
    ogImage: o.ogImage,
    cardDescription: o.cardDescription || reg?.description || base.description,
    defaultTitle: base.title,
    defaultDescription: base.description,
  };
}
