"use client";

import { useState } from "react";
import Link from "next/link";
import type { OrSchedule } from "@/types/orschedule";

type Props = {
  grouped: Record<string, OrSchedule[]>;
  tab: string;
};

export default function GroupedOrSchedule({ grouped, tab }: Props) {
  const [openDate, setOpenDate] = useState<string | null>(null);

  function toggle(date: string) {
    setOpenDate((prev) => (prev === date ? null : date));
  }

  return (
    <div className="space-y-4">
      {Object.entries(grouped).map(([date, items]) => (
        <div
          key={date}
          className="bg-[#151515] border border-[#333] rounded p-4"
        >
          {/* Header row */}
          <button
            onClick={() => toggle(date)}
            className="w-full text-left flex justify-between items-center"
          >
            <span className="text-lg font-bold">{date}</span>
            <span className="text-gray-400">{items.length} cases</span>
          </button>

          {/* Collapsible content */}
          {openDate === date && (
            <div className="mt-3 space-y-2">
              {items
                .sort((a, b) => {
                  // 1) status asc
                  const statusOrder = a.status.localeCompare(b.status);
                  if (statusOrder !== 0) return statusOrder;

                  // 2) optype desc
                  const opTypeOrder = b.optype.localeCompare(a.optype);
                  if (opTypeOrder !== 0) return opTypeOrder;

                  // 3) que asc
                  return (a.que ?? 0) - (b.que ?? 0);
                })
                .map((item) => (
                  <Link
                    key={item.id}
                    href={`/orschedule/${item.id}?tab=${tab}`}
                    className="block p-3 bg-[#1f1f1f] border border-[#333] rounded hover:bg-[#2a2a2a]"
                  >
                    <div className="grid grid-cols-[60px_1fr_120px] gap-3">
                      <div className="text-green-400">
                        <p className={`font-bold ${
                            item.optype === "GA"
                              ? "text-blue-500"
                              : "text-green-600"
                          }`} >{item.que ?? "-"}</p>
                      </div>
                      <div className="text-gray-200">
                        <p className="font-semibold">
                          {item.ptname} {item.age} ปี
                        </p>
                        <p className="text-gray-400">
                          {item.dx} {item.op}
                        </p>
                        {item.underlying && (
                          <p className="text-gray-400">{item.underlying}</p>
                        )}
                      </div>
                      <div className="text-right space-y-1">
                        <p
                          className={`font-bold ${
                            item.status === "done"
                              ? "text-green-400"
                              : item.status === "cancel"
                                ? "text-gray-400"
                                : "text-blue-500"
                          }`}
                        >
                          {item.status ?? "plan"}
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
                ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
