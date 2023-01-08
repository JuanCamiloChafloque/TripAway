const express = require("express");
const router = express.Router();

const {
  createTour,
  getTours,
  getTourById,
  getTourByUser,
} = require("../controllers/tourController");
const { auth } = require("../middleware/auth");

router.post("/", auth, createTour);
router.get("/", getTours);
router.get("/:id", getTourById);
router.get("/user/:id", auth, getTourByUser);

module.exports = router;
