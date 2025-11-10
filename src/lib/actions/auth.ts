"use server"

import { signIn, signOut } from "@/src/auth"
import bcrypt from "bcryptjs";
import { prisma } from "@/src/auth";

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


export async function registerUser(name: string, email: string, password: string) {
  console.log("registered user");
  
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return user;
}