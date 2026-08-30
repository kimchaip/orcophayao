import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import LoginForm from "@/components/LoginForm";

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // ถ้า login แล้ว → ไปหน้า account
  if (user) {
    redirect("/orschedule/dashboard");
  }

  // ถ้ายังไม่ login → แสดงหน้า homepage + login
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-[#101010] px-4 py-10">
      
      {/* LOGO */}
      <div className="flex justify-center mb-6">
        <img
          src="/logo.png"
          alt="ORCoPhayao Logo"
          className="w-24 h-24 object-contain"
        />
      </div>

      {/* Title */}
      <h1 className="text-2xl font-bold text-white mb-8 tracking-wide">
        OR Phayao
      </h1>

      {/* LOGIN FORM */}
      <div className="w-full max-w-sm bg-[#181818] p-6 rounded-xl shadow-lg border border-[#222]">
        <LoginForm />
      </div>

      {/* Footer */}
      <p className="text-gray-500 text-xs mt-10">
        © 2026 OR Phayao — UroCRH
      </p>
    </div>
  );
}
