import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(req: Request) {
  const supabase = await createClient();

  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");

  let query = supabase.from("orschedule").select("*");

  if (date) query = query.eq("date", date);

  const { data, error } = await query.order("start_time");

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true, data });
}

export async function POST(req: Request) {
  const supabase = await createClient();
  const body = await req.json();

  const { data, error } = await supabase
    .from("orschedule")
    .insert(body)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true, data });
}
