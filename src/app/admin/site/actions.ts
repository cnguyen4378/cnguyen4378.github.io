"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";
import { requireAdmin } from "@/lib/cms/auth";
import { isSupabaseConfigured } from "@/lib/cms/env";
import { getEditableSite, siteToRow } from "@/lib/cms/site-admin";
import type { SiteContent } from "@/lib/cms/types";
import { createAdminClient } from "@/lib/supabase/admin";

const siteSchema = z.object({
  name: z.string().min(1),
  shortName: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  url: z.string().url(),
  email: z.string().email(),
  github: z.string().url(),
  linkedin: z.string().url(),
  headshot: z.string().min(1),
  headline: z.string().min(1),
  roleLine: z.string().min(1),
  about: z.string().min(1),
  aboutMore: z.string().min(1),
  contactHeading: z.string().min(1),
  contactNote: z.string().min(1),
  footerNote: z.string().min(1),
});

function mergeSite(base: SiteContent, patch: z.infer<typeof siteSchema>): SiteContent {
  return {
    ...base,
    ...patch,
  };
}

async function requireAdminDb() {
  if (!isSupabaseConfigured()) {
    return { error: "Supabase is not configured." as const };
  }
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return {
      error: "SUPABASE_SERVICE_ROLE_KEY is required to save site settings." as const,
    };
  }
  const admin = await requireAdmin();
  if (!admin) {
    return { error: "Unauthorized." as const };
  }
  return { supabase: createAdminClient() };
}

export async function saveSiteDraftAction(raw: unknown) {
  const gate = await requireAdminDb();
  if ("error" in gate) return { error: gate.error };

  const parsed = siteSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: "Check the form fields and try again." };
  }

  const { site: current } = await getEditableSite();
  const next = mergeSite(current, parsed.data);
  const { error } = await gate.supabase
    .from("site_settings")
    .upsert(siteToRow(next, "draft"), { onConflict: "status" });

  if (error) return { error: error.message };

  revalidatePath("/admin/about");
  revalidatePath("/admin/homepage");
  revalidatePath("/admin/settings");
  revalidatePath("/preview");
  return { ok: true as const };
}

export async function publishSiteAction(raw: unknown) {
  const gate = await requireAdminDb();
  if ("error" in gate) return { error: gate.error };

  const parsed = siteSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: "Check the form fields and try again." };
  }

  const { site: current } = await getEditableSite();
  const next = mergeSite(current, parsed.data);

  const draftUpsert = await gate.supabase
    .from("site_settings")
    .upsert(siteToRow(next, "draft"), { onConflict: "status" });
  if (draftUpsert.error) return { error: draftUpsert.error.message };

  const publishedUpsert = await gate.supabase
    .from("site_settings")
    .upsert(siteToRow(next, "published"), { onConflict: "status" });
  if (publishedUpsert.error) return { error: publishedUpsert.error.message };

  revalidateTag("portfolio-published", "max");
  revalidatePath("/");
  revalidatePath("/admin/about");
  revalidatePath("/admin/homepage");
  revalidatePath("/preview");
  return { ok: true as const };
}
