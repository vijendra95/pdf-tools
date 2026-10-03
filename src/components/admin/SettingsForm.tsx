"use client";

import { useState } from "react";
import { adminApi } from "@/lib/admin-client";
import type { Settings } from "@/lib/store";
import ImageField from "./ImageField";

type Field = [keyof Settings, string, string?, "textarea"?];

const GROUPS: [string, Field[]][] = [
  ["General", [
    ["siteName", "Website name"],
    ["orgName", "Company / organisation name (schema)"],
    ["contactEmail", "Contact email"],
  ]],
  ["Homepage", [
    ["heroTitle", "Hero heading (H1)"],
    ["heroSubtitle", "Hero text", "", "textarea"],
    ["homeTitle", "Homepage SEO title", "50–60 characters"],
    ["homeDescription", "Homepage meta description", "120–160 characters", "textarea"],
    ["homeKeywords", "Homepage keywords", "comma separated"],
  ]],
  ["Analytics & verification", [
    ["gaId", "Google Analytics 4 Measurement ID", "e.g. G-XXXXXXXXXX"],
    ["gscVerification", "Google Search Console verification code", "paste the content=\"...\" value or the full meta tag"],
    ["bingVerification", "Bing Webmaster verification code", "msvalidate.01 content value"],
    ["metaPixelId", "Meta (Facebook) Pixel ID", "numbers only"],
    ["adsenseClient", "Google AdSense publisher ID", "e.g. ca-pub-1234567890123456"],
  ]],
  ["WhatsApp button", [
    ["whatsappNumber", "WhatsApp number with country code", "e.g. 919876543210 (leave empty to hide)"],
    ["whatsappMessage", "Pre-filled WhatsApp message"],
  ]],
];

export default function SettingsForm({ initial, email }: { initial: Settings; email: string }) {
  const [s, setS] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const [pw, setPw] = useState({ current: "", next: "", email });
  const [pwMsg, setPwMsg] = useState("");

  const save = async () => {
    setBusy(true);
    const r = await adminApi("saveSettings", { settings: s });
    setBusy(false);
    setMsg(r.ok ? "Saved ✓ — live now" : r.error || "Error");
  };

  const changePw = async () => {
    const r = await adminApi("changePassword", pw);
    setPwMsg(r.ok ? "Updated ✓" : r.error || "Error");
    if (r.ok) setPw({ ...pw, current: "", next: "" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold">Settings & SEO</h1>
        <div className="flex gap-3 items-center">
          {msg && <span className="text-green-700 font-semibold">{msg}</span>}
          <button type="button" onClick={save} disabled={busy} className="btn-primary !py-2 !px-6 disabled:opacity-50">{busy ? "Saving…" : "Save"}</button>
        </div>
      </div>
      {GROUPS.map(([title, fields]) => (
        <div key={title} className="admin-card space-y-4">
          <h2 className="admin-h2">{title}</h2>
          {fields.map(([k, label, hint, type]) => (
            <div key={k}>
              <span className="admin-label">{label}</span>
              {type === "textarea" ? (
                <textarea className="input-field" rows={3} value={s[k]} onChange={(e) => setS({ ...s, [k]: e.target.value })} />
              ) : (
                <input className="input-field" value={s[k]} onChange={(e) => setS({ ...s, [k]: e.target.value })} />
              )}
              {hint && <p className="text-xs text-gray-500 mt-1">{hint}</p>}
            </div>
          ))}
          {title === "Homepage" && <ImageField label="Default social share image (1200×630 recommended)" value={s.ogImage} onChange={(u) => setS({ ...s, ogImage: u })} />}
        </div>
      ))}
      <div className="flex justify-end gap-3 items-center">
        {msg && <span className="text-green-700 font-semibold">{msg}</span>}
        <button type="button" onClick={save} disabled={busy} className="btn-primary disabled:opacity-50">{busy ? "Saving…" : "Save"}</button>
      </div>

      <div className="admin-card space-y-4 max-w-lg">
        <h2 className="admin-h2">Admin login</h2>
        <div>
          <span className="admin-label">Login email</span>
          <input className="input-field" value={pw.email} onChange={(e) => setPw({ ...pw, email: e.target.value })} />
        </div>
        <div>
          <span className="admin-label">Current password</span>
          <input type="password" className="input-field" value={pw.current} onChange={(e) => setPw({ ...pw, current: e.target.value })} autoComplete="current-password" />
        </div>
        <div>
          <span className="admin-label">New password (leave empty to keep)</span>
          <input type="password" className="input-field" value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} autoComplete="new-password" />
        </div>
        <div className="flex items-center gap-3">
          <button type="button" onClick={changePw} className="btn-secondary !py-2 !px-5">Update login</button>
          {pwMsg && <span className="font-semibold">{pwMsg}</span>}
        </div>
      </div>
    </div>
  );
}
