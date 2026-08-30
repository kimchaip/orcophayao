"use client";

import { usePathname } from "next/navigation";

export default function NavbarClient() {
  const pathname = usePathname();

  // หาค่า default ของ dropdown ตามหน้า
  const current =
    pathname.startsWith("/orschedule/dashboard") ? "/orschedule/dashboard" :
    pathname === "/orschedule" ? "/orschedule" :
    pathname.startsWith("/orschedule/calendar") ? "/orschedule/calendar" :
    pathname.startsWith("/orschedule/") ? "/orschedule" : // หน้า detail
    "";

  return (
    <select
      className="bg-[#222] text-white text-sm px-1 py-2 rounded-lg border border-[#333] 
                 focus:outline-none active:scale-95"
      value={current}
      onChange={(e) => {
        const path = e.target.value;
        if (path) window.location.href = path;
      }}
    >
      <option value="/orschedule/dashboard">Dashboard</option>
      <option value="/orschedule">ORSchedule</option>
      <option value="/orschedule/calendar">Calendar</option>
    </select>
  );
}
