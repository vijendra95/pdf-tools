import { notFound } from "next/navigation";
import { getDb, type Post } from "@/lib/store";
import PostForm from "@/components/admin/PostForm";

const empty: Post = {
  id: "",
  slug: "",
  title: "",
  excerpt: "",
  contentHtml: "",
  coverImage: "",
  coverAlt: "",
  seoTitle: "",
  seoDescription: "",
  keywords: "",
  published: false,
  createdAt: "",
  updatedAt: "",
};

export default async function EditPost({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const db = await getDb();
  const post = id === "new" ? empty : db.posts.find((p) => p.id === id);
  if (!post) notFound();
  return <PostForm initial={post} />;
}
