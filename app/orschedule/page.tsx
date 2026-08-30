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

      <div className="px-4 py-6 max-w-xl mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-3 mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-bold">OR Schedule</h1>

            <Link
              href={`/orschedule/create?tab=${tab}`}
              className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm active:scale-95"
            >
              ADD NEW
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar">
          {["past", "today", "future"].map((t) => (
            <Link
              key={t}
              href={`?tab=${t}`}
              className={`px-4 py-2 rounded-lg border text-sm whitespace-nowrap ${
                tab === t
                  ? "bg-green-700 border-green-500 text-white"
                  : "bg-[#222] border-[#333] text-gray-300 hover:bg-[#333]"
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </Link>
          ))}
        </div>

        {/* Accordion Grouped List */}
        <GroupedOrSchedule grouped={grouped} tab={tab} />
      </div>
    </div>
  );
}
