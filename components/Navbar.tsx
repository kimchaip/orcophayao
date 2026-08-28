import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  const supabase = await createClient();
  const { data: claimsData } = await supabase.auth.getClaims();

  const email = claimsData?.claims?.email ?? null;

  return (
    <div className="flex justify-between items-center mb-6 px-6 py-3 bg-[#111] border-b border-[#333]">
      {/* LEFT: PAGE SELECT DROPDOWN */}
      <NavbarClient/>

      {/* Right: user info + actions */}
      <div className="flex items-center gap-4">
        {email && <span className="text-gray-300 text-sm">{email}</span>}

        <Link
          href="/account"
          className="bg-gray-800 hover:bg-gray-700 text-white text-sm px-3 py-1 rounded"
        >
          Account
        </Link>

        <form action="/auth/signout" method="post">
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded"
          >
            Logout
          </button>
        </form>
      </div>
    </div>
  );
}
