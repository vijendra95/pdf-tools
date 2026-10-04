import type { Metadata } from "next";
import Link from "next/link";
import HomeClient from "@/components/HomeClient";
import JsonLd from "@/components/JsonLd";
import { getDb } from "@/lib/store";
import { tools } from "@/lib/tools";
import { resolveTool } from "@/lib/tool-content/resolve";
import { SITE_URL } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const { settings: s } = await getDb();
  return {
    title: s.homeTitle,
    description: s.homeDescription,
    keywords: s.homeKeywords,
    alternates: { canonical: `${SITE_URL}/` },
    openGraph: { title: s.homeTitle, description: s.homeDescription, url: `${SITE_URL}/`, type: "website" },
  };
}

const HOME_FAQS: [string, string][] = [
  ["What is PDF Tools?", "PDF Tools is a free website with more than 40 online tools to merge, split, compress, convert, edit, sign, protect, OCR, translate and summarize PDF files, plus audio converters. Everything works in your web browser."],
  ["Is PDF Tools free?", "Yes. Every tool is completely free, with no sign-up, no watermark and no daily limit."],
  ["Are my files uploaded to a server?", "No. Files are processed on your own device inside the browser, so they are never uploaded or stored. Only Translate PDF sends extracted text to a translation service."],
  ["Is PDF Tools a good iLovePDF alternative?", "Yes. It covers the same tools as iLovePDF, including merge, split, compress, PDF to Word, OCR, sign, redact, compare, PDF/A and AI summarize, and it works without uploading your files."],
  ["Can I use PDF Tools on my phone?", "Yes. All tools work in Chrome, Safari, Edge and Firefox on Android, iPhone, iPad, Windows, Mac and Linux without installing an app."],
  ["Does PDF Tools support Hindi?", "Yes. OCR PDF recognises Hindi and other Indian languages, and Translate PDF can translate documents between English and Hindi."],
];

export default async function Home() {
  const db = await getDb();
  const s = db.settings;
  const list = tools.map((t) => {
    const r = resolveTool(t.href.slice(1), db);
    return r ? { ...t, name: r.name, description: r.cardDescription } : t;
  });
  const posts = db.posts.filter((p) => p.published).slice(0, 3);
  const faqs = HOME_FAQS.map(([q, a]) => [q.replace("PDF Tools", s.siteName), a.replace("PDF Tools", s.siteName)] as [string, string]);

  const jsonLd = [
    { "@context": "https://schema.org", "@type": "Organization", name: s.orgName || s.siteName, url: `${SITE_URL}/`, email: s.contactEmail || undefined },
    { "@context": "https://schema.org", "@type": "WebSite", name: s.siteName, url: `${SITE_URL}/`, description: s.homeDescription },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${s.siteName} – all tools`,
      itemListElement: list.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.name, url: `${SITE_URL}${t.href}/` })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <HomeClient tools={list} heroTitle={s.heroTitle} heroSubtitle={s.heroSubtitle} />
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20 space-y-14 text-gray-700">
        {posts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Guides & tips</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {posts.map((p) => (
                <Link key={p.id} href={`/blog/${p.slug}`} className="rounded-xl border border-gray-200 bg-white p-5 hover:border-red-300">
                  <h3 className="font-semibold text-gray-900 mb-2">{p.title}</h3>
                  <p className="text-sm line-clamp-3">{p.excerpt}</p>
                </Link>
              ))}
            </div>
            <p className="text-center mt-4">
              <Link href="/blog" className="text-red-600 font-semibold">View all articles →</Link>
            </p>
          </div>
        )}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Frequently asked questions</h2>
          <div className="space-y-3">
            {faqs.map(([q, a]) => (
              <details key={q} className="group rounded-xl border border-gray-200 bg-white p-5">
                <summary className="cursor-pointer list-none flex justify-between gap-4 font-semibold text-gray-900">
                  <h3>{q}</h3>
                  <span className="text-red-500 group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                </summary>
                <p className="mt-3 leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
