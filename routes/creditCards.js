const express = require("express");
const router = express.Router();
const CreditCard = require("../model/CreditCard");
const { crediCardValidation } = require("../services/entriesValidation");

router.get("/", async (req, res) => {

  try {
    const accounts = await CreditCard.find();
    res.json(accounts);
  } catch (error) {
    res.send(error);
  }

});

router.post("/", async (req, res) => {

  // Validate data
  const { error } = crediCardValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    // Check if Credit Card is already in DB
    const creditCardExist = await CreditCard.findOne({ number: req.body.number });
    if (creditCardExist) return res.status(400).send("Card already in database.");

    const creditCard = await new CreditCard({
      user_id: req.body.user_id,
      name: req.body.name,
      number: req.body.number,
      expiry: req.body.expiry,
      folder: req.body.folder,
      favorite: req.body.favorite
    });

    await creditCard.save();
    res.send({ name: creditCard.name });

  } catch (error) {
    res.send(error)
  }
});


router.delete("/", async (req, res) => {
  try {
    const account = await CreditCard.deleteOne({ _id: req.body._id });
    res.json(account);
  } catch (error) {
    res.send(error);
  }
});

router.put("/", async (req, res) => {

  // Validate data
  const { error } = crediCardValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const creditCard = await CreditCard.updateOne(
      { _id: req.body._id },
      {
        user_id: req.body.user_id,
        name: req.body.name,
        number: req.body.number,
        expiry: req.body.expiry,
        folder: req.body.folder,
        favorite: req.body.favorite
      }
    );
    res.json(creditCard);
  } catch (error) {
    res.send(error);
  }

});

module.exports = router;
