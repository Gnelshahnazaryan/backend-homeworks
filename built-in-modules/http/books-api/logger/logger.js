function logger(req) {
    const time = new Date().toLocaleString();

    console.log(`[${time}] ${req.method} ${req.url}`);
}

module.exports = logger;
