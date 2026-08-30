"use client";

import { useState } from "react";
import type { OrSchedule } from "@/types/orschedule";

type Props = {
  initial?: Partial<OrSchedule>;
  onSubmit: (values: Partial<OrSchedule>) => Promise<void>;
};

export default function OrScheduleForm({ initial = {}, onSubmit }: Props) {
  const [form, setForm] = useState<Partial<OrSchedule>>(initial);
  const [loading, setLoading] = useState(false);

  function updateField(key: keyof OrSchedule, value: any) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    await onSubmit(form);
    setLoading(false);
  }

  console.log(!initial?.id);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* วันที่ผ่าตัด */}
      <div className="space-y-1">
        <label className="text-gray-300">วันที่ผ่าตัด</label>
        <input
          type="date"
          value={form.opdate ?? ""}
          onChange={(e) => updateField("opdate", e.target.value)}
          required
          className="w-full bg-[#222] text-white px-3 py-2 rounded border border-[#444] focus:outline-none focus:border-green-500 calendar-icon"
        />
      </div>

      {/* ชื่อผู้ป่วย */}
      <div className="space-y-1">
        <label className="text-gray-300">ชื่อผู้ป่วย</label>
        <input
          type="text"
          value={form.ptname ?? ""}
          onChange={(e) => updateField("ptname", e.target.value)}
          required
          className="w-full bg-[#222] text-white px-3 py-2 rounded border border-[#444] focus:outline-none focus:border-green-500"
        />
      </div>

      {/* อายุ */}
      <div className="space-y-1">
        <label className="text-gray-300">อายุ</label>
        <input
          type="number"
          value={form.age ?? ""}
          onChange={(e) => updateField("age", Number(e.target.value))}
          className="w-full bg-[#222] text-white px-3 py-2 rounded border border-[#444] focus:outline-none focus:border-green-500"
        />
      </div>

      {/* Diagnosis */}
      <div className="space-y-1">
        <label className="text-gray-300">Diagnosis</label>
        <input
          type="text"
          value={form.dx ?? ""}
          onChange={(e) => updateField("dx", e.target.value)}
          required
          className="w-full bg-[#222] text-white px-3 py-2 rounded border border-[#444] focus:outline-none focus:border-green-500"
        />
      </div>

      {/* Operation */}
      <div className="space-y-1">
        <label className="text-gray-300">Operation</label>
        <input
          type="text"
          value={form.op ?? ""}
          onChange={(e) => updateField("op", e.target.value)}
          required
          className="w-full bg-[#222] text-white px-3 py-2 rounded border border-[#444] focus:outline-none focus:border-green-500"
        />
      </div>

      {/* Type + Queue (2 columns) */}
      <div className="grid grid-cols-2 gap-4">
        {/* Type */}
        <div className="space-y-1">
          <label className="text-gray-300">Type</label>
          <select
            value={form.optype ?? "GA"}
            onChange={(e) => updateField("optype", e.target.value)}
            className="w-full bg-[#222] text-white px-3 py-2 rounded border border-[#444] 
                   focus:outline-none focus:border-green-500"
          >
            <option value="GA">GA</option>
            <option value="LA">LA</option>
          </select>
        </div>

        {/* Queue */}
        <div className="space-y-1">
            <label className="text-gray-300">Queue</label>
            <input
              type="number"
              value={form.que ?? ""}
              disabled={!initial?.id}
              onChange={(e) => updateField("que", Number(e.target.value))}
              className="w-full bg-[#222] text-white px-3 py-2 rounded border border-[#444] 
                   focus:outline-none focus:border-green-500"
            />
          </div>
      </div>

      {/* Underlying */}
      <div className="space-y-1">
        <label className="text-gray-300">Underlying</label>
        <input
          type="text"
          value={form.underlying ?? ""}
          onChange={(e) => updateField("underlying", e.target.value)}
          className="w-full bg-[#222] text-white px-3 py-2 rounded border border-[#444] focus:outline-none focus:border-green-500"
        />
      </div>

      {/* Note */}
      <div className="space-y-1">
        <label className="text-gray-300">Note</label>
        <textarea
          value={form.note ?? ""}
          onChange={(e) => updateField("note", e.target.value)}
          className="w-full bg-[#222] text-white px-3 py-2 rounded border border-[#444] h-24 rounded focus:outline-none focus:border-green-500"
        />
      </div>

      {/* Status */}
      {initial?.id && (
        <div className="space-y-1">
          <label className="text-gray-300">Status</label>
          <select
            value={form.status ?? "Plan"}
            onChange={(e) => updateField("status", e.target.value)}
            className="w-full bg-[#222] text-white px-3 py-2 rounded border border-[#444] focus:outline-none focus:border-green-500"
          >
            <option value="Plan">Plan</option>
            <option value="Done">Done</option>
            <option value="Cancel">Cancel</option>
          </select>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-700 hover:bg-green-600 text-white px-4 py-3 rounded-lg font-semibold transition"
      >
        {loading ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
      </button>
    </form>
  );
}
