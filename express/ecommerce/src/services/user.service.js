const AppError = require("../utils/appError");
const { readJSON, writeJSON } = require("../utils/file.js");

const FILE_NAME = "users.json";

async function getAllUsers() {
    try {
        const users = await readJSON(FILE_NAME);

        if (!users) {
            return [];
        }

        return users;
    } catch (err) {
        throw new Error(`Failed to get users: ${err.message}`);
    }
}

async function getUserById(id) {
    try {
        const users = await getAllUsers();
        const targetUser = users.find((u) => u.id === Number(id));

        if (!targetUser) {
            throw new AppError("User not found", 404);
        }

        return targetUser;
    } catch (err) {
        throw err;
    }
}

async function updateUser(id, data) {
    try {
        const users = await getAllUsers();
        const index = users.findIndex((u) => u.id === Number(id));

        if (index === -1) {
            throw new AppError("User not found", 404);
        }

        Object.assign(users[index], data);

        await writeJSON(FILE_NAME, users);
        return users[index];
    } catch (err) {
        throw err;
    }
}

async function deleteUser(id) {
    try {
        const users = await getAllUsers();
        const index = users.findIndex((u) => u.id === Number(id));

        if (index === -1) {
            throw new AppError("User not found", 404);
        }

        const filtered = users.filter((u) => u.id !== Number(id));
        await writeJSON(FILE_NAME, filtered);
    } catch (err) {
        throw err;
    }
}

async function findUserByEmail(email) {
    try {
        const users = await getAllUsers();
        const targetUser = users.find((u) => u.email === email);

        if (!targetUser) {
            throw new AppError("User not found", 404);
        }

        return targetUser;
    } catch (err) {
        throw err;
    }
}

async function isEmailExists(email) {
    try {
        const users = await getAllUsers();
        const emailExists = users.some((u) => u.email === email);

        return emailExists;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    getUserById,
    updateUser,
    deleteUser,
    isEmailExists,
};
