"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { getAdminEmail, isSupabaseConfigured } from "@/lib/cms/env";
import { createClient } from "@/lib/supabase/server";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type LoginState = {
  error?: string;
};

export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  if (!isSupabaseConfigured()) {
    return {
      error:
        "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local.",
    };
  }

  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: "Enter a valid email and password (min 8 characters)." };
  }

  const adminEmail = getAdminEmail();
  if (!adminEmail) {
    return { error: "ADMIN_EMAIL is not set on the server." };
  }

  if (parsed.data.email.toLowerCase() !== adminEmail) {
    return { error: "This account is not authorized." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    return { error: "Invalid credentials." };
  }

  redirect("/admin");
}

export async function logoutAction() {
  if (!isSupabaseConfigured()) {
    redirect("/admin/login");
  }
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
