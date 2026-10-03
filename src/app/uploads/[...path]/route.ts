import fs from "fs";
import path from "path";
import { UPLOAD_DIR } from "@/lib/store";

const MIME: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".avif": "image/avif",
};

export async function GET(_req: Request, ctx: { params: Promise<{ path: string[] }> }) {
  const { path: parts } = await ctx.params;
  const name = path.basename(parts.join("/"));
  const fp = path.join(UPLOAD_DIR, name);
  const type = MIME[path.extname(name).toLowerCase()];
  if (!type || !fs.existsSync(fp)) return new Response("Not found", { status: 404 });
  const buf = await fs.promises.readFile(fp);
  return new Response(new Uint8Array(buf), {
    headers: {
      "Content-Type": type,
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
