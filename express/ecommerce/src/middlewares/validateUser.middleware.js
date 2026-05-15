function validateUser(req, res, next) {
    const errors = [];
    const { username, email, password, role } = req.body;

    if (!username || typeof username !== "string") {
        errors.push("Username is required and must be a string");
    }

    if (!email || typeof email !== "string") {
        errors.push("Email is required and must be string");
    }

    if (!password || password.length <= 5) {
        errors.push("Password is required and must be at least 6 characters");
    }

    if (role === undefined || typeof role !== "string") {
        errors.push("Role is required and must be a string");
    }

    if (errors.length > 0) {
        return res.status(400).json({
            message: "Validation error",
            errors,
        });
    }

    next();
}

module.exports = {
    validateUser,
};
