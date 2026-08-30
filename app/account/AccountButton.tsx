"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";

type Claims = {
  sub: string;
  email?: string;
  [key: string]: unknown;
};

export default function AccountButton({ claims }: { claims: Claims | null }) {
  const supabase = createClient();
  const [username, setUsername] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const getProfile = useCallback(async () => {
    try {
      if (!claims?.sub) {
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("username, avatar_url")
        .eq("id", claims.sub)
        .single();

      if (error) throw error;

      if (data) {
        setUsername(data.username);
        setUrl(data.avatar_url);
      }
    } catch (error) {
      alert("Error loading user data!");
    }
  }, [claims, supabase]);

  useEffect(() => {
    getProfile();
  }, [claims, getProfile]);

  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const { data, error } = await supabase.storage
          .from("avatars")
          .download(path);
        if (error) throw error;

        const url = URL.createObjectURL(data);
        setAvatarUrl(url);
      } catch (error) {
        console.log("Error downloading image: ", error);
      }
    }

    if (url) downloadImage(url);
  }, [url]);

  return (
    <Link
      href="/account"
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#222] hover:bg-[#333] 
                 text-white text-sm active:scale-95 transition"
    >
      {avatarUrl ? (
        <Image
          width={20}
          height={20}
          src={avatarUrl}
          alt="Avatar"
          className="rounded-lg border-2 border-green-600 shadow-lg object-cover"
          style={{ height: 20, width: 20 }}
        />
      ) : (
        <div
          className="rounded-lg bg-[#333] border-2 border-green-600 shadow-lg"
          style={{ height: 20, width: 20 }}
        />
      )}

      <span className="truncate max-w-[100px]">{username ?? "Account"}</span>
    </Link>
  );
}
