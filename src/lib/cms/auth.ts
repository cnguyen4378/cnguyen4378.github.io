import { getAdminEmail, isSupabaseConfigured } from "@/lib/cms/env";
import { createClient } from "@/lib/supabase/server";

export async function getSessionUser() {
  if (!isSupabaseConfigured()) return null;
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    return data.user ?? null;
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const user = await getSessionUser();
  const adminEmail = getAdminEmail();
  if (!user?.email || !adminEmail) return null;
  if (user.email.toLowerCase() !== adminEmail) return null;
  return user;
}

export async function isAdmin() {
  return Boolean(await requireAdmin());
}
