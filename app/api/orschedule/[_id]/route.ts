import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// ---------------- GET ----------------
export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const supabase = await createClient();
  const id = context.params.id;

  const { data, error } = await supabase
    .from("orschedule")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 404 });
  }

  return NextResponse.json({ ok: true, data });
}

// ---------------- PATCH ----------------
export async function PATCH(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const supabase = await createClient();
  const id = context.params.id;
  const body = await req.json();

  const { data, error } = await supabase
    .from("orschedule")
    .update(body)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true, data });
}

// ---------------- DELETE ----------------
export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const supabase = await createClient();
  const id = context.params.id;

  const { error } = await supabase
    .from("orschedule")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
