import { deleteOrSchedule, getOrScheduleById } from "@/lib/db/orschedule";
import { redirect } from "next/navigation";

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab: string }>;
};

export default async function DeleteOrSchedulePage(props: PageProps) {
  const params = await props.params;
  const id = Number(params.id);
  const item = await getOrScheduleById(id);
  const searchParams = await props.searchParams;
  const tab = searchParams.tab;

  if (!item) return <div>ไม่พบข้อมูลเคส</div>;

  async function handleDelete() {
    "use server";
    await deleteOrSchedule(id);
    redirect(`/orschedule?tab${tab}`);
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold text-red-600">ลบเคส OR</h1>

      <p>คุณต้องการลบเคสนี้จริงหรือไม่?</p>
      <p><strong>{item.ptname}</strong> — {item.op}</p>

      <form action={handleDelete}>
        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          ลบเคสนี้
        </button>
      </form>
    </div>
  );
}
