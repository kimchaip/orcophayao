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
    <div className="min-h-screen w-full flex flex-col items-center justify-start bg-[#101010] px-4">
      {/* LOGO */}
      <div className="flex justify-center mt-10 mb-3">
        <img
          src="/logo.png" // ใส่โลโก้ของคุณใน public/logo.png
          alt="ORCoPhayao Logo"
          className="w-30 h-40"
        />
      </div>

      {/* Title */}
      <div className="flex justify-center mb-6">
        <h1 className="text-2xl font-bold text-white">OR Phayao</h1>
      </div>

      {/* LOGIN FORM เดิม */}
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}
