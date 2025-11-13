import type { User } from "next-auth";

export type SocketUser = {
    userId: string;
    socketId: string;
    profile: User;
}