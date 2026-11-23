import type { SiteContent } from "@/lib/cms/types";

export function Footer({ site }: { site: SiteContent }) {
  return (
    <footer className="border-t border-border py-8">
      <div className="container-page flex flex-col gap-2 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>{site.footerNote}</p>
        <p>© 2026</p>
      </div>
    </footer>
  );
}
