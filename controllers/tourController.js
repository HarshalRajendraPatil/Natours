const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, res) => {
  res.status(200).json({
    message: 'Success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1;
  if (tours.length <= id)
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  const tour = tours.filter((el) => el.id === id);
  res.status(200).json({
    status: 'Success',
    'requested Id': req.params,
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = { id: newId, ...req.body };
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        message: 'success',
        data: {
          Tour: newTour,
        },
      });
    }
  );
};

exports.updateTour = (req, res) => {
  const id = req.params.id * 1;
  if (tours.length <= id)
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  res.status(200).json({
    status: 'success',
    data: {
      message: 'tour successfully updated',
    },
  });
};

exports.deleteTour = (req, res) => {
  const id = req.params.id * 1;
  if (tours.length <= id)
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  res.status(204).json({
    status: 'success',
    data: null,
  });
};