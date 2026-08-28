import Navbar from "@/components/Navbar";
import { monEng, getOrScheduleByMonth } from "@/lib/db/orschedule";
import Link from "next/link";

export default async function OrCalendarPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;

  const today = new Date();

  // อ่านเดือนจาก query ?m=8&y=2026
  const year = Number(searchParams?.y) || today.getFullYear();
  const month = Number(searchParams?.m) || today.getMonth() + 1;

  const data = await getOrScheduleByMonth(year, month);

  // map ตามวันที่
  const byDate: Record<string, any[]> = {};
  data.forEach((item) => {
    if (!byDate[item.opdate]) byDate[item.opdate] = [];
    byDate[item.opdate].push(item);
  });

  // วันที่ทั้งเดือน
  const daysInMonth = new Date(year, month, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const todayStr = today.toISOString().slice(0, 10);

  // หาวันเริ่มต้นของเดือน (เพื่อจัด Sun–Sat)
  const firstDay = new Date(year, month - 1, 1).getDay(); // 0 = Sun
  const blanks = Array.from({ length: firstDay }, () => null);

  const prevMonth = month === 1 ? 12 : month - 1;
  const prevYear = month === 1 ? year - 1 : year;

  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear = month === 12 ? year + 1 : year;

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      <Navbar />

      <div className="p-6 space-y-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            OR Calendar — {monEng[month]} {year}
          </h1>

          <div className="flex gap-2">
            <Link
              href={`/orschedule/calendar?m=${prevMonth}&y=${prevYear}`}
              className="px-3 py-1 bg-[#222] border border-[#333] rounded hover:bg-[#333]"
            >
              Prev
            </Link>

            <Link
              href={`/orschedule/calendar?m=${nextMonth}&y=${nextYear}`}
              className="px-3 py-1 bg-[#222] border border-[#333] rounded hover:bg-[#333]"
            >
              Next
            </Link>
          </div>
        </div>

        {/* Weekday Header */}
        <div className="grid grid-cols-7 text-center text-gray-400 mb-2">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-3">
          {/* ช่องว่างก่อนวันแรก */}
          {blanks.map((_, idx) => (
            <div key={`blank-${idx}`} className="min-h-[140px]" />
          ))}

          {/* วันจริง */}
          {days.map((day) => {
            const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(
              day,
            ).padStart(2, "0")}`;

            const items = byDate[dateStr] ?? [];
            const isToday = dateStr === todayStr;

            return (
              <div
                key={day}
                className={`rounded-lg p-3 min-h-[140px] border ${
                  isToday
                    ? "bg-green-900 border-green-600"
                    : "bg-[#151515] border-[#333]"
                }`}
              >
                <p className="font-semibold text-white mb-2">{day}</p>

                {items.length === 0 && (
                  <p className="text-gray-500 text-sm"></p>
                )}

                {items.map((item) => (
                  <Link
                    key={item.id}
                    href={`/orschedule/${item.id}`}
                    className="block text-sm bg-[#222] border border-[#444] p-2 rounded mb-2 hover:bg-[#333]"
                  >
                    <p className="font-medium text-white">{item.ptname}</p>
                    <p className="text-gray-400">{item.op}</p>
                  </Link>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
