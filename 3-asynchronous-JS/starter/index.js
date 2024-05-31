const fs = require('fs');
const superagent = require('superagent');

fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(` this: ${data}`);
  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then((res) => {
      console.log(res.body.message);

      fs.writeFile('dog_pic.txt', res.body.message, (err) => {
        console.log('done with picture');
      });
    })
    .catch((err) => console.log(err.message));
});
