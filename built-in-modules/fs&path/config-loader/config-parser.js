function configParser(config) {
    const configs = config.split("\n");
    const required = ["PORT", "DB_HOST", "DB_USER", "DB_PASS"];
    let res = {};

    for (let i = 0; i < configs.length; ++i) {
        const entries = configs[i].split("=");

        res[entries[0]] = Number(entries[1]) ? Number(entries[1]) : entries[1];
    }

    for (let val of required) {
        if (!(val in res)) {
            throw new Error(`Required field ${val} not found`);
        }
    }

    return res;
}

module.exports = configParser;
