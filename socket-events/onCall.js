
export default function makeOnCall(io) {
    return async function onCall(participants) {
        if (participants && participants.receiver?.socketId) {
            io.to(participants.receiver.socketId).emit("incomingCall", participants);
        }
    };
}