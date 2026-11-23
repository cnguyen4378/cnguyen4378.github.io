"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/app/admin/actions";
import { cn } from "@/lib/cn";

const nav = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/media", label: "Media Library" },
  { href: "/admin/experience", label: "Experience" },
  { href: "/admin/about", label: "About Me" },
  { href: "/admin/homepage", label: "Homepage" },
  { href: "/admin/settings", label: "Site Settings" },
] as const;

export function AdminNav({ email }: { email?: string | null }) {
  const pathname = usePathname();

  return (
    <>
      <aside className="hidden w-60 shrink-0 flex-col border-r border-border md:flex">
        <div className="border-b border-border px-5 py-5">
          <p className="text-sm font-medium tracking-[-0.02em]">Portfolio Admin</p>
          <p className="mt-1 truncate text-xs text-muted">{email ?? "Administrator"}</p>
        </div>
        <nav className="flex flex-1 flex-col gap-0.5 p-3" aria-label="Admin">
          {nav.map((item) => {
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm transition-colors duration-150 ease-[var(--ease-out)]",
                  active
                    ? "bg-white/[0.06] text-foreground"
                    : "text-muted hover:bg-white/[0.03] hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="space-y-2 border-t border-border p-3">
          <Link href="/" className="btn w-full" target="_blank" rel="noopener noreferrer">
            Open site
          </Link>
          <Link href="/preview" className="btn w-full">
            Preview drafts
          </Link>
          <form action={logoutAction}>
            <button type="submit" className="btn w-full">
              Sign out
            </button>
          </form>
        </div>
      </aside>

      <header className="flex items-center justify-between border-b border-border px-5 py-4 md:hidden">
        <p className="text-sm font-medium">Portfolio Admin</p>
        <Link href="/" className="text-sm text-muted">
          Site
        </Link>
      </header>
      <nav
        className="flex gap-1 overflow-x-auto border-b border-border px-3 py-2 md:hidden"
        aria-label="Admin mobile"
      >
        {nav.map((item) => {
          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "shrink-0 rounded-full border px-3 py-1.5 text-xs",
                active
                  ? "border-accent/40 text-foreground"
                  : "border-border text-muted",
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
