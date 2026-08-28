import { getOrScheduleById } from "@/lib/db/orschedule";
import Link from "next/link";

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{tab: string}>;
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
    <div className="min-h-screen bg-[#0b0b0b] text-white p-6 space-y-6">
      {/* ⭐ Back button */}
      <Link
        href={`/orschedule?tab=${tab}`}
        className="inline-block px-4 py-2 bg-[#222] border border-[#333] rounded hover:bg-[#333]"
      >
        Back
      </Link>

      {/* รายละเอียดเคส */}
      <h1 className="text-xl font-bold">ข้อมูลเคส OR</h1>

      <div className="space-y-2">
        <p>
          <strong>วันที่ผ่าตัด:</strong> {item.opdate}
        </p>
        <p>
          <strong>ชื่อผู้ป่วย:</strong> {item.ptname}
        </p>
        <p>
          <strong>อายุ:</strong> {item.age}
        </p>
        <p>
          <strong>Diagnosis:</strong> {item.dx}
        </p>
        <p>
          <strong>Operation:</strong> {item.op}
        </p>
        <p>
          <strong>Type:</strong> {item.optype}
        </p>
        <p>
          <strong>Que:</strong> {item.que}
        </p>
        <p>
          <strong>Underlying:</strong> {item.underlying}
        </p>
        <p>
          <strong>Note:</strong> {item.note}
        </p>
        <p>
          <strong>Status:</strong> {item.status}
        </p>

        {item.media && item.media.length > 0 && (
          <div className="space-y-2">
            <h2 className="font-semibold">Media</h2>
            {item.media.map((m, i) => (
              <div key={i} className="space-y-2">
                <img src={m.url} alt={m.name} className="w-48 rounded border" />

                <Link
                  href={`/orschedule/${item.id}/media/delete/${i}`}
                  className="text-red-600 underline"
                >
                  Delete
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      <Link
        href={`/orschedule/${item.id}/media?tab=${tab}`}
        className="bg-purple-600 text-white px-4 py-2 rounded"
      >
        Upload Media
      </Link>

      <Link
        href={`/orschedule/${id}/edit?tab=${tab}`}
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded"
      >
        Edit
      </Link>

      <Link
        href={`/orschedule/${item.id}/delete?tab=${tab}`}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Delete
      </Link>
    </div>
  );
}
