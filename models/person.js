const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const personSchema = new Schema({
    name: {
        first: String,
        last: String,
    },
    username: {
        type: String,
        unique: true,
        index: true
    },
    email: {
        type: String,
        unique: true,
        index: true
    },
    country: {
        type: String
    },
    password: {
        type: String
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

personSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Person', personSchema);