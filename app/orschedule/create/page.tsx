import Navbar from "@/components/Navbar";
import { createOrSchedule } from "@/lib/db/orschedule";
import OrScheduleForm from "@/components/orschedule/OrScheduleForm";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function CreateOrSchedulePage(props: {
  searchParams: Promise<{ [key: string]: string | string[] }>;
}) {
  const searchParams = await props.searchParams;
  const tab = searchParams.tab ?? "today";

  async function handleSubmit(values: any) {
    "use server";
    await createOrSchedule(values);

    redirect(`/orschedule?tab=${tab}`);
  }

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">

      {/* Fixed Header */}
      <div className="sticky top-0 z-50 bg-[#0b0b0b] border-b border-[#333] px-6 py-4 shadow-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">เพิ่มข้อมูล</h1>

          <Link
            href="/orschedule"
            className="px-4 py-2 bg-[#222] border border-[#333] rounded hover:bg-[#333]"
          >
            Back
          </Link>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-[#151515] border border-[#333] rounded-lg p-6 shadow-lg">
        <OrScheduleForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
