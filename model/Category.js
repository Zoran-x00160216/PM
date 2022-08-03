const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  items: {
    type: Object,
    required: true,
  },
  updated: {
    type: Date,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Category = new mongoose.model("Category", CategorySchema);
