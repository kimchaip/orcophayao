"use client";

import type { OrSchedule } from "@/types/orschedule";
import Link from "next/link";

type Props = {
  data: OrSchedule[];
};

export default function OrScheduleList({ data }: Props) {
  return (
    <div className="space-y-3">
      {data.map((item) => (
        <Link
          key={item.id}
          href={`/orschedule/${item.id}`}
          className="block border p-4 rounded hover:bg-gray-50"
        >
          <p>
            <strong>{item.ptname}</strong>
          </p>
          <p>{item.dx}</p>
          <p>{item.op}</p>
          <p>{item.opdate}</p>
        </Link>
      ))}
    </div>
  );
}
