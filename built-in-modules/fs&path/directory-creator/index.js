const fs = require("node:fs");
const path = require("node:path");
const folders = require("./folders.js");

for (let i = 0; i < folders.length; ++i) {
    const fullPath = path.resolve(path.join(__dirname, folders[i]));

    fs.mkdir(fullPath, { recursive: true }, (err) => {
        if (err) throw err;
        console.log("Successfully created", folders[i]);
    });
}
