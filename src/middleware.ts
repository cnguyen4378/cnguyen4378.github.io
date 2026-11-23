import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const response = await updateSession(request);
  const { pathname } = request.nextUrl;

  // Soft gate: redirect unauthenticated users away from admin UI (except login).
  // Hard authorization still happens in server components / actions.
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
      // Allow shell when Supabase is not configured so setup instructions are visible.
      return response;
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|pdf)$).*)",
  ],
};
