"use client";

import { useState } from "react";
import { login, signup } from "./actions";

export default function LoginPage() {
  const [tab, setTab] = useState<"login" | "signup">("login");

  return (
    <div className="w-full max-w-md bg-[#1a1a1a] p-6 rounded-lg shadow-md border border-[#333]">

      {/* Tabs */}
      <div className="flex mb-6 border-b border-[#333]">
        <button
          onClick={() => setTab("login")}
          className={`flex-1 py-2 text-center text-sm font-semibold ${
            tab === "login"
              ? "text-green-400 border-b-2 border-green-400"
              : "text-gray-400"
          }`}
        >
          Login
        </button>

        <button
          onClick={() => setTab("signup")}
          className={`flex-1 py-2 text-center text-sm font-semibold ${
            tab === "signup"
              ? "text-green-400 border-b-2 border-green-400"
              : "text-gray-400"
          }`}
        >
          Signup
        </button>
      </div>

      {/* LOGIN FORM */}
      {tab === "login" && (
        <form className="space-y-4">
          <div>
            <label className="text-white text-sm">Email</label>
            <input
              name="email"
              type="email"
              required
              className="w-full p-2 rounded bg-[#222] text-white border border-[#444] focus:outline-none focus:border-green-500"
            />
          </div>

          <div>
            <label className="text-white text-sm">Password</label>
            <input
              name="password"
              type="password"
              required
              className="w-full p-2 rounded bg-[#222] text-white border border-[#444] focus:outline-none focus:border-green-500"
            />
          </div>

          <button
            formAction={login}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition"
          >
            Login
          </button>
        </form>
      )}

      {/* SIGNUP FORM */}
      {tab === "signup" && (
        <form className="space-y-4">
          <div>
            <label className="text-white text-sm">Email</label>
            <input
              name="email"
              type="email"
              required
              className="w-full p-2 rounded bg-[#222] text-white border border-[#444] focus:outline-none focus:border-green-500"
            />
          </div>

          <div>
            <label className="text-white text-sm">Password</label>
            <input
              name="password"
              type="password"
              required
              className="w-full p-2 rounded bg-[#222] text-white border border-[#444] focus:outline-none focus:border-green-500"
            />
          </div>

          <button
            formAction={signup}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition"
          >
            Signup
          </button>
        </form>
      )}
    </div>
  );
}
