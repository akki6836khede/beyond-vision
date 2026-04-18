"use client"

import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    async function getinfo() {
      const res = await fetch("/api/profile", {
        headers: { "Content-Type": "application/json" },
        method: "GET",
        credentials: "include",
      })
      if (res.ok) {
        const data = await res.json()
        if (data.user.role === "user") {
          router.push("/dashboardUser")
        } else {
          router.push("/dashboardAdmin")
        }
      }
    }
    getinfo();
  }, [])
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="flex flex-col items-center gap-6 text-center bg-white dark:bg-zinc-900 p-10 rounded-2xl shadow-md">


        <Image src="/FullLogo_Transparent (2).png" width={200} height={200} alt="pharma logo" />

        <p className="text-zinc-600 dark:text-zinc-400 max-w-md">
          Welcome to Beyond Vision. Click below to continue.
        </p>

        <button
          onClick={() => router.push("/login")}
          className="px-6 py-3 rounded-full bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-300 transition cursor-pointer"
        >
          Proceed
        </button>

      </div>
    </div>
  );
}
