import { getDb, PAGE_KEYS } from "@/lib/store";
import { tools, categories } from "@/lib/tools";
import { resolveTool } from "@/lib/tool-content/resolve";
import { SITE_URL } from "@/lib/site";

export async function GET() {
  const db = await getDb();
  const s = db.settings;
  const out: string[] = [`# ${s.siteName}`, "", `> ${s.homeDescription}`, ""];
  out.push(
    "All tools are free, need no sign-up and process files locally in the browser (files are not uploaded). Translate PDF is the only tool that sends extracted text to an external translation service.",
    "",
  );
  for (const c of categories.filter((c) => c !== "All")) {
    const list = tools.filter((t) => t.category === c);
    if (!list.length) continue;
    out.push(`## ${c}`, "");
    for (const t of list) {
      const r = resolveTool(t.href.slice(1), db);
      out.push(`- [${r?.name || t.name}](${SITE_URL}${t.href}/): ${r?.description || t.description}`);
    }
    out.push("");
  }
  const posts = db.posts.filter((p) => p.published);
  if (posts.length) {
    out.push("## Guides", "");
    posts.forEach((p) => out.push(`- [${p.title}](${SITE_URL}/blog/${p.slug}/): ${p.excerpt}`));
    out.push("");
  }
  out.push("## Pages", "");
  PAGE_KEYS.forEach((k) => out.push(`- [${db.pages[k].title}](${SITE_URL}/${k}/)`));
  return new Response(out.join("\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
