const User = require("../models/User");
const passport = require("passport");

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const newUser = await User.register(new User({ username: req.body.username }), req.body.password);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

// Authenticate user login
exports.loginUser = (req, res) => {
  passport.authenticate("local")(req, res, () => {
    res.json({ message: "Logged in successfully!" });
  });
};