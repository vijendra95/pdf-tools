import type { Metadata } from "next";
import { getDb, type PageKey } from "@/lib/store";
import { SITE_URL } from "@/lib/site";

export async function staticPageMetadata(key: PageKey): Promise<Metadata> {
  const db = await getDb();
  const p = db.pages[key];
  const title = p.seoTitle || `${p.title} | ${db.settings.siteName}`;
  const url = `${SITE_URL}/${key}/`;
  return { title, description: p.seoDescription || undefined, alternates: { canonical: url }, openGraph: { title, url } };
}

export default async function StaticPage({ pageKey }: { pageKey: PageKey }) {
  const db = await getDb();
  const p = db.pages[pageKey];
  const s = db.settings;
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8">{p.title}</h1>
      <div className="rich-content" dangerouslySetInnerHTML={{ __html: p.contentHtml }} />
      {pageKey === "contact" && (
        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          {s.contactEmail && (
            <a href={`mailto:${s.contactEmail}`} className="rounded-xl border border-gray-200 bg-white p-5 hover:border-red-300">
              <p className="font-semibold text-gray-900">Email</p>
              <p className="text-red-600">{s.contactEmail}</p>
            </a>
          )}
          {s.whatsappNumber && (
            <a href={`https://wa.me/${s.whatsappNumber}?text=${encodeURIComponent(s.whatsappMessage)}`} target="_blank" rel="noopener" className="rounded-xl border border-gray-200 bg-white p-5 hover:border-green-400">
              <p className="font-semibold text-gray-900">WhatsApp</p>
              <p className="text-green-600">+{s.whatsappNumber}</p>
            </a>
          )}
        </div>
      )}
    </div>
  );
}
