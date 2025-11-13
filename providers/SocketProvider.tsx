"use client"

import { SocketContextProvider } from "@/context/SocketContext"

const SocketProvider = ({ children, user }: { children: React.ReactNode, user?: { id?: string } | null }) => {
    return (<SocketContextProvider user={user}>{children}</SocketContextProvider>)
}

export default SocketProvider