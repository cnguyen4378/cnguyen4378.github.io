import { isSupabaseConfigured } from "@/lib/cms/env";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const MEDIA_BUCKET = "media";

export type MediaListItem = {
  name: string;
  path: string;
  publicUrl: string;
  updatedAt?: string | null;
  size?: number | null;
};

export type MediaLibraryStatus = {
  configured: boolean;
  bucketExists: boolean;
  canList: boolean;
  error?: string;
  items: MediaListItem[];
};

async function getStorageClient() {
  // Prefer service role for reliable bucket inspection; fall back to user session.
  if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return createAdminClient();
  }
  return createClient();
}

export async function getMediaLibraryStatus(): Promise<MediaLibraryStatus> {
  if (!isSupabaseConfigured()) {
    return {
      configured: false,
      bucketExists: false,
      canList: false,
      error: "Supabase env vars are missing.",
      items: [],
    };
  }

  try {
    const supabase = await getStorageClient();

    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    if (bucketsError) {
      // listBuckets may be restricted; try listing the bucket directly.
      const listed = await listMediaFiles(supabase);
      return listed;
    }

    const bucketExists = (buckets ?? []).some((bucket) => bucket.name === MEDIA_BUCKET);
    if (!bucketExists) {
      return {
        configured: true,
        bucketExists: false,
        canList: false,
        error: `No bucket named "${MEDIA_BUCKET}" found. Create a public Storage bucket with that exact name.`,
        items: [],
      };
    }

    return listMediaFiles(supabase);
  } catch (error) {
    return {
      configured: true,
      bucketExists: false,
      canList: false,
      error: error instanceof Error ? error.message : "Could not reach Storage.",
      items: [],
    };
  }
}

type StorageClient = Awaited<ReturnType<typeof getStorageClient>>;

function isFileEntry(entry: { id?: string | null; name: string }) {
  // Folders from list() have a null id; real objects have an id.
  return Boolean(entry.id) && entry.name !== ".emptyFolderPlaceholder";
}

async function listPrefix(
  supabase: StorageClient,
  prefix: string,
): Promise<{ items: MediaListItem[]; error?: string }> {
  const { data, error } = await supabase.storage.from(MEDIA_BUCKET).list(prefix, {
    limit: 200,
    sortBy: { column: "updated_at", order: "desc" },
  });

  if (error) {
    return { items: [], error: error.message };
  }

  const items: MediaListItem[] = [];
  const folders: string[] = [];

  for (const entry of data ?? []) {
    if (entry.name === ".emptyFolderPlaceholder") continue;

    if (isFileEntry(entry)) {
      const path = prefix ? `${prefix}/${entry.name}` : entry.name;
      const { data: urlData } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path);
      items.push({
        name: entry.name,
        path,
        publicUrl: urlData.publicUrl,
        updatedAt: entry.updated_at,
        size: entry.metadata?.size ?? null,
      });
      continue;
    }

    // Treat null-id entries as folders and recurse (uploads/, etc.).
    folders.push(prefix ? `${prefix}/${entry.name}` : entry.name);
  }

  for (const folder of folders) {
    const nested = await listPrefix(supabase, folder);
    if (nested.error) return nested;
    items.push(...nested.items);
  }

  return { items };
}

async function listMediaFiles(supabase: StorageClient): Promise<MediaLibraryStatus> {
  const listed = await listPrefix(supabase, "");

  if (listed.error) {
    const missing =
      /not found|does not exist|Bucket not found/i.test(listed.error) ||
      listed.error.includes("404");
    return {
      configured: true,
      bucketExists: !missing,
      canList: false,
      error: missing
        ? `No bucket named "${MEDIA_BUCKET}" found. Create a public Storage bucket with that exact name.`
        : listed.error,
      items: [],
    };
  }

  const items = listed.items.sort((a, b) => {
    const aTime = a.updatedAt ? Date.parse(a.updatedAt) : 0;
    const bTime = b.updatedAt ? Date.parse(b.updatedAt) : 0;
    return bTime - aTime;
  });

  return {
    configured: true,
    bucketExists: true,
    canList: true,
    items,
  };
}
