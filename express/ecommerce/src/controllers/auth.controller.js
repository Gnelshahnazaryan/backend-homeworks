const authService = require("../services/auth.service.js");

async function registerUser(req, res) {
    try {
        const newUser = await authService.registerUser(req.body);
        const token = authService.generateToken(newUser);

        res.status(201).json({
            message: "User registered successfully",
            token,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        const user = await authService.loginUser(email, password);

        res.status(200).json({
            message: "Login successful",
            user,
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message,
        });
    }
}

module.exports = {
    registerUser,
    loginUser,
};
