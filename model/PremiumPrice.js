const mongoose = require("mongoose");

const PremiumPriceSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: true,
  },
  price_id: {
    type: Number,
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

module.exports = PremiumPrice = new mongoose.model(
  "PremiumPrice",
  PremiumPriceSchema
);