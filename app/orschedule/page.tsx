import Navbar from "@/components/Navbar";
import Link from "next/link";
import { getOrScheduleList } from "@/lib/db/orschedule";
import GroupedOrSchedule from "@/components/orschedule/GroupedOrSchedule";

export default async function OrSchedulePage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;

  const tab = (searchParams?.tab as string) ?? "today";

  const today = new Date().toISOString().slice(0, 10);

  let data = [];

  // ดึงข้อมูลตาม tab
  if (tab === "past") {
    data = await getOrScheduleList(today, "lt");
  } else if (tab === "future") {
    data = await getOrScheduleList(today, "gt");
  } else {
    data = await getOrScheduleList(today, "eq"); // today
  }

  // Group by date
  const grouped: Record<string, any[]> = {};
  data.forEach((item) => {
    if (!grouped[item.opdate]) grouped[item.opdate] = [];
    grouped[item.opdate].push(item);
  });

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      <Navbar />

      <div className="p-6 max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">OR Schedule</h1>

          <Link
            href={`/orschedule/create?tab=${tab}`}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            ADD NEW
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <Link
            href="?tab=past"
            className={`px-4 py-2 rounded border ${
              tab === "past"
                ? "bg-green-700 border-green-500 text-white"
                : "bg-[#222] border-[#333] text-gray-300 hover:bg-[#333]"
            }`}
          >
            Past
          </Link>

          <Link
            href="?tab=today"
            className={`px-4 py-2 rounded border ${
              tab === "today"
                ? "bg-green-700 border-green-500 text-white"
                : "bg-[#222] border-[#333] text-gray-300 hover:bg-[#333]"
            }`}
          >
            Today
          </Link>

          <Link
            href="?tab=future"
            className={`px-4 py-2 rounded border ${
              tab === "future"
                ? "bg-green-700 border-green-500 text-white"
                : "bg-[#222] border-[#333] text-gray-300 hover:bg-[#333]"
            }`}
          >
            Future
          </Link>
        </div>

        {/* Accordion Grouped List */}
        <GroupedOrSchedule grouped={grouped} tab={tab} />
      </div>
    </div>
  );
}
