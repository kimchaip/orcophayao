import { getOrScheduleList } from "@/lib/db/orschedule";
import Link from "next/link";

export default async function OrSummaryPage() {
  const todayStr = new Date().toISOString().slice(0, 10);

  const data = await getOrScheduleList(todayStr);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-bold">OR Summary — {todayStr}</h1>

      {data.length === 0 && <p className="text-gray-500">ไม่มีเคสวันนี้</p>}

      {data.map((item) => (
        <Link
          key={item.id}
          href={`/orschedule/${item.id}`}
          className="block border p-4 rounded mb-2 hover:bg-gray-50"
        >
          <p className="font-semibold">{item.ptname}</p>
          <p>{item.dx}</p>
          <p>{item.op}</p>
          <p>Type: {item.optype}</p>
          <p>Status: {item.status}</p>
        </Link>
      ))}
    </div>
  );
}
