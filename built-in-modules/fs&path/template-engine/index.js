const fs = require("node:fs");
const path = require("node:path");
const templateParser = require("./template-engine.js");

const templatePath = path.resolve("./template.txt");
const outputPath = path.resolve("./output.txt");

const variables = {
    name: "Anna",
    company: "TechCorp",
    city: "Berlin",
    role: "Frontend Developer",
};

try {
    var data = fs.readFileSync(templatePath, "utf-8");
} catch (err) {
    console.log("Error reading file: ", err);
}

const parsedData = templateParser(data, variables);

try {
    fs.writeFileSync(outputPath, parsedData);
    console.log("Writed successfully");
} catch (err) {
    console.log("Error writing file: ", err);
}
