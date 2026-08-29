import { getOrSummary } from "@/lib/db/orschedule";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default async function OrDashboardPage() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;

  const data = await getOrSummary(year, month);

  const total = data.length;
  const plan = data.filter((x) => x.status === "Plan").length;
  const done = data.filter((x) => x.status === "Done").length;
  const cancel = data.filter((x) => x.status === "Cancel").length;

  const GA = data.filter((x) => x.optype === "GA").length;
  const LA = data.filter((x) => x.optype === "LA").length;

  const todayStr = today.toISOString().slice(0, 10);
  const tomorrowStr = new Date(today.getTime() + 86400000)
    .toISOString()
    .slice(0, 10);

  const todayCases = data.filter((x) => x.opdate === todayStr);
  const tomorrowCases = data.filter((x) => x.opdate === tomorrowStr);

  return (
    <div className="p-6 space-y-6">
      <Navbar />

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">OR Dashboard</h1>

      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="border border-[#333] p-4 rounded-lg bg-[#151515] shadow-sm">
          <p className="font-semibold text-gray-300">เคสทั้งหมด</p>
          <p className="text-3xl font-bold text-white">{total}</p>
        </div>

        <div className="border border-[#333] p-4 rounded-lg bg-[#151515] shadow-sm">
          <p className="font-semibold text-gray-300">Plan</p>
          <p className="text-3xl font-bold text-yellow-300">{plan}</p>
        </div>

        <div className="border border-[#333] p-4 rounded-lg bg-[#151515] shadow-sm">
          <p className="font-semibold text-gray-300">Done</p>
          <p className="text-3xl font-bold text-green-300">{done}</p>
        </div>

        <div className="border border-[#333] p-4 rounded-lg bg-[#151515] shadow-sm">
          <p className="font-semibold text-gray-300">Cancel</p>
          <p className="text-3xl font-bold text-red-300">{cancel}</p>
        </div>

        <div className="border border-[#333] p-4 rounded-lg bg-[#151515] shadow-sm">
          <p className="font-semibold text-gray-300">GA</p>
          <p className="text-3xl font-bold text-blue-300">{GA}</p>
        </div>

        <div className="border border-[#333] p-4 rounded-lg bg-[#151515] shadow-sm">
          <p className="font-semibold text-gray-300">LA</p>
          <p className="text-3xl font-bold text-pink-300">{LA}</p>
        </div>
      </div>

      {/* Today Cases */}
      <div>
        <h2 className="font-bold mb-2">เคสวันนี้ ({todayStr})</h2>
        {todayCases.length === 0 && <p className="text-gray-500">ไม่มีเคส</p>}
        {todayCases.map((item) => (
          <Link
            key={item.id}
            href={`/orschedule/${item.id}`}
            className="block border p-3 rounded mb-2 hover:bg-gray-50"
          >
            {item.ptname} — {item.op}
          </Link>
        ))}
      </div>

      {/* Tomorrow Cases */}
      <div>
        <h2 className="font-bold mb-2">เคสพรุ่งนี้ ({tomorrowStr})</h2>
        {tomorrowCases.length === 0 && (
          <p className="text-gray-500">ไม่มีเคส</p>
        )}
        {tomorrowCases.map((item) => (
          <Link
            key={item.id}
            href={`/orschedule/${item.id}`}
            className="block border p-3 rounded mb-2 hover:bg-gray-50"
          >
            {item.ptname} — {item.op}
          </Link>
        ))}
      </div>
    </div>
  );
}
