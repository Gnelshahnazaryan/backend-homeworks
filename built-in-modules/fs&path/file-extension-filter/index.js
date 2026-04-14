const fs = require("node:fs");
const path = require("node:path");
const filter = require("./filter.js");

const dirPath = path.resolve("../json-data-transformer");

fs.readdir(dirPath, (err, files) => {
    if (err) {
        throw err;
    }

    const filteredFiles = filter(files, "json");

    for (let i = 0; i < filteredFiles.length; ++i) {
        filteredFiles[i] = path.resolve(path.join(dirPath, filteredFiles[i]));
    }

    console.log(filteredFiles);
});
