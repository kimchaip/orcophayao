import { getOrScheduleById, updateOrSchedule } from "@/lib/db/orschedule";
import OrScheduleForm from "@/components/orschedule/OrScheduleForm";
import { redirect } from "next/navigation";
import Link from "next/link";

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab: string }>;
};

export default async function EditOrSchedulePage(props: PageProps) {
  const params = await props.params;
  const id = Number(params.id);
  const item = await getOrScheduleById(id);
  const searchParams = await props.searchParams;
  const tab = searchParams.tab;

  if (!item) {
    return <div>ไม่พบข้อมูลเคส</div>;
  }

  async function handleSubmit(values: any) {
    "use server";
    await updateOrSchedule(id, values);
    redirect(`/orschedule/${id}?tab=${tab}`);
  }

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      {/* Fixed Header */}
      <div className="sticky top-0 z-50 bg-[#0b0b0b] border-b border-[#333] px-6 py-4 shadow-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">แก้ไขข้อมูล</h1>

          <Link
            href={`/orschedule/${id}?tab=${tab}`}
            className="px-4 py-2 bg-[#222] border border-[#333] rounded hover:bg-[#333]"
          >
            Back
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="bg-[#151515] border border-[#333] rounded-lg p-6 shadow-lg">
        <OrScheduleForm initial={item} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
