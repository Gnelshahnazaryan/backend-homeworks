function formatMessage(username, message) {
    const time = new Date().toLocaleTimeString();
    return `[${time}] ${username} says: ${message}\n`;
}

function formatPrivate(username, message) {
    const time = new Date().toLocaleTimeString();
    return `[${time}] (Private message from ${username}): ${message}\n`;
}

function formatSystem(message) {
    const time = new Date().toLocaleTimeString();
    return `[${time}] *** System: ${message}\n`;
}

module.exports = {
    formatMessage,
    formatSystem,
    formatPrivate,
};
