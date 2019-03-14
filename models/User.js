const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
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
        type: Schema.Types.ObjectId, 
        ref: 'ArtistModel'
    }],
});

personSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('UserModel', UserSchema);