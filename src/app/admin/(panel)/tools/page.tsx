import Link from "next/link";
import { getDb } from "@/lib/store";
import { tools } from "@/lib/tools";
import { resolveTool } from "@/lib/tool-content/resolve";
import { BASE_PATH } from "@/lib/site";

export default async function ToolsAdmin() {
  const db = await getDb();
  return (
    <div>
      <h1 className="text-3xl font-extrabold mb-2">Tools content</h1>
      <p className="text-gray-500 mb-6">Edit the name, SEO, page content, steps, features and FAQ of every tool page.</p>
      <div className="admin-card !p-0 overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-sm text-gray-500">
            <tr>
              <th className="p-3">Tool</th>
              <th className="p-3">Category</th>
              <th className="p-3">Status</th>
              <th className="p-3" />
            </tr>
          </thead>
          <tbody>
            {tools.map((t) => {
              const slug = t.href.slice(1);
              const r = resolveTool(slug, db);
              if (!r) return null;
              return (
                <tr key={slug} className="border-t">
                  <td className="p-3 font-semibold">
                    {t.icon} {r.name}
                    <div className="text-xs text-gray-400 font-normal">/{slug}/</div>
                  </td>
                  <td className="p-3 text-sm text-gray-600">{t.category}</td>
                  <td className="p-3 text-sm">{db.tools[slug] ? <span className="text-green-600">Customised</span> : <span className="text-gray-400">Default</span>}</td>
                  <td className="p-3 text-right whitespace-nowrap">
                    <Link href={`/admin/tools/${slug}`} className="text-red-600 font-semibold mr-4">
                      Edit
                    </Link>
                    <a href={`${BASE_PATH}/${slug}/`} target="_blank" className="text-gray-500">
                      View ↗
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
