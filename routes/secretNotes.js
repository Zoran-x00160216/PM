const express = require("express");
const router = express.Router();
const SecretNote = require("../model/SecretNote");
const { secretNoteValidation } = require("../services/entriesValidation");

router.get("/", async (req, res) => {
  try {
    const notes = await SecretNote.find({ user_id: req.user._id }).populate("category", "name");
    res.json(notes);
  } catch (error) {
    res.send(error);
  }
});

router.post("/", async (req, res) => {
  const data = {
    user_id: req.user._id,
    name: req.body.name,
    type: "note",
    note: req.body.note,
    category: req.body.category,
    favorite: req.body.favorite,
    updated: new Date(),
  };

  // Validate Data
  const { error } = secretNoteValidation(data);
  if (error) return res.status(400).send(error.details[0].message);
  // console.log(req.user._id, req.body);

  try {
    // Check if Note already exist
    const noteExist = await SecretNote.findOne({
      user_id: req.user._id,
      name: req.body.name,
    });
    if (noteExist) return res.status(400).send("Note already exist");

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
    type: "note",
    note: req.body.note,
    category: req.body.category,
    favorite: req.body.favorite,
    updated: new Date(),
  };

  // Validate Data
  const { error } = secretNoteValidation(data);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const secretNote = await SecretNote.updateOne(
      { _id: req.body._id },
      { $set: data }
    );
    res.json(secretNote);
    
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
