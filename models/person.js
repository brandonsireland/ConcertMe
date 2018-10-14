const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const personSchema = new Schema({
    name: String,
    country: String,
    spotify: {
        id: String,
        display_name: String,
        access_token : String
    },
    artists: [
        {
            name: String,
            image: String
        }
    ]
});

module.exports = mongoose.model('person', personSchema);