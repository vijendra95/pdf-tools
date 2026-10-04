"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import FileUpload from "@/components/FileUpload";
import PagePicker from "@/components/PagePicker";
import { downloadBlob, downloadPdfBytes } from "@/lib/pdf-utils";

export default function ExtractPages() {
  const [file, setFile] = useState<File | null>(null);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [count, setCount] = useState(0);
  const [mode, setMode] = useState<"single" | "separate">("single");
  const [processing, setProcessing] = useState(false);

  const extract = async () => {
    if (!file || selected.size === 0) return;
    setProcessing(true);
    try {
      const src = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
      const pages = [...selected].sort((a, b) => a - b);
      const base = file.name.replace(/\.pdf$/i, "");
      if (mode === "single") {
        const out = await PDFDocument.create();
        (await out.copyPages(src, pages)).forEach((p) => out.addPage(p));
        downloadPdfBytes(await out.save(), `${base}-extracted.pdf`);
      } else {
        const JSZip = (await import("jszip")).default;
        const zip = new JSZip();
        for (const i of pages) {
          const out = await PDFDocument.create();
          const [p] = await out.copyPages(src, [i]);
          out.addPage(p);
          zip.file(`${base}-page-${i + 1}.pdf`, await out.save());
        }
        downloadBlob(await zip.generateAsync({ type: "blob" }), `${base}-pages.zip`);
      }
    } catch (e) {
      alert("Error: " + (e instanceof Error ? e.message : "Unknown error"));
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="tool-container">
      <div className="text-center mb-10">
        <h1 className="page-title mb-3">Extract PDF Pages</h1>
        <p className="page-desc">Pick the pages you want and save them as a new PDF.</p>
      </div>
      {!file ? (
        <FileUpload accept=".pdf" onFilesSelected={(f) => { setFile(f[0]); setSelected(new Set()); }} label="Select PDF file" />
      ) : (
        <div>
          <p className="text-center text-gray-600 mb-4">Click pages to select them (green), or type page numbers.</p>
          <PagePicker file={file} selected={selected} onChange={setSelected} onPageCount={setCount} tone="keep" />
          <div className="flex flex-wrap justify-center gap-6 mb-6 text-gray-700">
            <label className="flex items-center gap-2">
              <input type="radio" checked={mode === "single"} onChange={() => setMode("single")} /> One PDF with all selected pages
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" checked={mode === "separate"} onChange={() => setMode("separate")} /> Separate PDF for each page (ZIP)
            </label>
          </div>
          <p className="text-center text-base text-gray-500 mb-6 font-medium">
            {selected.size} of {count} pages selected
          </p>
          <div className="flex justify-center gap-3">
            <button onClick={() => setFile(null)} className="btn-secondary">Choose another file</button>
            <button onClick={extract} disabled={processing || selected.size === 0} className="btn-primary disabled:opacity-50">
              {processing ? "Extracting..." : "Extract pages"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
