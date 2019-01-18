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
        spotify_id: String,
        display_name: String,
        access_token: String,
        refresh_token: String,
        profile_pic: String,
    },
    artists: [{
        name: String,
        image: String,
        attraction_id: String
    }]
});

personSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Person', personSchema);