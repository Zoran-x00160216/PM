const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
