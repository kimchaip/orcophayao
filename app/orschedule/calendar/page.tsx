import Navbar from "@/components/Navbar";
import { getOrScheduleByMonth } from "@/lib/db/orschedule";
import CalendarGrid from "./CalendarGrid";
import { monEng } from "@/lib/utils/my";
import Link from "next/link";

export default async function OrCalendarPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;

  const today = new Date();

  const year = Number(searchParams?.year) || today.getFullYear();
  const month = Number(searchParams?.month) || today.getMonth() + 1;

  const data = await getOrScheduleByMonth(year, month);

  // group by date
  const byDate: Record<string, any[]> = {};
  data.forEach((item) => {
    if (!byDate[item.opdate]) byDate[item.opdate] = [];
    byDate[item.opdate].push(item);
  });

  const todayStr = today.toISOString().slice(0, 10);
  
  // prev / next month
  const prevMonth = month === 1 ? 12 : month - 1;
  const prevYear = month === 1 ? year - 1 : year;

  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear = month === 12 ? year + 1 : year;
  
  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      <Navbar />

      <div className="p-6 max-w-5xl mx-auto space-y-6">
        {/* Header + Prev/Next */}
        <div className="flex items-center justify-between">
          <Link
            href={`/orschedule/calendar?year=${prevYear}&month=${prevMonth}`}
            className="px-3 py-2 bg-[#222] rounded hover:bg-[#333]"
          >
            ← Prev
          </Link>

          <h1 className="text-2xl font-bold">
            {monEng[month]} {year}
          </h1>

          <Link
            href={`/orschedule/calendar?year=${nextYear}&month=${nextMonth}`}
            className="px-3 py-2 bg-[#222] rounded hover:bg-[#333]"
          >
            Next →
          </Link>
        </div>

        {/* Week header */}
        <div className="grid grid-cols-7 text-center font-semibold text-gray-300">
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
          <div>Sun</div>
        </div>
        
        {/* ส่งข้อมูลไปให้ Client Component */}
        <CalendarGrid
          year={year}
          month={month}
          byDate={byDate}
          todayStr={todayStr}
        />
      </div>
    </div>
  );
}
