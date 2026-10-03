"use client";

import { useEffect, useRef, useState } from "react";
import { PDFDocument } from "pdf-lib";
import { canvasToJpegBytes } from "@/lib/pdfjs";
import { downloadPdfBytes } from "@/lib/pdf-utils";

type Filter = "original" | "enhance" | "gray" | "bw";
interface Scan { id: number; src: string; rotation: number; filter: Filter }

const CSS_FILTER: Record<Filter, string> = {
  original: "none",
  enhance: "contrast(1.35) brightness(1.08) saturate(1.1)",
  gray: "grayscale(1) contrast(1.2)",
  bw: "grayscale(1) contrast(3) brightness(1.15)",
};

async function processScan(s: Scan, maxSide = 2000) {
  const img = new Image();
  img.src = s.src;
  await img.decode();
  const scale = Math.min(1, maxSide / Math.max(img.naturalWidth, img.naturalHeight));
  const w = Math.round(img.naturalWidth * scale);
  const h = Math.round(img.naturalHeight * scale);
  const rot = ((s.rotation % 360) + 360) % 360;
  const c = document.createElement("canvas");
  c.width = rot % 180 ? h : w;
  c.height = rot % 180 ? w : h;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, c.width, c.height);
  ctx.translate(c.width / 2, c.height / 2);
  ctx.rotate((rot * Math.PI) / 180);
  ctx.filter = s.filter === "bw" ? "grayscale(1)" : CSS_FILTER[s.filter];
  ctx.drawImage(img, -w / 2, -h / 2, w, h);
  if (s.filter === "bw") {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    const data = ctx.getImageData(0, 0, c.width, c.height);
    let sum = 0;
    for (let i = 0; i < data.data.length; i += 4) sum += data.data[i];
    const threshold = (sum / (data.data.length / 4)) * 0.82;
    for (let i = 0; i < data.data.length; i += 4) {
      const v = data.data[i] > threshold ? 255 : 0;
      data.data[i] = data.data[i + 1] = data.data[i + 2] = v;
    }
    ctx.putImageData(data, 0, 0);
  }
  return c;
}

