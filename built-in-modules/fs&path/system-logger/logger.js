function logger(msg) {
    const d = new Date();

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = d.getDate();
    const hour = d.getHours();
    const minutes = d.getMinutes();
    const seconds = d.getSeconds();

    return `[${year}-${month}-${day} ${hour}:${minutes}:${seconds}] ${msg}\n`;
}

module.exports = logger;
