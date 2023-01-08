const Tour = require("../models/Tour");

exports.createTour = async (req, res, next) => {
  const tour = req.body;
  const newTour = new Tour({
    ...tour,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newTour.save(), res.status(201).json({ tour: newTour });
  } catch (err) {
    res.status(404).json({ message: "Error while creating the tour: " + err });
  }
};

exports.getTours = async (req, res, next) => {
  try {
    const tours = await Tour.find({});
    res.status(200).json(tours);
  } catch (err) {
    res.status(404).json({ message: "Error while fetching tours: " + err });
  }
};
