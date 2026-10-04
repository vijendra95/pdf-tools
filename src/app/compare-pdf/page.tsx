"use client";

import { useState } from "react";
import { diffWords, type Change } from "diff";
import { openPdf, extractAllText, renderPageToCanvas } from "@/lib/pdfjs";

interface VisualPage {
  a: string | null;
  b: string | null;
  diff: string | null;
  changedPct: number;
}

function PickBox({ label, file, onPick }: { label: string; file: File | null; onPick: (f: File) => void }) {
  return (
    <label className="upload-zone p-8 text-center cursor-pointer block">
      <div className="text-5xl mb-3">📄</div>
      <p className="font-bold text-lg mb-1">{label}</p>
      <p className="text-gray-500 text-sm break-all">{file ? file.name : "Click to select PDF"}</p>
      <input type="file" accept=".pdf" className="hidden" onChange={(e) => e.target.files?.[0] && onPick(e.target.files[0])} />
    </label>
  );
}

export default function ComparePDF() {
  const [fileA, setFileA] = useState<File | null>(null);
  const [fileB, setFileB] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [changes, setChanges] = useState<Change[] | null>(null);
  const [visual, setVisual] = useState<VisualPage[]>([]);
  const [view, setView] = useState<"text" | "visual">("text");

  const compare = async () => {
    if (!fileA || !fileB) return;
    setProcessing(true);
    try {
      const [pa, pb] = await Promise.all([openPdf(await fileA.arrayBuffer()), openPdf(await fileB.arrayBuffer())]);
      const [ta, tb] = await Promise.all([extractAllText(pa), extractAllText(pb)]);
      setChanges(diffWords(ta.join("\n\n"), tb.join("\n\n")));

      const pages: VisualPage[] = [];
      const max = Math.max(pa.numPages, pb.numPages);
      for (let i = 1; i <= max; i++) {
        const ca = i <= pa.numPages ? (await renderPageToCanvas(pa, i, 1)).canvas : null;
        const cb = i <= pb.numPages ? (await renderPageToCanvas(pb, i, 1)).canvas : null;
        let diffUrl: string | null = null;
        let changedPct = 100;
        if (ca && cb) {
          const w = Math.max(ca.width, cb.width);
          const h = Math.max(ca.height, cb.height);
          const mk = (c: HTMLCanvasElement) => {
            const t = document.createElement("canvas");
            t.width = w;
            t.height = h;
            const x = t.getContext("2d")!;
            x.fillStyle = "#fff";
            x.fillRect(0, 0, w, h);
            x.drawImage(c, 0, 0);
            return x.getImageData(0, 0, w, h);
          };
          const da = mk(ca);
          const db = mk(cb);
          const out = new ImageData(w, h);
          let changed = 0;
          for (let p = 0; p < da.data.length; p += 4) {
            const d = Math.abs(da.data[p] - db.data[p]) + Math.abs(da.data[p + 1] - db.data[p + 1]) + Math.abs(da.data[p + 2] - db.data[p + 2]);
            if (d > 90) {
              changed++;
              out.data[p] = 239;
              out.data[p + 1] = 68;
              out.data[p + 2] = 68;
              out.data[p + 3] = 255;
            } else {
              const g = 255 - (255 - (da.data[p] + da.data[p + 1] + da.data[p + 2]) / 3) * 0.25;
              out.data[p] = g;
              out.data[p + 1] = g;
              out.data[p + 2] = g;
              out.data[p + 3] = 255;
            }
          }
          changedPct = (changed / (w * h)) * 100;
          const oc = document.createElement("canvas");
          oc.width = w;
          oc.height = h;
          oc.getContext("2d")!.putImageData(out, 0, 0);
          diffUrl = oc.toDataURL("image/png");
        }
        pages.push({ a: ca?.toDataURL("image/jpeg", 0.8) ?? null, b: cb?.toDataURL("image/jpeg", 0.8) ?? null, diff: diffUrl, changedPct });
      }
      setVisual(pages);
    } catch (err) {
      alert("Error comparing PDFs: " + (err instanceof Error ? err.message : "Unknown error"));
    } finally {
      setProcessing(false);
    }
  };

  const added = changes?.filter((c) => c.added).reduce((n, c) => n + c.value.trim().split(/\s+/).filter(Boolean).length, 0) ?? 0;
  const removed = changes?.filter((c) => c.removed).reduce((n, c) => n + c.value.trim().split(/\s+/).filter(Boolean).length, 0) ?? 0;

  return (
    <div className="tool-container" style={{ maxWidth: 1200 }}>
      <div className="text-center mb-10">
        <h1 className="page-title mb-3">Compare PDF</h1>
        <p className="page-desc">Find the differences between two PDF files — text changes and visual changes side by side.</p>
      </div>

      {!changes ? (
        <div className="max-w-3xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <PickBox label="Original PDF" file={fileA} onPick={setFileA} />
            <PickBox label="Changed PDF" file={fileB} onPick={setFileB} />
          </div>
          <div className="text-center">
            <button onClick={compare} disabled={!fileA || !fileB || processing} className="btn-primary disabled:opacity-50">
              {processing ? "Comparing..." : "Compare PDF"}
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-wrap gap-4 justify-center items-center mb-6">
            <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold">+{added} words added</span>
            <span className="px-4 py-2 rounded-full bg-red-100 text-red-700 font-semibold">−{removed} words removed</span>
            <div className="flex gap-2">
              {(["text", "visual"] as const).map((v) => (
                <button key={v} onClick={() => setView(v)}
                  className={`px-5 py-2 rounded-xl font-semibold border-2 ${view === v ? "bg-red-500 text-white border-red-500" : "bg-white border-gray-200"}`}>
                  {v === "text" ? "Text changes" : "Visual changes"}
                </button>
              ))}
            </div>
            <button onClick={() => { setChanges(null); setVisual([]); }} className="btn-secondary">Compare other files</button>
          </div>

          {view === "text" ? (
            <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 whitespace-pre-wrap leading-relaxed text-base">
              {added === 0 && removed === 0 && <p className="text-green-700 font-bold mb-4">No text differences found.</p>}
              {changes.map((c, i) => (
                <span key={i} className={c.added ? "bg-green-200 text-green-900" : c.removed ? "bg-red-200 text-red-900 line-through" : ""}>{c.value}</span>
              ))}
            </div>
          ) : (
            <div className="space-y-10">
              {visual.map((p, i) => (
                <div key={i}>
                  <p className="font-bold mb-3">
                    Page {i + 1}{" "}
                    <span className={`text-sm font-semibold ${p.changedPct > 0.01 ? "text-red-600" : "text-green-600"}`}>
                      {p.a && p.b ? (p.changedPct > 0.01 ? `${p.changedPct.toFixed(2)}% changed` : "no visual change") : "page only in one file"}
                    </span>
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    {[["Original", p.a], ["Changed", p.b], ["Differences (red)", p.diff]].map(([label, src]) => (
                      <div key={label as string} className="border-2 border-gray-100 rounded-xl overflow-hidden bg-white">
                        <p className="text-sm font-semibold text-center py-2 bg-gray-50">{label}</p>
                        {src ? <img src={src as string} alt={label as string} className="w-full" /> : <p className="p-10 text-center text-gray-400">—</p>}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
