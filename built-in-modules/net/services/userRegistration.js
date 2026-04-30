const broadcast = require("./broadcast.js");
const { formatSystem } = require("../utils/format.js");
const { addUser } = require("./userService.js");
const isValidUsername = require("../utils/userValidation.js");

function registerUser(username, socket) {
    let isValid = isValidUsername(username);

    if (isValid) {
        socket.write(formatSystem(isValid.message));
        return;
    }

    addUser(username, socket);
    socket.username = username;
    socket.write(formatSystem(`Welcome ${username}\n`));

    broadcast(`${username} joined the chat\n`, socket, true);
}

module.exports = registerUser;
