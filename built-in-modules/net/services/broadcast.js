const { getAllUsers } = require("./userService.js");
const { formatSystem, formatMessage } = require("../utils/format.js");

function broadcast(message, senderSocket = null, isSystem = false) {
    for (const user of getAllUsers()) {
        if (user !== senderSocket) {
            if (isSystem) {
                user.write(formatSystem(message));
            } else {
                user.write(formatMessage(senderSocket.username, message));
            }
        }
    }
}

module.exports = broadcast;
