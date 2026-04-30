const { getUser, hasUser } = require("./userService.js");
const { formatPrivate, formatSystem } = require("../utils/format.js");

function directMessage(message, socket) {
    const parts = message.split(" ");

    if (!hasUser(parts[1])) {
        socket.write(formatSystem("User not found"));
        return;
    }

    const targetUser = parts[1];
    const directMessage = parts.slice(2).join(" ");
    const targetSocket = getUser(targetUser);

    targetSocket.write(formatPrivate(socket.username, directMessage));
}

module.exports = directMessage;
