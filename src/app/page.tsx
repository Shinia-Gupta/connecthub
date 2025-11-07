"use server"

import { auth } from "@/src/auth";
import SigninBtn from "@/src/app/components/sign-in-btn";
import Image from "next/image";
import SignoutBtn from "@/src/app/components/sign-out-button";
import Link from "next/link";


export default async function Home() {
  const session = await auth();
  console.log("session- ", session);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {!session ?
        <>
          <h2>You are not signed in-</h2>
          <SigninBtn />
        </>
        :
        <>
          <Link href={"/user-info"}>User Info</Link>
          <SignoutBtn/>
        </>
      }
    </div>
  );
}
