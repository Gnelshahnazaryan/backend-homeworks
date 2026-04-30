const net = require("node:net");
const directMessage = require("./services/dm.js");
const broadcast = require("./services/broadcast.js");
const { formatSystem } = require("./utils/format.js");
const getMessageType = require("./utils/messageType.js");
const registerUser = require("./services/userRegistration.js");
const { getAllUsers, deleteUser } = require("./services/userService.js");

const server = net.createServer((socket) => {
    console.log("Client Connected");

    socket.username = null;
    socket.write("Enter your name:");

    socket.on("data", (data) => {
        if (!socket.username) {
            const name = data.toString().trim();
            registerUser(name, socket);
            return;
        }

        const message = data.toString();
        const messageType = getMessageType(message);

        if (messageType === "Unvalid message") {
            socket.write(formatSystem("Unvalid message"));
            return;
        }

        if (messageType === "Unvalid direct message") {
            socket.write(
                formatSystem("Usage: /dm <TargetUsername> <Message>\n"),
            );
            return;
        }

        if (messageType === "Exit message") {
            deleteUser(socket.username);
            socket.destroy();
        }

        if (messageType === "Direct message") {
            directMessage(message, socket);
            return;
        }

        if (messageType === "Normal message") {
            broadcast(message, socket, false);
            return;
        }
    });

    socket.on("close", () => {
        console.log(`${socket.username} disconnected`);
        deleteUser(socket.username);
    });
});

process.stdin.on("data", (data) => {
    const input = data.toString().trim();

    if (input === "/shutdown") {
        broadcast("Server is shutting down...", null, true);

        for (const user of getAllUsers()) {
            user.end();
        }

        server.close(() => {
            console.log("All connections closed");
            process.exit(0);
        });

        return;
    }
    broadcast(input, null, true);
});

server.listen(3000, "localhost", () => {
    console.log("Server running on port 3000");
});
