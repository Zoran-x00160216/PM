const mongoose = require("mongoose");

const WebAccountSchema = new mongoose.Schema({
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
  username: {
    type: String,
    required: true,
    min: 5,
    max: 30,
  },
  password: {
    type: String,
    required: true,
    min: 14,
    max: 100,
  },
  uri: {
    type: String,
    required: false,
    max: 100,
  },
  category: {
    type: String,
    required: false,
  },
  favorite: {
    type: Boolean,
    required: false,
  },
  note: {
    type: String,
    required: false,
    max: 500,
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

module.exports = WebAccounts = new mongoose.model(
  "WebAcounts",
  WebAccountSchema
);
