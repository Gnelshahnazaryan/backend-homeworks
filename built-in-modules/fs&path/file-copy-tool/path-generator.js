const path = require("node:path");

function generatePath(source, destinationDir) {
    const fileName = path.basename(source);
    const ext = path.extname(fileName);
    const name = path.basename(fileName, ext);

    const newFileName = `${name}_backup${ext}`;

    return path.join(destinationDir, newFileName);
}

module.exports = generatePath;
