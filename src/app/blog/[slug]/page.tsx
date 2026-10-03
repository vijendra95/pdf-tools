import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { getDb } from "@/lib/store";
import { SITE_URL } from "@/lib/site";

async function getPost(slug: string) {
  const db = await getDb();
  const post = db.posts.find((p) => p.slug === slug && p.published);
  return { post, db };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { post } = await getPost(slug);
  if (!post) return { title: "Not found", robots: { index: false } };
  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt;
  const url = `${SITE_URL}/blog/${post.slug}/`;
  return {
    title,
    description,
    keywords: post.keywords || undefined,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { post, db } = await getPost(slug);
  if (!post) notFound();
  const s = db.settings;
  const url = `${SITE_URL}/blog/${post.slug}/`;
  const more = db.posts.filter((p) => p.published && p.id !== post.id).slice(0, 3);
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.seoDescription || post.excerpt,
      image: post.coverImage ? new URL(post.coverImage, `${SITE_URL}/`).toString() : undefined,
      datePublished: post.createdAt,
      dateModified: post.updatedAt,
      author: { "@type": "Organization", name: s.orgName || s.siteName },
      publisher: { "@type": "Organization", name: s.orgName || s.siteName },
      mainEntityOfPage: url,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: s.siteName, item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog/` },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
  ];
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
      <JsonLd data={jsonLd} />
      <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-red-600">Home</Link> › <Link href="/blog" className="hover:text-red-600">Blog</Link> › <span>{post.title}</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-3">{post.title}</h1>
      <p className="text-sm text-gray-400 mb-8">
        Updated <time dateTime={post.updatedAt}>{new Date(post.updatedAt).toLocaleDateString("en-IN", { dateStyle: "long" })}</time>
      </p>
      {post.coverImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.coverImage} alt={post.coverAlt || post.title} className="w-full rounded-2xl mb-8" />
      )}
      <div className="rich-content" dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      <div className="mt-12 rounded-2xl bg-red-50 border border-red-100 p-6 text-center">
        <p className="font-semibold text-gray-900 mb-3">40+ free PDF tools, no upload required</p>
        <Link href="/" className="btn-primary inline-block">Explore all tools</Link>
      </div>
      {more.length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-4">More guides</h2>
          <ul className="space-y-2">
            {more.map((p) => (
              <li key={p.id}><Link href={`/blog/${p.slug}`} className="text-red-600 hover:underline">{p.title}</Link></li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
