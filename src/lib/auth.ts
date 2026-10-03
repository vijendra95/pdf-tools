import crypto from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { readDb } from "./store";

export const SESSION_COOKIE = "pdf_admin";
const MAX_AGE = 7 * 24 * 3600;

function secret() {
  return process.env.SESSION_SECRET || "dev-only-secret-change-me";
}

export function hashPassword(pw: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  return `${salt}:${crypto.scryptSync(pw, salt, 32).toString("hex")}`;
}

export function verifyPassword(pw: string, stored: string) {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const a = crypto.scryptSync(pw, salt, 32);
  const b = Buffer.from(hash, "hex");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export function adminEmail() {
  return (readDb().adminEmail || process.env.ADMIN_EMAIL || "").trim().toLowerCase();
}

export function currentPasswordHash() {
  return readDb().adminPasswordHash || process.env.ADMIN_PASSWORD_HASH || "";
}

export function checkCredentials(email: string, password: string) {
  const stored = currentPasswordHash();
  const admin = adminEmail();
  if (!stored || !admin) return false;
  return email.trim().toLowerCase() === admin && verifyPassword(password, stored);
}

function sign(v: string) {
  return crypto.createHmac("sha256", secret()).update(v).digest("base64url");
}

export function makeToken(email: string) {
  const payload = Buffer.from(JSON.stringify({ email, exp: Date.now() + MAX_AGE * 1000 })).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

export function verifyToken(token?: string): string | null {
  if (!token) return null;
  const [p, s] = token.split(".");
  if (!p || !s) return null;
  const expected = sign(p);
  if (s.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(s), Buffer.from(expected))) return null;
  try {
    const data = JSON.parse(Buffer.from(p, "base64url").toString()) as { email: string; exp: number };
    if (data.exp < Date.now() || data.email !== adminEmail()) return null;
    return data.email;
  } catch {
    return null;
  }
}

export async function isAdmin() {
  return !!verifyToken((await cookies()).get(SESSION_COOKIE)?.value);
}

export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}

export const SESSION_MAX_AGE = MAX_AGE;
