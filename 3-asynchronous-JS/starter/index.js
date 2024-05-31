const fs = require('fs');
const superagent = require('superagent');

fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  if (err) return console.log(err.message);
  console.log(` this: ${data}`);
  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .end((err, resp) => {
      if (err) return console.log(err.message);
      console.log(resp.body.message);

      fs.writeFile('dog_pic.txt', resp.body.message, (err) => {
        if (err) return console.log(err.message);
        console.log('done with picture');
      });
    });
});
