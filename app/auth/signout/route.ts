import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  // Check if a user's logged in
  const { data: claimsData } = await supabase.auth.getClaims();

  if (claimsData?.claims) {
    await supabase.auth.signOut();
  }

  // ❌ revalidatePath ไม่ใช้ใน Route Handler (Next.js 16)
  // ใช้ redirect ตรง ๆ แทน

  return NextResponse.redirect(new URL("/", request.url), {
    status: 302,
  });
}
