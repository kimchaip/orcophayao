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
    <div className="min-h-screen bg-[#0b0b0b] text-white px-4 py-6 space-y-6 max-w-md mx-auto">
      <Navbar />

      {/* Header */}
      <h1 className="text-xl font-bold tracking-wide">OR Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4">
        <DashboardCard label="เคสทั้งหมด" value={total} color="text-white" />
        <DashboardCard label="Plan" value={plan} color="text-yellow-300" />
        <DashboardCard label="Done" value={done} color="text-green-300" />
        <DashboardCard label="Cancel" value={cancel} color="text-red-300" />
        <DashboardCard label="GA" value={GA} color="text-blue-300" />
        <DashboardCard label="LA" value={LA} color="text-pink-300" />
      </div>

      {/* Today Cases */}
      <CaseList title={`เคสวันนี้ (${todayStr})`} cases={todayCases} />

      {/* Tomorrow Cases */}
      <CaseList title={`เคสพรุ่งนี้ (${tomorrowStr})`} cases={tomorrowCases} />
    </div>
  );
}

function DashboardCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="border border-[#333] p-4 rounded-xl bg-[#151515] shadow-md">
      <p className="font-semibold text-gray-300 text-sm">{label}</p>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

function CaseList({
  title,
  cases,
}: {
  title: string;
  cases: any[];
}) {
  return (
    <div className="space-y-2">
      <h2 className="font-bold text-lg">{title}</h2>

      {cases.length === 0 && (
        <p className="text-gray-500 text-sm">ไม่มีเคส</p>
      )}

      {cases.map((item) => (
        <Link
          key={item.id}
          href={`/orschedule/${item.id}`}
          className="block bg-[#151515] border border-[#333] p-3 rounded-lg hover:bg-[#1f1f1f] active:scale-95"
        >
          <p className="text-white font-medium text-sm break-words">
            {item.ptname}
          </p>
          <p className="text-gray-400 text-xs break-words leading-tight">
            {item.op}
          </p>
        </Link>
      ))}
    </div>
  );
}
