import { deleteMediaItem, getOrScheduleById } from "@/lib/db/orschedule";
import { redirect } from "next/navigation";

type PageProps = {
  params: Promise<{ id: string; index: string }>;
  searchParams: Promise<{tab: string}>;
};

export default async function DeleteMediaPage(props: PageProps) {
  const params = await props.params;
  const id = Number(params.id);
  const index = Number(params.index);
  const searchParams = await props.searchParams;
  const tab = searchParams.tab;

  const item = await getOrScheduleById(id);
  if (!item) return <div>ไม่พบข้อมูลเคส</div>;

  const mediaItem = item.media?.[index];
  if (!mediaItem) return <div>ไม่พบ media</div>;

  async function handleDelete() {
    "use server";
    await deleteMediaItem(id, index);
    redirect(`/orschedule/${id}?tab=${tab}`);
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold text-red-600">ลบ Media</h1>

      <img src={mediaItem.url} className="w-48 rounded border" />

      <p>คุณต้องการลบไฟล์นี้จริงหรือไม่?</p>

      <form action={handleDelete}>
        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          ลบไฟล์นี้
        </button>
      </form>
    </div>
  );
}
