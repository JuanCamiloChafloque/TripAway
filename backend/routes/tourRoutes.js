const express = require("express");
const router = express.Router();

const { createTour, getTours } = require("../controllers/tourController");
const { auth } = require("../middleware/auth");

router.post("/", auth, createTour);
router.get("/", getTours);

module.exports = router;
