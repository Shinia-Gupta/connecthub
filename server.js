import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

console.log("server running...");

app.prepare().then(() => {
    const httpServer = createServer(handler);

    const io = new Server(httpServer);
    let onlineUsers = []
    io.on("connection", (socket) => {
        console.log("socket connected:", socket.id);

        // add user
        socket.on("addNewUser", (user) => {
            console.log("user in server on add user---", user);

            // require an id
            if (!user || !user.id) {
                console.warn("addNewUser called without user.id - ignoring");
                return;
            }

            // push only if not already present (use userId field)
            if (!onlineUsers.some((onlineUser) => onlineUser.userId === user.id)) {
                onlineUsers.push({
                    userId: user.id,
                    socketId: socket.id,
                    profile: user,
                });
            }

            // send active users
            io.emit("getUsers", onlineUsers);
        })

        socket.on("disconnect", () => {
            onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);

            //send active users 
            io.emit("getUsers", onlineUsers)
        });
    });

    httpServer
        .once("error", (err) => {
            console.error(err);
            process.exit(1);
        })
        .listen(port, () => {
            console.log(`> Ready on http://${hostname}:${port}`);
        });

});

