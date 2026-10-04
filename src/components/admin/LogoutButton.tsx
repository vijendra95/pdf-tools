"use client";

import { useRouter } from "next/navigation";
import { adminApi } from "@/lib/admin-client";

export default function LogoutButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      className="text-left text-gray-400 hover:text-white"
      onClick={async () => {
        await adminApi("logout");
        router.replace("/admin/login");
        router.refresh();
      }}
    >
      ⎋ Logout
    </button>
  );
}
