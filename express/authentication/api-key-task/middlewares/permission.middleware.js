function checkPermission(req, res, next) {
    if (
        (req.method === "GET" && !req.client.permissions.includes("read")) ||
        (req.method === "POST" && !req.client.permissions.includes("write"))
    ) {
        return res.status(403).json({
            message: "Permission denied",
        });
    }

    next();
}
module.exports = checkPermission;
