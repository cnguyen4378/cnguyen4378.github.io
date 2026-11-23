import { SiteEditor } from "@/components/admin/SiteEditor";
import { getEditableSite } from "@/lib/cms/site-admin";

export default async function AdminAboutPage() {
  const { site, source } = await getEditableSite();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-[-0.03em]">About Me</h1>
        <p className="mt-2 text-sm text-muted">
          Edit bio copy, then save a draft or publish live.
        </p>
      </div>
      <SiteEditor initial={site} source={source} mode="about" />
    </div>
  );
}
