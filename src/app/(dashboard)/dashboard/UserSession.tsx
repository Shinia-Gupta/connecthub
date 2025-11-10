"use client";

import { useThemeStore } from "@/src/store/themeStore";
import { Session } from "next-auth";
import Image from "next/image";
import SignoutBtn from "../../components/UI/sign-out-button";

export default function UserSession({ session }: { session: Session | null }) {
  const { theme } = useThemeStore();

  return (
    <div
      className={`flex flex-col min-h-screen items-center justify-center font-sans transition-colors duration-300 ${
        theme === "dark" ? "bg-zinc-900 text-white" : "bg-zinc-50 text-black"
      }`}
    >
      <h2 className="text-2xl font-bold mb-4">Next Auth v5 + Next 16</h2>

      {session?.user ? (
        <>
          <p>User signed in with name: {session.user.name}</p>
          <p>User signed in with email: {session.user.email}</p>
          <Image
            src={session.user.image || "/assets/user_default_avatar.png"}
            width={64}
            height={64}
            alt={session.user.name || "Avatar"}
            className="rounded-full mt-4"
          />
          <SignoutBtn />
        </>
      ) : (
        <p>No active session</p>
      )}
    </div>
  );
}
