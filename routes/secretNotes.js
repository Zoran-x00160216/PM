const express = require("express");
const router = express.Router();
const SecretNote = require("../model/SecretNote");
const { secretNoteValidation } = require("../services/entriesValidation");


router.get("/", async (req, res) => {
  try {
    const note = await SecretNote.find();
    res.json(note);
  } catch (error) {
    res.send(error);
  }

});

router.post("/", async (req, res) => {
  // Validate Data
  const { error } = secretNoteValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const secretNote = await new SecretNote({
      user_id: req.body.user_id,
      name: req.body.name,
      note: req.body.note,
      folder: req.body.folder,
      favorite: req.body.favorite
    });

    await secretNote.save();
    res.send({ name: secretNote.name });
  } catch (error) {
    res.send(error);
  }


});

router.delete("/", async (req, res) => {
  try {
    const secretNote = await SecretNote.deleteOne({ _id: req.body._id });
    res.send(secretNote);
  } catch (error) {
    res.send(error);
  }

});


router.put("/", async (req, res) => {

  // Validate Data
  const { error } = secretNoteValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const secretNote = await SecretNote.updateOne(
      { _id: req.body._id },
      {
        user_id: req.body.user_id,
        name: req.body.name,
        note: req.body.note,
        folder: req.body.folder,
        favorite: req.body.favorite
      }
    );
    res.json(secretNote);
  } catch (error) {
    res.send(error);
  }


});

module.exports = router;