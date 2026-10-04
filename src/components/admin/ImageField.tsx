"use client";

import { useRef, useState } from "react";
import MediaPicker from "./MediaPicker";
import { uploadFiles } from "@/lib/admin-client";

export default function ImageField({ label, value, onChange }: { label: string; value: string; onChange: (url: string) => void }) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  const upload = async (files: FileList | null) => {
    if (!files?.length) return;
    setBusy(true);
    const r = await uploadFiles([files[0]]);
    setBusy(false);
    if (!r.ok) return alert(r.error);
    if (r.media?.[0]) onChange(r.media[0].url);
  };

  return (
    <div>
      <span className="admin-label">{label}</span>
      <div className="flex flex-wrap items-center gap-3">
        {value && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className="h-20 w-32 object-cover rounded border" />
        )}
        <input className="input-field flex-1 min-w-[200px]" value={value} onChange={(e) => onChange(e.target.value)} placeholder="Image URL" />
        <button type="button" className="btn-secondary !py-2 !px-4 text-sm" onClick={() => input.current?.click()} disabled={busy}>
          {busy ? "Uploading…" : "Upload"}
        </button>
        <button type="button" className="btn-secondary !py-2 !px-4 text-sm" onClick={() => setOpen(true)}>
          Choose from gallery
        </button>
        {value && (
          <button type="button" className="text-red-500 text-sm" onClick={() => onChange("")}>
            Remove
          </button>
        )}
        <input ref={input} type="file" accept="image/*" hidden onChange={(e) => upload(e.target.files)} />
      </div>
      <MediaPicker open={open} onClose={() => setOpen(false)} onSelect={(url) => onChange(url)} />
    </div>
  );
}
