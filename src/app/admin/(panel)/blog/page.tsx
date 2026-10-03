import Link from "next/link";
import { getDb } from "@/lib/store";
import { BASE_PATH } from "@/lib/site";

export default async function BlogAdmin() {
  const db = await getDb();
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-extrabold">Blog</h1>
        <Link href="/admin/blog/new" className="btn-primary !py-2 !px-5">+ New post</Link>
      </div>
      <div className="admin-card !p-0 overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-sm text-gray-500">
            <tr><th className="p-3">Title</th><th className="p-3">Status</th><th className="p-3">Updated</th><th className="p-3" /></tr>
          </thead>
          <tbody>
            {db.posts.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-3 font-semibold">{p.title}<div className="text-xs text-gray-400 font-normal">/blog/{p.slug}/</div></td>
                <td className="p-3 text-sm">{p.published ? <span className="text-green-600">Published</span> : <span className="text-gray-400">Draft</span>}</td>
                <td className="p-3 text-sm text-gray-500">{p.updatedAt.slice(0, 10)}</td>
                <td className="p-3 text-right whitespace-nowrap">
                  <Link href={`/admin/blog/${p.id}`} className="text-red-600 font-semibold mr-4">Edit</Link>
                  {p.published && <a href={`${BASE_PATH}/blog/${p.slug}/`} target="_blank" className="text-gray-500">View ↗</a>}
                </td>
              </tr>
            ))}
            {db.posts.length === 0 && <tr><td className="p-6 text-gray-500" colSpan={4}>No posts yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
