const users = new Map();

function addUser(username, socket) {
    users.set(username, socket);
}

function deleteUser(username) {
    users.delete(username);
}

function hasUser(username) {
    return users.has(username);
}

function getUser(username) {
    return users.get(username);
}

function getAllUsers() {
    return users.values();
}

module.exports = {
    addUser,
    hasUser,
    getUser,
    deleteUser,
    getAllUsers,
};
