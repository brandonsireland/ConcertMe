const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const spotifySchema = new Schema({
        spotify_id: String,
        display_name: String,
        access_token: String,
        refresh_token: String,
        profile_pic: String,
        person: {
                type: Schema.Types.ObjectId,
                ref: 'Person'
        },
});

module.exports = mongoose.model('Spotify', spotifySchema);