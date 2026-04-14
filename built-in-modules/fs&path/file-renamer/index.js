const fs = require("node:fs");
const path = require("node:path");
const renamer = require("./rename.js");

const dirPath = path.resolve("../folder");

fs.readdir(dirPath, (err, files) => {
    if (err) throw err;

    const renamedFiles = renamer(files);

    for (let i = 0; i < renamedFiles.length; ++i) {
        const oldPath = path.resolve(path.join(dirPath, files[i]));
        const newPath = path.resolve(path.join(dirPath, renamedFiles[i]));

        fs.rename(oldPath, newPath, (err) => {
            if (err) throw err;
        });
    }
});
