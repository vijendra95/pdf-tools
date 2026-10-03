import { BASE_PATH } from "./site";
import type { Media } from "./store";

export type ApiResult<T = object> = T & { ok: boolean; error?: string };

export async function adminApi<T = object>(action: string, data: object = {}): Promise<ApiResult<T>> {
  const res = await fetch(`${BASE_PATH}/api/admin/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action, ...data }),
  });
  return res.json().catch(() => ({ ok: false, error: `HTTP ${res.status}` }));
}

export async function uploadFiles(files: File[]): Promise<ApiResult<{ media?: Media[] }>> {
  const fd = new FormData();
  files.forEach((f) => fd.append("file", f));
  const res = await fetch(`${BASE_PATH}/api/admin/upload/`, { method: "POST", body: fd });
  return res.json().catch(() => ({ ok: false, error: `HTTP ${res.status}` }));
}
