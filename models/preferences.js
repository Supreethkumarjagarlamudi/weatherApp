const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const preferenceSchema = new Schema({
    sessionID: {
        type: String,
        required: true
    },
    cities: [{
        type: String,
    }],
    alertAt: {
        type: Number,
        default: 35,
    },
    joinedAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Preference', preferenceSchema);