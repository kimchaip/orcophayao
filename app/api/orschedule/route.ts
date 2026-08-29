import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// ---------------- GET ----------------
export async function GET(request: NextRequest) {
  const supabase = await createClient();

  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  let query = supabase.from("orschedule").select("*");

  if (date) query = query.eq("date", date);

  const { data, error } = await query.order("start_time");

  if (error) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 400 }
    );
  }

  return NextResponse.json({ ok: true, data });
}

// ---------------- POST ----------------
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const body = await request.json();

  const { data, error } = await supabase
    .from("orschedule")
    .insert(body)
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 400 }
    );
  }

  return NextResponse.json({ ok: true, data });
}
