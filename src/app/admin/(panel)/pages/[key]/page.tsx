import { notFound } from "next/navigation";
import { getDb, PAGE_KEYS, type PageKey } from "@/lib/store";
import PageForm from "@/components/admin/PageForm";

export default async function EditPage({ params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  if (!PAGE_KEYS.includes(key as PageKey)) notFound();
  const db = await getDb();
  return <PageForm pageKey={key} initial={db.pages[key as PageKey]} />;
}
