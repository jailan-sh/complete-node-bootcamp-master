const fs = require("fs");
const http = require("http");
const path = require("path");
const { json } = require("stream/consumers");
const url = require("url");

// const path = "1-node-farm/starter/txt/";

// blocking, synchronous:

// const text = fs.readFileSync(`${path}input.txt`, "utf-8");
// console.log(text);

// const textOut = `this new text to the old one which was avocado ${text}. \n created on ${Date.now()}.`;
// fs.writeFileSync(`${path}output.txt`, textOut);

// fs.appendFileSync(`${path}input.txt`, textOut, "utf-8");

// const newTextIn = fs.readFileSync(`${path}input.txt`, "utf-8");
// console.log(newTextIn);

// nonblocking, ascnchronous:

// fs.readFile(`${path}start.txt`, "utf-8", (err, data1) => {
//   fs.readFile(`${path}${data1}.txt`, "utf-8", (err, data2) => {
//     fs.readFile(`${path}append.txt`, "utf-8", (err, data3) => {
//       fs.writeFile(`${path}final.txt`, `${data2}\n${data3}`, "utf-8", (err) => {
//         console.log("we did it 😁");
//       });
//     });
//   });
// });
// console.log("try to do asynchronous code");
///////////////////////////////////////////////////////////////////////////////////

//serve

const data = fs.readFileSync("./dev-data/data.json", "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const pathName = req.url;
  // overview page:

  if (pathName === "/overview" || pathName === "/") {
    res.end("this overview");
  } else if (pathName === "/api") {
    // data:

    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);
  } else {
    // error:

    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello Jaian",
    });
    res.end("<h1>Page not found</h1>");
  }
});

server.listen(8000, "127.0.0.1");
