"use client"
import type { User } from "next-auth";
import { SocketUser } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client"

interface ISocketContext {
    socket: Socket | null;
    isConnected: boolean;
}

export const SocketContext = createContext<ISocketContext | null>(null);

// accept user from server or other caller (avoid importing server-only modules here)
export const SocketContextProvider = ({ children, user }: { children: React.ReactNode; user?: User | null }) => {
    const [socket, setSocket] = useState<Socket | null>(null)
    const [isSocketConnected, setIsSocketConnected] = useState(false)
    const [onlineUsers, setOnlineUsers] = useState<SocketUser[] | null>(null);

    console.log(onlineUsers, "...online users");

    // initialize / reinitialize socket when user becomes available
    useEffect(() => {
        if (!user) {
            // disconnect existing socket if user signs out
            socket?.disconnect();
            setSocket(null);
            return;
        }

        const newSocket = io(undefined, {
            // send auth info to server:
            auth: { user: user }, // whole user object (typed) or use user.id
        });
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [user]);

    useEffect(() => {
        if (!socket) return;

        function onConnect() { setIsSocketConnected(true) }
        function onDisconnect() { setIsSocketConnected(false) }

        socket.on('connect', onConnect)
        socket.on('disconnect', onDisconnect)

        if (socket.connected) onConnect();

        return () => {
            socket.off('connect', onConnect)
            socket.off('disconnect', onDisconnect)
        }
    }, [socket])

    //set online users
    useEffect(() => {
        if (!socket || !isSocketConnected) return;

        // send only minimal info (id) instead of entire server-only user object
        socket.emit('addNewUser', { id: user?.id, name: user?.name, image: user?.image, email: user?.email });

        const handleGetUsers = (users: SocketUser[]) => {
            setOnlineUsers(users);
        };

        socket.on('getUsers', handleGetUsers);

        return () => {
            socket.off('getUsers', handleGetUsers);
        };
    }, [socket, isSocketConnected, user]);

    return <SocketContext.Provider value={{ socket, isConnected: isSocketConnected }}>
        {children}
    </SocketContext.Provider>
}

export const useSocket = () => {
    const context = useContext(SocketContext)

    if (context == null) {
        throw new Error("useSocket must be used within a SocketContextProvider")
    }

    return context;
}



