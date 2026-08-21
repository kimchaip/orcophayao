'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { data:signinData, error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.log("SIGNIN ERROR:", error)   // ⭐ ตรงนี้สำคัญที่สุด
    console.log("DETAIL:", error.message) // ⭐ ดูข้อความ error
    console.log("FORM DATA:", data)       // ⭐ ตรวจ email/password ถูกส่งไหม
    redirect('/error')
  }

  console.log("SIGNIN SUCCESS:", signinData) // ⭐ ดูว่ามี user กลับมาหรือไม่
  revalidatePath('/', 'layout')
  redirect('/account')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { data: signupData, error } = await supabase.auth.signUp(data)

  if (error) {
    console.log("SIGNUP ERROR:", error)   // ⭐ ตรงนี้สำคัญที่สุด
    console.log("DETAIL:", error.message) // ⭐ ดูข้อความ error
    console.log("FORM DATA:", data)       // ⭐ ตรวจ email/password ถูกส่งไหม
    redirect('/error')
  }

  console.log("SIGNUP SUCCESS:", signupData) // ⭐ ดูว่ามี user กลับมาหรือไม่
  revalidatePath('/', 'layout')
  redirect('/account')
}