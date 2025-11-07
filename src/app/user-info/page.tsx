import { auth } from "@/src/auth";
import Image from "next/image";
import SignoutBtn from "../components/sign-out-button";

export default async function UserInfo(){
      const session = await auth();
      console.log("session- ", session);
    
      return (
        <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
         
            
              <h2> Next Auth v5 + Next 16</h2>
              <p>User signed in with name: {session?.user?.name}</p>
              <p>User signed in with email: {session?.user?.email}</p>
                <Image src={session?.user?.image||"null"} width={48} height={48} alt={session?.user?.name || "Avatar"} />
              <SignoutBtn />
          
        </div>
      );
}