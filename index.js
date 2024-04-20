const fs = require("fs");

const path = "1-node-farm/starter/txt/";

// blocking, synchronous:

// const text = fs.readFileSync(`${path}input.txt`, "utf-8");
// console.log(text);

// const textOut = `this new text to the old one which was avocado ${text}. \n created on ${Date.now()}.`;
// fs.writeFileSync(`${path}output.txt`, textOut);

// fs.appendFileSync(`${path}input.txt`, textOut, "utf-8");

// const newTextIn = fs.readFileSync(`${path}input.txt`, "utf-8");
// console.log(newTextIn);

// nonblocking, ascnchronous:

fs.readFile(`${path}start.txt`, "utf-8", (err, data1) => {
  fs.readFile(`${path}${data1}.txt`, "utf-8", (err, data2) => {
    fs.readFile(`${path}append.txt`, "utf-8", (err, data3) => {
      fs.writeFile(`${path}final.txt`, `${data2}\n${data3}`, "utf-8", (err) => {
        console.log("we did it 😁");
      });
    });
  });
});
console.log("try to do asynchronous code");
