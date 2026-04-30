const { hasUser } = require("../services/userService.js");

function isValidUsername(username) {
    if (username.length < 2 || username.length > 15) {
        return new Error(
            "Username must be have minimum 2 and maximum 15 characters \n",
        );
    }

    if (hasUser(username)) {
        return new Error("Username already taken\n");
    }

    return null;
}

module.exports = isValidUsername;
