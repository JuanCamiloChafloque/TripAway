const mongoose = require("mongoose");

const TourSchema = mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  name: {
    type: String,
  },
  creator: {
    type: String,
  },
  tags: {
    type: [String],
  },
  imageFile: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  likeCount: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("tour", TourSchema);
