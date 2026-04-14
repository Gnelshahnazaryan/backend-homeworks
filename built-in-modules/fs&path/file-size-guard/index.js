const fs = require("node:fs");
const path = require("node:path");
const rawData = require("./data.js");

const filePath = path.resolve("./output.json");

fs.stat(filePath, (err, stats) => {
    if (err) throw err;

    if (stats.size < 1024) {
        const data = JSON.stringify(rawData, null, 2);

        fs.writeFile(filePath, data, (err) => {
            if (err) {
                console.error("Write failed:", err);
                return;
            }
            console.log("File updated (size < 1KB)");
        });
    } else {
        console.log("File is already large enough, no write needed");
    }
});
