import ListOnlineUsers from "@/src/app/components/ListOnlineUsers";
import CallNotification from "@/src/app/components/CallNotification";

export default function ChatPage() {
    // make this container relative so CallNotification (absolute) is scoped here
    return (
        <div className="relative min-h-[60vh] w-full">
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-4">Chat</h2>
                <ListOnlineUsers />
            </div>

            {/* CallNotification is absolute and will cover only this container */}
            <CallNotification />
        </div>
    );
}