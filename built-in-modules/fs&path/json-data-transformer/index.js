const fs = require("node:fs");
const path = require("node:path");
const dataProcessor = require("./data-processor.js");

const filePath = path.resolve("./input.json");
const outputPath = path.resolve("./output.json");

fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }

    const parsedData = JSON.parse(data);
    const processedData = dataProcessor(parsedData);
    const result = JSON.stringify(processedData, null, 2);

    fs.writeFile(outputPath, result, "utf-8", (err) => {
        if (err) {
            console.error("Error writing file:", err);
            return;
        }

        console.log("File successfully written!");
    });
});