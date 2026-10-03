"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminApi } from "@/lib/admin-client";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    const r = await adminApi("login", { email, password });
    setBusy(false);
    if (!r.ok) return setError(r.error || "Login failed");
    router.replace("/admin");
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={submit} className="admin-card w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-extrabold text-center">
          <span className="text-red-500">PDF</span> Tools Admin
        </h1>
        <div>
          <label className="admin-label" htmlFor="email">Email</label>
          <input id="email" type="email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="username" />
        </div>
        <div>
          <label className="admin-label" htmlFor="password">Password</label>
          <input id="password" type="password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" />
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button className="btn-primary w-full disabled:opacity-50" disabled={busy}>
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
