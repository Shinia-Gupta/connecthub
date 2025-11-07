"use client"

import { login } from "@/src/lib/actions/auth";

export default function SigninBtn(){
    return  <button onClick={()=>login()}>Sign in with Github</button>

}