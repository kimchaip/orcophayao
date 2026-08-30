"use client";

import Link from "next/link";
import QueSelector from "@/components/orschedule/QueSelector";
import type { OrSchedule } from "@/types/orschedule";
import { monEng } from "@/lib/utils/my";


type Props = {
    selectedDate: string | null;
    cases: Record<string, any[]>;
    tab?: string;
};

export default function CalendarCaseList({ selectedDate, cases, tab = "today" }: Props) {
  if (!selectedDate) {
    return (
      <div className="mt-6 text-gray-400 text-center">
        เลือกวันที่เพื่อดูเคส
      </div>
    );
  }

  const items = cases[selectedDate] || [];
  const dateObj = new Date(selectedDate);
  const dateDisplay = dateObj.getDate() + " " + monEng[dateObj.getMonth()] + dateObj.getFullYear();
  
  return (
    <div className="mt-6 bg-[#151515] border border-[#333] rounded p-4">
      {/* Header (ไม่มี toggle) */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-lg font-bold">{dateDisplay}</span>
        <span className="text-gray-400">{items.length} cases</span>
      </div>

      {/* Case list */}
      <div className="space-y-2">
        {items.map((item, _, all) => {
          const maxQue = all.filter(
            (i) => i.optype === item.optype && i.status !== "Cancel"
          ).length;

          return (
            <Link
              key={item.id}
              href={`/orschedule/${item.id}?tab=${tab}`}
              className="block p-3 bg-[#1f1f1f] border border-[#333] rounded hover:bg-[#2a2a2a]"
            >
              <div className="grid grid-cols-[40px_1fr_70px] gap-2">
                {/* QUE */}
                <div className="text-green-600">
                  <QueSelector
                    id={item.id}
                    que={item.que}
                    optype={item.optype}
                    maxQue={maxQue}
                    status={item.status}
                  />
                </div>

                {/* DETAIL BLOCK */}
                <div className="text-gray-200 space-y-1 pr-1">
                  <p className="font-semibold text-xs leading-tight break-words">
                    {item.ptname} {item.age} ปี
                  </p>

                  <p className="text-gray-400 text-xs leading-tight break-words">
                    {item.dx}
                  </p>

                  <p className="text-gray-400 text-xs leading-tight break-words">
                    {item.op}
                  </p>

                  {item.underlying && (
                    <p className="text-gray-400 text-xs leading-tight break-words">
                      {item.underlying}
                    </p>
                  )}
                </div>

                {/* STATUS + TYPE */}
                <div className="text-right space-y-1 text-xs leading-tight">
                  <p
                    className={`font-bold ${
                      item.status === "Done"
                        ? "text-green-600"
                        : item.status === "Cancel"
                        ? "text-gray-400"
                        : "text-blue-500"
                    }`}
                  >
                    {item.status}
                  </p>

                  <p
                    className={`font-bold ${
                      item.optype === "GA"
                        ? "text-blue-500"
                        : "text-green-600"
                    }`}
                  >
                    {item.optype}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
