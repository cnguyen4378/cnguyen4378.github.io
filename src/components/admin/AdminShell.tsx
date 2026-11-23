import { AdminNav } from "@/components/admin/AdminNav";

type AdminShellProps = {
  children: React.ReactNode;
  email?: string | null;
};

export function AdminShell({ children, email }: AdminShellProps) {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <div className="mx-auto flex min-h-svh max-w-7xl flex-col md:flex-row">
        <AdminNav email={email} />
        <main className="min-w-0 flex-1 px-5 py-8 md:px-8">{children}</main>
      </div>
    </div>
  );
}
