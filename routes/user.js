const express = require("express");
const router = express.Router();
const verify = require("../middleware/jwtVerify");
const User = require("../model/User");
const {
  registerValidation,
  loginValidation,
} = require("../services/userValidation");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Get a user
router.get("/", verify, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Register
router.post("/register", async (req, res) => {
  // Validate data
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    // Check if user/email already exist
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) return res.status(400).send("User already exist");

    // Hasg password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    // Create new user
    const user = await new User({
      email: req.body.email,
      password: hash,
      tier: req.body.tier,
      lastLogin: new Date(),
    });

    console.log(user);

    await user.save();

    // Create and assign JWT
    jwt.sign(
      { _id: user._id, tier: user.tier },
      process.env.TOKEN_SECRET,
      { expiresIn: 36000 },
      (err, token) => {
        if (err) throw err;
        res.send({ token });
      }
    );
  } catch (error) {
    res.send(error);
  }
});

// Login
router.post("/login", async (req, res) => {
  // Validate data
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    // Check if user/email already exist
    const user = await User.findOne({ email: req.body.email });

    if (!user)
      return res.status(400).send("User do not exist, please register");

    // Compare passwords
    const validPasswd = await bcrypt.compare(req.body.password, user.password);
    if (!validPasswd) return res.status(400).send("Invalid email or password");

    const date = new Date();
    await User.updateOne({ _id: user._id }, { $set: { lastLogin: date } });

    // Create and assign JWT
    jwt.sign(
      { _id: user._id, tier: user.tier },
      process.env.TOKEN_SECRET,
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.send({ token, tier: user.tier });
      }
    );
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
