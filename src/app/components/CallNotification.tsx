"use client"
import { useSocket } from "@/context/SocketContext";
import Image from "next/image";

const CallNotification = () => {
    const { ongoingCall } = useSocket();

    if (!ongoingCall || !ongoingCall.isRinging) {
        return null;
    }

    const caller = ongoingCall.participants?.caller;
    const avatarSrc = caller?.profile?.image ?? "/assets/user_default_avatar.png";
    const callerName = caller?.profile?.name ?? "Anonymous";

    return (
        // full-screen semi-transparent overlay with a small centered card
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-zinc-900 rounded-lg p-4 w-[320px] max-w-[90%] flex flex-col items-center gap-3 shadow-lg">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-zinc-200 dark:border-zinc-700 shrink-0">
                        <Image
                            src={avatarSrc}
                            alt={callerName}
                            className="w-full h-full object-cover"
                            width={2}
                            height={2}
                        />
                    </div>

                    <div className="text-left">
                        <div className="text-sm font-semibold">{callerName}</div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400">Incoming call</div>
                    </div>
                </div>

                <div className="w-full flex gap-3 mt-1">
                    <button
                        className="flex-1 py-2 rounded-md bg-red-600 text-white text-sm hover:opacity-90"
                        // TODO: wire up reject handler
                        onClick={() => {
                            /* reject call */
                        }}
                    >
                        Decline
                    </button>
                    <button
                        className="flex-1 py-2 rounded-md bg-green-600 text-white text-sm hover:opacity-90"
                        // TODO: wire up accept handler
                        onClick={() => {
                            /* accept call */
                        }}
                    >
                        Accept
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CallNotification;