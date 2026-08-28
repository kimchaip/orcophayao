import { createClient } from "@/lib/supabase/server";
import { getOrScheduleById, addMediaToOrSchedule } from "@/lib/db/orschedule";
import MediaUploadForm from "@/components/orschedule/MediaUploadForm";
import { redirect } from "next/navigation";

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{tab: string}>;
};

export default async function MediaPage(props: PageProps) {
  const params = await props.params;
  const id = Number(params.id);
  const item = await getOrScheduleById(id);
  const searchParams = await props.searchParams;
  const tab = searchParams.tab;

  if (!item) return <div>ไม่พบข้อมูลเคส</div>;

  async function handleUpload(formData: FormData) {
    "use server";

    const file = formData.get("file") as File;
    if (!file) return;

    // อัปโหลดไป Supabase Storage
    const supabase = await createClient();
    const filePath = `orschedule/${id}/${Date.now()}-${file.name}`;

    const { error: uploadErr } = await supabase.storage
      .from("media")
      .upload(filePath, file);

    if (uploadErr) throw new Error(uploadErr.message);

    const publicUrl = supabase.storage.from("media").getPublicUrl(filePath).data.publicUrl;

    await addMediaToOrSchedule(id, {
      url: publicUrl,
      name: file.name,
      uploaded_at: new Date().toISOString(),
    });

    redirect(`/orschedule/${id}?tab=${tab}`);
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold">อัปโหลดรูป / ไฟล์</h1>
      <MediaUploadForm onSubmit={handleUpload} />
    </div>
  );
}
