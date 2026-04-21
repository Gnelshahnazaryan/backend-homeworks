const EventEmitter = require("node:events");

class TaskManager extends EventEmitter {
    #completed = 0;

    addTask(taskName) {
        console.log(`Task added -> ${taskName}`);
        this.emit("taskAdded", taskName);
    }

    completeTask(taskName) {
        this.#completed++;
        this.emit("taskCompleted", taskName, this.#completed);
    }
}

module.exports = TaskManager;