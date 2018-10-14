const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const personSchema = new Schema({
    name: String,
    country: String,
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