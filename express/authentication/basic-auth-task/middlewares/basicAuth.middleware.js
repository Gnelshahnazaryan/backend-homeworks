const users = require("../data/users.js");

function basicAuthMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.set("WWW-Authenticate", 'Basic realm="Secure Area"');
        return res.status(401).send("Authentication Required");
    }

    const token = authHeader.split(" ")[1];

    try {
        const token = authHeader.split(" ")[1];

        const decodedCredentials = Buffer.from(token, "base64").toString(
            "utf-8",
        );
        const [username, password] = decodedCredentials.split(":");

        const user = users.find(
            (u) => u.username === username && u.password === password,
        );

        if (!user) {
            return res
                .status(401)
                .json({ error: "Invalid username or password" });
        }

        req.user = user;
        return next();
    } catch (err) {
        return res.status(400).json({ error: "Malformed token" });
    }
}

module.exports = basicAuthMiddleware;
