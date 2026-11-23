import { Suspense } from "react";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/LoginForm";
import { isAdmin } from "@/lib/cms/auth";
import { isSupabaseConfigured } from "@/lib/cms/env";

export const metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

async function LoginContent() {
  await connection();

  if (await isAdmin()) {
    redirect("/admin");
  }

  return (
    <div className="flex min-h-svh items-center justify-center bg-background px-5">
      <div className="w-full max-w-md rounded-2xl border border-border bg-surface/40 p-8">
        <h1 className="text-2xl font-semibold tracking-[-0.03em] text-foreground">
          Admin sign in
        </h1>
        <p className="mt-2 text-sm text-muted">
          Private dashboard for Carter Nguyen’s portfolio.
        </p>

        {!isSupabaseConfigured() ? (
          <div className="mt-6 rounded-xl border border-border bg-background/60 p-4 text-sm text-muted">
            <p className="font-medium text-foreground">Setup required</p>
            <ol className="mt-3 list-decimal space-y-2 pl-4">
              <li>Create a Supabase project</li>
              <li>
                Copy <code className="text-accent">.env.example</code> to{" "}
                <code className="text-accent">.env.local</code> and fill keys
              </li>
              <li>
                Run <code className="text-accent">supabase/migrations/001_cms.sql</code>{" "}
                in the SQL editor
              </li>
              <li>
                Create an Auth user matching <code className="text-accent">ADMIN_EMAIL</code>
              </li>
            </ol>
          </div>
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-svh items-center justify-center bg-background text-sm text-muted">
          Loading…
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
