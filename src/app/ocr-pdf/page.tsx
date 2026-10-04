"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import FileUpload from "@/components/FileUpload";
import { openPdf, renderPageToCanvas } from "@/lib/pdfjs";
import { downloadBlob, downloadPdfBytes } from "@/lib/pdf-utils";

const LANGS: [string, string][] = [
  ["eng", "English"],
  ["hin", "Hindi"],
  ["eng+hin", "English + Hindi"],
  ["mar", "Marathi"],
  ["guj", "Gujarati"],
  ["pan", "Punjabi"],
  ["ben", "Bengali"],
  ["tam", "Tamil"],
  ["tel", "Telugu"],
  ["kan", "Kannada"],
  ["mal", "Malayalam"],
  ["urd", "Urdu"],
  ["ara", "Arabic"],
  ["fra", "French"],
  ["deu", "German"],
  ["spa", "Spanish"],
];

async function fileToCanvas(file: File) {
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.src = url;
  await img.decode();
  const c = document.createElement("canvas");
  c.width = img.naturalWidth;
  c.height = img.naturalHeight;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.drawImage(img, 0, 0);
  URL.revokeObjectURL(url);
  return { canvas: c, width: (img.naturalWidth * 72) / 150, height: (img.naturalHeight * 72) / 150 };
}

export default function OcrPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [lang, setLang] = useState("eng+hin");
  const [processing, setProcessing] = useState(false);
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{ pdf: Uint8Array; text: string } | null>(null);

  const runOcr = async () => {
    if (!file) return;
    setProcessing(true);
    setResult(null);
    try {
      const { createWorker } = await import("tesseract.js");
      setStatus("Loading OCR engine & language data...");
      const worker = await createWorker(lang.split("+"), 1, {
        logger: (m: { status: string; progress: number }) => {
          if (m.status === "recognizing text") setProgress(m.progress);
        },
      });

      const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
      const pdf = isPdf ? await openPdf(await file.arrayBuffer()) : null;
      const total = pdf ? pdf.numPages : 1;
      const out = await PDFDocument.create();
      const texts: string[] = [];

      for (let i = 1; i <= total; i++) {
        setStatus(`Recognizing text on page ${i} of ${total}...`);
        setProgress(0);
        const { canvas, width } = pdf ? await renderPageToCanvas(pdf, i, 2.5) : await fileToCanvas(file);
        const { data } = await worker.recognize(canvas, { pdfTitle: file.name }, { text: true, pdf: true });
        texts.push(data.text);
        if (data.pdf) {
          const pageDoc = await PDFDocument.load(new Uint8Array(data.pdf));
          const [page] = await out.copyPages(pageDoc, [0]);
          const factor = width / page.getWidth();
          page.scale(factor, factor);
          out.addPage(page);
        }
      }
      await worker.terminate();
      out.setTitle(file.name.replace(/\.[^.]+$/, ""));
      const bytes = await out.save();
      setResult({ pdf: bytes, text: texts.map((t, i) => `--- Page ${i + 1} ---\n${t}`).join("\n\n") });
      setStatus("");
    } catch (err) {
      alert("OCR failed: " + (err instanceof Error ? err.message : "Unknown error"));
    } finally {
      setProcessing(false);
    }
  };

  const base = file?.name.replace(/\.[^.]+$/, "") || "document";

  return (
    <div className="tool-container">
      <div className="text-center mb-10">
        <h1 className="page-title mb-3">OCR PDF</h1>
        <p className="page-desc">Convert scanned PDFs and images into searchable, selectable PDFs. Supports Hindi, English and 14 more languages.</p>
      </div>

      {!file ? (
        <FileUpload accept=".pdf,image/*" onFilesSelected={(f) => { setFile(f[0]); setResult(null); }} label="Select scanned PDF or image" />
      ) : !result ? (
        <div className="max-w-lg mx-auto text-center">
          <div className="file-card mb-6">
            <p className="file-name">📄 {file.name}</p>
          </div>
          <label className="setting-label text-left">Document language</label>
          <select value={lang} onChange={(e) => setLang(e.target.value)} className="input-field mb-6">
            {LANGS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
          <button onClick={runOcr} disabled={processing} className="btn-primary disabled:opacity-50">
            {processing ? "Processing..." : "Start OCR"}
          </button>
          {processing && (
            <div className="mt-6">
              <p className="text-gray-600 mb-2">{status}</p>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 transition-all" style={{ width: `${Math.round(progress * 100)}%` }} />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center">
          <div className="success-msg mb-6"><p>OCR complete! Your PDF is now searchable.</p></div>
          <div className="flex flex-wrap gap-4 justify-center mb-6">
            <button onClick={() => downloadPdfBytes(result.pdf, `${base}-ocr.pdf`)} className="btn-success">Download searchable PDF</button>
            <button onClick={() => downloadBlob(new Blob([result.text], { type: "text/plain;charset=utf-8" }), `${base}-ocr.txt`)} className="btn-secondary">Download text (.txt)</button>
            <button onClick={() => { setFile(null); setResult(null); }} className="btn-secondary">New file</button>
          </div>
          <textarea readOnly value={result.text} className="input-field h-80 font-mono text-sm" />
        </div>
      )}
    </div>
  );
}
