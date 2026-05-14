const fs = require("node:fs/promises");
const path = require("node:path");

const option = {
    encoding: "utf8",
    mode: 0o666,
    flag: "w",
};

const dataPath = path.join(__dirname, "../data");

async function readJSON(fileName) {
    const absPath = path.resolve(path.join(dataPath, fileName));

    const data = await fs.readFile(absPath, "utf-8");

    return JSON.parse(data);
}

async function writeJSON(fileName, data, options) {
    const absPath = path.resolve(path.join(dataPath, fileName));

    await fs.writeFile(absPath, JSON.stringify(data, null, 2));
}

module.exports = {
    readJSON,
    writeJSON,
};
