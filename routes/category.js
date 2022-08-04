const express = require("express");
const router = express.Router();
const Category = require("../model/Category");
const { categoryValidation } = require("../services/entriesValidation");

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find({ user_id: req.user._id });
    res.json(categories);
  } catch (error) {
    res.send(error);
  }
});

router.post("/", async (req, res) => {
  const data = {
    user_id: req.user._id,
    name: req.body.name,
    items: req.body.items,
    updated: new Date(),
  };
  // Validate data
  const { error } = categoryValidation(data);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    // Check if category already exist
    const catExist = await Category.findOne({
      user_id: req.user._id,
      name: req.body.name,
    });
    if (catExist) return res.status(400).send("Category already exist");

    const category = await new Category(data);
    await category.save();
    console.log(category);

    res.send({ name: category.name, status: 200 });
  } catch (error) {
    res.send(error);
  }
});

router.delete("/:_id", async (req, res) => {
  console.log(req.params._id);
  try {
    const account = await Category.deleteOne({ _id: req.params._id });
    res.json(account);
  } catch (error) {
    res.send(error);
  }
});

router.put("/", async (req, res) => {
  const data = {
    user_id: req.user._id,
    name: req.body.name,
    items: req.body.items,
    updated: new Date(),
  };

  try {
    // Validate data
    const { error } = categoryValidation(data);
    if (error) return res.status(400).send(error.details[0].message);
    const account = await Category.updateOne({ _id: req.body._id }, data);
    res.json(account);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
