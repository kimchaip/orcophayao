"use client";

import { useState } from "react";

type Props = {
  id: number;
  que: number | null;
  optype: "GA" | "LA";
  maxQue: number;
  status: "Plan" | "Done" | "Cancel";
};

export default function QueSelector({
  id,
  que,
  optype,
  maxQue,
  status,
}: Props) {
  if (status === "Cancel") return null;

  const [open, setOpen] = useState(false);
  const colorClass =
    optype === "GA"
      ? "text-blue-500 border-blue-500"
      : "text-green-600 border-green-600";

  async function updateQue(newQue: number) {
    await fetch(`/api/orschedule/${id}/que`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ que: newQue }),
    });

    // reload page
    window.location.reload();
  }

  return (
    <div className="relative">
      {/* Button */}
      <button
        onClick={(e) => {
          e.preventDefault(); // prevent Link navigation
          setOpen(!open);
        }}
        className={`font-bold px-2 py-1 rounded border ${colorClass}`}
      >
        {que}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-20 bg-[#222] border border-[#444] rounded p-2 mt-1 w-10">
          {[...Array(maxQue)].map((_, i) => {
            const q = i + 1;
            return (
              <button
                key={q}
                onClick={(e) => {
                  e.preventDefault();
                  updateQue(q);
                  setOpen(false);
                }}
                className={`block w-full text-left px-2 py-1 hover:bg-[#333] ${
                  optype === "GA" ? "text-blue-400" : "text-green-600"
                }`}
              >
                {q}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
