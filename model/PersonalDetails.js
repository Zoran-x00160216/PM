const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  city: String,
  street: String,
  houseNum: String,
});

const PhoneSchema = new mongoose.Schema({
  home: String,
  business: String,
  mobile: String,
});

const PersonalDetailsSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
  },
  passportNum: {
    type: String,
  },
  drivingLicense: {
    type: String,
  },
  phoneNum: {
    type: PhoneSchema,
    required: true,
  },
  address: {
    type: AddressSchema,
    required: true,
  },
  category: {
    type: String,
    required: false,
  },
  favorite: {
    type: String,
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

module.exports = PersonalDetails = new mongoose.model(
  "PersonalDetails",
  PersonalDetailsSchema
);
