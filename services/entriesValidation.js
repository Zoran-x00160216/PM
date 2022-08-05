const Joi = require("joi");

const webAccountValidation = (data) => {
  const ValidationSchema = Joi.object().keys({
    _id: Joi.string().empty(""),
    user_id: Joi.string().required(),
    name: Joi.string().required(),
    type: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().required().min(14).max(120),
    uri: Joi.string().empty(""),
    category: Joi.string().empty(""),
    favorite: Joi.boolean(),
    note: Joi.string().empty("").max(500),
    updated: Joi.date().empty(""),
  });
  return ValidationSchema.validate(data);
};

const crediCardValidation = (data) => {
  const ValidationSchema = Joi.object().keys({
    _id: Joi.string().empty(""),
    user_id: Joi.string().required(),
    name: Joi.string().required(),
    type: Joi.string().required(),
    number: Joi.string().required().min(14).max(64),
    expiryMonth: Joi.string().required().min(1).max(2),
    expiryYear: Joi.string().required().min(4).max(4),
    category: Joi.string().empty(""),
    favorite: Joi.boolean(),
    updated: Joi.date().empty(""),
  });
  return ValidationSchema.validate(data);
};

const identityValidation = (data) => {
  const ValidationSchema = Joi.object().keys({
    _id: Joi.string().empty(""),
    user_id: Joi.string().required(),
    name: Joi.string().required(),
    type: Joi.string().required(),
    email: Joi.string().required().email(),
    PPS: Joi.string().empty(""),
    passportNum: Joi.string().empty(""),
    drivingLicense: Joi.string().empty(""),
    phoneHome: Joi.string().empty(""),
    phoneMobile: Joi.string().empty(""),
    addressStreet: Joi.string().empty(""),
    country: Joi.string().empty(""),
    city: Joi.string().empty(""),
    postalCode: Joi.string().empty(""),
    category: Joi.string().empty(""),
    favorite: Joi.boolean(),
    updated: Joi.date().empty(""),
  });
  return ValidationSchema.validate(data);
};

const secretNoteValidation = (data) => {
  const ValidationSchema = Joi.object().keys({
    _id: Joi.string().empty(""),
    user_id: Joi.string().required(),
    name: Joi.string().required(),
    type: Joi.string().required(),
    note: Joi.string().required(),
    category: Joi.string().empty(""),
    favorite: Joi.boolean(),
    updated: Joi.date().empty(""),
  });
  return ValidationSchema.validate(data);
};

const categoryValidation = (data) => {
  const ValidationSchema = Joi.object().keys({
    _id: Joi.string().empty(""),
    user_id: Joi.string().required(),
    name: Joi.string().empty(""),
    items: Joi.array().empty(""),
    updated: Joi.date().empty(""),
  });
  return ValidationSchema.validate(data);
};

module.exports.webAccountValidation = webAccountValidation;
module.exports.crediCardValidation = crediCardValidation;
module.exports.identityValidation = identityValidation;
module.exports.secretNoteValidation = secretNoteValidation;
module.exports.categoryValidation = categoryValidation;
