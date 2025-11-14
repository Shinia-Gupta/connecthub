"use client"

import { useSocket } from "@/context/SocketContext";
import { useThemeStore } from "@/src/store/themeStore";
import { Divider } from "@mui/material";

function ListOnlineUsers() {
    const { onlineUsers, user, handleCall } = useSocket();
    const { theme } = useThemeStore();
    return (
        <>
            <div className="flex">
                {onlineUsers && onlineUsers.map((onlineUser) => {
                    if (onlineUser.userId === user?.id) return null; //skip self
                    return (
                        <div key={onlineUser.userId} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '8px' }} className="p-2">
                            <img
                                src={onlineUser.profile?.image || '/assets/user_default_avatar.png'}
                                alt={onlineUser.profile?.name || 'User'}
                                style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
                            />
                            <span>{onlineUser.profile?.name || 'Unknown User'}</span>
                            <button onClick={() => handleCall(onlineUser)}>Call</button>
                        </div>
                    )
                })}
            </div>
            <Divider
                sx={{
                    backgroundColor: theme === "light" ? "black" : "white",
                    opacity: 0.3,
                    height: "1px",
                    my: 1,
                }}
            />

        </>
    );
}

export default ListOnlineUsers;