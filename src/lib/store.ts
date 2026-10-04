import fs from "fs";
import path from "path";
import crypto from "crypto";
import { connection } from "next/server";
import { defaultPages, defaultPosts } from "./default-content";

export const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), "data");
export const UPLOAD_DIR = path.join(DATA_DIR, "uploads");
const DB_FILE = path.join(DATA_DIR, "db.json");

export interface ToolOverride {
  name?: string;
  cardDescription?: string;
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string;
  ogImage?: string;
  introHtml?: string;
  steps?: string[];
  features?: [string, string][];
  useCases?: string[];
  faqs?: [string, string][];
  extraHtml?: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  contentHtml: string;
  coverImage: string;
  coverAlt: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PageDoc {
  title: string;
  contentHtml: string;
  seoTitle: string;
  seoDescription: string;
  updatedAt: string;
}

export const PAGE_KEYS = ["about", "contact", "faq", "privacy", "terms"] as const;
export type PageKey = (typeof PAGE_KEYS)[number];

export interface Media {
  id: string;
  file: string;
  url: string;
  name: string;
  size: number;
  createdAt: string;
}

export const defaultSettings = {
  siteName: "PDF Tools",
  orgName: "KVSPT",
  contactEmail: "info@kvspt.com",
  homeTitle: "Free Online PDF Tools - Merge, Split, Compress, Convert & Edit PDF",
  homeDescription:
    "40+ free online PDF tools in one place: merge, split, compress, convert PDF to Word, Excel, JPG, OCR, sign, protect, translate and summarize PDFs. No sign-up, files never leave your browser.",
  homeKeywords:
    "pdf tools, merge pdf, split pdf, compress pdf, pdf to word, ocr pdf, sign pdf, free pdf editor, ilovepdf alternative",
  heroTitle: "Every tool you need to work with PDFs & Audio",
  heroSubtitle:
    "PDF tools and audio converters, all 100% free and easy to use. Merge, split, compress, convert, OCR, sign and translate PDFs. Everything runs in your browser.",
  ogImage: "",
  gaId: "",
  gscVerification: "",
  bingVerification: "",
  metaPixelId: "",
  adsenseClient: "",
  whatsappNumber: "",
  whatsappMessage: "Hi, I need help with PDF Tools",
};
export type Settings = typeof defaultSettings;

export interface DB {
  settings: Settings;
  tools: Record<string, ToolOverride>;
  posts: Post[];
  pages: Record<PageKey, PageDoc>;
  media: Media[];
  adminEmail?: string;
  adminPasswordHash?: string;
}

let cache: { mtime: number; db: DB } | null = null;

function initial(): DB {
  return { settings: { ...defaultSettings }, tools: {}, posts: defaultPosts(), pages: defaultPages(), media: [] };
}

export function readDb(): DB {
  try {
    const st = fs.statSync(DB_FILE);
    if (cache && cache.mtime === st.mtimeMs) return cache.db;
    const raw = JSON.parse(fs.readFileSync(DB_FILE, "utf8")) as Partial<DB>;
    const db: DB = {
      ...initial(),
      ...raw,
      settings: { ...defaultSettings, ...raw.settings },
      pages: { ...defaultPages(), ...raw.pages },
    };
    cache = { mtime: st.mtimeMs, db };
    return db;
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") {
      const db = initial();
      writeDb(db);
      return db;
    }
    throw e;
  }
}

export async function getDb(): Promise<DB> {
  await connection();
  return readDb();
}

export function writeDb(db: DB) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const tmp = `${DB_FILE}.${process.pid}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(db, null, 2));
  fs.renameSync(tmp, DB_FILE);
  cache = null;
}

export function updateDb(fn: (db: DB) => void): DB {
  const db = structuredClone(readDb());
  fn(db);
  writeDb(db);
  return db;
}

export const newId = () => crypto.randomBytes(8).toString("hex");

export function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
