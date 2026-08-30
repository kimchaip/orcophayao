import { getOrScheduleById } from "@/lib/db/orschedule";
import Link from "next/link";

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab: string }>;
};

export default async function OrScheduleDetail(props: PageProps) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  const id = Number(params.id);
  const item = await getOrScheduleById(id);
  const tab = searchParams.tab;

  if (!item) {
    return <div className="p-6">ไม่พบข้อมูลเคส</div>;
  }

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white px-4 py-6 space-y-6 max-w-md mx-auto">
      {/* Back button */}
      <Link
        href={`/orschedule?tab=${tab}`}
        className="inline-block px-4 py-2 bg-[#222] border border-[#333] rounded-lg 
                   text-sm hover:bg-[#333] active:scale-95"
      >
        Back
      </Link>

      {/* Title */}
      <h1 className="text-xl font-bold tracking-wide">ข้อมูลเคส OR</h1>

      {/* Case Details */}
      <div className="space-y-4 bg-[#151515] p-5 rounded-xl border border-[#333] shadow-md">
        <Detail label="วันที่ผ่าตัด" value={item.opdate} />
        <Detail label="ชื่อผู้ป่วย" value={item.ptname} />
        <Detail label="อายุ" value={`${item.age} ปี`} />
        <Detail label="Diagnosis" value={item.dx} />
        <Detail label="Operation" value={item.op} />
        <div className="grid grid-cols-2 gap-4">
          {/* Type */}
          <div className="flex flex-col">
            <span className="text-gray-400 text-xs">Type</span>
            <span className="text-white text-base font-medium">
              {item.optype}
            </span>
          </div>

          {/* Queue */}
          <div className="flex flex-col">
            <span className="text-gray-400 text-xs">Queue</span>
            <span className="text-white text-base font-medium">{item.que}</span>
          </div>
        </div>

        <Detail label="Underlying" value={item.underlying} />
        <Detail label="Note" value={item.note} />
        <Detail label="Status" value={item.status} />

        {/* Media Section */}
        {item.media && item.media.length > 0 && (
          <div className="space-y-3 pt-4">
            <h2 className="font-semibold text-lg">Media</h2>

            {item.media.map((m, i) => (
              <div key={i} className="space-y-2">
                <img
                  src={m.url}
                  alt={m.name}
                  className="w-full max-w-xs rounded-lg border border-[#444]"
                />

                <Link
                  href={`/orschedule/${item.id}/media/delete/${i}?tab=${tab}`}
                  className="text-red-500 text-sm underline active:scale-95"
                >
                  Delete
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Link
          href={`/orschedule/${item.id}/media?tab=${tab}`}
          className="block w-full bg-purple-600 text-white px-4 py-2 rounded-lg text-center 
                     active:scale-95"
        >
          Upload Media
        </Link>

        <Link
          href={`/orschedule/${id}/edit?tab=${tab}`}
          className="block w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-center 
                     active:scale-95"
        >
          Edit
        </Link>

        <Link
          href={`/orschedule/${item.id}/delete?tab=${tab}`}
          className="block w-full bg-red-600 text-white px-4 py-2 rounded-lg text-center 
                     active:scale-95"
        >
          Delete
        </Link>
      </div>
    </div>
  );
}

/* Small reusable component for cleaner code */
function Detail({ label, value }: { label: string; value: any }) {
  return (
    <div className="flex flex-col">
      <span className="text-gray-400 text-xs">{label}</span>
      <span className="text-white text-base font-medium break-words leading-snug">
        {value || "-"}
      </span>
    </div>
  );
}
