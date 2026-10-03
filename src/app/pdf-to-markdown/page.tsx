"use client";

import { useState } from "react";
import FileUpload from "@/components/FileUpload";
import { openPdf, extractPageLines, type TextLine } from "@/lib/pdfjs";
import { downloadBlob } from "@/lib/pdf-utils";

function linesToMarkdown(pages: TextLine[][]) {
  const sizes: Record<string, number> = {};
  pages.flat().forEach((l) => {
    const k = l.size.toFixed(0);
    sizes[k] = (sizes[k] || 0) + l.text.length;
  });
  const body = Number(Object.entries(sizes).sort((a, b) => b[1] - a[1])[0]?.[0] || 10);
  const out: string[] = [];

  pages.forEach((lines, pi) => {
    let para = "";
    let prev: TextLine | null = null;
    const flush = () => {
      if (para.trim()) out.push(para.trim());
      para = "";
    };
    for (const l of lines) {
      const ratio = l.size / body;
      const bullet = /^([•●▪◦\-*–]|\d+[.)])\s+/.exec(l.text);
      const gap = prev ? prev.y - l.y : 0;
      if (ratio >= 1.15 && l.text.length < 120) {
        flush();
        const level = ratio >= 1.8 ? "#" : ratio >= 1.4 ? "##" : "###";
        out.push(`${level} ${l.text}`);
      } else if (bullet) {
        flush();
        const numbered = /^\d/.test(bullet[1]);
        out.push(`${numbered ? bullet[1].replace(")", ".") : "-"} ${l.text.slice(bullet[0].length)}`);
      } else {
        if (prev && (gap > l.size * 1.8 || gap < 0)) flush();
        para = para ? (para.endsWith("-") ? para.slice(0, -1) + l.text : `${para} ${l.text}`) : l.text;
      }
      prev = l;
    }
    flush();
    if (pi < pages.length - 1) out.push("---");
  });
  return out.join("\n\n");
}

export default function PdfToMarkdown() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [md, setMd] = useState("");

  const convert = async () => {
    if (!file) return;
    setProcessing(true);
    try {
      const pdf = await openPdf(await file.arrayBuffer());
      const pages: TextLine[][] = [];
      for (let i = 1; i <= pdf.numPages; i++) pages.push(await extractPageLines(pdf, i));
      const result = linesToMarkdown(pages);
      if (!result.replace(/---/g, "").trim()) {
        alert("No text found. This looks like a scanned PDF — run OCR PDF first.");
        return;
      }
      setMd(result);
    } catch (err) {
      alert("Error: " + (err instanceof Error ? err.message : "Unknown error"));
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="tool-container">
      <div className="text-center mb-10">
        <h1 className="page-title mb-3">PDF to Markdown</h1>
        <p className="page-desc">Convert PDF documents into clean Markdown with headings, lists and paragraphs — ready for ChatGPT, GitHub, Notion or blogs.</p>
      </div>
      {!file ? (
        <FileUpload accept=".pdf" onFilesSelected={(f) => { setFile(f[0]); setMd(""); }} label="Select PDF file" />
      ) : !md ? (
        <div className="text-center">
          <div className="file-card mb-8 inline-block"><p className="file-name">📄 {file.name}</p></div>
          <div>
            <button onClick={convert} disabled={processing} className="btn-primary disabled:opacity-50">
              {processing ? "Converting..." : "Convert to Markdown"}
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-wrap gap-4 justify-center mb-6">
            <button onClick={() => downloadBlob(new Blob([md], { type: "text/markdown;charset=utf-8" }), file.name.replace(/\.pdf$/i, "") + ".md")} className="btn-success">Download .md</button>
            <button onClick={() => navigator.clipboard.writeText(md).then(() => alert("Copied!"))} className="btn-secondary">Copy</button>
            <button onClick={() => { setFile(null); setMd(""); }} className="btn-secondary">New file</button>
          </div>
          <textarea value={md} onChange={(e) => setMd(e.target.value)} className="input-field font-mono text-sm" style={{ height: 520 }} />
        </div>
      )}
    </div>
  );
}
