export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://kvspt.com/pdf").replace(/\/$/, "");
export const withBase = (p: string) => `${BASE_PATH}${p}`;
