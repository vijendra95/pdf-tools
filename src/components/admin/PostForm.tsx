"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminApi } from "@/lib/admin-client";
import { BASE_PATH } from "@/lib/site";
import type { Post } from "@/lib/store";
import RichEditor from "./RichEditor";
import SeoFields from "./SeoFields";
import ImageField from "./ImageField";

export default function PostForm({ initial }: { initial: Post }) {
  const router = useRouter();
  const [p, setP] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const set = <K extends keyof Post>(k: K, v: Post[K]) => setP((x) => ({ ...x, [k]: v }));

  const save = async (published = p.published) => {
    setBusy(true);
    const r = await adminApi<{ id?: string; slug?: string }>("savePost", { post: { ...p, published } });
    setBusy(false);
    if (!r.ok) return setMsg(r.error || "Error");
    setP((x) => ({ ...x, id: r.id || x.id, slug: r.slug || x.slug, published }));
    setMsg("Saved ✓");
    if (!p.id && r.id) router.replace(`/admin/blog/${r.id}`);
    router.refresh();
  };

  const del = async () => {
    if (!confirm("Delete this post?")) return;
    await adminApi("deletePost", { id: p.id });
    router.replace("/admin/blog");
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3 justify-between">
        <h1 className="text-3xl font-extrabold">{p.id ? "Edit post" : "New post"}</h1>
        <div className="flex gap-3 items-center">
          {msg && <span className="text-green-700 font-semibold">{msg}</span>}
          {p.id && p.published && <a href={`${BASE_PATH}/blog/${p.slug}/`} target="_blank" className="btn-secondary !py-2 !px-4 text-sm">View ↗</a>}
          {p.id && <button type="button" onClick={del} className="btn-secondary !py-2 !px-4 text-sm text-red-600">Delete</button>}
          <button type="button" onClick={() => save(false)} disabled={busy} className="btn-secondary !py-2 !px-4 text-sm">Save draft</button>
          <button type="button" onClick={() => save(true)} disabled={busy} className="btn-primary !py-2 !px-6 disabled:opacity-50">{busy ? "Saving…" : p.published ? "Update" : "Publish"}</button>
        </div>
      </div>

      <div className="admin-card space-y-4">
        <div>
          <span className="admin-label">Title (H1)</span>
          <input className="input-field text-lg" value={p.title} onChange={(e) => set("title", e.target.value)} />
        </div>
        <div>
          <span className="admin-label">URL slug</span>
          <input className="input-field" value={p.slug} placeholder="auto from title" onChange={(e) => set("slug", e.target.value)} />
        </div>
        <div>
          <span className="admin-label">Excerpt (shown on blog list)</span>
          <textarea className="input-field" rows={2} value={p.excerpt} onChange={(e) => set("excerpt", e.target.value)} />
        </div>
        <ImageField label="Cover image" value={p.coverImage} onChange={(u) => set("coverImage", u)} />
        <div>
          <span className="admin-label">Cover image alt text</span>
          <input className="input-field" value={p.coverAlt} onChange={(e) => set("coverAlt", e.target.value)} />
        </div>
      </div>

      <div className="admin-card space-y-3">
        <h2 className="admin-h2">Content</h2>
        <RichEditor value={p.contentHtml} onChange={(h) => set("contentHtml", h)} />
      </div>

      <SeoFields
        path={`/blog/${p.slug || "your-post"}/`}
        fallbackTitle={p.title}
        fallbackDescription={p.excerpt}
        value={{ seoTitle: p.seoTitle, seoDescription: p.seoDescription, keywords: p.keywords }}
        onChange={(s) => setP((x) => ({ ...x, ...s }))}
      />
    </div>
  );
}
