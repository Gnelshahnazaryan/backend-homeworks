const fs = require("node:fs");
const path = require("node:path");
const configParser = require("./config-parser.js");

const configPath = path.resolve("./config.env");

fs.readFile(configPath, "utf-8", (err, data) => {
    if(err) throw err;

    const parsed = configParser(data);
    console.log(parsed);
});
