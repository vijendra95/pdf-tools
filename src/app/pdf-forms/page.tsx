"use client";

import { useState } from "react";
import { PDFDocument, PDFTextField, PDFCheckBox, PDFDropdown, PDFRadioGroup, PDFOptionList } from "pdf-lib";
import FileUpload from "@/components/FileUpload";
import { openPdf, renderPageToCanvas } from "@/lib/pdfjs";
import { downloadPdfBytes } from "@/lib/pdf-utils";

type FieldInfo =
  | { kind: "text"; name: string; multiline: boolean }
  | { kind: "check"; name: string }
  | { kind: "choice"; name: string; options: string[] };

interface NewField { id: number; page: number; type: "text" | "check"; x: number; y: number; name: string }
interface PagePreview { src: string; width: number; height: number }

export default function PdfForms() {
  const [file, setFile] = useState<File | null>(null);
  const [bytes, setBytes] = useState<ArrayBuffer | null>(null);
  const [fields, setFields] = useState<FieldInfo[]>([]);
  const [values, setValues] = useState<Record<string, string | boolean>>({});
  const [flatten, setFlatten] = useState(false);
  const [mode, setMode] = useState<"fill" | "create">("fill");
  const [pages, setPages] = useState<PagePreview[]>([]);
  const [newFields, setNewFields] = useState<NewField[]>([]);
  const [placeType, setPlaceType] = useState<"text" | "check">("text");
  const [processing, setProcessing] = useState(false);

  const load = async (f: File) => {
    setFile(f);
    const ab = await f.arrayBuffer();
    setBytes(ab);
    try {
      const pdf = await PDFDocument.load(ab, { ignoreEncryption: true });
      const form = pdf.getForm();
      const list: FieldInfo[] = [];
      const vals: Record<string, string | boolean> = {};
      for (const fld of form.getFields()) {
        const name = fld.getName();
        if (fld instanceof PDFTextField) {
          list.push({ kind: "text", name, multiline: fld.isMultiline() });
          vals[name] = fld.getText() || "";
        } else if (fld instanceof PDFCheckBox) {
          list.push({ kind: "check", name });
          vals[name] = fld.isChecked();
        } else if (fld instanceof PDFDropdown || fld instanceof PDFOptionList) {
          list.push({ kind: "choice", name, options: fld.getOptions() });
          vals[name] = fld.getSelected()[0] || "";
        } else if (fld instanceof PDFRadioGroup) {
          list.push({ kind: "choice", name, options: fld.getOptions() });
          vals[name] = fld.getSelected() || "";
        }
      }
      setFields(list);
      setValues(vals);
      setMode(list.length ? "fill" : "create");
      const doc = await openPdf(ab);
      const prev: PagePreview[] = [];
      for (let i = 1; i <= doc.numPages; i++) {
        const { canvas, width, height } = await renderPageToCanvas(doc, i, 1.3);
        prev.push({ src: canvas.toDataURL("image/jpeg", 0.85), width, height });
      }
      setPages(prev);
    } catch (err) {
      alert("Error reading PDF: " + (err instanceof Error ? err.message : "Unknown error"));
      setFile(null);
    }
  };

  const save = async () => {
    if (!bytes || !file) return;
    setProcessing(true);
    try {
      const pdf = await PDFDocument.load(bytes, { ignoreEncryption: true });
      const form = pdf.getForm();
      for (const f of fields) {
        const v = values[f.name];
        try {
          if (f.kind === "text") form.getTextField(f.name).setText(String(v ?? ""));
          else if (f.kind === "check") (v ? form.getCheckBox(f.name).check() : form.getCheckBox(f.name).uncheck());
          else if (v) {
            const fld = form.getField(f.name);
            if (fld instanceof PDFRadioGroup || fld instanceof PDFDropdown || fld instanceof PDFOptionList) fld.select(String(v));
          }
        } catch { /* skip unsupported field */ }
      }
      const pdfPages = pdf.getPages();
      for (const nf of newFields) {
        const page = pdfPages[nf.page];
        const { width, height } = page.getSize();
        if (nf.type === "text") {
          const w = 180, h = 22;
          form.createTextField(nf.name).addToPage(page, { x: nf.x * width, y: height - nf.y * height - h, width: w, height: h });
        } else {
          const s = 16;
          form.createCheckBox(nf.name).addToPage(page, { x: nf.x * width, y: height - nf.y * height - s, width: s, height: s });
        }
      }
      if (flatten) form.flatten();
      const out = await pdf.save();
      downloadPdfBytes(out, `${mode === "create" ? "fillable" : "filled"}-${file.name}`);
    } catch (err) {
      alert("Error: " + (err instanceof Error ? err.message : "Unknown error"));
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="tool-container" style={{ maxWidth: 1000 }}>
      <div className="text-center mb-10">
        <h1 className="page-title mb-3">PDF Forms</h1>
        <p className="page-desc">Fill in PDF forms online, or turn any PDF into a fillable form by adding text boxes and checkboxes.</p>
      </div>
      {!file ? (
        <FileUpload accept=".pdf" onFilesSelected={(f) => load(f[0])} label="Select PDF form" />
      ) : (
        <div>
          <div className="flex flex-wrap gap-3 justify-center mb-6">
            {(["fill", "create"] as const).map((m) => (
              <button key={m} onClick={() => setMode(m)} className={`px-6 py-3 rounded-xl font-semibold border-2 ${mode === m ? "bg-red-500 text-white border-red-500" : "bg-white border-gray-200"}`}>
                {m === "fill" ? `Fill form (${fields.length} fields)` : "Create fillable fields"}
              </button>
            ))}
          </div>

          {mode === "fill" ? (
            fields.length === 0 ? (
              <p className="text-center text-gray-500 mb-6">This PDF has no form fields. Switch to “Create fillable fields” to add some.</p>
            ) : (
              <div className="max-w-xl mx-auto space-y-4 mb-6">
                {fields.map((f) => (
                  <div key={f.name}>
                    {f.kind === "check" ? (
                      <label className="flex items-center gap-3 font-semibold">
                        <input type="checkbox" className="w-5 h-5" checked={Boolean(values[f.name])} onChange={(e) => setValues({ ...values, [f.name]: e.target.checked })} />
                        {f.name}
                      </label>
                    ) : (
                      <>
                        <label className="setting-label">{f.name}</label>
                        {f.kind === "choice" ? (
                          <select className="input-field" value={String(values[f.name] || "")} onChange={(e) => setValues({ ...values, [f.name]: e.target.value })}>
                            <option value="">— select —</option>
                            {f.options.map((o) => <option key={o}>{o}</option>)}
                          </select>
                        ) : f.multiline ? (
                          <textarea className="input-field h-24" value={String(values[f.name] || "")} onChange={(e) => setValues({ ...values, [f.name]: e.target.value })} />
                        ) : (
                          <input className="input-field" value={String(values[f.name] || "")} onChange={(e) => setValues({ ...values, [f.name]: e.target.value })} />
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="mb-6">
              <div className="flex flex-wrap gap-3 justify-center items-center mb-4">
                <span className="font-semibold">Click on the page to add:</span>
                {(["text", "check"] as const).map((t) => (
                  <button key={t} onClick={() => setPlaceType(t)} className={`px-4 py-2 rounded-lg border-2 font-semibold ${placeType === t ? "border-red-500 bg-red-50" : "border-gray-200 bg-white"}`}>
                    {t === "text" ? "▭ Text box" : "☑ Checkbox"}
                  </button>
                ))}
                {newFields.length > 0 && <button onClick={() => setNewFields([])} className="px-4 py-2 rounded-lg border-2 border-gray-200">Clear ({newFields.length})</button>}
              </div>
              <div className="space-y-6">
                {pages.map((p, i) => (
                  <div key={i} className="mx-auto shadow-lg border bg-white" style={{ maxWidth: Math.min(800, p.width * 1.3) }}>
                    <div className="relative cursor-crosshair" onClick={(e) => {
                      if ((e.target as HTMLElement).dataset.field) return;
                      const b = e.currentTarget.getBoundingClientRect();
                      const id = Date.now();
                      setNewFields([...newFields, { id, page: i, type: placeType, x: (e.clientX - b.left) / b.width, y: (e.clientY - b.top) / b.height, name: `${placeType === "text" ? "text" : "check"}_${newFields.length + 1}` }]);
                    }}>
                      <img src={p.src} alt={`Page ${i + 1}`} className="w-full block" />
                      {newFields.filter((f) => f.page === i).map((f) => (
                        <div key={f.id} data-field="1" title="Click to remove" onClick={() => setNewFields(newFields.filter((x) => x.id !== f.id))}
                          className="absolute border-2 border-blue-500 bg-blue-100/60 text-[10px] text-blue-800 px-1 cursor-pointer"
                          style={{ left: `${f.x * 100}%`, top: `${f.y * 100}%`, width: f.type === "text" ? `${(180 / p.width) * 100}%` : `${(16 / p.width) * 100}%`, height: f.type === "text" ? `${(22 / p.height) * 100}%` : `${(16 / p.height) * 100}%` }}>
                          {f.type === "text" ? f.name : ""}
                        </div>
                      ))}
                    </div>
                    <p className="text-center text-sm text-gray-500 py-2">Page {i + 1}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="text-center space-y-4 sticky bottom-4">
            {mode === "fill" && fields.length > 0 && (
              <label className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border">
                <input type="checkbox" checked={flatten} onChange={(e) => setFlatten(e.target.checked)} /> Flatten (make fields non-editable)
              </label>
            )}
            <div className="flex gap-4 justify-center">
              <button onClick={save} disabled={processing || (mode === "create" ? !newFields.length : !fields.length)} className="btn-primary disabled:opacity-50">
                {processing ? "Saving..." : mode === "create" ? "Download fillable PDF" : "Download filled PDF"}
              </button>
              <button onClick={() => { setFile(null); setFields([]); setNewFields([]); setPages([]); }} className="btn-secondary">New file</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
