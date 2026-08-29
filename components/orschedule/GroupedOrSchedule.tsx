"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { OrSchedule } from "@/types/orschedule";
import QueSelector from "@/components/orschedule/QueSelector";

type Props = {
  grouped: Record<string, OrSchedule[]>;
  tab: string;
};

export default function GroupedOrSchedule({ grouped, tab }: Props) {
  const [openDates, setOpenDates] = useState<string[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const saved = localStorage.getItem("openDates");
    if (saved) {
      setOpenDates(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("openDates", JSON.stringify(openDates));
    }
  }, [openDates, isClient]);

  function toggle(date: string) {
    setOpenDates((prev) =>
      prev.includes(date) ? prev.filter((d) => d !== date) : [...prev, date],
    );
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
          {isClient && openDates.includes(date) && (
            <div className="mt-3 space-y-2">
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
                  <div className="grid grid-cols-[60px_1fr_120px] gap-3">
                    <div className="text-green-600">
                      <QueSelector
                        id={item.id}
                        que={item.que}
                        optype={item.optype}
                        maxQue={maxQue}
                        status={item.status}
                      />
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
              )})}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
