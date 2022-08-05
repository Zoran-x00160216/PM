const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Get user route");
});

router.post("/", (req, res) => {
  res.send("Post user route");
});


module.exports = router;