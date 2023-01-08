const express = require("express");
const router = express.Router();

const {
  createTour,
  getTours,
  getTourById,
  getTourByUser,
  updateTourById,
  deleteTourById,
  getToursBySearch,
  getToursByTag,
} = require("../controllers/tourController");
const { auth } = require("../middleware/auth");

router.get("/search", getToursBySearch);
router.get("/tags/:tag", getToursByTag);
router.get("/", getTours);
router.get("/:id", getTourById);

router.post("/", auth, createTour);
router.patch("/:id", auth, updateTourById);
router.delete("/:id", auth, deleteTourById);
router.get("/user/:id", auth, getTourByUser);

module.exports = router;
