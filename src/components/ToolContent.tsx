import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { getDb } from "@/lib/store";
import { resolveTool, type ResolvedTool } from "@/lib/tool-content/resolve";
import { tools } from "@/lib/tools";
import JsonLd from "./JsonLd";

const DEFAULT_PRIVACY =
  "Your files never leave your device. The tool runs entirely inside your web browser using JavaScript, so nothing is uploaded to our server, stored or shared. When you close the tab, the files are gone.";

async function getInfo(slug: string) {
  const db = await getDb();
  const info = resolveTool(slug, db);
  if (!info) throw new Error(`Missing tool content for ${slug}`);
  return { info, siteName: db.settings.siteName, db };
}

function allFaqs(info: ResolvedTool): [string, string][] {
  return [
    ...info.faqs,
    [
      `Is ${info.name} free to use?`,
      `Yes. ${info.name} is 100% free. There is no sign-up, no subscription, no watermark added to your files and no daily usage limit.`,
    ],
    [`Are my files safe and private?`, info.privacy ?? DEFAULT_PRIVACY],
    [
      `Does ${info.name} work on mobile phones?`,
      `Yes. ${info.name} works in any modern browser (Chrome, Edge, Safari, Firefox) on Android, iPhone, iPad, Windows, Mac and Linux. You do not need to install any app or software.`,
    ],
  ];
}

export async function toolMetadata(slug: string): Promise<Metadata> {
  const { info, siteName } = await getInfo(slug);
  const url = `${SITE_URL}/${slug}/`;
  return {
    title: info.title,
    description: info.description,
    keywords: info.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: info.title,
      description: info.description,
      url,
      siteName,
      type: "website",
      images: info.ogImage ? [info.ogImage] : undefined,
    },
    twitter: { card: "summary", title: info.title, description: info.description },
  };
}

export default async function ToolContent({ slug }: { slug: string }) {
  const { info, siteName, db } = await getInfo(slug);
  const url = `${SITE_URL}/${slug}/`;
  const faqs = allFaqs(info);
  const current = tools.find((t) => t.href === `/${slug}`);
  const related = tools
    .filter((t) => t.href !== `/${slug}` && t.category === current?.category)
    .slice(0, 6)
    .map((t) => ({ ...t, name: resolveTool(t.href.slice(1), db)?.name || t.name }));

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: info.name,
      url,
      description: info.description,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Any (web browser)",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      featureList: info.features.map(([t]) => t),
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: `How to use ${info.name}`,
      totalTime: "PT1M",
      step: info.steps.map((text, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: `Step ${i + 1}`,
        text,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map(([q, a]) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: siteName, item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: info.name, item: url },
      ],
    },
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 pb-20 text-gray-700">
      <JsonLd data={jsonLd} />
      <div className="border-t border-gray-200 pt-12 space-y-12">
        <article>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What is {info.name}?</h2>
          {info.introHtml ? (
            <div className="rich-content text-lg" dangerouslySetInnerHTML={{ __html: info.introHtml }} />
          ) : (
            info.intro.map((p, i) => (
              <p key={i} className="text-lg leading-relaxed mb-4">
                {p}
              </p>
            ))
          )}
        </article>

        <article>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">How to use {info.name}</h2>
          <ol className="space-y-3">
            {info.steps.map((s, i) => (
              <li key={i} className="flex gap-4 text-lg">
                <span className="flex-none w-8 h-8 rounded-full bg-red-500 text-white font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="pt-0.5">{s}</span>
              </li>
            ))}
          </ol>
        </article>

        <article>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Key features</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {info.features.map(([t, d]) => (
              <div key={t} className="rounded-xl border border-gray-200 bg-white p-5">
                <h3 className="font-semibold text-gray-900 mb-1">{t}</h3>
                <p className="leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </article>

        <article>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Who uses {info.name}?</h2>
          <ul className="list-disc pl-6 space-y-2 text-lg">
            {info.useCases.map((u) => (
              <li key={u}>{u}</li>
            ))}
          </ul>
        </article>

        {info.extraHtml && <article className="rich-content" dangerouslySetInnerHTML={{ __html: info.extraHtml }} />}

        <article>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Frequently asked questions</h2>
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
        </article>

        {related.length > 0 && (
          <article>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related tools</h2>
            <div className="flex flex-wrap gap-3">
              {related.map((t) => (
                <Link
                  key={t.href}
                  href={t.href}
                  className="rounded-full border border-gray-300 px-4 py-2 hover:border-red-400 hover:text-red-600"
                >
                  {t.icon} {t.name}
                </Link>
              ))}
            </div>
          </article>
        )}
      </div>
    </section>
  );
}
