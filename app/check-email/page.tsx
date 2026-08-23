"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function CheckEmailPage() {
  const supabase = createClient();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  async function resendEmail() {
    setStatus("sending");
    setMessage("");

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setStatus("error");
      setMessage("ไม่พบผู้ใช้ กรุณา login ใหม่");
      return;
    }

    const { error } = await supabase.auth.resend({
      type: "signup",
      email: user.email!,
    });

    if (error) {
      setStatus("error");
      setMessage("ส่งอีเมลซ้ำไม่สำเร็จ: " + error.message);
      return;
    }

    setStatus("sent");
    setMessage("ส่งอีเมลยืนยันใหม่แล้ว");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Check your email</h1>
        <p className="text-gray-600 mb-6">
          เราได้ส่งอีเมลยืนยันไปที่บัญชีของคุณแล้ว  
          กรุณาเปิดอีเมลและกดปุ่มยืนยันเพื่อเปิดใช้งานบัญชี
        </p>

        <button
          onClick={resendEmail}
          disabled={status === "sending"}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {status === "sending" ? "กำลังส่ง..." : "ส่งอีเมลยืนยันอีกครั้ง"}
        </button>

        {message && (
          <p className="mt-4 text-sm text-gray-700">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
