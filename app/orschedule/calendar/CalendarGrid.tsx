"use client";

import { useState } from "react";
import CalendarCaseList from "./CalendarCaseList";

type Props = {
  year: number;
  month: number;
  byDate: Record<string, any[]>;
  todayStr: string;
};

export default function CalendarGrid({ year, month, byDate, todayStr }: Props) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDay = new Date(year, month - 1, 1).getDay();
  const offset = firstDay;

  return (
    <>
      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-[4px]">
        {/* Empty slots */}
        {Array.from({ length: offset }).map((_, i) => (
          <div key={`empty-${i}`} className="min-h-[90px]" /> 
        ))}

        {/* Days */}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
          const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(
            day
          ).padStart(2, "0")}`;

          const items = byDate[dateStr] || [];
          const isToday = dateStr === todayStr;

          return (
            <button
              key={day}
              onClick={() => setSelectedDate(dateStr)}
              className={`rounded-lg p-2 min-h-[90px] border flex flex-col justify-between ${
                isToday
                  ? "bg-green-900 border-green-600"
                  : "bg-[#151515] border-[#333]"
              } hover:bg-[#222]`}
            >
              {/* Day number (เล็กลง อยู่บนสุด) */}
              <p className="text-sm font-semibold text-white">{day}</p>

              {/* Case count (อยู่ด้านล่าง) */}
              {items.length > 0 ? (
                <span className="text-[11px] bg-blue-400 px-1.5 py-2 rounded self-start">
                  {items.length} เคส
                </span>
              ) : (
                <span className="text-[10px] text-gray-500 self-start">
                  
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Case list below */}
      <CalendarCaseList selectedDate={selectedDate} cases={byDate} />
    </>
  );
}
