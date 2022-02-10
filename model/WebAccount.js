const mongoose = require('mongoose');

const WebAccountSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        min: 5,
        max: 30
    },
    password: {
        type: String,
        required: true,
        min: 10,
        max: 100
    },
    URI: {
        type: String,
        required: true,
        max: 100
    },
    folder: {
        type: Boolean,
        required: false,
    },
    favorite: {
        type: Boolean,
        required: false,
    },
    note: {
        type: String,
        required: false,
        max: 255
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = WebAccounts = new mongoose.model('WebAcounts', WebAccountSchema);