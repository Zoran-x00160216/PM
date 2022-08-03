const mongoose = require("mongoose");

const CreditCardSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  expiryMonth: {
    type: String,
    required: true,
  },
  expiryYear: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: false,
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

module.exports = CreditCard = new mongoose.model(
  "CreditCard",
  CreditCardSchema
);
