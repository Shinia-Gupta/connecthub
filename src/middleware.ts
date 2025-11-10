import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { auth } from "@/src/auth";

const protectedRoutes=["/user-info"]
const authRoutes=["/login","/signup"]

export default async function middleware(request:NextRequest){
    //if session - user-info accessible but not login,register page
    //if not session - login,register accessible but not user-info page

    const session=await auth();
const {pathname}=request.nextUrl;

    const isProtected=protectedRoutes.some((route)=>pathname.startsWith(route));
    const isAuth =authRoutes.some((route)=>pathname.startsWith(route));

    if(isProtected && !session){
        return NextResponse.redirect(new URL("/login",request.url))
    }
     if(isAuth && session){
        return NextResponse.redirect(new URL("/user-info",request.url))

    }

    return NextResponse.next();
}

