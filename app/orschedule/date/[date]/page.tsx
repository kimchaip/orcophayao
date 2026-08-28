import Navbar from "@/components/Navbar";
import { getOrScheduleList } from "@/lib/db/orschedule";
import OrScheduleList from "@/components/orschedule/OrScheduleList";
import Link from "next/link";

type PageProps = {
  params: {
    date: string;
  };
};

export default async function OrScheduleByDatePage({ params }: PageProps) {
  const date = params.date;

  const data = await getOrScheduleList(date, "eq");

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      <Navbar />

      <div className="p-6 max-w-3xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Cases on {date}</h1>

          <Link
            href="/orschedule"
            className="px-4 py-2 bg-[#222] border border-[#333] rounded hover:bg-[#333]"
          >
            Back
          </Link>
        </div>

        <OrScheduleList data={data} />
      </div>
    </div>
  );
}
