const fs = require("node:fs");
const path = require("node:path");
const logger = require("./logger.js");

const filePath = path.resolve("./app.log");

const loggedData = logger("Server Runned");
fs.appendFile(filePath, loggedData, (err) => {
    if (err) throw err;

    console.log("File writed successfully");
});
