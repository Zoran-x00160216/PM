const express = require("express");
const router = express.Router();
const CreditCard = require("../model/CreditCard");
const { crediCardValidation } = require("../services/entriesValidation");

router.get("/", async (req, res) => {
  try {
    const accounts = await CreditCard.find({ user_id: req.user._id });
    res.json(accounts);
  } catch (error) {
    res.send(error);
  }
});

router.post("/", async (req, res) => {
  const data = {
    user_id: req.user._id,
    name: req.body.name,
    type: "creditCard",
    number: req.body.number,
    expiryMonth: req.body.expiryMonth,
    expiryYear: req.body.expiryYear,
    category: req.body.category,
    favorite: req.body.favorite,
    updated: new Date(),
  };
  // Validate data
  const { error } = crediCardValidation(data);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    // Check if Credit Card is already in DB
    // const creditCardExist = await CreditCard.findOne({ number: req.body.number });
    // if (creditCardExist) return res.status(400).send("Card already in database.");

    const creditCard = await new CreditCard(data);

    await creditCard.save();
    res.send({ name: creditCard.name, status: 200 });
  } catch (error) {
    res.send(error);
  }
});

router.delete("/:_id", async (req, res) => {
  try {
    const card = await CreditCard.deleteOne({ _id: req.params._id });
    res.json(card);
  } catch (error) {
    res.send(error);
  }
});

router.put("/", async (req, res) => {
  const data = {
    user_id: req.user._id,
    name: req.body.name,
    type: "creditCard",
    number: req.body.number,
    expiryMonth: req.body.expiryMonth,
    expiryYear: req.body.expiryYear,
    category: req.body.category,
    favorite: req.body.favorite,
    updated: new Date(),
  };

  // Validate data
  const { error } = crediCardValidation(data);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const creditCard = await CreditCard.updateOne({ _id: req.body._id }, data);
    res.json(creditCard);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
