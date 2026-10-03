"use client";

import { useRef, useState } from "react";
import { PDFDocument } from "pdf-lib";
import FileUpload from "@/components/FileUpload";
import { openPdf, renderPageToCanvas, canvasToJpegBytes, type PdfjsDoc } from "@/lib/pdfjs";
import { downloadPdfBytes } from "@/lib/pdf-utils";

interface Rect { x: number; y: number; w: number; h: number }
interface PagePreview { src: string; width: number; height: number }

export default function RedactPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [doc, setDoc] = useState<PdfjsDoc | null>(null);
  const [pages, setPages] = useState<PagePreview[]>([]);
  const [rects, setRects] = useState<Record<number, Rect[]>>({});
  const [drawing, setDrawing] = useState<{ page: number; sx: number; sy: number; r: Rect } | null>(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const bytesRef = useRef<ArrayBuffer | null>(null);

  const load = async (f: File) => {
    setFile(f);
    setLoading(true);
    try {
      const ab = await f.arrayBuffer();
      bytesRef.current = ab;
      const pdf = await openPdf(ab);
      setDoc(pdf);
      const list: PagePreview[] = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const { canvas, width, height } = await renderPageToCanvas(pdf, i, 1.3);
        list.push({ src: canvas.toDataURL("image/jpeg", 0.85), width, height });
      }
      setPages(list);
      setRects({});
    } catch (err) {
      alert("Error loading PDF: " + (err instanceof Error ? err.message : "Unknown error"));
      setFile(null);
    } finally {
      setLoading(false);
    }
  };

  const point = (e: React.PointerEvent<HTMLDivElement>) => {
    const b = e.currentTarget.getBoundingClientRect();
    return { x: Math.min(1, Math.max(0, (e.clientX - b.left) / b.width)), y: Math.min(1, Math.max(0, (e.clientY - b.top) / b.height)) };
  };

  const searchRedact = async () => {
    if (!doc || !search.trim()) return;
    const terms = search.split(",").map((t) => t.trim().toLowerCase()).filter(Boolean);
    const next = { ...rects };
    let found = 0;
    for (let i = 1; i <= doc.numPages; i++) {
      const page = await doc.getPage(i);
      const vp = page.getViewport({ scale: 1 });
      const content = await page.getTextContent();
      for (const item of content.items) {
        if (!("str" in item) || !item.str) continue;
        const lower = item.str.toLowerCase();
        for (const term of terms) {
          let idx = lower.indexOf(term);
          while (idx >= 0) {
            const t = item.transform as number[];
            const fontH = item.height || Math.hypot(t[2], t[3]);
            const charW = item.width / item.str.length;
            const [x1, y1] = vp.convertToViewportPoint(t[4] + charW * idx, t[5] - fontH * 0.25);
            const [x2, y2] = vp.convertToViewportPoint(t[4] + charW * (idx + term.length), t[5] + fontH * 0.95);
            const r = { x: Math.min(x1, x2) / vp.width, y: Math.min(y1, y2) / vp.height, w: Math.abs(x2 - x1) / vp.width, h: Math.abs(y2 - y1) / vp.height };
            next[i - 1] = [...(next[i - 1] || []), r];
            found++;
            idx = lower.indexOf(term, idx + term.length);
          }
        }
      }
    }
    setRects(next);
    alert(found ? `${found} match(es) marked for redaction.` : "No matches found.");
  };

  const apply = async () => {
    if (!doc || !bytesRef.current) return;
    setProcessing(true);
    try {
      let src: PDFDocument | null = null;
      try { src = await PDFDocument.load(bytesRef.current, { ignoreEncryption: true }); } catch { src = null; }
      const out = await PDFDocument.create();
      for (let i = 0; i < pages.length; i++) {
        const list = rects[i] || [];
        if (!list.length && src) {
          const [p] = await out.copyPages(src, [i]);
          out.addPage(p);
          continue;
        }
        const { canvas, width, height } = await renderPageToCanvas(doc, i + 1, 2.5);
        const ctx = canvas.getContext("2d")!;
        ctx.fillStyle = "#000";
        list.forEach((r) => ctx.fillRect(r.x * canvas.width, r.y * canvas.height, r.w * canvas.width, r.h * canvas.height));
        const img = await out.embedJpg(await canvasToJpegBytes(canvas, 0.92));
        out.addPage([width, height]).drawImage(img, { x: 0, y: 0, width, height });
      }
      downloadPdfBytes(await out.save(), `redacted-${file?.name || "document.pdf"}`);
    } catch (err) {
      alert("Error: " + (err instanceof Error ? err.message : "Unknown error"));
    } finally {
      setProcessing(false);
    }
  };

  const total = Object.values(rects).reduce((n, l) => n + l.length, 0);

  return (
    <div className="tool-container" style={{ maxWidth: 1100 }}>
      <div className="text-center mb-10">
        <h1 className="page-title mb-3">Redact PDF</h1>
        <p className="page-desc">Permanently black out sensitive text, numbers and images. Redacted content is removed — it cannot be copied or recovered.</p>
      </div>
      {!file ? (
        <FileUpload accept=".pdf" onFilesSelected={(f) => load(f[0])} label="Select PDF file" />
      ) : loading ? (
        <p className="text-center text-gray-500 text-lg">Loading pages...</p>
      ) : (
        <div>
          <div className="sticky top-20 z-40 bg-white border-2 border-gray-100 rounded-2xl p-4 mb-6 shadow-sm flex flex-wrap gap-3 items-center">
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Find text to redact (comma separated, e.g. name, 9876543210)" className="input-field flex-1 min-w-60" />
            <button onClick={searchRedact} className="btn-secondary">Mark matches</button>
            <button onClick={() => setRects({})} className="px-4 py-3 rounded-xl border-2 border-gray-200 font-semibold">Clear all</button>
            <button onClick={apply} disabled={!total || processing} className="btn-primary disabled:opacity-50" style={{ padding: "12px 28px", fontSize: 17 }}>
              {processing ? "Redacting..." : `Redact (${total})`}
            </button>
          </div>
          <p className="text-center text-gray-500 mb-6">Drag on a page to draw a black box. Click a box to remove it.</p>
          <div className="space-y-8">
            {pages.map((p, i) => (
              <div key={i} className="mx-auto shadow-lg border border-gray-200 bg-white" style={{ maxWidth: Math.min(800, p.width * 1.3) }}>
                <div
                  className="relative select-none touch-none cursor-crosshair"
                  onPointerDown={(e) => {
                    if ((e.target as HTMLElement).dataset.rect) return;
                    e.currentTarget.setPointerCapture(e.pointerId);
                    const s = point(e);
                    setDrawing({ page: i, sx: s.x, sy: s.y, r: { x: s.x, y: s.y, w: 0, h: 0 } });
                  }}
                  onPointerMove={(e) => {
                    if (!drawing || drawing.page !== i) return;
                    const c = point(e);
                    setDrawing({ ...drawing, r: { x: Math.min(c.x, drawing.sx), y: Math.min(c.y, drawing.sy), w: Math.abs(c.x - drawing.sx), h: Math.abs(c.y - drawing.sy) } });
                  }}
                  onPointerUp={() => {
                    if (drawing && drawing.page === i && drawing.r.w > 0.005 && drawing.r.h > 0.003) {
                      setRects((prev) => ({ ...prev, [i]: [...(prev[i] || []), drawing.r] }));
                    }
                    setDrawing(null);
                  }}
                >
                  <img src={p.src} alt={`Page ${i + 1}`} className="w-full block pointer-events-none" draggable={false} />
                  {[...(rects[i] || []), ...(drawing?.page === i ? [drawing.r] : [])].map((r, j) => (
                    <div key={j} data-rect="1" title="Click to remove"
                      onClick={() => j < (rects[i] || []).length && setRects((prev) => ({ ...prev, [i]: prev[i].filter((_, k) => k !== j) }))}
                      className="absolute bg-black/85 hover:bg-red-600/80 cursor-pointer"
                      style={{ left: `${r.x * 100}%`, top: `${r.y * 100}%`, width: `${r.w * 100}%`, height: `${r.h * 100}%` }} />
                  ))}
                </div>
                <p className="text-center text-sm text-gray-500 py-2">Page {i + 1}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
