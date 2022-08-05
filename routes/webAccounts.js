const express = require("express");
// const { process_params } = require("express/lib/router");
const router = express.Router();
const WebAccount = require("../model/WebAccount");
const { webAccountValidation } = require("../services/entriesValidation");

router.get("/", async (req, res) => {
  try {
    const accounts = await WebAccount.find({ user_id: req.user._id });
    res.json(accounts);
  } catch (error) {
    res.json(error);
  }
});

router.post("/", async (req, res) => {
  const data = {
    user_id: req.user._id,
    name: req.body.name,
    type: "webAccount",
    username: req.body.username,
    password: req.body.password,
    uri: req.body.uri,
    category: req.body.category,
    favorite: req.body.favorite,
    note: req.body.note,
    updated: new Date(),
  };

  // Validate data
  const { error } = webAccountValidation(data);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    // Check if Account already exist
    const accountExist = await WebAccount.findOne({
      user_id: req.user._id,
      name: req.body.name,
    });
    if (accountExist) return res.status(400).send("Account already exist");

    const webAccount = await new WebAccount(data);
    // console.log(webAccount);

    await webAccount.save();
    res.send({ name: webAccount.name, status: 200 });
  } catch (error) {
    res.send(error);
  }
});

router.delete("/:_id", async (req, res) => {
  // console.log(req.params);

  try {
    const account = await WebAccount.deleteOne({ _id: req.params._id });
    res.json(account);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

router.put("/", async (req, res) => {
  const data = {
    user_id: req.user._id,
    name: req.body.name,
    type: "webAccount",
    username: req.body.username,
    password: req.body.password,
    uri: req.body.uri,
    category: req.body.category,
    favorite: req.body.favorite,
    note: req.body.note,
    updated: new Date(),
  };
  console.log(data);

  try {
    // Validate data
    const { error } = webAccountValidation(data);
    if (error) return res.status(400).send(error.details[0].message);

    const account = await WebAccount.updateOne({ _id: req.body._id }, data);
    res.json(account);
    // console.log(account);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
