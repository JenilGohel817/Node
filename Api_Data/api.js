const http = require("http");
const fs = require("fs");

const data = fs.readFileSync(`${__dirname}//api.json`, "utf-8");
const objdata = JSON.parse(data);

const server = http.createServer((req, res) => {
  if (req.url == "/") {
    res.end("Home Page");
  } else if (req.url == "/ApiData") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(objdata[1].name);
  } else {
    res.end("404 Error");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Start");
});
