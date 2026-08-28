import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("orschedule")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 404 });
  }

  return NextResponse.json({ ok: true, data });
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const supabase = await createClient();
  const body = await req.json();

  const { data, error } = await supabase
    .from("orschedule")
    .update(body)
    .eq("id", params.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true, data });
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("orschedule")
    .delete()
    .eq("id", params.id);

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
