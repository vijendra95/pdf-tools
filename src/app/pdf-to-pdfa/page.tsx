"use client";

import { useState } from "react";
import { PDFDocument, PDFName, PDFString, PDFHexString } from "pdf-lib";
import FileUpload from "@/components/FileUpload";
import { BASE_PATH, openPdf, renderPageToCanvas, canvasToJpegBytes } from "@/lib/pdfjs";
import { downloadPdfBytes } from "@/lib/pdf-utils";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function xmp(title: string, part: string, date: string) {
  return `<?xpacket begin="\uFEFF" id="W5M0MpCehiHzreSzNTczkc9d"?>
<x:xmpmeta xmlns:x="adobe:ns:meta/">
<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
<rdf:Description rdf:about="" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:xmp="http://ns.adobe.com/xap/1.0/" xmlns:pdf="http://ns.adobe.com/pdf/1.3/" xmlns:pdfaid="http://www.aiim.org/pdfa/ns/id/">
<dc:format>application/pdf</dc:format>
<dc:title><rdf:Alt><rdf:li xml:lang="x-default">${esc(title)}</rdf:li></rdf:Alt></dc:title>
<xmp:CreateDate>${date}</xmp:CreateDate>
<xmp:ModifyDate>${date}</xmp:ModifyDate>
<xmp:MetadataDate>${date}</xmp:MetadataDate>
<xmp:CreatorTool>PDF Tools</xmp:CreatorTool>
<pdf:Producer>PDF Tools</pdf:Producer>
<pdfaid:part>${part}</pdfaid:part>
<pdfaid:conformance>B</pdfaid:conformance>
</rdf:Description>
</rdf:RDF>
</x:xmpmeta>
<?xpacket end="w"?>`;
}

export default function PdfToPdfa() {
  const [file, setFile] = useState<File | null>(null);
  const [part, setPart] = useState("2");
  const [mode, setMode] = useState<"text" | "image">("text");
  const [processing, setProcessing] = useState(false);
  const [done, setDone] = useState(false);

  const convert = async () => {
    if (!file) return;
    setProcessing(true);
    try {
      const ab = await file.arrayBuffer();
      let pdf: PDFDocument;
      if (mode === "image") {
        const src = await openPdf(ab);
        pdf = await PDFDocument.create();
        for (let i = 1; i <= src.numPages; i++) {
          const { canvas, width, height } = await renderPageToCanvas(src, i, 2);
          const img = await pdf.embedJpg(await canvasToJpegBytes(canvas, 0.9));
          pdf.addPage([width, height]).drawImage(img, { x: 0, y: 0, width, height });
        }
      } else {
        const src = await PDFDocument.load(ab, { ignoreEncryption: true, updateMetadata: false });
        pdf = await PDFDocument.create({ updateMetadata: false });
        const pages = await pdf.copyPages(src, src.getPageIndices());
        pages.forEach((p) => pdf.addPage(p));
      }

      const title = file.name.replace(/\.pdf$/i, "");
      const now = new Date();
      now.setMilliseconds(0);
      const iso = now.toISOString().replace(".000Z", "Z");
      pdf.setTitle(title);
      pdf.setProducer("PDF Tools");
      pdf.setCreator("PDF Tools");
      pdf.setCreationDate(now);
      pdf.setModificationDate(now);

      const ctx = pdf.context;
      const icc = new Uint8Array(await (await fetch(`${BASE_PATH}/icc/srgb.icc`)).arrayBuffer());
      const iccRef = ctx.register(ctx.stream(icc, { N: 3 }));
      const intent = ctx.obj({
        Type: "OutputIntent",
        S: "GTS_PDFA1",
        OutputConditionIdentifier: PDFString.of("sRGB IEC61966-2.1"),
        Info: PDFString.of("sRGB IEC61966-2.1"),
        DestOutputProfile: iccRef,
      });
      pdf.catalog.set(PDFName.of("OutputIntents"), ctx.obj([ctx.register(intent)]));
      const meta = ctx.stream(new TextEncoder().encode(xmp(title, part, iso)), { Type: "Metadata", Subtype: "XML" });
      pdf.catalog.set(PDFName.of("Metadata"), ctx.register(meta));
      const id = Array.from(crypto.getRandomValues(new Uint8Array(16))).map((b) => b.toString(16).padStart(2, "0")).join("");
      ctx.trailerInfo.ID = ctx.obj([PDFHexString.of(id), PDFHexString.of(id)]);

      const bytes = await pdf.save({ useObjectStreams: false });
      downloadPdfBytes(bytes, `${title}-pdfa.pdf`);
      setDone(true);
    } catch (err) {
      alert("Error: " + (err instanceof Error ? err.message : "Unknown error"));
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="tool-container">
      <div className="text-center mb-10">
        <h1 className="page-title mb-3">PDF to PDF/A</h1>
        <p className="page-desc">Convert PDFs to PDF/A, the ISO-standardized format for long-term archiving (courts, government, banks).</p>
      </div>
      {!file ? (
        <FileUpload accept=".pdf" onFilesSelected={(f) => { setFile(f[0]); setDone(false); }} label="Select PDF file" />
      ) : (
        <div className="max-w-lg mx-auto">
          <div className="file-card mb-6"><p className="file-name">📄 {file.name}</p></div>
          <label className="setting-label">PDF/A version</label>
          <select value={part} onChange={(e) => setPart(e.target.value)} className="input-field mb-5">
            <option value="1">PDF/A-1b</option>
            <option value="2">PDF/A-2b (recommended)</option>
            <option value="3">PDF/A-3b</option>
          </select>
          <label className="setting-label">Conversion mode</label>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {([["text", "Keep text", "Text stays selectable"], ["image", "Max compatibility", "Pages flattened to images"]] as const).map(([v, t, d]) => (
              <button key={v} onClick={() => setMode(v)} className={`p-4 rounded-xl border-2 text-left ${mode === v ? "border-red-500 bg-red-50" : "border-gray-200 bg-white"}`}>
                <p className="font-bold">{t}</p>
                <p className="text-sm text-gray-500">{d}</p>
              </button>
            ))}
          </div>
          <div className="text-center">
            <button onClick={convert} disabled={processing} className="btn-primary disabled:opacity-50">{processing ? "Converting..." : "Convert to PDF/A"}</button>
          </div>
          {done && <div className="success-msg"><p>PDF/A file downloaded!</p></div>}
        </div>
      )}
    </div>
  );
}
