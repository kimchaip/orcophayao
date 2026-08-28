import { getOrScheduleById, updateOrSchedule } from "@/lib/db/orschedule";
import OrScheduleForm from "@/components/orschedule/OrScheduleForm";
import { redirect } from "next/navigation";

type PageProps = {
  params: Promise<{id: string;}>;
  searchParams: Promise<{tab: string;}>;
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
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">แก้ไขข้อมูล OR</h1>
      <OrScheduleForm initial={item} onSubmit={handleSubmit} />
    </div>
  );
}