export default function ScanToPdf() {
  const [scans, setScans] = useState<Scan[]>([]);
  const [camera, setCamera] = useState(false);
  const [pageSize, setPageSize] = useState<"a4" | "fit">("a4");
  const [processing, setProcessing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const addFiles = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach((f, i) => {
      const r = new FileReader();
      r.onload = () => setScans((prev) => [...prev, { id: Date.now() + i, src: r.result as string, rotation: 0, filter: "enhance" }]);
      r.readAsDataURL(f);
    });
  };

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setCamera(false);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment", width: { ideal: 1920 }, height: { ideal: 1080 } } });
      streamRef.current = stream;
      setCamera(true);
    } catch {
      alert("Camera not available. Use 'Take photo / Choose images' instead.");
    }
  };

  useEffect(() => {
    if (camera && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.play();
    }
  }, [camera]);

  useEffect(() => () => streamRef.current?.getTracks().forEach((t) => t.stop()), []);

  const capture = () => {
    const v = videoRef.current;
    if (!v) return;
    const c = document.createElement("canvas");
    c.width = v.videoWidth;
    c.height = v.videoHeight;
    c.getContext("2d")!.drawImage(v, 0, 0);
    setScans((prev) => [...prev, { id: Date.now(), src: c.toDataURL("image/jpeg", 0.92), rotation: 0, filter: "enhance" }]);
  };

  const update = (id: number, patch: Partial<Scan>) => setScans((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  const move = (i: number, d: number) => setScans((prev) => {
    const n = [...prev];
    const j = i + d;
    if (j < 0 || j >= n.length) return prev;
    [n[i], n[j]] = [n[j], n[i]];
    return n;
  });

  const makePdf = async () => {
    setProcessing(true);
    try {
      const pdf = await PDFDocument.create();
      for (const s of scans) {
        const c = await processScan(s);
        const img = await pdf.embedJpg(await canvasToJpegBytes(c, s.filter === "bw" ? 0.8 : 0.85));
        if (pageSize === "fit") {
          const w = (c.width * 72) / 200, h = (c.height * 72) / 200;
          pdf.addPage([w, h]).drawImage(img, { x: 0, y: 0, width: w, height: h });
        } else {
          const [pw, ph] = c.width > c.height ? [841.89, 595.28] : [595.28, 841.89];
          const m = 18;
          const sc = Math.min((pw - 2 * m) / c.width, (ph - 2 * m) / c.height);
          const w = c.width * sc, h = c.height * sc;
          pdf.addPage([pw, ph]).drawImage(img, { x: (pw - w) / 2, y: (ph - h) / 2, width: w, height: h });
        }
      }
      downloadPdfBytes(await pdf.save(), `scan-${new Date().toISOString().slice(0, 10)}.pdf`);
    } catch (err) {
      alert("Error: " + (err instanceof Error ? err.message : "Unknown error"));
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="tool-container" style={{ maxWidth: 1100 }}>
      <div className="text-center mb-10">
        <h1 className="page-title mb-3">Scan to PDF</h1>
        <p className="page-desc">Scan documents with your phone or webcam camera, clean them up and save as a PDF.</p>
      </div>

      <div className="flex flex-wrap gap-4 justify-center mb-8">
        <label className="btn-primary cursor-pointer">
          📷 Take photo / Choose images
          <input type="file" accept="image/*" capture="environment" multiple className="hidden" onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }} />
        </label>
        {!camera ? (
          <button onClick={startCamera} className="btn-secondary">🎥 Use live camera</button>
        ) : (
          <button onClick={stopCamera} className="btn-secondary">Close camera</button>
        )}
      </div>

      {camera && (
        <div className="max-w-2xl mx-auto mb-8 text-center">
          <video ref={videoRef} playsInline muted className="w-full rounded-2xl border-4 border-gray-800 bg-black" />
          <button onClick={capture} className="btn-success mt-4">● Capture page</button>
        </div>
      )}

      {scans.length > 0 && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-8">
            {scans.map((s, i) => (
              <div key={s.id} className="bg-white border-2 border-gray-100 rounded-2xl p-3 shadow-sm">
                <div className="aspect-[3/4] flex items-center justify-center overflow-hidden bg-gray-50 rounded-lg mb-3">
                  <img src={s.src} alt={`Scan ${i + 1}`} className="max-w-full max-h-full transition" style={{ transform: `rotate(${s.rotation}deg)`, filter: CSS_FILTER[s.filter] }} />
                </div>
                <select value={s.filter} onChange={(e) => update(s.id, { filter: e.target.value as Filter })} className="w-full border rounded-lg p-2 text-sm mb-2">
                  <option value="original">Original</option>
                  <option value="enhance">Auto enhance</option>
                  <option value="gray">Grayscale</option>
                  <option value="bw">Black & White (document)</option>
                </select>
                <div className="flex justify-between text-lg">
                  <button title="Move left" onClick={() => move(i, -1)}>◀</button>
                  <button title="Rotate" onClick={() => update(s.id, { rotation: s.rotation + 90 })}>⟳</button>
                  <span className="text-sm text-gray-500 self-center">{i + 1}</span>
                  <button title="Delete" onClick={() => setScans(scans.filter((x) => x.id !== s.id))}>🗑️</button>
                  <button title="Move right" onClick={() => move(i, 1)}>▶</button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <div className="flex gap-3 justify-center mb-6">
              {(["a4", "fit"] as const).map((p) => (
                <button key={p} onClick={() => setPageSize(p)} className={`px-5 py-2 rounded-xl font-semibold border-2 ${pageSize === p ? "bg-red-500 text-white border-red-500" : "bg-white border-gray-200"}`}>
                  {p === "a4" ? "A4 page" : "Fit to image"}
                </button>
              ))}
            </div>
            <button onClick={makePdf} disabled={processing} className="btn-success disabled:opacity-50">
              {processing ? "Creating PDF..." : `Save ${scans.length} page(s) as PDF`}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
