const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  1

    const readable = fs.readFile("test-file.txt", (err, data) => {
      if (err) console.log(err);

      res.end(data);
    });

  2

    const readable = fs.createReadStream("test-file.txt");
    readable.on("data", (chunk) => {
      res.write(chunk);
    });
    readable.on("end", () => res.end());
  readble.0n('error', err => {
      console.log(err);
      res.statusCode = 500;
      res.end('file not found');
  })
  3
  handle problem of backpressure;

  const readable = fs.createReadStream("test-file.txt");
  readable.pipe(res);
});

server.listen(8000, "127.0.0.1", () => console.log("loading......"));
