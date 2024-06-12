const fs = require("fs");
const http = require("http");
const path = require("path");
const { json } = require("stream/consumers");
const url = require("url");
const slugify = require("slugify");
const replaceTemplate = require("./modules/replaceTemplate");

//serve

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);
console.log(slugify("fresh avocado", { lower: true }));

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // Overview page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });

    const cardsHtml = dataObj
      .map((el) => replaceTemplate(tempCard, el))
      .join("");
    const output = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHtml);
    res.end(output);

    // Product page
  } else if (pathname === "/product") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    // API
  } else if (pathname === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);

    // Not found
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>Page not found!</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});

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
