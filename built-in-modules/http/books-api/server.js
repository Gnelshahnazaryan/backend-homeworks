require("dotenv").config();
const http = require("node:http");
const router = require("./router.js");
const logger = require("./logger/logger.js");

const PORT = process.env.PORT;
const HOST = process.env.HOST;

const server = http.createServer((req, res) => {
    logger(req);
    router(req, res);
});

server.listen(PORT, HOST, () => {
    console.log("Server running on http://localhost:3000");
});
