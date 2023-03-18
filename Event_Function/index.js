const EventEmitter = require("events");

const event = new EventEmitter();

event.on("ClickBtn", () => {
  console.log("Data");
});

event.emit("ClickBtn");

event.on("Check", (sc, msg) => {
  console.log(`Status ${sc} And ${msg}`);
});

event.emit("Check", 200, "ok");
