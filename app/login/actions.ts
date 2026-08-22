"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } =
    await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect(`/error?message=${error.message}`);
  }

  redirect("/account");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    if (error.code === "email_not_confirmed") {
      return redirect("/login");
    }

    console.log("SIGNIN ERROR:", error);
    return redirect(`/error?message=${error.message}`);
  }

  return redirect("/login");
}
