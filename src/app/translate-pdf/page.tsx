"use client";

import { useState } from "react";
import { Document, Packer, Paragraph, TextRun, HeadingLevel, PageBreak } from "docx";
import FileUpload from "@/components/FileUpload";
import { openPdf, extractPageLines } from "@/lib/pdfjs";
import { downloadBlob } from "@/lib/pdf-utils";

const LANGS: [string, string][] = [
  ["hi", "Hindi"], ["en", "English"], ["mr", "Marathi"], ["gu", "Gujarati"], ["pa", "Punjabi"], ["bn", "Bengali"],
  ["ta", "Tamil"], ["te", "Telugu"], ["kn", "Kannada"], ["ml", "Malayalam"], ["ur", "Urdu"], ["ne", "Nepali"],
  ["ar", "Arabic"], ["fr", "French"], ["de", "German"], ["es", "Spanish"], ["pt", "Portuguese"], ["ru", "Russian"],
  ["zh-CN", "Chinese"], ["ja", "Japanese"], ["ko", "Korean"], ["it", "Italian"], ["tr", "Turkish"],
];

async function googleTranslate(text: string, sl: string, tl: string) {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${tl}&dt=t&q=${encodeURIComponent(text)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = (await res.json()) as [[string, string][]];
  return json[0].map((p) => p[0]).join("");
}

async function myMemoryTranslate(text: string, sl: string, tl: string) {
  const parts = text.match(/[\s\S]{1,450}(\s|$)/g) || [text];
  const out: string[] = [];
  for (const p of parts) {
    const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(p)}&langpair=${sl === "auto" ? "en" : sl}|${tl}`);
    const j = await res.json();
    out.push(j?.responseData?.translatedText || p);
  }
  return out.join(" ");
}

function chunk(paragraphs: string[], max = 1500) {
  const chunks: string[] = [];
  let cur = "";
  for (const p of paragraphs) {
    if ((cur + "\n" + p).length > max && cur) { chunks.push(cur); cur = p; }
    else cur = cur ? `${cur}\n${p}` : p;
  }
  if (cur) chunks.push(cur);
  return chunks;
}

export default function TranslatePDF() {
  const [file, setFile] = useState<File | null>(null);
  const [from, setFrom] = useState("auto");
  const [to, setTo] = useState("hi");
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState("");
  const [result, setResult] = useState<{ original: string; translated: string }[] | null>(null);

  const translate = async () => {
    if (!file) return;
    setProcessing(true);
    try {
      const pdf = await openPdf(await file.arrayBuffer());
      const pages: { original: string; translated: string }[] = [];
      let useFallback = false;
      for (let i = 1; i <= pdf.numPages; i++) {
        setProgress(`Translating page ${i} of ${pdf.numPages}...`);
        const lines = (await extractPageLines(pdf, i)).map((l) => l.text);
        const translated: string[] = [];
        for (const c of chunk(lines)) {
          let t = "";
          if (!useFallback) {
            try { t = await googleTranslate(c, from, to); } catch { useFallback = true; }
          }
          if (useFallback) t = await myMemoryTranslate(c, from, to);
          translated.push(t);
        }
        pages.push({ original: lines.join("\n"), translated: translated.join("\n") });
      }
      if (!pages.some((p) => p.original.trim())) {
        alert("No text found. If this is a scanned PDF, run OCR PDF first.");
        return;
      }
      setResult(pages);
    } catch (err) {
      alert("Translation failed: " + (err instanceof Error ? err.message : "Unknown error"));
    } finally {
      setProcessing(false);
      setProgress("");
    }
  };

  const base = file?.name.replace(/\.pdf$/i, "") || "document";
  const langName = LANGS.find((l) => l[0] === to)?.[1] || to;

  const downloadDocx = async () => {
    if (!result) return;
    const children: Paragraph[] = [new Paragraph({ text: `${base} (${langName})`, heading: HeadingLevel.HEADING_1 })];
    result.forEach((p, i) => {
      p.translated.split("\n").forEach((line) => children.push(new Paragraph({ children: [new TextRun({ text: line, font: "Nirmala UI" })] })));
      if (i < result.length - 1) children.push(new Paragraph({ children: [new PageBreak()] }));
    });
    const blob = await Packer.toBlob(new Document({ sections: [{ children }] }));
    downloadBlob(blob, `${base}-${to}.docx`);
  };

  const printPdf = () => {
    if (!result) return;
    const w = window.open("", "_blank");
    if (!w) return;
    const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
    w.document.write(`<html><head><meta charset="utf-8"><title>${esc(base)} - ${langName}</title><style>body{font-family:'Noto Sans','Nirmala UI',Arial,sans-serif;line-height:1.6;padding:24px}.p{page-break-after:always;white-space:pre-wrap}</style></head><body>${result.map((p) => `<div class="p">${esc(p.translated)}</div>`).join("")}<script>setTimeout(()=>print(),400)</script></body></html>`);
    w.document.close();
  };

  return (
    <div className="tool-container" style={{ maxWidth: 1100 }}>
      <div className="text-center mb-10">
        <h1 className="page-title mb-3">Translate PDF</h1>
        <p className="page-desc">Translate PDF documents into Hindi, English and 20+ languages. Download as Word or PDF.</p>
      </div>
      {!file ? (
        <FileUpload accept=".pdf" onFilesSelected={(f) => { setFile(f[0]); setResult(null); }} label="Select PDF file" />
      ) : !result ? (
        <div className="max-w-lg mx-auto">
          <div className="file-card mb-6"><p className="file-name">📄 {file.name}</p></div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="setting-label">From</label>
              <select value={from} onChange={(e) => setFrom(e.target.value)} className="input-field">
                <option value="auto">Detect language</option>
                {LANGS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="setting-label">To</label>
              <select value={to} onChange={(e) => setTo(e.target.value)} className="input-field">
                {LANGS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>
          </div>
          <div className="text-center">
            <button onClick={translate} disabled={processing} className="btn-primary disabled:opacity-50">{processing ? "Translating..." : "Translate PDF"}</button>
            {progress && <p className="text-gray-500 mt-4">{progress}</p>}
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-wrap gap-4 justify-center mb-6">
            <button onClick={downloadDocx} className="btn-success">Download Word (.docx)</button>
            <button onClick={printPdf} className="btn-secondary">Save as PDF</button>
            <button onClick={() => downloadBlob(new Blob([result.map((p) => p.translated).join("\n\n")], { type: "text/plain;charset=utf-8" }), `${base}-${to}.txt`)} className="btn-secondary">Download .txt</button>
            <button onClick={() => { setFile(null); setResult(null); }} className="btn-secondary">New file</button>
          </div>
          <div className="space-y-6">
            {result.map((p, i) => (
              <div key={i} className="grid md:grid-cols-2 gap-4">
                <div className="bg-gray-50 border rounded-2xl p-4 whitespace-pre-wrap text-sm text-gray-600"><p className="font-bold mb-2">Page {i + 1} — Original</p>{p.original}</div>
                <div className="bg-white border-2 border-red-100 rounded-2xl p-4 whitespace-pre-wrap"><p className="font-bold mb-2">Page {i + 1} — {langName}</p>{p.translated}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
