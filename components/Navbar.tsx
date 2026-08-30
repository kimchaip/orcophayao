import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import NavbarClient from "./NavbarClient";
import AccountButton from "@/app/account/AccountButton";

export default async function Navbar() {
  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();
  
  return (
    <div className="w-full flex items-center justify-between px-2 py-3 bg-[#111] border-b border-[#333]">

      {/* LEFT: PAGE SELECT DROPDOWN */}
      <NavbarClient />

      {/* RIGHT: USER INFO + ACTIONS */}
      <div className="flex items-center gap-2">

        {/* Account Button */}
        <AccountButton claims={claimsData?.claims ?? null} />

        {/* Logout Button */}
        <form action="/auth/signout" method="post">
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white text-xs md:text-sm px-3 py-1.5 rounded-lg active:scale-95"
          >
            Logout
          </button>
        </form>
      </div>
    </div>
  );
}
