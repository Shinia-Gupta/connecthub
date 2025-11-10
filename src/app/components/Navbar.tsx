import { auth } from "@/src/auth";
import Image from "next/image";
import Link from "next/link";
import SignoutBtn from "./sign-out-button";
import { Home } from "lucide-react"; 

export default async function Navbar(){


        const session = await auth();
      const user = session?.user;

      return(
        <>
         {/* Navbar */}
      <nav className="w-full flex items-center justify-between px-8 py-4 shadow-md bg-white dark:bg-zinc-900">
        <Link href="/" className="text-2xl font-bold tracking-wide">
          ConnectHub
        </Link>

        <div className="flex items-center gap-4">
          {!user ? (
            <>
            <Link href="/" className="flex items-center gap-1 hover:opacity-80">
              <Home className="w-5 h-5" /> 
              <span>Home</span>
            </Link>
            <Link href={"/login"}>Sign In</Link>
            <Link href={"/signup"}>Sign Up</Link>
            </>
          ) : (
            <>
              <Link href="/user-info" className="flex items-center gap-2 hover:opacity-80">
                <Image
                  src={user.image || "/default-avatar.png"}
                  alt="User Avatar"
                  width={36}
                  height={36}
                  className="rounded-full border border-zinc-700"
                />
                <span className="hidden sm:inline">{user.name?.split(" ")[0]}</span>
              </Link>
              <SignoutBtn />
            </>
          )}
        </div>
      </nav>

      </>
      )
}