class CustomEventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }

        this.events[event].push(listener);
    }

    emit(event, ...args) {
        if (this.events[event]) {
            this.events[event].forEach((listener) => listener(...args));
        }
    }

    off(event, listener) {
        if (!this.events[event]) return;
        this.events[event] = this.events[event].filter((l) => l !== listener);
    }
}

module.exports = CustomEventEmitter;
