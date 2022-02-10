const mongoose = require('mongoose');

const SecretNoteSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    note: {
        type: String,
        required: false,
        max: 255
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


module.exports = SecretNote = new mongoose.model('SecretNote', SecretNoteSchema);