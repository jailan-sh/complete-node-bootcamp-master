const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res
    .status(200)
    .json({ message: 'hello from node.js express', app: 'natours' });
});

app.post('/', (req, res) => {
  res.send('this is a post endpoint......');
});

const port = 3000;
app.listen(port, () => {
  console.log(`u r listening to server at port ${port}.....`);
});
