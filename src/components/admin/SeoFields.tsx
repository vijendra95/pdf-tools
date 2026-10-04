"use client";

import { SITE_URL } from "@/lib/site";

export interface SeoValue {
  seoTitle: string;
  seoDescription: string;
  keywords: string;
}

function Counter({ n, min, max }: { n: number; min: number; max: number }) {
  const color = n === 0 ? "text-gray-400" : n < min || n > max ? "text-amber-600" : "text-green-600";
  return (
    <span className={`text-xs font-semibold ${color}`}>
      {n} chars (best {min}–{max})
    </span>
  );
}

export default function SeoFields({
  value,
  onChange,
  path,
  fallbackTitle,
  fallbackDescription,
}: {
  value: SeoValue;
  onChange: (v: SeoValue) => void;
  path: string;
  fallbackTitle: string;
  fallbackDescription: string;
}) {
  const title = value.seoTitle || fallbackTitle;
  const desc = value.seoDescription || fallbackDescription;
  return (
    <div className="admin-card space-y-4">
      <h2 className="admin-h2">SEO</h2>
      <div>
        <div className="flex justify-between">
          <span className="admin-label">SEO title</span>
          <Counter n={value.seoTitle.length} min={30} max={60} />
        </div>
        <input className="input-field" value={value.seoTitle} placeholder={fallbackTitle} onChange={(e) => onChange({ ...value, seoTitle: e.target.value })} />
      </div>
      <div>
        <div className="flex justify-between">
          <span className="admin-label">Meta description</span>
          <Counter n={value.seoDescription.length} min={120} max={160} />
        </div>
        <textarea className="input-field" rows={3} value={value.seoDescription} placeholder={fallbackDescription} onChange={(e) => onChange({ ...value, seoDescription: e.target.value })} />
      </div>
      <div>
        <span className="admin-label">Keywords (comma separated)</span>
        <input className="input-field" value={value.keywords} onChange={(e) => onChange({ ...value, keywords: e.target.value })} />
      </div>
      <div className="rounded-xl border bg-white p-4">
        <p className="text-xs text-gray-500 mb-1">Google preview</p>
        <p className="text-sm text-green-700 truncate">{SITE_URL}{path}</p>
        <p className="text-lg text-blue-700 leading-snug truncate">{title}</p>
        <p className="text-sm text-gray-600 line-clamp-2">{desc}</p>
      </div>
    </div>
  );
}
