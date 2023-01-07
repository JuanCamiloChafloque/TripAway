const express = require("express");
const router = express.Router();

const { createTour, getTours } = require("../controllers/tourController");

router.post("/", createTour);
router.get("/", getTours);

module.exports = router;
