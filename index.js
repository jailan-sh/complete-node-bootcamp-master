const fs = require("fs");

const path = "1-node-farm/starter/txt/";

const text = fs.readFileSync(`${path}input.txt`, "utf-8");
console.log(text);

const textOut = `this new text to the old one which was avocado ${text}. \n created on ${Date.now()}.`;
fs.writeFileSync(`${path}output.txt`, textOut);

fs.appendFileSync(`${path}input.txt`, textOut, "utf-8");

const newTextIn = fs.readFileSync(`${path}input.txt`, "utf-8");
console.log(newTextIn);
