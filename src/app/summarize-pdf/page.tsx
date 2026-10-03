"use client";

import { useState } from "react";
import FileUpload from "@/components/FileUpload";
import { openPdf, extractAllText } from "@/lib/pdfjs";
import { downloadBlob } from "@/lib/pdf-utils";

const STOP = new Set(
  ("a an the and or but if of to in on at by for with from as is are was were be been being this that these those it its into than then so such not no can could will would should may might do does did have has had i we you he she they them our your their his her my me us also which who whom what when where why how all any each more most other some only own same very just over under about after before between through during above below up down out off again further once here there both few nor too s t " +
    "का के की है हैं में से को और पर यह वह एक भी तो था थी थे कि जो लिए ने हो कर किया गया इस उस ये वो ही नहीं तथा या")
    .split(/\s+/)
);

function summarize(text: string, count: number) {
  const sentences = text
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?।])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.split(" ").length >= 5 && s.length < 600);
  const freq: Record<string, number> = {};
  const words = (s: string) => s.toLowerCase().match(/[\p{L}\p{M}\p{N}]+/gu) || [];
  sentences.forEach((s) => words(s).forEach((w) => { if (!STOP.has(w) && w.length > 2) freq[w] = (freq[w] || 0) + 1; }));
  const max = Math.max(1, ...Object.values(freq));
  const scored = sentences.map((s, i) => {
    const ws = words(s);
    const score = ws.reduce((n, w) => n + (freq[w] || 0) / max, 0) / Math.sqrt(ws.length || 1) + (i < 3 ? 0.3 : 0);
    return { s, i, score };
  });
  const top = [...scored].sort((a, b) => b.score - a.score).slice(0, count).sort((a, b) => a.i - b.i);
  const keywords = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 12).map(([w]) => w);
  return { summary: top.map((t) => t.s), keywords };
}

export default function SummarizePDF() {
  const [file, setFile] = useState<File | null>(null);
  const [length, setLength] = useState<"short" | "medium" | "long">("medium");
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<{ summary: string[]; keywords: string[]; words: number; pages: number } | null>(null);

  const run = async () => {
    if (!file) return;
    setProcessing(true);
    try {
      const pdf = await openPdf(await file.arrayBuffer());
      const text = (await extractAllText(pdf)).join(" ");
      const words = text.split(/\s+/).filter(Boolean).length;
      if (words < 20) {
        alert("Not enough text found. If this is a scanned PDF, run OCR PDF first.");
        return;
      }
      const n = length === "short" ? 5 : length === "medium" ? 10 : 20;
      setResult({ ...summarize(text, n), words, pages: pdf.numPages });
    } catch (err) {
      alert("Error: " + (err instanceof Error ? err.message : "Unknown error"));
    } finally {
      setProcessing(false);
    }
  };

  const summaryText = result ? result.summary.map((s) => `• ${s}`).join("\n") : "";

  return (
    <div className="tool-container">
      <div className="text-center mb-10">
        <h1 className="page-title mb-3">Summarize PDF</h1>
        <p className="page-desc">Get the key points of long PDF documents in seconds. Works with English and Hindi.</p>
      </div>
      {!file ? (
        <FileUpload accept=".pdf" onFilesSelected={(f) => { setFile(f[0]); setResult(null); }} label="Select PDF file" />
      ) : !result ? (
        <div className="text-center">
          <div className="file-card mb-6 inline-block"><p className="file-name">📄 {file.name}</p></div>
          <p className="setting-label">Summary length</p>
          <div className="flex gap-3 justify-center mb-8">
            {(["short", "medium", "long"] as const).map((l) => (
              <button key={l} onClick={() => setLength(l)}
                className={`px-6 py-3 rounded-xl font-semibold border-2 capitalize ${length === l ? "bg-red-500 text-white border-red-500" : "bg-white border-gray-200"}`}>{l}</button>
            ))}
          </div>
          <button onClick={run} disabled={processing} className="btn-primary disabled:opacity-50">{processing ? "Summarizing..." : "Summarize PDF"}</button>
        </div>
      ) : (
        <div>
          <div className="flex flex-wrap gap-3 justify-center mb-6 text-sm">
            <span className="px-4 py-2 bg-white border rounded-full">{result.pages} pages</span>
            <span className="px-4 py-2 bg-white border rounded-full">{result.words.toLocaleString()} words</span>
            <span className="px-4 py-2 bg-white border rounded-full">~{Math.max(1, Math.round(result.words / 200))} min read</span>
          </div>
          <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 mb-6">
            <h2 className="font-bold text-xl mb-4">Key points</h2>
            <ul className="space-y-3 list-disc pl-5 leading-relaxed">{result.summary.map((s, i) => <li key={i}>{s}</li>)}</ul>
            <h3 className="font-bold mt-6 mb-2">Keywords</h3>
            <div className="flex flex-wrap gap-2">{result.keywords.map((k) => <span key={k} className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm">{k}</span>)}</div>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => navigator.clipboard.writeText(summaryText).then(() => alert("Copied!"))} className="btn-success">Copy summary</button>
            <button onClick={() => downloadBlob(new Blob([summaryText], { type: "text/plain;charset=utf-8" }), file.name.replace(/\.pdf$/i, "") + "-summary.txt")} className="btn-secondary">Download .txt</button>
            <button onClick={() => setResult(null)} className="btn-secondary">Change length</button>
            <button onClick={() => { setFile(null); setResult(null); }} className="btn-secondary">New file</button>
          </div>
        </div>
      )}
    </div>
  );
}
