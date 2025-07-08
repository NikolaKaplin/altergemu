import type React from "react";
import { redirect } from "next/navigation";
import { validateRequest } from "@/lib/auth-utils";
import AdminSidebar from "@/components/admin/admin-sidebar";
import AdminHeader from "@/components/admin/admin-header";
import { Toaster } from "react-hot-toast";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await validateRequest();

  if (!user) {
    redirect("/admin/login");
  }

  if (!user.isActive) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex h-screen">
        <AdminSidebar user={user} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader user={user} />
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}
