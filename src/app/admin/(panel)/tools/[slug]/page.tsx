import { notFound } from "next/navigation";
import { getDb } from "@/lib/store";
import { resolveTool } from "@/lib/tool-content/resolve";
import ToolForm from "@/components/admin/ToolForm";

export default async function EditTool({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const db = await getDb();
  const r = resolveTool(slug, db);
  if (!r) notFound();
  const o = db.tools[slug] || {};
  return (
    <ToolForm
      slug={slug}
      customised={!!db.tools[slug]}
      defaults={{ title: r.defaultTitle, description: r.defaultDescription }}
      initial={{
        name: r.name,
        cardDescription: r.cardDescription,
        seoTitle: o.seoTitle || r.title,
        seoDescription: o.seoDescription || r.description,
        keywords: r.keywords.join(", "),
        ogImage: r.ogImage || "",
        introHtml: r.introHtml || r.intro.map((p) => `<p>${p}</p>`).join(""),
        extraHtml: r.extraHtml || "",
        steps: r.steps,
        features: r.features,
        useCases: r.useCases,
        faqs: r.faqs,
      }}
    />
  );
}
