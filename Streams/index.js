const http = require("http");
const fs = require("fs");

const server = http.createServer();

server.on("request", (req, res) => {
  fs.readFile("data.txt", (err, data) => {
    res.end(data.toString());
  });
});

// Streams
const rStreams = fs.createReadStream("data.txt");
rStreams.on("data", (chunkdata) => {
  res.write(chunkdata);
});
rStreams.on("end", () => {
  res.end();
});
rStreams.on("error", (err) => {
  console.log(err);
  res.end("File Not Found");
});

// Streams Pipe Method (Easy Method To Read Data)

rStreams.pipe(res);

server.listen(3000, "127.0.0.1");
