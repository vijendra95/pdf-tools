"use client";

import { useEffect, useRef, useState } from "react";
import { adminApi, uploadFiles } from "@/lib/admin-client";
import type { Media } from "@/lib/store";

const altFromName = (n: string) => n.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").trim();

export default function MediaPicker({
  open,
  onClose,
  onSelect,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (url: string, alt: string) => void;
}) {
  const [items, setItems] = useState<Media[]>([]);
  const [busy, setBusy] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    let alive = true;
    adminApi<{ media?: Media[] }>("listMedia").then((r) => alive && setItems(r.media || []));
    return () => {
      alive = false;
    };
  }, [open]);

  if (!open) return null;

  const upload = async (files: FileList | null) => {
    if (!files?.length) return;
    setBusy(true);
    const r = await uploadFiles([...files]);
    setBusy(false);
    if (!r.ok) return alert(r.error);
    const first = r.media?.[0];
    if (first) {
      onSelect(first.url, altFromName(first.name));
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold">Media gallery</h2>
          <div className="flex gap-2">
            <button type="button" className="btn-primary !py-2 !px-4 text-sm" onClick={() => input.current?.click()}>
              Upload new
            </button>
            <button type="button" className="btn-secondary !py-2 !px-4 text-sm" onClick={onClose}>
              Close
            </button>
          </div>
          <input ref={input} type="file" accept="image/*" multiple hidden onChange={(e) => upload(e.target.files)} />
        </div>
        <div className="p-4 overflow-y-auto">
          {busy && <p className="text-gray-500 mb-3">Loading…</p>}
          {!busy && items.length === 0 && <p className="text-gray-500">No images yet. Click &quot;Upload new&quot;.</p>}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {items.map((m) => (
              <button
                type="button"
                key={m.id}
                onClick={() => {
                  onSelect(m.url, altFromName(m.name));
                  onClose();
                }}
                className="border-2 border-gray-200 hover:border-red-400 rounded-lg overflow-hidden"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.url} alt={m.name} className="w-full aspect-square object-cover" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
