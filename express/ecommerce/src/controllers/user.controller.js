const userService = require("../services/user.service.js");

async function getUsers(req, res) {
    try {
        const users = await userService.getAllUsers();

        res.status(200).json({
            users,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
}

async function getUser(req, res) {
    try {
        const user = await userService.getUserById(req.params.id);

        res.status(200).json({
            user,
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message,
        });
    }
}

async function updateUser(req, res) {
    try {
        const user = userService.getUserById(req.params.id, req.body);

        res.status(200).json({
            user,
        });
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message,
        });
    }
}

async function deleteUser(req, res) {
    try {
        await userService.deleteUser(req.params.id);

        res.status(204).send();
    } catch (err) {
        res.status(err.statusCode || 500).json({
            message: err.message,
        });
    }
}

module.exports = {
    getUsers,
    getUser,
    updateUser,
    deleteUser,
};
