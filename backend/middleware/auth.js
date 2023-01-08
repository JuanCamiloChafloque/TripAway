const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isAuth = token.length < 500;
    let decoded;
    if (token && isAuth) {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded?.id;
    } else {
      decoded = jwt.decode(token);
      const googleId = decoded?.sub.toString();
      const user = await User.findOne({ googleId });
      req.userId = user?._id;
    }
    next();
  } catch (err) {
    console.log(err);
  }
};
