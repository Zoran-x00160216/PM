const express = require("express");
const router = express.Router();
const Identity = require("../model/Identity");
const { identityValidation } = require("../services/entriesValidation");

router.get("/", async (req, res) => {
  try {
    const accounts = await Identity.find({ user_id: req.user._id });
    res.json(accounts);
  } catch (error) {
    res.send(error);
  }
});

router.post("/", async (req, res) => {
  // console.log(req.body, req.user);
  const data = {
    user_id: req.user._id,
    name: req.body.name,
    email: req.body.email,
    PPS: req.body.PPS,
    passportNum: req.body.passportNum,
    drivingLicense: req.body.drivingLicense,
    phoneHome: req.body.phoneHome,
    phoneMobile: req.body.phoneMobile,
    addressStreet: req.body.addressStreet,
    country: req.body.country,
    city: req.body.city,
    postalCode: req.body.postalCode,
    folder: req.body.folder,
    favorite: req.body.favorite,
    updated: new Date(),
  };

  try {
    // Validate data
    const { error } = identityValidation(data);
    if (error) return res.status(400).send(error.details[0].message);
    // Check if indentity details are is already in DB
    // const identityExist = await PersonalDetails.findOne({
    //   name: req.body.name,
    // });
    // if (identityExist)
    //   return res.status(400).send("Details are already in database.");

    const identity = await new Identity(data);

    await identity.save();
    res.send({ name: identity.name, status: 200 });
  } catch (error) {
    res.send(error);
  }
});

router.delete("/:_id", async (req, res) => {
  try {
    const account = await Identity.deleteOne({ _id: req.params._id });
    res.json(account);
  } catch (error) {
    res.send(error);
  }
});

router.put("/", async (req, res) => {
  const data = {
    user_id: req.user._id,
    name: req.body.name,
    email: req.body.email,
    PPS: req.body.PPS,
    passportNum: req.body.passportNum,
    drivingLicense: req.body.drivingLicense,
    phoneHome: req.body.phoneHome,
    phoneMobile: req.body.phoneMobile,
    addressStreet: req.body.addressStreet,
    country: req.body.country,
    city: req.body.city,
    postalCode: req.body.postalCode,
    folder: req.body.folder,
    favorite: req.body.favorite,
    updated: new Date(),
  };

  try {
    // Validate data
    const { error } = identityValidation(data);
    if (error) return res.status(400).send(error.details[0].message);

    const account = await Identity.updateOne({ _id: req.body._id }, data);
    console.log(account);
    res.json(account);
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});

module.exports = router;
