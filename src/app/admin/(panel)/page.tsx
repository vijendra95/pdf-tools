import Link from "next/link";
import { getDb } from "@/lib/store";
import { toolContent } from "@/lib/tool-content";
import { SITE_URL } from "@/lib/site";

export default async function Dashboard() {
  const db = await getDb();
  const s = db.settings;
  const stats = [
    ["Tools", Object.keys(toolContent).length, "/admin/tools"],
    ["Customised tools", Object.keys(db.tools).length, "/admin/tools"],
    ["Blog posts", db.posts.length, "/admin/blog"],
    ["Published posts", db.posts.filter((p) => p.published).length, "/admin/blog"],
    ["Images", db.media.length, "/admin/media"],
  ] as const;
  const checks: [string, boolean][] = [
    ["Google Analytics ID", !!s.gaId],
    ["Google Search Console verification", !!s.gscVerification],
    ["Bing Webmaster verification", !!s.bingVerification],
    ["Meta Pixel ID", !!s.metaPixelId],
    ["AdSense publisher ID", !!s.adsenseClient],
    ["WhatsApp number", !!s.whatsappNumber],
    ["Social share image (OG image)", !!s.ogImage],
    ["Contact email", !!s.contactEmail],
  ];
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-extrabold">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {stats.map(([label, n, href]) => (
          <Link key={label} href={href} className="admin-card hover:border-red-300">
            <p className="text-3xl font-extrabold text-gray-900">{n}</p>
            <p className="text-gray-500 text-sm">{label}</p>
          </Link>
        ))}
      </div>
      <div className="admin-card">
        <h2 className="admin-h2 mb-4">SEO setup checklist</h2>
        <ul className="space-y-2">
          {checks.map(([label, done]) => (
            <li key={label} className="flex items-center gap-3">
              <span className={done ? "text-green-600" : "text-amber-500"}>{done ? "✔" : "○"}</span>
              <span>{label}</span>
              {!done && (
                <Link href="/admin/settings" className="text-sm text-red-500 underline">
                  add
                </Link>
              )}
            </li>
          ))}
        </ul>
        <div className="mt-6 text-sm text-gray-600 space-y-1">
          <p>Sitemap (submit in Google Search Console): <a className="text-red-600 underline" href={`${SITE_URL}/sitemap.xml`} target="_blank">{SITE_URL}/sitemap.xml</a></p>
          <p>AI crawler summary: <a className="text-red-600 underline" href={`${SITE_URL}/llms.txt`} target="_blank">{SITE_URL}/llms.txt</a></p>
        </div>
      </div>
    </div>
  );
}
