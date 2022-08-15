const mongoose = require("mongoose");

const SecretNoteSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: false,
    max: 500,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  favorite: {
    type: Boolean,
    required: false,
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

module.exports = SecretNote = new mongoose.model(
  "SecretNote",
  SecretNoteSchema
);
