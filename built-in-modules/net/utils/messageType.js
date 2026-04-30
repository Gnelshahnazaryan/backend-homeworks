function getMessageType(message) {
    const msg = message.trim();

    if (!msg) {
        return "Unvalid message";
    }

    if (msg.startsWith("/dm ")) {
        const parts = msg.split(" ");

        if (parts.length < 3) {
            return "Unvalid direct message";
        }
        return "Direct message";
    }

    if(msg === "exit" || msg === "Exit") {
        return "Exit message";
    }

    return "Normal message";
}

module.exports = getMessageType;
