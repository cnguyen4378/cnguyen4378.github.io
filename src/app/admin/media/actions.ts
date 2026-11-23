"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "@/lib/cms/auth";
import { isSupabaseConfigured } from "@/lib/cms/env";
import { MEDIA_BUCKET } from "@/lib/cms/media";
import { createAdminClient } from "@/lib/supabase/admin";

const requestSchema = z.object({
  filename: z.string().min(1).max(180),
  contentType: z.enum([
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/avif",
    "image/gif",
  ]),
});

function sanitizeFilename(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "-").toLowerCase();
}

/** Returns a short-lived signed upload URL so the browser never needs Storage INSERT policies. */
export async function createMediaUploadUrlAction(input: {
  filename: string;
  contentType: string;
}) {
  if (!isSupabaseConfigured()) {
    return { error: "Supabase is not configured." };
  }
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return {
      error:
        "SUPABASE_SERVICE_ROLE_KEY is missing from .env.local (needed for signed uploads).",
    };
  }

  const admin = await requireAdmin();
  if (!admin) {
    return { error: "Unauthorized." };
  }

  const parsed = requestSchema.safeParse(input);
  if (!parsed.success) {
    return { error: "Unsupported file type or name." };
  }

  const path = `uploads/${Date.now()}-${sanitizeFilename(parsed.data.filename)}`;
  const supabase = createAdminClient();

  const { data, error } = await supabase.storage
    .from(MEDIA_BUCKET)
    .createSignedUploadUrl(path);

  if (error || !data) {
    return { error: error?.message ?? "Could not create upload URL." };
  }

  return {
    ok: true as const,
    path: data.path,
    token: data.token,
    signedUrl: data.signedUrl,
    contentType: parsed.data.contentType,
  };
}

export async function finalizeMediaUploadAction(path: string) {
  const admin = await requireAdmin();
  if (!admin) {
    return { error: "Unauthorized." };
  }
  revalidatePath("/admin/media");
  return { ok: true as const, path };
}
