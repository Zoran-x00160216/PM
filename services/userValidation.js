const Joi = require("joi");

const registerValidation = (data) => {
  const ValidationSchema = Joi.object().keys({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(14).max(35).required(),
    tier: Joi.string().required(),
  });
  return ValidationSchema.validate(data);
};

const loginValidation = (data) => {
  const ValidationSchema = Joi.object().keys({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(14).max(35).required(),
  });
  return ValidationSchema.validate(data);
};
const updateUserValidation = (data) => {
  const ValidationSchema = Joi.object().keys({
    password: Joi.string().min(14).max(35).required(),
  });
  return ValidationSchema.validate(data);
};


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.updateUserValidation = updateUserValidation;
