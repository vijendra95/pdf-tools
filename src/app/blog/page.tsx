import type { Metadata } from "next";
import Link from "next/link";
import { getDb } from "@/lib/store";
import { SITE_URL } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  const { settings: s } = await getDb();
  const title = `PDF Guides, Tips & Tutorials | ${s.siteName} Blog`;
  const description = "Step-by-step guides to merge, compress, convert, unlock, sign and edit PDF files for free, on mobile and desktop.";
  return { title, description, alternates: { canonical: `${SITE_URL}/blog/` }, openGraph: { title, description, url: `${SITE_URL}/blog/` } };
}

export default async function BlogIndex() {
  const db = await getDb();
  const posts = db.posts.filter((p) => p.published);
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
      <h1 className="page-title mb-3 text-center">PDF Guides & Tips</h1>
      <p className="page-desc text-center mb-10">Free tutorials to get more done with your PDF files.</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((p) => (
          <Link key={p.id} href={`/blog/${p.slug}`} className="rounded-2xl border border-gray-200 bg-white overflow-hidden hover:shadow-lg transition">
            {p.coverImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={p.coverImage} alt={p.coverAlt || p.title} className="w-full aspect-[16/9] object-cover" loading="lazy" />
            )}
            <div className="p-5">
              <h2 className="font-bold text-lg text-gray-900 mb-2">{p.title}</h2>
              <p className="text-gray-600 text-sm line-clamp-3">{p.excerpt}</p>
              <p className="text-xs text-gray-400 mt-3">{new Date(p.createdAt).toLocaleDateString("en-IN", { dateStyle: "medium" })}</p>
            </div>
          </Link>
        ))}
      </div>
      {posts.length === 0 && <p className="text-center text-gray-500">No articles yet.</p>}
    </div>
  );
}
