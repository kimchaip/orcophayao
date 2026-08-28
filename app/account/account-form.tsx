"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Avatar from "./avatar";

type Claims = { sub: string; email?: string; [key: string]: unknown };

export default function AccountForm({ claims }: { claims: Claims | null }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);

  const getProfile = useCallback(async () => {
    try {
      if (!claims?.sub) {
        setLoading(false);
        return;
      }

      setLoading(true);

      const { data, error, status } = await supabase
        .from("profiles")
        .select(`full_name, username, website, avatar_url`)
        .eq("id", claims.sub)
        .single();

      if (error && status !== 406) throw error;

      if (data) {
        setFullname(data.full_name);
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert("Error loading user data!");
    } finally {
      setLoading(false);
    }
  }, [claims, supabase]);

  useEffect(() => {
    getProfile();
  }, [claims, getProfile]);

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string | null;
    fullname: string | null;
    website: string | null;
    avatar_url: string | null;
  }) {
    try {
      if (!claims?.sub) {
        alert("You must be logged in to update your profile");
        return;
      }

      setLoading(true);

      const { error } = await supabase.from("profiles").upsert({
        id: claims.sub,
        full_name: fullname,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;

      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-md border border-[#333] text-white space-y-6 max-w-lg mx-auto">
      {/* Avatar */}
      <div className="flex justify-center">
        <Avatar
          uid={claims?.sub ?? null}
          url={avatar_url}
          size={150}
          onUpload={(url) => {
            setAvatarUrl(url);
            updateProfile({ fullname, username, website, avatar_url: url });
          }}
        />
      </div>

      {/* Email */}
      <div className="space-y-1">
        <label htmlFor="email" className="text-sm text-gray-300">
          Email
        </label>
        <input
          id="email"
          type="text"
          value={claims?.email ?? ""}
          disabled
          className="w-full p-2 rounded bg-[#222] text-gray-400 border border-[#444]"
        />
      </div>

      {/* Full Name */}
      <div className="space-y-1">
        <label htmlFor="fullName" className="text-sm text-gray-300">
          Full Name
        </label>
        <input
          id="fullName"
          type="text"
          value={fullname || ""}
          onChange={(e) => setFullname(e.target.value)}
          className="w-full p-2 rounded bg-[#222] text-white border border-[#444] focus:outline-none focus:border-green-500"
        />
      </div>

      {/* Username */}
      <div className="space-y-1">
        <label htmlFor="username" className="text-sm text-gray-300">
          Username
        </label>
        <input
          id="username"
          type="text"
          value={username || ""}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 rounded bg-[#222] text-white border border-[#444] focus:outline-none focus:border-green-500"
        />
      </div>

      {/* Website */}
      <div className="space-y-1">
        <label htmlFor="website" className="text-sm text-gray-300">
          Website
        </label>
        <input
          id="website"
          type="url"
          value={website || ""}
          onChange={(e) => setWebsite(e.target.value)}
          className="w-full p-2 rounded bg-[#222] text-white border border-[#444] focus:outline-none focus:border-green-500"
        />
      </div>

      {/* Update Button */}
      <button
        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition"
        onClick={() =>
          updateProfile({ fullname, username, website, avatar_url })
        }
        disabled={loading || !claims?.sub}
      >
        {loading ? "Loading ..." : "Save"}
      </button>

      {/* cancel */}
      <button
        type="button"
        onClick={() => window.history.back()}
        className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded transition"
      >
        Cancel
      </button>
    </div>
  );
}
