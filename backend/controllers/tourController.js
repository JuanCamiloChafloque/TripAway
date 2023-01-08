const { default: mongoose } = require("mongoose");
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

exports.getToursBySearch = async (req, res, next) => {
  try {
    const { searchQuery } = req.query;
    const title = new RegExp(searchQuery, "i");
    const tours = await Tour.find({ title });
    res.status(200).json(tours);
  } catch (err) {
    res.status(404).json({ message: "Error while fetching tours: " + err });
  }
};

exports.getTourById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tour = await Tour.findById(id);
    res.status(200).json(tour);
  } catch (err) {
    res
      .status(404)
      .json({ message: "Error while fetching tour with id: " + id });
  }
};

exports.getTourByUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "User does not exist" });
    }
    const tours = await Tour.find({ creator: id });
    res.status(200).json(tours);
  } catch (err) {
    res
      .status(404)
      .json({ message: "Error while fetching the users tours " + err });
  }
};

exports.updateTourById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, creator, imageFile, tags } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ message: "Tour does not exist. ID: " + id });
    }
    const tour = {
      creator,
      title,
      description,
      tags,
      imageFile,
      _id: id,
    };

    await Tour.findOneAndUpdate({ _id: id }, tour, { new: true });
    res.status(200).json(tour);
  } catch (err) {
    res
      .status(404)
      .json({ message: "Error while updating tour with id: " + id });
  }
};

exports.deleteTourById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ message: "Tour does not exist. ID: " + id });
    }
    await Tour.findByIdAndRemove(id);
    res.status(200).json({ message: "Tour deleted successfully" });
  } catch (err) {
    res
      .status(404)
      .json({ message: "Error while deleting tour with id: " + id });
  }
};
