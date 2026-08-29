import { createClient } from "@/lib/supabase/server";
import type { OrSchedule } from "@/types/orschedule";

export const monEng = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export const monThai = [
  "ม.ค.",
  "ก.พ.",
  "มี.ค.",
  "เม.ย.",
  "พ.ค.",
  "มิ.ย.",
  "ก.ค.",
  "ส.ค.",
  "ก.ย.",
  "ต.ค.",
  "พ.ย.",
  "ธ.ค.",
];
export const monThaiFull = [
  "มกราคม",
  "กุมภาพันธ์",
  "มีนาคม",
  "เมษายน",
  "พฤษภาคม",
  "มิถุนายน",
  "กรกฎาคม",
  "สิงหาคม",
  "กันยายน",
  "ตุลาคม",
  "พฤศจิกายน",
  "ธันวาคม",
];

// ดึงทั้งหมด (หรือ filter ตามวันที่)
export async function getOrScheduleList(
  opdate?: string,
  compare?: "lt" | "eq" | "gt",
): Promise<OrSchedule[]> {
  const supabase = await createClient();

  let query = supabase
    .from("orschedule")
    .select("*")
    .order("opdate", { ascending: true })
    .order("status", { ascending: false})
    .order("optype", { ascending: false})
    .order("que", { ascending: true})

  if (opdate && compare) {
    if (compare == "lt") query = query.lt("opdate", opdate);
    else if (compare == "eq") query = query.eq("opdate", opdate);
    else if (compare == "gt") query = query.gt("opdate", opdate);
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);

  return (data as OrSchedule[]) ?? [];
}

// ดึงเคสตามเดือน
export async function getOrScheduleByMonth(year: number, month: number) {
  const supabase = await createClient();

  const lastDay = new Date(year, month, 0).getDate();
  const start = `${year}-${String(month).padStart(2, "0")}-01`;
  const end = `${year}-${String(month).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;

  const { data, error } = await supabase
    .from("orschedule")
    .select("*")
    .gte("opdate", start)
    .lte("opdate", end)
    .order("opdate", { ascending: true })
    .order("status", { ascending: false})
    .order("optype", { ascending: false})
    .order("que", { ascending: true})

  if (error) throw new Error(error.message);

  return data as OrSchedule[];
}

// ดึงรายการเดียว
export async function getOrScheduleById(
  id: number,
): Promise<OrSchedule | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("orschedule")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);

  return data as OrSchedule;
}

// สร้างใหม่
export async function createOrSchedule(
  payload: Partial<OrSchedule>,
): Promise<OrSchedule> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("orschedule")
    .insert(payload)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data as OrSchedule;
}

// อัปเดต
export async function updateOrSchedule(
  id: number,
  payload: Partial<OrSchedule>,
): Promise<OrSchedule> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("orschedule")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data as OrSchedule;
}

// ลบ
export async function deleteOrSchedule(id: number): Promise<boolean> {
  const supabase = await createClient();

  // ดึง media ก่อนเพื่อลบไฟล์ใน storage
  const { data: row, error: getErr } = await supabase
    .from("orschedule")
    .select("media")
    .eq("id", id)
    .single();

  if (getErr) throw new Error(getErr.message);

  // ลบไฟล์ media ทั้งหมดใน storage
  if (row?.media?.length > 0) {
    const paths = row.media.map((m: any) => m.path).filter(Boolean);
    if (paths.length > 0) {
      await supabase.storage.from("media").remove(paths);
    }
  }

  // ลบ record
  const { error } = await supabase.from("orschedule").delete().eq("id", id);

  if (error) throw new Error(error.message);

  return true;
}

// add media field
export async function addMediaToOrSchedule(id: number, mediaItem: any) {
  const supabase = await createClient();

  // ดึง media เดิม
  const { data: existing, error: getErr } = await supabase
    .from("orschedule")
    .select("media")
    .eq("id", id)
    .single();

  if (getErr) throw new Error(getErr.message);

  const newMedia = [...(existing.media ?? []), mediaItem];

  const { error: updateErr } = await supabase
    .from("orschedule")
    .update({ media: newMedia })
    .eq("id", id);

  if (updateErr) throw new Error(updateErr.message);

  return newMedia;
}

// delete media Item
export async function deleteMediaItem(id: number, mediaIndex: number) {
  const supabase = await createClient();

  const { data: row, error: getErr } = await supabase
    .from("orschedule")
    .select("*")
    .eq("id", id)
    .single();

  if (getErr) throw new Error(getErr.message);

  const media = row.media ?? [];
  const target = media[mediaIndex];

  if (!target) throw new Error("Media not found");

  // ลบไฟล์ใน storage
  if (target.path) {
    await supabase.storage.from("media").remove([target.path]);
  }

  // ลบออกจาก array
  const newMedia = media.filter((_: any, i: number) => i !== mediaIndex);

  const { error: updateErr } = await supabase
    .from("orschedule")
    .update({ media: newMedia })
    .eq("id", id);

  if (updateErr) throw new Error(updateErr.message);

  return newMedia;
}

// getOrSummary
export async function getOrSummary(year: number, month: number) {
  const supabase = await createClient();

  const start = `${year}-${String(month).padStart(2, "0")}-01`;
  const end = `${year}-${String(month).padStart(2, "0")}-31`;

  const { data, error } = await supabase
    .from("orschedule")
    .select("*")
    .gte("opdate", start)
    .lte("opdate", end);

  if (error) throw new Error(error.message);

  return data as OrSchedule[];
}
