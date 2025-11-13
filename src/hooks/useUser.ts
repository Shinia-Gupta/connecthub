"use client"
import { auth } from "@/src/auth";
import { User } from "next-auth";
import { useEffect, useState } from "react";

export function useUser() {
    const [user, setUser] = useState<User | undefined>(undefined);
    useEffect(() => {
        async function returnUser() {
            const session = await auth();
            setUser(session?.user)
        }
        returnUser();
    }, []) // changed from [user] to [] to avoid an infinite loop
    return user;
}