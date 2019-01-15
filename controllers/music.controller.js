const spotifyConf = require('../config/spotify');
const {
    getTopArtists
} = require('../providers/spotify');
const Person = require('../models/person');

const getArtists = function (req, res) {

    const accessToken = req.user.spotify.access_token;
    const refreshToken = req.user.spotify.refresh_token
    const user = req.user;

    getTopArtists(accessToken, refreshToken, spotifyConf)
        .then(
            function (data) {
                saveArtistData(user, data);
            })
        .catch(function (err) {
            console.log(err);
            throw err;
        });
    
};

saveArtistData = (user, data) => {

    // current logged in person.
    Person.findOne({
        _id: user._id
    }, function (err, user) {
        if (err)
            throw (err);

        data.map(function (item, index) {
            artistName = item.artist;
            artistImage = item.imageUrl;

            // Saves user artists if they don't exist
            if(!user.artists[index].name) { 

                // pushes users top artist from spotify to user artist array
                user.artists.push({
                        name: artistName, 
                        image: artistImage
                    })
                };
            
        });

        // Saves user top artists name and image
        user.save(function (err) {
            if (err)
                throw err;
            return user;
        });

        return user;
    });

    return;
}


module.exports = {
    getArtists
};