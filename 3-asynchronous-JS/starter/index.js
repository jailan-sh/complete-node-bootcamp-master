const fs = require('fs');
const { resolve } = require('path');
const superagent = require('superagent');
const { reject } = require('superagent/lib/request-base');

// read file promise
const filereadpro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("can't fined file");
      resolve(data);
    });
  });
};

// write file promise
const filewritepro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('not write');
      resolve('done');
    });
  });
};

// promisefy process
filereadpro(`${__dirname}/dog.txt`)
  .then((data) => {
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((data) => {
    console.log(data.body.message);
    return filewritepro('dog_pic.txt', data.body.message);
  })
  .then(() => console.log('did it ❤'))
  .catch((err) => console.log(err.message));

//callback hell

// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(` this: ${data}`);
//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then((res) => {
//       console.log(res.body.message);

//       fs.writeFile('dog_pic.txt', res.body.message, (err) => {
//         console.log('done with picture');
//       });
//     })
//     .catch((err) => console.log(err.message));
// });

// async wait:
