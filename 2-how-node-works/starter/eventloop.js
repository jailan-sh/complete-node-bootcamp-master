const fs = require("fs");
const { nextTick } = require("process");

setTimeout(() => console.log("this timeout"), 0);
setImmediate(() => console.log("this immediate 1"));

fs.readFile("test-firl.js", () => {
  console.log("finish reading");

  console.log("------------------------");
  setTimeout(() => console.log("this timeout 1"), 0);
  setTimeout(() => console.log("this timeout 3"), 3000);
  setImmediate(() => console.log("this immediate 2"));

  process, nextTick(() => console.log("process tick"));
});

console.log("hello");
