const fs = require("node:fs");
const path = require("node:path");
const htmlGenerator = require("./html-generator.js");

const dirPath = path.resolve("./html");
const filePath = path.resolve(path.join(dirPath, "index.html"));

fs.mkdir(dirPath, (err) => {
    if (err) throw err;

    console.log("Folder created successfully");
});

const generatedHTML = htmlGenerator("My page");

fs.writeFile(filePath, generatedHTML, (err) => {
    if (err) throw err;

    console.log("HTML successfully writed");
});
