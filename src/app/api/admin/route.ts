import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  PAGE_KEYS,
  UPLOAD_DIR,
  defaultSettings,
  newId,
  readDb,
  slugify,
  updateDb,
  type PageKey,
  type Post,
  type Settings,
  type ToolOverride,
} from "@/lib/store";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  checkCredentials,
  currentPasswordHash,
  hashPassword,
  isAdmin,
  makeToken,
  verifyPassword,
} from "@/lib/auth";
import { toolContent } from "@/lib/tool-content";
import { BASE_PATH } from "@/lib/site";

type Body = Record<string, unknown>;

const ok = (data: object = {}) => NextResponse.json({ ok: true, ...data });
const fail = (error: string, status = 400) => NextResponse.json({ ok: false, error }, { status });

const str = (v: unknown, max = 100000) => (typeof v === "string" ? v.slice(0, max) : "");
const strList = (v: unknown) => (Array.isArray(v) ? v.map((x) => str(x).trim()).filter(Boolean) : []);
const pairList = (v: unknown): [string, string][] =>
  Array.isArray(v)
    ? v
        .filter((p) => Array.isArray(p))
        .map((p) => [str(p[0]).trim(), str(p[1]).trim()] as [string, string])
        .filter(([a, b]) => a && b)
    : [];

const ID_KEYS: (keyof Settings)[] = ["gaId", "metaPixelId", "adsenseClient"];

const cookieOpts = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: BASE_PATH || "/",
};

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return fail("Invalid JSON");
  }
  const action = str(body.action);
  const jar = await cookies();

  if (action === "login") {
    if (!checkCredentials(str(body.email), str(body.password))) {
      await new Promise((r) => setTimeout(r, 800));
      return fail("Wrong email or password", 401);
    }
    jar.set(SESSION_COOKIE, makeToken(str(body.email).trim().toLowerCase()), { ...cookieOpts, maxAge: SESSION_MAX_AGE });
    return ok();
  }

  if (!(await isAdmin())) return fail("Not logged in", 401);

  switch (action) {
    case "logout":
      jar.set(SESSION_COOKIE, "", { ...cookieOpts, maxAge: 0 });
      return ok();

    case "saveSettings": {
      const input = (body.settings || {}) as Body;
      const next: Partial<Settings> = {};
      for (const key of Object.keys(defaultSettings) as (keyof Settings)[]) {
        if (typeof input[key] !== "string") continue;
        let v = str(input[key], 2000).trim();
        if (ID_KEYS.includes(key) && !/^[A-Za-z0-9_.-]*$/.test(v)) return fail(`Invalid value for ${key}`);
        if (key === "whatsappNumber") v = v.replace(/\D/g, "");
        if ((key === "gscVerification" || key === "bingVerification") && v.includes("content=")) {
          v = v.match(/content="([^"]+)"/)?.[1] || v;
        }
        next[key] = v;
      }
      updateDb((db) => {
        db.settings = { ...db.settings, ...next };
      });
      return ok();
    }

    case "saveTool": {
      const slug = str(body.slug);
      if (!toolContent[slug]) return fail("Unknown tool");
      const o = (body.override || {}) as Body;
      const override: ToolOverride = {
        name: str(o.name, 200).trim() || undefined,
        cardDescription: str(o.cardDescription, 500).trim() || undefined,
        seoTitle: str(o.seoTitle, 300).trim() || undefined,
        seoDescription: str(o.seoDescription, 500).trim() || undefined,
        keywords: str(o.keywords, 1000).trim() || undefined,
        ogImage: str(o.ogImage, 500).trim() || undefined,
        introHtml: str(o.introHtml).trim() || undefined,
        extraHtml: str(o.extraHtml).trim() || undefined,
        steps: strList(o.steps),
        features: pairList(o.features),
        useCases: strList(o.useCases),
        faqs: pairList(o.faqs),
      };
      updateDb((db) => {
        db.tools[slug] = override;
      });
      return ok();
    }

    case "resetTool": {
      const slug = str(body.slug);
      updateDb((db) => {
        delete db.tools[slug];
      });
      return ok();
    }

    case "savePost": {
      const p = (body.post || {}) as Body;
      const title = str(p.title, 300).trim();
      if (!title) return fail("Title is required");
      const now = new Date().toISOString();
      let id = str(p.id);
      let slug = slugify(str(p.slug) || title) || newId();
      const db = readDb();
      const taken = (s: string) => db.posts.some((x) => x.slug === s && x.id !== id);
      let n = 2;
      const baseSlug = slug;
      while (taken(slug)) slug = `${baseSlug}-${n++}`;
      updateDb((d) => {
        const existing = d.posts.find((x) => x.id === id);
        const data: Omit<Post, "id" | "createdAt"> = {
          slug,
          title,
          excerpt: str(p.excerpt, 1000).trim(),
          contentHtml: str(p.contentHtml),
          coverImage: str(p.coverImage, 500).trim(),
          coverAlt: str(p.coverAlt, 300).trim(),
          seoTitle: str(p.seoTitle, 300).trim(),
          seoDescription: str(p.seoDescription, 500).trim(),
          keywords: str(p.keywords, 1000).trim(),
          published: p.published === true,
          updatedAt: now,
        };
        if (existing) Object.assign(existing, data);
        else {
          id = newId();
          d.posts.unshift({ id, createdAt: now, ...data });
        }
      });
      return ok({ id, slug });
    }

    case "deletePost": {
      const id = str(body.id);
      updateDb((db) => {
        db.posts = db.posts.filter((p) => p.id !== id);
      });
      return ok();
    }

    case "savePage": {
      const key = str(body.key) as PageKey;
      if (!PAGE_KEYS.includes(key)) return fail("Unknown page");
      const p = (body.page || {}) as Body;
      updateDb((db) => {
        db.pages[key] = {
          title: str(p.title, 300).trim() || db.pages[key].title,
          contentHtml: str(p.contentHtml),
          seoTitle: str(p.seoTitle, 300).trim(),
          seoDescription: str(p.seoDescription, 500).trim(),
          updatedAt: new Date().toISOString(),
        };
      });
      return ok();
    }

    case "listMedia":
      return ok({ media: readDb().media });

    case "deleteMedia": {
      const id = str(body.id);
      updateDb((db) => {
        const m = db.media.find((x) => x.id === id);
        if (m) {
          const fp = path.join(UPLOAD_DIR, path.basename(m.file));
          if (fs.existsSync(fp)) fs.unlinkSync(fp);
        }
        db.media = db.media.filter((x) => x.id !== id);
      });
      return ok();
    }

    case "changePassword": {
      const current = str(body.current);
      const next = str(body.next);
      const email = str(body.email, 200).trim().toLowerCase();
      if (!verifyPassword(current, currentPasswordHash())) return fail("Current password is wrong");
      if (next && next.length < 8) return fail("New password must be at least 8 characters");
      if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return fail("Invalid email");
      updateDb((db) => {
        if (next) db.adminPasswordHash = hashPassword(next);
        if (email) db.adminEmail = email;
      });
      if (email) jar.set(SESSION_COOKIE, makeToken(email), { ...cookieOpts, maxAge: SESSION_MAX_AGE });
      return ok();
    }
  }
  return fail("Unknown action");
}
