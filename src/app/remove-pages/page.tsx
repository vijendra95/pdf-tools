"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import FileUpload from "@/components/FileUpload";
import PagePicker from "@/components/PagePicker";
import { downloadPdfBytes } from "@/lib/pdf-utils";

export default function RemovePages() {
  const [file, setFile] = useState<File | null>(null);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [count, setCount] = useState(0);
  const [processing, setProcessing] = useState(false);

  const remove = async () => {
    if (!file || selected.size === 0) return;
    if (selected.size >= count) {
      alert("You cannot remove every page. Keep at least one page.");
      return;
    }
    setProcessing(true);
    try {
      const src = await PDFDocument.load(await file.arrayBuffer(), { ignoreEncryption: true });
      const out = await PDFDocument.create();
      const keep = src.getPageIndices().filter((i) => !selected.has(i));
      (await out.copyPages(src, keep)).forEach((p) => out.addPage(p));
      downloadPdfBytes(await out.save(), file.name.replace(/\.pdf$/i, "") + "-pages-removed.pdf");
    } catch (e) {
      alert("Error: " + (e instanceof Error ? e.message : "Unknown error"));
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="tool-container">
      <div className="text-center mb-10">
        <h1 className="page-title mb-3">Remove PDF Pages</h1>
        <p className="page-desc">Select and delete the pages you don&apos;t need from your PDF.</p>
      </div>
      {!file ? (
        <FileUpload accept=".pdf" onFilesSelected={(f) => { setFile(f[0]); setSelected(new Set()); }} label="Select PDF file" />
      ) : (
        <div>
          <p className="text-center text-gray-600 mb-4">Click pages to mark them for removal (red), or type page numbers.</p>
          <PagePicker file={file} selected={selected} onChange={setSelected} onPageCount={setCount} tone="remove" />
          <p className="text-center text-base text-gray-500 mb-6 font-medium">
            {selected.size} page(s) will be removed, {Math.max(0, count - selected.size)} will remain
          </p>
          <div className="flex justify-center gap-3">
            <button onClick={() => setFile(null)} className="btn-secondary">Choose another file</button>
            <button onClick={remove} disabled={processing || selected.size === 0} className="btn-primary disabled:opacity-50">
              {processing ? "Removing..." : "Remove pages"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
