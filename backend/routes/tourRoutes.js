const express = require("express");
const router = express.Router();

const {
  createTour,
  getTours,
  getTourById,
} = require("../controllers/tourController");
const { auth } = require("../middleware/auth");

router.post("/", auth, createTour);
router.get("/", getTours);
router.get("/:id", getTourById);

module.exports = router;
