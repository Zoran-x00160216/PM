const express = require("express");
const router = express.Router();
const User = require("../model/User");
const { registerValidation, loginValidation } = require("../services/userValidation");
const jwt = require("jsonwebtoken");


// Register
router.post("/register", async (req, res) => {

  // Validate data
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    // Check if user/email already exist
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) return res.status(400).send("User already exist");

    // Create new user
    const user = await new User({
      email: req.body.email,
      password: req.body.password,
      tier: req.body.tier,
    });

    await user.save();
    res.send({ user: user._id, msg: "User Registered" });

  } catch (error) {
    res.send(error);
  }
});

// Login
router.post("/login", async (req, res) => {
  console.log(req.body);
  // Validate data
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    // Check if user/email already exist
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("User do not exist, please register");

    if (req.body.password !== user.password) return res.status(400).send("Invalid ");

    // Create and assign JWT
    // Create and assign JWT

    jwt.sign(
      { _id: user._id },
      process.env.TOKEN_SECRET,
      { expiresIn: 36000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token })
      });
    // res.header("auth-token", token).send(token);
  } catch (error) {
    res.status(500).send("Server not found");
  }




  // res.send("Logged in");
});

module.exports = router;
