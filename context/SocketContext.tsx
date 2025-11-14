"use client"
import type { User } from "next-auth";
import { OngoingCall, Participants, SocketUser } from "@/types";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client"

interface ISocketContext {
    onlineUsers?: SocketUser[] | null;
    user?: User | null;
    handleCall: (user: SocketUser) => void;
    ongoingCall?: OngoingCall | null;
}

export const SocketContext = createContext<ISocketContext | null>(null);

// accept user from server or other caller (avoid importing server-only modules here)
export const SocketContextProvider = ({ children, user }: { children: React.ReactNode; user?: User | null }) => {
    const [socket, setSocket] = useState<Socket | null>(null)
    const [isSocketConnected, setIsSocketConnected] = useState(false)
    const [onlineUsers, setOnlineUsers] = useState<SocketUser[] | null>(null);
    const [ongoingCall, setOngoingCall] = useState<OngoingCall | null>(null);


    console.log(onlineUsers, "...online users");
    const currentSocketUser = onlineUsers?.find(ou => ou.userId === user?.id);

    const handleCall = useCallback((user: SocketUser) => {
        if (!currentSocketUser || !socket) return;
        const participants = { caller: currentSocketUser, receiver: user }
        setOngoingCall({
            participants,
            isRinging: false
        })
        socket.emit("call", participants)
    }, [socket, currentSocketUser, ongoingCall])

    const onIncomingCall = useCallback((participants: Participants) => {
        setOngoingCall({
            participants,
            isRinging: true
        })
    }, [socket, ongoingCall, user])
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

    //use Effect for call events
    useEffect(() => {
        if (!socket || !isSocketConnected) return;

        socket.on('incomingCall', onIncomingCall)

        return()=>{
            socket.off('incomingCall',onIncomingCall)
        }
    },[socket,isSocketConnected,user,onIncomingCall])

    return <SocketContext.Provider value={{ onlineUsers, user, handleCall,ongoingCall }}>
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



