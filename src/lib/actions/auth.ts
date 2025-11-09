"use server"

import { signIn, signOut } from "@/src/auth"

export const login=async()=>{
await signIn("github",{redirectTo:"/"});
}


export const logout=async()=>{
    await signOut({redirectTo:"/"})
}

export const loginViaInput=async(email:string,password:string)=>{
    return await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
}