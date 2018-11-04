const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const personSchema = new Schema({
    name: {
        first: String,
        last: String,
    },
    username:{
        type: String,
        unique: true,
        index: true
    },
    email: {
        type: String,
        unique: true,
        index: true
    },
    country: String,
    password: {
        type: String,
        required: true
    },
    spotify: {
        type: Schema.Types.ObjectId,
        ref: 'Spotify'
    },
    artists: [{
        type: Schema.Types.ObjectId,
        ref: 'Artist',
    }]
});

module.exports = mongoose.model('Person', personSchema);