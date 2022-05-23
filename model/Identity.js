const mongoose = require("mongoose");

const IdentitySchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  PPS: {
    type: String,
    required: false,
  },
  passportNum: {
    type: String,
    required: false,
  },
  drivingLicense: {
    type: String,
    required: false,
  },
  phoneHome: {
    type: String,
    required: false,
  },
  phoneMobile: {
    type: String,
    required: false,
  },
  addressStreet: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  postalCode: {
    type: String,
    required: false,
  },
  folder: {
    type: String,
    required: false,
  },
  favorite: {
    type: Boolean,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Identity = new mongoose.model("Identity", IdentitySchema);
