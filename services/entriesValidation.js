const Joi = require("Joi");

const webAccountValidation = data => {

    const ValidationSchema = Joi.object().keys({
        _id: Joi.string(),
        user_id: Joi.string().required(),
        name: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().required().min(10).max(55),
        URI: Joi.string(),
        folder: Joi.string(),
        favorite: Joi.string(),
        note: Joi.string()
    });
    return ValidationSchema.validate(data);
}


const crediCardValidation = data => {

    const ValidationSchema = Joi.object().keys({
        _id: Joi.string(),
        user_id: Joi.string().required(),
        name: Joi.string().required(),
        number: Joi.string().required().min(16).max(16),
        expiry: Joi.string().required().min(5).max(5),
        folder: Joi.string(),
        favorite: Joi.string(),
    });
    return ValidationSchema.validate(data);
}

const personalDetailsValidation = data => {

    const ValidationSchema = Joi.object().keys({
        _id: Joi.string(),
        user_id: Joi.string().required(),
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        PPS: Joi.string(),
        passportNum: Joi.string(),
        drivingLicense: Joi.string(),
        phoneNum: Joi.object().keys({
            home: Joi.string(),
            business: Joi.string(),
            mobile: Joi.string(),
        }),
        address: Joi.object().keys({
            city: Joi.string().required(),
            street: Joi.string().required(),
            houseNum: Joi.string().required(),
        }),
        folder: Joi.string(),
        favorite: Joi.string(),
    });
    return ValidationSchema.validate(data);
}

const secretNoteValidation = data => {

    const ValidationSchema = Joi.object().keys({
        _id: Joi.string(),
        user_id: Joi.string().required(),
        name: Joi.string().required(),
        note: Joi.string(),
        folder: Joi.string(),
        favorite: Joi.string()
    });
    return ValidationSchema.validate(data);
}

module.exports.webAccountValidation = webAccountValidation;
module.exports.crediCardValidation = crediCardValidation;
module.exports.personalDetailsValidation = personalDetailsValidation;
module.exports.secretNoteValidation = secretNoteValidation;
