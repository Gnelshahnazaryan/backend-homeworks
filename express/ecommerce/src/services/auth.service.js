const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const { writeJSON } = require("../utils/file.js");
const { getAllUsers } = require("./user.service.js");

const FILE_NAME = "users.json";

async function registerUser(data) {
    try {
        const users = await getAllUsers();

        const newUser = {
            id: users.length + 1,
            username: data.username,
            email: data.email,
            password: data.password,
            role: data.role,
        };

        users.push(newUser);
        await writeJSON(FILE_NAME, users);

        return newUser;
    } catch (err) {
        throw new Error(`Registration failed: ${err.message}`);
    }
}

async function loginUser(email, password) {
    try {
        const users = await getAllUsers();
        const user = users.find((u) => u.email === email);

        if (!user) {
            throw new AppError("Invalid email or password", 401);
        }

        if (user.password !== password) {
            throw new AppError("Invalid email or password", 401);
        }

        return user;
    } catch (err) {
        throw err;
    }
}

function generateToken(user) {
    return jwt.sign(
        {
            id: user.id,
            role: user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "20m",
        },
    );
}

module.exports = {
    registerUser,
    loginUser,
    generateToken,
};
