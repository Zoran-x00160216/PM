const express = require("express");
const router = express.Router();
const User = require("../model/User");
const {
  updateUserValidation,
} = require("../services/userValidation");
const bcrypt = require("bcryptjs");


// Edit to change master password
router.put("/", async (req, res) => {
  // Validate data
  const { error } = updateUserValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {

    // Hasg password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    const updatePassword = await User.updateOne({ _id: req.user._id }, { $set: { password: hash } });
    res.json(updatePassword);

  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Edit to change subscription
router.put("/tier", async (req, res) => {
  console.log(req.body.tier)

  try {
    const updateTier = await User.updateOne({ _id: req.user._id }, { $set: { tier: req.body.tier } });
    res.json(updateTier);

  } catch (error) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
