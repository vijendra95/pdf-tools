import { getDb } from "@/lib/store";
import { adminEmail } from "@/lib/auth";
import SettingsForm from "@/components/admin/SettingsForm";

export default async function SettingsAdmin() {
  const db = await getDb();
  return <SettingsForm initial={db.settings} email={adminEmail()} />;
}
