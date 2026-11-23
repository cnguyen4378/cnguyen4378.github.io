import { MediaLibraryGrid } from "@/components/admin/MediaLibraryGrid";
import { MediaUploader } from "@/components/admin/MediaUploader";
import { getMediaLibraryStatus } from "@/lib/cms/media";

export default async function AdminMediaPage() {
  const status = await getMediaLibraryStatus();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-[-0.03em]">Media Library</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Upload images, then use <span className="text-foreground">Crop & zoom</span> to
          reframe them. Cropping saves a new file (original is kept).
        </p>
      </div>

      {!status.configured ? (
        <div className="rounded-2xl border border-border p-6 text-sm text-muted">
          Supabase is not configured in <code className="text-accent">.env.local</code>.
        </div>
      ) : !status.bucketExists ? (
        <div className="rounded-2xl border border-dashed border-border px-6 py-12 text-center">
          <p className="text-sm text-foreground">Bucket not found</p>
          <p className="mt-2 text-xs text-muted">
            {status.error ??
              "Create a public Storage bucket named exactly media in the Supabase dashboard."}
          </p>
        </div>
      ) : (
        <>
          <div className="rounded-2xl border border-border bg-surface/30 px-5 py-4 text-sm text-muted">
            Connected to bucket <span className="text-foreground">media</span>
            {status.canList ? ` · ${status.items.length} file(s)` : null}
          </div>

          <MediaUploader />

          {status.error && !status.canList ? (
            <p className="text-sm text-red-300" role="alert">
              {status.error}
            </p>
          ) : null}

          {status.items.length === 0 ? (
            <div className="rounded-2xl border border-border px-6 py-12 text-center text-sm text-muted">
              Bucket is empty — upload your first image above.
            </div>
          ) : (
            <MediaLibraryGrid items={status.items} />
          )}
        </>
      )}
    </div>
  );
}
