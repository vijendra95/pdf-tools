export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export async function loadPdfjs() {
  const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf.mjs");
  pdfjsLib.GlobalWorkerOptions.workerSrc = `${BASE_PATH}/pdf.worker.min.mjs`;
  return pdfjsLib;
}

export type PdfjsDoc = Awaited<ReturnType<Awaited<ReturnType<typeof loadPdfjs>>["getDocument"]>["promise"]>;

export async function openPdf(data: ArrayBuffer | Uint8Array, password?: string): Promise<PdfjsDoc> {
  const pdfjsLib = await loadPdfjs();
  const bytes = data instanceof Uint8Array ? data : new Uint8Array(data);
  return pdfjsLib.getDocument({ data: bytes.slice(), password }).promise;
}

export async function renderPageToCanvas(pdf: PdfjsDoc, pageNumber: number, scale: number) {
  const page = await pdf.getPage(pageNumber);
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement("canvas");
  canvas.width = Math.floor(viewport.width);
  canvas.height = Math.floor(viewport.height);
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  await page.render({ canvasContext: ctx, viewport, canvas } as Parameters<typeof page.render>[0]).promise;
  const base = page.getViewport({ scale: 1 });
  return { canvas, width: base.width, height: base.height };
}

export interface TextLine {
  text: string;
  y: number;
  x: number;
  size: number;
}

export async function extractPageLines(pdf: PdfjsDoc, pageNumber: number): Promise<TextLine[]> {
  const page = await pdf.getPage(pageNumber);
  const content = await page.getTextContent();
  const lines: TextLine[] = [];
  for (const item of content.items) {
    if (!("str" in item)) continue;
    const t = item.transform as number[];
    const size = Math.round(Math.hypot(t[2], t[3]) * 10) / 10 || 10;
    const x = t[4];
    const y = t[5];
    const last = lines[lines.length - 1];
    if (last && Math.abs(last.y - y) < Math.max(2, size * 0.4)) {
      const sep = last.text.endsWith(" ") || item.str.startsWith(" ") || !item.str ? "" : " ";
      last.text += sep + item.str;
      last.size = Math.max(last.size, size);
    } else if (item.str.trim() || item.hasEOL) {
      lines.push({ text: item.str, y, x, size });
    }
  }
  return lines.map((l) => ({ ...l, text: l.text.replace(/\s+/g, " ").trim() })).filter((l) => l.text);
}

export async function extractAllText(pdf: PdfjsDoc): Promise<string[]> {
  const pages: string[] = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    const lines = await extractPageLines(pdf, i);
    pages.push(lines.map((l) => l.text).join("\n"));
  }
  return pages;
}

export function canvasToJpegBytes(canvas: HTMLCanvasElement, quality = 0.85): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      async (blob) => {
        if (!blob) return reject(new Error("Canvas export failed"));
        resolve(new Uint8Array(await blob.arrayBuffer()));
      },
      "image/jpeg",
      quality
    );
  });
}

export function formatBytes(n: number) {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(2)} MB`;
}
