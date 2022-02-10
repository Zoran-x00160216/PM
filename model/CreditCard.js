const mongoose = require('mongoose');

const CreditCardSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: true,
    },
    expiry: {
        type: String,
        required: true,
    },
    folder: {
        type: Boolean,
        required: false,
    },
    favorite: {
        type: Boolean,
        required: false,
    },
    date: {
        type: Date,
        default: Date.now
    }
});


module.exports = CreditCard = new mongoose.model('CreditCard', CreditCardSchema);