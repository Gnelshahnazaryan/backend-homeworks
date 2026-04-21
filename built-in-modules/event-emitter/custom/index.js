const EventEmitter = require("./EventEmitter.js");

const emitter = new EventEmitter();

function listener1(data) {
    console.log("Listener 1 received:", data);
}

function listener2(data) {
    console.log("Listener 2 received:", data);
}

function errorListener(err) {
    console.log("Error occurred:", err);
}

emitter.on("dataLoaded", listener1);
emitter.on("dataLoaded", listener2);

emitter.on("error", errorListener);

console.log("--- First emit ---");
emitter.emit("dataLoaded", { id: 1, name: "Test Data" });
emitter.emit("error", new Error("Something went wrong"));

console.log("--- Removing listener1 ---");
emitter.off("dataLoaded", listener1);

console.log("--- Second emit ---");
emitter.emit("dataLoaded", { id: 2, name: "New Data" });
