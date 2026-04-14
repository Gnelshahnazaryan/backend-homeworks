function dataProcessor(obj) {
    let res = {};

    for (const [key, value] of Object.entries(obj)) {
        let parts = key.split("_");
        for (let i = 1; i < parts.length; ++i) {
            parts[i] = parts[i][0].toUpperCase() + parts[i].slice(1);
        }
        let newKey = parts.join("");

        if (typeof value === "object" && value !== null) {
            res[newKey] = dataProcessor(value);
        } else {
            res[newKey] = value;
        }
    }
    return res;
}

module.exports = dataProcessor;

