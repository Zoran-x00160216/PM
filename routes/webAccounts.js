const express = require("express");
const router = express.Router();
const WebAccount = require("../model/WebAccount");
const { webAccountValidation } = require("../services/entriesValidation");


router.get("/", async (req, res) => {

  try {
    const accounts = await WebAccount.find();
    res.json(accounts);
  } catch (error) {
    res.json(error);
  }

});

router.post("/", async (req, res) => {

  // Validate data
  const { error } = webAccountValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {

    const webAccount = await new WebAccount({
      user_id: req.body.user_id,
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
      URI: req.body.URI,
      folder: req.body.folder,
      favorite: req.body.favorite,
      note: req.body.notes
    });

    await webAccount.save();
    res.send({ name: webAccount.name });

  } catch (error) {
    res.send(error)
  }
});

router.delete("/", async (req, res) => {

  try {
    const account = await WebAccount.deleteOne({ _id: req.body._id });
    res.json(account);
  } catch (error) {
    res.send(error);
  }

});

router.put("/", async (req, res) => {

  // Validate data
  const { error } = webAccountValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const account = await WebAccount.updateOne(
      { _id: req.body._id },
      {
        user_id: req.body.user_id,
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        URI: req.body.URI,
        folder: req.body.folder,
        favorite: req.body.favorite,
        note: req.body.notes
      }
    );
    res.json(account);
  } catch (error) {
    res.send(error);
  }

});

module.exports = router;