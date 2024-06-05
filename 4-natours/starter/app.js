const express = require('express');
const fs = require('fs');

const app = express();

//middleware:
app.use(express.json());

// top level code needed data
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8')
);

// gst methods:

// handling get request:
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: {
      tours: tours,
    },
  });
});

// get one tour:
app.get('/api/v1/tours/:id/:jil?', (req, res) => {
  const id = +req.params.id;
  //console.log(req.params);
  const tour = tours.find((ell) => ell.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      Message: 'invalid id',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});

// post method:
app.post(`/api/v1/tours`, (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
  //res.send('done');
});

//patch request to update data:
app.patch('/api/v1/tours/:id', (req, res) => {
  const id = +req.params.id;
  const tour = tours.find((ell) => ell.id === id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      Message: 'invalid id',
    });
  }
  // need to update it then chnge it in file then send it
  //
  //
  res.status(200).json({
    statuse: 'success',
    data: {
      tour,
    },
  });
});

// delete method:
app.delete('/api/v1/tours/:id', (req, res) => {
  const tour = tours.find((ell) => ell.id === +req.params.id);
  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      Message: 'invalid id',
    });
  }
  res.status(204).json({
    statuse: 'success',
    data: null,
  });
});

// start server
const port = 3000;
app.listen(port, () => {
  console.log(`u r listening to server at port ${port}.....`);
});
