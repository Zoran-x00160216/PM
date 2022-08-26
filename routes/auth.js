const express = require("express");
const router = express.Router();
const verify = require("../middleware/jwtVerify");
const User = require("../model/User");
const {
  registerValidation,
  loginValidation,
} = require("../services/userValidation");
const PremiumPrice = require("../model/PremiumPrice");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({path: "./vars/.env"})

// Get a user
router.get("/", verify, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    // console.log(user);
    res.json(user);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Register
router.post("/register", async (req, res) => {


  try {
  // Validate data
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

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
      tier: "basic",
      lastLogin: new Date(),
    });

    // console.log(user);

    await user.save();

    // Create and assign JWT
    jwt.sign(
      { _id: user._id, tier: user.tier },
      process.env.TOKEN_SECRET,
      { expiresIn: 1800 },
      (err, token) => {
        if (err) throw err;
        res.send({ token });
      }
    );
  } catch (err) {
    res.status(500).send("Server error");
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
      { expiresIn: 1800 },
      (err, token) => {
        if (err) throw err;
        res.send({ token, tier: user.tier });
      }
    );
  } catch (err) {
    res.status(500).send("Server error");
  }
});


// Get price
router.get("/getPremiumPrice", async (req, res) => {
  try {
    const priceSubscription = await PremiumPrice.findOne({price_id: 1});
    res.json(priceSubscription);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
