"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import FileUpload from "@/components/FileUpload";
import { openPdf, renderPageToCanvas, canvasToJpegBytes } from "@/lib/pdfjs";
import { downloadPdfBytes } from "@/lib/pdf-utils";

function findBytes(hay: Uint8Array, needle: string, fromEnd = false) {
  const n = new TextEncoder().encode(needle);
  const check = (i: number) => n.every((b, j) => hay[i + j] === b);
  if (fromEnd) {
    for (let i = hay.length - n.length; i >= 0; i--) if (check(i)) return i;
  } else {
    for (let i = 0; i <= Math.min(hay.length - n.length, 4096); i++) if (check(i)) return i;
  }
  return -1;
}

export default function RepairPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  const [result, setResult] = useState<Uint8Array | null>(null);

  const repair = async () => {
    if (!file) return;
    setProcessing(true);
    setResult(null);
    const steps: string[] = [];
    const add = (s: string) => { steps.push(s); setLog([...steps]); };
    try {
      let bytes = new Uint8Array(await file.arrayBuffer());
      const start = findBytes(bytes, "%PDF-");
      if (start < 0) add("⚠️ PDF header not found — trying anyway");
      else if (start > 0) { bytes = bytes.slice(start); add(`✔ Removed ${start} junk bytes before PDF header`); }
      if (findBytes(bytes, "%%EOF", true) < 0) {
        const fixed = new Uint8Array(bytes.length + 7);
        fixed.set(bytes);
        fixed.set(new TextEncoder().encode("\n%%EOF\n"), bytes.length);
        bytes = fixed;
        add("✔ Added missing end-of-file marker");
      }

      try {
        add("… Rebuilding PDF structure (cross-reference table, objects)");
        const src = await PDFDocument.load(bytes, { ignoreEncryption: true, throwOnInvalidObject: false, updateMetadata: false });
        if (src.getPageCount() === 0) throw new Error("no pages recovered");
        const out = await PDFDocument.create();
        const pages = await out.copyPages(src, src.getPageIndices());
        pages.forEach((p) => out.addPage(p));
        const saved = await out.save();
        add(`✔ Recovered ${pages.length} page(s) with original text and quality`);
        setResult(saved);
        return;
      } catch (e) {
        add(`✖ Structure rebuild failed (${e instanceof Error ? e.message : "error"}) — trying deep recovery`);
      }

      add("… Deep recovery: re-rendering every readable page");
      const pdf = await openPdf(bytes);
      const out = await PDFDocument.create();
      let ok = 0;
      for (let i = 1; i <= pdf.numPages; i++) {
        try {
          const { canvas, width, height } = await renderPageToCanvas(pdf, i, 2);
          const img = await out.embedJpg(await canvasToJpegBytes(canvas, 0.9));
          out.addPage([width, height]).drawImage(img, { x: 0, y: 0, width, height });
          ok++;
        } catch {
          add(`✖ Page ${i} is too damaged, skipped`);
        }
      }
      if (!ok) throw new Error("No pages could be recovered");
      add(`✔ Recovered ${ok} of ${pdf.numPages} page(s) as images`);
      setResult(await out.save());
    } catch (err) {
      add(`✖ Repair failed: ${err instanceof Error ? err.message : "Unknown error"}`);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="tool-container">
      <div className="text-center mb-10">
        <h1 className="page-title mb-3">Repair PDF</h1>
        <p className="page-desc">Repair a damaged or corrupt PDF and recover as much data as possible.</p>
      </div>
      {!file ? (
        <FileUpload accept=".pdf,application/pdf,application/octet-stream" onFilesSelected={(f) => { setFile(f[0]); setLog([]); setResult(null); }} label="Select damaged PDF" />
      ) : (
        <div className="max-w-xl mx-auto text-center">
          <div className="file-card mb-6"><p className="file-name">📄 {file.name}</p></div>
          {!result && (
            <button onClick={repair} disabled={processing} className="btn-primary disabled:opacity-50">{processing ? "Repairing..." : "Repair PDF"}</button>
          )}
          {log.length > 0 && (
            <div className="text-left bg-white border-2 border-gray-100 rounded-2xl p-5 mt-6 space-y-1 font-mono text-sm">
              {log.map((l, i) => <p key={i}>{l}</p>)}
            </div>
          )}
          {result && (
            <div className="mt-6 flex flex-wrap gap-4 justify-center">
              <button onClick={() => downloadPdfBytes(result, `repaired-${file.name.replace(/\.[^.]+$/, "")}.pdf`)} className="btn-success">Download repaired PDF</button>
              <button onClick={() => { setFile(null); setResult(null); setLog([]); }} className="btn-secondary">New file</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
