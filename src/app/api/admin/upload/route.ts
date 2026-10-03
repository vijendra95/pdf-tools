import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { UPLOAD_DIR, newId, slugify, updateDb, type Media } from "@/lib/store";
import { BASE_PATH } from "@/lib/site";

const TYPES: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/avif": ".avif",
};
const MAX = 8 * 1024 * 1024;

export async function POST(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ ok: false, error: "Not logged in" }, { status: 401 });
  const form = await req.formData();
  const files = form.getAll("file").filter((f): f is File => f instanceof File);
  if (!files.length) return NextResponse.json({ ok: false, error: "No file" }, { status: 400 });
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  const items: Media[] = [];
  for (const f of files) {
    const ext = TYPES[f.type];
    if (!ext) return NextResponse.json({ ok: false, error: `${f.name}: only JPG, PNG, WebP, GIF or AVIF images` }, { status: 400 });
    if (f.size > MAX) return NextResponse.json({ ok: false, error: `${f.name}: max 8 MB` }, { status: 400 });
    const base = slugify(f.name.replace(/\.[^.]+$/, "")) || "image";
    const file = `${Date.now()}-${base.slice(0, 50)}${ext}`;
    fs.writeFileSync(path.join(UPLOAD_DIR, file), Buffer.from(await f.arrayBuffer()));
    items.push({ id: newId(), file, url: `${BASE_PATH}/uploads/${file}`, name: f.name, size: f.size, createdAt: new Date().toISOString() });
  }
  updateDb((db) => {
    db.media = [...items, ...db.media];
  });
  return NextResponse.json({ ok: true, media: items });
}
