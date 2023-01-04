const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

export const signup = async (req, res, next) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      email: email,
      password: hashPassword,
      name: firstName + " " + lastName,
    });

    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE_TIME }
    );

    res.status(201).json({ user: newUser, token: token });
  } catch (err) {
    res.status(500).json({ message: "Error while creating the user" });
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User does not exist" });

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid Credentials " });

    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE_TIME }
    );

    res.status(200).json({ user: existingUser, token: token });
  } catch (err) {
    res.status(500).json({ message: "Error while signing in the user" });
  }
};
