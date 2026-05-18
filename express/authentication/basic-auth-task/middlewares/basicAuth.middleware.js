const users = require("../data/users.js");

function basicAuthMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.set("WWW-Authenticate", 'Basic realm="Secure Area"');
        res.status(401).send("Authentication Required");
    }

    const token = authHeader.split(" ")[1];

    try {
        const decodedCredentials = Buffer.from(token, "base64").toString(
            "utf-8",
        );
        const [username, password] = decodedCredentials.split(":");

        for (const user of users) {
            if (username === user.username && password === user.password) {
                req.user = user;
                next();
            }
        }
        res.status(401).json({ error: "Invalid username or password" });
    } catch (err) {
        res.status(400).json({ error: "Malformed token" });
    }
}

module.exports = basicAuthMiddleware;
