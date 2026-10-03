"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminApi } from "@/lib/admin-client";
import { BASE_PATH } from "@/lib/site";
import RichEditor from "./RichEditor";
import SeoFields from "./SeoFields";
import ImageField from "./ImageField";
import PairList from "./PairList";

export interface ToolFormValue {
  name: string;
  cardDescription: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string;
  ogImage: string;
  introHtml: string;
  extraHtml: string;
  steps: string[];
  features: [string, string][];
  useCases: string[];
  faqs: [string, string][];
}

const lines = (s: string) => s.split("\n").map((l) => l.trim()).filter(Boolean);

export default function ToolForm({
  slug,
  initial,
  customised,
  defaults,
}: {
  slug: string;
  initial: ToolFormValue;
  customised: boolean;
  defaults: { title: string; description: string };
}) {
  const router = useRouter();
  const [v, setV] = useState(initial);
  const [steps, setSteps] = useState(initial.steps.join("\n"));
  const [useCases, setUseCases] = useState(initial.useCases.join("\n"));
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const set = <K extends keyof ToolFormValue>(k: K, val: ToolFormValue[K]) => setV((p) => ({ ...p, [k]: val }));

  const save = async () => {
    setBusy(true);
    const r = await adminApi("saveTool", { slug, override: { ...v, steps: lines(steps), useCases: lines(useCases) } });
    setBusy(false);
    setMsg(r.ok ? "Saved ✓ — live now" : r.error || "Error");
    if (r.ok) router.refresh();
  };

  const reset = async () => {
    if (!confirm("Reset this tool to the default content?")) return;
    await adminApi("resetTool", { slug });
    window.location.reload();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3 justify-between">
        <h1 className="text-3xl font-extrabold">Edit: {v.name}</h1>
        <div className="flex gap-3 items-center">
          {msg && <span className="text-green-700 font-semibold">{msg}</span>}
          <a href={`${BASE_PATH}/${slug}/`} target="_blank" className="btn-secondary !py-2 !px-4 text-sm">View ↗</a>
          {customised && <button type="button" onClick={reset} className="btn-secondary !py-2 !px-4 text-sm">Reset to default</button>}
          <button type="button" onClick={save} disabled={busy} className="btn-primary !py-2 !px-6 disabled:opacity-50">{busy ? "Saving…" : "Save"}</button>
        </div>
      </div>

      <div className="admin-card space-y-4">
        <h2 className="admin-h2">Basic</h2>
        <div>
          <span className="admin-label">Tool name (used in headings, FAQ and menus)</span>
          <input className="input-field" value={v.name} onChange={(e) => set("name", e.target.value)} />
        </div>
        <div>
          <span className="admin-label">Short description (homepage card)</span>
          <textarea className="input-field" rows={2} value={v.cardDescription} onChange={(e) => set("cardDescription", e.target.value)} />
        </div>
        <ImageField label="Social share image (optional)" value={v.ogImage} onChange={(u) => set("ogImage", u)} />
      </div>

      <SeoFields
        path={`/${slug}/`}
        fallbackTitle={defaults.title}
        fallbackDescription={defaults.description}
        value={{ seoTitle: v.seoTitle, seoDescription: v.seoDescription, keywords: v.keywords }}
        onChange={(s) => setV((p) => ({ ...p, ...s }))}
      />

      <div className="admin-card space-y-3">
        <h2 className="admin-h2">&quot;What is {v.name}?&quot; content</h2>
        <p className="text-sm text-gray-500">Start with a direct one-sentence answer. Google and AI chatbots quote the first paragraph.</p>
        <RichEditor value={v.introHtml} onChange={(h) => set("introHtml", h)} />
      </div>

      <div className="admin-card space-y-3">
        <h2 className="admin-h2">How to use – steps (one per line)</h2>
        <textarea className="input-field font-mono text-sm" rows={6} value={steps} onChange={(e) => setSteps(e.target.value)} />
      </div>

      <div className="admin-card space-y-3">
        <h2 className="admin-h2">Key features</h2>
        <PairList value={v.features} onChange={(f) => set("features", f)} labels={["Feature title", "Feature description"]} addLabel="Add feature" />
      </div>

      <div className="admin-card space-y-3">
        <h2 className="admin-h2">Who uses it – use cases (one per line)</h2>
        <textarea className="input-field font-mono text-sm" rows={5} value={useCases} onChange={(e) => setUseCases(e.target.value)} />
      </div>

      <div className="admin-card space-y-3">
        <h2 className="admin-h2">Extra content (optional, shown after use cases)</h2>
        <RichEditor value={v.extraHtml} onChange={(h) => set("extraHtml", h)} />
      </div>

      <div className="admin-card space-y-3">
        <h2 className="admin-h2">FAQ</h2>
        <p className="text-sm text-gray-500">3 standard FAQs (free?, privacy, mobile) are added automatically. All FAQs are added to FAQPage schema for Google rich results.</p>
        <PairList value={v.faqs} onChange={(f) => set("faqs", f)} labels={["Question", "Answer"]} addLabel="Add FAQ" multiline />
      </div>

      <div className="flex justify-end gap-3 items-center">
        {msg && <span className="text-green-700 font-semibold">{msg}</span>}
        <button type="button" onClick={save} disabled={busy} className="btn-primary disabled:opacity-50">{busy ? "Saving…" : "Save"}</button>
      </div>
    </div>
  );
}
