import Navbar from "@/components/Navbar";
import { createOrSchedule } from "@/lib/db/orschedule";
import OrScheduleForm from "@/components/orschedule/OrScheduleForm";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function CreateOrSchedulePage(props: {
  searchParams: Promise<{ [key:string]: string | string[] }>;
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
      <Navbar />

      <div className="p-6 max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Add New OR Schedule</h1>

          <Link
            href="/orschedule"
            className="px-4 py-2 bg-[#222] border border-[#333] rounded hover:bg-[#333]"
          >
            Back
          </Link>
        </div>

        {/* Form Card */}
        <div className="bg-[#151515] border border-[#333] rounded-lg p-6 shadow-lg">
          <OrScheduleForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
