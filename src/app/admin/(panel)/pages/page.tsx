import Link from "next/link";
import { getDb, PAGE_KEYS } from "@/lib/store";
import { BASE_PATH } from "@/lib/site";

export default async function PagesAdmin() {
  const db = await getDb();
  return (
    <div>
      <h1 className="text-3xl font-extrabold mb-2">Pages</h1>
      <p className="text-gray-500 mb-6">These pages are linked in the footer.</p>
      <div className="admin-card !p-0">
        {PAGE_KEYS.map((k) => (
          <div key={k} className="flex items-center justify-between p-4 border-t first:border-t-0">
            <div>
              <p className="font-semibold">{db.pages[k].title}</p>
              <p className="text-xs text-gray-400">/{k}/</p>
            </div>
            <div className="whitespace-nowrap">
              <Link href={`/admin/pages/${k}`} className="text-red-600 font-semibold mr-4">Edit</Link>
              <a href={`${BASE_PATH}/${k}/`} target="_blank" className="text-gray-500">View ↗</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
