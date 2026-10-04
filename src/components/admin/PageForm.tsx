"use client";

import { useState } from "react";
import { adminApi } from "@/lib/admin-client";
import { BASE_PATH } from "@/lib/site";
import type { PageDoc } from "@/lib/store";
import RichEditor from "./RichEditor";
import SeoFields from "./SeoFields";

export default function PageForm({ pageKey, initial }: { pageKey: string; initial: PageDoc }) {
  const [p, setP] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  const save = async () => {
    setBusy(true);
    const r = await adminApi("savePage", { key: pageKey, page: p });
    setBusy(false);
    setMsg(r.ok ? "Saved ✓ — live now" : r.error || "Error");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3 justify-between">
        <h1 className="text-3xl font-extrabold">Edit page: {p.title}</h1>
        <div className="flex gap-3 items-center">
          {msg && <span className="text-green-700 font-semibold">{msg}</span>}
          <a href={`${BASE_PATH}/${pageKey}/`} target="_blank" className="btn-secondary !py-2 !px-4 text-sm">View ↗</a>
          <button type="button" onClick={save} disabled={busy} className="btn-primary !py-2 !px-6 disabled:opacity-50">{busy ? "Saving…" : "Save"}</button>
        </div>
      </div>
      <div className="admin-card space-y-4">
        <div>
          <span className="admin-label">Page title (H1)</span>
          <input className="input-field" value={p.title} onChange={(e) => setP({ ...p, title: e.target.value })} />
        </div>
        <RichEditor value={p.contentHtml} onChange={(h) => setP((x) => ({ ...x, contentHtml: h }))} />
      </div>
      <SeoFields
        path={`/${pageKey}/`}
        fallbackTitle={p.title}
        fallbackDescription=""
        value={{ seoTitle: p.seoTitle, seoDescription: p.seoDescription, keywords: "" }}
        onChange={(s) => setP((x) => ({ ...x, seoTitle: s.seoTitle, seoDescription: s.seoDescription }))}
      />
    </div>
  );
}
