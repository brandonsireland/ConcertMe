const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
    title: String,
    image: String,
    ticker_master_id: String,
    url: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'UserModel'
    }
});

module.exports = mongoose.model('ArtistModel', ArtistSchema);