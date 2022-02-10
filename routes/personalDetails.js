const express = require("express");
const router = express.Router();
const PersonalDetails = require("../model/PersonalDetails");
const { personalDetailsValidation } = require("../services/entriesValidation");


router.get("/", async (req, res) => {

  try {
    const accounts = await PersonalDetails.find();
    res.json(accounts);
  } catch (error) {
    res.send(error);
  }
});

router.post("/", async (req, res) => {

  // Validate data
  const { error } = personalDetailsValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    // Check if indentity details are is already in DB
    const identityExist = await PersonalDetails.findOne({ name: req.body.name });
    if (identityExist) return res.status(400).send("Details are already in database.");


    const personalDetail = await new PersonalDetails({
      user_id: req.body.user_id,
      name: req.body.name,
      email: req.body.email,
      PPS: req.body.PPS,
      passportNum: req.body.passportNum,
      drivingLicense: req.body.drivingLicense,
      phoneNum: req.body.phoneNum,
      address: req.body.address,
      folder: req.body.folder,
      favorite: req.body.favorite
    });

    await personalDetail.save();
    res.send({ name: personalDetail.name });

  } catch (error) {
    res.send(error)
  }
});

router.delete("/", async (req, res) => {

  try {
    const account = await PersonalDetails.deleteOne({ _id: req.body._id });
    res.json(account);
  } catch (error) {
    res.send(error);
  }
});

router.put("/", async (req, res) => {

  // Validate data
  const { error } = personalDetailsValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const account = await PersonalDetails.updateOne(
      { _id: req.body._id },
      {
        user_id: req.body.user_id,
        name: req.body.name,
        email: req.body.email,
        PPS: req.body.PPS,
        passportNum: req.body.passportNum,
        drivingLicense: req.body.drivingLicense,
        phoneNum: req.body.phoneNum,
        address: req.body.address,
        folder: req.body.folder,
        favorite: req.body.favorite
      }
    );
    res.json(account);
  } catch (error) {
    res.send(error);
  }

});

module.exports = router;