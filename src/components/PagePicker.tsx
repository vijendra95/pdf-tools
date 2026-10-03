"use client";

import { useEffect, useState } from "react";
import { openPdf, renderPageToCanvas } from "@/lib/pdfjs";

export function parsePageList(input: string, max: number): Set<number> {
  const out = new Set<number>();
  for (const part of input.split(",")) {
    const m = part.trim().match(/^(\d+)(?:\s*-\s*(\d+))?$/);
    if (!m) continue;
    const a = Math.max(1, parseInt(m[1], 10));
    const b = Math.min(max, m[2] ? parseInt(m[2], 10) : a);
    for (let i = Math.min(a, b); i <= Math.max(a, b); i++) if (i <= max) out.add(i - 1);
  }
  return out;
}

export function formatPageList(pages: Set<number>): string {
  const sorted = [...pages].sort((a, b) => a - b).map((p) => p + 1);
  const parts: string[] = [];
  for (let i = 0; i < sorted.length; i++) {
    const start = sorted[i];
    while (i + 1 < sorted.length && sorted[i + 1] === sorted[i] + 1) i++;
    parts.push(start === sorted[i] ? `${start}` : `${start}-${sorted[i]}`);
  }
  return parts.join(", ");
}

interface Props {
  file: File;
  selected: Set<number>;
  onChange: (s: Set<number>) => void;
  onPageCount: (n: number) => void;
  tone: "remove" | "keep";
}

export default function PagePicker({ file, selected, onChange, onPageCount, tone }: Props) {
  const [thumbs, setThumbs] = useState<string[]>([]);
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const pdf = await openPdf(await file.arrayBuffer());
      if (cancelled) return;
      setCount(pdf.numPages);
      onPageCount(pdf.numPages);
      const urls: string[] = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const { canvas } = await renderPageToCanvas(pdf, i, 0.3);
        if (cancelled) return;
        urls.push(canvas.toDataURL("image/jpeg", 0.7));
        setThumbs([...urls]);
      }
    })().catch((e) => alert("Error reading PDF: " + (e instanceof Error ? e.message : e)));
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const [shown, setShown] = useState(selected);
  if (shown !== selected) {
    setShown(selected);
    setText(formatPageList(selected));
  }

  const toggle = (i: number) => {
    const next = new Set(selected);
    if (next.has(i)) next.delete(i);
    else next.add(i);
    onChange(next);
  };

  const active = tone === "remove" ? "border-red-500 ring-2 ring-red-300" : "border-green-500 ring-2 ring-green-300";

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <label className="font-semibold text-gray-700" htmlFor="page-list">
          Pages:
        </label>
        <input
          id="page-list"
          className="input-field flex-1 min-w-[200px]"
          placeholder="e.g. 1, 3, 5-8"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={() => onChange(parsePageList(text, count))}
          onKeyDown={(e) => e.key === "Enter" && onChange(parsePageList(text, count))}
        />
        <button type="button" className="btn-secondary" onClick={() => onChange(new Set(Array.from({ length: count }, (_, i) => i)))}>
          Select all
        </button>
        <button type="button" className="btn-secondary" onClick={() => onChange(new Set())}>
          Clear
        </button>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mb-8">
        {Array.from({ length: count }, (_, i) => (
          <button
            type="button"
            key={i}
            onClick={() => toggle(i)}
            className={`relative bg-white border-2 rounded-xl p-2 transition ${selected.has(i) ? active : "border-gray-200 hover:border-gray-400"}`}
          >
            {thumbs[i] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={thumbs[i]} alt={`Page ${i + 1}`} className={`w-full rounded ${selected.has(i) && tone === "remove" ? "opacity-40" : ""}`} />
            ) : (
              <div className="aspect-[3/4] bg-gray-100 rounded animate-pulse" />
            )}
            <span className="block mt-1 text-sm font-semibold text-gray-600">Page {i + 1}</span>
            {selected.has(i) && (
              <span className={`absolute top-1 right-1 w-6 h-6 rounded-full text-white text-sm flex items-center justify-center ${tone === "remove" ? "bg-red-500" : "bg-green-500"}`}>
                {tone === "remove" ? "✕" : "✓"}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
