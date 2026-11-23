"use server";

import { requireAdmin } from "@/lib/cms/auth";
import { isSupabaseConfigured } from "@/lib/cms/env";
import { seedCmsFromStatic } from "@/lib/cms/seed";

export async function seedFromStaticAction() {
  if (!isSupabaseConfigured()) {
    return { error: "Supabase is not configured." };
  }
  const admin = await requireAdmin();
  if (!admin) {
    return { error: "Unauthorized." };
  }
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return { error: "SUPABASE_SERVICE_ROLE_KEY is required to seed." };
  }

  try {
    await seedCmsFromStatic();
    return { ok: true as const };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Seed failed.",
    };
  }
}
