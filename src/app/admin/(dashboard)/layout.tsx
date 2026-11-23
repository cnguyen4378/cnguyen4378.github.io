import { Suspense } from "react";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { requireAdmin } from "@/lib/cms/auth";
import { isSupabaseConfigured } from "@/lib/cms/env";

async function AdminAuthGate({ children }: { children: React.ReactNode }) {
  // Request-time APIs (cookies / auth) must run after connection() under Cache Components.
  await connection();

  if (!isSupabaseConfigured()) {
    return <AdminShell email="setup required">{children}</AdminShell>;
  }

  const user = await requireAdmin();
  if (!user) {
    redirect("/admin/login");
  }

  return <AdminShell email={user.email}>{children}</AdminShell>;
}

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-svh items-center justify-center bg-background text-sm text-muted">
          Loading admin…
        </div>
      }
    >
      <AdminAuthGate>{children}</AdminAuthGate>
    </Suspense>
  );
}
