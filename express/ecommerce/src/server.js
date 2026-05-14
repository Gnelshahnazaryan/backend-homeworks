const path = require("node:path");
require("dotenv").config({
    path: path.resolve(__dirname, ".env"),
    quiet: true,
});

const app = require("./app.js");

const PORT = process.env.PORT;
const HOST = process.env.HOST;

app.get("/", (req, res) => {
    res.send("API is working");
});

app.listen(PORT, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
});
