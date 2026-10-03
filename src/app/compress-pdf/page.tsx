"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import FileUpload from "@/components/FileUpload";
import { openPdf, renderPageToCanvas, canvasToJpegBytes, formatBytes } from "@/lib/pdfjs";

type Level = "low" | "recommended" | "extreme";
const LEVELS: { id: Level; title: string; desc: string; scale: number; quality: number }[] = [
  { id: "low", title: "Less compression", desc: "High quality, text stays selectable", scale: 0, quality: 0 },
  { id: "recommended", title: "Recommended", desc: "Good quality, good compression", scale: 1.6, quality: 0.6 },
  { id: "extreme", title: "Extreme compression", desc: "Smallest size, lower quality", scale: 1.1, quality: 0.4 },
];

export default function CompressPDF() {
  const [file, setFile] = useState<File | null>(null);
  const [level, setLevel] = useState<Level>("recommended");
  const [processing, setProcessing] = useState(false);
  const [status, setStatus] = useState("");
  const [result, setResult] = useState<{ original: number; compressed: number; url: string } | null>(null);

  const compressPDF = async () => {
    if (!file) return;
    setProcessing(true);
    try {
      const ab = await file.arrayBuffer();
      const cfg = LEVELS.find((l) => l.id === level)!;
      let bytes: Uint8Array;
      if (cfg.id === "low") {
        const pdf = await PDFDocument.load(ab, { ignoreEncryption: true });
        bytes = await pdf.save({ useObjectStreams: true, addDefaultPage: false });
      } else {
        const src = await openPdf(ab);
        const out = await PDFDocument.create();
        for (let i = 1; i <= src.numPages; i++) {
          setStatus(`Compressing page ${i} of ${src.numPages}...`);
          const { canvas, width, height } = await renderPageToCanvas(src, i, cfg.scale);
          const img = await out.embedJpg(await canvasToJpegBytes(canvas, cfg.quality));
          out.addPage([width, height]).drawImage(img, { x: 0, y: 0, width, height });
        }
        bytes = await out.save({ useObjectStreams: true });
      }
      if (bytes.length >= file.size) bytes = new Uint8Array(ab);
      const blob = new Blob([bytes.slice().buffer as ArrayBuffer], { type: "application/pdf" });
      setResult({ original: file.size, compressed: bytes.length, url: URL.createObjectURL(blob) });
    } catch (err) {
      alert("Error compressing PDF: " + (err instanceof Error ? err.message : "Unknown error"));
    } finally {
      setProcessing(false);
      setStatus("");
    }
  };

  const downloadResult = () => {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result.url;
    a.download = `compressed-${file?.name || "document.pdf"}`;
    a.click();
  };

  const saved = result ? Math.max(0, ((result.original - result.compressed) / result.original) * 100) : 0;

  return (
    <div className="tool-container">
      <div className="text-center mb-10">
        <h1 className="page-title mb-3">Compress PDF</h1>
        <p className="page-desc">Reduce file size while optimizing for maximal PDF quality.</p>
      </div>

      {!file ? (
        <FileUpload accept=".pdf" onFilesSelected={(f) => { setFile(f[0]); setResult(null); }} label="Select PDF file" />
      ) : !result ? (
        <div className="text-center">
          <div className="file-card mb-8 inline-block">
            <p className="file-name">📄 {file.name}</p>
            <p className="file-size">{formatBytes(file.size)}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mb-8 text-left">
            {LEVELS.map((l) => (
              <button key={l.id} onClick={() => setLevel(l.id)} className={`p-5 rounded-2xl border-2 ${level === l.id ? "border-red-500 bg-red-50" : "border-gray-200 bg-white"}`}>
                <p className="font-bold text-lg text-red-600">{l.title}</p>
                <p className="text-sm text-gray-500">{l.desc}</p>
              </button>
            ))}
          </div>
          <button onClick={compressPDF} disabled={processing} className="btn-primary disabled:opacity-50">
            {processing ? "Compressing..." : "Compress PDF"}
          </button>
          {status && <p className="text-gray-500 mt-4">{status}</p>}
        </div>
      ) : (
        <div className="text-center">
          <div className="p-8 bg-green-50 rounded-2xl border-2 border-green-200 mb-8 inline-block">
            <p className="text-green-700 font-bold text-2xl mb-4">{saved > 0 ? "Compression Complete!" : "This PDF is already optimized"}</p>
            <div className="flex gap-10 justify-center text-base">
              <div>
                <p className="text-gray-400 text-sm mb-1">Original</p>
                <p className="font-bold text-xl">{formatBytes(result.original)}</p>
              </div>
              <div className="text-3xl text-gray-300 flex items-center">→</div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Compressed</p>
                <p className="font-bold text-xl text-green-600">{formatBytes(result.compressed)}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Saved</p>
                <p className="font-bold text-xl text-green-600">{saved.toFixed(1)}%</p>
              </div>
            </div>
          </div>
          <div className="flex gap-4 justify-center">
            <button onClick={downloadResult} className="btn-success">Download Compressed PDF</button>
            <button onClick={() => setResult(null)} className="btn-secondary">Try another level</button>
          </div>
        </div>
      )}
    </div>
  );
}
