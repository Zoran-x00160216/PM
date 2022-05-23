const express = require("express");
const router = express.Router();
const SecretNote = require("../model/SecretNote");
const { secretNoteValidation } = require("../services/entriesValidation");

router.get("/", async (req, res) => {
  try {
    const note = await SecretNote.find({ user_id: req.user._id });
    res.json(note);
  } catch (error) {
    res.send(error);
  }
});

router.post("/", async (req, res) => {
  console.log(req.body, req.user);
  const data = {
    user_id: req.user._id,
    name: req.body.name,
    note: req.body.note,
    folder: req.body.folder,
    favorite: req.body.favorite,
  };
  // console.log(data);

  // Validate Data
  const { error } = secretNoteValidation(data);
  if (error) return res.status(400).send(error.details[0].message);
  // console.log(req.user._id, req.body);

  try {
    const secretNote = await new SecretNote(data);

    await secretNote.save();
    res.send({ name: secretNote.name, status: 200 });
  } catch (error) {
    res.send(error);
  }
});

router.delete("/:_id", async (req, res) => {
  try {
    const secretNote = await SecretNote.deleteOne({ _id: req.params._id });
    res.send(secretNote);
  } catch (error) {
    res.send(error);
  }
});

router.put("/", async (req, res) => {
  const data = {
    user_id: req.user._id,
    name: req.body.name,
    note: req.body.note,
    folder: req.body.folder,
    favorite: req.body.favorite,
  };
  // Validate Data
  const { error } = secretNoteValidation(data);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const secretNote = await SecretNote.updateOne(
      { _id: req.body._id },
      {
        user_id: req.user._id,
        name: req.body.name,
        note: req.body.note,
        folder: req.body.folder,
        favorite: req.body.favorite,
      }
    );
    res.json(secretNote);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
