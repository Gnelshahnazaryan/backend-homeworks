const fs = require("node:fs");
const path = require("node:path");
const generatePath = require("./path-generator.js");

const source = "./index.js";
const destinationDir = "./backup";

const sourcePath = path.resolve(source);
const destinationPath = path.resolve(generatePath(source, destinationDir));

fs.copyFile(sourcePath, destinationPath, (err) => {
    if (err) throw err;
});
