import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { auth } from "@/src/auth";

const protectedRoutes=["/dashboard"]
const authRoutes=["/login","/signup"]

export default async function middleware(request:NextRequest){
    //if session - dashboard accessible but not login,register page
    //if not session - login,register accessible but not dashboard page

    const session=await auth();
const {pathname}=request.nextUrl;

    const isProtected=protectedRoutes.some((route)=>pathname.startsWith(route));
    const isAuth =authRoutes.some((route)=>pathname.startsWith(route));

    if(isProtected && !session){
        return NextResponse.redirect(new URL("/login",request.url))
    }
     if(isAuth && session){
        return NextResponse.redirect(new URL("/dashboard",request.url))

    }

    return NextResponse.next();
}

