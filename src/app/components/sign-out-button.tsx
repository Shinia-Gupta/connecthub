"use client"

import { logout } from "@/src/lib/actions/auth";

export default function SignoutBtn(){
    return  <button onClick={()=>logout()}>Logout</button>

}