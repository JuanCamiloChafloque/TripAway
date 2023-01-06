const express = require("express");
const router = express.Router();

const {
  signup,
  signin,
  googleSignup,
} = require("../controllers/userController");

router.post("/signup", signup);
router.post("/google-signin", googleSignup);
router.post("/signin", signin);

module.exports = router;
