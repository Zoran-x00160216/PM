const express = require("express");
const router = express.Router();
const User = require("../model/User");

// Update user access priviledge
router.put("/", async (req, res) => {
  console.log(req.user, req.body);
  // Validate data
  try {
    // Update account privileges
    const account = await User.updateOne(
      { _id: req.user._id },
      { tier: req.body.data }
    );
    console.log(account);

    res.send({ account, msg: "Account updated" });
  } catch (error) {
    res.status(500).send("Server not found");
  }
});

module.exports = router;
