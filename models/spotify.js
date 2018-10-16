const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const spotifySchema = new Schema({
        id: String,
        display_name: String,
        access_token: String,
        person: {
                type: Schema.Types.ObjectId,
                ref: 'Person'
        },
});

module.exports = mongoose.model('Spotify', spotifySchema);