const http = require("http");

// Get Response
const server = http.createServer((req, res) => {
  if (req.url == "/") {
    res.end("Hello Home");
  } else if (req.url == "/about") {
    res.end("Hello About");
  } else {
    res.end("Hello Contect");
  }
});

// Connect With Server
server.listen(8000, "127.0.0.1", () => {
  console.log("Listen 8000");
});

// Check
