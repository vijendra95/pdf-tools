"use client";

import { useEffect, useRef, useState } from "react";
import { adminApi, uploadFiles } from "@/lib/admin-client";
import { SITE_URL, BASE_PATH } from "@/lib/site";
import type { Media } from "@/lib/store";

export default function MediaManager() {
  const [items, setItems] = useState<Media[]>([]);
  const [busy, setBusy] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  const [tick, setTick] = useState(0);
  const load = () => setTick((t) => t + 1);

  useEffect(() => {
    let alive = true;
    adminApi<{ media?: Media[] }>("listMedia").then((r) => alive && setItems(r.media || []));
    return () => {
      alive = false;
    };
  }, [tick]);

  const upload = async (files: FileList | null) => {
    if (!files?.length) return;
    setBusy(true);
    const r = await uploadFiles([...files]);
    setBusy(false);
    if (!r.ok) alert(r.error);
    load();
  };

  const fullUrl = (u: string) => SITE_URL.replace(new RegExp(`${BASE_PATH}$`), "") + u;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-extrabold">Media gallery</h1>
        <button className="btn-primary !py-2 !px-5" onClick={() => input.current?.click()} disabled={busy}>
          {busy ? "Uploading…" : "+ Upload images"}
        </button>
        <input ref={input} type="file" accept="image/*" multiple hidden onChange={(e) => upload(e.target.files)} />
      </div>
      <p className="text-gray-500 mb-4">JPG, PNG, WebP, GIF or AVIF up to 8 MB. Tip: WebP images load fastest (better SEO).</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {items.map((m) => (
          <div key={m.id} className="admin-card !p-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={m.url} alt={m.name} className="w-full aspect-square object-cover rounded" />
            <p className="text-xs text-gray-500 truncate mt-2">{m.name}</p>
            <div className="flex justify-between mt-1 text-sm">
              <button type="button" className="text-blue-600" onClick={() => navigator.clipboard.writeText(fullUrl(m.url))}>Copy URL</button>
              <button
                type="button"
                className="text-red-500"
                onClick={async () => {
                  if (!confirm("Delete this image?")) return;
                  await adminApi("deleteMedia", { id: m.id });
                  load();
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {items.length === 0 && <p className="text-gray-500">No images yet.</p>}
    </div>
  );
}
