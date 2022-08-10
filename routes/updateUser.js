const express = require("express");
const router = express.Router();
const User = require("../model/User");
const {
  updateUserValidation,
} = require("../services/userValidation");
const bcrypt = require("bcryptjs");


// Edit to change master password
router.put("/", async (req, res) => {
  console.log(req.body, req.user)
  // Validate data
  const { error } = updateUserValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {

    // Hasg password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    console.log(hash)

    const updatePassword = await User.updateOne({ _id: req.user._id }, { $set: { password: hash } });
    console.log(updatePassword);
    res.json(updatePassword);

  } catch (error) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
