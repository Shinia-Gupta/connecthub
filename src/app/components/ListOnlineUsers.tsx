"use client"

import { useSocket } from "@/context/SocketContext";

function ListOnlineUsers() {
    const { onlineUsers, user } = useSocket();

    return (<div>
        {onlineUsers && onlineUsers.map((onlineUser) => (
            <div key={onlineUser.userId} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <img
                    src={onlineUser.profile?.image || '/assets/user_default_avatar.png'}
                    alt={onlineUser.profile?.name || 'User'}
                    style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
                />
                <span>{onlineUser.profile?.name || 'Unknown User'}</span>
            </div>
        ))}
    </div>
    );
}

export default ListOnlineUsers;