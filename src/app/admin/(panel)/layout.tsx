import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import LogoutButton from "@/components/admin/LogoutButton";
import { BASE_PATH } from "@/lib/site";

const NAV = [
  ["/admin", "📊 Dashboard"],
  ["/admin/tools", "🧰 Tools content"],
  ["/admin/blog", "📝 Blog"],
  ["/admin/pages", "📄 Pages (FAQ, Privacy…)"],
  ["/admin/media", "🖼 Media gallery"],
  ["/admin/settings", "⚙️ Settings & SEO"],
];

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-900 text-gray-200 p-5 hidden md:flex flex-col gap-1 sticky top-0 h-screen">
        <p className="text-xl font-extrabold mb-6">
          <span className="text-red-400">PDF</span> Tools Admin
        </p>
        {NAV.map(([href, label]) => (
          <Link key={href} href={href} className="px-3 py-2 rounded-lg hover:bg-gray-800">
            {label}
          </Link>
        ))}
        <div className="flex-1" />
        <a href={`${BASE_PATH}/`} target="_blank" className="px-3 py-2 text-gray-400 hover:text-white">
          ↗ View website
        </a>
        <div className="px-3 py-2">
          <LogoutButton />
        </div>
      </aside>
      <div className="flex-1 min-w-0">
        <nav className="md:hidden flex gap-2 overflow-x-auto p-3 bg-gray-900 text-gray-200 text-sm">
          {NAV.map(([href, label]) => (
            <Link key={href} href={href} className="whitespace-nowrap px-3 py-1.5 rounded bg-gray-800">
              {label}
            </Link>
          ))}
        </nav>
        <div className="p-4 md:p-10 max-w-6xl">{children}</div>
      </div>
    </div>
  );
}
